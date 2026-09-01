import { notFound } from "next/navigation";
import SpecialtyPage, { generateMetadata as generateSpecialtyMetadata } from "@/app/specialties/[slug]/page";
import { specialties } from "@/lib/data/doctors";
import { isSupportedLocale, locales } from "@/lib/i18n/config";
import { getRouteLocale } from "@/lib/i18n/request";
type Props = { params: { locale: string; slug: string } };
export function generateStaticParams() { return locales.flatMap((locale) => specialties.map(({ slug }) => ({ locale, slug }))); }
export function generateMetadata({ params }: Props) { return isSupportedLocale(getRouteLocale(params.locale)) ? generateSpecialtyMetadata({ params: { slug: params.slug } }) : {}; }
export default function LocalizedSpecialtyPage({ params }: Props) { if (!isSupportedLocale(getRouteLocale(params.locale))) notFound(); return <SpecialtyPage params={{ slug: params.slug }} />; }
