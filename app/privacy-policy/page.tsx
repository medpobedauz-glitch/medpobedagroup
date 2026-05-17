import { createMetadata } from "@/lib/metadata";
import { createBreadcrumbSchema, createWebPageSchema } from "@/lib/schema";
import { JsonLd } from "@/components/shared/json-ld";
import { PageHero } from "@/components/shared/page-hero";
import { Card } from "@/components/ui/card";

export const metadata = createMetadata({
  title: "Privacy Policy",
  description:
    "Read the MedPobeda Group privacy policy for information about contact submissions, uploaded documents, and healthcare coordination data handling.",
  path: "/privacy-policy",
});

const sections = [
  {
    title: "Information We Collect",
    body:
      "MedPobeda Group may collect contact details, organization information, inquiry content, uploaded documents, and communication preferences when users submit forms through the website.",
  },
  {
    title: "How We Use Information",
    body:
      "Information is used to review inquiries, coordinate follow-up, support hospital collaboration or patient assistance workflows, and maintain operational records inside the MedPobeda CRM environment.",
  },
  {
    title: "Uploaded Documents",
    body:
      "Medical reports, passport copies, and related documents are handled through the website's secure upload structure and are intended only for coordination and review purposes.",
  },
  {
    title: "Confidentiality",
    body:
      "MedPobeda Group aims to handle healthcare-related information carefully and limit access to authorized internal personnel or relevant coordination stakeholders when necessary.",
  },
  {
    title: "Contact",
    body:
      "If you need clarification about privacy handling, please contact MedPobeda Group through the main contact page.",
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <JsonLd
        data={[
          createWebPageSchema({
            name: "Privacy Policy",
            description:
              "Read the MedPobeda Group privacy policy for information about contact submissions, uploaded documents, and healthcare coordination data handling.",
            path: "/privacy-policy",
          }),
          createBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Privacy Policy", path: "/privacy-policy" },
          ]),
        ]}
      />
      <PageHero
        eyebrow="Privacy Policy"
        title="How MedPobeda Group approaches website privacy and healthcare-related inquiry handling"
        description="This policy page explains, at a high level, how website submissions and supporting materials are collected and used within the MedPobeda Group operating environment."
        points={[
          "Contact submission handling",
          "Uploaded document processing",
          "Internal coordination use",
          "Confidentiality-aware communication",
        ]}
      />
      <section className="px-6 py-20 lg:px-8">
        <div className="mx-auto grid max-w-5xl gap-5">
          {sections.map((section) => (
            <Card key={section.title} className="border-white/12 p-7">
              <h2 className="font-display text-2xl font-semibold text-white">
                {section.title}
              </h2>
              <p className="mt-4 text-base leading-8 text-slate-300">{section.body}</p>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}
