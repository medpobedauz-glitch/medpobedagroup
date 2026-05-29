/**
 * Structured Data Schemas for MedPobeda Group
 * These JSON-LD schemas improve SEO and help search engines understand the site
 */

import { siteConfig } from "@/lib/site";

export function createOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "MedPobeda Group",
    legalName: "MedPobeda Group MCHJ",
    url: siteConfig.siteUrl,
    logo: `${siteConfig.siteUrl}/opengraph-image.png`,
    description:
      "MedPobeda Group is a Tashkent-based healthcare collaboration platform supporting medical tourism, international patient assistance, hospital partnerships, and student mobility.",
    email: siteConfig.contactEmail,
    telephone: siteConfig.contactPhone,
    address: {
      "@type": "PostalAddress",
      addressCountry: "UZ",
      addressLocality: "Tashkent",
      streetAddress: "Tashkent, Uzbekistan",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Support",
      telephone: siteConfig.contactPhone,
      email: siteConfig.contactEmail,
      availableLanguage: [
        "en",
        "uz",
        "ky",
        "kk",
        "tg",
        "tk",
        "ru",
      ],
    },
    areaServed: [
      {
        "@type": "Country",
        name: "Uzbekistan",
      },
      {
        "@type": "Country",
        name: "India",
      },
      {
        "@type": "Region",
        name: "Central Asia",
      },
      {
        "@type": "AdministrativeArea",
        name: "Kazakhstan",
      },
      {
        "@type": "AdministrativeArea",
        name: "Kyrgyzstan",
      },
      {
        "@type": "AdministrativeArea",
        name: "Tajikistan",
      },
      {
        "@type": "AdministrativeArea",
        name: "Turkmenistan",
      },
    ],
    serviceType: [
      "Medical Tourism Coordination",
      "International Patient Assistance",
      "Hospital Partnership Support",
      "Student Mobility Support",
      "Cross-border Healthcare Communication",
      "Medical Visa Support",
      "Second Medical Opinion Routing",
      "Specialist Referral Support",
    ],
    sameAs: siteConfig.socialLinks
      ? Object.values(siteConfig.socialLinks).filter(Boolean)
      : [],
  };
}

export function createWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "MedPobeda Group",
    url: siteConfig.siteUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteConfig.siteUrl}/blog?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function createBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function createFAQSchema(
  faqs: Array<{
    question: string;
    answer: string;
  }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function createLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "MedPobeda Group",
    image: `${siteConfig.siteUrl}/opengraph-image.png`,
    description: "Medical tourism coordination and healthcare partnership support in Tashkent, Uzbekistan",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Tashkent",
      addressLocality: "Tashkent",
      addressCountry: "UZ",
    },
    telephone: siteConfig.contactPhone,
    email: siteConfig.contactEmail,
    url: siteConfig.siteUrl,
  };
}
