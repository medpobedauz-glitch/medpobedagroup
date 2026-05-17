import type { LucideIcon } from "lucide-react";

import { PremiumCard } from "@/components/marketing/premium-card";
import {
  PremiumImageFrame,
  type PremiumVisualAsset,
} from "@/components/marketing/premium-image-frame";
import { SectionHeader } from "@/components/marketing/section-header";

type TrustItem = {
  icon: LucideIcon;
  title: string;
  description: string;
};

type PremiumSplitTrustSectionProps = {
  eyebrow: string;
  title: string;
  description: string;
  image: PremiumVisualAsset;
  items: TrustItem[];
  stats?: Array<{
    label: string;
    value: string;
    description: string;
  }>;
};

export function PremiumSplitTrustSection({
  eyebrow,
  title,
  description,
  image,
  items,
  stats = [],
}: PremiumSplitTrustSectionProps) {
  return (
    <section className="section-shell">
      <div className="container-wide">
        <div className="section-frame px-6 py-8 sm:px-8 lg:px-10 lg:py-12">
          <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            <PremiumCard hover={false} className="h-full p-6 sm:p-8">
              <SectionHeader
                eyebrow={eyebrow}
                title={title}
                description={description}
              />
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {items.map((item, index) => {
                  const Icon = item.icon;

                  return (
                    <PremiumCard key={item.title} className="p-4" delay={index * 0.04}>
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,rgba(16,185,129,0.12),rgba(56,189,248,0.16))] text-[#10B981]">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="mt-4 text-lg font-semibold text-[#071B3A]">{item.title}</h3>
                      <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
                    </PremiumCard>
                  );
                })}
              </div>
            </PremiumCard>

            <PremiumCard hover={false} className="h-full p-5 sm:p-6">
              <PremiumImageFrame asset={image} aspectClassName="aspect-[16/11]" />
              {stats.length > 0 ? (
                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  {stats.map((item) => (
                    <div
                      key={item.label}
                      className="rounded-[1.6rem] border border-[#D6E8FF] bg-white p-5 shadow-[0_16px_40px_rgba(8,22,52,0.05)]"
                    >
                      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-blue-700">
                        {item.label}
                      </p>
                      <p className="mt-3 font-display text-3xl font-semibold text-[#071B3A]">
                        {item.value}
                      </p>
                      <p className="mt-3 text-sm leading-7 text-slate-600">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              ) : null}
            </PremiumCard>
          </div>
        </div>
      </div>
    </section>
  );
}
