import { notFound } from "next/navigation";

import InternationalPatientsPage from "@/app/international-patients/page";
import { createLocalizedPageMetadata } from "@/lib/i18n";
import { isSupportedLocale, localizePath } from "@/lib/i18n/config";

type LocalePageProps = {
  params: {
    locale: string;
  };
  searchParams?: {
    submitted?: string;
    error?: string;
  };
};

export async function generateMetadata({ params }: LocalePageProps) {
  if (!isSupportedLocale(params.locale)) {
    return {};
  }

  return createLocalizedPageMetadata(
    params.locale,
    "international-patients",
    localizePath("/international-patients", params.locale),
  );
}

export default function LocalizedInternationalPatientsPage({
  params,
  searchParams,
}: LocalePageProps) {
  if (!isSupportedLocale(params.locale)) {
    notFound();
  }

  return <InternationalPatientsPage searchParams={searchParams} />;
}
