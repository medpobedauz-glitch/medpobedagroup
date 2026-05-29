import { getRouteLocale } from "@/lib/i18n/request";
import { notFound } from "next/navigation";

import HospitalPartnershipsPage from "@/app/hospital-partnerships/page";
import { createLocalizedPageMetadata } from "@/lib/i18n";
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

export async function generateMetadata({ params }: LocalePageProps) {
  if (!isSupportedLocale(getRouteLocale(params?.locale))) {
    return {};
  }

  return createLocalizedPageMetadata(
    getRouteLocale(params?.locale),
    "hospital-partnerships",
    localizePath("/hospital-partnerships", getRouteLocale(params?.locale)),
  );
}

export default function LocalizedHospitalPartnershipsPage({
  params,
  searchParams,
}: LocalePageProps) {
  if (!isSupportedLocale(getRouteLocale(params?.locale))) {
    notFound();
  }

  return <HospitalPartnershipsPage searchParams={searchParams} />;
}
