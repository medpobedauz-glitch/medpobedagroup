import { getRouteLocale } from "@/lib/i18n/request";
import { notFound } from "next/navigation";

import PrivacyPolicyPage from "@/app/privacy-policy/page";
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
    "privacy-policy",
    localizePath("/privacy-policy", getRouteLocale(params?.locale)),
  );
}

export default function LocalizedPrivacyPolicyPage({ params }: LocalePageProps) {
  if (!isSupportedLocale(getRouteLocale(params?.locale))) {
    notFound();
  }

  return <PrivacyPolicyPage />;
}
