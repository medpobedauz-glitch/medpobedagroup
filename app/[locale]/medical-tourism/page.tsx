import { notFound } from "next/navigation";

import MedicalTourismPage from "@/app/medical-tourism/page";
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
    "medical-tourism",
    localizePath("/medical-tourism", params.locale),
  );
}

export default function LocalizedMedicalTourismPage({
  params,
  searchParams,
}: LocalePageProps) {
  if (!isSupportedLocale(params.locale)) {
    notFound();
  }

  return <MedicalTourismPage searchParams={searchParams} />;
}
