"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  DollarSign,
  Award,
  Clock,
  Globe2,
  Stethoscope,
  Heart,
} from "lucide-react";

import { easeOutExpo } from "@/lib/motion";
import { WhyIndiaComparison } from "@/components/sections/why-india-comparison";

const advantages = [
  {
    icon: DollarSign,
    title: "30-70% Cost Savings",
    description: "Medical treatment in India costs a fraction of what it would in the US, UK, or Europe — without compromising on quality.",
    stat: "Save $50,000+",
    statLabel: "on heart surgery vs US",
  },
  {
    icon: Award,
    title: "World-Class Hospitals",
    description: "India has over 40 JCI-accredited hospitals — more than any other country in Asia. Our partners include the best in class.",
    stat: "40+",
    statLabel: "JCI-accredited hospitals",
  },
  {
    icon: Stethoscope,
    title: "Expert Doctors",
    description: "Indian doctors trained at Harvard, Johns Hopkins, Mayo Clinic, and other world-renowned institutions bring global expertise.",
    stat: "15,000+",
    statLabel: "specialist doctors",
  },
  {
    icon: Clock,
    title: "Minimal Wait Times",
    description: "No months-long waiting lists. Get admitted and treated within days of arriving in India.",
    stat: "1-3 days",
    statLabel: "from arrival to treatment",
  },
  {
    icon: Globe2,
    title: "English Proficiency",
    description: "English is the primary language of Indian medicine. Our team provides additional support in Russian, Uzbek, and other Central Asian languages.",
    stat: "100%",
    statLabel: "of doctors speak English",
  },
  {
    icon: Heart,
    title: "Comprehensive Care",
    description: "From treatment planning to post-operative rehabilitation, India offers a complete continuum of care with holistic approaches.",
    stat: "360°",
    statLabel: "patient care approach",
  },
];

const treatmentHighlights = [
  { treatment: "Cardiology", hospital: "Fortis Escorts Heart Institute", cost: "$7,000 - $15,000" },
  { treatment: "Oncology", hospital: "Tata Memorial Hospital", cost: "$5,000 - $20,000" },
  { treatment: "Orthopedics", hospital: "Apollo Hospitals", cost: "$6,000 - $13,000" },
  { treatment: "Organ Transplant", hospital: "Medanta Hospital", cost: "$20,000 - $50,000" },
  { treatment: "IVF", hospital: "Nova IVF Fertility", cost: "$3,000 - $6,000" },
  { treatment: "Neurosurgery", hospital: "Apollo Hospitals", cost: "$8,000 - $25,000" },
];

export function WhyIndiaPageContent() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden px-4 pb-10 pt-8 sm:px-6 sm:pb-14 sm:pt-12 lg:px-8">
        <div className="container-wide">
          <div className="section-frame p-6 sm:p-8 lg:p-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: easeOutExpo }}
              className="text-center"
            >
              <span className="section-kicker">Why India</span>
              <h1 className="mt-5 font-display text-3xl font-bold tracking-[-0.035em] text-[#0B1F4D] sm:text-5xl lg:text-6xl">
                Why Choose India for Medical Treatment
              </h1>
              <p className="mt-5 body-lg mx-auto max-w-3xl">
                India is the world&apos;s number one medical tourism destination, with millions of international patients visiting annually. Here is why Central Asian patients choose India.
              </p>
            </motion.div>

            <div className="mx-auto mt-10 grid max-w-4xl grid-cols-2 gap-4 lg:grid-cols-4">
              {[
                { value: "5M+", label: "International patients/year" },
                { value: "40+", label: "JCI-accredited hospitals" },
                { value: "30-70%", label: "Cost savings" },
                { value: "95%+", label: "Success rates" },
              ].map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-[#D6E8FF] bg-white/80 p-4 text-center shadow-sm">
                  <p className="font-display text-2xl font-bold text-[#0B1F4D]">{stat.value}</p>
                  <p className="mt-1 text-xs text-slate-500">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Key Advantages */}
      <section className="section-shell pt-0">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <span className="section-kicker">Key Advantages</span>
            <h2 className="mt-5 heading-section">Why India Stands Out</h2>
          </motion.div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {advantages.map((adv, index) => {
              const Icon = adv.icon;
              return (
                <motion.div
                  key={adv.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.06 }}
                  className="group rounded-[1.5rem] border border-[#D6E8FF] bg-white/90 p-6 shadow-[0_18px_48px_rgba(7,27,58,0.06)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_64px_rgba(29,78,216,0.12)]"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-lg">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-[#0B1F4D]">{adv.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-500">{adv.description}</p>
                  <div className="mt-4 rounded-xl bg-blue-50 p-3">
                    <p className="text-lg font-bold text-[#1D4ED8]">{adv.stat}</p>
                    <p className="text-xs text-slate-500">{adv.statLabel}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <WhyIndiaComparison />

      {/* Treatment Highlights */}
      <section className="section-shell pt-0">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <span className="section-kicker">Popular Treatments</span>
            <h2 className="mt-5 heading-section">Treatment Specialties</h2>
            <p className="mt-4 body-lg mx-auto">
              India excels across all medical specialties. Here are the most popular treatments for international patients.
            </p>
          </motion.div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {treatmentHighlights.map((item, index) => (
              <motion.div
                key={item.treatment}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.04 }}
                className="rounded-2xl border border-[#D6E8FF] bg-white/90 p-5 shadow-sm backdrop-blur-xl transition-all hover:shadow-md"
              >
                <h3 className="text-base font-bold text-[#0B1F4D]">{item.treatment}</h3>
                <p className="mt-1 text-xs text-slate-500">at {item.hospital}</p>
                <p className="mt-2 text-sm font-bold text-[#1D4ED8]">{item.cost}</p>
                <p className="text-xs text-slate-400">estimated range</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-shell-compact">
        <div className="container-wide">
          <div className="section-frame-accent p-6 sm:p-8 lg:p-10 text-center">
            <h2 className="font-display text-2xl font-bold tracking-[-0.03em] text-[#0B1F4D] sm:text-3xl">
              Ready to Start Your Medical Journey to India?
            </h2>
            <p className="mt-3 body-lg mx-auto max-w-2xl">
              Contact MedPobeda Group today for a free consultation and personalized treatment plan.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/international-patient-care"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-700 to-blue-600 px-8 py-4 text-sm font-bold text-white shadow-[0_18px_48px_rgba(29,78,216,0.24)] transition hover:-translate-y-0.5"
              >
                Start Your Journey
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/cost-guide"
                className="inline-flex items-center gap-2 rounded-full border border-[#D6E8FF] bg-white px-8 py-4 text-sm font-bold text-[#0B1F4D] shadow-sm"
              >
                View Cost Guide
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-[#D6E8FF] bg-white px-8 py-4 text-sm font-bold text-[#0B1F4D] shadow-sm"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}