import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";

import { PremiumCard } from "@/components/marketing/premium-card";
import { type PremiumVisualAsset } from "@/components/marketing/premium-image-frame";
import { PublicLink } from "@/components/shared/public-link";
import { SectionHeader } from "@/components/marketing/section-header";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { getMessages } from "@/lib/i18n";
import { getRequestLocale } from "@/lib/i18n/request";

export type PremiumFeatureCardItem = {
  icon: LucideIcon;
  title: string;
  description: string;
  image?: PremiumVisualAsset;
  href?: string;
};

type PremiumFeatureCardsSectionProps = {
  eyebrow: string;
  title: string;
  description: string;
  items: PremiumFeatureCardItem[];
  columns?: 2 | 3 | 4;
};

const columnClasses = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 xl:grid-cols-3",
  4: "sm:grid-cols-2 xl:grid-cols-4",
} as const;

export function PremiumFeatureCardsSection({
  eyebrow,
  title,
  description,
  items,
  columns = 3,
}: PremiumFeatureCardsSectionProps) {
  const messages = getMessages(getRequestLocale());

  return (
    <section className="section-shell pt-0">
      <div className="container-wide">
        <SectionHeader
          eyebrow={eyebrow}
          title={title}
          description={description}
          align="center"
        />
        <div className={`mt-12 grid gap-6 ${columnClasses[columns]}`}>
          {items.map((item, index) => {
            const Icon = item.icon;
            const isInternalPath = Boolean(item.href?.startsWith("/"));

            return (
              <PremiumCard
                key={item.title}
                className="flex h-full flex-col p-5 sm:p-6"
                delay={index * 0.05}
              >
                {item.image ? (
                  <div className="rounded-[1.7rem] border border-[#D6E8FF] bg-white p-3 shadow-[0_18px_40px_rgba(7,27,58,0.06)]">
                    <div className="relative aspect-[16/10] overflow-hidden rounded-[1.35rem]">
                      <div className="absolute left-4 top-4 z-[1] inline-flex items-center gap-2 rounded-full bg-white/88 px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-blue-700 shadow-[0_10px_24px_rgba(7,27,58,0.08)]">
                        <Icon className="h-3.5 w-3.5" />
                        {messages.components.premiumFeatureCards.focusLabel}
                      </div>
                      <ImageWithFallback
                        src={item.image.src}
                        alt={item.image.alt}
                        fill
                        sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
                        fallbackLabel={item.title}
                        className="object-cover"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,rgba(29,78,216,0.12),rgba(56,189,248,0.16))] text-blue-700">
                    <Icon className="h-5 w-5" />
                  </div>
                )}
                <h3 className="mt-5 font-display text-2xl font-semibold tracking-[-0.04em] text-[#071B3A]">
                  {item.title}
                </h3>
                <p className="mt-4 flex-1 text-sm leading-7 text-slate-600">{item.description}</p>
                {item.href ? (
                  isInternalPath ? (
                    <PublicLink
                      href={item.href}
                      className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-blue-700 transition hover:gap-3 hover:text-[#071B3A]"
                    >
                      {messages.components.premiumFeatureCards.learnMoreLabel}
                      <ArrowRight className="h-4 w-4" />
                    </PublicLink>
                  ) : (
                    <Link
                      href={item.href}
                      className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-blue-700 transition hover:gap-3 hover:text-[#071B3A]"
                    >
                      {messages.components.premiumFeatureCards.learnMoreLabel}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  )
                ) : null}
              </PremiumCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
