import type { FaqItem } from "@/lib/content";
import type { AppLocale } from "@/lib/i18n/config";
import { localizePath } from "@/lib/i18n/config";
import { media } from "@/lib/media";
import { absoluteUrl } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";

export const servedRegions = [
  "Uzbekistan",
  "Tashkent",
  "India",
  "Kazakhstan",
  "Kyrgyzstan",
  "Tajikistan",
  "Turkmenistan",
  "Russia",
  "Central Asia",
  "Commonwealth of Independent States",
] as const;

export const servedRegionCountries = [
  "UZ",
  "KZ",
  "KG",
  "TJ",
  "TM",
  "RU",
  "IN",
] as const;

export const supportedLanguages = [
  "English",
  "Russian",
  "Uzbek",
  "Kazakh",
  "Kyrgyz",
  "Tajik",
  "Turkmen",
] as const;

const healthcareTopics = [
  "Medical tourism",
  "Treatment in India",
  "International patient coordination",
  "VIP medical concierge",
  "Doctor collaboration",
  "Telemedicine",
  "Organ transplant coordination",
  "Oncology referrals",
  "Cardiology referrals",
  "Neurosurgery referrals",
  "Orthopedic treatment",
  "Hospital partnerships",
  "Healthcare consultancy",
  "Corporate healthcare collaboration",
  "Second medical opinions",
  "Air ambulance coordination",
  "Medical visa support",
  "Cancer treatment in India",
  "Heart surgery in India",
  "Liver transplant India",
  "Kidney transplant India",
  "Bone marrow transplant India",
  "Knee replacement India",
  "Spine surgery India",
  "IVF treatment India",
  "Fertility treatment India",
] as const;

const serviceCatalog = [
  "Medical tourism planning",
  "Treatment in India facilitation",
  "International patient inquiry handling",
  "VIP medical concierge",
  "Second medical opinion routing",
  "Hospital appointment planning",
  "Medical visa guidance",
  "Telemedicine coordination",
  "Organ transplant inquiry routing",
  "Oncology referral planning",
  "Cardiology referral planning",
  "Neurosurgery referral planning",
  "Orthopedic treatment routing",
  "Hospital partnership development",
  "Healthcare consultancy",
  "Corporate healthcare collaboration",
  "Air ambulance coordination",
] as const;

function getOrganizationId() {
  return `${siteConfig.siteUrl}#organization`;
}

function getWebsiteId() {
  return `${siteConfig.siteUrl}#website`;
}

function getLocalBusinessId() {
  return `${siteConfig.siteUrl}#localbusiness`;
}

function getMedicalBusinessId() {
  return `${siteConfig.siteUrl}#medicalbusiness`;
}

function createAddressNode(location: string) {
  return {
    "@type": "PostalAddress",
    addressLocality: location.split(",")[0]?.trim() || location,
    addressCountry: "UZ",
    addressRegion: "Tashkent",
  };
}

function createContactPointNode() {
  return {
    "@type": "ContactPoint",
    contactType: "customer support",
    email: siteConfig.contactEmail,
    telephone: siteConfig.contactPhone,
    areaServed: [...servedRegions],
    availableLanguage: [...supportedLanguages],
    url: siteConfig.telegramUrl,
    contactOption: ["TollFree", "Telegram", "WhatsApp"],
  };
}

function createOrganizationNode({
  name,
  description,
  tagline,
  location,
}: {
  name: string;
  description: string;
  tagline: string;
  location: string;
}) {
  return {
    "@type": "Organization",
    "@id": getOrganizationId(),
    name,
    legalName: siteConfig.legalName,
    alternateName: [
      siteConfig.companyName,
      siteConfig.legalName,
      "MedPobeda",
      "MedPobeda Tashkent",
    ],
    url: siteConfig.siteUrl,
    image: absoluteUrl(media.brand.openGraph.src),
    logo: absoluteUrl(media.brand.logo.src),
    description,
    slogan: tagline,
    email: siteConfig.contactEmail,
    telephone: siteConfig.contactPhone,
    areaServed: [...servedRegions],
    address: createAddressNode(location),
    sameAs: Object.values(siteConfig.socialLinks).filter(Boolean),
    contactPoint: [createContactPointNode()],
    knowsAbout: [...healthcareTopics],
    foundingLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Tashkent",
        addressCountry: "UZ",
      },
    },
  };
}

function createWebsiteNode({
  locale,
  description,
}: {
  locale: AppLocale;
  description: string;
}) {
  const localizedHomeUrl = absoluteUrl(localizePath("/", locale));

  return {
    "@type": "WebSite",
    "@id": getWebsiteId(),
    name: siteConfig.name,
    alternateName: siteConfig.legalName,
    url: localizedHomeUrl,
    description,
    inLanguage: locale,
    publisher: {
      "@id": getOrganizationId(),
    },
    about: {
      "@id": getMedicalBusinessId(),
    },
  };
}

function createLocalBusinessNode({
  description,
  location,
}: {
  description: string;
  location: string;
}) {
  return {
    "@type": "LocalBusiness",
    "@id": getLocalBusinessId(),
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: siteConfig.siteUrl,
    image: absoluteUrl(media.brand.openGraph.src),
    description,
    email: siteConfig.contactEmail,
    telephone: siteConfig.contactPhone,
    address: createAddressNode(location),
    areaServed: [...servedRegions],
    availableLanguage: [...supportedLanguages],
    parentOrganization: {
      "@id": getOrganizationId(),
    },
    sameAs: Object.values(siteConfig.socialLinks).filter(Boolean),
    geo: {
      "@type": "GeoCoordinates",
      latitude: "41.2995",
      longitude: "69.2401",
    },
    priceRange: "$$",
  };
}

function createMedicalBusinessNode({
  description,
  location,
}: {
  description: string;
  location: string;
}) {
  return {
    "@type": "MedicalBusiness",
    "@id": getMedicalBusinessId(),
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: siteConfig.siteUrl,
    image: absoluteUrl(media.brand.openGraph.src),
    description,
    email: siteConfig.contactEmail,
    telephone: siteConfig.contactPhone,
    address: createAddressNode(location),
    areaServed: [...servedRegions],
    availableLanguage: [...supportedLanguages],
    parentOrganization: {
      "@id": getOrganizationId(),
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "International healthcare services",
      itemListElement: serviceCatalog.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service,
          areaServed: [...servedRegions],
          provider: {
            "@id": getOrganizationId(),
          },
        },
      })),
    },
    knowsAbout: [...healthcareTopics],
    medicalSpecialty: [
      "Oncology",
      "Cardiology",
      "Neurology",
      "Neurosurgery",
      "Orthopedics",
      "Organ Transplant",
      "Reproductive Medicine",
      "Pediatrics",
      "General Surgery",
    ],
  };
}

function createWebPageNode({
  locale,
  name,
  description,
  path,
  type = "WebPage",
  significantLinks = [],
}: {
  locale: AppLocale;
  name: string;
  description: string;
  path: string;
  type?: "WebPage" | "AboutPage" | "ContactPage" | "CollectionPage";
  significantLinks?: string[];
}) {
  const localizedPath = localizePath(path, locale);

  return {
    "@type": type,
    "@id": `${absoluteUrl(localizedPath)}#webpage`,
    name,
    description,
    url: absoluteUrl(localizedPath),
    inLanguage: locale,
    isPartOf: {
      "@id": getWebsiteId(),
    },
    about: {
      "@id": getMedicalBusinessId(),
    },
    publisher: {
      "@id": getOrganizationId(),
    },
    ...(significantLinks.length > 0
      ? {
          significantLink: significantLinks.map((item) =>
            absoluteUrl(localizePath(item, locale)),
          ),
        }
      : {}),
  };
}

function createSiteNavigationNodes({
  locale,
  items,
}: {
  locale: AppLocale;
  items: Array<{ name: string; path: string }>;
}) {
  return items.map((item) => ({
    "@type": "SiteNavigationElement",
    "@id": `${absoluteUrl(localizePath(item.path, locale))}#navigation`,
    name: item.name,
    url: absoluteUrl(localizePath(item.path, locale)),
    inLanguage: locale,
  }));
}

export function createOrganizationSchema({
  name,
  description,
  tagline,
  location,
}: {
  name: string;
  description: string;
  tagline: string;
  location: string;
}) {
  return {
    "@context": "https://schema.org",
    ...createOrganizationNode({ name, description, tagline, location }),
  };
}

export function createWebsiteSchema({
  locale,
  description,
}: {
  locale: AppLocale;
  description: string;
}) {
  return {
    "@context": "https://schema.org",
    ...createWebsiteNode({ locale, description }),
  };
}

export function createLocalBusinessSchema({
  description,
  location,
}: {
  description: string;
  location: string;
}) {
  return {
    "@context": "https://schema.org",
    ...createLocalBusinessNode({ description, location }),
  };
}

export function createMedicalBusinessSchema({
  description,
  location,
}: {
  description: string;
  location: string;
}) {
  return {
    "@context": "https://schema.org",
    ...createMedicalBusinessNode({ description, location }),
  };
}

export function createHomePageSchemaGraph({
  locale,
  name,
  description,
  tagline,
  location,
  navigationItems = [],
}: {
  locale: AppLocale;
  name: string;
  description: string;
  tagline: string;
  location: string;
  navigationItems?: Array<{ name: string; path: string }>;
}) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      createOrganizationNode({ name, description, tagline, location }),
      createWebsiteNode({ locale, description }),
      createLocalBusinessNode({ description, location }),
      createMedicalBusinessNode({ description, location }),
      createWebPageNode({
        locale,
        name,
        description,
        path: "/",
        significantLinks: navigationItems.map((item) => item.path),
      }),
      ...createSiteNavigationNodes({ locale, items: navigationItems }),
    ],
  };
}

export function createBreadcrumbSchema(
  items: Array<{ name: string; path: string }>,
  locale?: AppLocale,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(locale ? localizePath(item.path, locale) : item.path),
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
  locale,
}: {
  name: string;
  description: string;
  path: string;
  type?: "WebPage" | "AboutPage" | "ContactPage" | "CollectionPage";
  locale?: AppLocale;
}) {
  const url = absoluteUrl(locale ? localizePath(path, locale) : path);

  return {
    "@context": "https://schema.org",
    "@type": type,
    "@id": `${url}#webpage`,
    name,
    description,
    url,
    isPartOf: {
      "@id": getWebsiteId(),
    },
    about: {
      "@id": getMedicalBusinessId(),
    },
    publisher: {
      "@id": getOrganizationId(),
    },
  };
}

export function createServiceSchema({
  name,
  description,
  path,
  locale,
  areaServed,
}: {
  name: string;
  description: string;
  path: string;
  locale?: AppLocale;
  areaServed?: string[];
}) {
  const url = absoluteUrl(locale ? localizePath(path, locale) : path);

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url,
    provider: {
      "@id": getOrganizationId(),
    },
    areaServed: areaServed ?? [...servedRegions],
    serviceType: name,
    audience: {
      "@type": "Audience",
      audienceType: "Patients, hospitals, healthcare institutions",
    },
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
  fallbackAuthorName = siteConfig.editorialTeam,
  tags = [],
  focusKeyword,
  locale,
  path,
}: {
  title: string;
  description: string;
  slug: string;
  publishedAt: Date;
  updatedAt: Date;
  coverImage?: string | null;
  authorName?: string | null;
  fallbackAuthorName?: string;
  tags?: string[];
  focusKeyword?: string | null;
  locale?: AppLocale;
  path?: string;
}) {
  const keywords = Array.from(new Set([...tags, focusKeyword].filter(Boolean)));
  const articlePath = path ?? `/blog/${slug}`;
  const articleUrl = absoluteUrl(locale ? localizePath(articlePath, locale) : articlePath);

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    datePublished: publishedAt.toISOString(),
    dateModified: updatedAt.toISOString(),
    image: coverImage ? absoluteUrl(coverImage) : absoluteUrl(media.brand.openGraph.src),
    mainEntityOfPage: articleUrl,
    author: {
      "@type": "Person",
      name: authorName || fallbackAuthorName,
    },
    publisher: {
      "@id": getOrganizationId(),
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl(media.brand.logo.src),
      },
    },
    keywords: keywords.join(", "),
    inLanguage: locale,
  };
}

export function createHowToSchema({
  name,
  description,
  steps,
  locale,
  totalTime,
}: {
  name: string;
  description: string;
  steps: Array<{ name: string; text: string; url?: string }>;
  locale?: AppLocale;
  totalTime?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    description,
    inLanguage: locale,
    ...(totalTime ? { totalTime } : {}),
    step: steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      text: step.text,
      ...(step.url
        ? { url: absoluteUrl(localizePath(step.url, locale ?? "en")) }
        : {}),
    })),
  };
}

export function createMedicalWebPageSchema({
  name,
  description,
  path,
  locale,
  lastReviewed,
  medicalAudience,
  areaServed,
}: {
  name: string;
  description: string;
  path: string;
  locale?: AppLocale;
  lastReviewed?: string;
  medicalAudience?: string;
  areaServed?: string[];
}) {
  const url = absoluteUrl(locale ? localizePath(path, locale) : path);

  return {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name,
    description,
    url,
    inLanguage: locale,
    isPartOf: { "@id": getWebsiteId() },
    about: { "@id": getMedicalBusinessId() },
    publisher: { "@id": getOrganizationId() },
    ...(lastReviewed ? { lastReviewed } : {}),
    ...(medicalAudience
      ? {
          audience: {
            "@type": "MedicalAudience",
            audienceType: medicalAudience,
          },
        }
      : {}),
    ...(areaServed ? { areaServed } : {}),
  };
}

export function createPersonSchema({
  name,
  description,
  jobTitle,
  image,
  url,
  worksFor,
  sameAs = [],
}: {
  name: string;
  description?: string;
  jobTitle?: string;
  image?: string;
  url?: string;
  worksFor?: string;
  sameAs?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name,
    ...(description ? { description } : {}),
    ...(jobTitle ? { jobTitle } : {}),
    ...(image ? { image: absoluteUrl(image) } : {}),
    ...(url ? { url: absoluteUrl(url) } : {}),
    ...(worksFor ? { worksFor: { "@type": "Organization", name: worksFor } } : {}),
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };
}

export function createImageObjectSchema({
  url,
  caption,
  width,
  height,
}: {
  url: string;
  caption?: string;
  width?: number;
  height?: number;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    contentUrl: absoluteUrl(url),
    url: absoluteUrl(url),
    ...(caption ? { caption } : {}),
    ...(width ? { width } : {}),
    ...(height ? { height } : {}),
  };
}
