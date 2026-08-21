import { getRouteLocale } from "@/lib/i18n/request";
import { notFound } from "next/navigation";

import OthersPage from "@/app/others/page";
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
    "others",
    localizePath("/others", getRouteLocale(params?.locale)),
  );
}

export default function LocalizedOthersPage({ params }: LocalePageProps) {
  if (!isSupportedLocale(getRouteLocale(params?.locale))) {
    notFound();
  }

  return <OthersPage />;
}
