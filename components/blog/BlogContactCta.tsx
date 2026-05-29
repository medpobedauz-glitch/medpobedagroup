import Link from "next/link";
import { Mail, MessageCircle, Phone, Send } from "lucide-react";

import { siteConfig } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { localizePath, type AppLocale } from "@/lib/i18n/config";

type BlogContactCtaProps = {
  locale: AppLocale;
  title: string;
  description: string;
  whatsappLabel: string;
  telegramLabel: string;
  emailLabel: string;
  contactPageLabel: string;
};

export function BlogContactCta({
  locale,
  title,
  description,
  whatsappLabel,
  telegramLabel,
  emailLabel,
  contactPageLabel,
}: BlogContactCtaProps) {
  return (
    <Card className="border-slate-200/80 p-6 sm:p-8">
      <div className="grid gap-8 lg:grid-cols-[1fr_0.92fr] lg:items-center">
        <div>
          <h2 className="font-display text-3xl font-semibold text-slate-950 sm:text-4xl">
            {title}
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">{description}</p>
        </div>
        <div className="grid gap-3">
          <Button asChild variant="primary" size="xl" className="w-full">
            <Link href={siteConfig.whatsappUrl}>
              <MessageCircle className="h-4 w-4" />
              {whatsappLabel}
            </Link>
          </Button>
          <Button asChild variant="surface" size="xl" className="w-full">
            <Link href={siteConfig.telegramUrl}>
              <Send className="h-4 w-4" />
              {telegramLabel}
            </Link>
          </Button>
          <Button asChild variant="surface" size="xl" className="w-full">
            <Link href={`mailto:${siteConfig.contactEmail}`}>
              <Mail className="h-4 w-4" />
              {emailLabel}
            </Link>
          </Button>
          <Button asChild variant="outline" size="xl" className="w-full">
            <Link href={localizePath("/contact", locale)}>
              <Phone className="h-4 w-4" />
              {contactPageLabel}
            </Link>
          </Button>
        </div>
      </div>
    </Card>
  );
}
