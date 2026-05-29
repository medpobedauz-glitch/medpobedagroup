import { getRouteLocale } from "@/lib/i18n/request";
import { notFound } from "next/navigation";

import NeurosurgeryTreatmentIndiaPage from "@/app/neurosurgery-treatment-india/page";
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
    "neurosurgery-treatment-india",
    localizePath("/neurosurgery-treatment-india", getRouteLocale(params?.locale)),
  );
}

export default function LocalizedNeurosurgeryTreatmentIndiaPage({ params }: LocalePageProps) {
  if (!isSupportedLocale(getRouteLocale(params?.locale))) {
    notFound();
  }

  return <NeurosurgeryTreatmentIndiaPage />;
}
