import {
  Building2,
  ClipboardList,
  Globe2,
  Handshake,
  HeartHandshake,
  Hospital,
  PhoneCall,
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
import { createBreadcrumbSchema, createFaqSchema, createWebPageSchema } from "@/lib/schema";
import { siteConfig } from "@/lib/site";

export function generateMetadata() {
  const locale = getRequestLocale();
  const messages = getMessages(locale);
  return createMetadata({
    title: messages.routes["company-profile"].title,
    description: messages.routes["company-profile"].description,
    path: "/company-profile",
    locale,
    keywords: messages.routes["company-profile"].keywords,
    ogTitle: messages.routes["company-profile"].openGraphTitle,
    ogDescription: messages.routes["company-profile"].openGraphDescription,
  });
}

export default function CompanyProfilePage() {
  const locale = getRequestLocale();
  const messages = getMessages(locale);
  const page = messages.pages.companyProfile;

  const scopeItems: PremiumFeatureCardItem[] = page.scope.items.map((item, index) => ({
    ...item,
    href: [
      "/international-patient-care",
      "/treatment-in-india",
      "/hospital-partnerships",
      "/international-patients",
      "/student-mobility",
      "/contact",
    ][index],
    title: index === 0 ? messages.chrome.navigation.medicalTourism : item.title,
    icon:
      [Globe2, Stethoscope, Hospital, HeartHandshake, Users, PhoneCall][index] ?? Globe2,
    image: createPremiumVisual(
      "about-inner",
      [
        "healthcare-bridge",
        "clinical-relevance",
        "hospital-collaboration",
        "patient-facilitation",
        "institutional-cooperation",
        "trust-led-communication",
      ][index] ?? "healthcare-bridge",
      item.title,
    ),
  }));

  const operatingStats = [
    {
      label: page.operatingModel.stats[0].label,
      value: "MCHJ",
      description: `${page.operatingModel.stats[0].description} ${siteConfig.legalName}.`,
    },
    {
      label: page.operatingModel.stats[1].label,
      value: "Tashkent",
      description: `${page.operatingModel.stats[1].description} ${siteConfig.location}.`,
    },
    {
      label: page.operatingModel.stats[2].label,
      value: "Direct",
      description: `${page.operatingModel.stats[2].description} ${siteConfig.contactPhone}.`,
    },
    {
      label: page.operatingModel.stats[3].label,
      value: "Official",
      description: `${page.operatingModel.stats[3].description} ${siteConfig.website}.`,
    },
  ];

  return (
    <>
      <JsonLd
        data={[
          createWebPageSchema({
            name: page.schemaName,
            description: page.schemaDescription,
            path: "/company-profile",
            type: "AboutPage",
            locale,
          }),
          createBreadcrumbSchema(
            [
              { name: messages.chrome.navigation.home, path: "/" },
              {
                name: messages.chrome.navigation.companyProfile,
                path: "/company-profile",
              },
            ],
            locale,
          ),
          createFaqSchema(page.faq.items),
        ]}
      />

      <PremiumPageHero
        eyebrow={page.hero.eyebrow}
        title={page.hero.title}
        description={page.hero.description}
        highlights={page.hero.highlights}
        primaryCta={{ href: "/contact", label: page.hero.primaryCta }}
        secondaryCta={{
          href: "/international-patient-care",
          label: messages.ctas.exploreMedicalTourism,
        }}
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
        eyebrow={page.scope.eyebrow}
        title={page.scope.title}
        description={page.scope.description}
        items={scopeItems}
        columns={3}
      />

      <PremiumSplitTrustSection
        eyebrow={page.operatingModel.eyebrow}
        title={page.operatingModel.title}
        description={page.operatingModel.description}
        image={createPremiumVisual(
          "about-trust",
          "healthcare-operations-overview",
          page.operatingModel.imageAlt,
        )}
        items={page.operatingModel.items.map((item, index) => ({
          ...item,
          icon: [ShieldCheck, Handshake, Building2, ClipboardList][index] ?? ShieldCheck,
        }))}
        stats={operatingStats}
      />

      <PremiumStepsSection
        eyebrow={page.engagement.eyebrow}
        title={page.engagement.title}
        description={page.engagement.description}
        items={page.engagement.items.map((item, index) => ({
          ...item,
          icon:
            [Users, ClipboardList, Hospital, Handshake, Stethoscope, HeartHandshake][index] ??
            Users,
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
        secondary={{ href: "/hospital-partnerships", label: page.cta.secondary }}
      />
    </>
  );
}
