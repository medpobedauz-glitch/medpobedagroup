import { getRouteLocale } from "@/lib/i18n/request";
import { notFound } from "next/navigation";

import KimsHospitalsIndiaPage from "@/app/kims-hospitals-india/page";
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
    "kims-hospitals-india",
    localizePath("/kims-hospitals-india", getRouteLocale(params?.locale)),
  );
}

export default function LocalizedKimsHospitalsIndiaPage({
  params,
}: LocalePageProps) {
  if (!isSupportedLocale(getRouteLocale(params?.locale))) {
    notFound();
  }

  return <KimsHospitalsIndiaPage />;
}
