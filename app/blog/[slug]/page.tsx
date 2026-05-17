import type { Metadata } from "next";
import Image from "next/image";
import { BlogStatus } from "@prisma/client";
import { CalendarDays, Clock3, Share2, Tag } from "lucide-react";
import { notFound } from "next/navigation";

import { createMetadata } from "@/lib/metadata";
import { getBlogPostBySlug, getRelatedBlogPosts } from "@/lib/data/blog";
import { absoluteUrl } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";
import {
  createArticleSchema,
  createBreadcrumbSchema,
  createWebPageSchema,
} from "@/lib/schema";
import { calculateReadingTime } from "@/lib/utils";
import { BlogCard } from "@/components/blog/blog-card";
import { CtaSection } from "@/components/shared/cta-section";
import { FadeIn } from "@/components/shared/fade-in";
import { JsonLd } from "@/components/shared/json-ld";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { getSiteImage } from "@/lib/site-images";

export const dynamic = "force-dynamic";

type BlogPostPageProps = {
  params: {
    slug: string;
  };
};

async function getPublishedPost(slug: string) {
  const post = await getBlogPostBySlug(slug);

  if (!post || post.status !== BlogStatus.PUBLISHED) {
    return null;
  }

  return post;
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const post = await getPublishedPost(params.slug);

  if (!post) {
    return createMetadata({
      title: "Healthcare Insight",
      description: siteConfig.description,
      path: `/blog/${params.slug}`,
    });
  }

  return createMetadata({
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt || siteConfig.description,
    path: `/blog/${post.slug}`,
    image: post.coverImage || "/opengraph-image",
    type: "article",
    publishedTime:
      (post.publishedAt ?? post.createdAt).toISOString(),
    modifiedTime: post.updatedAt.toISOString(),
    authors: [post.authorName || siteConfig.name],
    section: post.category || "Healthcare Insights",
    tags: post.tags,
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getPublishedPost(params.slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = await getRelatedBlogPosts({
    slug: post.slug,
    category: post.category,
    tags: post.tags,
    limit: 3,
  });
  const readingTime = calculateReadingTime(post.content);
  const isHtmlContent = /<([a-z][\w-]*)(?:[^>]*)>/i.test(post.content);
  const encodedUrl = encodeURIComponent(absoluteUrl(`/blog/${post.slug}`));
  const encodedTitle = encodeURIComponent(post.title);
  const fallbackCover = getSiteImage("blogHealthcareNews01");
  const coverSrc = post.coverImage || fallbackCover.path;

  return (
    <>
      <JsonLd
        data={[
          createArticleSchema({
            title: post.seoTitle || post.title,
            description: post.seoDescription || post.excerpt || siteConfig.description,
            slug: post.slug,
            publishedAt: post.publishedAt ?? post.createdAt,
            updatedAt: post.updatedAt,
            coverImage: post.coverImage,
            authorName: post.authorName,
            tags: post.tags,
            focusKeyword: post.focusKeyword,
          }),
          createWebPageSchema({
            name: post.title,
            description: post.seoDescription || post.excerpt || siteConfig.description,
            path: `/blog/${post.slug}`,
          }),
          createBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: post.title, path: `/blog/${post.slug}` },
          ]),
        ]}
      />
      <section className="relative overflow-hidden border-b border-slate-200/80 bg-hero-mesh">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(125,211,252,0.16),transparent_26%),radial-gradient(circle_at_82%_0%,rgba(96,165,250,0.18),transparent_24%)]" />
        <div className="relative mx-auto max-w-5xl px-6 py-20 lg:px-8 lg:py-24">
          <FadeIn>
            <div className="flex flex-wrap gap-3">
              <Badge>{post.category || "Healthcare Insights"}</Badge>
              {post.tags?.slice(0, 2).map((tag) => (
                <Badge key={tag} variant="default">
                  {tag}
                </Badge>
              ))}
            </div>
            <h1 className="mt-6 max-w-4xl font-display text-4xl font-semibold leading-tight text-slate-950 sm:text-5xl lg:text-6xl">
              {post.title}
            </h1>
            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-slate-500">
              <span className="inline-flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-sky-700" />
                {(post.publishedAt ?? post.createdAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
              <span className="inline-flex items-center gap-2">
                <Clock3 className="h-4 w-4 text-sky-700" />
                {readingTime} min read
              </span>
              <span>{siteConfig.name}</span>
            </div>
            {post.excerpt ? (
              <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
                {post.excerpt}
              </p>
            ) : null}
          </FadeIn>
        </div>
      </section>
      <section className="px-6 py-20 lg:px-8">
        <FadeIn className="mx-auto max-w-4xl">
          <Card className="overflow-hidden border-slate-200/80 p-0">
            <div className="border-b border-slate-200/80 bg-slate-100">
              <Image
                src={coverSrc}
                alt={post.coverImage ? post.title : fallbackCover.alt}
                width={1600}
                height={900}
                className="h-auto w-full object-cover"
              />
            </div>
            <article className="p-7 sm:p-10">
              {isHtmlContent ? (
                <div
                  className="max-w-none text-base leading-8 text-slate-700 [&_h1]:font-display [&_h1]:text-slate-950 [&_h2]:font-display [&_h2]:text-slate-950 [&_h3]:font-display [&_h3]:text-slate-950 [&_strong]:text-slate-950 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              ) : (
                <div className="max-w-none whitespace-pre-wrap text-base leading-8 text-slate-700">
                  {post.content}
                </div>
              )}
            </article>
          </Card>
        </FadeIn>
      </section>
      <section className="px-6 py-8 lg:px-8">
        <FadeIn className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1fr_0.9fr]">
          <Card className="border-slate-200/80 p-7">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-sky-100 bg-sky-50 text-sky-700">
                <Tag className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-700">
                  Tags & Topics
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {(post.tags?.length ? post.tags : ["Healthcare Insights"]).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Card>
          <Card className="border-slate-200/80 p-7">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-sky-100 bg-sky-50 text-sky-700">
                <Share2 className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-700">
                  Share Article
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                  >
                    LinkedIn
                  </a>
                  <a
                    href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                  >
                    X
                  </a>
                  <a
                    href={`mailto:?subject=${encodedTitle}&body=${encodedUrl}`}
                    className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                  >
                    Email
                  </a>
                </div>
              </div>
            </div>
          </Card>
        </FadeIn>
      </section>
      <section className="px-6 pb-8 lg:px-8">
        <FadeIn className="mx-auto max-w-7xl">
          <Card className="border-slate-200/80 p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-700">
              Author
            </p>
            <div className="mt-5 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
              <div>
                <h2 className="font-display text-3xl font-semibold text-slate-950">
                  {post.authorName || "MedPobeda Group Editorial Team"}
                </h2>
                <p className="mt-2 text-base text-sky-700">
                  {post.authorRole || "Healthcare collaboration editorial perspective"}
                </p>
              </div>
              <p className="text-base leading-8 text-slate-600">
                {post.authorBio ||
                  "This article reflects the MedPobeda Group editorial focus on healthcare collaboration, medical tourism coordination, hospital partnerships, and international patient workflows."}
              </p>
            </div>
          </Card>
        </FadeIn>
      </section>
      {relatedPosts.length ? (
        <section className="px-6 py-12 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <FadeIn>
              <h2 className="font-display text-3xl font-semibold text-slate-950 sm:text-4xl">
                Related Insights
              </h2>
              <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">
                Continue exploring healthcare collaboration themes connected to this article.
              </p>
            </FadeIn>
            <div className="mt-10 grid gap-6 lg:grid-cols-3">
              {relatedPosts.map((relatedPost, index) => (
                <FadeIn key={relatedPost.id} delay={index * 0.06}>
                  <BlogCard post={relatedPost} />
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      ) : null}
      <CtaSection
        title="Move from insight to execution"
        description="Speak with MedPobeda Group for hospital collaboration, medical tourism coordination, or international patient support."
        primary={{ label: "Contact MedPobeda Group", href: "/contact" }}
        secondary={{ label: "Back to Blog", href: "/blog" }}
        imageKey="blogConferenceReport"
      />
    </>
  );
}
