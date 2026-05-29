import { getRouteLocale } from "@/lib/i18n/request";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";

import {
  getLocaleDirection,
  isSupportedLocale,
  locales,
  type AppLocale,
} from "@/lib/i18n/config";

type LocaleLayoutProps = {
  children: ReactNode;
  params: {
    locale: string;
  };
};

export default function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  if (!isSupportedLocale(getRouteLocale(params?.locale))) {
    notFound();
  }

  const locale = getRouteLocale(params?.locale) as AppLocale;

  return (
    <div lang={locale} dir={getLocaleDirection(locale)}>
      {children}
    </div>
  );
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}
