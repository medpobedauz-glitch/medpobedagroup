import type { Metadata } from "next";
import dynamic from "next/dynamic";
import {
  BadgeDollarSign,
  Building2,
  FileCheck2,
  Globe2,
  Plane,
  ShieldCheck,
} from "lucide-react";

import { PremiumCtaBanner } from "@/components/marketing/premium-cta-banner";
import { PremiumFeatureCardsSection } from "@/components/marketing/premium-feature-cards-section";
import { PremiumPageHero } from "@/components/marketing/premium-page-hero";
import { PatientSuccessStories } from "@/components/sections/patient-success-stories";
import { FAQAccordion } from "@/components/shared/faq-accordion";
import { JsonLd } from "@/components/shared/json-ld";
import { getFeaturedSuccessStories } from "@/lib/data/site-content";
import { getRequestLocale } from "@/lib/i18n/request";
import { createMetadata } from "@/lib/metadata";
import { createPremiumVisual } from "@/lib/premium-visuals";
import {
  createBreadcrumbSchema,
  createFaqSchema,
  createWebPageSchema,
} from "@/lib/schema";

const MedicalCostEstimator = dynamic(
  () =>
    import("@/components/costs/medical-cost-estimator").then(
      (module) => module.MedicalCostEstimator,
    ),
  {
    loading: () => (
      <div
        className="min-h-[36rem] rounded-[2rem] border border-[#D6E8FF] bg-white/80"
        aria-label="Loading medical cost estimator"
        aria-busy="true"
      />
    ),
  },
);

const faqItems = [
  {
    question: "How much does heart surgery cost in India?",
    answer:
      "The estimate depends on the procedure, hospital, doctor, room category, diagnostics, and expected hospital stay. Select the relevant heart treatment in the calculator for an indicative range, then share medical reports for a hospital-specific treatment plan.",
  },
  {
    question: "How much does IVF cost in India?",
    answer:
      "IVF costs vary according to the recommended protocol, medicines, laboratory services, additional procedures, and number of cycles. The calculator provides an initial planning range; a fertility specialist must confirm the final plan.",
  },
  {
    question: "What is included in the estimate?",
    answer:
      "The calculator can include medical treatment, consultation, diagnostics, hospital and room charges, medicines, hotel stay, airport pickup, interpreter support, visa assistance, local transportation, and selected companion expenses.",
  },
  {
    question: "Can the estimated cost change?",
    answer:
      "Yes. Final costs can change after medical review because of the patient's condition, additional investigations, hospital policies, treating physician, room category, treatment plan, complications, or a longer stay.",
  },
  {
    question: "How accurate is the medical cost estimate?",
    answer:
      "It is designed for early travel and budget planning, not as a final quotation. The most accurate estimate is issued after specialists review current medical reports and the selected hospital confirms the proposed treatment plan.",
  },
];

const benefitItems = [
  {
    icon: BadgeDollarSign,
    title: "One planning range",
    description:
      "Bring likely medical, hospital, travel, accommodation, and support expenses into one transparent estimate.",
  },
  {
    icon: Building2,
    title: "Hospital-linked guidance",
    description:
      "Compare suitable partner hospitals by treatment, specialty, preferred city, and international patient support.",
  },
  {
    icon: FileCheck2,
    title: "Report-led refinement",
    description:
      "Move from an indicative range to a case-specific treatment plan after a specialist reviews your medical records.",
  },
  {
    icon: Globe2,
    title: "Regional currency support",
    description:
      "Review the USD-based estimate in supported currencies for Central Asia, India, and the Middle East.",
  },
  {
    icon: Plane,
    title: "Travel costs included",
    description:
      "Plan for visa assistance, airport pickup, accommodation, companions, interpretation, and local transport.",
  },
  {
    icon: ShieldCheck,
    title: "Clear estimate boundaries",
    description:
      "Understand which assumptions shape the range and why a hospital's final quotation may differ.",
  },
];

export function generateMetadata(): Metadata {
  const locale = getRequestLocale();

  return createMetadata({
    title: "Medical Treatment Cost Calculator | MedPobeda Group",
    description:
      "Estimate medical treatment, hospital stay, travel, accommodation, visa, interpreter, and companion costs for treatment in India with MedPobeda Group.",
    path: "/cost-calculator",
    locale,
    keywords: [
      "medical treatment cost calculator",
      "treatment cost estimator India",
      "medical tourism cost India",
      "hospital cost estimate India",
      "international patient cost calculator",
    ],
    ogTitle: "Medical Treatment Cost Calculator | MedPobeda Group",
    ogDescription:
      "Plan an international medical journey with an indicative treatment, hospital, travel, and accommodation cost range.",
  });
}

type CostCalculatorPageProps = {
  searchParams?: {
    condition?: string | string[];
    treatment?: string | string[];
  };
};

export default async function CostCalculatorPage({
  searchParams = {},
}: CostCalculatorPageProps) {
  const locale = getRequestLocale();
  const successStories = await getFeaturedSuccessStories().catch(() => []);
  const initialDisease =
    typeof searchParams.condition === "string" ? searchParams.condition : "";
  const initialTreatmentId =
    typeof searchParams.treatment === "string" ? searchParams.treatment : undefined;
  const schemaDescription =
    "Estimate treatment, hospital, accommodation, travel, and international patient support costs for medical care in India.";

  return (
    <>
      <JsonLd
        data={[
          createWebPageSchema({
            name: "Medical Treatment Cost Calculator",
            description: schemaDescription,
            path: "/cost-calculator",
            locale,
          }),
          createBreadcrumbSchema(
            [
              { name: "Home", path: "/" },
              { name: "Medical Cost Calculator", path: "/cost-calculator" },
            ],
            locale,
          ),
          createFaqSchema(faqItems),
        ]}
      />

      <PremiumPageHero
        eyebrow="Medical Cost Calculator"
        title="Plan the likely cost of treatment in India"
        description="Build an indicative estimate covering treatment, hospital stay, accommodation, travel, and international patient services before requesting a case-specific quotation."
        highlights={[
          "Treatment & Hospital Costs",
          "Travel & Stay Planning",
          "International Patient Support",
        ]}
        primaryCta={{ href: "#medical-cost-estimator", label: "Calculate My Estimate" }}
        secondaryCta={{ href: "/contact", label: "Request Treatment Plan" }}
        images={[
          createPremiumVisual(
            "medical-tourism-inner",
            "treatment-planning",
            "Patient and coordinator reviewing a medical treatment cost plan.",
          ),
          createPremiumVisual(
            "medical-tourism-inner",
            "report-review",
            "Medical reports being reviewed for a personalized estimate.",
          ),
          createPremiumVisual(
            "medical-tourism-inner",
            "visa-travel-guidance",
            "Medical travel and visa planning for an international patient.",
          ),
        ]}
        stats={[
          { value: "USD", label: "stable base currency for estimate calculations" },
          { value: "10", label: "supported display currencies for regional planning" },
          { value: "1 plan", label: "medical, hospital, travel, and stay assumptions together" },
        ]}
        floatingCards={["Treatment", "Hospital", "Hotel", "Travel Support"]}
        accentLabel="Transparent Planning"
      />

      <section
        id="medical-cost-estimator"
        className="section-shell scroll-mt-28 pt-0"
        aria-label="Medical treatment cost estimator"
      >
        <div className="container-wide">
          <MedicalCostEstimator
            initialDisease={initialDisease}
            initialTreatmentId={initialTreatmentId}
          />
        </div>
      </section>

      <PremiumFeatureCardsSection
        eyebrow="Plan With Clarity"
        title="Understand the full journey before you travel"
        description="The estimator connects the likely clinical pathway with practical international patient expenses, while keeping every amount clearly identified as an estimate."
        items={benefitItems}
        columns={3}
      />

      <PatientSuccessStories
        stories={successStories.slice(0, 3)}
        eyebrow="Patient Experiences"
        title="Treatment journeys supported from planning to follow-up"
        description="Read published patient experiences from families who coordinated treatment in India with MedPobeda Group."
      />

      <FAQAccordion
        eyebrow="Cost Calculator FAQ"
        title="Questions about medical treatment estimates"
        description="Understand what the calculator includes, when costs can change, and how to request a hospital-specific quotation."
        items={faqItems}
      />

      <PremiumCtaBanner
        eyebrow="Personalized Treatment Plan"
        title="Need a hospital-confirmed estimate?"
        description="Share your current medical reports with MedPobeda Group. Our coordinators can route the case for specialist review and help you compare the proposed treatment, hospital, travel, and stay plan."
        image={createPremiumVisual(
          "contact-cta",
          "healthcare-guidance-conversation",
          "Healthcare coordinator discussing a personalized treatment and cost plan.",
        )}
        primary={{ href: "/contact", label: "Book Free Consultation" }}
        secondary={{ href: "/international-patient-care", label: "Request Treatment Plan" }}
      />
    </>
  );
}
