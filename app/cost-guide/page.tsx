import { Metadata } from "next";
import { CostGuidePageContent } from "@/components/pages/cost-guide-page";
import { JsonLd } from "@/components/shared/json-ld";
import { createMetadata } from "@/lib/metadata";
import { createBreadcrumbSchema, createWebPageSchema } from "@/lib/schema";
import { costGuideData } from "@/lib/data/cost-guide";

export function generateMetadata(): Metadata {
  return createMetadata({
    title: "Comprehensive Cost Guide for Medical Treatments in India | MedPobeda Group",
    description:
      "Transparent starting prices for 40+ medical procedures in India — cardiology, oncology, orthopedics, IVF, neurosurgery, organ transplant, ophthalmology, ENT, bariatric, and wellness. Save 30–70% vs Western countries.",
    path: "/cost-guide",
    keywords: [
      "medical treatment cost India",
      "heart surgery cost India",
      "cancer treatment cost India",
      "knee replacement cost India",
      "IVF cost India",
      "liver transplant cost India",
      "IVF cost India",
      "neurosurgery cost India",
      "cosmetic surgery cost India",
      "medical tourism pricing",
      "cost of medical treatment in India",
    ],
  });
}

export default function CostGuidePage() {
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Cost Guide", path: "/cost-guide" },
  ]);

  const pageSchema = createWebPageSchema({
    name: "Comprehensive Cost Guide for Medical Treatments in India",
    description:
      "Transparent starting prices for 40+ medical procedures at JCI and NABH-accredited hospitals across India.",
    path: "/cost-guide",
    type: "WebPage",
  });

  // ItemList schema — Google can surface the cost list directly in search results.
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Medical Treatment Cost Guide for India",
    description:
      "Starting prices for major medical procedures available in India through MedPobeda Group's partner hospitals.",
    numberOfItems: costGuideData.length,
    itemListElement: costGuideData.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.treatment,
      description: item.description,
    })),
  };

  return (
    <>
      <JsonLd data={[breadcrumbSchema, pageSchema, itemListSchema]} />
      <CostGuidePageContent />
    </>
  );
}
