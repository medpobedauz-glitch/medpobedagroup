import { getRouteLocale } from "@/lib/i18n/request";
import { notFound } from "next/navigation";

import TreatmentInIndiaFromKazakhstanPage from "@/app/treatment-in-india-from-kazakhstan/page";
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
    "treatment-in-india-from-kazakhstan",
    localizePath("/treatment-in-india-from-kazakhstan", getRouteLocale(params?.locale)),
  );
}

export default function LocalizedTreatmentInIndiaFromKazakhstanPage({
  params,
}: LocalePageProps) {
  if (!isSupportedLocale(getRouteLocale(params?.locale))) {
    notFound();
  }

  return <TreatmentInIndiaFromKazakhstanPage />;
}
