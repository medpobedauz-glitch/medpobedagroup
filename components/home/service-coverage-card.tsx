"use client";

import { m, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import type { ServiceCoverageItem } from "@/lib/service-coverage";
import { Card } from "@/components/ui/card";

type ServiceCoverageCardProps = {
  item: ServiceCoverageItem;
  index: number;
};

export function ServiceCoverageCard({
  item,
  index,
}: ServiceCoverageCardProps) {
  const Icon = item.icon;
  const prefersReducedMotion = useReducedMotion();

  return (
    <m.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{
        duration: prefersReducedMotion ? 0 : 0.56,
        delay: prefersReducedMotion ? 0 : index * 0.05,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={prefersReducedMotion ? undefined : { y: -7 }}
      className="h-full"
    >
      <Card
        variant="light"
        className="group h-full rounded-[1.7rem] border border-sky-100/90 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(240,248,255,0.94))] p-6 shadow-[0_22px_60px_rgba(8,22,52,0.08)] transition-colors hover:border-cyan-200/80"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-cyan-100 bg-[linear-gradient(180deg,rgba(240,249,255,1),rgba(224,242,254,0.92))] text-brand-700 shadow-[0_14px_36px_rgba(14,116,144,0.12)]">
            <Icon className="h-6 w-6" aria-hidden="true" />
          </div>
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-slate-200/80 bg-white/90 text-slate-500 transition group-hover:border-cyan-200 group-hover:text-brand-700">
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </div>
        </div>
        <h3 className="mt-6 font-display text-2xl font-semibold leading-tight text-slate-950">
          {item.title}
        </h3>
        <p className="mt-4 text-sm leading-7 text-slate-600">
          {item.description}
        </p>
      </Card>
    </m.div>
  );
}
