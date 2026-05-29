import type { LucideIcon } from "lucide-react";

import { PremiumCard } from "@/components/marketing/premium-card";
import { SectionHeader } from "@/components/marketing/section-header";
import { getMessages } from "@/lib/i18n";
import { getRequestLocale } from "@/lib/i18n/request";

type StepItem = {
  icon: LucideIcon;
  title: string;
  description: string;
};

type PremiumStepsSectionProps = {
  eyebrow: string;
  title: string;
  description: string;
  items: StepItem[];
};

export function PremiumStepsSection({
  eyebrow,
  title,
  description,
  items,
}: PremiumStepsSectionProps) {
  const messages = getMessages(getRequestLocale());

  return (
    <section className="section-shell pt-0">
      <div className="container-wide">
        <div className="section-frame-soft px-6 py-8 sm:px-8 lg:px-10 lg:py-12">
          <SectionHeader
            eyebrow={eyebrow}
            title={title}
            description={description}
            align="center"
          />
          <div className="mt-12 hidden lg:block">
            <div className="relative grid gap-4 xl:grid-cols-4">
              <div className="pointer-events-none absolute left-10 right-10 top-[3.15rem] hidden h-px bg-[linear-gradient(90deg,rgba(191,219,254,0.35),rgba(29,78,216,0.55),rgba(191,219,254,0.35))] xl:block" />
              {items.map((item, index) => {
                const Icon = item.icon;

                return (
                  <PremiumCard key={item.title} className="p-5" delay={index * 0.04}>
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,rgba(7,27,58,0.96),rgba(29,78,216,0.9),rgba(56,189,248,0.82))] text-white shadow-[0_18px_50px_rgba(29,78,216,0.18)]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <p className="mt-5 text-xs font-semibold uppercase tracking-[0.24em] text-blue-700">
                      {messages.components.premiumSteps.stepLabel} {index + 1}
                    </p>
                    <h3 className="mt-2 text-lg font-semibold text-[#071B3A]">{item.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
                  </PremiumCard>
                );
              })}
            </div>
          </div>
          <div className="mt-10 grid gap-4 lg:hidden">
            {items.map((item, index) => {
              const Icon = item.icon;

              return (
                <PremiumCard key={item.title} className="p-5" delay={index * 0.04}>
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#071B3A,#1D4ED8)] text-white">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-blue-700">
                        {messages.components.premiumSteps.stepLabel} {index + 1}
                      </p>
                      <h3 className="mt-2 text-lg font-semibold text-[#071B3A]">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm leading-7 text-slate-600">{item.description}</p>
                    </div>
                  </div>
                </PremiumCard>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
