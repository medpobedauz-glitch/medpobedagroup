import { notFound } from "next/navigation";

import MedicalDisclaimerPage from "@/app/medical-disclaimer/page";
import { createLocalizedPageMetadata } from "@/lib/i18n";
import { isSupportedLocale, localizePath } from "@/lib/i18n/config";

type LocalePageProps = {
  params: {
    locale: string;
  };
};

export async function generateMetadata({ params }: LocalePageProps) {
  if (!isSupportedLocale(params.locale)) {
    return {};
  }

  return createLocalizedPageMetadata(
    params.locale,
    "medical-disclaimer",
    localizePath("/medical-disclaimer", params.locale),
  );
}

export default function LocalizedMedicalDisclaimerPage({ params }: LocalePageProps) {
  if (!isSupportedLocale(params.locale)) {
    notFound();
  }

  return <MedicalDisclaimerPage />;
}
