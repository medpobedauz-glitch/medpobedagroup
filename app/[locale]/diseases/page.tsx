import { notFound } from "next/navigation";

import DiseasesPage, {
  generateMetadata as generateDiseasesMetadata,
} from "@/app/diseases/page";
import { isSupportedLocale } from "@/lib/i18n/config";
import { getRouteLocale } from "@/lib/i18n/request";

type Props = {
  params: {
    locale: string;
  };
};

export function generateMetadata({ params }: Props) {
  if (!isSupportedLocale(getRouteLocale(params.locale))) return {};
  return generateDiseasesMetadata();
}

export default function LocalizedDiseasesPage({ params }: Props) {
  if (!isSupportedLocale(getRouteLocale(params.locale))) notFound();
  return <DiseasesPage />;
}
