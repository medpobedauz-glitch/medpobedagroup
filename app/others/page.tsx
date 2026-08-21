import {
  BookOpen,
  Building2,
  CircleHelp,
  Globe2,
  Newspaper,
  ShieldCheck,
  Users,
  Wallet,
} from "lucide-react";

import { FAQAccordion } from "@/components/shared/faq-accordion";
import { JsonLd } from "@/components/shared/json-ld";
import { PremiumCtaBanner } from "@/components/marketing/premium-cta-banner";
import {
  PremiumFeatureCardsSection,
  type PremiumFeatureCardItem,
} from "@/components/marketing/premium-feature-cards-section";
import { PremiumPageHero } from "@/components/marketing/premium-page-hero";
import { getMessages } from "@/lib/i18n";
import { getRequestLocale } from "@/lib/i18n/request";
import { createMetadata } from "@/lib/metadata";
import { createPremiumVisual } from "@/lib/premium-visuals";
import { createBreadcrumbSchema, createWebPageSchema } from "@/lib/schema";

export function generateMetadata() {
  const locale = getRequestLocale();
  const messages = getMessages(locale);
  return createMetadata({
    title: messages.routes.others.title,
    description: messages.routes.others.description,
    path: "/others",
    locale,
    keywords: messages.routes.others.keywords,
    ogTitle: messages.routes.others.openGraphTitle,
    ogDescription: messages.routes.others.openGraphDescription,
  });
}

export default function OthersPage() {
  const locale = getRequestLocale();
  const messages = getMessages(locale);
  const page = messages.pages.others;
  const resourceHrefs = [
    "/faq",
    "/cost-guide",
    "/success-stories",
    "/why-india",
    "/team",
    "/blog",
    "/press",
    "/company-profile",
  ] as const;
  const resourceIcons = [
    CircleHelp,
    Wallet,
    ShieldCheck,
    Globe2,
    Users,
    BookOpen,
    Newspaper,
    Building2,
  ] as const;
  const resourceSlugs = [
    "family-consultation",
    "uzbekistan-healthcare-bridge",
    "patient-family-support",
    "india-specialist-access",
    "leadership-meeting",
    "conference-networking",
    "hospital-lobby",
    "executive-partnership-meeting",
  ] as const;

  const resourceItems: PremiumFeatureCardItem[] = page.resources.items.map((item, index) => ({
    ...item,
    href: resourceHrefs[index],
    icon: resourceIcons[index] ?? CircleHelp,
    image: createPremiumVisual(
      "gallery",
      resourceSlugs[index] ?? "uzbekistan-healthcare-bridge",
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
            path: "/others",
            locale,
          }),
          createBreadcrumbSchema(
            [
              { name: messages.chrome.navigation.home, path: "/" },
              { name: messages.chrome.navigation.others, path: "/others" },
            ],
            locale,
          ),
        ]}
      />

      <PremiumPageHero
        eyebrow={page.hero.eyebrow}
        title={page.hero.title}
        description={page.hero.description}
        highlights={page.hero.highlights}
        primaryCta={{ href: "/contact", label: page.hero.primaryCta }}
        secondaryCta={{ href: "/about", label: page.hero.secondaryCta }}
        images={[
          createPremiumVisual("about-hero", "leadership-meeting", page.hero.imageAlts[0]),
          createPremiumVisual("gallery", "uzbekistan-healthcare-bridge", page.hero.imageAlts[1]),
          createPremiumVisual("contact-hero", "international-support", page.hero.imageAlts[2]),
        ]}
        stats={page.hero.stats}
        floatingCards={page.hero.floatingCards}
        accentLabel={page.hero.accentLabel}
      />

      <PremiumFeatureCardsSection
        eyebrow={page.resources.eyebrow}
        title={page.resources.title}
        description={page.resources.description}
        items={resourceItems}
        columns={4}
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
        secondary={{ href: "/", label: page.cta.secondary }}
      />
    </>
  );
}
