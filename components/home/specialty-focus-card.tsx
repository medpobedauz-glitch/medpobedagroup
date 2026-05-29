"use client";

import Link from "next/link";
import type { ComponentType } from "react";
import dynamic from "next/dynamic";
import type { LucideProps } from "lucide-react";
import dynamicIconImports from "lucide-react/dynamicIconImports";
import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ChevronDown } from "lucide-react";

import type { MedicalSpecialty, MedicalSpecialtyIconKey } from "@/lib/medical-specialties";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type SpecialtyFocusCardProps = {
  specialty: MedicalSpecialty;
  expanded: boolean;
  onToggle: () => void;
};

const iconMap: Record<MedicalSpecialtyIconKey, ComponentType<LucideProps>> = {
  radiation: dynamic<LucideProps>(dynamicIconImports["radiation"]),
  "brain-circuit": dynamic<LucideProps>(dynamicIconImports["brain-circuit"]),
  bone: dynamic<LucideProps>(dynamicIconImports["bone"]),
  "heart-pulse": dynamic<LucideProps>(dynamicIconImports["heart-pulse"]),
  baby: dynamic<LucideProps>(dynamicIconImports["baby"]),
  venus: dynamic<LucideProps>(dynamicIconImports["venus"]),
  sparkles: dynamic<LucideProps>(dynamicIconImports["sparkles"]),
  scale: dynamic<LucideProps>(dynamicIconImports["scale"]),
  "scan-heart": dynamic<LucideProps>(dynamicIconImports["scan-heart"]),
  droplets: dynamic<LucideProps>(dynamicIconImports["droplets"]),
  microscope: dynamic<LucideProps>(dynamicIconImports["microscope"]),
};

export function SpecialtyFocusCard({
  specialty,
  expanded,
  onToggle,
}: SpecialtyFocusCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const Icon = iconMap[specialty.icon];
  const panelId = `specialty-panel-${specialty.id}`;

  return (
    <m.div
      layout
      transition={{ duration: prefersReducedMotion ? 0 : 0.38, ease: [0.22, 1, 0.36, 1] }}
      whileHover={prefersReducedMotion ? undefined : { y: -6 }}
      className="h-full"
    >
      <Card
        variant={expanded ? "panel" : "default"}
        className={cn(
          "gradient-ring h-full rounded-[1.7rem] border-slate-200/80 p-5 shadow-soft sm:p-6",
          expanded ? "shadow-panel" : "hover:border-cyan-300/20",
        )}
      >
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={expanded}
          aria-controls={panelId}
          className="w-full text-left"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex min-w-0 items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-sky-100 bg-[linear-gradient(180deg,rgba(240,249,255,1),rgba(224,242,254,0.92))] text-sky-700 shadow-[0_18px_36px_rgba(10,120,196,0.1)]">
                <Icon className="h-6 w-6" aria-hidden="true" />
              </div>
              <div className="min-w-0">
                <h3 className="text-xl font-semibold text-slate-950 sm:text-2xl">
                  {specialty.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {specialty.summary}
                </p>
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <span className="hidden rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-sky-700 sm:inline-flex">
                Explore
              </span>
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700">
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </span>
            </div>
          </div>
          <div className="mt-5 flex items-center justify-between border-t border-slate-200 pt-4">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-700">
              Specialist support available
            </p>
            <ChevronDown
              className={cn(
                "h-4 w-4 text-sky-700 transition-transform duration-300",
                expanded ? "rotate-180" : "rotate-0",
              )}
              aria-hidden="true"
            />
          </div>
        </button>

        <AnimatePresence initial={false}>
          {expanded ? (
            <m.div
              id={panelId}
              key="content"
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, height: 0 }}
              animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, height: "auto" }}
              exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="mt-5 grid gap-5 border-t border-slate-200 pt-5">
                <p className="text-sm leading-7 text-slate-600">{specialty.description}</p>

                <div className="grid gap-3">
                  {specialty.support.map((item) => (
                    <div
                      key={item}
                      className="rounded-[1.2rem] border border-slate-200 bg-slate-50 px-4 py-4 text-sm leading-7 text-slate-600"
                    >
                      {item}
                    </div>
                  ))}
                </div>

                <div className="rounded-[1.3rem] border border-sky-100 bg-sky-50 px-4 py-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-700">
                    International patient assistance
                  </p>
                  <p className="mt-3 text-sm leading-7 text-slate-700">
                    {specialty.patientSupport}
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button asChild variant="hero" size="lg" className="sm:flex-1">
                    <Link
                      href={`/international-patient-care?specialty=${encodeURIComponent(specialty.id)}`}
                    >
                      {specialty.ctaLabel}
                    </Link>
                  </Button>
                  <Button asChild variant="surface" size="lg" className="sm:flex-1">
                    <Link href={`/contact?specialty=${encodeURIComponent(specialty.id)}`}>
                      Speak to coordination desk
                    </Link>
                  </Button>
                </div>
              </div>
            </m.div>
          ) : null}
        </AnimatePresence>
      </Card>
    </m.div>
  );
}
