import {
  CheckCircle2,
  Globe2,
  HeartHandshake,
  Hospital,
  Languages,
  MapPin,
  Plane,
  ShieldCheck,
  Stethoscope,
  UserRound,
  Users,
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
import { RouteAwareContactInquiryFunnel } from "@/components/marketing/route-aware-contact-inquiry-funnel";
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
  title: "International Patients",
  description:
    "MedPobeda Group supports international patients with hospital coordination, travel guidance, doctor matching, interpretation support, and follow-up communication.",
  path: "/international-patients",
  keywords: [
    "international patient support",
    "doctor selection assistance",
    "hospital appointment coordination",
    "medical travel support",
  ],
});

type InternationalPatientsPageProps = {
  searchParams?: {
    submitted?: string;
    error?: string;
  };
};

const supportItems: PremiumFeatureCardItem[] = [
  {
    icon: ShieldCheck,
    title: "Treatment Guidance",
    description:
      "Patient support begins with clearer understanding around treatment objectives, case preparation, and coordination steps.",
    image: createPremiumVisual(
      "international-patients-inner",
      "treatment-guidance",
      "Doctor and patient discussing treatment guidance in a premium setting.",
    ),
  },
  {
    icon: Hospital,
    title: "Hospital Appointment Support",
    description:
      "MedPobeda Group helps align appointment planning and patient movement with hospital-side coordination needs.",
    image: createPremiumVisual(
      "international-patients-inner",
      "hospital-appointment-support",
      "Hospital appointment and registration support for an international patient.",
    ),
  },
  {
    icon: Stethoscope,
    title: "Doctor Selection",
    description:
      "Suitable specialists can be identified in a way that feels more informed, practical, and patient-centered.",
    image: createPremiumVisual(
      "international-patients-inner",
      "doctor-selection",
      "International patient doctor selection and specialist matching consultation.",
    ),
  },
  {
    icon: Plane,
    title: "Travel & Stay Support",
    description:
      "The route can include guidance for travel timing, arrival assistance, and practical stay planning.",
    image: createPremiumVisual(
      "international-patients-inner",
      "travel-stay-support",
      "International patient travel and stay support coordination.",
    ),
  },
  {
    icon: Languages,
    title: "Language Assistance",
    description:
      "Interpreter and communication support help make healthcare decisions and hospital interactions easier to navigate.",
    image: createPremiumVisual(
      "international-patients-inner",
      "language-assistance",
      "Interpreter and language assistance during an international healthcare consultation.",
    ),
  },
  {
    icon: CheckCircle2,
    title: "Follow-Up Coordination",
    description:
      "Patients and families can receive clearer communication continuity during and after treatment.",
    image: createPremiumVisual(
      "international-patients-inner",
      "follow-up-coordination",
      "Follow-up coordination and patient family communication support.",
    ),
  },
];

const faqItems = [
  {
    question: "Who is this page for?",
    answer:
      "This route is designed for international patients and their families who need support around hospital coordination, treatment guidance, travel planning, or follow-up communication.",
  },
  {
    question: "Can MedPobeda Group help before a patient chooses a hospital?",
    answer:
      "Yes. The support model can begin before a final hospital decision is made, especially when case review and specialist matching are needed first.",
  },
  {
    question: "Does support include interpretation or multilingual communication?",
    answer:
      "Yes. Language assistance is part of the international patient support positioning, especially when clearer communication can reduce uncertainty for the patient or family.",
  },
  {
    question: "Is this only for medical tourism cases?",
    answer:
      "Medical tourism is one major use case, but this page is broader. It covers the patient support experience around international care coordination more generally.",
  },
];

export default function InternationalPatientsPage({
  searchParams,
}: InternationalPatientsPageProps) {
  return (
    <>
      <JsonLd
        data={[
          createWebPageSchema({
            name: "International Patients",
            description:
              "MedPobeda Group supports international patients through hospital coordination, travel guidance, language assistance, and follow-up communication.",
            path: "/international-patients",
          }),
          createServiceSchema({
            name: "International Patient Assistance",
            description:
              "Personalized coordination support for patients seeking healthcare across borders.",
            path: "/international-patients",
          }),
          createBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "International Patients", path: "/international-patients" },
          ]),
        ]}
      />

      <PremiumPageHero
        eyebrow="International Patients"
        title="Personalized support for international patients and their families"
        description="MedPobeda Group helps international patients navigate treatment guidance, hospital appointments, doctor selection, travel readiness, language support, and follow-up coordination through a more premium healthcare experience."
        highlights={["International Patients", "Patient Support", "Care Coordination"]}
        primaryCta={{ href: "#patient-assistance-form", label: "Request Patient Assistance" }}
        secondaryCta={{ href: "/medical-tourism", label: "Explore Medical Tourism" }}
        images={[
          createPremiumVisual(
            "international-patients-hero",
            "caring-doctor-patient",
            "Doctor consulting an international patient in a warm premium healthcare environment.",
          ),
          createPremiumVisual(
            "international-patients-hero",
            "patient-coordinator",
            "International patient coordinator supporting a family.",
          ),
          createPremiumVisual(
            "international-patients-hero",
            "family-reassurance",
            "Family healthcare reassurance and patient support scene.",
          ),
        ]}
        stats={[
          { value: "Human-first", label: "coordination across treatment and travel questions" },
          { value: "Warm & clear", label: "communication designed for patients and families" },
          { value: "Cross-border", label: "support around hospital access and follow-through" },
        ]}
        floatingCards={[
          "Doctor Selection",
          "Hospital Guidance",
          "Travel Support",
          "Language Assistance",
        ]}
        accentLabel="Patient Confidence"
      />

      <PremiumImageStorySection
        eyebrow="Patient Experience"
        title="A premium support model designed to feel safe, caring, and professionally managed"
        description="International patients need more than contact details. They need a healthcare coordination experience that removes uncertainty at each stage."
        body={[
          "This page focuses on the patient-facing side of MedPobeda Group: helping people and families feel more supported while navigating treatment choices, hospital communication, and international logistics.",
          "The brand language stays careful and ethical. It is about facilitating, guiding, and coordinating around healthcare decisions, not promising medical outcomes.",
        ]}
        badges={[
          "Treatment Guidance",
          "Hospital Appointments",
          "Doctor Selection",
          "Travel Support",
          "Language Assistance",
        ]}
        images={[
          createPremiumVisual(
            "international-patients-story",
            "patient-consultation-room",
            "Premium patient consultation room with supportive care environment.",
          ),
          createPremiumVisual(
            "international-patients-story",
            "family-guidance-desk",
            "Family guidance and patient support desk for international care.",
          ),
          createPremiumVisual(
            "international-patients-story",
            "hospital-corridor-assistance",
            "In-hospital assistance for international patients.",
          ),
          createPremiumVisual(
            "international-patients-story",
            "airport-arrival-support",
            "Airport arrival support for a patient and attendant.",
          ),
        ]}
      />

      <PremiumFeatureCardsSection
        eyebrow="Support Areas"
        title="Service cards built around the real needs of international patients"
        description="These are the patient support touchpoints most likely to influence comfort, trust, and decision clarity across borders."
        items={supportItems}
        columns={3}
      />

      <PremiumSplitTrustSection
        eyebrow="Why Patients Choose MedPobeda Group"
        title="A patient-facing coordination approach that feels calmer, clearer, and more trustworthy"
        description="The design language and service framing are both meant to reinforce reassurance without reducing the seriousness of healthcare decisions."
        image={createPremiumVisual(
          "international-patients-trust",
          "patient-support-meeting",
          "Patient support meeting focused on clarity and trust.",
        )}
        items={[
          {
            icon: HeartHandshake,
            title: "Compassionate Communication",
            description:
              "The platform is written and designed to support patients during high-stress healthcare decisions.",
          },
          {
            icon: Globe2,
            title: "Cross-Border Coordination",
            description:
              "Travel, hospital communication, and patient movement can be managed more coherently across countries.",
          },
          {
            icon: ShieldCheck,
            title: "Trust-Focused Process",
            description:
              "Patients need clarity, not aggressive claims. The experience is framed around support and transparency.",
          },
          {
            icon: Users,
            title: "Family Support Orientation",
            description:
              "Family members and attendants are considered part of the communication and coordination experience.",
          },
        ]}
        stats={[
          {
            label: "Support Tone",
            value: "Warm & professional",
            description: "Balanced to feel both caring and institutionally credible.",
          },
          {
            label: "Care Focus",
            value: "Before to aftercare",
            description: "Supports the patient journey from inquiry through treatment follow-through.",
          },
        ]}
      />

      <PremiumStepsSection
        eyebrow="Support Flow"
        title="How patient support can move from first message to follow-up"
        description="Each step is designed to make the patient journey easier to understand and easier to manage."
        items={[
          {
            icon: UserRound,
            title: "Initial Patient Contact",
            description: "The patient or family shares the treatment need and general care objective.",
          },
          {
            icon: Hospital,
            title: "Hospital Guidance",
            description: "Suitable facilities and possible coordination directions can be discussed.",
          },
          {
            icon: Stethoscope,
            title: "Doctor Selection",
            description: "Specialists may be matched more clearly to the patient requirement.",
          },
          {
            icon: Plane,
            title: "Travel & Stay Planning",
            description: "Travel readiness and practical arrangements can be reviewed before movement.",
          },
          {
            icon: Languages,
            title: "Language & Communication Support",
            description: "Interpretation and family-facing communication reduce friction across borders.",
          },
          {
            icon: MapPin,
            title: "Arrival Assistance",
            description: "Arrival, orientation, and hospital-side support improve confidence after travel.",
          },
          {
            icon: HeartHandshake,
            title: "Treatment Coordination",
            description: "Communication continues during care, scheduling, and practical next steps.",
          },
          {
            icon: CheckCircle2,
            title: "Follow-Up Continuity",
            description: "Patients and families retain a clearer route for communication after treatment.",
          },
        ]}
      />

      <section id="patient-assistance-form" className="section-shell">
        <div className="container-wide">
          <SectionHeader
            eyebrow="Patient Assistance Form"
            title="Open a patient support request"
            description="This inquiry flow is connected to the existing submission and follow-up workflow, making it appropriate for real international patient coordination requests."
            align="center"
          />
          <div className="mt-12">
            <RouteAwareContactInquiryFunnel
              variant="international-patient"
              honeypotField={env.SPAM_HONEYPOT_FIELD}
              submittedType={searchParams?.submitted}
              hasError={searchParams?.error === "validation"}
            />
          </div>
        </div>
      </section>

      <FAQAccordion
        eyebrow="Patient FAQ"
        title="Questions international patients and families often ask first"
        description="These answers focus on patient support, hospital coordination, and what to expect from the MedPobeda facilitation role."
        items={faqItems}
      />

      <PremiumCtaBanner
        eyebrow="Need Help Now"
        title="Speak with MedPobeda Group about your patient support needs"
        description="If you need structured support for treatment guidance, doctor selection, travel readiness, or hospital coordination, the next step can start here."
        image={createPremiumVisual(
          "international-patients-cta",
          "patient-family-support",
          "Patient family support and premium international healthcare coordination.",
        )}
        primary={{ href: "/contact", label: "Contact MedPobeda Group" }}
        secondary={{ href: "/medical-tourism", label: "Open Medical Tourism Route" }}
      />
    </>
  );
}
