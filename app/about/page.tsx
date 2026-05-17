import {
  Building2,
  Globe2,
  Handshake,
  HeartHandshake,
  Hospital,
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
import { PremiumImageStorySection } from "@/components/marketing/premium-image-story-section";
import { PremiumPageHero } from "@/components/marketing/premium-page-hero";
import { PremiumSplitTrustSection } from "@/components/marketing/premium-split-trust-section";
import { PremiumStepsSection } from "@/components/marketing/premium-steps-section";
import { createMetadata } from "@/lib/metadata";
import { createPremiumVisual } from "@/lib/premium-visuals";
import {
  createBreadcrumbSchema,
  createWebPageSchema,
} from "@/lib/schema";

export const metadata = createMetadata({
  title: "About MedPobeda Group",
  description:
    "MedPobeda Group is a premium healthcare collaboration platform connecting patients, hospitals, and institutions through medical tourism and international healthcare partnerships.",
  path: "/about",
  keywords: [
    "about medpobeda group",
    "healthcare collaboration platform",
    "India Uzbekistan healthcare bridge",
    "medical tourism and partnerships",
  ],
});

const pillarItems: PremiumFeatureCardItem[] = [
  {
    icon: Globe2,
    title: "Healthcare Bridge Building",
    description:
      "MedPobeda Group builds trusted links between Uzbekistan, India, and wider international healthcare stakeholders.",
    image: createPremiumVisual(
      "about-inner",
      "healthcare-bridge",
      "Healthcare bridge visual for international collaboration.",
    ),
  },
  {
    icon: HeartHandshake,
    title: "Patient-Centered Facilitation",
    description:
      "The brand supports patients and families through medical tourism and international patient coordination with a more careful communication style.",
    image: createPremiumVisual(
      "about-inner",
      "patient-facilitation",
      "Patient facilitation and care coordination discussion.",
    ),
  },
  {
    icon: Hospital,
    title: "Hospital Collaboration",
    description:
      "The platform helps hospitals explore referrals, academic exchange, training programs, and partnership opportunities across borders.",
    image: createPremiumVisual(
      "about-inner",
      "hospital-collaboration",
      "Hospital collaboration meeting with leadership and clinicians.",
    ),
  },
  {
    icon: Users,
    title: "Institutional Cooperation",
    description:
      "Universities, healthcare institutions, and medical organizations can use the platform to shape structured international relationships.",
    image: createPremiumVisual(
      "about-inner",
      "institutional-cooperation",
      "Institutional healthcare cooperation strategy discussion.",
    ),
  },
  {
    icon: ShieldCheck,
    title: "Trust-Led Communication",
    description:
      "The tone and interface are intentionally designed to feel reassuring, premium, and appropriate for serious healthcare decisions.",
    image: createPremiumVisual(
      "about-inner",
      "trust-led-communication",
      "Premium healthcare communication and trust-building environment.",
    ),
  },
  {
    icon: Stethoscope,
    title: "Clinical & Coordination Relevance",
    description:
      "Every public route is framed around real healthcare workflows instead of abstract brand language.",
    image: createPremiumVisual(
      "about-inner",
      "clinical-relevance",
      "Clinical coordination relevance across hospitals and patient services.",
    ),
  },
];

const faqItems = [
  {
    question: "What is MedPobeda Group focused on today?",
    answer:
      "The brand is focused on medical tourism, international patient services, hospital collaboration, healthcare partnerships, student mobility, and clinical or institutional cooperation.",
  },
  {
    question: "Does MedPobeda Group position itself as a hospital or clinic?",
    answer:
      "No. MedPobeda Group is positioned as a facilitation and collaboration platform that helps connect patients, hospitals, and institutions through structured healthcare relationships.",
  },
  {
    question: "Why is the India–Uzbekistan connection important to the brand?",
    answer:
      "It reflects a current strategic healthcare bridge for patient coordination, hospital collaboration, and institutional engagement while still allowing wider international healthcare facilitation.",
  },
  {
    question: "Who is the primary audience for MedPobeda Group?",
    answer:
      "The audience includes patients, hospital leaders, international patient teams, healthcare partners, and institutions interested in structured cross-border healthcare collaboration.",
  },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={[
          createWebPageSchema({
            name: "About MedPobeda Group",
            description:
              "MedPobeda Group is a premium healthcare collaboration platform connecting patients, hospitals, and institutions through international healthcare facilitation.",
            path: "/about",
            type: "AboutPage",
          }),
          createBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
          ]),
        ]}
      />

      <PremiumPageHero
        eyebrow="About MedPobeda Group"
        title="Building a trusted healthcare bridge between patients, hospitals, and institutions"
        description="MedPobeda Group is designed as a premium international healthcare collaboration platform focused on medical tourism, hospital partnerships, international patient support, student mobility, and institutional cooperation."
        highlights={["Healthcare Bridge", "International Collaboration", "Premium Coordination"]}
        primaryCta={{ href: "/contact", label: "Contact MedPobeda Group" }}
        secondaryCta={{ href: "/hospital-partnerships", label: "Explore Partnerships" }}
        images={[
          createPremiumVisual(
            "about-hero",
            "leadership-meeting",
            "Healthcare leadership meeting in a premium collaboration setting.",
          ),
          createPremiumVisual(
            "about-hero",
            "hospital-network-visual",
            "Premium hospital network visual for international healthcare positioning.",
          ),
          createPremiumVisual(
            "about-hero",
            "patient-coordination-desk",
            "Healthcare coordination desk for international patient and institutional support.",
          ),
        ]}
        stats={[
          { value: "Premium", label: "public presentation for international healthcare stakeholders" },
          { value: "Bridge-led", label: "positioning between Uzbekistan, India, and partner institutions" },
          { value: "Multi-stakeholder", label: "support across patients, hospitals, and institutions" },
        ]}
        floatingCards={[
          "Medical Tourism",
          "Hospital Partnerships",
          "International Patients",
          "Student Mobility",
        ]}
        accentLabel="Trusted Healthcare Platform"
      />

      <PremiumImageStorySection
        eyebrow="Our Story"
        title="A modern healthcare collaboration brand built around clarity, trust, and international access"
        description="The company positioning is shaped by what healthcare stakeholders expect: premium presentation, human communication, and a serious operational tone."
        body={[
          "MedPobeda Group is intended to make cross-border healthcare relationships feel more structured. Patients need better guidance, hospitals need credible international pathways, and institutions need a collaboration partner that understands healthcare expectations.",
          "That is why the brand combines white-space, trust-led design, premium medical visuals, and careful wording with service routes that support real healthcare facilitation rather than generic promotion.",
        ]}
        badges={[
          "Medical Tourism",
          "Hospital Collaboration",
          "International Patients",
          "Healthcare Partnerships",
          "Clinical Training",
        ]}
        images={[
          createPremiumVisual(
            "about-story",
            "executive-hospital-conversation",
            "Executive hospital conversation for international collaboration.",
          ),
          createPremiumVisual(
            "about-story",
            "patient-family-support",
            "Patient family support discussion in a premium care setting.",
          ),
          createPremiumVisual(
            "about-story",
            "doctor-strategy-meeting",
            "Doctors and coordinators in healthcare strategy discussion.",
          ),
          createPremiumVisual(
            "about-story",
            "clinical-networking",
            "Clinical networking and institutional healthcare collaboration.",
          ),
        ]}
      />

      <PremiumFeatureCardsSection
        eyebrow="Core Pillars"
        title="The six positioning pillars behind MedPobeda Group"
        description="Each pillar supports how the website communicates trust, healthcare seriousness, and international relevance."
        items={pillarItems}
        columns={3}
      />

      <PremiumSplitTrustSection
        eyebrow="How We Work"
        title="A healthcare operating style centered on trust, coordination quality, and institutional credibility"
        description="The brand is designed to feel premium, but the underlying logic is practical: support real healthcare conversations through stronger design, clearer routes, and more responsible communication."
        image={createPremiumVisual(
          "about-trust",
          "healthcare-operations-overview",
          "Healthcare operations overview and trust-led coordination environment.",
        )}
        items={[
          {
            icon: ShieldCheck,
            title: "Trust-Led Engagement",
            description:
              "Every public page is designed to reduce hesitation and improve confidence before formal inquiry submission.",
          },
          {
            icon: Handshake,
            title: "Relationship Building",
            description:
              "The platform aims to support lasting healthcare relationships between patients, hospitals, and institutions.",
          },
          {
            icon: Building2,
            title: "Regional Relevance",
            description:
              "The operating model is grounded in the realities of Uzbekistan-facing healthcare communication and international access.",
          },
          {
            icon: Globe2,
            title: "International Reach",
            description:
              "The visual and service system are shaped for global healthcare conversations, not just local presentation.",
          },
        ]}
        stats={[
          {
            label: "Brand Direction",
            value: "Luxury healthcare",
            description: "White, blue, polished, and trust-focused rather than dark or generic.",
          },
          {
            label: "Operating Identity",
            value: "Facilitate & connect",
            description: "Focused on guiding, assisting, coordinating, and partnering across healthcare routes.",
          },
        ]}
      />

      <PremiumStepsSection
        eyebrow="Operating Principles"
        title="How MedPobeda Group approaches international healthcare collaboration"
        description="These principles guide how the brand turns inquiries into clearer healthcare conversations."
        items={[
          {
            icon: Users,
            title: "Listen First",
            description: "Understand whether the need is patient support, hospital partnership, or institutional collaboration.",
          },
          {
            icon: Building2,
            title: "Map the Right Route",
            description: "Direct the inquiry into the service lane that best fits the healthcare objective.",
          },
          {
            icon: Hospital,
            title: "Coordinate With Care",
            description: "Keep communication aligned with hospital workflows, patient needs, and professional expectations.",
          },
          {
            icon: Globe2,
            title: "Connect Across Borders",
            description: "Support relationships that link Uzbekistan, India, and relevant international stakeholders.",
          },
          {
            icon: HeartHandshake,
            title: "Support Humanly",
            description: "Patients and families should feel reassured, not overwhelmed, when engaging the platform.",
          },
          {
            icon: ShieldCheck,
            title: "Maintain Trust",
            description: "Use careful language, realistic positioning, and a premium presentation that respects healthcare seriousness.",
          },
        ]}
      />

      <FAQAccordion
        eyebrow="About FAQ"
        title="Questions about the MedPobeda Group positioning and focus"
        description="These answers clarify how the brand is intended to operate and how its service routes fit together."
        items={faqItems}
      />

      <PremiumCtaBanner
        eyebrow="Start The Conversation"
        title="Explore how MedPobeda Group can support your healthcare objectives"
        description="Whether your focus is medical tourism, hospital collaboration, international patient services, or institutional mobility, the next step starts with a direct conversation."
        image={createPremiumVisual(
          "about-cta",
          "international-healthcare-conversation",
          "International healthcare conversation and premium collaboration meeting.",
        )}
        primary={{ href: "/contact", label: "Contact MedPobeda Group" }}
        secondary={{ href: "/medical-tourism", label: "View Medical Tourism" }}
      />
    </>
  );
}
