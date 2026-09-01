import { notFound } from "next/navigation";

import CostCalculatorPage, {
  generateMetadata,
} from "@/app/cost-calculator/page";
import { isSupportedLocale } from "@/lib/i18n/config";
import { getRouteLocale } from "@/lib/i18n/request";

type LocalePageProps = {
  params: {
    locale: string;
  };
  searchParams?: {
    condition?: string | string[];
    treatment?: string | string[];
  };
};

export default function LocalizedCostCalculatorPage({
  params,
  searchParams,
}: LocalePageProps) {
  if (!isSupportedLocale(getRouteLocale(params?.locale))) {
    notFound();
  }

  return <CostCalculatorPage searchParams={searchParams} />;
}

export { generateMetadata };
