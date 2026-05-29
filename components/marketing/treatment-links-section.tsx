import { type TreatmentPageId, treatmentPageConfigs } from "@/lib/treatment-pages";
import { createPremiumVisual } from "@/lib/premium-visuals";
import { getMessages } from "@/lib/i18n";
import { getRequestLocale } from "@/lib/i18n/request";
import {
  PremiumFeatureCardsSection,
  type PremiumFeatureCardItem,
} from "@/components/marketing/premium-feature-cards-section";

type TreatmentLinksSectionProps = {
  eyebrow: string;
  title: string;
  description: string;
  pageIds: TreatmentPageId[];
  columns?: 2 | 3 | 4;
};

export function TreatmentLinksSection({
  eyebrow,
  title,
  description,
  pageIds,
  columns = 3,
}: TreatmentLinksSectionProps) {
  const messages = getMessages(getRequestLocale());

  const items: PremiumFeatureCardItem[] = pageIds.map((pageId) => {
    const config = treatmentPageConfigs[pageId];
    const pageMessages = messages.pages.treatmentPages[pageId];

    return {
      icon: config.icon,
      title: messages.routes[config.routeKey].title,
      description: pageMessages.hero.description,
      href: config.path,
      image: createPremiumVisual(
        config.cardVisual.category,
        config.cardVisual.slug,
        config.cardVisual.alt,
      ),
    };
  });

  return (
    <PremiumFeatureCardsSection
      eyebrow={eyebrow}
      title={title}
      description={description}
      items={items}
      columns={columns}
    />
  );
}
