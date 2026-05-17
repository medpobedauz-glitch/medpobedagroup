"use client";

import { ChevronDown, Languages } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

import {
  type AppLocale,
  getLocaleFromPathname,
  localeFlags,
  localeLabels,
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
};

export function LanguageSwitcher({
  className,
  fullWidth = false,
}: LanguageSwitcherProps) {
  const router = useRouter();
  const pathname = usePathname();
  const activeLocale = getLocaleFromPathname(pathname);
  const messages = useMessages();
  const [isPending, setIsPending] = useState(false);

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
        fullWidth ? "w-full" : "w-[11.75rem]",
        className,
      )}
    >
      <Languages className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-blue-700" />
      <select
        aria-label={messages.chrome.languageSwitcher.ariaLabel}
        value={activeLocale}
        disabled={isPending}
        onChange={(event) => handleChange(event.target.value)}
        className={cn(
          "h-11 w-full appearance-none rounded-full border border-[#D6E8FF] bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(248,251,255,0.92))] pl-11 pr-10 text-sm font-semibold text-[#071B3A] shadow-[0_14px_36px_rgba(7,27,58,0.06)] outline-none transition focus:border-[#1D4ED8] focus:ring-2 focus:ring-[#BFDBFE]",
          fullWidth && "rounded-[1.2rem] bg-white",
          isPending && "opacity-80",
        )}
      >
        {locales.map((locale) => (
          <option key={locale} value={locale}>
            {localeFlags[locale]} {localeLabels[locale]}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
    </div>
  );
}
