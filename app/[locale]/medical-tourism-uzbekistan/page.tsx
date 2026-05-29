import { getRouteLocale } from "@/lib/i18n/request";
import { notFound } from "next/navigation";

import MedicalTourismUzbekistanPage from "@/app/medical-tourism-uzbekistan/page";
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
    "medical-tourism-uzbekistan",
    localizePath("/medical-tourism-uzbekistan", getRouteLocale(params?.locale)),
  );
}

export default function LocalizedMedicalTourismUzbekistanPage({
  params,
}: LocalePageProps) {
  if (!isSupportedLocale(getRouteLocale(params?.locale))) {
    notFound();
  }

  return <MedicalTourismUzbekistanPage />;
}
