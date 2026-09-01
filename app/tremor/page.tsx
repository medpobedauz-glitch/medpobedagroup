import type { Metadata } from "next";
import Link from "next/link";
import {
  Activity,
  ArrowRight,
  Brain,
  ClipboardCheck,
  HeartPulse,
  Stethoscope,
} from "lucide-react";

import { JsonLd } from "@/components/shared/json-ld";
import { getRequestLocale } from "@/lib/i18n/request";
import { createMetadata } from "@/lib/metadata";
import { createBreadcrumbSchema, createMedicalWebPageSchema } from "@/lib/schema";

export function generateMetadata(): Metadata {
  return createMetadata({
    title: "Tremor: Symptoms, Causes, Diagnosis and Treatment",
    description:
      "Learn about tremor symptoms, common causes, diagnosis and treatment options, and request coordinated neurological care through MedPobeda Group.",
    path: "/tremor",
    locale: getRequestLocale(),
    keywords: [
      "tremor",
      "hand tremor",
      "essential tremor",
      "tremor treatment",
      "neurologist in India",
    ],
  });
}

const tremorTypes = [
  {
    title: "Essential tremor",
    description: "Often affects both hands during movement and may also involve the head or voice.",
  },
  {
    title: "Parkinsonian tremor",
    description: "Commonly begins on one side and is often most noticeable while the limb is resting.",
  },
  {
    title: "Physiological or medication-related tremor",
    description: "May become noticeable with stress, caffeine, thyroid problems, or certain medicines.",
  },
];

const careSteps = [
  "Review of symptoms, medicines, medical history, and family history",
  "Neurological examination to assess when and where the shaking occurs",
  "Blood tests or imaging when needed to investigate an underlying cause",
  "A treatment plan that may include lifestyle changes, medicine, therapy, or procedures",
];

export default function TremorPage() {
  const locale = getRequestLocale();

  return (
    <>
      <JsonLd
        data={[
          createMedicalWebPageSchema({
            name: "Tremor: Symptoms, Causes, Diagnosis and Treatment",
            description:
              "Patient-friendly information about tremor and access to coordinated neurological evaluation and treatment.",
            path: "/tremor",
            locale,
            medicalAudience: "Patient",
            areaServed: ["Uzbekistan", "Central Asia", "India"],
          }),
          createBreadcrumbSchema(
            [
              { name: "Home", path: "/" },
              { name: "Tremor", path: "/tremor" },
            ],
            locale,
          ),
        ]}
      />

      <section className="section-shell pt-8 sm:pt-12">
        <div className="container-wide">
          <div className="overflow-hidden rounded-[2rem] border border-[#D6E8FF] bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.2),transparent_38%),linear-gradient(135deg,#071B3A,#123C75)] px-6 py-12 text-white shadow-[0_24px_70px_rgba(7,27,58,0.18)] sm:px-10 lg:px-16 lg:py-20">
            <div className="max-w-4xl">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-300">Neurology patient guide</p>
              <h1 className="mt-5 font-display text-4xl font-semibold tracking-[-0.04em] sm:text-5xl lg:text-7xl">Tremor</h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-blue-50 sm:text-xl">
                Tremor is an involuntary, rhythmic shaking movement. It can affect the hands, head, voice, legs, or other parts of the body and may occur at rest or during movement.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link href="/contact" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-[#123C75] transition hover:bg-sky-50">
                  Request a neurological review <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/doctors" className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/30 px-6 py-3 font-semibold text-white transition hover:bg-white/10">
                  Explore doctors
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell pt-4">
        <div className="container-wide grid gap-6 lg:grid-cols-3">
          {tremorTypes.map((item, index) => {
            const Icon = [Activity, Brain, HeartPulse][index];
            return (
              <article key={item.title} className="rounded-[1.75rem] border border-[#D6E8FF] bg-white p-7 shadow-[0_15px_45px_rgba(7,27,58,0.07)]">
                <Icon className="h-9 w-9 text-blue-700" />
                <h2 className="mt-5 text-xl font-semibold text-[#071B3A]">{item.title}</h2>
                <p className="mt-3 leading-7 text-slate-600">{item.description}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="section-shell pt-2">
        <div className="container-wide grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[2rem] bg-[#F3F8FF] p-7 sm:p-10">
            <Stethoscope className="h-10 w-10 text-blue-700" />
            <h2 className="mt-5 heading-section">When to seek medical advice</h2>
            <p className="mt-5 body-lg">
              Arrange an assessment if shaking is new, worsening, affecting everyday activities, or accompanied by stiffness, slowed movement, weakness, speech changes, or balance problems.
            </p>
            <p className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-5 leading-7 text-amber-950">
              Seek urgent medical help for sudden tremor with facial drooping, weakness, severe headache, confusion, chest pain, or difficulty speaking.
            </p>
          </div>

          <div className="rounded-[2rem] border border-[#D6E8FF] bg-white p-7 sm:p-10">
            <ClipboardCheck className="h-10 w-10 text-blue-700" />
            <h2 className="mt-5 heading-section">Diagnosis and treatment</h2>
            <div className="mt-7 grid gap-4">
              {careSteps.map((step, index) => (
                <div key={step} className="flex gap-4 rounded-2xl bg-slate-50 p-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-700 text-sm font-bold text-white">{index + 1}</span>
                  <p className="leading-7 text-slate-700">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell pt-2">
        <div className="container-wide rounded-[2rem] border border-[#BFD7FF] bg-[linear-gradient(135deg,#EFF6FF,#F0FDFA)] p-7 text-center sm:p-12">
          <p className="section-kicker justify-center">International patient support</p>
          <h2 className="mx-auto mt-5 max-w-3xl heading-section">Get help finding the right neurologist and hospital</h2>
          <p className="mx-auto mt-5 max-w-3xl body-lg">
            MedPobeda Group can coordinate medical-record review, specialist selection, hospital communication, treatment planning, visa support, travel, and interpretation for patients from Central Asia.
          </p>
          <Link href="/contact" className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-blue-700 px-7 py-3 font-semibold text-white transition hover:bg-blue-800">
            Start your case review <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="section-shell pt-0">
        <div className="container-wide">
          <p className="text-sm leading-6 text-slate-500">
            This page provides general educational information and does not replace diagnosis or treatment by a qualified healthcare professional.
          </p>
        </div>
      </section>
    </>
  );
}
