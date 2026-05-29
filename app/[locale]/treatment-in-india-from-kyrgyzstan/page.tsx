import { getRouteLocale } from "@/lib/i18n/request";
import { notFound } from "next/navigation";

import TreatmentInIndiaFromKyrgyzstanPage from "@/app/treatment-in-india-from-kyrgyzstan/page";
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
    "treatment-in-india-from-kyrgyzstan",
    localizePath("/treatment-in-india-from-kyrgyzstan", getRouteLocale(params?.locale)),
  );
}

export default function LocalizedTreatmentInIndiaFromKyrgyzstanPage({
  params,
}: LocalePageProps) {
  if (!isSupportedLocale(getRouteLocale(params?.locale))) {
    notFound();
  }

  return <TreatmentInIndiaFromKyrgyzstanPage />;
}
