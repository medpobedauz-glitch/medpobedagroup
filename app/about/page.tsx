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
import { getMessages } from "@/lib/i18n";
import { getRequestLocale } from "@/lib/i18n/request";
import { createMetadata } from "@/lib/metadata";
import { createPremiumVisual } from "@/lib/premium-visuals";
import {
  createBreadcrumbSchema,
  createWebPageSchema,
} from "@/lib/schema";

export function generateMetadata() {
  const locale = getRequestLocale();
  const messages = getMessages(locale);
  return createMetadata({
    title: messages.routes.about.title,
    description: messages.routes.about.description,
    path: "/about",
    locale,
    keywords: messages.routes.about.keywords,
    ogTitle: messages.routes.about.openGraphTitle,
    ogDescription: messages.routes.about.openGraphDescription,
  });
}

export default function AboutPage() {
  const locale = getRequestLocale();
  const messages = getMessages(locale);
  const page = messages.pages.about;
  const pillarIcons = [
    Globe2,
    HeartHandshake,
    Hospital,
    Users,
    ShieldCheck,
    Stethoscope,
  ] as const;
  const pillarSlugs = [
    "healthcare-bridge",
    "patient-facilitation",
    "hospital-collaboration",
    "institutional-cooperation",
    "trust-led-communication",
    "clinical-relevance",
  ] as const;
  const pillarItems: PremiumFeatureCardItem[] = page.pillars.items.map((item, index) => ({
    ...item,
    icon: pillarIcons[index] ?? Globe2,
    image: createPremiumVisual(
      "about-inner",
      pillarSlugs[index] ?? "healthcare-bridge",
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
            path: "/about",
            type: "AboutPage",
            locale,
          }),
          createBreadcrumbSchema([
            { name: messages.chrome.navigation.home, path: "/" },
            { name: messages.chrome.navigation.about, path: "/about" },
          ], locale),
        ]}
      />

      <PremiumPageHero
        eyebrow={page.hero.eyebrow}
        title={page.hero.title}
        description={page.hero.description}
        highlights={page.hero.highlights}
        primaryCta={{ href: "/contact", label: page.hero.primaryCta }}
        secondaryCta={{ href: "/hospital-partnerships", label: page.hero.secondaryCta }}
        images={[
          createPremiumVisual(
            "about-hero",
            "leadership-meeting",
            page.hero.imageAlts[0],
          ),
          createPremiumVisual(
            "about-hero",
            "hospital-network-visual",
            page.hero.imageAlts[1],
          ),
          createPremiumVisual(
            "about-hero",
            "patient-coordination-desk",
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
            "about-story",
            "executive-hospital-conversation",
            page.story.imageAlts[0],
          ),
          createPremiumVisual(
            "about-story",
            "patient-family-support",
            page.story.imageAlts[1],
          ),
          createPremiumVisual(
            "about-story",
            "doctor-strategy-meeting",
            page.story.imageAlts[2],
          ),
          createPremiumVisual(
            "about-story",
            "clinical-networking",
            page.story.imageAlts[3],
          ),
        ]}
      />

      <PremiumFeatureCardsSection
        eyebrow={page.pillars.eyebrow}
        title={page.pillars.title}
        description={page.pillars.description}
        items={pillarItems}
        columns={3}
      />

      <PremiumSplitTrustSection
        eyebrow={page.trust.eyebrow}
        title={page.trust.title}
        description={page.trust.description}
        image={createPremiumVisual(
          "about-trust",
          "healthcare-operations-overview",
          page.trust.imageAlt,
        )}
        items={page.trust.items.map((item, index) => ({
          ...item,
          icon: [ShieldCheck, Handshake, Building2, Globe2][index] ?? ShieldCheck,
        }))}
        stats={page.trust.stats}
      />

      <PremiumStepsSection
        eyebrow={page.principles.eyebrow}
        title={page.principles.title}
        description={page.principles.description}
        items={page.principles.items.map((item, index) => ({
          ...item,
          icon: [Users, Building2, Hospital, Globe2, HeartHandshake, ShieldCheck][index] ?? Users,
        }))}
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
          "about-cta",
          "international-healthcare-conversation",
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
