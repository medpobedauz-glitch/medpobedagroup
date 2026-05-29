import { FAQAccordion } from "@/components/shared/faq-accordion";
import { JsonLd } from "@/components/shared/json-ld";
import { PremiumCtaBanner } from "@/components/marketing/premium-cta-banner";
import { PremiumPageHero } from "@/components/marketing/premium-page-hero";
import { PremiumSplitTrustSection } from "@/components/marketing/premium-split-trust-section";
import { AuthorityLinksSection } from "@/components/marketing/authority-links-section";
import { TreatmentLinksSection } from "@/components/marketing/treatment-links-section";
import { getMessages } from "@/lib/i18n";
import { getRequestLocale } from "@/lib/i18n/request";
import { createMetadata } from "@/lib/metadata";
import { createPremiumVisual } from "@/lib/premium-visuals";
import {
  createBreadcrumbSchema,
  createFaqSchema,
  createServiceSchema,
  createWebPageSchema,
} from "@/lib/schema";
import {
  treatmentPageConfigs,
  type TreatmentPageId,
} from "@/lib/treatment-pages";

export function createTreatmentPageMetadata(pageId: TreatmentPageId) {
  const locale = getRequestLocale();
  const messages = getMessages(locale);
  const config = treatmentPageConfigs[pageId];

  return createMetadata({
    title: messages.routes[config.routeKey].title,
    description: messages.routes[config.routeKey].description,
    path: config.path,
    locale,
    keywords: messages.routes[config.routeKey].keywords,
    ogTitle: messages.routes[config.routeKey].openGraphTitle,
    ogDescription: messages.routes[config.routeKey].openGraphDescription,
  });
}

export function TreatmentServicePage({ pageId }: { pageId: TreatmentPageId }) {
  const locale = getRequestLocale();
  const messages = getMessages(locale);
  const config = treatmentPageConfigs[pageId];
  const common = messages.pages.treatmentPages.common;
  const page = messages.pages.treatmentPages[pageId];

  const overviewItems = page.overview.items.map((item, index) => ({
    icon: config.overviewIcons[index] ?? config.icon,
    title: item.title,
    description: item.description,
  }));

  return (
    <>
      <JsonLd
        data={[
          createWebPageSchema({
            name: messages.routes[config.routeKey].title,
            description: messages.routes[config.routeKey].description,
            path: config.path,
            locale,
          }),
          createServiceSchema({
            name: messages.routes[config.routeKey].title,
            description: messages.routes[config.routeKey].description,
            path: config.path,
            locale,
          }),
          createBreadcrumbSchema(
            [
              { name: messages.chrome.navigation.home, path: "/" },
              { name: messages.chrome.navigation.treatments, path: "/treatments" },
              { name: messages.routes[config.routeKey].title, path: config.path },
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
        primaryCta={{
          href: "/contact",
          label: messages.chrome.actions.requestPatientAssistance,
        }}
        secondaryCta={{
          href: "/treatments",
          label: common.hubCtaLabel,
        }}
        images={[
          createPremiumVisual(
            config.heroImages[0].category,
            config.heroImages[0].slug,
            config.heroImages[0].alt,
          ),
          createPremiumVisual(
            config.heroImages[1].category,
            config.heroImages[1].slug,
            config.heroImages[1].alt,
          ),
          createPremiumVisual(
            config.heroImages[2].category,
            config.heroImages[2].slug,
            config.heroImages[2].alt,
          ),
        ]}
      />

      <PremiumSplitTrustSection
        eyebrow={common.overviewEyebrow}
        title={page.overview.title}
        description={page.overview.description}
        image={createPremiumVisual(
          config.overviewImage.category,
          config.overviewImage.slug,
          config.overviewImage.alt,
        )}
        items={overviewItems}
      />

      <TreatmentLinksSection
        eyebrow={common.relatedEyebrow}
        title={common.relatedTitle}
        description={common.relatedDescription}
        pageIds={config.relatedTreatments}
        columns={3}
      />

      <AuthorityLinksSection
        eyebrow={common.authorityEyebrow}
        title={common.authorityTitle}
        description={common.authorityDescription}
        pageIds={config.relatedAuthorities}
        columns={4}
      />

      <FAQAccordion
        eyebrow={common.faqEyebrow}
        title={page.faq.title}
        description={page.faq.description}
        items={page.faq.items}
      />

      <PremiumCtaBanner
        eyebrow={common.ctaEyebrow}
        title={page.cta.title}
        description={page.cta.description}
        image={createPremiumVisual(
          config.ctaImage.category,
          config.ctaImage.slug,
          config.ctaImage.alt,
        )}
        primary={{
          href: "/contact",
          label: messages.chrome.actions.requestPatientAssistance,
        }}
        secondary={{
          href: "/treatment-in-india",
          label: common.indiaCtaLabel,
        }}
      />
    </>
  );
}
