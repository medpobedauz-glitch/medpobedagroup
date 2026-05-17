import { notFound } from "next/navigation";

import AboutPage from "@/app/about/page";
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
    "about",
    localizePath("/about", params.locale),
  );
}

export default function LocalizedAboutPage({ params }: LocalePageProps) {
  if (!isSupportedLocale(params.locale)) {
    notFound();
  }

  return <AboutPage />;
}
