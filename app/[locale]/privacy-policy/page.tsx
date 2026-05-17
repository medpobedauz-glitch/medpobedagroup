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
  if (!isSupportedLocale(params.locale)) {
    return {};
  }

  return createLocalizedPageMetadata(
    params.locale,
    "privacy-policy",
    localizePath("/privacy-policy", params.locale),
  );
}

export default function LocalizedPrivacyPolicyPage({ params }: LocalePageProps) {
  if (!isSupportedLocale(params.locale)) {
    notFound();
  }

  return <PrivacyPolicyPage />;
}
