import { getRouteLocale } from "@/lib/i18n/request";
import { notFound } from "next/navigation";

import TreatmentInIndiaFromUzbekistanPage from "@/app/treatment-in-india-from-uzbekistan/page";
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
    "treatment-in-india-from-uzbekistan",
    localizePath("/treatment-in-india-from-uzbekistan", getRouteLocale(params?.locale)),
  );
}

export default function LocalizedTreatmentInIndiaFromUzbekistanPage({
  params,
}: LocalePageProps) {
  if (!isSupportedLocale(getRouteLocale(params?.locale))) {
    notFound();
  }

  return <TreatmentInIndiaFromUzbekistanPage />;
}
