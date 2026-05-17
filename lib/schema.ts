import type { FaqItem } from "@/lib/content";
import { absoluteUrl } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  url: siteConfig.siteUrl,
  image: absoluteUrl("/opengraph-image"),
  description: siteConfig.description,
  slogan: siteConfig.tagline,
  areaServed: ["Uzbekistan", "India", "Central Asia"],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Tashkent",
    addressCountry: "UZ",
  },
  contactPoint: [
    siteConfig.contactEmail
      ? {
          "@type": "ContactPoint",
          contactType: "customer support",
          email: siteConfig.contactEmail,
          areaServed: ["Uzbekistan", "India", "Central Asia"],
          availableLanguage: [
            "English",
            "Russian",
            "Uzbek",
            "Kazakh",
            "Kyrgyz",
            "Tajik",
            "Turkmen",
          ],
        }
      : null,
  ].filter(Boolean),
  knowsAbout: [
    "Medical tourism",
    "Hospital partnerships",
    "International patient assistance",
    "Patient coordination",
    "Telemedicine coordination",
    "Student mobility",
  ],
};

export function createBreadcrumbSchema(
  items: Array<{ name: string; path: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function createFaqSchema(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function createWebPageSchema({
  name,
  description,
  path,
  type = "WebPage",
}: {
  name: string;
  description: string;
  path: string;
  type?: "WebPage" | "AboutPage" | "ContactPage" | "CollectionPage";
}) {
  return {
    "@context": "https://schema.org",
    "@type": type,
    name,
    description,
    url: absoluteUrl(path),
    isPartOf: absoluteUrl("/"),
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.siteUrl,
    },
  };
}

export function createServiceSchema({
  name,
  description,
  path,
}: {
  name: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: absoluteUrl(path),
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.siteUrl,
    },
    areaServed: ["Uzbekistan", "India", "Central Asia"],
    serviceType: name,
  };
}

export function createArticleSchema({
  title,
  description,
  slug,
  publishedAt,
  updatedAt,
  coverImage,
  authorName,
  tags = [],
  focusKeyword,
}: {
  title: string;
  description: string;
  slug: string;
  publishedAt: Date;
  updatedAt: Date;
  coverImage?: string | null;
  authorName?: string | null;
  tags?: string[];
  focusKeyword?: string | null;
}) {
  const keywords = Array.from(new Set([...tags, focusKeyword].filter(Boolean)));

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    datePublished: publishedAt.toISOString(),
    dateModified: updatedAt.toISOString(),
    image: coverImage ? absoluteUrl(coverImage) : absoluteUrl("/opengraph-image"),
    mainEntityOfPage: absoluteUrl(`/blog/${slug}`),
    author: {
      "@type": "Person",
      name: authorName || "MedPobeda Group Editorial Team",
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/opengraph-image"),
      },
    },
    keywords: keywords.join(", "),
  };
}
