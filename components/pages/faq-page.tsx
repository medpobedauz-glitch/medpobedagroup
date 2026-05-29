"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronDown, Search, ArrowRight } from "lucide-react";

import { easeOutExpo } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { faqCategories, type FAQItem } from "@/lib/data/faqs";

type FAQPageContentProps = {
  faqs: FAQItem[];
};

export function FAQPageContent({ faqs }: FAQPageContentProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [openId, setOpenId] = useState<string | null>(null);

  const filteredFAQs = faqs.filter((faq) => {
    const matchesCategory =
      selectedCategory === "All" || faq.category === selectedCategory;
    const matchesSearch =
      !searchQuery ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const faqsByCategory = faqCategories.reduce((acc, cat) => {
    acc[cat] = filteredFAQs.filter((faq) => faq.category === cat).length;
    return acc;
  }, {} as Record<string, number>);

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
              <span className="section-kicker">FAQ</span>
              <h1 className="mt-5 font-display text-3xl font-bold tracking-[-0.035em] text-[#0B1F4D] sm:text-5xl lg:text-6xl">
                Frequently Asked Questions
              </h1>
              <p className="mt-5 body-lg mx-auto max-w-3xl">
                Find answers to common questions about medical tourism to India, our services, and how we help patients from Central Asia.
              </p>
            </motion.div>

            {/* Search */}
            <div className="mx-auto mt-8 max-w-2xl">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search questions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-14 w-full rounded-2xl border border-[#D6E8FF] bg-white pl-12 pr-4 text-sm text-slate-900 shadow-[0_12px_32px_rgba(7,27,58,0.06)] outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="section-shell-compact pt-0">
        <div className="container-wide">
          <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
            {/* Sidebar Categories */}
            <div>
              <div className="sticky top-28">
                <h2 className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">
                  Categories
                </h2>
                <div className="mt-4 grid gap-1.5">
                  <button
                    onClick={() => setSelectedCategory("All")}
                    className={cn(
                      "rounded-xl px-4 py-2.5 text-left text-sm font-medium transition-all",
                      selectedCategory === "All"
                        ? "bg-blue-600 text-white shadow-md"
                        : "text-slate-600 hover:bg-slate-50"
                    )}
                  >
                    All Questions ({faqs.length})
                  </button>
                  {faqCategories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={cn(
                        "flex items-center justify-between rounded-xl px-4 py-2.5 text-left text-sm font-medium transition-all",
                        selectedCategory === cat
                          ? "bg-blue-600 text-white shadow-md"
                          : "text-slate-600 hover:bg-slate-50"
                      )}
                    >
                      <span>{cat}</span>
                      <span
                        className={cn(
                          "rounded-full px-2 py-0.5 text-xs",
                          selectedCategory === cat
                            ? "bg-white/20"
                            : "bg-slate-100 text-slate-500"
                        )}
                      >
                        {faqsByCategory[cat] ?? 0}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* FAQ List */}
            <div className="grid gap-3">
              {filteredFAQs.length === 0 && (
                <div className="rounded-2xl border border-[#D6E8FF] bg-white/80 p-12 text-center">
                  <p className="text-lg font-semibold text-slate-700">
                    No questions found
                  </p>
                  <p className="mt-2 text-sm text-slate-500">
                    Try a different search term or category.
                  </p>
                </div>
              )}
              {filteredFAQs.map((faq, index) => (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.02 }}
                  className="overflow-hidden rounded-2xl border border-[#D6E8FF] bg-white/90 backdrop-blur-xl transition-all hover:shadow-[0_12px_36px_rgba(7,27,58,0.06)]"
                >
                  <button
                    onClick={() =>
                      setOpenId(openId === faq.id ? null : faq.id)
                    }
                    className="flex w-full items-start justify-between gap-4 p-5 text-left"
                  >
                    <div className="min-w-0 flex-1">
                      <span className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-[#1D4ED8]">
                        {faq.category}
                      </span>
                      <h3 className="mt-1 text-sm font-semibold text-[#0B1F4D] sm:text-base">
                        {faq.question}
                      </h3>
                    </div>
                    <ChevronDown
                      className={cn(
                        "mt-1 h-5 w-5 shrink-0 text-slate-400 transition-transform duration-200",
                        openId === faq.id && "rotate-180"
                      )}
                    />
                  </button>
                  {openId === faq.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="border-t border-slate-100 px-5 pb-5 pt-4"
                    >
                      <p className="text-sm leading-7 text-slate-600">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-shell-compact">
        <div className="container-wide">
          <div className="section-frame-accent p-6 sm:p-8 text-center">
            <h2 className="font-display text-2xl font-bold tracking-[-0.03em] text-[#0B1F4D] sm:text-3xl">
              Still Have Questions?
            </h2>
            <p className="mt-3 body-lg mx-auto max-w-xl">
              Our team is ready to answer any questions about your medical journey to India.
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-700 to-blue-600 px-8 py-3.5 text-sm font-bold text-white shadow-md transition hover:-translate-y-0.5"
              >
                Contact Us
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/international-patient-care"
                className="inline-flex items-center gap-2 rounded-full border border-[#D6E8FF] bg-white px-8 py-3.5 text-sm font-bold text-[#0B1F4D]"
              >
                Learn About Our Services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}