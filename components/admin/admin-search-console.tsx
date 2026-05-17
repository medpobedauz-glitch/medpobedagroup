"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

type SearchConsoleProps = {
  query: string;
  scope: "all" | "leads" | "hospitals" | "partnerships" | "blog";
  results: Awaited<ReturnType<typeof import("@/lib/data/search").searchPlatformData>>;
};

const scopes: Array<SearchConsoleProps["scope"]> = [
  "all",
  "leads",
  "hospitals",
  "partnerships",
  "blog",
];

export function AdminSearchConsole({
  query,
  scope,
  results,
}: SearchConsoleProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [searchValue, setSearchValue] = useState(query);
  const [activeScope, setActiveScope] = useState(scope);

  useEffect(() => {
    setSearchValue(query);
  }, [query]);

  useEffect(() => {
    setActiveScope(scope);
  }, [scope]);

  useEffect(() => {
    const normalizedQuery = searchValue.trim();
    if (normalizedQuery.length < 2) {
      return;
    }

    const timer = window.setTimeout(() => {
      startTransition(() => {
        const params = new URLSearchParams();
        params.set("query", normalizedQuery);
        params.set("scope", activeScope);
        router.replace(`${pathname}?${params.toString()}`);
      });
    }, 250);

    return () => window.clearTimeout(timer);
  }, [activeScope, pathname, router, searchValue]);

  return (
    <div className="grid gap-6">
      <Card variant="dashboard" className="border-white/10 p-6">
        <div className="grid gap-4 lg:grid-cols-[1fr_auto]">
          <Input
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
            placeholder="Search leads, hospitals, partnerships, or blog content"
          />
          <select
            value={activeScope}
            onChange={(event) =>
              setActiveScope(event.target.value as SearchConsoleProps["scope"])
            }
            className="select-enterprise"
          >
            {scopes.map((item) => (
              <option key={item} value={item}>
                {item === "all" ? "All scopes" : item}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-4 flex flex-wrap gap-3 text-xs uppercase tracking-[0.18em] text-slate-500">
          <span>{isPending ? "Searching..." : `${results.total} results`}</span>
          <span>Leads {results.counts.leads}</span>
          <span>Hospitals {results.counts.hospitals}</span>
          <span>Partnerships {results.counts.partnerships}</span>
          <span>Blog {results.counts.blog}</span>
        </div>
      </Card>
      <div className="grid gap-4">
        {results.items.length ? (
          results.items.map((result) => (
            <Card key={`${result.type}-${result.id}`} variant="dashboard" className="border-white/10 p-6">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <div className="flex flex-wrap gap-3">
                    <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-100">
                      {result.badge}
                    </span>
                    <span className="rounded-full border border-white/10 bg-white/8 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-300">
                      Score {result.score}
                    </span>
                  </div>
                  <h2 className="mt-4 font-display text-2xl font-semibold text-white">
                    {result.title}
                  </h2>
                  <p className="mt-2 text-sm text-slate-300">{result.subtitle}</p>
                  <p className="mt-4 text-base leading-8 text-slate-300">
                    {result.summary}
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href={result.href}
                    className="inline-flex h-11 items-center justify-center rounded-full border border-white/10 px-5 text-sm font-semibold text-white transition hover:bg-white/8"
                  >
                    Open
                  </Link>
                  {result.adminHref ? (
                    <Link
                      href={result.adminHref}
                      className="inline-flex h-11 items-center justify-center rounded-full border border-white/10 px-5 text-sm font-semibold text-white transition hover:bg-white/8"
                    >
                      Open Admin
                    </Link>
                  ) : null}
                </div>
              </div>
            </Card>
          ))
        ) : (
          <Card variant="dashboard" className="border-white/10 p-8 text-center text-slate-400">
            Enter at least two characters to search the CRM, hospital registry, and blog.
          </Card>
        )}
      </div>
    </div>
  );
}
