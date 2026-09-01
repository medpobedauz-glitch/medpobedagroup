import { notFound } from "next/navigation";

import TreatmentPage, { generateMetadata as generateTreatmentMetadata } from "@/app/treatments/[slug]/page";
import { treatments } from "@/lib/data/treatments";
import { isSupportedLocale, locales } from "@/lib/i18n/config";
import { getRouteLocale } from "@/lib/i18n/request";

type Props = { params: { locale: string; slug: string } };

export function generateStaticParams() {
  return locales.flatMap((locale) => treatments.map(({ slug }) => ({ locale, slug })));
}

export function generateMetadata({ params }: Props) {
  if (!isSupportedLocale(getRouteLocale(params.locale))) return {};
  return generateTreatmentMetadata({ params: { slug: params.slug } });
}

export default function LocalizedTreatmentPage({ params }: Props) {
  if (!isSupportedLocale(getRouteLocale(params.locale))) notFound();
  return <TreatmentPage params={{ slug: params.slug }} />;
}
