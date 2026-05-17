import { notFound } from "next/navigation";

import TermsPage from "@/app/terms/page";
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
    "terms",
    localizePath("/terms", params.locale),
  );
}

export default function LocalizedTermsPage({ params }: LocalePageProps) {
  if (!isSupportedLocale(params.locale)) {
    notFound();
  }

  return <TermsPage />;
}
