"use client";

import Link from "next/link";
import { Mail, Menu, MessageCircle, Send, X } from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import {
  getLocaleFromPathname,
  localizePath,
  stripLocaleFromPath,
} from "@/lib/i18n/config";
import { useMessages } from "@/lib/i18n";
import { getTelegramUrl, getWhatsAppUrl, siteConfig } from "@/lib/site";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { BrandMark } from "@/components/layout/brand-mark";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";

export function MobileNav() {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);
  const routePath = stripLocaleFromPath(pathname);
  const messages = useMessages();
  const [open, setOpen] = useState(false);
  const whatsappHref = getWhatsAppUrl(messages.chrome.stickyMobileBar.directMessage);
  const telegramHref = getTelegramUrl(messages.chrome.stickyMobileBar.directMessage);
  const navigationItems = [
    { href: "/", label: messages.chrome.navigation.home },
    { href: "/international-patient-care", label: messages.chrome.navigation.medicalTourism },
    { href: "/services", label: messages.chrome.navigation.services },
    { href: "/treatments", label: messages.chrome.navigation.treatments },
    { href: "/tremor", label: "Tremor" },
    { href: "/hospitals", label: messages.chrome.navigation.hospitals },
    { href: "/doctors", label: messages.chrome.navigation.doctors },
    { href: "/patient-support", label: messages.chrome.navigation.patientSupport },
    { href: "/about", label: messages.chrome.navigation.about },
    { href: "/blog", label: messages.routes.blog.title },
    { href: "/contact", label: messages.chrome.navigation.contact },
  ];

  const isActive = (href: string) =>
    href === "/"
      ? routePath === "/"
      : routePath === href || routePath.startsWith(`${href}/`);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <div className="xl:hidden">
      <Button
        aria-label={
          open
            ? messages.chrome.mobileNav.closeAriaLabel
            : messages.chrome.mobileNav.openAriaLabel
        }
        variant="outline"
        size="icon"
        className="border-[#BFD7FF] bg-white/88 text-[#071B3A] shadow-[0_12px_28px_rgba(7,27,58,0.06)] hover:bg-white"
        onClick={() => setOpen((current) => !current)}
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent className="w-[min(100vw,24rem)] max-w-[24rem] overflow-hidden border-l border-[#D6E8FF] bg-[linear-gradient(180deg,rgba(255,255,255,0.995),rgba(245,250,255,0.985))] p-0 text-[#071B3A] shadow-[0_30px_90px_rgba(7,27,58,0.18)] sm:max-w-[24rem]">
          <div className="flex h-full flex-col">
            <div className="border-b border-[#E3EFFD] px-4 pb-4 pt-5 sm:px-5">
              <div className="min-w-0 pr-12">
                <BrandMark compact />
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {messages.chrome.mobileNav.description}
                </p>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-4 sm:px-5">
              <div className="grid gap-2">
                {navigationItems.map((item) => (
                  <Link
                    key={item.href}
                    href={localizePath(item.href, locale)}
                    onClick={() => setOpen(false)}
                    className={`rounded-[1.35rem] border px-4 py-3.5 text-sm font-semibold leading-6 transition ${
                      isActive(item.href)
                        ? "border-[#1D4ED8] bg-[linear-gradient(135deg,rgba(29,78,216,0.1),rgba(56,189,248,0.14))] text-[#071B3A]"
                        : "border-[#D6E8FF] bg-white text-slate-600 hover:border-[#9CC8FF] hover:text-[#071B3A]"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              <div className="mt-5 grid gap-2 rounded-[1.5rem] border border-[#D6E8FF] bg-[rgba(248,251,255,0.92)] p-3">
                <p className="px-2 text-xs font-semibold uppercase tracking-[0.22em] text-blue-700">
                  {messages.chrome.languageSwitcher.mobileTitle}
                </p>
                <LanguageSwitcher fullWidth />
              </div>

              <div className="mt-5 grid gap-3 rounded-[1.5rem] border border-[#D6E8FF] bg-white/92 p-3">
                <p className="px-1 text-xs font-semibold uppercase tracking-[0.22em] text-blue-700">
                  {messages.chrome.footer.contact}
                </p>
                {whatsappHref ? (
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => setOpen(false)}
                    className="inline-flex min-h-[46px] items-center gap-3 rounded-[1.2rem] border border-[#D6E8FF] bg-white px-4 py-3 text-sm font-semibold text-[#071B3A]"
                  >
                    <MessageCircle className="h-4 w-4 shrink-0 text-emerald-500" />
                    <span className="min-w-0">{messages.chrome.actions.messageUsOnWhatsApp}</span>
                  </a>
                ) : null}
                {telegramHref ? (
                  <a
                    href={telegramHref}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => setOpen(false)}
                    className="inline-flex min-h-[46px] items-center gap-3 rounded-[1.2rem] border border-[#D6E8FF] bg-white px-4 py-3 text-sm font-semibold text-[#071B3A]"
                  >
                    <Send className="h-4 w-4 shrink-0 text-blue-600" />
                    <span className="min-w-0">{messages.chrome.actions.messageUsOnTelegram}</span>
                  </a>
                ) : null}
                <a
                  href={`mailto:${siteConfig.contactEmail}`}
                  onClick={() => setOpen(false)}
                  className="inline-flex min-h-[46px] items-center gap-3 rounded-[1.2rem] border border-[#D6E8FF] bg-white px-4 py-3 text-sm font-semibold text-[#071B3A]"
                >
                  <Mail className="h-4 w-4 shrink-0 text-blue-600" />
                  <span className="min-w-0">{messages.chrome.actions.sendInquiryByEmail}</span>
                </a>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
