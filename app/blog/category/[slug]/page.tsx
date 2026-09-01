import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { BlogCard } from "@/components/blog/BlogCard";
import { FadeIn } from "@/components/shared/fade-in";
import { JsonLd } from "@/components/shared/json-ld";
import { Card } from "@/components/ui/card";
import { getBlogTaxonomy, getPublishedBlogPosts } from "@/lib/data/blog";
import { defaultLocale, localizePath, type AppLocale } from "@/lib/i18n/config";
import { getMessages } from "@/lib/i18n";
import { getRequestLocale } from "@/lib/i18n/request";
import { createMetadata } from "@/lib/metadata";
import { createBreadcrumbSchema, createWebPageSchema } from "@/lib/schema";

type BlogCategoryPageProps = {
  params: {
    slug: string;
    locale?: AppLocale;
  };
};

export async function generateStaticParams() {
  const taxonomy = await getBlogTaxonomy(defaultLocale);

  return taxonomy.categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: BlogCategoryPageProps): Promise<Metadata> {
  // This route is the non-[locale] version.
  // generateStaticParams() doesn't include locale, so keep metadata generation deterministic.
  const locale = defaultLocale;
  const category = (await getBlogTaxonomy(locale)).categories.find(
    (item) => item.slug === params.slug,
  );

  if (!category) {
    return createMetadata({
      title: "Blog Category | MedPobeda Group",
      description:
        "Browse MedPobeda Group blog categories for medical tourism, patient support, hospital partnerships, and international healthcare.",
      path: `/blog/category/${params.slug}`,
      locale,
    });
  }

  return createMetadata({
    title: category.metaTitle,
    description: category.metaDescription,
    path: `/blog/category/${params.slug}`,
    locale,
    ogTitle: category.metaTitle,
    ogDescription: category.metaDescription,
  });
}

export default async function BlogCategoryPage({ params }: BlogCategoryPageProps) {
  const locale = params.locale ?? getRequestLocale();
  const messages = getMessages(locale);
  const taxonomy = await getBlogTaxonomy(locale);
  const category = taxonomy.categories.find((item) => item.slug === params.slug);

  if (!category) {
    notFound();
  }

  const posts = await getPublishedBlogPosts({ locale, category: params.slug });

  return (
    <>
      <JsonLd
        data={[
          createWebPageSchema({
            name: category.name,
            description: category.description,
            path: `/blog/category/${params.slug}`,
            locale,
            type: "CollectionPage",
          }),
          createBreadcrumbSchema(
            [
              { name: messages.chrome.navigation.home, path: "/" },
              { name: messages.routes.blog.title, path: "/blog" },
              { name: category.name, path: `/blog/category/${params.slug}` },
            ],
            locale,
          ),
        ]}
      />

      <section className="section-shell">
        <div className="container-wide">
          <div className="section-frame px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-14">
            <div className="max-w-3xl">
              <p className="section-kicker">{messages.routes.blog.title}</p>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
                {category.name}
              </h1>
              <p className="mt-5 text-lg leading-8 text-slate-600">{category.description}</p>
            </div>

            <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {posts.length ? (
                posts.map((post) => (
                  <FadeIn key={post.slug}>
                    <BlogCard
                      locale={locale}
                      post={post}
                      readLabel={messages.chrome.blogCard.readArticle}
                      featuredLabel={messages.chrome.blogCard.featured}
                      minReadLabel={messages.chrome.blogCard.minRead}
                    />
                  </FadeIn>
                ))
              ) : (
                <Card className="col-span-full border-slate-200 p-8">
                  <h2 className="text-2xl font-semibold text-slate-950">No articles found yet</h2>
                  <p className="mt-3 text-slate-600">
                    We are working to publish more articles in this category. Browse the full blog for additional insights.
                  </p>
                  <div className="mt-5">
                    <Link href={localizePath("/blog", locale)} className="text-sky-700 underline">
                      Back to blog
                    </Link>
                  </div>
                </Card>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
