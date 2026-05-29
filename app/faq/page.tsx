import { Metadata } from "next";
import { FAQPageContent } from "@/components/pages/faq-page";
import { JsonLd } from "@/components/shared/json-ld";
import { createMetadata } from "@/lib/metadata";
import { createBreadcrumbSchema, createFaqSchema } from "@/lib/schema";
import { allFAQs } from "@/lib/data/faqs";

export function generateMetadata(): Metadata {
  return createMetadata({
    title: "Frequently Asked Questions | Medical Tourism to India | MedPobeda Group",
    description:
      "Find answers to 50+ frequently asked questions about medical tourism to India, medical visas, treatment costs, hospital selection, accommodation, travel, and language support.",
    path: "/faq",
    keywords: [
      "medical tourism FAQ",
      "treatment in India questions",
      "medical visa India FAQ",
      "hospital India questions",
      "medical tourism cost India",
      "MedPobeda FAQ",
    ],
  });
}

export default function FAQPage() {
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "FAQ", path: "/faq" },
  ]);

  const faqSchema = createFaqSchema(
    allFAQs.map((faq) => ({ question: faq.question, answer: faq.answer }))
  );

  return (
    <>
      <JsonLd data={[breadcrumbSchema, faqSchema]} />
      <FAQPageContent faqs={allFAQs} />
    </>
  );
}