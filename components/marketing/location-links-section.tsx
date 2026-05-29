import { type LocationPageId, locationPageConfigs } from "@/lib/location-pages";
import { createPremiumVisual } from "@/lib/premium-visuals";
import { getMessages } from "@/lib/i18n";
import { getRequestLocale } from "@/lib/i18n/request";
import {
  PremiumFeatureCardsSection,
  type PremiumFeatureCardItem,
} from "@/components/marketing/premium-feature-cards-section";

type LocationLinksSectionProps = {
  eyebrow: string;
  title: string;
  description: string;
  pageIds: LocationPageId[];
  columns?: 2 | 3 | 4;
};

export function LocationLinksSection({
  eyebrow,
  title,
  description,
  pageIds,
  columns = 3,
}: LocationLinksSectionProps) {
  const messages = getMessages(getRequestLocale());

  const items: PremiumFeatureCardItem[] = pageIds.map((pageId) => {
    const config = locationPageConfigs[pageId];
    const pageMessages = messages.pages.locationPages[pageId];

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
