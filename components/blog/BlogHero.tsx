import Link from "next/link";
import { Mail, MessageCircle, Send } from "lucide-react";

import { localizePath, type AppLocale } from "@/lib/i18n/config";
import { siteConfig } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";

type BlogHeroProps = {
  locale: AppLocale;
  eyebrow: string;
  title: string;
  description: string;
  points: string[];
  imageSrc: string;
  imageAlt: string;
  contactTitle: string;
  whatsappLabel: string;
  telegramLabel: string;
  emailLabel: string;
};

export function BlogHero({
  locale,
  eyebrow,
  title,
  description,
  points,
  imageSrc,
  imageAlt,
  contactTitle,
  whatsappLabel,
  telegramLabel,
  emailLabel,
}: BlogHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-slate-200/70 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.18),transparent_28%),linear-gradient(180deg,#ffffff_0%,#f7fbff_58%,#ffffff_100%)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_4%,rgba(29,78,216,0.08),transparent_26%)]" />
      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-sky-700">
              {eyebrow}
            </p>
            <h1 className="mt-5 max-w-4xl font-display text-4xl font-semibold leading-tight text-slate-950 sm:text-5xl lg:text-6xl">
              {title}
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
              {description}
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {points.map((point) => (
                <Card key={point} className="rounded-[1.5rem] border-slate-200/80 px-4 py-4 text-sm font-medium text-slate-700 shadow-[0_16px_40px_rgba(8,22,52,0.06)]">
                  {point}
                </Card>
              ))}
            </div>
          </div>
          <div className="space-y-6">
            <Card className="overflow-hidden border-slate-200/80 p-0 shadow-[0_28px_80px_rgba(8,22,52,0.12)]">
              <div className="relative aspect-[16/12]">
                <ImageWithFallback
                  src={imageSrc}
                  alt={imageAlt}
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  fallbackLabel="MedPobeda Group"
                  className="object-cover"
                />
              </div>
            </Card>
            <Card className="border-slate-200/80 p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-700">
                {contactTitle}
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                <Button asChild variant="surface" size="lg" className="w-full">
                  <Link href={siteConfig.whatsappUrl}>
                    <MessageCircle className="h-4 w-4" />
                    {whatsappLabel}
                  </Link>
                </Button>
                <Button asChild variant="surface" size="lg" className="w-full">
                  <Link href={siteConfig.telegramUrl}>
                    <Send className="h-4 w-4" />
                    {telegramLabel}
                  </Link>
                </Button>
                <Button asChild variant="surface" size="lg" className="w-full">
                  <Link href={`mailto:${siteConfig.contactEmail}`}>
                    <Mail className="h-4 w-4" />
                    {emailLabel}
                  </Link>
                </Button>
              </div>
              <div className="mt-4 text-sm text-slate-500">
                <Link
                  href={localizePath("/contact", locale)}
                  className="font-semibold text-sky-700 transition hover:text-sky-800"
                >
                  {siteConfig.contactEmail}
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
