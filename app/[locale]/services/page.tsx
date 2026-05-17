import { notFound, redirect } from "next/navigation";

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
    "services",
    localizePath("/services", params.locale),
  );
}

export default function LocalizedServicesPage({ params }: LocalePageProps) {
  if (!isSupportedLocale(params.locale)) {
    notFound();
  }

  redirect(localizePath("/", params.locale));
}
