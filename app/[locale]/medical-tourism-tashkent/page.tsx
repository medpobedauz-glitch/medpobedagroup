import { getRouteLocale } from "@/lib/i18n/request";
import { notFound } from "next/navigation";

import MedicalTourismTashkentPage from "@/app/medical-tourism-tashkent/page";
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
    "medical-tourism-tashkent",
    localizePath("/medical-tourism-tashkent", getRouteLocale(params?.locale)),
  );
}

export default function LocalizedMedicalTourismTashkentPage({
  params,
}: LocalePageProps) {
  if (!isSupportedLocale(getRouteLocale(params?.locale))) {
    notFound();
  }

  return <MedicalTourismTashkentPage />;
}
