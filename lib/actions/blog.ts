"use server";

import { BlogStatus, FileCategory } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { logAuditEvent } from "@/lib/audit";
import { requireAdminUser } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma";
import { assertValidServerActionOrigin } from "@/lib/security/origin";
import { storeUploadedFile } from "@/lib/uploads";
import { blogPostSchema } from "@/lib/validators/blog";
import { slugify, toOptionalString, toRequiredString, unique } from "@/lib/utils";

export async function saveBlogPostAction(formData: FormData) {
  assertValidServerActionOrigin();
  const user = await requireAdminUser();
  const title = toRequiredString(formData.get("title"));
  const rawSlug = toRequiredString(formData.get("slug"));

  const parsed = blogPostSchema.parse({
    id: toOptionalString(formData.get("id")),
    title,
    slug: slugify(rawSlug || title),
    excerpt: toOptionalString(formData.get("excerpt")),
    content: toRequiredString(formData.get("content")),
    category: toOptionalString(formData.get("category")),
    tags: unique(
      toRequiredString(formData.get("tags"))
        .split(",")
        .map((tag) => slugify(tag).replace(/-/g, " ").trim())
        .filter(Boolean),
    ),
    featured: formData.get("featured") === "true",
    focusKeyword: toOptionalString(formData.get("focusKeyword")),
    seoTitle: toOptionalString(formData.get("seoTitle")),
    seoDescription: toOptionalString(formData.get("seoDescription")),
    authorName: toOptionalString(formData.get("authorName")),
    authorRole: toOptionalString(formData.get("authorRole")),
    authorBio: toOptionalString(formData.get("authorBio")),
    status: toRequiredString(formData.get("status")) || BlogStatus.DRAFT,
  });

  const existingPost = parsed.id
    ? await prisma.blogPost.findUnique({
        where: { id: parsed.id },
        select: { publishedAt: true },
      })
    : null;

  const conflictingSlug = await prisma.blogPost.findFirst({
    where: {
      slug: parsed.slug,
      ...(parsed.id ? { id: { not: parsed.id } } : {}),
    },
    select: { id: true },
  });

  if (conflictingSlug) {
    throw new Error("Another blog post already uses that slug.");
  }

  const data = {
    title: parsed.title,
    slug: parsed.slug,
    excerpt: parsed.excerpt,
    content: parsed.content,
    category: parsed.category,
    tags: parsed.tags,
    featured: parsed.featured,
    focusKeyword: parsed.focusKeyword,
    seoTitle: parsed.seoTitle,
    seoDescription: parsed.seoDescription,
    authorName: parsed.authorName,
    authorRole: parsed.authorRole,
    authorBio: parsed.authorBio,
    status: parsed.status,
    publishedAt:
      parsed.status === BlogStatus.PUBLISHED
        ? existingPost?.publishedAt ?? new Date()
        : null,
    authorId: user.id,
  };

  const blogPost = parsed.id
    ? await prisma.blogPost.update({
        where: { id: parsed.id },
        data,
      })
    : await prisma.blogPost.create({
        data,
      });

  const coverImage = formData.get("coverImage");
  if (coverImage instanceof File && coverImage.size > 0) {
    const uploadedFile = await storeUploadedFile({
      file: coverImage,
      category: FileCategory.BLOG_COVER,
      uploadedByUserId: user.id,
      blogPostId: blogPost.id,
    });

    if (uploadedFile) {
      await prisma.blogPost.update({
        where: { id: blogPost.id },
        data: {
          coverImage: `/api/files/${uploadedFile.id}`,
        },
      });
    }
  }

  await logAuditEvent({
    actorId: user.id,
    action: parsed.id ? "blog.updated" : "blog.created",
    entityType: "blogPost",
    entityId: blogPost.id,
    description: `${parsed.id ? "Updated" : "Created"} blog post "${blogPost.title}".`,
    metadata: {
      status: blogPost.status,
      slug: blogPost.slug,
    },
  });

  revalidatePath("/blog");
  revalidatePath(`/blog/${blogPost.slug}`);
  revalidatePath("/admin/blog");
  revalidatePath("/sitemap.xml");
  redirect("/admin/blog?saved=1");
}

export async function updateBlogStatusAction(formData: FormData) {
  assertValidServerActionOrigin();
  const user = await requireAdminUser();

  const id = toRequiredString(formData.get("id"));
  const status = toRequiredString(formData.get("status")) as BlogStatus;

  const post = await prisma.blogPost.update({
    where: { id },
    data: {
      status,
      publishedAt: status === BlogStatus.PUBLISHED ? new Date() : null,
    },
  });

  await logAuditEvent({
    actorId: user.id,
    action: "blog.status.updated",
    entityType: "blogPost",
    entityId: post.id,
    description: `Blog post "${post.title}" moved to ${status}.`,
  });

  revalidatePath("/blog");
  revalidatePath("/admin/blog");
  revalidatePath("/sitemap.xml");
}

export async function deleteBlogPostAction(formData: FormData) {
  assertValidServerActionOrigin();
  const user = await requireAdminUser();

  const id = toRequiredString(formData.get("id"));
  const post = await prisma.blogPost.findUnique({
    where: { id },
    select: { id: true, slug: true, title: true },
  });

  if (!post) {
    return;
  }

  await prisma.blogPost.delete({
    where: { id },
  });

  await logAuditEvent({
    actorId: user.id,
    action: "blog.deleted",
    entityType: "blogPost",
    entityId: post.id,
    description: `Deleted blog post "${post.title}".`,
  });

  revalidatePath("/blog");
  revalidatePath(`/blog/${post.slug}`);
  revalidatePath("/admin/blog");
  revalidatePath("/sitemap.xml");
  redirect("/admin/blog?deleted=1");
}
