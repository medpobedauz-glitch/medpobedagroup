import { getRouteLocale } from "@/lib/i18n/request";
import { notFound } from "next/navigation";

import CardiologyTreatmentIndiaPage from "@/app/cardiology-treatment-india/page";
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
    "cardiology-treatment-india",
    localizePath("/cardiology-treatment-india", getRouteLocale(params?.locale)),
  );
}

export default function LocalizedCardiologyTreatmentIndiaPage({ params }: LocalePageProps) {
  if (!isSupportedLocale(getRouteLocale(params?.locale))) {
    notFound();
  }

  return <CardiologyTreatmentIndiaPage />;
}
