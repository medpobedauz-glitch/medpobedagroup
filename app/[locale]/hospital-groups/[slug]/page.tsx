import { notFound } from "next/navigation";

import HospitalGroupPage, { generateMetadata as generateGroupMetadata } from "@/app/hospital-groups/[slug]/page";
import { isSupportedLocale } from "@/lib/i18n/config";
import { getRouteLocale } from "@/lib/i18n/request";

type Props = { params: { locale: string; slug: string } };

export function generateMetadata({ params }: Props) {
  if (!isSupportedLocale(getRouteLocale(params.locale))) return {};
  return generateGroupMetadata({ params: { slug: params.slug } });
}

export default function LocalizedHospitalGroupPage({ params }: Props) {
  if (!isSupportedLocale(getRouteLocale(params.locale))) notFound();
  return <HospitalGroupPage params={{ slug: params.slug }} />;
}
