"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import type { FaqItem } from "@/lib/content";

type FAQAccordionProps = {
  eyebrow: string;
  title: string;
  description: string;
  items: FaqItem[];
};

export function FAQAccordion({
  eyebrow,
  title,
  description,
  items,
}: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <section className="section-shell-compact">
      <div className="container-wide">
        <div className="section-frame-soft px-6 py-8 sm:px-8 lg:px-10 lg:py-10">
          <div className="relative mx-auto max-w-5xl">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-sky-700">
                {eyebrow}
              </p>
              <h2 className="mt-5 font-display text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl lg:text-5xl">
                {title}
              </h2>
              <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
                {description}
              </p>
            </div>
            <div className="mt-12 grid gap-4">
              {items.map((item, index) => {
                const isOpen = openIndex === index;

                return (
                  <div
                    key={item.question}
                    className="overflow-hidden rounded-[1.8rem] border border-slate-200/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.99),rgba(245,249,255,0.96))] shadow-[0_18px_44px_rgba(8,22,52,0.06)] backdrop-blur-2xl transition hover:border-[#9CC8FF]"
                  >
                    <button
                      type="button"
                      className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                      aria-expanded={isOpen}
                      onClick={() => setOpenIndex(isOpen ? -1 : index)}
                    >
                      <div className="flex items-start gap-4">
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[#D6E8FF] bg-[linear-gradient(135deg,rgba(29,78,216,0.1),rgba(56,189,248,0.14))] text-sm font-semibold text-blue-700">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="font-display text-xl font-semibold text-slate-950">
                          {item.question}
                        </span>
                      </div>
                      <motion.span animate={{ rotate: isOpen ? 180 : 0 }}>
                        <ChevronDown className="h-5 w-5 text-sky-700" />
                      </motion.span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen ? (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                        >
                          <div className="border-t border-slate-200 px-6 py-5 text-base leading-8 text-slate-600">
                            {item.answer}
                          </div>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
