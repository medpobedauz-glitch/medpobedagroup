"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { DollarSign, Clock, Check, ArrowRight, Info, Stethoscope } from "lucide-react";

import { useMemo, useState } from "react";
import { easeOutExpo } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { costGuideCategories, costGuideData, type CostItem } from "@/lib/data/cost-guide";

const formatPrice = (n: number) =>
  `$${n.toLocaleString("en-US")}`;

export function CostGuidePageContent() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo<CostItem[]>(() => {
    return costGuideData.filter((item) => {
      const matchesCategory =
        selectedCategory === "All" || item.category === selectedCategory;
      const q = query.trim().toLowerCase();
      const matchesQuery =
        q.length === 0 ||
        item.treatment.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [selectedCategory, query]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: costGuideData.length };
    for (const item of costGuideData) {
      counts[item.category] = (counts[item.category] ?? 0) + 1;
    }
    return counts;
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden px-4 pb-10 pt-8 sm:px-6 sm:pb-14 sm:pt-12 lg:px-8">
        <div className="container-wide">
          <div className="section-frame p-6 sm:p-8 lg:p-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: easeOutExpo }}
              className="text-center"
            >
              <span className="section-kicker">Cost Guide</span>
              <h1 className="heading-display mt-5">
                Comprehensive Cost Guide for Medical Treatments in India
              </h1>
              <p className="body-lg mx-auto mt-5 max-w-3xl">
                Transparent starting prices for 40+ procedures across India's top JCI and NABH-accredited hospitals. Use this guide to plan your medical journey — actual costs depend on your case, hospital, and surgeon.
              </p>
            </motion.div>

            <div className="mx-auto mt-8 flex max-w-3xl flex-wrap items-center justify-center gap-3">
              <div className="flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-xs font-semibold text-emerald-700">
                <DollarSign className="h-3.5 w-3.5" />
                Save 30–70% vs Western countries
              </div>
              <div className="flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-xs font-semibold text-blue-700">
                <Clock className="h-3.5 w-3.5" />
                Short waiting times
              </div>
              <div className="flex items-center gap-2 rounded-full bg-violet-50 px-4 py-2 text-xs font-semibold text-violet-700">
                <Stethoscope className="h-3.5 w-3.5" />
                JCI & NABH hospitals
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter + Listing */}
      <section className="section-shell-compact pt-0">
        <div className="container-wide">
          <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
            {/* Sticky filter sidebar */}
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <div className="surface-panel rounded-[1.5rem] p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Filter by category
                </p>
                <div className="mt-3 flex flex-col gap-1.5">
                  {costGuideCategories.map((cat) => {
                    const isActive = selectedCategory === cat;
                    const count = categoryCounts[cat] ?? 0;
                    return (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={cn(
                          "flex items-center justify-between rounded-xl px-3 py-2 text-left text-xs font-semibold transition-all",
                          isActive
                            ? "bg-blue-600 text-white shadow-sm"
                            : "text-slate-700 hover:bg-blue-50"
                        )}
                      >
                        <span>{cat}</span>
                        <span
                          className={cn(
                            "rounded-full px-2 py-0.5 text-[0.65rem]",
                            isActive
                              ? "bg-white/20 text-white"
                              : "bg-slate-100 text-slate-500"
                          )}
                        >
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-3 text-[0.7rem] leading-5 text-amber-700">
                  Prices are starting estimates and vary by hospital, surgeon, and case complexity.
                </div>
              </div>
            </aside>

            {/* Main listing */}
            <div>
              {/* Search */}
              <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm font-semibold text-slate-700">
                  Showing <span className="text-blue-700">{filtered.length}</span> of {costGuideData.length} procedures
                </p>
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search procedure or condition…"
                  className="w-full rounded-full border border-slate-200 bg-white px-4 py-2.5 text-xs text-slate-700 shadow-sm outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100 sm:w-72"
                />
              </div>

              {/* Cards grid - 2 columns */}
              <div className="grid gap-5 sm:grid-cols-2">
                {filtered.map((item, index) => (
                  <motion.article
                    key={item.treatment}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: Math.min(index * 0.02, 0.4) }}
                    className={cn(
                      "relative overflow-hidden rounded-[1.4rem] border bg-white/90 p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_48px_rgba(29,78,216,0.1)]",
                      item.popular
                        ? "border-blue-300 shadow-[0_12px_36px_rgba(29,78,216,0.08)]"
                        : "border-[#D6E8FF] shadow-[0_12px_36px_rgba(7,27,58,0.04)]"
                    )}
                  >
                    {item.popular && (
                      <div className="absolute right-3 top-3 rounded-full bg-blue-600 px-2.5 py-0.5 text-[0.6rem] font-bold uppercase tracking-wider text-white">
                        Popular
                      </div>
                    )}

                    <span className="inline-flex rounded-full bg-blue-50 px-2.5 py-0.5 text-[0.65rem] font-semibold text-blue-700">
                      {item.category}
                    </span>

                    <h3 className="mt-2.5 text-base font-bold text-[#0B1F4D]">
                      {item.treatment}
                    </h3>

                    <p className="mt-1.5 text-xs leading-5 text-slate-500">
                      {item.description}
                    </p>

                    {/* Price block */}
                    <div className="mt-4 rounded-xl bg-gradient-to-r from-blue-50 to-sky-50 p-3.5">
                      <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-blue-700">
                        Starting from
                      </p>
                      <p className="mt-0.5 text-xl font-bold text-[#0B1F4D]">
                        {formatPrice(item.startingFromUSD)}
                      </p>
                      <p className="text-[0.7rem] text-slate-500">
                        Typical range {item.costRangeUSD} · {item.costRangeINR}
                      </p>
                    </div>

                    {/* Duration + includes */}
                    <div className="mt-3 flex items-center gap-1.5 text-[0.7rem] text-slate-500">
                      <Clock className="h-3 w-3" />
                      <span>Stay: {item.duration}</span>
                    </div>

                    <div className="mt-2.5 grid grid-cols-2 gap-1.5">
                      {item.includes.slice(0, 4).map((inc) => (
                        <div key={inc} className="flex items-center gap-1.5 text-[0.7rem] text-slate-600">
                          <Check className="h-2.5 w-2.5 shrink-0 text-emerald-500" />
                          <span className="truncate">{inc}</span>
                        </div>
                      ))}
                    </div>
                  </motion.article>
                ))}
              </div>

              {filtered.length === 0 && (
                <div className="rounded-2xl border border-dashed border-slate-200 bg-white/60 p-10 text-center">
                  <p className="text-sm font-semibold text-slate-700">No procedures match your search.</p>
                  <p className="mt-1 text-xs text-slate-500">Try a different category or clear the search.</p>
                </div>
              )}

              {/* Disclaimer */}
              <div className="mt-10 flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
                <div className="text-[0.75rem] leading-6 text-amber-700">
                  <p className="font-semibold">Disclaimer: These are estimated costs only.</p>
                  <p className="mt-1">
                    Actual costs may vary based on your specific medical condition, chosen hospital, surgeon, and any complications. Contact MedPobeda for a personalized cost estimate based on your medical reports.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-shell-compact">
        <div className="container-wide">
          <div className="section-frame-accent p-6 text-center sm:p-8">
            <h2 className="heading-section">Get a Personalized Cost Estimate</h2>
            <p className="body-lg mx-auto mt-3 max-w-xl">
              Share your medical reports and receive a detailed cost breakdown within 48 hours — in your currency, with hospital-specific line items.
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/international-patients"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-700 to-blue-600 px-7 py-3 text-sm font-bold text-white shadow-md transition hover:-translate-y-0.5"
              >
                Request Cost Estimate
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-[#D6E8FF] bg-white px-7 py-3 text-sm font-bold text-[#0B1F4D]"
              >
                Talk to a Coordinator
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
