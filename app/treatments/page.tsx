import {
  FileSearch,
  Languages,
  Plane,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";

import { FAQAccordion } from "@/components/shared/faq-accordion";
import { JsonLd } from "@/components/shared/json-ld";
import { AuthorityLinksSection } from "@/components/marketing/authority-links-section";
import { PremiumCtaBanner } from "@/components/marketing/premium-cta-banner";
import { PremiumImageStorySection } from "@/components/marketing/premium-image-story-section";
import { PremiumPageHero } from "@/components/marketing/premium-page-hero";
import { PremiumSplitTrustSection } from "@/components/marketing/premium-split-trust-section";
import { TreatmentLinksSection } from "@/components/marketing/treatment-links-section";
import { getMessages } from "@/lib/i18n";
import { getRequestLocale } from "@/lib/i18n/request";
import { createMetadata } from "@/lib/metadata";
import { createPremiumVisual } from "@/lib/premium-visuals";
import {
  createBreadcrumbSchema,
  createFaqSchema,
  createWebPageSchema,
} from "@/lib/schema";
import {
  treatmentAuthorityPageIdsForHub,
  treatmentPageIdsForHub,
} from "@/lib/treatment-pages";

export function generateMetadata() {
  const locale = getRequestLocale();
  const messages = getMessages(locale);

  return createMetadata({
    title: messages.routes.treatments.title,
    description: messages.routes.treatments.description,
    path: "/treatments",
    locale,
    keywords: messages.routes.treatments.keywords,
    ogTitle: messages.routes.treatments.openGraphTitle,
    ogDescription: messages.routes.treatments.openGraphDescription,
  });
}

export default function TreatmentsPage() {
  const locale = getRequestLocale();
  const messages = getMessages(locale);
  const page = messages.pages.treatments;

  return (
    <>
      <JsonLd
        data={[
          createWebPageSchema({
            name: page.schemaName,
            description: page.schemaDescription,
            path: "/treatments",
            type: "CollectionPage",
            locale,
          }),
          createBreadcrumbSchema(
            [
              { name: messages.chrome.navigation.home, path: "/" },
              { name: messages.chrome.navigation.treatments, path: "/treatments" },
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
        secondaryCta={{ href: "/treatment-in-india", label: page.hero.secondaryCta }}
        images={[
          createPremiumVisual(
            "medical-tourism-hero",
            "doctor-patient-consultation",
            page.hero.imageAlts[0],
          ),
          createPremiumVisual(
            "specialties",
            "diagnostics",
            page.hero.imageAlts[1],
          ),
          createPremiumVisual(
            "gallery",
            "operating-theatre-prep",
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
            "gallery",
            "doctor-rounds",
            page.story.imageAlts[0],
          ),
          createPremiumVisual(
            "specialties",
            "oncology",
            page.story.imageAlts[1],
          ),
          createPremiumVisual(
            "specialties",
            "cardiology",
            page.story.imageAlts[2],
          ),
          createPremiumVisual(
            "specialties",
            "orthopedics",
            page.story.imageAlts[3],
          ),
        ]}
      />

      <TreatmentLinksSection
        eyebrow={page.links.eyebrow}
        title={page.links.title}
        description={page.links.description}
        pageIds={treatmentPageIdsForHub}
        columns={3}
      />

      <PremiumSplitTrustSection
        eyebrow={page.trust.eyebrow}
        title={page.trust.title}
        description={page.trust.description}
        image={createPremiumVisual(
          "medical-tourism-trust",
          "care-coordination-meeting",
          page.trust.imageAlt,
        )}
        items={page.trust.items.map((item, index) => ({
          ...item,
          icon: [FileSearch, Stethoscope, Plane, Languages][index] ?? ShieldCheck,
        }))}
      />

      <AuthorityLinksSection
        eyebrow={page.authorityLinks.eyebrow}
        title={page.authorityLinks.title}
        description={page.authorityLinks.description}
        pageIds={treatmentAuthorityPageIdsForHub}
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
          "contact-cta",
          "healthcare-guidance-conversation",
          page.cta.imageAlt,
        )}
        primary={{ href: "/contact", label: page.cta.primary }}
        secondary={{ href: "/medical-tourism", label: page.cta.secondary }}
      />
    </>
  );
}
