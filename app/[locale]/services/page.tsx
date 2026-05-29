import { getRouteLocale } from "@/lib/i18n/request";
import { notFound } from "next/navigation";

import { createLocalizedPageMetadata } from "@/lib/i18n";
import { isSupportedLocale, localizePath } from "@/lib/i18n/config";
import ServicesPage from "@/app/services/page";

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
    "services",
    localizePath("/services", getRouteLocale(params?.locale)),
  );
}

export default function LocalizedServicesPage({ params }: LocalePageProps) {
  if (!isSupportedLocale(getRouteLocale(params?.locale))) {
    notFound();
  }

  return <ServicesPage />;
}
