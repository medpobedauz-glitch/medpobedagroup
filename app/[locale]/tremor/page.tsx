import { notFound } from "next/navigation";

import TremorPage, { generateMetadata as generateBaseMetadata } from "@/app/tremor/page";
import { isSupportedLocale } from "@/lib/i18n/config";
import { getRouteLocale } from "@/lib/i18n/request";

type LocalePageProps = {
  params: {
    locale: string;
  };
};

export function generateMetadata({ params }: LocalePageProps) {
  if (!isSupportedLocale(getRouteLocale(params.locale))) return {};
  return generateBaseMetadata();
}

export default function LocalizedTremorPage({ params }: LocalePageProps) {
  if (!isSupportedLocale(getRouteLocale(params.locale))) notFound();
  return <TremorPage />;
}
