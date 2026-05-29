import { getRouteLocale } from "@/lib/i18n/request";
import { notFound, permanentRedirect } from "next/navigation";

import { isSupportedLocale, localizePath } from "@/lib/i18n/config";

type LocalePageProps = {
  params: {
    locale: string;
  };
  searchParams?: {
    submitted?: string;
    error?: string;
  };
};

export default function LocalizedMedicalTourismPage({
  params,
}: LocalePageProps) {
  const locale = getRouteLocale(params?.locale);

  if (!isSupportedLocale(locale)) {
    notFound();
  }

  permanentRedirect(localizePath("/international-patient-care", locale));
}
