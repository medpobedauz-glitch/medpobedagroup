import { createMetadata } from "@/lib/metadata";
import { createBreadcrumbSchema, createWebPageSchema } from "@/lib/schema";
import { JsonLd } from "@/components/shared/json-ld";
import { PageHero } from "@/components/shared/page-hero";
import { Card } from "@/components/ui/card";

export const metadata = createMetadata({
  title: "Terms of Use",
  description:
    "Read the MedPobeda Group website terms covering use of the public site, inquiry submissions, and informational healthcare content.",
  path: "/terms",
});

const sections = [
  {
    title: "Website Purpose",
    body:
      "The MedPobeda Group website is intended to provide information about healthcare collaboration, medical tourism coordination, hospital partnerships, international patient assistance, and student mobility support.",
  },
  {
    title: "Informational Nature",
    body:
      "Public website content is informational and should not be interpreted as direct medical advice, treatment guarantees, or binding institutional commitments.",
  },
  {
    title: "Inquiry Submissions",
    body:
      "By submitting a form, users confirm that the information provided is accurate to the best of their knowledge and suitable for coordination review.",
  },
  {
    title: "Clinical Responsibility",
    body:
      "Medical decisions, diagnosis, treatment planning, and patient outcomes remain the responsibility of the relevant licensed healthcare providers and treating institutions.",
  },
  {
    title: "Changes",
    body:
      "MedPobeda Group may update website content, public positioning, or operating information as needed without prior notice.",
  },
];

export default function TermsPage() {
  return (
    <>
      <JsonLd
        data={[
          createWebPageSchema({
            name: "Terms of Use",
            description:
              "Read the MedPobeda Group website terms covering use of the public site, inquiry submissions, and informational healthcare content.",
            path: "/terms",
          }),
          createBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Terms", path: "/terms" },
          ]),
        ]}
      />
      <PageHero
        eyebrow="Terms"
        title="Public website terms for information, inquiries, and coordination requests"
        description="These terms describe the intended use of the MedPobeda Group website and the basic conditions around public information and submitted inquiries."
        points={[
          "Informational website use",
          "Public inquiry expectations",
          "Clinical responsibility boundaries",
          "Content and operational updates",
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
