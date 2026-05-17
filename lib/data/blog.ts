import "server-only";

import { BlogStatus } from "@prisma/client";
import { unstable_noStore as noStore } from "next/cache";

import { env } from "@/lib/env";
import { prisma } from "@/lib/prisma";

export async function getPublishedBlogPosts(filters?: {
  search?: string;
  category?: string;
  tag?: string;
  featuredOnly?: boolean;
}) {
  noStore();

  if (!env.DATABASE_URL) {
    return [];
  }

  return prisma.blogPost.findMany({
    where: {
      status: BlogStatus.PUBLISHED,
      ...(filters?.featuredOnly ? { featured: true } : {}),
      ...(filters?.category
        ? { category: { equals: filters.category, mode: "insensitive" } }
        : {}),
      ...(filters?.tag ? { tags: { has: filters.tag.toLowerCase() } } : {}),
      ...(filters?.search
        ? {
            OR: [
              { title: { contains: filters.search, mode: "insensitive" } },
              { excerpt: { contains: filters.search, mode: "insensitive" } },
              { content: { contains: filters.search, mode: "insensitive" } },
              { category: { contains: filters.search, mode: "insensitive" } },
            ],
          }
        : {}),
    },
    orderBy: [{ featured: "desc" }, { publishedAt: "desc" }, { createdAt: "desc" }],
  });
}

export async function getAdminBlogPosts() {
  noStore();

  if (!env.DATABASE_URL) {
    return [];
  }

  return prisma.blogPost.findMany({
    orderBy: { updatedAt: "desc" },
  });
}

export async function getBlogPostBySlug(slug: string) {
  noStore();

  if (!env.DATABASE_URL) {
    return null;
  }

  return prisma.blogPost.findUnique({
    where: { slug },
  });
}

export async function getBlogTaxonomy() {
  noStore();

  if (!env.DATABASE_URL) {
    return {
      categories: [] as string[],
      tags: [] as string[],
      featuredPosts: [] as Awaited<ReturnType<typeof getPublishedBlogPosts>>,
    };
  }

  const posts = await prisma.blogPost.findMany({
    where: { status: BlogStatus.PUBLISHED },
    orderBy: [{ featured: "desc" }, { publishedAt: "desc" }],
  });

  return {
    categories: Array.from(
      new Set(posts.map((post) => post.category).filter(Boolean) as string[]),
    ),
    tags: Array.from(new Set(posts.flatMap((post) => post.tags))).slice(0, 20),
    featuredPosts: posts.filter((post) => post.featured).slice(0, 3),
  };
}

export async function getRelatedBlogPosts({
  slug,
  category,
  tags = [],
  limit = 3,
}: {
  slug: string;
  category?: string | null;
  tags?: string[];
  limit?: number;
}) {
  noStore();

  if (!env.DATABASE_URL) {
    return [];
  }

  const relationFilters = [
    category ? { category } : undefined,
    tags.length ? { tags: { hasSome: tags } } : undefined,
  ].filter(Boolean) as Array<Record<string, unknown>>;

  const related = await prisma.blogPost.findMany({
    where: {
      status: BlogStatus.PUBLISHED,
      slug: { not: slug },
      ...(relationFilters.length ? { OR: relationFilters } : {}),
    },
    orderBy: [{ publishedAt: "desc" }, { updatedAt: "desc" }],
    take: limit,
  });

  if (related.length >= limit) {
    return related;
  }

  const fallback = await prisma.blogPost.findMany({
    where: {
      status: BlogStatus.PUBLISHED,
      slug: { not: slug },
      id: { notIn: related.map((post) => post.id) },
    },
    orderBy: [{ publishedAt: "desc" }, { updatedAt: "desc" }],
    take: limit - related.length,
  });

  return [...related, ...fallback];
}
