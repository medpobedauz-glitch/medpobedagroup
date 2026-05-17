"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import {
  getLocaleFromPathname,
  localizePath,
  stripLocaleFromPath,
} from "@/lib/i18n/config";
import { useMessages } from "@/lib/i18n";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { BrandMark } from "@/components/layout/brand-mark";
import { Button } from "@/components/ui/button";

export function MobileNav() {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);
  const routePath = stripLocaleFromPath(pathname);
  const messages = useMessages();
  const [open, setOpen] = useState(false);
  const navigationItems = [
    { href: "/", label: messages.chrome.navigation.home },
    { href: "/medical-tourism", label: messages.chrome.navigation.medicalTourism },
    { href: "/hospitals", label: messages.chrome.navigation.hospitals },
    {
      href: "/international-patients",
      label: messages.chrome.navigation.internationalPatients,
    },
    { href: "/hospital-partnerships", label: messages.chrome.navigation.partnerships },
    { href: "/student-mobility", label: messages.chrome.navigation.studentMobility },
    { href: "/about", label: messages.chrome.navigation.about },
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
    <div className="relative xl:hidden">
      <Button
        aria-label={open ? "Close navigation menu" : "Open navigation menu"}
        variant="outline"
        size="icon"
        className="border-[#BFD7FF] bg-white/78 text-[#071B3A] hover:bg-white"
        onClick={() => setOpen((current) => !current)}
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.22 }}
            className="absolute right-0 top-[calc(100%+0.9rem)] w-[min(25rem,calc(100vw-2rem))] overflow-hidden rounded-[2rem] border border-[#D6E8FF] bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(245,250,255,0.96))] p-5 shadow-[0_30px_90px_rgba(7,27,58,0.16)] backdrop-blur-2xl"
          >
            <div className="rounded-[1.7rem] border border-[#D6E8FF] bg-white/90 p-4">
              <BrandMark />
              <p className="mt-3 text-sm leading-7 text-slate-600">
                {messages.chrome.mobileNav.description}
              </p>
            </div>

            <div className="mt-4 grid gap-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={localizePath(item.href, locale)}
                  className={`rounded-[1.35rem] border px-4 py-3 text-sm font-semibold transition ${
                    isActive(item.href)
                      ? "border-[#1D4ED8] bg-[linear-gradient(135deg,rgba(29,78,216,0.1),rgba(56,189,248,0.14))] text-[#071B3A]"
                      : "border-[#D6E8FF] bg-white text-slate-600 hover:border-[#9CC8FF] hover:text-[#071B3A]"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="mt-4 grid gap-2 rounded-[1.5rem] border border-[#D6E8FF] bg-[rgba(248,251,255,0.92)] p-3">
              <p className="px-2 text-xs font-semibold uppercase tracking-[0.26em] text-blue-700">
                {messages.chrome.languageSwitcher.mobileTitle}
              </p>
              <LanguageSwitcher fullWidth />
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <Button
                asChild
                variant="outline"
                className="border-[#BFD7FF] bg-white text-[#071B3A] hover:bg-white"
              >
                <Link href={localizePath("/international-patients", locale)}>
                  {messages.chrome.actions.requestPatientAssistance}
                </Link>
              </Button>
              <Button asChild variant="hero">
                <Link href={localizePath("/hospital-partnerships", locale)}>
                  {messages.chrome.actions.partnerWithUs}
                </Link>
              </Button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
