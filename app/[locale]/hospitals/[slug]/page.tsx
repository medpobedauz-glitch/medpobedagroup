import { notFound } from "next/navigation";

import HospitalDetailPage, {
  generateMetadata as generateHospitalMetadata,
} from "@/app/hospitals/[slug]/page";
import { featuredHospitals } from "@/lib/hospital-pages";
import { isSupportedLocale, locales } from "@/lib/i18n/config";
import { getRouteLocale } from "@/lib/i18n/request";

type LocaleHospitalPageProps = {
  params: {
    locale: string;
    slug: string;
  };
};

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    featuredHospitals.map((hospital) => ({ locale, slug: hospital.slug })),
  );
}

export function generateMetadata({ params }: LocaleHospitalPageProps) {
  if (!isSupportedLocale(getRouteLocale(params?.locale))) {
    return {};
  }

  return generateHospitalMetadata({ params: { slug: params.slug } });
}

export default function LocalizedHospitalDetailPage({
  params,
}: LocaleHospitalPageProps) {
  if (!isSupportedLocale(getRouteLocale(params?.locale))) {
    notFound();
  }

  return <HospitalDetailPage params={{ slug: params.slug }} />;
}
