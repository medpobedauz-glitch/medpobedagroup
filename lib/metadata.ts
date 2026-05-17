import type { Metadata } from "next";

import { siteConfig } from "@/lib/site";

export const defaultKeywords = [
  "MedPobeda Group",
  "medical tourism Uzbekistan",
  "hospital partnerships India Uzbekistan",
  "international patient support",
  "healthcare collaboration Central Asia",
  "student mobility clinical training",
  "international healthcare facilitation",
  "India Uzbekistan healthcare bridge",
];

export function absoluteUrl(path = "/", baseUrl = siteConfig.siteUrl) {
  return new URL(path, baseUrl).toString();
}

type CreateMetadataParams = {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
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
  keywords = [],
  image = "/opengraph-image",
  type = "website",
  noindex = false,
  publishedTime,
  modifiedTime,
  authors,
  section,
  tags,
}: CreateMetadataParams): Metadata {
  const url = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);

  return {
    title,
    description,
    keywords: [...defaultKeywords, ...keywords],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      type,
      locale: "en_US",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} social preview`,
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
      title,
      description,
      images: [imageUrl],
    },
    robots: {
      index: !noindex,
      follow: !noindex,
    },
  };
}
