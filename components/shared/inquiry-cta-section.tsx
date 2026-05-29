import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { getMessages } from "@/lib/i18n";
import { getRequestLocale } from "@/lib/i18n/request";
import { getTelegramUrl, getWhatsAppUrl } from "@/lib/site";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/shared/fade-in";
import { ImageCard } from "@/components/shared/image-card";
import { getSiteImage, type SiteImageKey } from "@/lib/site-images";

type InquiryCTASectionProps = {
  eyebrow?: string;
  title: string;
  description: string;
  primaryHref: string;
  primaryLabel: string;
  inquiryMessage: string;
  imageKey?: SiteImageKey;
};

export function InquiryCTASection({
  eyebrow,
  title,
  description,
  primaryHref,
  primaryLabel,
  inquiryMessage,
  imageKey,
}: InquiryCTASectionProps) {
  const messages = getMessages(getRequestLocale());
  const resolvedEyebrow = eyebrow ?? messages.components.premiumCtaBanner.defaultEyebrow;
  const whatsappHref = getWhatsAppUrl(inquiryMessage);
  const telegramHref = getTelegramUrl(inquiryMessage);
  const image = imageKey ? getSiteImage(imageKey) : null;

  return (
    <section className="px-6 py-20 lg:px-8">
      <FadeIn className="mx-auto max-w-7xl">
        <Card className="overflow-hidden border-slate-200/80 p-8 shadow-premium lg:p-12">
          <div
            className={
              image
                ? "grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-center"
                : "flex flex-col gap-8"
            }
          >
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-sky-700">
                {resolvedEyebrow}
              </p>
              <h2 className="mt-5 font-display text-3xl font-semibold text-slate-950 sm:text-4xl">
                {title}
              </h2>
              <p className="mt-5 text-base leading-8 text-slate-600">{description}</p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Button asChild variant="hero" size="xl">
                  <Link href={primaryHref}>
                    {primaryLabel}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                {whatsappHref ? (
                  <Button asChild variant="outline" size="xl">
                    <a href={whatsappHref} target="_blank" rel="noreferrer">
                      {messages.chrome.actions.messageUsOnWhatsApp}
                    </a>
                  </Button>
                ) : null}
                {telegramHref ? (
                  <Button asChild variant="outline" size="xl">
                    <a href={telegramHref} target="_blank" rel="noreferrer">
                      {messages.chrome.actions.messageUsOnTelegram}
                    </a>
                  </Button>
                ) : null}
              </div>
            </div>
            {image ? (
              <ImageCard asset={image} title={image.title} aspectClassName="aspect-[16/11]" />
            ) : null}
          </div>
        </Card>
      </FadeIn>
    </section>
  );
}
