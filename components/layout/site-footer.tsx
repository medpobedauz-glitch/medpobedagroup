"use client";

import Link from "next/link";
import { Globe2, Instagram, Linkedin, Mail, MapPin, MessageCircle, PhoneCall, Youtube } from "lucide-react";
import { usePathname } from "next/navigation";

import { getLocaleFromPathname, localizePath } from "@/lib/i18n/config";
import { useMessages } from "@/lib/i18n";
import { getWhatsAppUrl, siteConfig } from "@/lib/site";
import { BrandMark } from "@/components/layout/brand-mark";
import { Button } from "@/components/ui/button";

const socialIconMap = {
  LinkedIn: Linkedin,
  X: Globe2,
  YouTube: Youtube,
  Instagram,
} as const;

export function SiteFooter() {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);
  const messages = useMessages();
  const whatsappHref = getWhatsAppUrl(
    "Hello MedPobeda Group, I would like to discuss a healthcare collaboration opportunity.",
  );
  const footerNavigation = [
    { href: "/", label: messages.chrome.navigation.home },
    { href: "/medical-tourism", label: messages.chrome.navigation.medicalTourism },
    { href: "/hospitals", label: messages.chrome.navigation.hospitals },
    { href: "/hospital-partnerships", label: messages.chrome.navigation.partnerships },
    {
      href: "/international-patients",
      label: messages.chrome.navigation.internationalPatients,
    },
    { href: "/student-mobility", label: messages.chrome.navigation.studentMobility },
    { href: "/about", label: messages.chrome.navigation.about },
    { href: "/contact", label: messages.chrome.navigation.contact },
  ];
  const legalNavigation = [
    { href: "/privacy-policy", label: messages.routes["privacy-policy"].title },
    { href: "/terms", label: messages.routes.terms.title },
  ];

  return (
    <footer className="mt-12 overflow-hidden bg-[linear-gradient(180deg,#071B3A_0%,#0C2B61_100%)] text-white">
      <div className="h-px w-full bg-[linear-gradient(90deg,rgba(212,175,55,0),rgba(212,175,55,0.95),rgba(56,189,248,0.8),rgba(212,175,55,0))]" />
      <div className="mx-auto grid max-w-[92rem] gap-10 px-6 py-16 lg:grid-cols-[1.05fr_0.75fr_0.75fr_1fr] lg:px-8">
        <div className="space-y-6">
          <BrandMark light />
          <p className="max-w-md text-sm leading-8 text-sky-100/88">
            {messages.chrome.footer.description}
          </p>
          <p className="text-xs uppercase tracking-[0.32em] text-sky-200/80">
            {siteConfig.tagline}
          </p>
          <div className="flex flex-wrap gap-3">
            {siteConfig.socialPlaceholders.map((item) => {
              const Icon = socialIconMap[item as keyof typeof socialIconMap] || Linkedin;

              return (
                <span
                  key={item}
                  className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/6 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-sky-100/90 backdrop-blur-xl"
                >
                  <Icon className="h-3.5 w-3.5" />
                  {item}
                </span>
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
              <p>{siteConfig.contactEmail || "Email to be configured"}</p>
            </div>
            <div className="flex items-start gap-3">
              <PhoneCall className="mt-1 h-4 w-4 shrink-0 text-[#D4AF37]" />
              <p>{siteConfig.contactPhone || "Phone to be configured"}</p>
            </div>
          </div>
          {whatsappHref ? (
            <Button asChild variant="hero" className="mt-6 w-full justify-center">
              <a href={whatsappHref} target="_blank" rel="noreferrer">
                <MessageCircle className="h-4 w-4" />
                {messages.chrome.actions.contactOnWhatsApp}
              </a>
            </Button>
          ) : (
            <Button asChild variant="hero" className="mt-6 w-full justify-center">
              <Link href={localizePath("/contact", locale)}>
                {messages.chrome.actions.contactMedpobeda}
              </Link>
            </Button>
          )}
        </div>
      </div>

      <div className="border-t border-white/10 px-6 py-6">
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
