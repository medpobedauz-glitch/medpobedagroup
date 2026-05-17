import { notFound } from "next/navigation";

import ContactPage from "@/app/contact/page";
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
    "contact",
    localizePath("/contact", params.locale),
  );
}

export default function LocalizedContactPage({
  params,
  searchParams,
}: LocalePageProps) {
  if (!isSupportedLocale(params.locale)) {
    notFound();
  }

  return <ContactPage searchParams={searchParams} />;
}
