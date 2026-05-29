import Link from "next/link";
import { ArrowRight, CalendarDays, Clock3 } from "lucide-react";

import type { PublicBlogPost } from "@/lib/data/blog";
import { localizePath, type AppLocale } from "@/lib/i18n/config";
import { media } from "@/lib/media";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { cn } from "@/lib/utils";

type BlogCardProps = {
  locale: AppLocale;
  post: PublicBlogPost;
  readLabel: string;
  featuredLabel: string;
  minReadLabel: string;
  className?: string;
  compact?: boolean;
};

export function BlogCard({
  locale,
  post,
  readLabel,
  featuredLabel,
  minReadLabel,
  className,
  compact = false,
}: BlogCardProps) {
  return (
    <Card
      className={cn(
        "group overflow-hidden border-slate-200/80 p-0 transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(8,22,52,0.12)]",
        className,
      )}
    >
      <Link href={localizePath(`/blog/${post.slug}`, locale)} className="block">
        <div className={cn("relative overflow-hidden border-b border-slate-200/80 bg-slate-100", compact ? "aspect-[4/3]" : "aspect-[16/10]")}>
          <ImageWithFallback
            src={post.coverImage || media.defaults.blog.src}
            alt={post.featuredImageAlt || media.defaults.blog.alt}
            fill
            sizes={compact ? "(min-width: 1024px) 33vw, 100vw" : "(min-width: 1024px) 50vw, 100vw"}
            fallbackLabel={post.title}
            className="object-cover transition duration-700 group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(9,30,66,0.2)_100%)]" />
        </div>
        <div className="p-5 sm:p-6">
          <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.22em] text-sky-700">
            {post.featured ? <Badge variant="surface">{featuredLabel}</Badge> : null}
            {post.category ? <span>{post.category}</span> : null}
          </div>
          <h3 className={cn("mt-4 font-display font-semibold text-slate-950", compact ? "text-xl" : "text-2xl")}>
            {post.title}
          </h3>
          <p className={cn("mt-3 leading-7 text-slate-600", compact ? "text-sm" : "text-base")}>
            {post.seoDescription || post.excerpt}
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-slate-500">
            {post.publishedAt ? (
              <span className="inline-flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-sky-700" />
                {post.publishedAt.toLocaleDateString(locale === "en" ? "en-US" : undefined, {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            ) : null}
            <span className="inline-flex items-center gap-2">
              <Clock3 className="h-4 w-4 text-sky-700" />
              {post.readingTime} {minReadLabel}
            </span>
          </div>
          <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-sky-700 transition group-hover:translate-x-1">
            {readLabel}
            <ArrowRight className="h-4 w-4" />
          </div>
        </div>
      </Link>
    </Card>
  );
}
