"use client";

import Link from "next/link";
import { LazyMotion, domAnimation, m } from "framer-motion";
import { Headphones, ShieldCheck, Stethoscope } from "lucide-react";
import { useState } from "react";

import { medicalSpecialties } from "@/lib/medical-specialties";
import { ImageCard } from "@/components/shared/image-card";
import { FloatingWhatsAppButton } from "@/components/shared/floating-whatsapp-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SpecialtyFocusCard } from "@/components/home/specialty-focus-card";
import { staggerContainer, staggerItem } from "@/lib/motion";
import { getSiteImage } from "@/lib/site-images";

export function HomeMultiSpecializedFocus() {
  const [expandedId, setExpandedId] = useState<string | null>(medicalSpecialties[0]?.id ?? null);
  const assistanceImage = getSiteImage("homeGlobalPatients");
  const treatmentImage = getSiteImage("homeTreatmentSupport");

  return (
    <LazyMotion features={domAnimation}>
      <section className="section-shell">
        <div className="container-wide">
          <div className="section-frame px-6 py-8 sm:px-8 lg:px-10 lg:py-10">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.12),transparent_26%),radial-gradient(circle_at_bottom_right,rgba(37,99,235,0.09),transparent_30%)]" />

            <div className="relative grid gap-8 xl:grid-cols-[0.9fr_1.1fr] xl:items-end">
              <m.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.18 }}
                transition={{ duration: 0.68, ease: [0.22, 1, 0.36, 1] }}
                className="max-w-3xl"
              >
                <Badge variant="solid">Specialty Coverage</Badge>
                <h2 className="mt-5 heading-section">Multi-specialized focus</h2>
                <p className="mt-5 body-lg">
                  We cover all medical needs, from advanced diagnostics to complex transplant procedures.
                </p>
              </m.div>

              <m.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.18 }}
                transition={{ duration: 0.68, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="grid gap-4 lg:grid-cols-[1.02fr_0.98fr]"
              >
                <ImageCard
                  asset={treatmentImage}
                  title="Advanced treatment and intervention support"
                  description="A richer visual trust layer for serious procedures and high-acuity care pathways."
                  aspectClassName="aspect-[16/10]"
                />
                <Card variant="muted" className="p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-sky-100 bg-sky-50 text-sky-700">
                    <Stethoscope className="h-5 w-5" />
                  </div>
                  <p className="mt-5 font-display text-2xl font-semibold text-slate-950">
                    Specialty navigation designed to reduce hesitation
                  </p>
                  <p className="mt-4 text-sm leading-7 text-slate-600">
                    Each specialty card expands into a more credible case discussion instead
                    of leaving the user inside a shallow brochure experience.
                  </p>
                </Card>
              </m.div>
            </div>

            <m.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.08 }}
              className="relative mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3"
            >
              {medicalSpecialties.map((specialty) => (
                <m.div key={specialty.id} variants={staggerItem} className="h-full">
                  <SpecialtyFocusCard
                    specialty={specialty}
                    expanded={expandedId === specialty.id}
                    onToggle={() =>
                      setExpandedId((current) =>
                        current === specialty.id ? null : specialty.id,
                      )
                    }
                  />
                </m.div>
              ))}
            </m.div>

            <div className="relative mt-12 grid gap-6 lg:grid-cols-[1.02fr_0.98fr]">
              <Card variant="accent" className="p-7 lg:p-8">
                <Badge variant="surface" className="w-fit">
                  Bottom CTA
                </Badge>
                <h3 className="mt-5 font-display text-3xl font-semibold text-slate-950">
                  Need Help?
                </h3>
                <p className="mt-4 text-base leading-8 text-slate-600">
                  Our international patient coordination desk can guide you to the right
                  specialty, help package the case for review, and support next steps with
                  destination hospitals.
                </p>
                <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
                  <Button asChild variant="hero" size="xl">
                    <Link href="/contact">
                      <Headphones className="h-4 w-4" />
                      Need Help?
                    </Link>
                  </Button>
                  <FloatingWhatsAppButton
                    label="WhatsApp Consultation"
                    message="Hello MedPobeda Group, I need help selecting the right specialty for treatment coordination."
                    className="w-full justify-center sm:w-auto"
                  />
                </div>
              </Card>

              <Card variant="panel" className="p-7 lg:p-8">
                <p className="section-kicker">International Patient Assistance</p>
                <h3 className="mt-5 font-display text-3xl font-semibold text-slate-950">
                  Built for complex medical journeys that require more than a basic inquiry form
                </h3>
                <div className="mt-6">
                  <ImageCard
                    asset={assistanceImage}
                    title="International patient assistance"
                    showCaption={false}
                    aspectClassName="aspect-[16/10]"
                  />
                </div>
                <div className="mt-6 grid gap-3">
                  {[
                    "Structured support for reports, diagnosis history, and case summaries before hospital review.",
                    "Patient-family communication assistance across hospital coordination, timelines, and next-step clarity.",
                    "Cross-border treatment planning support for consultations, procedures, and higher-acuity care pathways.",
                  ].map((item) => (
                    <div
                      key={item}
                      className="rounded-[1.3rem] border border-slate-200 bg-white px-4 py-4 text-sm leading-7 text-slate-600"
                    >
                      {item}
                    </div>
                  ))}
                </div>
                <div className="mt-6 flex items-start gap-3 rounded-[1.3rem] border border-sky-100 bg-sky-50 px-4 py-4">
                  <ShieldCheck className="mt-1 h-5 w-5 shrink-0 text-sky-700" />
                  <p className="text-sm leading-7 text-slate-700">
                    The specialty layer is designed to feel precise, trustworthy, and conversion-ready for international patients evaluating serious medical options.
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </LazyMotion>
  );
}
