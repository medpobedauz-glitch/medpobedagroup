"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  FileCheck2,
  HeartPulse,
  ShieldCheck,
  Sparkles,
  Stethoscope,
} from "lucide-react";

import { AnimatedCounter } from "@/components/shared/animated-counter";
import { ImageCard } from "@/components/shared/image-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getSiteImage } from "@/lib/site-images";
import { staggerContainer, staggerItem } from "@/lib/motion";

const metrics = [
  {
    value: 2,
    label: "Connected healthcare markets",
    description: "A disciplined bridge between Uzbekistan and India for serious medical coordination.",
  },
  {
    value: 5,
    label: "Strategic service lanes",
    description: "Institutional partnerships, patient movement, referrals, specialist coordination, and care support.",
  },
  {
    value: 4,
    label: "Core coordination phases",
    description: "Review, specialist matching, travel readiness, and ongoing communication support.",
  },
];

const trustSignals = [
  "Confidential medical intake",
  "Hospital partnership dialogue",
  "International patient movement",
];

const signalCards = [
  {
    title: "Structured case intake",
    description: "Purpose-built flows for hospitals, patient families, and international healthcare stakeholders.",
    icon: ShieldCheck,
  },
  {
    title: "Referral-grade communication",
    description: "A cleaner operating layer for specialist routing, hospital dialogue, and follow-through.",
    icon: Building2,
  },
  {
    title: "Human trust at enterprise quality",
    description: "Premium UX without losing the reassurance required for real medical decisions.",
    icon: HeartPulse,
  },
];

const carePhases = [
  {
    title: "Case packaging",
    description: "Clinical reports, diagnostics, and family context are prepared for hospital review.",
    icon: FileCheck2,
  },
  {
    title: "Hospital routing",
    description: "The inquiry moves into the right specialist or institutional pathway without friction.",
    icon: Stethoscope,
  },
  {
    title: "Journey support",
    description: "Travel readiness, communication continuity, and patient guidance remain visible.",
    icon: BadgeCheck,
  },
];

export function HomeExperienceHero() {
  const heroImage = getSiteImage("homeHeroDoctors");
  const networkImage = getSiteImage("homeHospitalNetwork");
  const coordinatorImage = getSiteImage("homePatientCoordinator");

  return (
    <section className="relative overflow-hidden pt-5 lg:pt-7">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_12%,rgba(125,211,252,0.24),transparent_24%),radial-gradient(circle_at_82%_14%,rgba(96,165,250,0.22),transparent_26%),linear-gradient(180deg,rgba(255,255,255,0.9),rgba(247,250,255,0.94),rgba(241,247,255,0.98))]" />
      <div className="absolute inset-0 section-noise opacity-45" />
      <motion.div
        className="absolute left-[-10%] top-[8%] h-[26rem] w-[26rem] rounded-full bg-sky-200/35 blur-3xl"
        animate={{ y: [-18, 14, -18], x: [0, 24, 0] }}
        transition={{ repeat: Infinity, duration: 13, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-[-8%] top-[14%] h-[32rem] w-[32rem] rounded-full bg-blue-100/42 blur-3xl"
        animate={{ y: [12, -20, 12], x: [0, -18, 0] }}
        transition={{ repeat: Infinity, duration: 15, ease: "easeInOut" }}
      />

      <div className="container-wide relative pb-10 lg:pb-20">
        <div className="section-frame px-6 py-7 sm:px-8 lg:px-10 lg:py-10">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.12),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(37,99,235,0.09),transparent_28%)]" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-300/60 to-transparent" />

          <div className="relative grid items-start gap-8 lg:grid-cols-[1.04fr_0.96fr]">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="show"
              className="max-w-3xl"
            >
              <motion.div variants={staggerItem} className="flex flex-wrap items-center gap-3">
                <Badge variant="solid">Enterprise Healthcare Experience</Badge>
                <span className="rounded-full border border-slate-200 bg-white/88 px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.26em] text-sky-700 shadow-[0_12px_28px_rgba(15,23,42,0.06)]">
                  Tashkent-led operating desk
                </span>
              </motion.div>

              <motion.h1 variants={staggerItem} className="mt-7 heading-display max-w-3xl">
                International healthcare coordination with the confidence of a premium medical enterprise.
              </motion.h1>

              <motion.p variants={staggerItem} className="mt-6 max-w-2xl body-lg">
                MedPobeda Group combines serious medical trust, hospital-facing clarity,
                and richer healthcare storytelling so international patients and partners
                understand the quality of the coordination before the first conversation starts.
              </motion.p>

              <motion.div variants={staggerItem} className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Button asChild variant="hero" size="2xl">
                  <Link href="/contact">
                    Open Coordination Desk
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="2xl">
                  <Link href="/international-patient-care">Submit Patient Case</Link>
                </Button>
              </motion.div>

              <motion.div variants={staggerItem} className="mt-8 flex flex-wrap gap-3">
                {trustSignals.map((signal) => (
                  <span
                    key={signal}
                    className="rounded-full border border-slate-200/90 bg-white/86 px-4 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-700 shadow-[0_14px_32px_rgba(15,23,42,0.06)]"
                  >
                    {signal}
                  </span>
                ))}
              </motion.div>

              <motion.div
                variants={staggerItem}
                className="mt-8 rounded-[2rem] border border-slate-200/80 bg-white/78 p-5 shadow-[0_20px_60px_rgba(8,22,52,0.08)] backdrop-blur-2xl lg:p-6"
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                  <div className="max-w-xl">
                    <p className="section-kicker">Live Trust Architecture</p>
                    <p className="mt-3 font-display text-2xl font-semibold text-slate-950">
                      Built to feel decisive, humane, and institution-ready from the first screen
                    </p>
                  </div>
                  <div className="rounded-full border border-sky-100 bg-sky-50/90 px-4 py-2 text-sm font-medium text-sky-800">
                    Patient, hospital, and stakeholder routes aligned
                  </div>
                </div>
                <div className="story-divider mt-6" />
                <div className="mt-6 grid gap-4 sm:grid-cols-3">
                  {metrics.map((item) => (
                    <Card
                      key={item.label}
                      variant="muted"
                      className="rounded-[1.6rem] border-slate-200/80 bg-white/88 p-5"
                    >
                      <p className="text-xs uppercase tracking-[0.24em] text-sky-700">
                        {item.label}
                      </p>
                      <p className="mt-4 font-display text-4xl font-semibold text-slate-950">
                        <AnimatedCounter value={item.value} />
                      </p>
                      <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
                    </Card>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <div className="absolute inset-8 rounded-full bg-sky-200/26 blur-3xl" />
              <div className="relative grid gap-5">
                <div className="relative">
                  <ImageCard
                    asset={heroImage}
                    title="International patient consultation at enterprise quality"
                    description="Doctors, coordinators, and patient families are now framed inside a richer premium healthcare story."
                    aspectClassName="aspect-[16/10]"
                    className="rounded-[2.3rem]"
                    priority
                  />
                  <Card className="absolute right-5 top-5 hidden max-w-[15rem] border-white/80 bg-white/88 p-4 shadow-[0_24px_58px_rgba(15,23,42,0.16)] backdrop-blur-2xl lg:block">
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-sky-50 text-sky-700">
                        <Sparkles className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-[0.24em] text-sky-700">
                          Premium Positioning
                        </p>
                        <p className="mt-2 text-sm leading-6 text-slate-600">
                          Cleaner, richer, and more emotional than a generic hospital brochure layout.
                        </p>
                      </div>
                    </div>
                  </Card>
                </div>

                <div className="grid gap-5 xl:grid-cols-[0.84fr_1.16fr]">
                  <div className="grid gap-5">
                    <ImageCard
                      asset={networkImage}
                      title="Hospital network visibility"
                      description="Institutional trust is grounded in real partnership and destination imagery."
                      aspectClassName="aspect-[4/5] sm:aspect-[16/11]"
                    />
                    <ImageCard
                      asset={coordinatorImage}
                      title="Dedicated case manager support"
                      description="A human coordination layer is visible everywhere the patient needs reassurance."
                      aspectClassName="aspect-[16/11]"
                    />
                  </div>

                  <Card variant="panel" className="overflow-hidden p-6 lg:p-7">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="section-kicker">Care Flow</p>
                        <p className="mt-2 font-display text-2xl font-semibold text-slate-950">
                          Conversion-ready trust with operational depth
                        </p>
                      </div>
                      <Badge variant="surface">Live service logic</Badge>
                    </div>

                    <div className="mt-5 grid gap-4">
                      {signalCards.map((item) => {
                        const Icon = item.icon;

                        return (
                          <div
                            key={item.title}
                            className="rounded-[1.5rem] border border-slate-200 bg-white/90 p-5"
                          >
                            <div className="flex items-start gap-4">
                              <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-sky-100 bg-sky-50 text-sky-700">
                                <Icon className="h-5 w-5" />
                              </div>
                              <div>
                                <p className="text-base font-semibold text-slate-950">{item.title}</p>
                                <p className="mt-2 text-sm leading-7 text-slate-600">
                                  {item.description}
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="mt-6 rounded-[1.7rem] border border-slate-200/90 bg-slate-50/90 p-5">
                      <p className="section-kicker">Coordination Timeline</p>
                      <div className="mt-4 grid gap-4">
                        {carePhases.map((phase, index) => {
                          const Icon = phase.icon;

                          return (
                            <div key={phase.title} className="flex items-start gap-4">
                              <div className="flex flex-col items-center">
                                <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-sky-100 bg-white text-sky-700 shadow-[0_10px_24px_rgba(14,116,144,0.08)]">
                                  <Icon className="h-4 w-4" />
                                </div>
                                {index < carePhases.length - 1 ? (
                                  <span className="mt-2 h-10 w-px bg-gradient-to-b from-sky-300 to-slate-200" />
                                ) : null}
                              </div>
                              <div className="pt-1">
                                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">
                                  {phase.title}
                                </p>
                                <p className="mt-2 text-sm leading-7 text-slate-600">
                                  {phase.description}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
