import { getRouteLocale } from "@/lib/i18n/request";
import { notFound } from "next/navigation";

import BlogIndexPage from "@/app/blog/page";
import { createLocalizedPageMetadata } from "@/lib/i18n";
import { isSupportedLocale, localizePath } from "@/lib/i18n/config";

type LocaleBlogPageProps = {
  params: {
    locale: string;
  };
  searchParams?: {
    q?: string;
    category?: string;
    tag?: string;
  };
};

export async function generateMetadata({ params }: LocaleBlogPageProps) {
  if (!isSupportedLocale(getRouteLocale(params?.locale))) {
    return {};
  }

  return createLocalizedPageMetadata(
    getRouteLocale(params?.locale),
    "blog",
    localizePath("/blog", getRouteLocale(params?.locale)),
  );
}

export default function LocalizedBlogIndexPage({
  params,
  searchParams,
}: LocaleBlogPageProps) {
  if (!isSupportedLocale(getRouteLocale(params?.locale))) {
    notFound();
  }

  return <BlogIndexPage searchParams={searchParams} locale={getRouteLocale(params?.locale)} />;
}
