import Link from "next/link";
import { LayoutGrid } from "lucide-react";

import { localizePath, type AppLocale } from "@/lib/i18n/config";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type BlogCategoryFilterProps = {
  locale: AppLocale;
  currentCategory?: string;
  currentQuery?: string;
  label: string;
  allLabel: string;
  categories: Array<{
    slug: string;
    name: string;
    count: number;
  }>;
};

function buildBlogIndexHref(locale: AppLocale, category?: string, q?: string) {
  const params = new URLSearchParams();

  if (category) {
    params.set("category", category);
  }

  if (q) {
    params.set("q", q);
  }

  const query = params.toString();
  return `${localizePath("/blog", locale)}${query ? `?${query}` : ""}`;
}

export function BlogCategoryFilter({
  locale,
  currentCategory,
  currentQuery,
  label,
  allLabel,
  categories,
}: BlogCategoryFilterProps) {
  return (
    <div>
      <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.22em] text-sky-700">
        <LayoutGrid className="h-4 w-4" />
        {label}
      </div>
      <div className="-mx-4 mt-4 overflow-x-auto px-4 pb-2">
        <div className="flex min-w-max gap-3">
          <Link
            href={buildBlogIndexHref(locale, undefined, currentQuery)}
            className={cn(
              "inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold transition",
              !currentCategory
                ? "border-sky-200 bg-sky-50 text-sky-800 shadow-soft"
                : "border-slate-200 bg-white text-slate-600 hover:border-sky-200 hover:text-sky-700",
            )}
          >
            {allLabel}
          </Link>
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={buildBlogIndexHref(locale, category.slug, currentQuery)}
              className={cn(
                "inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold transition",
                currentCategory === category.slug
                  ? "border-sky-200 bg-sky-50 text-sky-800 shadow-soft"
                  : "border-slate-200 bg-white text-slate-600 hover:border-sky-200 hover:text-sky-700",
              )}
            >
              <span>{category.name}</span>
              <Badge variant="surface" className="px-2 py-0.5 text-[0.68rem]">
                {category.count}
              </Badge>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
