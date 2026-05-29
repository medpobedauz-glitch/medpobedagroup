import { getRouteLocale } from "@/lib/i18n/request";
import { notFound } from "next/navigation";

import OrthopedicTreatmentIndiaPage from "@/app/orthopedic-treatment-india/page";
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
    "orthopedic-treatment-india",
    localizePath("/orthopedic-treatment-india", getRouteLocale(params?.locale)),
  );
}

export default function LocalizedOrthopedicTreatmentIndiaPage({ params }: LocalePageProps) {
  if (!isSupportedLocale(getRouteLocale(params?.locale))) {
    notFound();
  }

  return <OrthopedicTreatmentIndiaPage />;
}
