"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  MapPin,
  Award,
  Star,
  Calendar,
  Building2,
  CheckCircle2,
  Phone,
  Mail,
  ExternalLink,
  ShieldCheck,
  Stethoscope,
  Users,
} from "lucide-react";

import { easeOutExpo } from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { HospitalPartnerProfile } from "@/lib/data/hospital-partner-profile";

type HospitalDetailPageProps = {
  hospital: HospitalPartnerProfile;
};

export function HospitalDetailPageContent({ hospital }: HospitalDetailPageProps) {
  const specialtyIcons = ["Cardiology", "Oncology", "Orthopedics", "Neurosurgery", "Organ Transplant", "IVF"];

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 pb-10 pt-8 sm:px-6 sm:pb-14 sm:pt-12 lg:px-8">
        <div className="container-wide">
          <div className="section-frame overflow-hidden p-0">
            <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
              {/* Content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: easeOutExpo }}
                className="p-6 sm:p-8 lg:p-12"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span className="section-kicker">Partner Hospital</span>
                  {hospital.accreditations.slice(0, 3).map((acc) => (
                    <span
                      key={acc}
                      className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-[0.6rem] font-bold text-emerald-700"
                    >
                      <ShieldCheck className="h-2.5 w-2.5" />
                      {acc}
                    </span>
                  ))}
                </div>

                <h1 className="mt-5 font-display text-3xl font-bold tracking-[-0.035em] text-[#0B1F4D] sm:text-5xl lg:text-6xl">
                  {hospital.name}
                </h1>

                {hospital.shortName && (
                  <p className="mt-2 text-lg text-slate-500">Also known as: {hospital.shortName}</p>
                )}

                <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="h-4 w-4 text-[#1D4ED8]" />
                    <span>
                      {hospital.city ? `${hospital.city}, ` : ""}
                      {hospital.country}
                    </span>
                  </div>
                  {hospital.bedCount && (
                    <div className="flex items-center gap-1.5">
                      <Building2 className="h-4 w-4" />
                      <span>{hospital.bedCount} beds</span>
                    </div>
                  )}
                  {hospital.establishedYear && (
                    <div className="flex items-center gap-1.5">
                      <Calendar className="h-4 w-4" />
                      <span>Est. {hospital.establishedYear}</span>
                    </div>
                  )}
                  {hospital.patientRating && (
                    <div className="flex items-center gap-1.5">
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                      <span className="font-semibold text-amber-700">{hospital.patientRating.toFixed(1)}</span>
                    </div>
                  )}
                </div>

                <p className="mt-5 text-base leading-8 text-slate-600">
                  {hospital.description}
                </p>

                {/* Quick Actions */}
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href="/international-patient-care"
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-700 to-blue-600 px-6 py-3.5 text-sm font-bold text-white shadow-[0_12px_32px_rgba(29,78,216,0.2)] transition hover:-translate-y-0.5"
                  >
                    Get Free Treatment Plan
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  {hospital.website && (
                    <a
                      href={hospital.website}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-[#D6E8FF] bg-white px-6 py-3.5 text-sm font-bold text-[#0B1F4D] transition hover:-translate-y-0.5"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Visit Official Website
                    </a>
                  )}
                </div>
              </motion.div>

              {/* Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.9, delay: 0.1 }}
                className="relative min-h-[300px] overflow-hidden lg:min-h-full"
              >
                {hospital.coverImage ? (
                  <div className="relative h-full min-h-[300px]">
                    <Image
                      src={hospital.coverImage}
                      alt={hospital.name}
                      fill
                      className="object-cover"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0B1F4D]/30 to-transparent" />
                  </div>
                ) : (
                  <div className="flex h-full min-h-[300px] items-center justify-center bg-gradient-to-br from-blue-600 to-cyan-500">
                    <div className="text-center text-white">
                      <Building2 className="mx-auto h-20 w-20 opacity-50" />
                      <p className="mt-4 text-xl font-bold">{hospital.name}</p>
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="section-shell-compact pt-0">
        <div className="container-wide">
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <StatCard icon={Award} value={hospital.accreditations.length.toString()} label="Accreditations" />
            <StatCard icon={Stethoscope} value={hospital.specialties.length.toString()} label="Medical Specialties" />
            <StatCard icon={Users} value={hospital.bedCount?.toString() ?? "500+"} label="Hospital Beds" />
            <StatCard icon={CheckCircle2} value={hospital.internationalDesk ? "Yes" : "Available"} label="International Desk" />
          </div>
        </div>
      </section>

      {/* Specialties Section */}
      <section className="section-shell pt-0">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: easeOutExpo }}
            className="text-center"
          >
            <span className="section-kicker">Specialties</span>
            <h2 className="mt-5 heading-section">Medical Specialties at {hospital.shortName || hospital.name}</h2>
            <p className="mt-4 body-lg mx-auto">
              Our partner hospital specializes in the following medical fields with experienced doctors and advanced technology.
            </p>
          </motion.div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {hospital.specialties.map((specialty, index) => (
              <motion.div
                key={specialty}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.04 }}
                className="rounded-2xl border border-[#D6E8FF] bg-white/90 p-5 shadow-sm backdrop-blur-xl transition-all hover:shadow-md"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-sm">
                  <Stethoscope className="h-5 w-5" />
                </div>
                <h3 className="mt-3 text-base font-bold text-[#0B1F4D]">{specialty}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-shell-compact">
        <div className="container-wide">
          <div className="section-frame-accent p-6 sm:p-8 lg:p-10 text-center">
            <h2 className="font-display text-2xl font-bold tracking-[-0.03em] text-[#0B1F4D] sm:text-3xl">
              Get Treatment at {hospital.shortName || hospital.name}
            </h2>
            <p className="mt-3 body-lg mx-auto max-w-2xl">
              Our medical coordinators will help you plan your treatment at this hospital — from medical report review to cost estimate, visa support, and travel arrangements.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/international-patient-care"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-700 to-blue-600 px-8 py-4 text-sm font-bold text-white shadow-[0_18px_48px_rgba(29,78,216,0.24)] transition hover:-translate-y-0.5"
              >
                Request Free Consultation
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-[#D6E8FF] bg-white px-8 py-4 text-sm font-bold text-[#0B1F4D] shadow-sm transition hover:-translate-y-0.5"
              >
                Talk to a Coordinator
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function StatCard({
  icon: Icon,
  value,
  label,
}: {
  icon: typeof Award;
  value: string;
  label: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="rounded-2xl border border-[#D6E8FF] bg-white/90 p-5 text-center shadow-sm backdrop-blur-xl"
    >
      <Icon className="mx-auto h-6 w-6 text-[#1D4ED8]" />
      <p className="mt-2 font-display text-2xl font-bold text-[#0B1F4D]">{value}</p>
      <p className="text-xs text-slate-500">{label}</p>
    </motion.div>
  );
}