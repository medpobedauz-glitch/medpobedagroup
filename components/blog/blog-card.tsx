import Image from "next/image";
import { ArrowRight, CalendarDays, Clock3 } from "lucide-react";

import { calculateReadingTime } from "@/lib/utils";
import { PublicLink } from "@/components/shared/public-link";
import { Card } from "@/components/ui/card";
import { getMessages } from "@/lib/i18n";
import { getRequestLocale } from "@/lib/i18n/request";
import { getSiteImage } from "@/lib/site-images";

type BlogCardProps = {
  post: {
    title: string;
    slug: string;
    excerpt: string | null;
    seoDescription: string | null;
    coverImage: string | null;
    publishedAt: Date | null;
    featured?: boolean;
    category?: string | null;
    tags?: string[];
    content?: string;
  };
};

export function BlogCard({ post }: BlogCardProps) {
  const messages = getMessages(getRequestLocale());
  const readingTime = calculateReadingTime(post.content ?? post.excerpt ?? "");
  const fallbackImage = getSiteImage("blogHealthcareNews01");
  const imageSrc = post.coverImage || fallbackImage.path;
  const imageAlt = post.coverImage ? post.title : fallbackImage.alt;

  return (
    <Card className="group overflow-hidden border-slate-200/80 p-0">
      <div className="relative h-56 overflow-hidden border-b border-slate-200/80 bg-slate-100">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover transition duration-700 group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(15,23,42,0.24)_100%)]" />
      </div>
      <div className="p-6 sm:p-7">
        <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.24em] text-sky-700">
          {post.featured ? <span>{messages.chrome.blogCard.featured}</span> : null}
          <span>{post.category || messages.chrome.blogCard.fallbackCategory}</span>
          {post.publishedAt ? (
            <span className="inline-flex items-center gap-2">
              <CalendarDays className="h-3.5 w-3.5" />
              {post.publishedAt.toLocaleDateString(messages.chrome.blogCard.dateLocale, {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          ) : null}
          <span className="inline-flex items-center gap-2">
            <Clock3 className="h-3.5 w-3.5" />
            {readingTime} {messages.chrome.blogCard.minRead}
          </span>
        </div>
        <h2 className="mt-4 font-display text-2xl font-semibold text-slate-950">
          {post.title}
        </h2>
        <p className="mt-4 text-sm leading-7 text-slate-600">
          {post.seoDescription || post.excerpt || messages.chrome.blogCard.fallbackExcerpt}
        </p>
        {post.tags?.length ? (
          <div className="mt-5 flex flex-wrap gap-2">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-slate-200 bg-white px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-slate-600"
              >
                {tag}
              </span>
            ))}
          </div>
        ) : null}
        <PublicLink
          href={`/blog/${post.slug}`}
          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-sky-700 transition group-hover:translate-x-1"
        >
          {messages.chrome.blogCard.readArticle}
          <ArrowRight className="h-4 w-4" />
        </PublicLink>
      </div>
    </Card>
  );
}
