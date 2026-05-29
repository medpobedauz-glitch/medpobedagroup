import { notFound } from "next/navigation";

import DoctorSpecialtyPage, {
  generateMetadata as generateDoctorMetadata,
} from "@/app/doctors/[slug]/page";
import { doctorSpecialtyPages } from "@/lib/doctor-specialty-pages";
import { isSupportedLocale, locales } from "@/lib/i18n/config";
import { getRouteLocale } from "@/lib/i18n/request";

type LocaleDoctorPageProps = {
  params: {
    locale: string;
    slug: string;
  };
};

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    doctorSpecialtyPages.map((page) => ({ locale, slug: page.slug })),
  );
}

export function generateMetadata({ params }: LocaleDoctorPageProps) {
  if (!isSupportedLocale(getRouteLocale(params?.locale))) {
    return {};
  }

  return generateDoctorMetadata({ params: { slug: params.slug } });
}

export default function LocalizedDoctorSpecialtyPage({
  params,
}: LocaleDoctorPageProps) {
  if (!isSupportedLocale(getRouteLocale(params?.locale))) {
    notFound();
  }

  return <DoctorSpecialtyPage params={{ slug: params.slug }} />;
}
