import type { AppLocale } from "@/lib/i18n/config";
import type { PublicBlogPost } from "@/lib/data/blog";
import { FadeIn } from "@/components/shared/fade-in";
import { BlogCard } from "@/components/blog/BlogCard";

type RelatedArticlesProps = {
  locale: AppLocale;
  title: string;
  description: string;
  posts: PublicBlogPost[];
  readLabel: string;
  featuredLabel: string;
  minReadLabel: string;
};

export function RelatedArticles({
  locale,
  title,
  description,
  posts,
  readLabel,
  featuredLabel,
  minReadLabel,
}: RelatedArticlesProps) {
  if (!posts.length) {
    return null;
  }

  return (
    <section className="space-y-8">
      <div className="max-w-3xl">
        <h2 className="font-display text-3xl font-semibold text-slate-950 sm:text-4xl">
          {title}
        </h2>
        <p className="mt-4 text-base leading-8 text-slate-600">{description}</p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {posts.map((post, index) => (
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
    </section>
  );
}
