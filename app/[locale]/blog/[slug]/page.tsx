import type { Metadata } from "next";
import { BlogStatus } from "@prisma/client";
import { notFound } from "next/navigation";

import BlogPostPage from "@/app/blog/[slug]/page";
import { getBlogPostBySlug } from "@/lib/data/blog";
import { getMessages } from "@/lib/i18n";
import {
  isSupportedLocale,
  localeHreflangMap,
  localeOpenGraphMap,
  locales,
  localizePath,
} from "@/lib/i18n/config";
import { absoluteUrl, createMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";

type LocalizedBlogPostPageProps = {
  params: {
    locale: string;
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
}: LocalizedBlogPostPageProps): Promise<Metadata> {
  if (!isSupportedLocale(params.locale)) {
    return {};
  }

  const locale = params.locale;
  const messages = getMessages(locale);
  const post = await getPublishedPost(params.slug);
  const path = localizePath(`/blog/${params.slug}`, locale);

  const baseMetadata = createMetadata({
    title: post?.seoTitle || post?.title || messages.routes.blog.title,
    description:
      post?.seoDescription || post?.excerpt || messages.routes.blog.description,
    path,
    image: post?.coverImage || "/opengraph-image",
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
  if (!isSupportedLocale(params.locale)) {
    notFound();
  }

  return <BlogPostPage params={{ slug: params.slug }} />;
}
