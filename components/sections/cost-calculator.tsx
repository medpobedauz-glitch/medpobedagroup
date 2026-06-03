"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Calculator,
  Check,
  Hotel,
  Plane,
  Receipt,
  Sparkles,
  Stethoscope,
  TrendingDown,
  Users,
} from "lucide-react";
import { useMemo, useState } from "react";

import {
  CURRENCY_SYMBOLS,
  COUNTRIES,
  HOTEL_TIERS,
  calculate,
  listTreatmentChoices,
  type CalculatorInput,
  type CountryCode,
  type HotelTier,
} from "@/lib/data/cost-calculator";
import { easeOutExpo } from "@/lib/motion";
import { cn } from "@/lib/utils";

const DEFAULT_INPUT: CalculatorInput = {
  treatmentSlug: listTreatmentChoices()[0]?.slug ?? "heart-valve-replacement",
  countryCode: "UZ",
  hotelTier: "comfort",
  days: 10,
  companions: 1,
};

function formatMoney(value: number, currency: keyof typeof CURRENCY_SYMBOLS) {
  const symbol = CURRENCY_SYMBOLS[currency];
  const formatted = value.toLocaleString("en-US", { maximumFractionDigits: 0 });
  // Currencies like UZS / KGS / TJS have the symbol prefix already
  if (symbol.endsWith(" ")) return `${symbol}${formatted}`;
  return `${symbol}${formatted}`;
}

export function CostCalculator() {
  const [input, setInput] = useState<CalculatorInput>(DEFAULT_INPUT);
  const treatments = useMemo(() => listTreatmentChoices(), []);

  const result = useMemo(() => calculate(input), [input]);

  const update = <K extends keyof CalculatorInput>(key: K, value: CalculatorInput[K]) => {
    setInput((current) => ({ ...current, [key]: value }));
  };

  if (!result) {
    return (
      <div className="rounded-2xl border border-rose-200 bg-rose-50 p-6 text-sm text-rose-700">
        Calculator is not configured correctly. Please refresh the page.
      </div>
    );
  }

  const totalUSD = result.totalUSD;
  const lineItemsExcludingBuffer = result.lineItems.filter(
    (item) => item.label !== "Contingency buffer",
  );

  return (
    <div className="grid gap-6 lg:grid-cols-[1.05fr_1fr]">
      {/* Inputs panel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: easeOutExpo }}
        className="surface-panel rounded-[1.6rem] border border-[#D6E8FF] p-6 sm:p-7"
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <span className="section-kicker">Cost Calculator</span>
            <h2 className="heading-section mt-3">Estimate your total trip cost</h2>
            <p className="body-lg mt-2">
              Pick a treatment, your country, and travel preferences — we'll show a line-item
              breakdown in your local currency, no email required.
            </p>
          </div>
          <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-sky-500 text-white shadow-md sm:flex">
            <Calculator className="h-5 w-5" />
          </div>
        </div>

        <div className="mt-7 grid gap-5">
          <FieldGroup label="Treatment" icon={Stethoscope}>
            <select
              value={input.treatmentSlug}
              onChange={(e) => update("treatmentSlug", e.target.value)}
              className="select-enterprise"
            >
              {treatments.map((t) => (
                <option key={t.slug} value={t.slug}>
                  {t.name} — {t.category} (from ${t.from.toLocaleString("en-US")})
                </option>
              ))}
            </select>
          </FieldGroup>

          <div className="grid gap-5 sm:grid-cols-2">
            <FieldGroup label="Your country" icon={Plane}>
              <select
                value={input.countryCode}
                onChange={(e) => update("countryCode", e.target.value as CountryCode)}
                className="select-enterprise"
              >
                {COUNTRIES.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.flag} {c.name}
                  </option>
                ))}
              </select>
            </FieldGroup>

            <FieldGroup label="Stay (days)" icon={Plane}>
              <input
                type="number"
                min={1}
                max={60}
                value={input.days}
                onChange={(e) => update("days", Math.max(1, Math.min(60, Number(e.target.value) || 1)))}
                className="select-enterprise"
              />
            </FieldGroup>
          </div>

          <FieldGroup label="Accommodation tier" icon={Hotel}>
            <div className="grid gap-2.5 sm:grid-cols-3">
              {(Object.keys(HOTEL_TIERS) as HotelTier[]).map((tier) => {
                const hotel = HOTEL_TIERS[tier];
                const isActive = input.hotelTier === tier;
                return (
                  <button
                    key={tier}
                    type="button"
                    onClick={() => update("hotelTier", tier)}
                    className={cn(
                      "flex flex-col items-start gap-1 rounded-2xl border p-3 text-left text-xs transition",
                      isActive
                        ? "border-blue-400 bg-blue-50/80 ring-2 ring-blue-200"
                        : "border-slate-200 bg-white hover:border-blue-200",
                    )}
                  >
                    <span className="font-semibold text-slate-900">{hotel.label}</span>
                    <span className="text-[0.7rem] text-slate-500">
                      ${hotel.perNightUSD}/night
                    </span>
                  </button>
                );
              })}
            </div>
          </FieldGroup>

          <FieldGroup label="Travel companions" icon={Users}>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => update("companions", Math.max(0, input.companions - 1))}
                className="h-11 w-11 rounded-full border border-slate-200 bg-white text-lg font-semibold text-slate-700 transition hover:border-blue-300 hover:text-blue-700"
                aria-label="Remove a companion"
              >
                −
              </button>
              <span className="w-10 text-center text-base font-semibold text-slate-900">
                {input.companions}
              </span>
              <button
                type="button"
                onClick={() => update("companions", Math.min(4, input.companions + 1))}
                className="h-11 w-11 rounded-full border border-slate-200 bg-white text-lg font-semibold text-slate-700 transition hover:border-blue-300 hover:text-blue-700"
                aria-label="Add a companion"
              >
                +
              </button>
              <span className="ml-2 text-xs text-slate-500">
                {input.companions === 0
                  ? "Travelling alone"
                  : `${input.companions} companion${input.companions === 1 ? "" : "s"} joining`}
              </span>
            </div>
          </FieldGroup>
        </div>
      </motion.div>

      {/* Results panel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: easeOutExpo, delay: 0.05 }}
        className="section-frame-accent relative overflow-hidden p-6 sm:p-7"
      >
        <div className="flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-blue-700">
          <Receipt className="h-3.5 w-3.5" />
          Your estimate
        </div>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-[0.7rem] font-semibold text-slate-500">
            {result.country.flag} {result.country.name} · {result.displayCurrency}
          </span>
        </div>
        <p className="mt-1 text-4xl font-bold tracking-tight text-[#0B1F4D] sm:text-5xl">
          {formatMoney(result.displayTotal, result.displayCurrency)}
        </p>
        <p className="mt-1 text-xs text-slate-500">
          ≈ ${totalUSD.toLocaleString("en-US", { maximumFractionDigits: 0 })} USD total
        </p>

        {result.savingsVsUS > 0 && (
          <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
            <TrendingDown className="h-3.5 w-3.5" />
            Save ~${Math.round(result.savingsVsUS).toLocaleString("en-US")} vs typical US cost
          </div>
        )}

        <div className="mt-6 space-y-1.5">
          {lineItemsExcludingBuffer.map((item) => (
            <div
              key={item.label}
              className="flex items-start justify-between gap-3 border-b border-dashed border-slate-200/70 py-2 text-xs last:border-0"
            >
              <div className="min-w-0">
                <p className="font-semibold text-slate-900">{item.label}</p>
                {item.detail ? <p className="mt-0.5 text-[0.7rem] text-slate-500">{item.detail}</p> : null}
              </div>
              <span className="shrink-0 font-semibold tabular-nums text-slate-900">
                ${item.amountUSD.toLocaleString("en-US")}
              </span>
            </div>
          ))}
          <div className="flex items-center justify-between pt-2 text-xs text-slate-500">
            <span>+ 8% contingency buffer</span>
            <span className="font-semibold tabular-nums text-slate-700">
              ${result.bufferUSD.toLocaleString("en-US")}
            </span>
          </div>
        </div>

        <ul className="mt-5 space-y-1.5">
          {result.notes.slice(0, 2).map((note) => (
            <li key={note} className="flex items-start gap-2 text-[0.7rem] leading-5 text-slate-600">
              <Check className="mt-0.5 h-3 w-3 shrink-0 text-emerald-500" />
              <span>{note}</span>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
          <Link
            href={`/international-patients?treatment=${input.treatmentSlug}&country=${input.countryCode}&days=${input.days}`}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-700 to-blue-600 px-5 py-3 text-sm font-bold text-white shadow-md transition hover:-translate-y-0.5"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Request this estimate
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-[#D6E8FF] bg-white px-5 py-3 text-sm font-bold text-[#0B1F4D]"
          >
            Talk to a coordinator
          </Link>
        </div>

        <p className="mt-4 text-[0.65rem] leading-4 text-slate-400">
          Estimate is illustrative. Final hospital cost depends on your specific case, chosen hospital, and any complications. We will send a personalised quote within 48 hours of receiving your medical reports.
        </p>
      </motion.div>
    </div>
  );
}

type FieldGroupProps = {
  label: string;
  icon: typeof Stethoscope;
  children: React.ReactNode;
};

function FieldGroup({ label, icon: Icon, children }: FieldGroupProps) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-slate-700">
        <Icon className="h-3.5 w-3.5 text-slate-500" />
        {label}
      </span>
      {children}
    </label>
  );
}
