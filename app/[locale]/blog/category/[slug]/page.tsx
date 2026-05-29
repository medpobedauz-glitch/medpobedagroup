import { getRouteLocale } from "@/lib/i18n/request";
import { notFound } from "next/navigation";

import BlogCategoryPage from "@/app/blog/category/[slug]/page";
import { createMetadata } from "@/lib/metadata";
import { getBlogTaxonomy } from "@/lib/data/blog";
import { isSupportedLocale, localizePath, locales } from "@/lib/i18n/config";

type LocalePageProps = {
  params: {
    locale: string;
    slug: string;
  };
};

export async function generateStaticParams() {
  const categorySets = await Promise.all(
    locales.map(async (locale) => ({
      locale,
      categories: (await getBlogTaxonomy(locale)).categories,
    })),
  );

  return categorySets.flatMap(({ locale, categories }) =>
    categories.map((category) => ({ locale, slug: category.slug })),
  );
}

export async function generateMetadata({ params }: LocalePageProps) {
  const locale = getRouteLocale(params?.locale);

  if (!isSupportedLocale(locale)) {
    return {};
  }

  const taxonomy = await getBlogTaxonomy(locale);
  const category = taxonomy.categories.find((item) => item.slug === params.slug);

  if (!category) {
    return createMetadata({
      title: "Blog Category | MedPobeda Group",
      description:
        "Browse MedPobeda Group blog categories for medical tourism, patient support, hospital partnerships, and international healthcare.",
      path: localizePath(`/blog/category/${params.slug}`, locale),
      locale,
    });
  }

  return createMetadata({
    title: category.metaTitle,
    description: category.metaDescription,
    path: localizePath(`/blog/category/${params.slug}`, locale),
    locale,
    ogTitle: category.metaTitle,
    ogDescription: category.metaDescription,
  });
}

export default function LocalizedBlogCategoryPage({ params }: LocalePageProps) {
  if (!isSupportedLocale(getRouteLocale(params?.locale))) {
    notFound();
  }

  return <BlogCategoryPage params={{ slug: params.slug }} />;
}
