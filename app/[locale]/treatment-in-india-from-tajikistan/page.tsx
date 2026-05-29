import { getRouteLocale } from "@/lib/i18n/request";
import { notFound } from "next/navigation";

import TreatmentInIndiaFromTajikistanPage from "@/app/treatment-in-india-from-tajikistan/page";
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
    "treatment-in-india-from-tajikistan",
    localizePath("/treatment-in-india-from-tajikistan", getRouteLocale(params?.locale)),
  );
}

export default function LocalizedTreatmentInIndiaFromTajikistanPage({
  params,
}: LocalePageProps) {
  if (!isSupportedLocale(getRouteLocale(params?.locale))) {
    notFound();
  }

  return <TreatmentInIndiaFromTajikistanPage />;
}
