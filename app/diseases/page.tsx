import type { Metadata } from "next";
import dynamic from "next/dynamic";

import { PremiumCtaBanner } from "@/components/marketing/premium-cta-banner";
import { PremiumPageHero } from "@/components/marketing/premium-page-hero";
import { FAQAccordion } from "@/components/shared/faq-accordion";
import { JsonLd } from "@/components/shared/json-ld";
import {
  DISEASE_LOCALES,
  createDiseaseDirectoryEntries,
  diseases,
  getLocalizedDisease,
  type DiseaseLocale,
} from "@/lib/data/diseases";
import { doctors } from "@/lib/data/doctors";
import { hospitals } from "@/lib/data/hospitals";
import { treatments } from "@/lib/data/treatments";
import { getRequestLocale } from "@/lib/i18n/request";
import { localizePath } from "@/lib/i18n/config";
import { createMetadata } from "@/lib/metadata";
import { createPremiumVisual } from "@/lib/premium-visuals";
import {
  createBreadcrumbSchema,
  createFaqSchema,
  createWebPageSchema,
} from "@/lib/schema";
import { createOrganizationSchema } from "@/lib/schema-generators";

const DiseaseDirectory = dynamic(
  () =>
    import("@/components/diseases/disease-directory").then(
      (module) => module.DiseaseDirectory,
    ),
  {
    loading: () => (
      <div
        className="min-h-[24rem]"
        aria-label="Loading disease and condition directory"
      />
    ),
  },
);

const directoryFaq = [
  {
    question: "How do I find the right treatment for a medical condition?",
    answer:
      "Start with the condition or diagnosis in this directory. Each guide connects the condition with relevant specialties, treatment pathways, doctors, and hospitals. A final recommendation requires review of the patient's medical reports.",
  },
  {
    question: "Can MedPobeda Group arrange a second medical opinion?",
    answer:
      "Yes. MedPobeda Group can organize medical records and coordinate a specialist review before a patient commits to a hospital, treatment plan, or journey to India.",
  },
  {
    question: "Are these condition guides a medical diagnosis?",
    answer:
      "No. The guides are general educational information and do not replace diagnosis, examination, or advice from a qualified treating clinician.",
  },
  {
    question: "Can international patients compare hospitals for the same condition?",
    answer:
      "Yes. After report review, patients can compare suitable hospitals and specialists based on clinical requirements, location, expected stay, and the proposed treatment plan.",
  },
];

export function generateMetadata(): Metadata {
  const locale = getRequestLocale();

  return createMetadata({
    title: "Diseases & Medical Conditions in India",
    description:
      "Explore disease and medical condition guides linked to suitable treatments, specialist doctors, and hospitals in India with international patient support.",
    path: "/diseases",
    locale,
    keywords: [
      "diseases and conditions",
      "medical conditions treatment India",
      "disease treatment hospitals India",
      "international patient condition guide",
      "specialist doctors India",
    ],
    ogTitle: "Diseases & Medical Conditions in India",
    ogDescription:
      "Search medical conditions and connect each diagnosis with relevant treatments, doctors, and hospitals in India.",
  });
}

export default function DiseasesPage() {
  const locale = getRequestLocale();
  const diseaseLocale = DISEASE_LOCALES.includes(locale as DiseaseLocale)
    ? (locale as DiseaseLocale)
    : "en";
  const localizedDiseases = diseases.map((disease) =>
    getLocalizedDisease(disease, diseaseLocale),
  );
  const directoryEntries = createDiseaseDirectoryEntries(localizedDiseases, {
    hospitals,
    treatments,
    doctors,
  });

  return (
    <>
      <JsonLd
        data={[
          createWebPageSchema({
            name: "Diseases and Medical Conditions",
            description:
              "A searchable directory connecting medical conditions with treatments, specialist doctors, and hospitals in India.",
            path: "/diseases",
            locale,
            type: "CollectionPage",
          }),
          createBreadcrumbSchema(
            [
              { name: "Home", path: "/" },
              { name: "Diseases", path: "/diseases" },
            ],
            locale,
          ),
          createFaqSchema(directoryFaq),
          createOrganizationSchema(),
        ]}
      />

      <PremiumPageHero
        eyebrow="Disease & Condition Directory"
        title="Understand a condition and find the right treatment pathway in India"
        description="Search practical condition guides and connect each medical need with relevant specialties, treatments, doctors, and partner hospitals—with coordinated support for international patients."
        highlights={[
          "Condition-Led Search",
          "Treatment & Specialty Matching",
          "Hospital & Doctor Recommendations",
        ]}
        primaryCta={{
          href: localizePath("/second-medical-opinion", locale),
          label: "Get a Medical Opinion",
        }}
        secondaryCta={{
          href: localizePath("/treatments", locale),
          label: "Explore Treatments",
        }}
        images={[
          createPremiumVisual(
            "medical-tourism-hero",
            "doctor-patient-consultation",
            "Doctor reviewing a medical condition with an international patient.",
          ),
          createPremiumVisual(
            "specialties",
            "diagnostics",
            "Medical diagnostics used to investigate a patient's condition.",
          ),
          createPremiumVisual(
            "medical-tourism-inner",
            "doctor-hospital-matching",
            "Specialist and hospital matching for condition-led care.",
          ),
        ]}
        stats={[
          {
            value: `${localizedDiseases.length}`,
            label: "condition guides connected to treatment pathways",
          },
          {
            value: "Multi-specialty",
            label: "search across symptoms, diseases, and medical departments",
          },
          {
            value: "Pre-travel",
            label: "report review and specialist matching before travel",
          },
        ]}
        floatingCards={localizedDiseases.slice(0, 4).map((disease) => disease.name)}
        accentLabel="India Care Network"
      />

      <section className="section-shell pt-0">
        <div className="container-wide">
          <div className="mb-10 max-w-3xl">
            <span className="section-kicker">Complete Condition Directory</span>
            <h2 className="mt-5 heading-section">
              Search diseases, symptoms, specialties, treatments, and hospitals
            </h2>
            <p className="mt-4 body-lg">
              Use the directory as a starting point, then request a clinical
              review for recommendations based on the patient&apos;s reports.
            </p>
          </div>
          <DiseaseDirectory diseases={directoryEntries} />
        </div>
      </section>

      <FAQAccordion
        eyebrow="Disease Directory FAQ"
        title="Using the condition guides"
        description="Important guidance for patients and families researching treatment in India."
        items={directoryFaq}
      />

      <PremiumCtaBanner
        eyebrow="Clinical Guidance"
        title="Not sure which condition or treatment pathway applies?"
        description="Share the patient's recent reports with MedPobeda Group for structured specialist matching and treatment-plan coordination."
        image={createPremiumVisual(
          "contact-cta",
          "healthcare-guidance-conversation",
          "Medical coordinator discussing a patient's reports and next steps.",
        )}
        primary={{
          href: localizePath("/contact", locale),
          label: "Book Free Consultation",
        }}
        secondary={{
          href: localizePath("/second-medical-opinion", locale),
          label: "Request Second Opinion",
        }}
      />
    </>
  );
}
