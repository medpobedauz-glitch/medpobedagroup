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
import { getMessages } from "@/lib/i18n";
import { getRequestLocale } from "@/lib/i18n/request";
import { createMetadata } from "@/lib/metadata";
import { createPremiumVisual } from "@/lib/premium-visuals";
import {
  createBreadcrumbSchema,
  createWebPageSchema,
} from "@/lib/schema";
import { env } from "@/lib/env";

export function generateMetadata() {
  const locale = getRequestLocale();
  const messages = getMessages(locale);
  return createMetadata({
    title: messages.routes.contact.title,
    description: messages.routes.contact.description,
    path: "/contact",
    locale,
    keywords: messages.routes.contact.keywords,
    ogTitle: messages.routes.contact.openGraphTitle,
    ogDescription: messages.routes.contact.openGraphDescription,
  });
}

type ContactPageProps = {
  searchParams?: {
    submitted?: string;
    error?: string;
  };
};

export default function ContactPage({ searchParams }: ContactPageProps) {
  const locale = getRequestLocale();
  const messages = getMessages(locale);
  const page = messages.pages.contact;
  const contactItems: PremiumFeatureCardItem[] = page.routes.items.map((item, index) => ({
    ...item,
    icon: [Handshake, HeartHandshake, GraduationCap, Stethoscope][index] ?? Handshake,
    image: createPremiumVisual(
      "contact-inner",
      [
        "hospital-partnership-discussion",
        "patient-support-request",
        "student-mobility-contact",
        "doctor-collaboration-contact",
      ][index] ?? "hospital-partnership-discussion",
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
            path: "/contact",
            type: "ContactPage",
            locale,
          }),
          createBreadcrumbSchema([
            { name: messages.chrome.navigation.home, path: "/" },
            { name: messages.chrome.navigation.contact, path: "/contact" },
          ], locale),
        ]}
      />

      <PremiumPageHero
        eyebrow={page.hero.eyebrow}
        title={page.hero.title}
        description={page.hero.description}
        highlights={page.hero.highlights}
        primaryCta={{ href: "#contact-section", label: page.hero.primaryCta }}
        secondaryCta={{ href: "/hospital-partnerships", label: page.hero.secondaryCta }}
        images={[
          createPremiumVisual(
            "contact-hero",
            "premium-contact-desk",
            page.hero.imageAlts[0],
          ),
          createPremiumVisual(
            "contact-hero",
            "consultation-meeting",
            page.hero.imageAlts[1],
          ),
          createPremiumVisual(
            "contact-hero",
            "international-support",
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
            "contact-story",
            "patient-inquiry-support",
            page.story.imageAlts[0],
          ),
          createPremiumVisual(
            "contact-story",
            "hospital-leadership-contact",
            page.story.imageAlts[1],
          ),
          createPremiumVisual(
            "contact-story",
            "care-coordinator-workspace",
            page.story.imageAlts[2],
          ),
          createPremiumVisual(
            "contact-story",
            "institutional-briefing-call",
            page.story.imageAlts[3],
          ),
        ]}
      />

      <PremiumFeatureCardsSection
        eyebrow={page.routes.eyebrow}
        title={page.routes.title}
        description={page.routes.description}
        items={contactItems}
        columns={2}
      />

      <PremiumSplitTrustSection
        eyebrow={page.trust.eyebrow}
        title={page.trust.title}
        description={page.trust.description}
        image={createPremiumVisual(
          "contact-trust",
          "tashkent-coordination-base",
          page.trust.imageAlt,
        )}
        items={page.trust.items.map((item, index) => ({
          ...item,
          icon: [ShieldCheck, MessageCircle, Globe2, Users][index] ?? ShieldCheck,
        }))}
        stats={page.trust.stats}
      />

      <HomeContactSection
        honeypotField={env.SPAM_HONEYPOT_FIELD}
        submittedType={searchParams?.submitted}
        hasError={searchParams?.error === "validation"}
      />

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
          "contact-cta",
          "healthcare-guidance-conversation",
          page.cta.imageAlt,
        )}
        primary={{ href: "#contact-section", label: page.cta.primary }}
        secondary={{
          href: "/international-patient-care",
          label: messages.ctas.viewMedicalTourism,
        }}
      />
    </>
  );
}
