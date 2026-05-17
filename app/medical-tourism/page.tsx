import {
  ClipboardList,
  FileSearch,
  Globe2,
  HeartHandshake,
  Hospital,
  MapPin,
  Plane,
  ShieldCheck,
  Stethoscope,
  UserRound,
} from "lucide-react";

import { FAQAccordion } from "@/components/shared/faq-accordion";
import { JsonLd } from "@/components/shared/json-ld";
import { PremiumCtaBanner } from "@/components/marketing/premium-cta-banner";
import {
  PremiumFeatureCardsSection,
  type PremiumFeatureCardItem,
} from "@/components/marketing/premium-feature-cards-section";
import { PremiumImageStorySection } from "@/components/marketing/premium-image-story-section";
import { PremiumPageHero } from "@/components/marketing/premium-page-hero";
import { RouteAwareMedicalTourismForm } from "@/components/marketing/route-aware-medical-tourism-form";
import { PremiumSplitTrustSection } from "@/components/marketing/premium-split-trust-section";
import { PremiumStepsSection } from "@/components/marketing/premium-steps-section";
import { SectionHeader } from "@/components/marketing/section-header";
import { env } from "@/lib/env";
import { createMetadata } from "@/lib/metadata";
import { createPremiumVisual } from "@/lib/premium-visuals";
import {
  createBreadcrumbSchema,
  createServiceSchema,
  createWebPageSchema,
} from "@/lib/schema";

export const metadata = createMetadata({
  title: "Medical Tourism",
  description:
    "MedPobeda Group facilitates international medical tourism through hospital coordination, patient guidance, treatment planning, and cross-border travel support.",
  path: "/medical-tourism",
  keywords: [
    "medical tourism coordination",
    "international treatment travel",
    "hospital matching India Uzbekistan",
    "patient travel guidance",
  ],
});

type MedicalTourismPageProps = {
  searchParams?: {
    submitted?: string;
    error?: string;
  };
};

const serviceItems: PremiumFeatureCardItem[] = [
  {
    icon: FileSearch,
    title: "Medical Report Review",
    description:
      "Initial documents and reports can be organized for practical case review and clearer referral readiness.",
    image: createPremiumVisual(
      "medical-tourism-inner",
      "report-review",
      "Doctors reviewing international patient medical reports.",
    ),
  },
  {
    icon: Stethoscope,
    title: "Doctor & Hospital Matching",
    description:
      "MedPobeda Group helps identify suitable hospitals, specialists, and treatment directions based on patient needs.",
    image: createPremiumVisual(
      "medical-tourism-inner",
      "doctor-hospital-matching",
      "Specialist and hospital matching consultation for medical travel.",
    ),
  },
  {
    icon: ClipboardList,
    title: "Treatment Planning Support",
    description:
      "The coordination process supports indicative treatment planning, communication clarity, and next-step preparation.",
    image: createPremiumVisual(
      "medical-tourism-inner",
      "treatment-planning",
      "Patient treatment planning discussion in a premium medical setting.",
    ),
  },
  {
    icon: Plane,
    title: "Visa & Travel Guidance",
    description:
      "Patients and families can receive help understanding travel readiness, logistics, and scheduling expectations.",
    image: createPremiumVisual(
      "medical-tourism-inner",
      "visa-travel-guidance",
      "Medical travel guidance and international patient planning support.",
    ),
  },
  {
    icon: MapPin,
    title: "Arrival & Stay Coordination",
    description:
      "Support may extend to airport assistance, accommodation guidance, and arrival-side organization.",
    image: createPremiumVisual(
      "medical-tourism-inner",
      "arrival-stay-coordination",
      "International patient arrival and accommodation coordination.",
    ),
  },
  {
    icon: HeartHandshake,
    title: "Family-Centered Follow-Through",
    description:
      "The experience is designed to keep patient families informed, reassured, and aligned across the treatment journey.",
    image: createPremiumVisual(
      "medical-tourism-inner",
      "family-follow-through",
      "Medical coordinator supporting a patient family during treatment travel.",
    ),
  },
];

const faqItems = [
  {
    question: "Does MedPobeda Group provide medical treatment directly?",
    answer:
      "No. MedPobeda Group facilitates coordination, hospital communication, and patient support. Treatment decisions remain with licensed hospitals and doctors.",
  },
  {
    question: "Can patients submit medical reports before deciding to travel?",
    answer:
      "Yes. The medical tourism intake flow is designed to collect reports and case context early so more informed coordination can happen before travel planning.",
  },
  {
    question: "Can support include travel and hospital arrival guidance?",
    answer:
      "Yes. Where appropriate, the coordination scope can include travel timing, arrival assistance, accommodation guidance, and hospital-side practical support.",
  },
  {
    question: "Is MedPobeda Group focused only on India?",
    answer:
      "India remains a major corridor, especially for specialist access and hospital collaboration, but the brand positioning supports broader international healthcare facilitation where relevant.",
  },
];

export default function MedicalTourismPage({
  searchParams,
}: MedicalTourismPageProps) {
  return (
    <>
      <JsonLd
        data={[
          createWebPageSchema({
            name: "Medical Tourism",
            description:
              "MedPobeda Group facilitates international medical tourism through patient guidance, hospital coordination, and treatment travel support.",
            path: "/medical-tourism",
          }),
          createServiceSchema({
            name: "Medical Tourism Facilitation",
            description:
              "Structured support for international patients seeking treatment coordination abroad.",
            path: "/medical-tourism",
          }),
          createBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Medical Tourism", path: "/medical-tourism" },
          ]),
        ]}
      />

      <PremiumPageHero
        eyebrow="Medical Tourism"
        title="International treatment coordination shaped around clarity, hospitality, and trust"
        description="MedPobeda Group facilitates medical tourism for patients and families seeking structured support across hospital matching, treatment planning, travel guidance, and cross-border coordination."
        highlights={["Medical Tourism", "Patient Coordination", "Treatment Travel"]}
        primaryCta={{ href: "#medical-tourism-inquiry", label: "Start Medical Tourism Inquiry" }}
        secondaryCta={{ href: "/international-patients", label: "Request Patient Assistance" }}
        images={[
          createPremiumVisual(
            "medical-tourism-hero",
            "doctor-patient-consultation",
            "Doctor consulting an international patient in a premium hospital room.",
          ),
          createPremiumVisual(
            "medical-tourism-hero",
            "hospital-campus",
            "Modern hospital campus for international patient access.",
          ),
          createPremiumVisual(
            "medical-tourism-hero",
            "airport-patient-support",
            "Airport assistance and patient travel coordination support.",
          ),
        ]}
        stats={[
          { value: "8-step", label: "patient journey from inquiry to follow-up" },
          { value: "Cross-border", label: "coordination between treatment, travel, and family support" },
          { value: "Hospital-ready", label: "intake flow for documents, reports, and treatment goals" },
        ]}
        floatingCards={[
          "Case Review",
          "Doctor Matching",
          "Travel Guidance",
          "Family Support",
        ]}
        accentLabel="Premium Patient Pathway"
      />

      <PremiumImageStorySection
        eyebrow="Service Explanation"
        title="A healthcare-first medical tourism model rather than a generic travel process"
        description="The approach is designed around the realities of treatment planning, patient reassurance, and responsible hospital communication."
        body={[
          "MedPobeda Group supports international patients by facilitating the early coordination stages that matter most: medical report review, appropriate hospital direction, treatment communication, and travel readiness.",
          "The objective is to reduce confusion before the patient reaches the hospital. That means clearer guidance for the family, more structure around documents and timelines, and a more premium support experience from the first inquiry onward.",
        ]}
        badges={[
          "Medical Report Support",
          "Hospital Coordination",
          "Travel Readiness",
          "Arrival Assistance",
          "Family Guidance",
        ]}
        images={[
          createPremiumVisual(
            "medical-tourism-story",
            "premium-hospital-lobby",
            "Premium hospital lobby for international patient facilitation.",
          ),
          createPremiumVisual(
            "medical-tourism-story",
            "coordinator-patient-family",
            "Medical coordinator guiding an international patient family.",
          ),
          createPremiumVisual(
            "medical-tourism-story",
            "diagnostics-review",
            "Diagnostics and clinical report review for treatment coordination.",
          ),
          createPremiumVisual(
            "medical-tourism-story",
            "recovery-support",
            "Recovery and follow-through support for international patients.",
          ),
        ]}
      />

      <PremiumFeatureCardsSection
        eyebrow="Coordination Scope"
        title="Service lanes designed for patients travelling for treatment"
        description="The medical tourism route combines patient support, hospital coordination, and practical travel facilitation without overstating clinical outcomes."
        items={serviceItems}
        columns={3}
      />

      <PremiumSplitTrustSection
        eyebrow="Why This Route Works"
        title="A more trustworthy medical tourism experience for patients, families, and referring stakeholders"
        description="The value comes from making the treatment journey more understandable and better coordinated before, during, and around the hospital interaction."
        image={createPremiumVisual(
          "medical-tourism-trust",
          "care-coordination-meeting",
          "International healthcare care coordination meeting and patient planning.",
        )}
        items={[
          {
            icon: ShieldCheck,
            title: "Transparent Coordination",
            description:
              "Communication is designed to be clear, realistic, and aligned with healthcare decision-making.",
          },
          {
            icon: Hospital,
            title: "Hospital-Focused Facilitation",
            description:
              "The process is built around actual hospital workflows rather than generic travel sales language.",
          },
          {
            icon: Globe2,
            title: "Cross-Border Patient Readiness",
            description:
              "Travel timing, document sequencing, and practical readiness can be addressed in a more structured way.",
          },
          {
            icon: UserRound,
            title: "Human Support for Families",
            description:
              "Patient families receive a warmer, more organized coordination experience during a stressful decision period.",
          },
        ]}
        stats={[
          {
            label: "Coordination Lens",
            value: "Patient-first",
            description: "Centered on support, facilitation, and responsible communication across the journey.",
          },
          {
            label: "Primary Corridor",
            value: "India ↔ Uzbekistan",
            description: "Positioned around the major care and hospital collaboration bridge currently emphasized by the brand.",
          },
        ]}
      />

      <PremiumStepsSection
        eyebrow="Patient Journey"
        title="How the medical tourism pathway can move from inquiry to hospital assistance"
        description="This structure supports clearer internal workflow, patient understanding, and a more premium cross-border treatment experience."
        items={[
          {
            icon: UserRound,
            title: "Patient Inquiry",
            description: "Treatment requirement, goals, and patient context are first collected.",
          },
          {
            icon: FileSearch,
            title: "Medical Report Review",
            description: "Documents are organized for more informed coordination and case understanding.",
          },
          {
            icon: Stethoscope,
            title: "Hospital & Doctor Matching",
            description: "Suitable specialists and departments can be identified based on case needs.",
          },
          {
            icon: ClipboardList,
            title: "Treatment Plan & Estimate",
            description: "Indicative next steps and planning inputs can be clarified before travel.",
          },
          {
            icon: Plane,
            title: "Visa & Travel Guidance",
            description: "Travel readiness, documentation, and patient logistics are reviewed.",
          },
          {
            icon: MapPin,
            title: "Arrival Support",
            description: "Airport and local coordination help reduce friction after arrival.",
          },
          {
            icon: Hospital,
            title: "Treatment Coordination",
            description: "Hospital-side scheduling and communication continue through care delivery.",
          },
          {
            icon: HeartHandshake,
            title: "Follow-Up Support",
            description: "Practical communication remains available after treatment and discharge.",
          },
        ]}
      />

      <section id="medical-tourism-inquiry" className="section-shell">
        <div className="container-wide">
          <SectionHeader
            eyebrow="Inquiry Form"
            title="Submit a structured treatment case for review"
            description="This intake funnel is connected to the existing document upload, validation, and CRM workflow. It is built for real patient coordination, not a mock lead form."
            align="center"
          />
          <div className="mt-12">
            <RouteAwareMedicalTourismForm
              honeypotField={env.SPAM_HONEYPOT_FIELD}
              submitted={searchParams?.submitted === "1"}
              hasError={searchParams?.error === "validation"}
            />
          </div>
        </div>
      </section>

      <FAQAccordion
        eyebrow="Medical Tourism FAQ"
        title="Common questions about treatment coordination and international medical travel"
        description="These answers are written to support better expectations before patients or families begin formal coordination."
        items={faqItems}
      />

      <PremiumCtaBanner
        eyebrow="Ready to Coordinate"
        title="Start a more structured international treatment conversation"
        description="Open a patient case, speak with the MedPobeda team, or explore the international patient services route if your primary need is broader coordination support."
        image={createPremiumVisual(
          "medical-tourism-cta",
          "patient-consultation-meeting",
          "Premium patient consultation meeting for international healthcare facilitation.",
        )}
        primary={{ href: "/contact", label: "Contact MedPobeda Group" }}
        secondary={{ href: "/international-patients", label: "Request Patient Assistance" }}
      />
    </>
  );
}
