import {
  BadgeCheck,
  BriefcaseMedical,
  Building2,
  Globe2,
  GraduationCap,
  Handshake,
  Hospital,
  Microscope,
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
  title: "Hospital Partnerships",
  description:
    "MedPobeda Group supports hospitals and healthcare institutions with international patient referral structures, medical tourism collaboration, and cross-border partnership development.",
  path: "/hospital-partnerships",
  keywords: [
    "hospital partnerships",
    "international patient referrals",
    "medical tourism desk support",
    "healthcare partnership development",
  ],
});

type HospitalPartnershipsPageProps = {
  searchParams?: {
    submitted?: string;
    error?: string;
  };
};

const partnershipItems: PremiumFeatureCardItem[] = [
  {
    icon: Users,
    title: "International Patient Referrals",
    description:
      "Support hospital-to-hospital coordination models for cross-border patient access and referral growth.",
    image: createPremiumVisual(
      "partnerships-inner",
      "international-referrals",
      "Hospital leaders discussing international patient referrals.",
    ),
  },
  {
    icon: BriefcaseMedical,
    title: "Medical Tourism Desk Support",
    description:
      "Develop or strengthen patient-facing international medical tourism workflows with more structure and hospitality.",
    image: createPremiumVisual(
      "partnerships-inner",
      "medical-tourism-desk",
      "Hospital international desk and medical tourism operations team.",
    ),
  },
  {
    icon: Stethoscope,
    title: "Doctor & Faculty Exchange",
    description:
      "Enable clinical dialogue, specialist introductions, and faculty-led exchange opportunities between institutions.",
    image: createPremiumVisual(
      "partnerships-inner",
      "doctor-faculty-exchange",
      "Doctors and faculty members in an international collaboration meeting.",
    ),
  },
  {
    icon: GraduationCap,
    title: "Clinical Training Programs",
    description:
      "Support observerships, exposure visits, and structured clinical training collaboration between institutions.",
    image: createPremiumVisual(
      "partnerships-inner",
      "clinical-training-programs",
      "Clinical training group inside a modern hospital setting.",
    ),
  },
  {
    icon: Microscope,
    title: "Research & Conference Support",
    description:
      "Encourage academic exchange, research dialogue, and professional event collaboration.",
    image: createPremiumVisual(
      "partnerships-inner",
      "research-conferences",
      "Healthcare conference and research networking scene.",
    ),
  },
  {
    icon: BadgeCheck,
    title: "Hospital Branding Abroad",
    description:
      "Strengthen the international visibility of partner hospitals through structured outreach and collaboration positioning.",
    image: createPremiumVisual(
      "partnerships-inner",
      "hospital-branding-abroad",
      "Hospital brand presentation for global healthcare audiences.",
    ),
  },
];

const faqItems = [
  {
    question: "What kinds of hospitals can partner with MedPobeda Group?",
    answer:
      "The partnership model is suitable for hospitals, specialty centers, academic medical institutions, and healthcare operators seeking international patient or institutional collaboration.",
  },
  {
    question: "Does the partnership focus only on patient referrals?",
    answer:
      "No. Referrals are one area, but collaboration can also include training programs, doctor exchange, institutional visibility, and medical tourism desk development.",
  },
  {
    question: "Can hospitals from outside Uzbekistan discuss collaboration?",
    answer:
      "Yes. The current brand positioning emphasizes the Uzbekistan–India bridge, but the partnership page supports wider international healthcare facilitation discussions as well.",
  },
  {
    question: "Is there a structured inquiry route for hospital leadership teams?",
    answer:
      "Yes. The partnership funnel on this page routes collaboration inquiries through the existing CRM and follow-up workflow.",
  },
];

export default function HospitalPartnershipsPage({
  searchParams,
}: HospitalPartnershipsPageProps) {
  return (
    <>
      <JsonLd
        data={[
          createWebPageSchema({
            name: "Hospital Partnerships",
            description:
              "MedPobeda Group supports hospitals with international patient referrals, medical tourism collaboration, and cross-border healthcare partnership development.",
            path: "/hospital-partnerships",
          }),
          createServiceSchema({
            name: "Hospital Partnership Development",
            description:
              "Partnership support for hospitals seeking international collaboration and patient access growth.",
            path: "/hospital-partnerships",
          }),
          createBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Hospital Partnerships", path: "/hospital-partnerships" },
          ]),
        ]}
      />

      <PremiumPageHero
        eyebrow="Hospital Partnerships"
        title="Build premium international healthcare partnerships with MedPobeda Group"
        description="MedPobeda Group works with hospitals, international desks, and healthcare institutions to facilitate patient referrals, medical tourism programs, clinical exchange, and cross-border growth opportunities."
        highlights={["Hospital Collaboration", "International Referrals", "Healthcare Partnerships"]}
        primaryCta={{ href: "#partnership-inquiry", label: "Become a Partner Hospital" }}
        secondaryCta={{ href: "/hospitals", label: "Explore Hospital Route" }}
        images={[
          createPremiumVisual(
            "partnerships-hero",
            "executive-partnership-meeting",
            "Hospital executives in an international healthcare partnership meeting.",
          ),
          createPremiumVisual(
            "partnerships-hero",
            "premium-hospital-building",
            "Premium hospital building representing international institutional collaboration.",
          ),
          createPremiumVisual(
            "partnerships-hero",
            "doctor-collaboration-roundtable",
            "Doctors in clinical collaboration roundtable discussion.",
          ),
        ]}
        stats={[
          { value: "Institutional", label: "partnership model shaped for hospitals and medical leadership" },
          { value: "Cross-border", label: "support across referrals, branding, and clinical cooperation" },
          { value: "Growth-ready", label: "aligned with international patient access objectives" },
        ]}
        floatingCards={[
          "Patient Referrals",
          "Medical Tourism Desk",
          "Clinical Exchange",
          "Hospital Branding",
        ]}
        accentLabel="Partner Hospital Growth"
      />

      <PremiumImageStorySection
        eyebrow="Partnership Strategy"
        title="An international healthcare collaboration page designed for serious institutional discussions"
        description="This route is shaped around hospitals that need premium presentation, structured next steps, and a credible cross-border operating partner."
        body={[
          "MedPobeda Group helps hospitals think beyond isolated patient referrals. The platform is positioned to support international patient desk models, specialist collaboration, visibility in new markets, and healthcare growth through structured partnerships.",
          "The emphasis remains on trust, process clarity, and practical institutional value. That means collaboration formats should be realistic, operationally useful, and aligned with healthcare expectations on both sides of the relationship.",
        ]}
        badges={[
          "International Patient Referrals",
          "Clinical Cooperation",
          "Training Programs",
          "Research Dialogue",
          "Hospital Branding Abroad",
        ]}
        images={[
          createPremiumVisual(
            "partnerships-story",
            "hospital-boardroom",
            "Hospital boardroom for international partnership planning.",
          ),
          createPremiumVisual(
            "partnerships-story",
            "international-desk-team",
            "International patient desk team inside a premium hospital.",
          ),
          createPremiumVisual(
            "partnerships-story",
            "healthcare-delegation",
            "Healthcare delegation and cross-border hospital collaboration visit.",
          ),
          createPremiumVisual(
            "partnerships-story",
            "conference-handshake",
            "Professional handshake at a healthcare conference or partnership meeting.",
          ),
        ]}
      />

      <PremiumFeatureCardsSection
        eyebrow="Collaboration Areas"
        title="Partnership formats that can support hospital growth, visibility, and patient access"
        description="Each model is built around real healthcare collaboration use cases rather than generic business development language."
        items={partnershipItems}
        columns={3}
      />

      <PremiumSplitTrustSection
        eyebrow="Why Hospitals Work With Us"
        title="A partnership approach that balances international ambition with healthcare seriousness"
        description="Hospitals need more than introductions. They need a collaboration structure that respects patient communication, institutional reputation, and operational clarity."
        image={createPremiumVisual(
          "partnerships-trust",
          "hospital-leadership-briefing",
          "Hospital leadership briefing on international collaboration and patient access.",
        )}
        items={[
          {
            icon: ShieldCheck,
            title: "Trust-Based Positioning",
            description:
              "The public brand and stakeholder experience are designed to feel premium, careful, and internationally credible.",
          },
          {
            icon: Globe2,
            title: "India–Uzbekistan Bridge",
            description:
              "The current corridor focus supports deeper alignment between institutions operating across these healthcare markets.",
          },
          {
            icon: Hospital,
            title: "Hospital-Centric Execution",
            description:
              "Partnership ideas are framed around hospital systems, patient access pathways, and institutional cooperation.",
          },
          {
            icon: Handshake,
            title: "Relationship-Led Growth",
            description:
              "The objective is to build stronger healthcare relationships, not short-term transactional lead passing.",
          },
        ]}
        stats={[
          {
            label: "Partnership Style",
            value: "Premium & structured",
            description: "Built to support hospital directors, international desks, and healthcare institutions.",
          },
          {
            label: "Operational Focus",
            value: "Referrals to exchange",
            description: "Covers patient movement, training, research, branding, and cross-border collaboration.",
          },
        ]}
      />

      <PremiumStepsSection
        eyebrow="Partnership Workflow"
        title="How a hospital collaboration discussion can move from interest to action"
        description="The process is designed to create a clearer path for leadership teams, coordinators, and institutional stakeholders."
        items={[
          {
            icon: Building2,
            title: "Initial Discovery",
            description: "Define partnership priorities, specialties, geography, and collaboration objectives.",
          },
          {
            icon: Users,
            title: "Stakeholder Alignment",
            description: "Identify decision-makers, desk teams, or clinical leads involved in the discussion.",
          },
          {
            icon: Handshake,
            title: "Partnership Model Selection",
            description: "Shape the most appropriate collaboration route: referrals, exchange, training, or branding support.",
          },
          {
            icon: Hospital,
            title: "Operational Planning",
            description: "Map workflows for communication, referrals, visibility, and institutional coordination.",
          },
          {
            icon: Stethoscope,
            title: "Clinical or Academic Activation",
            description: "Launch doctor exchange, training support, or specialty-facing collaboration lanes.",
          },
          {
            icon: BadgeCheck,
            title: "Long-Term Relationship Support",
            description: "Maintain continuity through follow-up, growth opportunities, and expanded international access.",
          },
        ]}
      />

      <section id="partnership-inquiry" className="section-shell">
        <div className="container-wide">
          <SectionHeader
            eyebrow="Partnership Inquiry"
            title="Open a formal partnership conversation"
            description="This form is connected to the existing partnership intake workflow, making it suitable for real hospital and institutional collaboration discussions."
            align="center"
          />
          <div className="mt-12">
            <RouteAwareContactInquiryFunnel
              variant="partnership"
              honeypotField={env.SPAM_HONEYPOT_FIELD}
              submittedType={searchParams?.submitted}
              hasError={searchParams?.error === "validation"}
            />
          </div>
        </div>
      </section>

      <FAQAccordion
        eyebrow="Partnership FAQ"
        title="Common questions from hospitals and healthcare institutions"
        description="These answers help partnership teams understand how the collaboration route is positioned before opening a formal discussion."
        items={faqItems}
      />

      <PremiumCtaBanner
        eyebrow="Partner Hospital CTA"
        title="Expand international patient access through a stronger healthcare bridge"
        description="If your hospital is exploring patient referrals, training collaborations, medical tourism support, or cross-border branding, MedPobeda Group can help structure the next conversation."
        image={createPremiumVisual(
          "partnerships-cta",
          "hospital-growth-conversation",
          "Hospital growth and international partnership conversation in a premium setting.",
        )}
        primary={{ href: "/contact", label: "Become a Partner Hospital" }}
        secondary={{ href: "/medical-tourism", label: "View Medical Tourism" }}
      />
    </>
  );
}
