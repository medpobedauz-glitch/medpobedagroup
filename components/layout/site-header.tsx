"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

import { getLocaleFromPathname, localizePath, stripLocaleFromPath } from "@/lib/i18n/config";
import { useMessages } from "@/lib/i18n";
import { BrandMark } from "@/components/layout/brand-mark";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { MobileNav } from "@/components/layout/mobile-nav";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);
  const routePath = stripLocaleFromPath(pathname);
  const messages = useMessages();
  const [scrolled, setScrolled] = useState(false);
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
    const handleScroll = () => {
      setScrolled(window.scrollY > 14);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8">
      <div
        className={`mx-auto flex max-w-[92rem] items-center justify-between rounded-[1.9rem] border px-3 py-3 transition-all duration-300 sm:px-5 ${
          scrolled
            ? "border-[#D6E8FF] bg-white/90 shadow-[0_26px_80px_rgba(7,27,58,0.1)] backdrop-blur-2xl"
            : "border-white/70 bg-white/78 shadow-[0_18px_54px_rgba(7,27,58,0.08)] backdrop-blur-xl"
        }`}
      >
        <Link href={localizePath("/", locale)} aria-label="MedPobeda Group home">
          <BrandMark compact />
        </Link>

        <nav className="hidden items-center gap-1 xl:flex">
          {navigationItems.map((item) => (
            <Link
              key={item.href}
              href={localizePath(item.href, locale)}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={cnNav(isActive(item.href))}
            >
              {isActive(item.href) ? (
                <motion.span
                  layoutId="nav-active-pill"
                  className="absolute inset-0 rounded-full border border-[#BFD7FF] bg-[linear-gradient(135deg,rgba(29,78,216,0.12),rgba(56,189,248,0.12))]"
                  transition={{ type: "spring", stiffness: 280, damping: 28 }}
                />
              ) : null}
              <span className="relative z-[1]">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 xl:flex">
          <LanguageSwitcher />
          <Button
            asChild
            variant="outline"
            className="border-[#BFD7FF] bg-white/78 text-[#071B3A] hover:border-[#1D4ED8] hover:bg-white"
          >
            <Link href={localizePath("/international-patients", locale)}>
              {messages.chrome.actions.requestPatientAssistance}
            </Link>
          </Button>
          <Button asChild variant="hero" className="h-11 px-6">
            <Link href={localizePath("/hospital-partnerships", locale)}>
              {messages.chrome.actions.partnerWithUs}
            </Link>
          </Button>
        </div>

        <MobileNav />
      </div>
    </header>
  );
}

function cnNav(active: boolean) {
  return [
    "relative rounded-full px-4 py-2 text-sm font-medium transition",
    active ? "text-[#071B3A]" : "text-slate-600 hover:text-blue-700",
  ].join(" ");
}
