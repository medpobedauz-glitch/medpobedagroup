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
  if (!isSupportedLocale(params.locale)) {
    return {};
  }

  return createLocalizedPageMetadata(
    params.locale,
    "blog",
    localizePath("/blog", params.locale),
  );
}

export default function LocalizedBlogIndexPage({
  params,
  searchParams,
}: LocaleBlogPageProps) {
  if (!isSupportedLocale(params.locale)) {
    notFound();
  }

  return <BlogIndexPage searchParams={searchParams} />;
}
