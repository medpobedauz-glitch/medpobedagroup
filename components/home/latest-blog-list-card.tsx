"use client";

import { m, useReducedMotion } from "framer-motion";
import { CalendarDays, ChevronRight } from "lucide-react";

import type { HomepageEditorialBlog } from "@/lib/home-updates";
import { PublicLink } from "@/components/shared/public-link";
import { Card } from "@/components/ui/card";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";

type LatestBlogListCardProps = {
  post: HomepageEditorialBlog;
  index: number;
};

export function LatestBlogListCard({
  post,
  index,
}: LatestBlogListCardProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <m.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.22 }}
      transition={{
        duration: prefersReducedMotion ? 0 : 0.54,
        delay: prefersReducedMotion ? 0 : index * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={prefersReducedMotion ? undefined : { y: -5 }}
    >
      <PublicLink href={post.href} className="block">
        <Card
          variant="light"
          className="group rounded-[1.7rem] border border-sky-100/90 bg-[linear-gradient(180deg,rgba(255,255,255,0.99),rgba(245,249,255,0.96))] p-4 shadow-[0_24px_60px_rgba(8,22,52,0.09)] transition-colors hover:border-cyan-200/80 sm:p-5"
        >
          <div className="grid gap-4 sm:grid-cols-[8.6rem_1fr] sm:items-start">
            <div className="relative h-28 overflow-hidden rounded-[1.2rem] border border-slate-200/70 bg-slate-100 sm:h-32">
              <ImageWithFallback
                src={post.image}
                alt={post.title}
                fill
                sizes="(min-width: 1024px) 176px, 100vw"
                fallbackLabel={post.category}
                className="object-cover transition duration-700 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(11,31,77,0.18)_100%)]" />
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-brand-700/80">
                <span className="rounded-full border border-sky-100 bg-sky-50 px-3 py-1 text-[0.65rem] tracking-[0.24em] text-sky-700">
                  {post.category}
                </span>
                <span className="inline-flex items-center gap-2 text-slate-500">
                  <CalendarDays className="h-3.5 w-3.5 text-brand-600" />
                  {post.publishedAt}
                </span>
              </div>
              <h3 className="mt-3 font-display text-xl font-semibold leading-tight text-slate-950">
                {post.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                {post.excerpt}
              </p>
              <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-700 transition group-hover:translate-x-1">
                Read update
                <ChevronRight className="h-4 w-4" />
              </div>
            </div>
          </div>
        </Card>
      </PublicLink>
    </m.article>
  );
}
