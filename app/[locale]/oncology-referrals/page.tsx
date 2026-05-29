import { getRouteLocale } from "@/lib/i18n/request";
import { notFound } from "next/navigation";

import OncologyReferralsPage from "@/app/oncology-referrals/page";
import { createLocalizedPageMetadata } from "@/lib/i18n";
import { isSupportedLocale, localizePath } from "@/lib/i18n/config";

type LocalePageProps = {
  params: {
    locale: string;
  };
};

export async function generateMetadata({ params }: LocalePageProps) {
  if (!isSupportedLocale(getRouteLocale(params?.locale))) {
    return {};
  }

  return createLocalizedPageMetadata(
    getRouteLocale(params?.locale),
    "oncology-referrals",
    localizePath("/oncology-referrals", getRouteLocale(params?.locale)),
  );
}

export default function LocalizedOncologyReferralsPage({
  params,
}: LocalePageProps) {
  if (!isSupportedLocale(getRouteLocale(params?.locale))) {
    notFound();
  }

  return <OncologyReferralsPage />;
}
