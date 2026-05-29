import type { Metadata } from "next";

import type { AppLocale } from "@/lib/i18n/config";
import {
  defaultLocale,
  localeHreflangMap,
  localeOpenGraphMap,
  locales,
  localizePath,
  stripLocaleFromPath,
} from "@/lib/i18n/config";
import { media } from "@/lib/media";
import { resolveSeoImage } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const defaultKeywords: string[] = [];

export function absoluteUrl(path = "/", baseUrl = siteConfig.siteUrl) {
  return new URL(path, baseUrl).toString();
}

type CreateMetadataParams = {
  title: string;
  description: string;
  path?: string;
  locale?: AppLocale;
  keywords?: string[];
  ogTitle?: string;
  ogDescription?: string;
  image?: string;
  type?: "website" | "article";
  noindex?: boolean;
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  section?: string;
  tags?: string[];
};

export function createMetadata({
  title,
  description,
  path = "/",
  locale,
  keywords = [],
  ogTitle,
  ogDescription,
  image,
  type = "website",
  noindex = false,
  publishedTime,
  modifiedTime,
  authors,
  section,
  tags,
}: CreateMetadataParams): Metadata {
  const normalizedPath = locale ? stripLocaleFromPath(path) : path;
  const localizedPath = locale ? localizePath(normalizedPath, locale) : path;
  const url = absoluteUrl(localizedPath);
  const seoImage = resolveSeoImage(normalizedPath, image);
  const imageUrl = absoluteUrl(seoImage.src);
  const alternates = locale
    ? {
        canonical: url,
        languages: Object.fromEntries(
          [
            ...locales.map((item) => [
              localeHreflangMap[item],
              absoluteUrl(localizePath(normalizedPath, item)),
            ]),
            ["x-default", absoluteUrl(localizePath(normalizedPath, defaultLocale))],
          ],
        ),
      }
    : {
        canonical: url,
      };

  return {
    title,
    description,
    keywords: [...defaultKeywords, ...keywords],
    alternates,
    openGraph: {
      title: ogTitle ?? title,
      description: ogDescription ?? description,
      url,
      siteName: siteConfig.name,
      type,
      locale: locale ? localeOpenGraphMap[locale] : "en_US",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: seoImage.alt || siteConfig.socialPreviewAlt || media.brand.openGraph.alt,
        },
      ],
      publishedTime,
      modifiedTime,
      authors,
      section,
      tags,
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle ?? title,
      description: ogDescription ?? description,
      images: [imageUrl],
    },
    robots: {
      index: !noindex,
      follow: !noindex,
    },
  };
}
