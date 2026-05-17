import { ArrowRight } from "lucide-react";

import { CTAButton } from "@/components/marketing/cta-button";
import {
  PremiumImageFrame,
  type PremiumVisualAsset,
} from "@/components/marketing/premium-image-frame";

type PremiumCtaBannerProps = {
  eyebrow?: string;
  title: string;
  description: string;
  image: PremiumVisualAsset;
  primary: {
    href: string;
    label: string;
  };
  secondary?: {
    href: string;
    label: string;
  };
};

export function PremiumCtaBanner({
  eyebrow = "Next Step",
  title,
  description,
  image,
  primary,
  secondary,
}: PremiumCtaBannerProps) {
  return (
    <section className="section-shell">
      <div className="container-wide">
        <div className="section-frame-accent px-6 py-8 sm:px-8 lg:px-10 lg:py-12">
          <div className="grid items-center gap-6 lg:grid-cols-[1.02fr_0.98fr]">
            <div>
              <p className="section-kicker">
                <span className="h-2 w-2 rounded-full bg-[#D4AF37]" />
                {eyebrow}
              </p>
              <h2 className="mt-4 font-display text-3xl font-semibold leading-[1.1] tracking-[-0.035em] text-[#071B3A] sm:text-4xl sm:leading-[1.06] lg:text-[3.35rem] lg:leading-[1.02]">
                {title}
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-[1.05rem]">
                {description}
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <CTAButton
                  href={primary.href}
                  label={primary.label}
                  variant="hero"
                  size="2xl"
                  icon={ArrowRight}
                />
                {secondary ? (
                  <CTAButton
                    href={secondary.href}
                    label={secondary.label}
                    variant="surface"
                    size="2xl"
                    className="border-[#BFD7FF] bg-white/88 text-[#071B3A]"
                  />
                ) : null}
              </div>
            </div>
            <PremiumImageFrame asset={image} aspectClassName="aspect-[16/11]" />
          </div>
        </div>
      </div>
    </section>
  );
}
