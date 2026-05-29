import { getRouteLocale } from "@/lib/i18n/request";
import { notFound } from "next/navigation";

import OrganTransplantCoordinationPage from "@/app/organ-transplant-coordination/page";
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
    "organ-transplant-coordination",
    localizePath("/organ-transplant-coordination", getRouteLocale(params?.locale)),
  );
}

export default function LocalizedOrganTransplantCoordinationPage({
  params,
}: LocalePageProps) {
  if (!isSupportedLocale(getRouteLocale(params?.locale))) {
    notFound();
  }

  return <OrganTransplantCoordinationPage />;
}
