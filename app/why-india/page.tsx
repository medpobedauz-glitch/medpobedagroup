import { Metadata } from "next";
import { WhyIndiaPageContent } from "@/components/pages/why-india-page";
import { JsonLd } from "@/components/shared/json-ld";
import { createMetadata } from "@/lib/metadata";
import { createBreadcrumbSchema, createWebPageSchema } from "@/lib/schema";

export function generateMetadata(): Metadata {
  return createMetadata({
    title: "Why Choose India for Medical Treatment | MedPobeda Group",
    description:
      "Discover why India is the world's leading medical tourism destination — world-class hospitals, affordable costs, experienced doctors, and comprehensive patient support.",
    path: "/why-india",
    keywords: [
      "why India medical tourism",
      "India vs Turkey medical tourism",
      "India vs Thailand medical tourism",
      "best country for medical treatment",
      "affordable healthcare India",
    ],
  });
}

export default function WhyIndiaPage() {
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Why India", path: "/why-india" },
  ]);

  const pageSchema = createWebPageSchema({
    name: "Why Choose India for Medical Treatment",
    description: "Comprehensive guide to why India is the preferred destination for medical tourism from Central Asia.",
    path: "/why-india",
    type: "WebPage",
  });

  return (
    <>
      <JsonLd data={[breadcrumbSchema, pageSchema]} />
      <WhyIndiaPageContent />
    </>
  );
}