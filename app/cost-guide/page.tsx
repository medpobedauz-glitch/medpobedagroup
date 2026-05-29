import { Metadata } from "next";
import { CostGuidePageContent } from "@/components/pages/cost-guide-page";
import { JsonLd } from "@/components/shared/json-ld";
import { createMetadata } from "@/lib/metadata";
import { createBreadcrumbSchema, createWebPageSchema } from "@/lib/schema";

export function generateMetadata(): Metadata {
  return createMetadata({
    title: "Treatment Cost Guide | Medical Tourism to India | MedPobeda Group",
    description:
      "Compare treatment costs for cardiology, oncology, orthopedics, IVF, neurosurgery, and organ transplant in India. Transparent pricing from MedPobeda Group.",
    path: "/cost-guide",
    keywords: [
      "medical treatment cost India",
      "heart surgery cost India",
      "cancer treatment cost India",
      "knee replacement cost India",
      "IVF cost India",
      "medical tourism pricing",
    ],
  });
}

export default function CostGuidePage() {
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Cost Guide", path: "/cost-guide" },
  ]);

  const pageSchema = createWebPageSchema({
    name: "Treatment Cost Guide",
    description: "Transparent treatment cost estimates for medical procedures in India.",
    path: "/cost-guide",
    type: "WebPage",
  });

  return (
    <>
      <JsonLd data={[breadcrumbSchema, pageSchema]} />
      <CostGuidePageContent />
    </>
  );
}