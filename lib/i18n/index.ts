import type { AppLocale, LocalizedRouteKey } from "@/lib/i18n/config";
import {
  defaultLocale,
  localeHreflangMap,
  localeOpenGraphMap,
  locales,
  localizePath,
  stripLocaleFromPath,
} from "@/lib/i18n/config";
import { getMessages } from "@/lib/i18n/messages";
import { absoluteUrl } from "@/lib/metadata";
import { createMetadata } from "@/lib/metadata";

export function createLocalizedPageMetadata(
  locale: AppLocale,
  routeKey: LocalizedRouteKey,
  path: string,
) {
  const messages = getMessages(locale);
  const route = messages.routes[routeKey];
  const normalizedPath = stripLocaleFromPath(path);
  const canonicalPath = localizePath(normalizedPath, locale);
  const metadata = createMetadata({
    title: route.title,
    description: route.description,
    path: canonicalPath,
  });

  return {
    ...metadata,
    alternates: {
      canonical: absoluteUrl(canonicalPath),
      languages: Object.fromEntries(
        [
          ...locales.map((item) => [
            localeHreflangMap[item],
            absoluteUrl(localizePath(normalizedPath, item)),
          ]),
          ["x-default", absoluteUrl(localizePath(normalizedPath, defaultLocale))],
        ],
      ),
    },
    openGraph: {
      ...metadata.openGraph,
      locale: localeOpenGraphMap[locale],
    },
  };
}

export { getMessages } from "@/lib/i18n/messages";
export { I18nProvider, useLocale, useMessages } from "@/lib/i18n/provider";
