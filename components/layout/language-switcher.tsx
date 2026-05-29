"use client";

import { ChevronDown, Languages } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

import {
  type AppLocale,
  getLocaleFromPathname,
  localeFlags,
  locales,
  localizePath,
  LOCALE_COOKIE_NAME,
  LOCALE_SOURCE_COOKIE_NAME,
} from "@/lib/i18n/config";
import { useMessages } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type LanguageSwitcherProps = {
  className?: string;
  fullWidth?: boolean;
  compact?: boolean;
};

export function LanguageSwitcher({
  className,
  fullWidth = false,
  compact = false,
}: LanguageSwitcherProps) {
  const router = useRouter();
  const pathname = usePathname();
  const activeLocale = getLocaleFromPathname(pathname);
  const messages = useMessages();
  const [isPending, setIsPending] = useState(false);
  const localeNames = messages.chrome.languageSwitcher.localeNames as Record<AppLocale, string>;

  function handleChange(nextLocale: string) {
    const locale = nextLocale as AppLocale;
    if (locale === activeLocale) {
      return;
    }

    const targetPath = localizePath(pathname, locale);

    if (typeof window === "undefined") {
      return;
    }

    setIsPending(true);

    // Manual selection overrides geo detection. Middleware reads these values
    // on future unprefixed visits and keeps routing the user to this locale.
    document.cookie = `${LOCALE_COOKIE_NAME}=${locale};path=/;max-age=31536000;SameSite=Lax`;
    document.cookie = `${LOCALE_SOURCE_COOKIE_NAME}=manual;path=/;max-age=31536000;SameSite=Lax`;
    window.localStorage.setItem(LOCALE_COOKIE_NAME, locale);
    window.localStorage.setItem(LOCALE_SOURCE_COOKIE_NAME, "manual");

    router.push(targetPath);
    router.refresh();
  }

  return (
    <div
      className={cn(
        "relative min-w-0",
        fullWidth ? "w-full" : compact ? "w-[4.35rem] min-[360px]:w-[4.75rem] sm:w-[5.2rem]" : "w-[10.75rem]",
        className,
      )}
    >
      {!compact ? (
        <Languages className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-blue-700" />
      ) : null}
      <select
        aria-label={messages.chrome.languageSwitcher.ariaLabel}
        value={activeLocale}
        disabled={isPending}
        onChange={(event) => handleChange(event.target.value)}
        className={cn(
          "min-h-[2.75rem] w-full appearance-none rounded-full border border-[#D6E8FF] bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(246,250,255,0.94))] pr-10 text-sm font-semibold text-[#071B3A] shadow-[0_14px_36px_rgba(7,27,58,0.05)] outline-none transition focus:border-[#1D4ED8] focus:ring-2 focus:ring-[#BFDBFE]",
          compact
            ? "pl-2.5 pr-7 text-[0.68rem] font-bold uppercase tracking-[0.12em] min-[360px]:pl-3 min-[360px]:text-[0.76rem] min-[360px]:tracking-[0.16em]"
            : "pl-11",
          fullWidth && "rounded-[1.2rem] bg-white",
          isPending && "opacity-80",
        )}
      >
        {locales.map((locale) => (
          <option key={locale} value={locale}>
            {compact
              ? `${localeFlags[locale]} ${locale.toUpperCase()}`
              : `${localeFlags[locale]} ${localeNames[locale]}`}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500 sm:right-4" />
    </div>
  );
}
