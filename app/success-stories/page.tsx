import { Metadata } from "next";
import { Suspense } from "react";

import { SuccessStoriesPageContent } from "@/components/pages/success-stories-page";
import { JsonLd } from "@/components/shared/json-ld";
import { createMetadata } from "@/lib/metadata";
import { createBreadcrumbSchema, createWebPageSchema } from "@/lib/schema";

export function generateMetadata(): Metadata {
  return createMetadata({
    title: "Patient Success Stories | Real Results from Medical Tourism to India",
    description:
      "Read real patient success stories from Uzbekistan, Kazakhstan, Kyrgyzstan, Tajikistan, and Turkmenistan who received world-class medical treatment in India through MedPobeda Group.",
    path: "/success-stories",
    keywords: [
      "medical tourism success stories",
      "patient testimonials India",
      "treatment outcomes India",
      "medical tourism Central Asia",
      "patient reviews Indian hospitals",
      "MedPobeda success stories",
    ],
  });
}

export default function SuccessStoriesPage() {
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Success Stories", path: "/success-stories" },
  ]);

  const pageSchema = createWebPageSchema({
    name: "Patient Success Stories",
    description:
      "Real patient success stories from Central Asia who received medical treatment in India.",
    path: "/success-stories",
    type: "CollectionPage",
  });

  return (
    <>
      <JsonLd data={[breadcrumbSchema, pageSchema]} />
      <Suspense fallback={null}>
        <SuccessStoriesPageContent />
      </Suspense>
    </>
  );
}