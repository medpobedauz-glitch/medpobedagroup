import { getRouteLocale } from "@/lib/i18n/request";
import { notFound } from "next/navigation";

import TermsPage from "@/app/terms/page";
import { createLocalizedPageMetadata } from "@/lib/i18n";
import { isSupportedLocale, localizePath } from "@/lib/i18n/config";

type LocalePageProps = {
  params: {
    locale: string;
  };
};

export async function generateMetadata({ params }: LocalePageProps) {
  if (!isSupportedLocale(getRouteLocale(params?.locale))) {
    return {};
  }

  return createLocalizedPageMetadata(
    getRouteLocale(params?.locale),
    "terms",
    localizePath("/terms", getRouteLocale(params?.locale)),
  );
}

export default function LocalizedTermsPage({ params }: LocalePageProps) {
  if (!isSupportedLocale(getRouteLocale(params?.locale))) {
    notFound();
  }

  return <TermsPage />;
}
