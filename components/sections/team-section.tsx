"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Mail, Linkedin, Globe2 } from "lucide-react";

import { easeOutExpo } from "@/lib/motion";
import { cn } from "@/lib/utils";

type TeamMember = {
  id: string;
  name: string;
  role: string;
  title: string | null;
  shortBio: string | null;
  photo: string | null;
  languages: string[];
  specializations: string[];
  yearsExperience: number | null;
};

type TeamSectionProps = {
  members: TeamMember[];
  eyebrow?: string;
  title?: string;
  description?: string;
};

const roleLabels: Record<string, string> = {
  FOUNDER: "Founder",
  COORDINATOR: "Patient Coordinator",
  MEDICAL_ADVISOR: "Medical Advisor",
  INTERNATIONAL_RELATIONS: "International Relations",
  OPERATIONS: "Operations",
  MARKETING: "Marketing",
  PATIENT_SUPPORT: "Patient Support",
};

const roleColors: Record<string, string> = {
  FOUNDER: "from-blue-700 to-blue-500",
  COORDINATOR: "from-blue-600 to-cyan-500",
  MEDICAL_ADVISOR: "from-emerald-600 to-teal-500",
  INTERNATIONAL_RELATIONS: "from-violet-600 to-purple-500",
  OPERATIONS: "from-amber-600 to-orange-500",
  MARKETING: "from-rose-600 to-pink-500",
  PATIENT_SUPPORT: "from-sky-600 to-blue-400",
};

export function TeamSection({
  members,
  eyebrow = "Our Team",
  title = "Meet the People Behind Your Care",
  description = "A dedicated team of medical coordinators, advisors, and international relations specialists committed to your healthcare journey.",
}: TeamSectionProps) {
  if (members.length === 0) return null;

  return (
    <section className="section-shell">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: easeOutExpo }}
          className="text-center"
        >
          <span className="section-kicker">{eyebrow}</span>
          <h2 className="mt-5 heading-section">{title}</h2>
          <p className="mt-4 body-lg mx-auto">{description}</p>
        </motion.div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {members.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.05,
                ease: easeOutExpo,
              }}
              className={cn(
                "group overflow-hidden rounded-[1.5rem] border border-[#D6E8FF] bg-white/90",
                "shadow-[0_18px_48px_rgba(7,27,58,0.06)] backdrop-blur-xl",
                "transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_64px_rgba(29,78,216,0.12)]"
              )}
            >
              {/* Photo */}
              <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-sky-50">
                {member.photo ? (
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <Image
                      src={member.photo}
                      alt={member.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F4D]/40 via-transparent to-transparent" />
                  </div>
                ) : (
                  <div className="flex aspect-[3/4] items-center justify-center">
                    <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 text-3xl font-bold text-white shadow-xl">
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .slice(0, 2)}
                    </div>
                  </div>
                )}

                {/* Role Badge */}
                <div className="absolute bottom-4 left-4">
                  <span
                    className={cn(
                      "inline-flex items-center rounded-full bg-white/95 px-3 py-1.5 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-[#1D4ED8] shadow-lg backdrop-blur-sm",
                    )}
                  >
                    {roleLabels[member.role] ?? member.role}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-lg font-semibold text-[#0B1F4D]">
                  {member.name}
                </h3>
                {member.title && (
                  <p className="mt-1 text-sm text-[#1D4ED8]">{member.title}</p>
                )}

                {member.shortBio && (
                  <p className="mt-3 text-xs leading-6 text-slate-500 line-clamp-3">
                    {member.shortBio}
                  </p>
                )}

                {/* Experience */}
                {member.yearsExperience && (
                  <p className="mt-3 text-xs font-semibold text-slate-600">
                    {member.yearsExperience}+ years experience
                  </p>
                )}

                {/* Languages */}
                {member.languages.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {member.languages.map((lang) => (
                      <span
                        key={lang}
                        className="inline-flex items-center gap-1 rounded-full border border-blue-100 bg-blue-50 px-2 py-0.5 text-[0.65rem] font-medium text-blue-700"
                      >
                        <Globe2 className="h-2.5 w-2.5" />
                        {lang}
                      </span>
                    ))}
                  </div>
                )}

                {/* Specializations */}
                {member.specializations.length > 0 && (
                  <p className="mt-3 text-[0.7rem] leading-5 text-slate-400">
                    {member.specializations.join(" • ")}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-10 text-center"
        >
          <Link
            href="/team"
            className="inline-flex items-center gap-2 rounded-full border border-[#D6E8FF] bg-white px-6 py-3 text-sm font-semibold text-[#1D4ED8] shadow-[0_12px_32px_rgba(7,27,58,0.06)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_48px_rgba(29,78,216,0.12)]"
          >
            Meet Our Full Team
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}