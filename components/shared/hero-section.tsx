"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Building2,
  FileText,
  Globe2,
  HeartHandshake,
  PlaneTakeoff,
  ShieldCheck,
  Stethoscope,
  Video,
} from "lucide-react";

import { FadeIn } from "@/components/shared/fade-in";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { siteConfig } from "@/lib/site";
import { PublicLink } from "@/components/shared/public-link";

const heroHighlights = [
  {
    icon: Building2,
    title: "Hospital cooperation models",
    text: "Referral design, specialist access, and international desk coordination for Uzbekistan institutions.",
  },
  {
    icon: PlaneTakeoff,
    title: "Medical tourism pathways",
    text: "Structured treatment movement from Uzbekistan to India with clarity across each step.",
  },
  {
    icon: HeartHandshake,
    title: "Cross-border patient support",
    text: "A trusted coordination layer between patients, hospitals, doctors, and international teams.",
  },
];

const floatingCards = [
  { icon: ShieldCheck, label: "Confidential Coordination", position: "left-4 top-12" },
  { icon: Video, label: "Telemedicine", position: "right-8 top-10" },
  { icon: Stethoscope, label: "Specialist Access", position: "left-10 bottom-10" },
  { icon: FileText, label: "Referral Ready", position: "right-4 bottom-14" },
];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_12%,rgba(34,211,238,0.22),transparent_22%),radial-gradient(circle_at_84%_14%,rgba(29,78,216,0.26),transparent_24%),linear-gradient(180deg,rgba(7,18,38,0.9),rgba(11,31,77,0.82),rgba(7,18,38,0.94))]" />
      <motion.div
        className="absolute left-[-12%] top-[10%] h-[24rem] w-[24rem] rounded-full bg-cyan-300/14 blur-3xl"
        animate={{ y: [-20, 10, -20], x: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-[-6%] top-[18%] h-[28rem] w-[28rem] rounded-full bg-blue-500/18 blur-3xl"
        animate={{ y: [10, -18, 10], x: [0, -18, 0] }}
        transition={{ repeat: Infinity, duration: 14, ease: "easeInOut" }}
      />
      <div className="absolute inset-0 bg-grid-fade bg-[size:70px_70px] opacity-30" />
      <div className="relative mx-auto grid min-h-[calc(100vh-7rem)] max-w-7xl items-center gap-14 px-6 pb-20 pt-16 lg:grid-cols-[1.02fr_0.98fr] lg:px-8">
        <FadeIn className="max-w-3xl">
          <Badge variant="default" className="border-cyan-200/20 bg-white/10 text-cyan-100">
            {siteConfig.tagline}
          </Badge>
          <div className="mt-7 flex flex-wrap gap-3">
            <span className="rounded-full border border-white/10 bg-white/8 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-100/75">
              Tashkent Coordination Base
            </span>
            <span className="rounded-full border border-white/10 bg-white/8 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-100/75">
              Uzbekistan-India Healthcare Bridge
            </span>
          </div>
          <h1 className="mt-7 font-display text-5xl font-semibold leading-[1.08] text-white sm:text-6xl sm:leading-[1.04] lg:text-7xl lg:leading-[1.01]">
            Connecting Uzbekistan with Global Healthcare Opportunities
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-200 sm:text-xl">
            MedPobeda Group facilitates international healthcare collaboration,
            medical tourism, hospital partnerships, patient coordination, and
            student mobility across Central Asia and India.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Button asChild variant="hero" size="xl">
              <PublicLink href="/contact">
                Partner With Us
                <ArrowRight className="h-4 w-4" />
              </PublicLink>
            </Button>
            <Button asChild variant="outline" size="xl">
              <PublicLink href="/international-patient-care">
                Explore International Patient Care
              </PublicLink>
            </Button>
            <Button asChild variant="ghost" size="xl" className="justify-start sm:justify-center">
              <PublicLink href="/contact">Contact Us</PublicLink>
            </Button>
          </div>
          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            {heroHighlights.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="rounded-[1.5rem] border border-white/10 bg-white/8 p-4 backdrop-blur-xl"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-200/20 bg-cyan-300/10 text-cyan-100">
                    <Icon className="h-5 w-5" />
                  </div>
                  <p className="mt-4 text-base font-semibold text-white">{item.title}</p>
                  <p className="mt-2 text-sm leading-7 text-slate-300">{item.text}</p>
                </div>
              );
            })}
          </div>
        </FadeIn>
        <FadeIn delay={0.1} className="relative">
          <div className="absolute inset-8 rounded-full bg-cyan-300/18 blur-3xl" />
          {floatingCards.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.label}
                className={`absolute hidden rounded-full border border-white/10 bg-white/10 px-4 py-3 text-sm font-medium text-white backdrop-blur-xl xl:flex ${item.position}`}
                animate={{ y: index % 2 === 0 ? [-8, 8, -8] : [8, -8, 8] }}
                transition={{ repeat: Infinity, duration: 7 + index, ease: "easeInOut" }}
              >
                <Icon className="mr-2 h-4 w-4 text-cyan-100" />
                {item.label}
              </motion.div>
            );
          })}
          <Card className="relative overflow-hidden border-white/14 bg-white/8 p-6 shadow-premium">
            <div className="absolute inset-0 bg-[linear-gradient(140deg,rgba(255,255,255,0.12),transparent_42%,rgba(34,211,238,0.08))]" />
            <div className="relative flex items-center justify-between rounded-[1.6rem] border border-white/10 bg-slate-950/45 px-5 py-4">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-cyan-100/70">
                  International Healthcare Network
                </p>
                <p className="mt-2 text-xl font-semibold text-white">
                  Uzbekistan to India Coordination Layer
                </p>
              </div>
              <div className="hidden rounded-full border border-cyan-200/20 bg-cyan-300/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-100 sm:block">
                Premium Access
              </div>
            </div>
            <div className="relative mt-5 grid gap-4">
              <div className="grid gap-4 sm:grid-cols-[1.1fr_0.9fr]">
                <div className="rounded-[1.6rem] border border-white/10 bg-white/7 p-5 backdrop-blur-xl">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-200/20 bg-cyan-300/10 text-cyan-100">
                      <Globe2 className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm uppercase tracking-[0.24em] text-cyan-100/70">
                        Cross-Border Route
                      </p>
                      <p className="mt-1 text-lg font-semibold text-white">
                        Tashkent to India specialist ecosystems
                      </p>
                    </div>
                  </div>
                  <div className="mt-6 grid gap-3">
                    <div className="rounded-[1.2rem] border border-white/10 bg-slate-950/30 px-4 py-3 text-sm text-slate-200">
                      Local hospital dialogue and patient coordination
                    </div>
                    <div className="rounded-[1.2rem] border border-white/10 bg-slate-950/30 px-4 py-3 text-sm text-slate-200">
                      Specialist matching, second opinions, and referrals
                    </div>
                    <div className="rounded-[1.2rem] border border-white/10 bg-slate-950/30 px-4 py-3 text-sm text-slate-200">
                      Travel readiness, treatment planning, and follow-through
                    </div>
                  </div>
                </div>
                <div className="rounded-[1.6rem] border border-white/10 bg-slate-950/36 p-5">
                  <p className="text-sm uppercase tracking-[0.24em] text-cyan-100/70">
                    Priority Lanes
                  </p>
                  <div className="mt-5 grid gap-3">
                    {[
                      "Patient Referrals",
                      "Hospital Partnerships",
                      "Telemedicine",
                      "Student Mobility",
                    ].map((item) => (
                      <div
                        key={item}
                        className="rounded-[1.2rem] border border-white/10 bg-white/7 px-4 py-3 text-sm font-medium text-white"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/35 p-4">
                  <p className="text-sm uppercase tracking-[0.24em] text-cyan-100/70">
                    Operating Base
                  </p>
                  <p className="mt-3 font-display text-2xl font-semibold text-white">
                    Uzbekistan
                  </p>
                </div>
                <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/35 p-4">
                  <p className="text-sm uppercase tracking-[0.24em] text-cyan-100/70">
                    Destination Network
                  </p>
                  <p className="mt-3 font-display text-2xl font-semibold text-white">
                    India
                  </p>
                </div>
                <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/35 p-4">
                  <p className="text-sm uppercase tracking-[0.24em] text-cyan-100/70">
                    Healthcare Feel
                  </p>
                  <p className="mt-3 font-display text-2xl font-semibold text-white">
                    Trust First
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </FadeIn>
      </div>
    </section>
  );
}
