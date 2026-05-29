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
    title: messages.routes["hospital-partnerships"].title,
    description: messages.routes["hospital-partnerships"].description,
    path: "/hospital-partnerships",
    locale,
    keywords: messages.routes["hospital-partnerships"].keywords,
    ogTitle: messages.routes["hospital-partnerships"].openGraphTitle,
    ogDescription: messages.routes["hospital-partnerships"].openGraphDescription,
  });
}

type HospitalPartnershipsPageProps = {
  searchParams?: {
    submitted?: string;
    error?: string;
  };
};

export default function HospitalPartnershipsPage({
  searchParams,
}: HospitalPartnershipsPageProps) {
  const locale = getRequestLocale();
  const messages = getMessages(locale);
  const page = messages.pages.hospitalPartnerships;
  const partnershipItems: PremiumFeatureCardItem[] = page.collaborationAreas.items.map(
    (item, index) => ({
      ...item,
      icon: [Users, BriefcaseMedical, Stethoscope, GraduationCap, Microscope, BadgeCheck][index] ?? Users,
      image: createPremiumVisual(
        "partnerships-inner",
        [
          "international-referrals",
          "medical-tourism-desk",
          "doctor-faculty-exchange",
          "clinical-training-programs",
          "research-conferences",
          "hospital-branding-abroad",
        ][index] ?? "international-referrals",
        item.title,
      ),
    }),
  );

  return (
    <>
      <JsonLd
        data={[
          createWebPageSchema({
            name: page.schemaName,
            description: page.schemaDescription,
            path: "/hospital-partnerships",
            locale,
          }),
          createServiceSchema({
            name: page.serviceSchemaName,
            description: page.serviceSchemaDescription,
            path: "/hospital-partnerships",
            locale,
          }),
          createBreadcrumbSchema([
            { name: messages.chrome.navigation.home, path: "/" },
            { name: messages.chrome.navigation.partnerships, path: "/hospital-partnerships" },
          ], locale),
        ]}
      />

      <PremiumPageHero
        eyebrow={page.hero.eyebrow}
        title={page.hero.title}
        description={page.hero.description}
        highlights={page.hero.highlights}
        primaryCta={{ href: "#partnership-inquiry", label: page.hero.primaryCta }}
        secondaryCta={{ href: "/hospitals", label: page.hero.secondaryCta }}
        images={[
          createPremiumVisual(
            "partnerships-hero",
            "executive-partnership-meeting",
            page.hero.imageAlts[0],
          ),
          createPremiumVisual(
            "partnerships-hero",
            "premium-hospital-building",
            page.hero.imageAlts[1],
          ),
          createPremiumVisual(
            "partnerships-hero",
            "doctor-collaboration-roundtable",
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
            "partnerships-story",
            "hospital-boardroom",
            page.story.imageAlts[0],
          ),
          createPremiumVisual(
            "partnerships-story",
            "international-desk-team",
            page.story.imageAlts[1],
          ),
          createPremiumVisual(
            "partnerships-story",
            "healthcare-delegation",
            page.story.imageAlts[2],
          ),
          createPremiumVisual(
            "partnerships-story",
            "conference-handshake",
            page.story.imageAlts[3],
          ),
        ]}
      />

      <PremiumFeatureCardsSection
        eyebrow={page.collaborationAreas.eyebrow}
        title={page.collaborationAreas.title}
        description={page.collaborationAreas.description}
        items={partnershipItems}
        columns={3}
      />

      <PremiumSplitTrustSection
        eyebrow={page.trust.eyebrow}
        title={page.trust.title}
        description={page.trust.description}
        image={createPremiumVisual(
          "partnerships-trust",
          "hospital-leadership-briefing",
          page.trust.imageAlt,
        )}
        items={page.trust.items.map((item, index) => ({
          ...item,
          icon: [ShieldCheck, Globe2, Hospital, Handshake][index] ?? ShieldCheck,
        }))}
        stats={page.trust.stats}
      />

      <PremiumStepsSection
        eyebrow={page.workflow.eyebrow}
        title={page.workflow.title}
        description={page.workflow.description}
        items={page.workflow.items.map((item, index) => ({
          ...item,
          icon: [Building2, Users, Handshake, Hospital, Stethoscope, BadgeCheck][index] ?? Building2,
        }))}
      />

      <section id="partnership-inquiry" className="section-shell">
        <div className="container-wide">
          <SectionHeader
            eyebrow={page.inquiry.eyebrow}
            title={page.inquiry.title}
            description={page.inquiry.description}
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
          "partnerships-cta",
          "hospital-growth-conversation",
          page.cta.imageAlt,
        )}
        primary={{ href: "/contact", label: page.cta.primary }}
        secondary={{
          href: "/international-patient-care",
          label: messages.ctas.viewMedicalTourism,
        }}
      />
    </>
  );
}
