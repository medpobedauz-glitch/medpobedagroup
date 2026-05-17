import {
  BadgeCheck,
  Building2,
  Globe2,
  GraduationCap,
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
  title: "Student Mobility",
  description:
    "MedPobeda Group supports student mobility, clinical exposure, observerships, and institutional healthcare collaboration between hospitals and academic partners.",
  path: "/student-mobility",
  keywords: [
    "student mobility healthcare",
    "clinical exposure support",
    "observership coordination",
    "institutional healthcare collaboration",
  ],
});

type StudentMobilityPageProps = {
  searchParams?: {
    submitted?: string;
    error?: string;
  };
};

const mobilityItems: PremiumFeatureCardItem[] = [
  {
    icon: Hospital,
    title: "Clinical Exposure Support",
    description:
      "Facilitation for hospital visits, observerships, and clinically oriented exposure programs linked to healthcare institutions.",
    image: createPremiumVisual(
      "student-mobility-inner",
      "clinical-exposure",
      "Medical students in structured clinical exposure at a premium hospital.",
    ),
  },
  {
    icon: GraduationCap,
    title: "Observership & Internship Pathways",
    description:
      "Support for structured short-term pathways that align students with hospital environments and institutional objectives.",
    image: createPremiumVisual(
      "student-mobility-inner",
      "observership-internship",
      "Observership and internship pathway for medical students.",
    ),
  },
  {
    icon: Building2,
    title: "Institutional Collaboration",
    description:
      "Build links between universities, hospitals, and healthcare groups for mobility and academic-healthcare cooperation.",
    image: createPremiumVisual(
      "student-mobility-inner",
      "institutional-collaboration",
      "University and hospital leaders discussing institutional collaboration.",
    ),
  },
  {
    icon: Stethoscope,
    title: "Healthcare-Focused Mobility Design",
    description:
      "The route is positioned for clinical and healthcare-linked exposure, not mass-market generic student placement.",
    image: createPremiumVisual(
      "student-mobility-inner",
      "healthcare-mobility-design",
      "Healthcare-focused student mobility planning discussion.",
    ),
  },
  {
    icon: Globe2,
    title: "International Coordination",
    description:
      "Support can extend to cross-border communication, scheduling, institutional alignment, and practical movement planning.",
    image: createPremiumVisual(
      "student-mobility-inner",
      "international-coordination",
      "International student mobility coordination for healthcare institutions.",
    ),
  },
  {
    icon: BadgeCheck,
    title: "Documentation & Readiness",
    description:
      "Documents, goals, and collaboration expectations can be structured more carefully before the mobility experience begins.",
    image: createPremiumVisual(
      "student-mobility-inner",
      "documentation-readiness",
      "Documentation review and readiness planning for student mobility.",
    ),
  },
];

const faqItems = [
  {
    question: "Is student mobility here positioned as a clinical and institutional route?",
    answer:
      "Yes. The page is focused on clinical exposure, observerships, internships, and institutional healthcare collaboration rather than consumer-style generic education marketing.",
  },
  {
    question: "Can universities and hospitals both use this page?",
    answer:
      "Yes. The route supports conversations with universities, training institutions, hospitals, and healthcare organizations involved in mobility or clinical exposure programs.",
  },
  {
    question: "Does the page support short-term observership discussions?",
    answer:
      "Yes. Observerships, hospital visits, and short-term clinical exposure pathways are part of the intended positioning.",
  },
  {
    question: "Can institutional partners discuss faculty or exchange opportunities?",
    answer:
      "Yes. The broader collaboration model can include faculty exchange, institutional cooperation, and healthcare-linked academic dialogue.",
  },
];

export default function StudentMobilityPage({
  searchParams,
}: StudentMobilityPageProps) {
  return (
    <>
      <JsonLd
        data={[
          createWebPageSchema({
            name: "Student Mobility",
            description:
              "MedPobeda Group supports student mobility, clinical exposure, and institutional collaboration in healthcare settings.",
            path: "/student-mobility",
          }),
          createServiceSchema({
            name: "Student Mobility and Clinical Exposure",
            description:
              "Healthcare-linked mobility support for institutions, students, and clinical collaboration partners.",
            path: "/student-mobility",
          }),
          createBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Student Mobility", path: "/student-mobility" },
          ]),
        ]}
      />

      <PremiumPageHero
        eyebrow="Student Mobility"
        title="Clinical exposure and institutional mobility designed for healthcare collaboration"
        description="MedPobeda Group supports student mobility through healthcare-focused observerships, hospital visits, clinical exposure opportunities, and institutional collaboration between academic and medical partners."
        highlights={["Student Mobility", "Clinical Exposure", "Institutional Collaboration"]}
        primaryCta={{ href: "#student-mobility-form", label: "Discuss Mobility Support" }}
        secondaryCta={{ href: "/about", label: "About MedPobeda Group" }}
        images={[
          createPremiumVisual(
            "student-mobility-hero",
            "hospital-student-rounds",
            "Medical students in clinical rounds at a premium hospital.",
          ),
          createPremiumVisual(
            "student-mobility-hero",
            "institutional-advising",
            "Institutional advising and student mobility planning discussion.",
          ),
          createPremiumVisual(
            "student-mobility-hero",
            "healthcare-campus",
            "Healthcare campus and hospital environment for international mobility.",
          ),
        ]}
        stats={[
          { value: "Healthcare-linked", label: "mobility focus built around clinical and institutional relevance" },
          { value: "Observership-ready", label: "support for hospital visits and exposure pathways" },
          { value: "Cross-border", label: "coordination between institutions, hospitals, and students" },
        ]}
        floatingCards={[
          "Clinical Exposure",
          "Observerships",
          "Institutional Exchange",
          "Hospital Visits",
        ]}
        accentLabel="Clinical Exposure Bridge"
      />

      <PremiumImageStorySection
        eyebrow="Mobility Positioning"
        title="A premium student mobility route aligned with hospitals, institutions, and healthcare professionalism"
        description="The page is intentionally positioned around medical and healthcare collaboration, not mass-market educational promotion."
        body={[
          "MedPobeda Group uses this route to support clinically relevant mobility conversations: observerships, exposure visits, institutional exchanges, and other healthcare-linked opportunities.",
          "That positioning matters because the audience often includes hospitals, universities, program leads, and students who expect a more serious, healthcare-aware interface and communication style.",
        ]}
        badges={[
          "Clinical Exposure",
          "Hospital Visits",
          "Observerships",
          "Institutional Cooperation",
          "Healthcare Mobility",
        ]}
        images={[
          createPremiumVisual(
            "student-mobility-story",
            "student-hospital-visit",
            "Student hospital visit and guided clinical exposure.",
          ),
          createPremiumVisual(
            "student-mobility-story",
            "faculty-collaboration",
            "Faculty and institutional collaboration in healthcare education.",
          ),
          createPremiumVisual(
            "student-mobility-story",
            "documentation-review",
            "Documentation review and mobility readiness planning.",
          ),
          createPremiumVisual(
            "student-mobility-story",
            "international-welcome",
            "International welcome for healthcare mobility participants.",
          ),
        ]}
      />

      <PremiumFeatureCardsSection
        eyebrow="Mobility Services"
        title="Program elements designed for clinical learning environments and institutional trust"
        description="These cards focus on healthcare-linked mobility experiences rather than generic student marketing language."
        items={mobilityItems}
        columns={3}
      />

      <PremiumSplitTrustSection
        eyebrow="Why This Mobility Route Is Different"
        title="A more credible presentation for hospitals, institutions, and healthcare-focused participants"
        description="The route emphasizes professional process, clinical context, and institutional collaboration so it can support more serious conversations."
        image={createPremiumVisual(
          "student-mobility-trust",
          "institutional-healthcare-briefing",
          "Institutional healthcare briefing for student mobility and clinical collaboration.",
        )}
        items={[
          {
            icon: ShieldCheck,
            title: "Professional Communication",
            description:
              "The page is framed for institutions and healthcare stakeholders, not broad consumer recruitment.",
          },
          {
            icon: Hospital,
            title: "Clinical Context",
            description:
              "The mobility model is oriented toward hospitals, clinics, and healthcare-linked exposure opportunities.",
          },
          {
            icon: Users,
            title: "Institutional Partnership Logic",
            description:
              "Stronger outcomes come from coordination between hospitals, universities, and supervising teams.",
          },
          {
            icon: Globe2,
            title: "Cross-Border Coordination",
            description:
              "International communication, scheduling, and expectations can be handled in a more organized way.",
          },
        ]}
        stats={[
          {
            label: "Mobility Lens",
            value: "Clinical & institutional",
            description: "Focused on real healthcare collaboration pathways rather than generic program promotion.",
          },
          {
            label: "Best Use Cases",
            value: "Observerships to exchange",
            description: "Suitable for hospital exposure, academic-healthcare dialogue, and short-term structured experiences.",
          },
        ]}
      />

      <PremiumStepsSection
        eyebrow="Mobility Workflow"
        title="How a student mobility or clinical exposure conversation can progress"
        description="This structure helps institutions and participants move from exploratory inquiry to a more defined collaboration plan."
        items={[
          {
            icon: GraduationCap,
            title: "Initial Inquiry",
            description: "A student, institution, or partner outlines the clinical or mobility objective.",
          },
          {
            icon: Users,
            title: "Institutional Alignment",
            description: "Relevant academic, administrative, or hospital stakeholders are identified.",
          },
          {
            icon: Hospital,
            title: "Clinical Exposure Fit",
            description: "Potential observership, hospital visit, or healthcare exposure options are discussed.",
          },
          {
            icon: BadgeCheck,
            title: "Documentation Readiness",
            description: "Supporting documents and planning details are organized more professionally.",
          },
          {
            icon: Building2,
            title: "Program Structuring",
            description: "Timing, institutional requirements, and participant expectations are clarified.",
          },
          {
            icon: Globe2,
            title: "Coordination & Follow-Through",
            description: "Cross-border communication and next steps continue through the mobility process.",
          },
        ]}
      />

      <section id="student-mobility-form" className="section-shell">
        <div className="container-wide">
          <SectionHeader
            eyebrow="Mobility Inquiry"
            title="Start a student mobility or clinical exposure discussion"
            description="This form feeds the existing inquiry workflow and is suitable for institutional partners, mobility coordinators, and healthcare-focused applicants."
            align="center"
          />
          <div className="mt-12">
            <RouteAwareContactInquiryFunnel
              variant="student-mobility"
              honeypotField={env.SPAM_HONEYPOT_FIELD}
              submittedType={searchParams?.submitted}
              hasError={searchParams?.error === "validation"}
            />
          </div>
        </div>
      </section>

      <FAQAccordion
        eyebrow="Mobility FAQ"
        title="Questions about clinical exposure, observerships, and institutional mobility"
        description="These answers explain the positioning and practical use of the student mobility route."
        items={faqItems}
      />

      <PremiumCtaBanner
        eyebrow="Mobility CTA"
        title="Discuss a healthcare-focused mobility pathway with MedPobeda Group"
        description="Whether you represent an institution, hospital, or participant, the next conversation can begin through a more premium and professionally structured route."
        image={createPremiumVisual(
          "student-mobility-cta",
          "clinical-observership-discussion",
          "Clinical observership discussion and healthcare-focused student mobility planning.",
        )}
        primary={{ href: "/contact", label: "Contact Our Team" }}
        secondary={{ href: "/hospital-partnerships", label: "Explore Partnerships" }}
      />
    </>
  );
}
