"use client";

import { LazyMotion, domAnimation, m } from "framer-motion";
import { BadgeCheck, Sparkles } from "lucide-react";

import { serviceCoverageItems } from "@/lib/service-coverage";
import { ImageCard } from "@/components/shared/image-card";
import { ServiceCoverageCard } from "@/components/home/service-coverage-card";
import { ServiceCoverageCta } from "@/components/home/service-coverage-cta";
import { Card } from "@/components/ui/card";
import { getSiteImage } from "@/lib/site-images";

export function HomeServicesCoverage() {
  const servicesOverviewImage = getSiteImage("homeServicesSupportOverview");

  return (
    <LazyMotion features={domAnimation}>
      <section className="section-shell-compact">
        <div className="container-wide">
          <div className="section-frame-soft px-6 py-8 sm:px-8 lg:px-10 lg:py-10">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.12),transparent_26%),radial-gradient(circle_at_bottom_right,rgba(29,78,216,0.08),transparent_24%)]" />
            <div className="pointer-events-none absolute inset-0 section-noise opacity-30" />

            <div className="relative grid gap-6 xl:grid-cols-[0.86fr_1.14fr] xl:items-end">
              <m.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.18 }}
                transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
                className="max-w-3xl"
              >
                <p className="section-kicker">Included Patient Support</p>
                <h2 className="mt-5 heading-section">Our services cover every need</h2>
                <p className="mt-5 body-lg">
                  You will be assisted by a dedicated case manager from our team. Here is a
                  list of services you can expect from us, FREE!
                </p>
              </m.div>

              <m.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.18 }}
                transition={{ duration: 0.62, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]"
              >
                <Card variant="panel" className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-sky-100 bg-sky-50 text-sky-700">
                      <Sparkles className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="section-kicker">Care Management</p>
                      <p className="mt-3 font-display text-2xl font-semibold text-slate-950">
                        Service support that feels premium before the treatment journey begins
                      </p>
                    </div>
                  </div>
                  <div className="story-divider mt-6" />
                  <div className="mt-6 grid gap-3">
                    {[
                      "Dedicated coordinator-led communication from first inquiry to arrival readiness.",
                      "Real travel, accommodation, and appointment support instead of generic information pages.",
                      "A trust-building layer that makes the service promise feel tangible and premium.",
                    ].map((item) => (
                      <div
                        key={item}
                        className="rounded-[1.3rem] border border-slate-200 bg-white px-4 py-4 text-sm leading-7 text-slate-600"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </Card>

                <Card variant="accent" className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/60 bg-white/70 text-sky-700">
                      <BadgeCheck className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="section-kicker">Trust Note</p>
                      <p className="mt-3 font-display text-2xl font-semibold text-slate-950">
                        The support experience is included and patient-friendly
                      </p>
                    </div>
                  </div>
                  <p className="mt-6 text-sm leading-7 text-slate-700">
                    MedPobeda’s case manager support is built to make medical travel feel
                    coordinated, informed, and emotionally steady without adding service friction.
                  </p>
                </Card>
              </m.div>
            </div>

            <div className="relative mt-10">
              <ImageCard
                asset={servicesOverviewImage}
                eyebrow="Full Service Journey"
                title="A complete view of the patient support experience"
                description="From airport pickup and consultation to translation, accommodation, transportation, and aftercare, the MedPobeda support layer is now shown in one premium visual."
                aspectClassName="aspect-[3/2]"
                sizes="(min-width: 1280px) 80vw, (min-width: 768px) 90vw, 100vw"
                priority
              />
            </div>

            <div className="relative mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {serviceCoverageItems.map((item, index) => (
                <ServiceCoverageCard key={item.id} item={item} index={index} />
              ))}
            </div>

            <div className="relative mt-2">
              <ServiceCoverageCta />
            </div>
          </div>
        </div>
      </section>
    </LazyMotion>
  );
}
