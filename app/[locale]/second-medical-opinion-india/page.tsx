import { getRouteLocale } from "@/lib/i18n/request";
import { notFound } from "next/navigation";

import SecondMedicalOpinionIndiaPage from "@/app/second-medical-opinion-india/page";
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
    "second-medical-opinion-india",
    localizePath("/second-medical-opinion-india", getRouteLocale(params?.locale)),
  );
}

export default function LocalizedSecondMedicalOpinionIndiaPage({ params }: LocalePageProps) {
  if (!isSupportedLocale(getRouteLocale(params?.locale))) {
    notFound();
  }

  return <SecondMedicalOpinionIndiaPage />;
}
