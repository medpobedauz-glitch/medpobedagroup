import { getRouteLocale } from "@/lib/i18n/request";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import BlogPostPage from "@/app/blog/[slug]/page";
import { getBlogPostBySlug, getPublishedBlogSlugs } from "@/lib/data/blog";
import { getMessages } from "@/lib/i18n";
import {
  isSupportedLocale,
  localeHreflangMap,
  localeOpenGraphMap,
  locales,
  localizePath,
} from "@/lib/i18n/config";
import { media } from "@/lib/media";
import { absoluteUrl, createMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";

type LocalizedBlogPostPageProps = {
  params: {
    locale: string;
    slug: string;
  };
};

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    getPublishedBlogSlugs().map((slug) => ({
      locale,
      slug,
    })),
  );
}

export async function generateMetadata({
  params,
}: LocalizedBlogPostPageProps): Promise<Metadata> {
  if (!isSupportedLocale(getRouteLocale(params?.locale))) {
    return {};
  }

  const locale = getRouteLocale(params?.locale);
  const messages = getMessages(locale);
  const post = await getBlogPostBySlug(params.slug, locale);
  const path = localizePath(`/blog/${params.slug}`, locale);

  const baseMetadata = createMetadata({
    title: post?.seoTitle || post?.title || messages.routes.blog.title,
    description:
      post?.seoDescription || post?.excerpt || messages.routes.blog.description,
    path,
    image: post?.coverImage || media.defaults.blog.src,
    type: "article",
    publishedTime: (post?.publishedAt ?? post?.createdAt)?.toISOString(),
    modifiedTime: post?.updatedAt?.toISOString(),
    authors: [post?.authorName || siteConfig.name],
    section: post?.category || messages.routes.blog.title,
    tags: post?.tags || [],
  });

  return {
    ...baseMetadata,
    alternates: {
      canonical: absoluteUrl(path),
      languages: Object.fromEntries(
        [
          ...locales.map((item) => [
            localeHreflangMap[item],
            absoluteUrl(localizePath(`/blog/${params.slug}`, item)),
          ]),
          ["x-default", absoluteUrl(localizePath(`/blog/${params.slug}`, "en"))],
        ],
      ),
    },
    openGraph: {
      ...baseMetadata.openGraph,
      locale: localeOpenGraphMap[locale],
    },
  };
}

export default function LocalizedBlogPostPage({
  params,
}: LocalizedBlogPostPageProps) {
  if (!isSupportedLocale(getRouteLocale(params?.locale))) {
    notFound();
  }

  return <BlogPostPage params={{ slug: params.slug }} locale={getRouteLocale(params?.locale)} />;
}
