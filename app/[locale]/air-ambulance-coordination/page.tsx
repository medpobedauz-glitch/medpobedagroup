import { getRouteLocale } from "@/lib/i18n/request";
import { notFound } from "next/navigation";

import AirAmbulanceCoordinationPage from "@/app/air-ambulance-coordination/page";
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
    "air-ambulance-coordination",
    localizePath("/air-ambulance-coordination", getRouteLocale(params?.locale)),
  );
}

export default function LocalizedAirAmbulanceCoordinationPage({
  params,
}: LocalePageProps) {
  if (!isSupportedLocale(getRouteLocale(params?.locale))) {
    notFound();
  }

  return <AirAmbulanceCoordinationPage />;
}
