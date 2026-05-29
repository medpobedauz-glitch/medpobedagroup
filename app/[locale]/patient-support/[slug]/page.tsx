import { notFound } from "next/navigation";

import PatientSupportDetailPage, {
  generateMetadata as generatePatientSupportMetadata,
} from "@/app/patient-support/[slug]/page";
import { isSupportedLocale, locales } from "@/lib/i18n/config";
import { getRouteLocale } from "@/lib/i18n/request";
import { patientSupportPages } from "@/lib/patient-support-pages";

type LocalePatientSupportPageProps = {
  params: {
    locale: string;
    slug: string;
  };
};

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    patientSupportPages.map((page) => ({ locale, slug: page.slug })),
  );
}

export function generateMetadata({ params }: LocalePatientSupportPageProps) {
  if (!isSupportedLocale(getRouteLocale(params?.locale))) {
    return {};
  }

  return generatePatientSupportMetadata({ params: { slug: params.slug } });
}

export default function LocalizedPatientSupportDetailPage({
  params,
}: LocalePatientSupportPageProps) {
  if (!isSupportedLocale(getRouteLocale(params?.locale))) {
    notFound();
  }

  return <PatientSupportDetailPage params={{ slug: params.slug }} />;
}
