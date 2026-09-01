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

export function SiteHeader() {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);
  const routePath = stripLocaleFromPath(pathname);
  const messages = useMessages();
  const [scrolled, setScrolled] = useState(false);
  const navigationItems = [
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
    const handleScroll = () => {
      setScrolled(window.scrollY > 14);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 px-3 pt-2.5 sm:px-6 sm:pt-3 lg:px-8">
      <div
        className={`mx-auto flex max-w-[92rem] items-center justify-between gap-2 rounded-[1.7rem] border px-2.5 py-2.5 transition-all duration-300 sm:gap-4 sm:rounded-[1.9rem] sm:px-5 sm:py-3 xl:gap-6 ${
          scrolled
            ? "border-[#D6E8FF] bg-white/94 shadow-[0_26px_80px_rgba(7,27,58,0.1)] backdrop-blur-2xl"
            : "border-white/80 bg-white/82 shadow-[0_18px_54px_rgba(7,27,58,0.07)] backdrop-blur-xl"
        }`}
      >
        <Link
          href={localizePath("/", locale)}
          aria-label={messages.chrome.header.homeAriaLabel}
          className="shrink-0"
        >
          <BrandMark compact />
        </Link>

        <nav className="hidden min-w-0 flex-1 items-center justify-center gap-1 xl:flex 2xl:gap-2">
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

        <div className="hidden shrink-0 items-center xl:flex">
          <LanguageSwitcher className="w-[10rem] 2xl:w-[10.25rem]" />
        </div>

        <div className="flex min-w-0 items-center gap-1.5 sm:gap-2 xl:hidden">
          <LanguageSwitcher compact />
          <MobileNav />
        </div>
      </div>
    </header>
  );
}

function cnNav(active: boolean) {
  return [
    "relative rounded-full px-3 py-2 text-center text-sm font-medium leading-tight transition 2xl:px-4",
    active ? "text-[#071B3A]" : "text-slate-600 hover:text-blue-700",
  ].join(" ");
}
