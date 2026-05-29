import type { AppLocale, LocalizedRouteKey } from "@/lib/i18n/config";
import {
  stripLocaleFromPath,
} from "@/lib/i18n/config";
import { getMessages } from "@/lib/i18n/messages";
import { createMetadata } from "@/lib/metadata";

export function createLocalizedPageMetadata(
  locale: AppLocale,
  routeKey: LocalizedRouteKey,
  path: string,
) {
  const messages = getMessages(locale);
  // Access route dynamically; cast to any to avoid strict key checking (some routes like "doctors" may be missing in certain locales).
  const route = (messages.routes as any)[routeKey];
  const normalizedPath = stripLocaleFromPath(path);
  return createMetadata({
    title: route.title,
    description: route.description,
    path: normalizedPath,
    locale,
    keywords: route.keywords,
    ogTitle: route.openGraphTitle,
    ogDescription: route.openGraphDescription,
  });
}

export { getMessages } from "@/lib/i18n/messages";
export { I18nProvider, useLocale, useMessages } from "@/lib/i18n/provider";
