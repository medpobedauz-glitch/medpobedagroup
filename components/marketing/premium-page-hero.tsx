"use client";

import { motion } from "framer-motion";

import { CTAButton } from "@/components/marketing/cta-button";
import {
  PremiumImageFrame,
  type PremiumVisualAsset,
} from "@/components/marketing/premium-image-frame";
import { useMessages } from "@/lib/i18n";
import { easeOutExpo } from "@/lib/motion";

type HeroStat = {
  label: string;
  value: string;
};

type PremiumPageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  highlights: string[];
  primaryCta: {
    href: string;
    label: string;
  };
  secondaryCta?: {
    href: string;
    label: string;
  };
  images: [PremiumVisualAsset, PremiumVisualAsset, PremiumVisualAsset];
  stats?: HeroStat[];
  floatingCards?: string[];
  accentLabel?: string;
};

export function PremiumPageHero({
  eyebrow,
  title,
  description,
  highlights,
  primaryCta,
  secondaryCta,
  images,
  stats = [],
  floatingCards = [],
  accentLabel,
}: PremiumPageHeroProps) {
  const messages = useMessages();

  return (
    <section className="relative overflow-hidden px-4 pb-6 pt-4 sm:px-6 sm:pb-8 sm:pt-6 lg:px-8">
      <div className="container-wide">
        <div className="section-frame overflow-hidden px-4 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-14">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.16),transparent_26%),radial-gradient(circle_at_top_right,rgba(29,78,216,0.12),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(224,247,250,0.65),transparent_24%)]" />
          <div className="pointer-events-none absolute -left-12 top-12 h-48 w-48 rounded-full bg-[#E0F7FA]/60 blur-3xl" />
          <div className="pointer-events-none absolute right-10 top-12 h-56 w-56 rounded-full bg-[#DBEAFE]/80 blur-3xl" />
          <div className="relative grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: easeOutExpo }}
            >
              <div className="flex flex-wrap gap-3">
                {highlights.map((item) => (
                  <span
                    key={item}
                    className="glass-badge"
                  >
                    {item}
                  </span>
                ))}
              </div>
              <p className="mt-7 text-sm font-semibold uppercase tracking-[0.32em] text-blue-700">
                {eyebrow}
              </p>
              <h1 className="mt-4 max-w-3xl text-balance font-display text-3xl font-semibold leading-[1.08] tracking-[-0.035em] text-[#071B3A] sm:text-5xl sm:leading-[1.06] lg:text-[4.4rem] lg:leading-[1.02]">
                {title}
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-[1.08rem]">
                {description}
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
                <CTAButton
                  href={primaryCta.href}
                  label={primaryCta.label}
                  variant="hero"
                  size="2xl"
                  icon="arrow-right"
                />
                {secondaryCta ? (
                  <CTAButton
                    href={secondaryCta.href}
                    label={secondaryCta.label}
                    variant="surface"
                    size="2xl"
                    className="border-[#BFD7FF] bg-white/88 text-[#071B3A]"
                  />
                ) : null}
              </div>
              {stats.length > 0 ? (
                <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {stats.map((item) => (
                    <div
                      key={item.label}
                      className="rounded-[1.6rem] border border-[#D6E8FF] bg-white/88 p-5 shadow-[0_16px_48px_rgba(7,27,58,0.06)] backdrop-blur-xl"
                    >
                      <p className="font-display text-2xl font-semibold text-[#071B3A]">
                        {item.value}
                      </p>
                      <p className="mt-2 text-sm leading-7 text-slate-600">{item.label}</p>
                    </div>
                  ))}
                </div>
              ) : null}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 36 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.08, ease: easeOutExpo }}
              className="relative"
            >
              <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
                <PremiumImageFrame asset={images[0]} aspectClassName="aspect-[4/5]" priority />
                <div className="grid gap-4">
                  <PremiumImageFrame asset={images[1]} aspectClassName="aspect-[4/3]" priority />
                  <PremiumImageFrame asset={images[2]} aspectClassName="aspect-[4/3]" priority />
                </div>
              </div>
              {accentLabel ? (
                <div className="pointer-events-none absolute -left-4 top-8 hidden w-52 rounded-[1.6rem] border border-[#D6E8FF] bg-white/90 p-4 shadow-[0_22px_60px_rgba(7,27,58,0.12)] backdrop-blur-xl lg:block">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-blue-700">
                    {messages.components.premiumPageHero.signatureFocusLabel}
                  </p>
                  <p className="mt-2 font-display text-2xl font-semibold text-[#071B3A]">
                    {accentLabel}
                  </p>
                  <p className="mt-2 text-sm leading-7 text-slate-600">
                    {messages.components.premiumPageHero.signatureFocusDescription}
                  </p>
                </div>
              ) : null}
              {floatingCards.length > 0 ? (
                <div className="pointer-events-none absolute -bottom-6 right-10 hidden rounded-[1.8rem] border border-[#D6E8FF] bg-white/90 p-4 shadow-[0_24px_70px_rgba(29,78,216,0.14)] backdrop-blur-xl lg:block">
                  <div className="grid gap-2 sm:grid-cols-2">
                    {floatingCards.map((item) => (
                      <div
                        key={item}
                        className="rounded-[1.3rem] border border-[#E8F2FF] bg-[linear-gradient(180deg,rgba(248,251,255,0.96),rgba(255,255,255,0.94))] px-4 py-3 text-sm font-semibold text-[#071B3A]"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
