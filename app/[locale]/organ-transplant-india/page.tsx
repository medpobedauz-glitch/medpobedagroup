import { getRouteLocale } from "@/lib/i18n/request";
import { notFound } from "next/navigation";

import OrganTransplantIndiaPage from "@/app/organ-transplant-india/page";
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
    "organ-transplant-india",
    localizePath("/organ-transplant-india", getRouteLocale(params?.locale)),
  );
}

export default function LocalizedOrganTransplantIndiaPage({ params }: LocalePageProps) {
  if (!isSupportedLocale(getRouteLocale(params?.locale))) {
    notFound();
  }

  return <OrganTransplantIndiaPage />;
}
