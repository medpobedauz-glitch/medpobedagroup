"use client";

import Link from "next/link";
import {
  Globe2,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  PhoneCall,
  Send,
  Youtube,
} from "lucide-react";
import { usePathname } from "next/navigation";

import { getLocaleFromPathname, localizePath } from "@/lib/i18n/config";
import { useMessages } from "@/lib/i18n";
import { getTelegramUrl, getWhatsAppUrl, siteConfig } from "@/lib/site";
import { BrandMark } from "@/components/layout/brand-mark";
import { Button } from "@/components/ui/button";

const socialIconMap = {
  instagram: Instagram,
  facebook: Globe2,
  linkedin: Linkedin,
  telegram: Send,
  youtube: Youtube,
} as const;

const socialLabelMap = {
  instagram: "Instagram",
  facebook: "Facebook",
  linkedin: "LinkedIn",
  telegram: "Telegram",
  youtube: "YouTube",
} as const;

export function SiteFooter() {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);
  const messages = useMessages();
  const whatsappHref = getWhatsAppUrl(messages.chrome.footer.whatsAppMessage);
  const telegramHref = getTelegramUrl(messages.chrome.footer.whatsAppMessage);
  const footerSocialLinks = Object.entries(siteConfig.socialLinks).filter(([, url]) => Boolean(url));
  const footerNavigation = [
    { href: "/", label: messages.chrome.navigation.home },
    { href: "/medical-tourism", label: messages.chrome.navigation.medicalTourism },
    { href: "/treatments", label: messages.chrome.navigation.treatments },
    { href: "/hospitals", label: messages.chrome.navigation.hospitals },
    { href: "/hospital-partnerships", label: messages.chrome.navigation.partnerships },
    {
      href: "/international-patients",
      label: messages.chrome.navigation.internationalPatients,
    },
    { href: "/student-mobility", label: messages.chrome.navigation.studentMobility },
    { href: "/about", label: messages.chrome.navigation.about },
    { href: "/others", label: messages.chrome.navigation.others },
    { href: "/company-profile", label: messages.chrome.navigation.companyProfile },
    { href: "/press", label: messages.chrome.navigation.press },
    { href: "/contact", label: messages.chrome.navigation.contact },
  ];
  const legalNavigation = [
    { href: "/privacy-policy", label: messages.routes["privacy-policy"].title },
    { href: "/terms", label: messages.routes.terms.title },
    { href: "/medical-disclaimer", label: messages.routes["medical-disclaimer"].title },
    { href: "/cookie-policy", label: messages.routes["cookie-policy"].title },
  ];

  return (
    <footer className="mt-12 overflow-hidden bg-[linear-gradient(180deg,#071B3A_0%,#0C2B61_100%)] text-white">
      <div className="h-px w-full bg-[linear-gradient(90deg,rgba(212,175,55,0),rgba(212,175,55,0.95),rgba(56,189,248,0.8),rgba(212,175,55,0))]" />
      <div className="mx-auto grid max-w-[92rem] gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.05fr_0.75fr_0.75fr_1fr] lg:px-8 lg:py-16">
        <div className="space-y-6">
          <BrandMark light />
          <p className="max-w-md text-sm leading-8 text-sky-100/88">
            {messages.chrome.footer.description}
          </p>
          <p className="text-xs uppercase tracking-[0.32em] text-sky-200/80">
            {messages.site.tagline}
          </p>
          <div className="flex flex-wrap gap-3">
            {footerSocialLinks.map(([platform, href]) => {
              const Icon = socialIconMap[platform as keyof typeof socialIconMap] || Globe2;

              return (
                <a
                  key={platform}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/6 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-sky-100/90 backdrop-blur-xl"
                >
                  <Icon className="h-3.5 w-3.5" />
                  {socialLabelMap[platform as keyof typeof socialLabelMap] || platform}
                </a>
              );
            })}
          </div>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.28em] text-sky-200/84">
            {messages.chrome.footer.quickLinks}
          </h2>
          <div className="mt-5 grid gap-3">
            {footerNavigation.map((item) => (
              <Link
                key={item.href}
                href={localizePath(item.href, locale)}
                className="text-sm text-sky-100/82 transition hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.28em] text-sky-200/84">
            {messages.chrome.footer.services}
          </h2>
          <div className="mt-5 grid gap-3 text-sm leading-7 text-sky-100/82">
            {messages.chrome.footer.serviceList.map((item) => (
              <p key={item}>{item}</p>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-white/8 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.18)] backdrop-blur-2xl">
          <p className="text-xl font-semibold text-white">{siteConfig.companyName}</p>
          <p className="mt-2 text-sm leading-7 text-sky-100/84">{siteConfig.location}</p>
          <h2 className="text-sm font-semibold uppercase tracking-[0.28em] text-sky-200/84">
            {messages.chrome.footer.contact}
          </h2>
          <div className="mt-5 grid gap-4 text-sm leading-7 text-sky-100/84">
            <div className="flex items-start gap-3">
              <MapPin className="mt-1 h-4 w-4 shrink-0 text-[#D4AF37]" />
              <div>
                <p className="font-semibold text-white">{siteConfig.location}</p>
                <p>{messages.chrome.footer.addressHelper}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Mail className="mt-1 h-4 w-4 shrink-0 text-[#D4AF37]" />
              <div>
                <p className="font-semibold text-white">{messages.chrome.footer.emailLabel}</p>
                <a
                  href={`mailto:${siteConfig.contactEmail}`}
                  className="break-all transition hover:text-white"
                >
                  {siteConfig.contactEmail}
                </a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <PhoneCall className="mt-1 h-4 w-4 shrink-0 text-[#D4AF37]" />
              <div>
                <p className="font-semibold text-white">{messages.chrome.footer.phoneLabel}</p>
                <a
                  href={`tel:${siteConfig.contactPhone.replace(/\s+/g, "")}`}
                  className="transition hover:text-white"
                >
                  {siteConfig.contactPhone}
                </a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Globe2 className="mt-1 h-4 w-4 shrink-0 text-[#D4AF37]" />
              <div>
                <p className="font-semibold text-white">{messages.chrome.footer.websiteLabel}</p>
                <a
                  href={siteConfig.siteUrl}
                  className="break-all transition hover:text-white"
                  target="_blank"
                  rel="noreferrer"
                >
                  {siteConfig.website}
                </a>
              </div>
            </div>
          </div>
          <div className="mt-6 grid gap-3">
            {whatsappHref ? (
              <Button asChild variant="hero" className="w-full justify-center">
                <a href={whatsappHref} target="_blank" rel="noreferrer">
                  <MessageCircle className="h-4 w-4" />
                  {messages.chrome.actions.messageUsOnWhatsApp}
                </a>
              </Button>
            ) : null}
            {telegramHref ? (
              <Button asChild variant="outline" className="w-full justify-center border-white/20 bg-white/10 text-white hover:bg-white/16">
                <a href={telegramHref} target="_blank" rel="noreferrer">
                  <Send className="h-4 w-4" />
                  {messages.chrome.actions.messageUsOnTelegram}
                </a>
              </Button>
            ) : null}
            <Button asChild variant="outline" className="w-full justify-center border-white/20 bg-white/10 text-white hover:bg-white/16">
              <a href={`mailto:${siteConfig.contactEmail}`}>
                <Mail className="h-4 w-4" />
                {messages.chrome.actions.sendInquiryByEmail}
              </a>
            </Button>
            {!whatsappHref && !telegramHref ? (
              <Button asChild variant="hero" className="w-full justify-center">
                <Link href={localizePath("/contact", locale)}>
                  {messages.chrome.actions.contactMedpobeda}
                </Link>
              </Button>
            ) : null}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 px-4 py-6 sm:px-6">
        <div className="mx-auto flex max-w-[92rem] flex-col gap-3 text-sm text-sky-100/72 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. {messages.chrome.footer.rightsReserved}
          </p>
          <div className="flex flex-wrap items-center gap-4">
            {legalNavigation.map((item) => (
              <Link
                key={item.href}
                href={localizePath(item.href, locale)}
                className="transition hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
