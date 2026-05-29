import type { AppLocale } from "@/lib/i18n/config";
import type { PublicBlogPost } from "@/lib/data/blog";
import { FadeIn } from "@/components/shared/fade-in";
import { BlogCard } from "@/components/blog/BlogCard";

type FeaturedArticlesProps = {
  locale: AppLocale;
  title: string;
  description: string;
  posts: PublicBlogPost[];
  readLabel: string;
  featuredLabel: string;
  minReadLabel: string;
};

export function FeaturedArticles({
  locale,
  title,
  description,
  posts,
  readLabel,
  featuredLabel,
  minReadLabel,
}: FeaturedArticlesProps) {
  if (!posts.length) {
    return null;
  }

  const [lead, ...rest] = posts;

  return (
    <section className="space-y-8">
      <div className="max-w-3xl">
        <h2 className="font-display text-3xl font-semibold text-slate-950 sm:text-4xl">
          {title}
        </h2>
        <p className="mt-4 text-base leading-8 text-slate-600">{description}</p>
      </div>
      <div className="grid gap-6 lg:grid-cols-[1.16fr_0.84fr]">
        <FadeIn>
          <BlogCard
            locale={locale}
            post={lead}
            readLabel={readLabel}
            featuredLabel={featuredLabel}
            minReadLabel={minReadLabel}
          />
        </FadeIn>
        <div className="grid gap-6">
          {rest.map((post, index) => (
            <FadeIn key={post.id} delay={index * 0.06}>
              <BlogCard
                locale={locale}
                post={post}
                readLabel={readLabel}
                featuredLabel={featuredLabel}
                minReadLabel={minReadLabel}
                compact
              />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
