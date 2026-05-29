import { getRouteLocale } from "@/lib/i18n/request";
import { notFound } from "next/navigation";

import TreatmentsPage from "@/app/treatments/page";
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
    "treatments",
    localizePath("/treatments", getRouteLocale(params?.locale)),
  );
}

export default function LocalizedTreatmentsPage({ params }: LocalePageProps) {
  if (!isSupportedLocale(getRouteLocale(params?.locale))) {
    notFound();
  }

  return <TreatmentsPage />;
}
