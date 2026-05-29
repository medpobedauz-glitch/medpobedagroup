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
    title: messages.routes["international-patients"].title,
    description: messages.routes["international-patients"].description,
    path: "/international-patients",
    locale,
    keywords: messages.routes["international-patients"].keywords,
    ogTitle: messages.routes["international-patients"].openGraphTitle,
    ogDescription: messages.routes["international-patients"].openGraphDescription,
  });
}

type InternationalPatientsPageProps = {
  searchParams?: {
    submitted?: string;
    error?: string;
  };
};

export default function InternationalPatientsPage({
  searchParams,
}: InternationalPatientsPageProps) {
  const locale = getRequestLocale();
  const messages = getMessages(locale);
  const page = messages.pages.internationalPatients;
  const supportItems: PremiumFeatureCardItem[] = page.supportAreas.items.map((item, index) => ({
    ...item,
    icon: [ShieldCheck, Hospital, Stethoscope, Plane, Languages, CheckCircle2][index] ?? ShieldCheck,
    image: createPremiumVisual(
      "international-patients-inner",
      [
        "treatment-guidance",
        "hospital-appointment-support",
        "doctor-selection",
        "travel-stay-support",
        "language-assistance",
        "follow-up-coordination",
      ][index] ?? "treatment-guidance",
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
            path: "/international-patients",
            locale,
          }),
          createServiceSchema({
            name: page.serviceSchemaName,
            description: page.serviceSchemaDescription,
            path: "/international-patients",
            locale,
          }),
          createBreadcrumbSchema([
            { name: messages.chrome.navigation.home, path: "/" },
            { name: messages.chrome.navigation.internationalPatients, path: "/international-patients" },
          ], locale),
        ]}
      />

      <PremiumPageHero
        eyebrow={page.hero.eyebrow}
        title={page.hero.title}
        description={page.hero.description}
        highlights={page.hero.highlights}
        primaryCta={{ href: "#patient-assistance-form", label: page.hero.primaryCta }}
        secondaryCta={{
          href: "/international-patient-care",
          label: messages.ctas.exploreMedicalTourism,
        }}
        images={[
          createPremiumVisual(
            "international-patients-hero",
            "caring-doctor-patient",
            page.hero.imageAlts[0],
          ),
          createPremiumVisual(
            "international-patients-hero",
            "patient-coordinator",
            page.hero.imageAlts[1],
          ),
          createPremiumVisual(
            "international-patients-hero",
            "family-reassurance",
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
            "international-patients-story",
            "patient-consultation-room",
            page.story.imageAlts[0],
          ),
          createPremiumVisual(
            "international-patients-story",
            "family-guidance-desk",
            page.story.imageAlts[1],
          ),
          createPremiumVisual(
            "international-patients-story",
            "hospital-corridor-assistance",
            page.story.imageAlts[2],
          ),
          createPremiumVisual(
            "international-patients-story",
            "airport-arrival-support",
            page.story.imageAlts[3],
          ),
        ]}
      />

      <PremiumFeatureCardsSection
        eyebrow={page.supportAreas.eyebrow}
        title={page.supportAreas.title}
        description={page.supportAreas.description}
        items={supportItems}
        columns={3}
      />

      <PremiumSplitTrustSection
        eyebrow={page.trust.eyebrow}
        title={page.trust.title}
        description={page.trust.description}
        image={createPremiumVisual(
          "international-patients-trust",
          "patient-support-meeting",
          page.trust.imageAlt,
        )}
        items={page.trust.items.map((item, index) => ({
          ...item,
          icon: [HeartHandshake, Globe2, ShieldCheck, Users][index] ?? HeartHandshake,
        }))}
        stats={page.trust.stats}
      />

      <PremiumStepsSection
        eyebrow={page.supportFlow.eyebrow}
        title={page.supportFlow.title}
        description={page.supportFlow.description}
        items={page.supportFlow.items.map((item, index) => ({
          ...item,
          icon: [UserRound, Hospital, Stethoscope, Plane, Languages, MapPin, HeartHandshake, CheckCircle2][index] ?? UserRound,
        }))}
      />

      <section id="patient-assistance-form" className="section-shell">
        <div className="container-wide">
          <SectionHeader
            eyebrow={page.inquiry.eyebrow}
            title={page.inquiry.title}
            description={page.inquiry.description}
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
          "international-patients-cta",
          "patient-family-support",
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
