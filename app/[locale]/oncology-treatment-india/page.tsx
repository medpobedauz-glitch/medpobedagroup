import { getRouteLocale } from "@/lib/i18n/request";
import { notFound } from "next/navigation";

import OncologyTreatmentIndiaPage from "@/app/oncology-treatment-india/page";
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
    "oncology-treatment-india",
    localizePath("/oncology-treatment-india", getRouteLocale(params?.locale)),
  );
}

export default function LocalizedOncologyTreatmentIndiaPage({ params }: LocalePageProps) {
  if (!isSupportedLocale(getRouteLocale(params?.locale))) {
    notFound();
  }

  return <OncologyTreatmentIndiaPage />;
}
