import { notFound } from "next/navigation";

import DiseasePage, {
  generateMetadata as generateDiseaseMetadata,
} from "@/app/diseases/[slug]/page";
import { diseases } from "@/lib/data/diseases";
import { isSupportedLocale, locales } from "@/lib/i18n/config";
import { getRouteLocale } from "@/lib/i18n/request";

type Props = {
  params: {
    locale: string;
    slug: string;
  };
};

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    diseases.map(({ slug }) => ({ locale, slug })),
  );
}

export function generateMetadata({ params }: Props) {
  if (!isSupportedLocale(getRouteLocale(params.locale))) return {};
  return generateDiseaseMetadata({ params: { slug: params.slug } });
}

export default function LocalizedDiseasePage({ params }: Props) {
  if (!isSupportedLocale(getRouteLocale(params.locale))) notFound();
  return <DiseasePage params={{ slug: params.slug }} />;
}
