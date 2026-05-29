import { getRouteLocale } from "@/lib/i18n/request";
import { notFound } from "next/navigation";

import MedicalVisaSupportPage from "@/app/medical-visa-support/page";
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
    "medical-visa-support",
    localizePath("/medical-visa-support", getRouteLocale(params?.locale)),
  );
}

export default function LocalizedMedicalVisaSupportPage({
  params,
}: LocalePageProps) {
  if (!isSupportedLocale(getRouteLocale(params?.locale))) {
    notFound();
  }

  return <MedicalVisaSupportPage />;
}
