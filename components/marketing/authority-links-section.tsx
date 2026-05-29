import { authorityPageConfigs, type AuthorityPageId } from "@/lib/authority-pages";
import { createPremiumVisual } from "@/lib/premium-visuals";
import { getMessages } from "@/lib/i18n";
import { getRequestLocale } from "@/lib/i18n/request";
import {
  PremiumFeatureCardsSection,
  type PremiumFeatureCardItem,
} from "@/components/marketing/premium-feature-cards-section";

type AuthorityLinksSectionProps = {
  eyebrow: string;
  title: string;
  description: string;
  pageIds: AuthorityPageId[];
  columns?: 2 | 3 | 4;
};

export function AuthorityLinksSection({
  eyebrow,
  title,
  description,
  pageIds,
  columns = 4,
}: AuthorityLinksSectionProps) {
  const messages = getMessages(getRequestLocale());

  const items: PremiumFeatureCardItem[] = pageIds.map((pageId) => {
    const config = authorityPageConfigs[pageId];
    const pageMessages = messages.pages.authorityPages[pageId];

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
