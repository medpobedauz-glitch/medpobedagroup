import { getRouteLocale } from "@/lib/i18n/request";
import { notFound } from "next/navigation";

import InternationalPatientCarePage from "@/app/international-patient-care/page";
import { createInternationalPatientCareMetadata } from "@/lib/international-patient-care";
import { isSupportedLocale } from "@/lib/i18n/config";

type LocalePageProps = {
  params: {
    locale: string;
  };
  searchParams?: {
    submitted?: string;
    error?: string;
  };
};

export async function generateMetadata({ params }: LocalePageProps) {
  const locale = getRouteLocale(params?.locale);

  if (!isSupportedLocale(locale)) {
    return {};
  }

  return createInternationalPatientCareMetadata(locale);
}

export default function LocalizedInternationalPatientCarePage({
  params,
  searchParams,
}: LocalePageProps) {
  if (!isSupportedLocale(getRouteLocale(params?.locale))) {
    notFound();
  }

  return <InternationalPatientCarePage searchParams={searchParams} />;
}
