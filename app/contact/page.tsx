import {
  Globe2,
  GraduationCap,
  Handshake,
  HeartHandshake,
  MessageCircle,
  ShieldCheck,
  Stethoscope,
  Users,
} from "lucide-react";

import { FAQAccordion } from "@/components/shared/faq-accordion";
import { JsonLd } from "@/components/shared/json-ld";
import { PremiumCtaBanner } from "@/components/marketing/premium-cta-banner";
import {
  PremiumFeatureCardsSection,
  type PremiumFeatureCardItem,
} from "@/components/marketing/premium-feature-cards-section";
import { HomeContactSection } from "@/components/marketing/home-contact-section";
import { PremiumImageStorySection } from "@/components/marketing/premium-image-story-section";
import { PremiumPageHero } from "@/components/marketing/premium-page-hero";
import { PremiumSplitTrustSection } from "@/components/marketing/premium-split-trust-section";
import { createMetadata } from "@/lib/metadata";
import { createPremiumVisual } from "@/lib/premium-visuals";
import {
  createBreadcrumbSchema,
  createWebPageSchema,
} from "@/lib/schema";
import { env } from "@/lib/env";

export const metadata = createMetadata({
  title: "Contact MedPobeda Group",
  description:
    "Contact MedPobeda Group for medical tourism, hospital partnerships, international patient support, student mobility, and international healthcare collaboration.",
  path: "/contact",
  keywords: [
    "contact medpobeda group",
    "patient assistance inquiry",
    "hospital partnership contact",
    "international healthcare coordination",
  ],
});

type ContactPageProps = {
  searchParams?: {
    submitted?: string;
    error?: string;
  };
};

const contactItems: PremiumFeatureCardItem[] = [
  {
    icon: Handshake,
    title: "Hospital Partnership Discussions",
    description:
      "Suitable for hospitals, leadership teams, international desks, and healthcare groups exploring structured collaboration.",
    image: createPremiumVisual(
      "contact-inner",
      "hospital-partnership-discussion",
      "Hospital partnership discussion in a premium healthcare meeting environment.",
    ),
  },
  {
    icon: HeartHandshake,
    title: "Patient Support Requests",
    description:
      "For patients and families who need guidance around hospital appointments, treatment planning, and care coordination.",
    image: createPremiumVisual(
      "contact-inner",
      "patient-support-request",
      "International patient support request and guidance conversation.",
    ),
  },
  {
    icon: GraduationCap,
    title: "Student Mobility & Clinical Exposure",
    description:
      "For institutions or participants exploring observerships, hospital visits, and healthcare-linked mobility pathways.",
    image: createPremiumVisual(
      "contact-inner",
      "student-mobility-contact",
      "Clinical exposure and student mobility conversation with institutional partners.",
    ),
  },
  {
    icon: Stethoscope,
    title: "Doctor & Specialist Collaboration",
    description:
      "For healthcare stakeholders discussing clinical cooperation, case dialogue, or specialist introductions.",
    image: createPremiumVisual(
      "contact-inner",
      "doctor-collaboration-contact",
      "Doctor collaboration and specialist coordination discussion.",
    ),
  },
];

const faqItems = [
  {
    question: "Which form should I use on the contact page?",
    answer:
      "Use the patient tab for treatment support, the hospital tab for partnership or referral discussions, and the institution tab for student mobility or broader institutional collaboration.",
  },
  {
    question: "Can this page handle real submissions and uploads?",
    answer:
      "Yes. The forms are connected to the existing validation, CRM routing, and follow-up workflow used across the site.",
  },
  {
    question: "Is WhatsApp support available from here too?",
    answer:
      "Yes. The contact page is intended to support both formal inquiry forms and direct messaging channels for faster coordination conversations.",
  },
  {
    question: "Can hospitals and institutions use the same page?",
    answer:
      "Yes. The contact architecture is designed for multiple stakeholder types while still keeping each route clear and professionally framed.",
  },
];

export default function ContactPage({ searchParams }: ContactPageProps) {
  return (
    <>
      <JsonLd
        data={[
          createWebPageSchema({
            name: "Contact MedPobeda Group",
            description:
              "Contact MedPobeda Group for medical tourism, hospital partnerships, international patient coordination, and healthcare collaboration.",
            path: "/contact",
            type: "ContactPage",
          }),
          createBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Contact", path: "/contact" },
          ]),
        ]}
      />

      <PremiumPageHero
        eyebrow="Contact"
        title="Open the right healthcare conversation with MedPobeda Group"
        description="The contact experience is designed for patients, hospitals, and institutions who need a premium healthcare interface with clear routing, structured inquiry paths, and responsive coordination options."
        highlights={["Contact Desk", "Patient Assistance", "Partnership Inquiry"]}
        primaryCta={{ href: "#contact-section", label: "Contact MedPobeda Group" }}
        secondaryCta={{ href: "/hospital-partnerships", label: "View Partnerships" }}
        images={[
          createPremiumVisual(
            "contact-hero",
            "premium-contact-desk",
            "Premium healthcare contact desk and coordination environment.",
          ),
          createPremiumVisual(
            "contact-hero",
            "consultation-meeting",
            "Healthcare consultation meeting for patients and partners.",
          ),
          createPremiumVisual(
            "contact-hero",
            "international-support",
            "International support representative guiding a healthcare inquiry.",
          ),
        ]}
        stats={[
          { value: "Tabbed", label: "inquiry desk for patients, hospitals, and institutions" },
          { value: "Direct", label: "channels for formal submissions and faster coordination" },
          { value: "Premium", label: "contact experience aligned with healthcare trust" },
        ]}
        floatingCards={[
          "For Patients",
          "For Hospitals",
          "For Institutions",
          "Direct Channels",
        ]}
        accentLabel="Healthcare Inquiry Desk"
      />

      <PremiumImageStorySection
        eyebrow="Contact Experience"
        title="A luxury white-blue contact environment built for healthcare seriousness"
        description="The contact route is designed to feel more reassuring, organized, and credible for high-stakes healthcare and institutional conversations."
        body={[
          "Patients need a contact experience that feels warm and clear. Hospitals need a route that looks partnership-ready. Institutions need a place to start without feeling pushed into the wrong conversation.",
          "This contact page is structured to support all three, while maintaining the same premium visual standard used across the redesigned MedPobeda Group platform.",
        ]}
        badges={[
          "Patient Assistance",
          "Hospital Partnerships",
          "Institutional Collaboration",
          "Medical Travel Support",
          "Direct Messaging",
        ]}
        images={[
          createPremiumVisual(
            "contact-story",
            "patient-inquiry-support",
            "Patient inquiry support and premium healthcare concierge interaction.",
          ),
          createPremiumVisual(
            "contact-story",
            "hospital-leadership-contact",
            "Hospital leadership contact and partnership conversation.",
          ),
          createPremiumVisual(
            "contact-story",
            "care-coordinator-workspace",
            "Care coordinator workspace for international healthcare facilitation.",
          ),
          createPremiumVisual(
            "contact-story",
            "institutional-briefing-call",
            "Institutional collaboration call and healthcare briefing.",
          ),
        ]}
      />

      <PremiumFeatureCardsSection
        eyebrow="Who Uses This Page"
        title="The main stakeholder routes supported by the contact experience"
        description="Each inquiry path is matched to a real use case so stakeholders can reach the most appropriate healthcare conversation faster."
        items={contactItems}
        columns={2}
      />

      <PremiumSplitTrustSection
        eyebrow="Why The Contact Experience Matters"
        title="Contact architecture that builds trust before the first reply"
        description="A healthcare website often wins or loses credibility at the inquiry stage. This design is intended to feel calm, serious, and premium from the first click."
        image={createPremiumVisual(
          "contact-trust",
          "tashkent-coordination-base",
          "Tashkent-based healthcare coordination and international support environment.",
        )}
        items={[
          {
            icon: ShieldCheck,
            title: "Clear Routing",
            description:
              "Visitors should understand immediately whether they are opening a patient, hospital, or institutional conversation.",
          },
          {
            icon: MessageCircle,
            title: "Direct Communication",
            description:
              "Formal inquiry forms and faster messaging routes are both available within the same premium ecosystem.",
          },
          {
            icon: Globe2,
            title: "International Readiness",
            description:
              "The experience is built for stakeholders communicating across countries, hospitals, and healthcare systems.",
          },
          {
            icon: Users,
            title: "Multi-Stakeholder Trust",
            description:
              "Patients, hospitals, and institutions can all see a route that feels designed specifically for them.",
          },
        ]}
        stats={[
          {
            label: "Operating Base",
            value: "Tashkent, Uzbekistan",
            description: "A locally grounded platform serving cross-border healthcare conversations.",
          },
          {
            label: "Core Contact Use Cases",
            value: "Patient to partner",
            description: "Supports patient care inquiries, hospital growth discussions, and institutional collaboration outreach.",
          },
        ]}
      />

      <HomeContactSection
        honeypotField={env.SPAM_HONEYPOT_FIELD}
        submittedType={searchParams?.submitted}
        hasError={searchParams?.error === "validation"}
      />

      <FAQAccordion
        eyebrow="Contact FAQ"
        title="Questions about inquiry routes, forms, and coordination channels"
        description="These answers help stakeholders choose the right route and understand how the contact workflow is structured."
        items={faqItems}
      />

      <PremiumCtaBanner
        eyebrow="Still Not Sure?"
        title="Let MedPobeda Group guide you into the right healthcare route"
        description="If you are unsure whether your need belongs under medical tourism, hospital partnerships, patient support, or institutional collaboration, the contact desk is built to help you start in the right place."
        image={createPremiumVisual(
          "contact-cta",
          "healthcare-guidance-conversation",
          "Healthcare guidance conversation and premium support meeting.",
        )}
        primary={{ href: "#contact-section", label: "Contact MedPobeda Group" }}
        secondary={{ href: "/medical-tourism", label: "View Medical Tourism" }}
      />
    </>
  );
}
