import { ArrowRight } from "lucide-react";

import { FadeIn } from "@/components/shared/fade-in";
import { ImageCard } from "@/components/shared/image-card";
import { PublicLink } from "@/components/shared/public-link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getMessages } from "@/lib/i18n";
import { getRequestLocale } from "@/lib/i18n/request";
import { getSiteImage, type SiteImageKey } from "@/lib/site-images";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  points: string[];
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  imageKey?: SiteImageKey;
  secondaryImageKey?: SiteImageKey;
};

export function PageHero({
  eyebrow,
  title,
  description,
  points,
  primaryCta,
  secondaryCta,
  imageKey,
  secondaryImageKey,
}: PageHeroProps) {
  const messages = getMessages(getRequestLocale());
  const heroImage = imageKey ? getSiteImage(imageKey) : null;
  const secondaryImage = secondaryImageKey ? getSiteImage(secondaryImageKey) : null;

  return (
    <section className="relative overflow-hidden border-b border-slate-200/80 bg-hero-mesh">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_0%,rgba(125,211,252,0.16),transparent_28%),radial-gradient(circle_at_78%_12%,rgba(96,165,250,0.16),transparent_22%)]" />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-[1fr_0.9fr] lg:px-8 lg:py-24">
        <FadeIn>
          <Badge>{eyebrow}</Badge>
          <h1 className="mt-6 max-w-4xl font-display text-4xl font-semibold leading-tight text-slate-950 sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">{description}</p>
          {(primaryCta || secondaryCta) && (
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              {primaryCta && (
                <Button asChild variant="hero" size="lg">
                  <PublicLink href={primaryCta.href}>
                    {primaryCta.label}
                    <ArrowRight className="h-4 w-4" />
                  </PublicLink>
                </Button>
              )}
              {secondaryCta && (
                <Button asChild variant="outline" size="lg">
                  <PublicLink href={secondaryCta.href}>{secondaryCta.label}</PublicLink>
                </Button>
              )}
            </div>
          )}
        </FadeIn>
        <FadeIn delay={0.08}>
          <div className="rounded-[2rem] border border-slate-200/80 bg-white/92 p-6 shadow-soft backdrop-blur-2xl">
            {heroImage ? (
              <ImageCard
                asset={heroImage}
                title={heroImage.title}
                showCaption={false}
                priority
                aspectClassName="aspect-[16/11]"
              />
            ) : null}
            <p className="mt-6 text-sm font-semibold uppercase tracking-[0.26em] text-sky-700">
              {messages.chrome.pageHero.focusAreas}
            </p>
            <div className="mt-6 grid gap-3">
              {points.map((point) => (
                <div
                  key={point}
                  className="rounded-[1.35rem] border border-slate-200 bg-slate-50 px-4 py-4 text-sm leading-7 text-slate-600"
                >
                  {point}
                </div>
              ))}
            </div>
            {secondaryImage ? (
              <div className="mt-6">
                <ImageCard
                  asset={secondaryImage}
                  title={secondaryImage.title}
                  showCaption={false}
                  aspectClassName="aspect-[16/10]"
                />
              </div>
            ) : null}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
