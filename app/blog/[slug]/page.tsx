import type { Metadata } from "next";
import Link from "next/link";
import { CalendarDays, Clock3, RefreshCcw, UserRound } from "lucide-react";
import { notFound } from "next/navigation";

import { ArticleContent } from "@/components/blog/ArticleContent";
import { ArticleDisclaimer } from "@/components/blog/ArticleDisclaimer";
import { BlogContactCta } from "@/components/blog/BlogContactCta";
import { BlogFaq } from "@/components/blog/BlogFaq";
import { RelatedArticles } from "@/components/blog/RelatedArticles";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { FadeIn } from "@/components/shared/fade-in";
import { JsonLd } from "@/components/shared/json-ld";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import {
  getBlogPostBySlug,
  getPublishedBlogSlugs,
  getRelatedBlogPosts,
} from "@/lib/data/blog";
import { defaultLocale, localizePath, type AppLocale } from "@/lib/i18n/config";
import { getMessages } from "@/lib/i18n";
import { media } from "@/lib/media";
import { createMetadata } from "@/lib/metadata";
import {
  createArticleSchema,
  createBreadcrumbSchema,
  createFaqSchema,
  createWebPageSchema,
} from "@/lib/schema";
import { siteConfig } from "@/lib/site";

type BlogPostPageProps = {
  params: {
    slug: string;
  };
  locale?: AppLocale;
};

function getArticleServiceLinks(locale: AppLocale, slug: string, messages: ReturnType<typeof getMessages>) {
  const partnershipSlugs = new Set([
    "india-uzbekistan-healthcare-collaboration-opportunities",
    "hospital-partnership-opportunities-in-uzbekistan",
    "tashkent-healthcare-collaboration-hub-central-asia",
    "how-hospitals-build-international-patient-referral-pathways",
    "international-healthcare-partnerships-patient-access",
  ]);

  if (partnershipSlugs.has(slug)) {
    return [
      {
        href: localizePath("/hospital-partnerships", locale),
        label: messages.routes["hospital-partnerships"].title,
      },
      {
        href: localizePath("/company-profile", locale),
        label: messages.routes["company-profile"].title,
      },
    ];
  }

  if (slug === "student-mobility-support-in-uzbekistan-guide") {
    return [
      {
        href: localizePath("/student-mobility", locale),
        label: messages.routes["student-mobility"].title,
      },
      {
        href: localizePath("/company-profile", locale),
        label: messages.routes["company-profile"].title,
      },
    ];
  }

  return [
    {
      href: localizePath("/international-patient-care", locale),
      label: messages.chrome.navigation.medicalTourism,
    },
    {
      href: localizePath("/treatment-in-india", locale),
      label: messages.routes["treatment-in-india"].title,
    },
    {
      href: localizePath("/international-patients", locale),
      label: messages.routes["international-patients"].title,
    },
  ];
}

export function generateStaticParams() {
  return getPublishedBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const locale = defaultLocale;
  const messages = getMessages(locale);
  const post = await getBlogPostBySlug(params.slug, locale);

  if (!post) {
    return createMetadata({
      title: messages.pages.blogPost.fallbackTitle,
      description: messages.routes.blog.description,
      path: `/blog/${params.slug}`,
      locale,
    });
  }

  return createMetadata({
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt || messages.routes.blog.description,
    path: `/blog/${post.slug}`,
    locale,
    image: post.coverImage || media.defaults.blog.src,
    type: "article",
    publishedTime: (post.publishedAt ?? post.createdAt).toISOString(),
    modifiedTime: post.updatedAt.toISOString(),
    authors: [post.authorName || siteConfig.name],
    section: post.category || messages.routes.blog.title,
    tags: post.tags,
    keywords: post.keywords,
  });
}

export default async function BlogPostPage({
  params,
  locale = defaultLocale,
}: BlogPostPageProps) {
  const messages = getMessages(locale);
  const page = messages.pages.blogPost;
  const post = await getBlogPostBySlug(params.slug, locale);

  if (!post) {
    notFound();
  }

  const relatedPosts = await getRelatedBlogPosts({
    slug: post.slug,
    category: post.category,
    tags: post.tags,
    locale,
    limit: 3,
  });
  const articlePath = `/blog/${post.slug}`;
  const breadcrumbItems = [
    { name: messages.chrome.navigation.home, path: "/" },
    { name: messages.routes.blog.title, path: "/blog" },
    { name: post.title, path: articlePath },
  ];
  const articleServiceLinks = getArticleServiceLinks(locale, post.slug, messages);

  return (
    <>
      <JsonLd
        data={[
          createArticleSchema({
            title: post.seoTitle || post.title,
            description: post.seoDescription || post.excerpt || messages.routes.blog.description,
            slug: post.slug,
            publishedAt: post.publishedAt ?? post.createdAt,
            updatedAt: post.updatedAt,
            coverImage: post.coverImage,
            authorName: post.authorName,
            fallbackAuthorName: messages.site.editorialTeam,
            tags: post.tags,
            focusKeyword: post.focusKeyword,
            locale,
            path: articlePath,
          }),
          createWebPageSchema({
            name: post.title,
            description: post.seoDescription || post.excerpt || messages.routes.blog.description,
            path: articlePath,
            locale,
          }),
          createBreadcrumbSchema(breadcrumbItems, locale),
          ...(post.faqs.length ? [createFaqSchema(post.faqs)] : []),
        ]}
      />
      <section className="relative overflow-hidden border-b border-slate-200/70 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.18),transparent_28%),linear-gradient(180deg,#ffffff_0%,#f7fbff_58%,#ffffff_100%)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_4%,rgba(29,78,216,0.08),transparent_26%)]" />
        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="grid gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
            <div>
              <nav className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
                {breadcrumbItems.map((item, index) => (
                  <span key={item.path} className="inline-flex items-center gap-2">
                    {index > 0 ? <span>/</span> : null}
                    {index < breadcrumbItems.length - 1 ? (
                      <Link
                        href={localizePath(item.path, locale)}
                        className="transition hover:text-sky-700"
                      >
                        {item.name}
                      </Link>
                    ) : (
                      <span>{item.name}</span>
                    )}
                  </span>
                ))}
              </nav>
              <div className="mt-5 flex flex-wrap gap-3">
                {post.category ? <Badge>{post.category}</Badge> : null}
                {post.translationStatus === "summary-only" ? (
                  <Badge variant="surface">{page.translationStatusBadge}</Badge>
                ) : null}
              </div>
              <h1 className="mt-5 max-w-4xl font-display text-4xl font-semibold leading-tight text-slate-950 sm:text-5xl lg:text-6xl">
                {post.title}
              </h1>
              <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
                {post.excerpt}
              </p>
              <div className="mt-7 grid gap-3 text-sm text-slate-500 sm:grid-cols-2 xl:grid-cols-4">
                <span className="inline-flex items-center gap-2">
                  <UserRound className="h-4 w-4 text-sky-700" />
                  {post.authorName || messages.site.editorialTeam}
                </span>
                <span className="inline-flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 text-sky-700" />
                  {page.publishedLabel}:{" "}
                  {(post.publishedAt ?? post.createdAt).toLocaleDateString(
                    locale === "en" ? "en-US" : undefined,
                    {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    },
                  )}
                </span>
                <span className="inline-flex items-center gap-2">
                  <RefreshCcw className="h-4 w-4 text-sky-700" />
                  {page.updatedLabel}:{" "}
                  {post.updatedAt.toLocaleDateString(locale === "en" ? "en-US" : undefined, {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
                <span className="inline-flex items-center gap-2">
                  <Clock3 className="h-4 w-4 text-sky-700" />
                  {post.readingTime} {messages.chrome.blogCard.minRead}
                </span>
              </div>
            </div>
            <Card className="overflow-hidden border-slate-200/80 p-0 shadow-[0_28px_80px_rgba(8,22,52,0.12)]">
              <div className="relative aspect-[16/12]">
                <ImageWithFallback
                  src={post.coverImage || media.defaults.blog.src}
                  alt={post.featuredImageAlt || media.defaults.blog.alt}
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  fallbackLabel={post.title}
                  className="object-cover"
                />
              </div>
            </Card>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_18rem]">
          <div className="space-y-6">
            {post.translationNote ? (
              <Card className="border-sky-100 bg-[linear-gradient(180deg,rgba(255,255,255,0.99),rgba(239,246,255,0.96))] p-5">
                <h2 className="font-display text-xl font-semibold text-slate-950">
                  {page.translationStatusTitle}
                </h2>
                <p className="mt-2 text-sm leading-7 text-slate-600 sm:text-base">
                  {post.translationNote}
                </p>
              </Card>
            ) : null}
            <ArticleDisclaimer title={page.disclaimerTitle} body={page.disclaimerBody} />
            <div className="text-sm text-slate-500">
              <Link
                href={localizePath("/medical-disclaimer", locale)}
                className="font-semibold text-sky-700 transition hover:text-sky-800"
              >
                {page.disclaimerLinkLabel}
              </Link>
            </div>
            <Card className="border-slate-200/80 p-5">
              <h2 className="font-display text-xl font-semibold text-slate-950">
                {page.serviceLinksTitle}
              </h2>
              <p className="mt-2 text-sm leading-7 text-slate-600 sm:text-base">
                {page.serviceLinksDescription}
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                {articleServiceLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-sky-200 hover:text-sky-700"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </Card>
            <ArticleContent sections={post.sections} />
          </div>
          <TableOfContents
            title={page.tableOfContentsTitle}
            items={post.sections.map((section) => ({
              id: section.id,
              title: section.title,
            }))}
          />
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <FadeIn>
          <BlogFaq
            title={page.faqTitle}
            description={page.faqDescription}
            items={post.faqs}
          />
        </FadeIn>
      </section>
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <FadeIn>
          <BlogContactCta
            locale={locale}
            title={page.cta.title}
            description={page.cta.description}
            whatsappLabel={page.cta.whatsapp}
            telegramLabel={page.cta.telegram}
            emailLabel={page.cta.email}
            contactPageLabel={page.cta.contactPage}
          />
        </FadeIn>
      </section>
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <FadeIn>
          <RelatedArticles
            locale={locale}
            title={page.related.title}
            description={page.related.description}
            posts={relatedPosts}
            readLabel={messages.chrome.blogCard.readArticle}
            featuredLabel={messages.chrome.blogCard.featured}
            minReadLabel={messages.chrome.blogCard.minRead}
          />
        </FadeIn>
      </section>
    </>
  );
}
