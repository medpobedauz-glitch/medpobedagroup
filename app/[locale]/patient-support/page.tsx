import { getRouteLocale } from "@/lib/i18n/request";
import { notFound } from "next/navigation";

import PatientSupportPage, { generateMetadata } from "@/app/patient-support/page";
import { isSupportedLocale } from "@/lib/i18n/config";

type LocalePageProps = {
  params: {
    locale: string;
  };
};

export default function LocalizedPatientSupportPage({ params }: LocalePageProps) {
  const locale = getRouteLocale(params?.locale);

  if (!isSupportedLocale(locale)) {
    notFound();
  }

  return <PatientSupportPage />;
}

export { generateMetadata };
