import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { UzMedicalSeoPageView } from "@/components/seo-pages/UzMedicalSeoPage";
import {
  uzMedicalSeoPageBySlug,
  uzMedicalSeoPages,
  type UzMedicalSeoPage,
} from "@/lib/uz-medical-seo-pages";

const SITE_URL = "https://www.medpobedagroup.uz";
const OG_IMAGE = `${SITE_URL}/images/brand/medpobeda-og-image.jpg`;

type PageProps = {
  params: {
    locale: string;
    seoSlug: string;
  };
};

function getPage(params: PageProps["params"]): UzMedicalSeoPage | undefined {
  if (params.locale !== "uz") return undefined;
  return uzMedicalSeoPageBySlug.get(params.seoSlug);
}

export function generateStaticParams() {
  return uzMedicalSeoPages.map((page) => ({ locale: "uz", seoSlug: page.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const page = getPage(params);
  if (!page) return {};

  const canonical = `${SITE_URL}/uz/${page.slug}`;
  const description =
    `${page.shortTitle}: O‘zbekistonlik bemorlar uchun diagnostika, davolash, xarajat, tibbiy viza va tiklanish bo‘yicha amaliy qo‘llanma.`;
  const socialTitle = `${page.shortTitle} | MedPobeda Group`;

  return {
    title: page.shortTitle,
    description,
    keywords: [
      page.shortTitle.toLowerCase(),
      `${page.condition} davolash`,
      `${page.procedure} Hindiston`,
      "Hindistonda davolanish",
      "tibbiy turizm O‘zbekiston",
      "MedPobeda Group",
    ],
    authors: [{ name: "MedPobeda Group editorial team" }],
    alternates: { canonical },
    openGraph: {
      type: "article",
      locale: "uz_UZ",
      url: canonical,
      siteName: "MedPobeda Group",
      title: socialTitle,
      description,
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: page.image.alt }],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [OG_IMAGE],
    },
  };
}

export default function UzSeoPage({ params }: PageProps) {
  const page = getPage(params);
  if (!page) notFound();

  const canonical = `${SITE_URL}/uz/${page.slug}`;
  const description =
    `${page.shortTitle} bo‘yicha alomatlar, diagnostika, davolash, tibbiy viza, safar va tiklanish qo‘llanmasi.`;
  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "MedicalWebPage",
      name: page.title,
      headline: page.title,
      description,
      url: canonical,
      inLanguage: "uz-Latn-UZ",
      audience: { "@type": "Patient", audienceType: page.audience },
      about: { "@type": "MedicalCondition", name: page.condition },
      publisher: {
        "@type": "Organization",
        name: "MedPobeda Group",
        url: SITE_URL,
        logo: { "@type": "ImageObject", url: `${SITE_URL}/images/brand/medpobeda-logo.png` },
      },
      image: { "@type": "ImageObject", url: OG_IMAGE, caption: page.image.caption },
      isPartOf: { "@type": "WebSite", name: "MedPobeda Group", url: SITE_URL },
    },
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: page.title,
      description,
      image: [OG_IMAGE],
      datePublished: "2026-07-26",
      dateModified: "2026-07-26",
      inLanguage: "uz-Latn-UZ",
      mainEntityOfPage: canonical,
      author: {
        "@type": "Organization",
        name: "MedPobeda Group",
        url: SITE_URL,
      },
      publisher: {
        "@type": "Organization",
        name: "MedPobeda Group",
        logo: { "@type": "ImageObject", url: `${SITE_URL}/images/brand/medpobeda-logo.png` },
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: page.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Bosh sahifa", item: `${SITE_URL}/uz` },
        { "@type": "ListItem", position: 2, name: "Davolash yo‘nalishlari", item: `${SITE_URL}/uz/treatments` },
        { "@type": "ListItem", position: 3, name: page.shortTitle, item: canonical },
      ],
    },
  ];

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          // The schemas are generated only from repository-owned typed content.
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }}
        />
      ))}
      <UzMedicalSeoPageView page={page} />
    </>
  );
}
