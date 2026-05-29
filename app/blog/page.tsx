import type { Metadata } from "next";

import { BlogCategoryFilter } from "@/components/blog/BlogCategoryFilter";
import { BlogContactCta } from "@/components/blog/BlogContactCta";
import { BlogHero } from "@/components/blog/BlogHero";
import { BlogSearch } from "@/components/blog/BlogSearch";
import { FeaturedArticles } from "@/components/blog/FeaturedArticles";
import { BlogCard } from "@/components/blog/BlogCard";
import { FadeIn } from "@/components/shared/fade-in";
import { JsonLd } from "@/components/shared/json-ld";
import { Card } from "@/components/ui/card";
import { getPublishedBlogPosts, getBlogTaxonomy, type PublicBlogPost } from "@/lib/data/blog";
import { defaultLocale, type AppLocale } from "@/lib/i18n/config";
import { getMessages } from "@/lib/i18n";
import { media } from "@/lib/media";
import { createMetadata } from "@/lib/metadata";
import { createBreadcrumbSchema, createWebPageSchema } from "@/lib/schema";

type SearchParams = {
  q?: string;
  category?: string;
  tag?: string;
};

type BlogIndexPageProps = {
  searchParams?: SearchParams;
  locale?: AppLocale;
};

function normalizeParam(value?: string) {
  return value?.trim() || undefined;
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = defaultLocale;
  const messages = getMessages(locale);

  return createMetadata({
    title: messages.routes.blog.title,
    description: messages.routes.blog.description,
    path: "/blog",
    locale,
    keywords: messages.routes.blog.keywords,
    ogTitle: messages.routes.blog.openGraphTitle,
    ogDescription: messages.routes.blog.openGraphDescription,
  });
}

function getFeaturedPosts(posts: PublicBlogPost[]) {
  const featured = posts.filter((post) => post.featured).slice(0, 3);
  return featured.length ? featured : posts.slice(0, 3);
}

export default async function BlogIndexPage({
  searchParams,
  locale = defaultLocale,
}: BlogIndexPageProps) {
  const messages = getMessages(locale);
  const page = messages.pages.blog;
  const query = normalizeParam(searchParams?.q);
  const category = normalizeParam(searchParams?.category);
  const tag = normalizeParam(searchParams?.tag);

  const [posts, taxonomy] = await Promise.all([
    getPublishedBlogPosts({ locale, q: query, category, tag }),
    getBlogTaxonomy(locale),
  ]);

  const featuredPosts = getFeaturedPosts(posts);
  const featuredSlugs = new Set(featuredPosts.map((post) => post.slug));
  const latestPosts = posts.filter((post) => !featuredSlugs.has(post.slug));
  const heroImage = media.blog.hero;

  return (
    <>
      <JsonLd
        data={[
          createWebPageSchema({
            name: page.schemaName,
            description: page.schemaDescription,
            path: "/blog",
            locale,
            type: "CollectionPage",
          }),
          createBreadcrumbSchema(
            [
              { name: messages.chrome.navigation.home, path: "/" },
              { name: messages.routes.blog.title, path: "/blog" },
            ],
            locale,
          ),
        ]}
      />
      <BlogHero
        locale={locale}
        eyebrow={page.hero.eyebrow}
        title={page.hero.title}
        description={page.hero.description}
        points={page.hero.points}
        imageSrc={heroImage.src}
        imageAlt={page.hero.imageAlt || heroImage.alt}
        contactTitle={page.contactBar.title}
        whatsappLabel={page.contactBar.whatsapp}
        telegramLabel={page.contactBar.telegram}
        emailLabel={page.contactBar.email}
      />
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <FadeIn>
          <Card className="border-slate-200/80 p-5 sm:p-7">
            <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
              <BlogCategoryFilter
                locale={locale}
                currentCategory={category}
                currentQuery={query}
                label={page.filters.categoryLabel}
                allLabel={page.filters.allCategories}
                categories={taxonomy.categories}
              />
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-700">
                  {page.filters.searchLabel}
                </p>
                <div className="mt-4">
                  <BlogSearch
                    query={query}
                    currentCategory={category}
                    placeholder={page.filters.placeholder}
                    submitLabel={page.filters.submit}
                  />
                </div>
              </div>
            </div>
          </Card>
        </FadeIn>
      </section>
      {posts.length ? (
        <>
          <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
            <FadeIn>
              <FeaturedArticles
                locale={locale}
                title={page.featured.title}
                description={page.featured.description}
                posts={featuredPosts}
                readLabel={page.featured.readArticle}
                featuredLabel={messages.chrome.blogCard.featured}
                minReadLabel={messages.chrome.blogCard.minRead}
              />
            </FadeIn>
          </section>
          <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <h2 className="font-display text-3xl font-semibold text-slate-950 sm:text-4xl">
                {query || category ? page.results.title : page.latest.title}
              </h2>
              <p className="mt-4 text-base leading-8 text-slate-600">
                {query || category ? page.results.description : page.latest.description}
              </p>
            </div>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {(latestPosts.length ? latestPosts : featuredPosts).map((post, index) => (
                <FadeIn key={post.id} delay={index * 0.05}>
                  <BlogCard
                    locale={locale}
                    post={post}
                    readLabel={messages.chrome.blogCard.readArticle}
                    featuredLabel={messages.chrome.blogCard.featured}
                    minReadLabel={messages.chrome.blogCard.minRead}
                    compact
                  />
                </FadeIn>
              ))}
            </div>
          </section>
        </>
      ) : (
        <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
          <Card className="border-slate-200/80 p-8 sm:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-sky-700">
              {page.emptyState.eyebrow}
            </p>
            <h2 className="mt-4 font-display text-3xl font-semibold text-slate-950 sm:text-4xl">
              {page.emptyState.title}
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">
              {page.emptyState.description}
            </p>
          </Card>
        </section>
      )}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <FadeIn>
          <BlogContactCta
            locale={locale}
            title={page.cta.title}
            description={page.cta.description}
            whatsappLabel={page.cta.whatsapp}
            telegramLabel={page.cta.telegram}
            emailLabel={page.cta.email}
            contactPageLabel={page.cta.contactPage}
          />
        </FadeIn>
      </section>
    </>
  );
}
