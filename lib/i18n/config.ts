export const locales = ["uz", "ky", "en", "kk", "tg", "tk", "ru"] as const;

export type AppLocale = (typeof locales)[number];
export type LocalePreferenceSource = "auto" | "manual";

export const defaultLocale: AppLocale = "en";
export const rtlLocales: AppLocale[] = [];

export const LOCALE_COOKIE_NAME = "medpobeda-locale";
export const LOCALE_SOURCE_COOKIE_NAME = "medpobeda-locale-source";
export const LOCALE_HEADER_NAME = "x-medpobeda-locale";

export const localeLabels: Record<AppLocale, string> = {
  uz: "Uzbek",
  ky: "Kyrgyz",
  en: "English",
  kk: "Kazakh",
  tg: "Tajik",
  tk: "Turkmen",
  ru: "Russian",
};

export const localeFlags: Record<AppLocale, string> = {
  uz: "🇺🇿",
  ky: "🇰🇬",
  en: "🇮🇳",
  kk: "🇰🇿",
  tg: "🇹🇯",
  tk: "🇹🇲",
  ru: "🇷🇺",
};

export const localeOpenGraphMap: Record<AppLocale, string> = {
  uz: "uz_UZ",
  ky: "ky_KG",
  en: "en_US",
  kk: "kk_KZ",
  tg: "tg_TJ",
  tk: "tk_TM",
  ru: "ru_RU",
};

export const localeHreflangMap: Record<AppLocale, string> = {
  uz: "uz",
  ky: "ky",
  en: "en",
  kk: "kk",
  tg: "tg",
  tk: "tk",
  ru: "ru",
};

export const countryToLocaleMap: Record<string, AppLocale> = {
  UZ: "uz",
  KG: "ky",
  IN: "en",
  KZ: "kk",
  TJ: "tg",
  TM: "tk",
  RU: "ru",
};

const languagePrefixToLocaleMap: Array<[string, AppLocale]> = [
  ["uz", "uz"],
  ["ky", "ky"],
  ["kk", "kk"],
  ["tg", "tg"],
  ["tk", "tk"],
  ["ru", "ru"],
  ["en", "en"],
  ["hi", "en"],
];

export function isSupportedLocale(value: string): value is AppLocale {
  return locales.includes(value as AppLocale);
}

export function getLocaleDirection(locale: AppLocale) {
  return rtlLocales.includes(locale) ? "rtl" : "ltr";
}

export function getPathLocale(pathname: string) {
  const [firstSegment] = pathname.split("/").filter(Boolean);
  return firstSegment && isSupportedLocale(firstSegment) ? firstSegment : null;
}

export function getLocaleFromPathname(pathname: string) {
  return getPathLocale(pathname) ?? defaultLocale;
}

export function stripLocaleFromPath(pathname: string) {
  const segments = pathname.split("/").filter(Boolean);

  if (segments[0] && isSupportedLocale(segments[0])) {
    const stripped = `/${segments.slice(1).join("/")}`;
    return stripped === "/" ? "/" : stripped.replace(/\/+$/, "") || "/";
  }

  return pathname === "" ? "/" : pathname.replace(/\/+$/, "") || "/";
}

export function localizePath(pathname: string, locale: AppLocale) {
  const normalized = stripLocaleFromPath(pathname);

  return normalized === "/" ? `/${locale}` : `/${locale}${normalized}`;
}

export function resolveLocaleFromCountry(countryCode?: string | null) {
  if (!countryCode) {
    return null;
  }

  return countryToLocaleMap[countryCode.toUpperCase()] ?? null;
}

export function resolveLocaleFromAcceptLanguage(headerValue?: string | null) {
  if (!headerValue) {
    return null;
  }

  const tags = headerValue
    .split(",")
    .map((item) => item.split(";")[0]?.trim().toLowerCase())
    .filter(Boolean) as string[];

  for (const tag of tags) {
    for (const [prefix, locale] of languagePrefixToLocaleMap) {
      if (tag === prefix || tag.startsWith(`${prefix}-`)) {
        return locale;
      }
    }
  }

  return null;
}

export const localizedRouteKeys = [
  "home",
  "about",
  "services",
  "medical-tourism",
  "hospital-partnerships",
  "international-patients",
  "student-mobility",
  "contact",
  "blog",
  "privacy-policy",
  "terms",
] as const;

export type LocalizedRouteKey = (typeof localizedRouteKeys)[number];

const routeKeyByPath: Record<string, LocalizedRouteKey> = {
  "/": "home",
  "/about": "about",
  "/services": "services",
  "/medical-tourism": "medical-tourism",
  "/hospital-partnerships": "hospital-partnerships",
  "/international-patients": "international-patients",
  "/student-mobility": "student-mobility",
  "/contact": "contact",
  "/blog": "blog",
  "/privacy-policy": "privacy-policy",
  "/terms": "terms",
};

export function getRouteKeyForPath(pathname: string) {
  return routeKeyByPath[stripLocaleFromPath(pathname)] ?? null;
}

export function isPublicAssetPath(pathname: string) {
  return (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/images") ||
    pathname.startsWith("/icons") ||
    pathname.startsWith("/storage") ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml" ||
    /\.[a-zA-Z0-9]+$/.test(pathname)
  );
}
