"use client";

import { motion } from "framer-motion";
import {
  ArrowRightLeft,
  Building2,
  PlaneTakeoff,
  ShieldCheck,
  TimerReset,
} from "lucide-react";

import { FadeIn } from "@/components/shared/fade-in";
import { ImageCard } from "@/components/shared/image-card";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { getSiteImage } from "@/lib/site-images";

const nodes = [
  { city: "Tashkent", label: "Operating base", top: "42%", left: "24%" },
  { city: "New Delhi", label: "Specialist network", top: "56%", left: "58%" },
  { city: "Mumbai", label: "Hospital access lane", top: "68%", left: "50%" },
  { city: "Bengaluru", label: "Referral support", top: "72%", left: "62%" },
];

const pathways = [
  "Institutional outreach and hospital collaboration",
  "International patient intake with secure document collection",
  "Referral-ready case review and follow-through communication",
];

const operationalCards = [
  {
    title: "Travel readiness",
    description: "Support for timing, documentation, and patient-family expectation setting.",
    icon: PlaneTakeoff,
  },
  {
    title: "Hospital dialogue",
    description: "Cleaner institutional presentation for hospitals, desks, and administrators.",
    icon: Building2,
  },
];

export function HomeOperationsMap() {
  const partnershipImage = getSiteImage("homeHospitalPartnership");
  const reviewImage = getSiteImage("homeSpecialistReview");

  return (
    <section className="section-shell">
      <div className="container-wide">
        <div className="section-frame-soft px-6 py-8 sm:px-8 lg:px-10 lg:py-10">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.12),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(34,211,238,0.08),transparent_24%)]" />
          <div className="pointer-events-none absolute inset-0 section-noise opacity-35" />

          <div className="relative grid gap-8 xl:grid-cols-[0.98fr_1.02fr] xl:items-start">
            <div className="grid gap-6">
              <FadeIn className="max-w-3xl">
                <div className="flex flex-wrap items-center gap-3">
                  <Badge variant="solid">Global Operations Map</Badge>
                  <span className="rounded-full border border-slate-200 bg-white/86 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-slate-700 shadow-[0_12px_28px_rgba(15,23,42,0.06)]">
                    Bilateral corridor visibility
                  </span>
                </div>
                <h2 className="mt-6 heading-section">
                  A healthcare corridor that feels operational, human, and institution-ready
                </h2>
                <p className="mt-5 body-lg max-w-2xl">
                  The public experience now shows real movement between consultations,
                  hospitals, specialists, and patient assistance touchpoints with more
                  structure, stronger hierarchy, and less empty space.
                </p>
              </FadeIn>

              <Card variant="panel" className="relative overflow-hidden p-6 lg:p-7">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_38%_34%,rgba(56,189,248,0.09),transparent_30%)]" />
                <div className="absolute inset-0 grid-enterprise opacity-30" />
                <div className="relative flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="max-w-xl">
                    <p className="section-kicker">Cross-Border Care Grid</p>
                    <h3 className="mt-3 font-display text-2xl font-semibold text-slate-950">
                      Uzbekistan coordination desk connected to Indian hospital ecosystems
                    </h3>
                  </div>
                  <Badge variant="surface">Live routing logic</Badge>
                </div>

                <div className="relative mt-8 aspect-[1.34] rounded-[1.9rem] border border-slate-200/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(240,247,255,0.96))]">
                  <div className="absolute left-[26%] top-[47%] h-[2px] w-[30%] origin-left bg-gradient-to-r from-sky-400/70 to-blue-500/35" />
                  <div className="absolute left-[27%] top-[49%] h-[2px] w-[22%] rotate-[26deg] origin-left bg-gradient-to-r from-sky-400/60 to-blue-500/35" />
                  <div className="absolute left-[27%] top-[48%] h-[2px] w-[34%] rotate-[34deg] origin-left bg-gradient-to-r from-sky-400/40 to-blue-500/25" />
                  {nodes.map((node, index) => (
                    <motion.div
                      key={node.city}
                      className="absolute"
                      style={{ top: node.top, left: node.left }}
                      animate={{ y: index % 2 === 0 ? [-5, 5, -5] : [5, -5, 5] }}
                      transition={{ repeat: Infinity, duration: 6 + index, ease: "easeInOut" }}
                    >
                      <div className="relative">
                        <span className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-200/40 blur-xl" />
                        <div className="relative rounded-full border border-sky-100 bg-white px-3 py-2 shadow-[0_18px_40px_rgba(15,23,42,0.1)] backdrop-blur-xl">
                          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-700">
                            {node.city}
                          </p>
                          <p className="mt-1 text-xs text-slate-500">{node.label}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-6 grid gap-3">
                  {pathways.map((item) => (
                    <div
                      key={item}
                      className="rounded-[1.4rem] border border-slate-200/90 bg-white/88 px-4 py-4 text-sm leading-7 text-slate-600"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            <div className="grid gap-6">
              <div className="grid gap-6 lg:grid-cols-[1.06fr_0.94fr]">
                <ImageCard
                  asset={partnershipImage}
                  title="Hospital partnership and coordination visibility"
                  description="The corridor is grounded in real meetings, specialists, and international execution."
                  aspectClassName="aspect-[16/11]"
                />
                <Card variant="dashboard" className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-sky-100 bg-sky-50 text-sky-700">
                      <ArrowRightLeft className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="section-kicker">Operational Shape</p>
                      <h3 className="mt-3 font-display text-2xl font-semibold text-slate-950">
                        Enterprise pathways for each healthcare objective
                      </h3>
                    </div>
                  </div>
                  <div className="story-divider mt-6" />
                  <div className="mt-6 grid gap-4">
                    {operationalCards.map((item) => {
                      const Icon = item.icon;

                      return (
                        <div
                          key={item.title}
                          className="rounded-[1.4rem] border border-slate-200 bg-white p-4"
                        >
                          <Icon className="h-5 w-5 text-sky-700" />
                          <p className="mt-4 text-base font-semibold text-slate-950">
                            {item.title}
                          </p>
                          <p className="mt-2 text-sm leading-7 text-slate-600">
                            {item.description}
                          </p>
                        </div>
                      );
                    })}
                    <div className="rounded-[1.4rem] border border-sky-100 bg-sky-50 px-4 py-4 text-sm leading-7 text-slate-700">
                      <div className="flex items-start gap-3">
                        <ShieldCheck className="mt-1 h-5 w-5 text-sky-700" />
                        <p>
                          The public UX now emphasizes confidential intake, route clarity,
                          and operational credibility instead of generic marketing language.
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>

              <div className="grid gap-6 lg:grid-cols-[0.88fr_1.12fr]">
                <ImageCard
                  asset={reviewImage}
                  title="Diagnostics and specialist review support"
                  description="Clinical seriousness now sits inside a richer white surface system rather than flat promotional blocks."
                  aspectClassName="aspect-[4/5] sm:aspect-[16/11]"
                />
                <Card variant="muted" className="overflow-hidden p-0">
                  <div className="border-b border-slate-200 px-6 py-5">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="section-kicker">Operational Narrative</p>
                        <h3 className="mt-3 font-display text-2xl font-semibold text-slate-950">
                          The cross-border story now has process, proof, and visual balance
                        </h3>
                      </div>
                      <div className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600">
                        Faster orientation for serious inquiries
                      </div>
                    </div>
                  </div>
                  <div className="grid gap-px bg-slate-200 md:grid-cols-2">
                    {[
                      "Premium light surfaces with healthcare blue accents and layered visual rhythm",
                      "Stronger image-to-content balance so operations feel real, not abstract",
                      "More connected cards that behave like one system instead of separate modules",
                      "Clearer conversion pathways for patients, hospitals, and institutional stakeholders",
                    ].map((item) => (
                      <div key={item} className="bg-white px-6 py-5 text-sm leading-7 text-slate-600">
                        {item}
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-slate-200 bg-white px-6 py-5">
                    <div className="flex items-center gap-3 rounded-[1.2rem] border border-slate-200/80 bg-slate-50 px-4 py-4 text-sm leading-7 text-slate-600">
                      <TimerReset className="h-4 w-4 shrink-0 text-sky-700" />
                      <p>
                        Every route is framed to reduce hesitation before case submission or
                        hospital conversation.
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
