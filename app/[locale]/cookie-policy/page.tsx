import { notFound } from "next/navigation";

import CookiePolicyPage from "@/app/cookie-policy/page";
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
    "cookie-policy",
    localizePath("/cookie-policy", params.locale),
  );
}

export default function LocalizedCookiePolicyPage({ params }: LocalePageProps) {
  if (!isSupportedLocale(params.locale)) {
    notFound();
  }

  return <CookiePolicyPage />;
}
