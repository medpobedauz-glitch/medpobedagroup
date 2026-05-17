"use client";

import { motion } from "framer-motion";
import {
  Activity,
  BadgeCheck,
  HeartPulse,
  Hospital,
  ScanHeart,
  ShieldPlus,
} from "lucide-react";

import { FadeIn } from "@/components/shared/fade-in";
import { ImageCard } from "@/components/shared/image-card";
import { Card } from "@/components/ui/card";
import { getSiteImage } from "@/lib/site-images";
import { staggerContainer, staggerItem } from "@/lib/motion";

const specialties = [
  {
    title: "Cardiac and vascular access",
    description: "High-trust pathways for specialist review, referral readiness, and patient-family clarity.",
    icon: Activity,
  },
  {
    title: "Oncology and complex diagnostics",
    description: "Structured intake for report-heavy, decision-sensitive treatment discussions.",
    icon: ScanHeart,
  },
  {
    title: "Surgery and planned interventions",
    description: "Cleaner hospital coordination around timing, travel planning, and care sequencing.",
    icon: HeartPulse,
  },
  {
    title: "Institutional desk enablement",
    description: "Partnership-facing workflows for hospitals exploring international patient collaboration.",
    icon: Hospital,
  },
];

const trustIndicators = [
  { label: "Secure document workflow", icon: ShieldPlus },
  { label: "Hospital-facing communication quality", icon: BadgeCheck },
  { label: "Patient-aware coordination language", icon: HeartPulse },
];

export function HomeNetworkShowcase() {
  const doctorImage = getSiteImage("homeDoctorTeam");
  const conferenceImage = getSiteImage("homeHealthcareConference");
  const treatmentImage = getSiteImage("homeTreatmentSupport");

  return (
    <section className="section-shell-compact">
      <div className="container-wide">
        <div className="section-frame px-6 py-8 sm:px-8 lg:px-10 lg:py-10">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.12),transparent_26%),radial-gradient(circle_at_bottom_left,rgba(30,64,175,0.08),transparent_26%)]" />

          <div className="relative grid gap-8 xl:grid-cols-[0.9fr_1.1fr] xl:items-end">
            <FadeIn className="max-w-2xl">
              <p className="section-kicker">Hospital Network Showcase</p>
              <h2 className="mt-5 heading-section">
                Real healthcare imagery, stronger service depth, and a more connected trust layer
              </h2>
              <p className="mt-5 body-lg">
                The homepage now anchors trust in multidisciplinary care, institutional
                relationships, and visible patient support instead of relying on empty
                minimalism or disconnected cards.
              </p>
            </FadeIn>

            <FadeIn className="grid gap-4 sm:grid-cols-3">
              {[
                "Confidential intake",
                "Global medical network",
                "Institution-first presentation",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-[1.6rem] border border-slate-200/90 bg-white/86 px-4 py-4 text-center text-sm font-medium text-slate-700 shadow-[0_12px_28px_rgba(15,23,42,0.05)]"
                >
                  {item}
                </div>
              ))}
            </FadeIn>
          </div>

          <div className="relative mt-10 grid gap-6 xl:grid-cols-[0.92fr_1.08fr]">
            <div className="grid gap-6">
              <ImageCard
                asset={doctorImage}
                title="Specialist-facing network presentation"
                description="Premium healthcare imagery now supports the same enterprise credibility as the copy and interaction model."
                aspectClassName="aspect-[16/11]"
              />
              <div className="grid gap-6 sm:grid-cols-[1.02fr_0.98fr]">
                <ImageCard
                  asset={conferenceImage}
                  title="Conference and institutional exchange presence"
                  aspectClassName="aspect-[16/11]"
                />
                <ImageCard
                  asset={treatmentImage}
                  title="Clinical and treatment readiness"
                  description="Specialist review, procedure planning, and care coordination remain visible."
                  aspectClassName="aspect-[16/11]"
                />
              </div>
            </div>

            <div className="grid gap-6">
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.15 }}
                className="grid gap-5 md:grid-cols-2"
              >
                {specialties.map((item) => {
                  const Icon = item.icon;

                  return (
                    <motion.div key={item.title} variants={staggerItem}>
                      <Card variant="panel" className="h-full p-6">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-sky-100 bg-sky-50 text-sky-700">
                          <Icon className="h-5 w-5" />
                        </div>
                        <h3 className="mt-5 font-display text-2xl font-semibold text-slate-950">
                          {item.title}
                        </h3>
                        <p className="mt-4 text-sm leading-7 text-slate-600">
                          {item.description}
                        </p>
                      </Card>
                    </motion.div>
                  );
                })}
              </motion.div>

              <div className="grid gap-5 xl:grid-cols-[0.88fr_1.12fr]">
                <Card variant="dashboard" className="p-6">
                  <p className="section-kicker">Trust Indicators</p>
                  <div className="mt-6 grid gap-4">
                    {trustIndicators.map((item) => {
                      const Icon = item.icon;

                      return (
                        <div
                          key={item.label}
                          className="flex items-center gap-3 rounded-[1.3rem] border border-slate-200 bg-white px-4 py-4 text-sm text-slate-600"
                        >
                          <Icon className="h-4 w-4 text-sky-700" />
                          <span>{item.label}</span>
                        </div>
                      );
                    })}
                  </div>
                </Card>

                <Card variant="muted" className="overflow-hidden p-0">
                  <div className="border-b border-slate-200 px-6 py-5">
                    <p className="section-kicker">Enterprise Narrative</p>
                    <h3 className="mt-3 font-display text-2xl font-semibold text-slate-950">
                      MedPobeda now reads like a healthcare operating network instead of a light brochure
                    </h3>
                  </div>
                  <div className="grid gap-px bg-slate-200 sm:grid-cols-2">
                    {[
                      "Premium light surfaces with healthcare blue accents and layered section framing",
                      "Reusable image, CTA, badge, card, alert, modal, and table primitives",
                      "Motion choreography for hero, metrics, editorial blocks, and conversion prompts",
                      "Consistent mobile-safe action patterns and sticky inquiry logic",
                    ].map((item) => (
                      <div key={item} className="bg-white px-6 py-5 text-sm leading-7 text-slate-600">
                        {item}
                      </div>
                    ))}
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
