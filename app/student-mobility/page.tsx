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
import { getMessages } from "@/lib/i18n";
import { getRequestLocale } from "@/lib/i18n/request";
import { createMetadata } from "@/lib/metadata";
import { createPremiumVisual } from "@/lib/premium-visuals";
import {
  createBreadcrumbSchema,
  createServiceSchema,
  createWebPageSchema,
} from "@/lib/schema";

export function generateMetadata() {
  const locale = getRequestLocale();
  const messages = getMessages(locale);
  return createMetadata({
    title: messages.routes["student-mobility"].title,
    description: messages.routes["student-mobility"].description,
    path: "/student-mobility",
    locale,
    keywords: messages.routes["student-mobility"].keywords,
    ogTitle: messages.routes["student-mobility"].openGraphTitle,
    ogDescription: messages.routes["student-mobility"].openGraphDescription,
  });
}

type StudentMobilityPageProps = {
  searchParams?: {
    submitted?: string;
    error?: string;
  };
};

export default function StudentMobilityPage({
  searchParams,
}: StudentMobilityPageProps) {
  const locale = getRequestLocale();
  const messages = getMessages(locale);
  const page = messages.pages.studentMobility;
  const mobilityItems: PremiumFeatureCardItem[] = page.services.items.map((item, index) => ({
    ...item,
    icon: [Hospital, GraduationCap, Building2, Stethoscope, Globe2, BadgeCheck][index] ?? Hospital,
    image: createPremiumVisual(
      "student-mobility-inner",
      [
        "clinical-exposure",
        "observership-internship",
        "institutional-collaboration",
        "healthcare-mobility-design",
        "international-coordination",
        "documentation-readiness",
      ][index] ?? "clinical-exposure",
      item.title,
    ),
  }));

  return (
    <>
      <JsonLd
        data={[
          createWebPageSchema({
            name: page.schemaName,
            description: page.schemaDescription,
            path: "/student-mobility",
            locale,
          }),
          createServiceSchema({
            name: page.serviceSchemaName,
            description: page.serviceSchemaDescription,
            path: "/student-mobility",
            locale,
          }),
          createBreadcrumbSchema([
            { name: messages.chrome.navigation.home, path: "/" },
            { name: messages.chrome.navigation.studentMobility, path: "/student-mobility" },
          ], locale),
        ]}
      />

      <PremiumPageHero
        eyebrow={page.hero.eyebrow}
        title={page.hero.title}
        description={page.hero.description}
        highlights={page.hero.highlights}
        primaryCta={{ href: "#student-mobility-form", label: page.hero.primaryCta }}
        secondaryCta={{ href: "/about", label: page.hero.secondaryCta }}
        images={[
          createPremiumVisual(
            "student-mobility-hero",
            "hospital-student-rounds",
            page.hero.imageAlts[0],
          ),
          createPremiumVisual(
            "student-mobility-hero",
            "institutional-advising",
            page.hero.imageAlts[1],
          ),
          createPremiumVisual(
            "student-mobility-hero",
            "healthcare-campus",
            page.hero.imageAlts[2],
          ),
        ]}
        stats={page.hero.stats}
        floatingCards={page.hero.floatingCards}
        accentLabel={page.hero.accentLabel}
      />

      <PremiumImageStorySection
        eyebrow={page.story.eyebrow}
        title={page.story.title}
        description={page.story.description}
        body={page.story.body}
        badges={page.story.badges}
        images={[
          createPremiumVisual(
            "student-mobility-story",
            "student-hospital-visit",
            page.story.imageAlts[0],
          ),
          createPremiumVisual(
            "student-mobility-story",
            "faculty-collaboration",
            page.story.imageAlts[1],
          ),
          createPremiumVisual(
            "student-mobility-story",
            "documentation-review",
            page.story.imageAlts[2],
          ),
          createPremiumVisual(
            "student-mobility-story",
            "international-welcome",
            page.story.imageAlts[3],
          ),
        ]}
      />

      <PremiumFeatureCardsSection
        eyebrow={page.services.eyebrow}
        title={page.services.title}
        description={page.services.description}
        items={mobilityItems}
        columns={3}
      />

      <PremiumSplitTrustSection
        eyebrow={page.trust.eyebrow}
        title={page.trust.title}
        description={page.trust.description}
        image={createPremiumVisual(
          "student-mobility-trust",
          "institutional-healthcare-briefing",
          page.trust.imageAlt,
        )}
        items={page.trust.items.map((item, index) => ({
          ...item,
          icon: [ShieldCheck, Hospital, Users, Globe2][index] ?? ShieldCheck,
        }))}
        stats={page.trust.stats}
      />

      <PremiumStepsSection
        eyebrow={page.workflow.eyebrow}
        title={page.workflow.title}
        description={page.workflow.description}
        items={page.workflow.items.map((item, index) => ({
          ...item,
          icon: [GraduationCap, Users, Hospital, BadgeCheck, Building2, Globe2][index] ?? GraduationCap,
        }))}
      />

      <section id="student-mobility-form" className="section-shell">
        <div className="container-wide">
          <SectionHeader
            eyebrow={page.inquiry.eyebrow}
            title={page.inquiry.title}
            description={page.inquiry.description}
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
        eyebrow={page.faq.eyebrow}
        title={page.faq.title}
        description={page.faq.description}
        items={page.faq.items}
      />

      <PremiumCtaBanner
        eyebrow={page.cta.eyebrow}
        title={page.cta.title}
        description={page.cta.description}
        image={createPremiumVisual(
          "student-mobility-cta",
          "clinical-observership-discussion",
          page.cta.imageAlt,
        )}
        primary={{ href: "/contact", label: page.cta.primary }}
        secondary={{ href: "/hospital-partnerships", label: page.cta.secondary }}
      />
    </>
  );
}
