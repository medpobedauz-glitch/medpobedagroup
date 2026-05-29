import { getRouteLocale } from "@/lib/i18n/request";
import { notFound } from "next/navigation";

import DoctorsPage, { generateMetadata } from "@/app/doctors/page";
import { isSupportedLocale } from "@/lib/i18n/config";

type LocalePageProps = {
  params: {
    locale: string;
  };
};

export default function LocalizedDoctorsPage({ params }: LocalePageProps) {
  if (!isSupportedLocale(getRouteLocale(params?.locale))) {
    notFound();
  }

  return <DoctorsPage />;
}

export { generateMetadata };
