import { createMetadata } from "@/lib/metadata";
import { getBlogTaxonomy, getPublishedBlogPosts } from "@/lib/data/blog";
import { createBreadcrumbSchema, createWebPageSchema } from "@/lib/schema";
import { calculateReadingTime, unique } from "@/lib/utils";
import { CtaSection } from "@/components/shared/cta-section";
import { FadeIn } from "@/components/shared/fade-in";
import { JsonLd } from "@/components/shared/json-ld";
import { PageHero } from "@/components/shared/page-hero";
import { PageVisualShowcase } from "@/components/shared/page-visual-showcase";
import { PublicLink } from "@/components/shared/public-link";
import { BlogCard } from "@/components/blog/blog-card";
import { Card } from "@/components/ui/card";

export const dynamic = "force-dynamic";

export const metadata = createMetadata({
  title: "Healthcare Insights",
  description:
    "Read MedPobeda Group updates and healthcare collaboration insights on medical tourism, hospital partnerships, patient coordination, and cross-border healthcare strategy.",
  path: "/blog",
});

type BlogIndexPageProps = {
  searchParams?: {
    q?: string;
    category?: string;
    tag?: string;
  };
};

export default async function BlogIndexPage({ searchParams }: BlogIndexPageProps) {
  const [posts, taxonomy] = await Promise.all([
    getPublishedBlogPosts({
      search: searchParams?.q,
      category: searchParams?.category,
      tag: searchParams?.tag,
    }),
    getBlogTaxonomy(),
  ]);
  const hasFilter = Boolean(searchParams?.q || searchParams?.category || searchParams?.tag);
  const featuredPost = !hasFilter
    ? taxonomy.featuredPosts[0] ?? posts[0] ?? null
    : null;
  const remainingPosts = featuredPost
    ? posts.filter((post) => post.id !== featuredPost.id)
    : posts;
  const categories = unique(taxonomy.categories);
  const tags = unique(taxonomy.tags).slice(0, 8);

  return (
    <>
      <JsonLd
        data={[
          createWebPageSchema({
            name: "Healthcare Insights",
            description:
              "Read MedPobeda Group updates and healthcare collaboration insights on medical tourism, hospital partnerships, patient coordination, and cross-border healthcare strategy.",
            path: "/blog",
            type: "CollectionPage",
          }),
          createBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
          ]),
        ]}
      />
      <PageHero
        eyebrow="Blog"
        title="Healthcare collaboration insights for hospitals, patients, and cross-border medical stakeholders"
        description="A growing knowledge base focused on medical tourism strategy, patient coordination, hospital partnerships, and international healthcare cooperation across Uzbekistan and India."
        points={[
          "Medical tourism operations and patient journey design",
          "Hospital partnership models and referral coordination",
          "International patient services and treatment facilitation",
          "Cross-border healthcare collaboration perspectives",
        ]}
        imageKey="blogHealthcareNews01"
        secondaryImageKey="blogConferenceReport"
      />
      <PageVisualShowcase
        eyebrow="Editorial Image System"
        title="Healthcare news and editorial content now sit inside a cleaner visual publishing layer"
        description="The blog experience now uses curated healthcare photography and lighter publishing surfaces to feel more like a serious healthcare editorial brand."
        imageKeys={["blogHealthcareNews02", "blogCancerBreakthrough", "blogTransplantInnovation"]}
      />
      {featuredPost ? (
        <section className="px-6 pt-8 lg:px-8">
          <FadeIn className="mx-auto max-w-7xl">
            <Card className="overflow-hidden border-slate-200/80 p-0">
              <div className="grid gap-0 lg:grid-cols-[1.04fr_0.96fr]">
                <div className="border-b border-slate-200 p-7 lg:border-b-0 lg:border-r lg:p-10">
                  <p className="text-sm font-semibold uppercase tracking-[0.28em] text-sky-700">
                    Featured Insight
                  </p>
                  <h2 className="mt-5 font-display text-3xl font-semibold text-slate-950 sm:text-4xl">
                    {featuredPost.title}
                  </h2>
                  <p className="mt-5 text-base leading-8 text-slate-600">
                    {featuredPost.seoDescription ||
                      featuredPost.excerpt ||
                      "Explore the latest MedPobeda healthcare insight."}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3 text-sm text-slate-500">
                    <span>
                      {(featuredPost.publishedAt ?? featuredPost.createdAt).toLocaleDateString(
                        "en-US",
                        {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        },
                      )}
                    </span>
                    <span>{calculateReadingTime(featuredPost.content)} min read</span>
                    {featuredPost.category ? <span>{featuredPost.category}</span> : null}
                  </div>
                  <PublicLink
                    href={`/blog/${featuredPost.slug}`}
                    className="mt-8 inline-flex items-center gap-2 rounded-full border border-sky-100 bg-sky-50 px-5 py-3 text-sm font-semibold text-sky-700 transition hover:-translate-y-0.5 hover:bg-sky-100"
                  >
                    Read featured article
                  </PublicLink>
                </div>
                <div className="grid gap-6 p-7 lg:p-10">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.28em] text-sky-700">
                      Categories
                    </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {categories.length ? (
                    categories.map((category) => (
                          <PublicLink
                            key={category}
                            href={`/blog?category=${encodeURIComponent(category)}`}
                            className="rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-600"
                          >
                            {category}
                          </PublicLink>
                        ))
                      ) : (
                        <span className="text-sm text-slate-500">
                          Categories will appear as articles are published.
                        </span>
                      )}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.28em] text-sky-700">
                      Topic Tags
                    </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {tags.length ? (
                    tags.map((tag) => (
                          <PublicLink
                            key={tag}
                            href={`/blog?tag=${encodeURIComponent(tag)}`}
                            className="rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-600"
                          >
                            {tag}
                          </PublicLink>
                        ))
                      ) : (
                        <span className="text-sm text-slate-500">
                          Topic tags will appear as articles are published.
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </FadeIn>
        </section>
      ) : null}
      <section className="px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <form className="flex w-full max-w-2xl gap-3">
              <input
                type="text"
                name="q"
                defaultValue={searchParams?.q ?? ""}
                placeholder="Search healthcare insights"
                className="flex h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-950 placeholder:text-slate-400"
              />
              {searchParams?.category ? (
                <input type="hidden" name="category" value={searchParams.category} />
              ) : null}
              {searchParams?.tag ? (
                <input type="hidden" name="tag" value={searchParams.tag} />
              ) : null}
              <button
                type="submit"
                className="inline-flex h-12 items-center justify-center rounded-full border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Search
              </button>
            </form>
            {hasFilter ? (
              <div className="flex flex-wrap gap-3 text-sm text-slate-500">
                {searchParams?.category ? <span>Category: {searchParams.category}</span> : null}
                {searchParams?.tag ? <span>Tag: {searchParams.tag}</span> : null}
                {searchParams?.q ? <span>Search: {searchParams.q}</span> : null}
                <PublicLink href="/blog" className="text-sky-700 transition hover:text-slate-950">
                  Clear filters
                </PublicLink>
              </div>
            ) : null}
          </div>
          {posts.length ? (
            <div className="grid gap-6 lg:grid-cols-2">
              {remainingPosts.map((post, index) => (
                <FadeIn key={post.id} delay={index * 0.06}>
                  <BlogCard post={post} />
                </FadeIn>
              ))}
            </div>
          ) : (
            <FadeIn>
              <Card className="border-slate-200/80 p-8 text-center">
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-sky-700">
                  Publishing Pipeline
                </p>
                <h2 className="mt-4 font-display text-3xl font-semibold text-slate-950">
                  Insights are being prepared
                </h2>
                <p className="mt-4 text-base leading-8 text-slate-600">
                  The blog architecture is live and ready for future SEO publishing.
                  Articles will appear here as they are published from the admin panel.
                </p>
              </Card>
            </FadeIn>
          )}
        </div>
      </section>
      <CtaSection
        title="Need a direct conversation instead of an article?"
        description="Reach the MedPobeda team for partnership discussions, patient coordination, hospital collaboration, or healthcare stakeholder enquiries."
        primary={{ label: "Contact MedPobeda Group", href: "/contact" }}
        secondary={{ label: "Explore Partnerships", href: "/hospital-partnerships" }}
        imageKey="blogHospitalPartnership"
      />
    </>
  );
}
