import { FadeIn } from "@/components/shared/fade-in";
import { ImageCard } from "@/components/shared/image-card";
import { PublicLink } from "@/components/shared/public-link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getMessages } from "@/lib/i18n";
import { getRequestLocale } from "@/lib/i18n/request";
import { getSiteImage, type SiteImageKey } from "@/lib/site-images";

type CtaSectionProps = {
  title: string;
  description: string;
  primary: { label: string; href: string };
  secondary: { label: string; href: string };
  imageKey?: SiteImageKey;
};

export function CtaSection({
  title,
  description,
  primary,
  secondary,
  imageKey,
}: CtaSectionProps) {
  const messages = getMessages(getRequestLocale());
  const image = imageKey ? getSiteImage(imageKey) : null;

  return (
    <section className="px-6 py-20 lg:px-8">
      <FadeIn className="mx-auto max-w-7xl">
        <Card className="overflow-hidden border-slate-200/80 p-8 shadow-premium lg:p-12">
          <div
            className={
              image
                ? "grid gap-8 lg:grid-cols-[1fr_0.82fr] lg:items-center"
                : "flex flex-col gap-8"
            }
          >
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-sky-700">
                {messages.chrome.ctaSection.eyebrow}
              </p>
              <h2 className="mt-5 font-display text-3xl font-semibold text-slate-950 sm:text-4xl lg:text-5xl">
                {title}
              </h2>
              <p className="mt-5 text-base leading-8 text-slate-600">{description}</p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Button asChild variant="hero" size="xl">
                  <PublicLink href={primary.href}>{primary.label}</PublicLink>
                </Button>
                <Button asChild variant="outline" size="xl">
                  <PublicLink href={secondary.href}>{secondary.label}</PublicLink>
                </Button>
              </div>
            </div>
            {image ? (
              <ImageCard
                asset={image}
                title={image.title}
                description={image.alt}
                aspectClassName="aspect-[16/11]"
              />
            ) : null}
          </div>
        </Card>
      </FadeIn>
    </section>
  );
}

export { CtaSection as CTASection };
