import { getRouteLocale } from "@/lib/i18n/request";
import { notFound } from "next/navigation";

import CompanyProfilePage from "@/app/company-profile/page";
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
    "company-profile",
    localizePath("/company-profile", getRouteLocale(params?.locale)),
  );
}

export default function LocalizedCompanyProfilePage({ params }: LocalePageProps) {
  if (!isSupportedLocale(getRouteLocale(params?.locale))) {
    notFound();
  }

  return <CompanyProfilePage />;
}
