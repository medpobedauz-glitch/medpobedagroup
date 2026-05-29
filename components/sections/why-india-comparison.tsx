"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Globe2 } from "lucide-react";

import { easeOutExpo } from "@/lib/motion";
import { cn } from "@/lib/utils";

type CountryComparison = {
  country: string;
  flag: string;
  costLevel: string;
  accreditation: string;
  waitingTime: string;
  flightHours: string;
  languageSupport: string;
  specialtyRange: string;
  isRecommended?: boolean;
};

const comparisons: CountryComparison[] = [
  {
    country: "India",
    flag: "🇮🇳",
    costLevel: "30-70% lower",
    accreditation: "JCI, NABH, NABL",
    waitingTime: "1-3 days",
    flightHours: "3-5 hours",
    languageSupport: "English + Translators",
    specialtyRange: "All specialties",
    isRecommended: true,
  },
  {
    country: "Turkey",
    flag: "🇹🇷",
    costLevel: "20-50% lower",
    accreditation: "JCI (limited)",
    waitingTime: "3-7 days",
    flightHours: "4-6 hours",
    languageSupport: "Limited",
    specialtyRange: "Select specialties",
  },
  {
    country: "Thailand",
    flag: "🇹🇭",
    costLevel: "30-60% lower",
    accreditation: "JCI (some)",
    waitingTime: "5-10 days",
    flightHours: "6-9 hours",
    languageSupport: "Limited",
    specialtyRange: "Cosmetic focus",
  },
  {
    country: "UAE",
    flag: "🇦🇪",
    costLevel: "10-30% lower",
    accreditation: "JCI",
    waitingTime: "3-7 days",
    flightHours: "3-5 hours",
    languageSupport: "English + Arabic",
    specialtyRange: "Premium only",
  },
];

type WhyIndiaComparisonProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
};

export function WhyIndiaComparison({
  eyebrow = "Why Choose India",
  title = "India vs Other Destinations",
  description = "Compare medical tourism destinations to see why India is the preferred choice for Central Asian patients.",
}: WhyIndiaComparisonProps) {
  return (
    <section className="section-shell">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: easeOutExpo }}
          className="text-center"
        >
          <span className="section-kicker">{eyebrow}</span>
          <h2 className="mt-5 heading-section">{title}</h2>
          <p className="mt-4 body-lg mx-auto">{description}</p>
        </motion.div>

        {/* Desktop Table */}
        <div className="mt-12 hidden overflow-x-auto lg:block">
          <div className="min-w-[800px] overflow-hidden rounded-[2rem] border border-[#D6E8FF] bg-white/90 shadow-[0_24px_80px_rgba(7,27,58,0.08)] backdrop-blur-xl">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#D6E8FF] bg-gradient-to-r from-blue-50 to-sky-50">
                  <th className="p-5 text-left text-sm font-semibold text-[#0B1F4D]">
                    Feature
                  </th>
                  {comparisons.map((c) => (
                    <th
                      key={c.country}
                      className={cn(
                        "p-5 text-center text-sm font-semibold",
                        c.isRecommended
                          ? "bg-blue-600 text-white"
                          : "text-[#0B1F4D]"
                      )}
                    >
                      <div className="flex flex-col items-center gap-1">
                        <span className="text-2xl">{c.flag}</span>
                        <span>{c.country}</span>
                        {c.isRecommended && (
                          <span className="mt-1 rounded-full bg-white/20 px-2 py-0.5 text-[0.6rem] font-bold uppercase tracking-wider">
                            Recommended
                          </span>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { label: "Cost Savings", key: "costLevel" as const },
                  { label: "Accreditation", key: "accreditation" as const },
                  { label: "Waiting Time", key: "waitingTime" as const },
                  { label: "Flight from CA", key: "flightHours" as const },
                  { label: "Language Support", key: "languageSupport" as const },
                  { label: "Specialty Range", key: "specialtyRange" as const },
                ].map((row, i) => (
                  <tr
                    key={row.key}
                    className={cn(
                      "border-b border-slate-100",
                      i % 2 === 0 ? "bg-white/60" : "bg-slate-50/40"
                    )}
                  >
                    <td className="p-4 text-sm font-medium text-slate-700">
                      {row.label}
                    </td>
                    {comparisons.map((c) => (
                      <td
                        key={c.country}
                        className={cn(
                          "p-4 text-center text-sm",
                          c.isRecommended
                            ? "font-semibold text-blue-700"
                            : "text-slate-600"
                        )}
                      >
                        {c[row.key]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile Cards */}
        <div className="mt-12 grid gap-4 lg:hidden">
          {comparisons.map((c, index) => (
            <motion.div
              key={c.country}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className={cn(
                "overflow-hidden rounded-[1.5rem] border bg-white/90 p-5 shadow-[0_18px_48px_rgba(7,27,58,0.06)] backdrop-blur-xl",
                c.isRecommended
                  ? "border-blue-300 ring-2 ring-blue-100"
                  : "border-[#D6E8FF]"
              )}
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl">{c.flag}</span>
                <div>
                  <h3 className="text-lg font-semibold text-[#0B1F4D]">
                    {c.country}
                  </h3>
                  {c.isRecommended && (
                    <span className="inline-flex items-center rounded-full bg-blue-100 px-2 py-0.5 text-[0.6rem] font-bold uppercase text-blue-700">
                      Recommended
                    </span>
                  )}
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
                <div>
                  <p className="text-slate-400">Cost</p>
                  <p className="mt-0.5 font-medium text-slate-700">{c.costLevel}</p>
                </div>
                <div>
                  <p className="text-slate-400">Accreditation</p>
                  <p className="mt-0.5 font-medium text-slate-700">{c.accreditation}</p>
                </div>
                <div>
                  <p className="text-slate-400">Waiting Time</p>
                  <p className="mt-0.5 font-medium text-slate-700">{c.waitingTime}</p>
                </div>
                <div>
                  <p className="text-slate-400">Flight</p>
                  <p className="mt-0.5 font-medium text-slate-700">{c.flightHours}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 text-center"
        >
          <Link
            href="/treatment-in-india"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-700 to-blue-600 px-8 py-4 text-sm font-semibold text-white shadow-[0_18px_48px_rgba(29,78,216,0.24)] transition hover:-translate-y-0.5 hover:shadow-[0_24px_64px_rgba(29,78,216,0.32)]"
          >
            <Globe2 className="h-4 w-4" />
            Learn Why India Is the Best Choice
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}