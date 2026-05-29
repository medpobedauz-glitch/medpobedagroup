import { getRouteLocale } from "@/lib/i18n/request";
import { notFound } from "next/navigation";

import HospitalsPage, { generateMetadata } from "@/app/hospitals/page";
import { isSupportedLocale } from "@/lib/i18n/config";

type LocalePageProps = {
  params: {
    locale: string;
  };
};

export default function LocalizedHospitalsPage({ params }: LocalePageProps) {
  if (!isSupportedLocale(getRouteLocale(params?.locale))) {
    notFound();
  }

  return <HospitalsPage />;
}

export { generateMetadata };
