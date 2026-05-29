"use client";

import { motion } from "framer-motion";
import { Globe2, Mail, Phone, Award, Users } from "lucide-react";

import { easeOutExpo } from "@/lib/motion";
import { cn } from "@/lib/utils";

type TeamMember = {
  name: string;
  role: string;
  title: string;
  bio: string;
  languages: string[];
  specializations: string[];
  yearsExperience: number;
  initials: string;
  gradient: string;
};

const teamMembers: TeamMember[] = [
  {
    name: "MedPobeda Leadership",
    role: "FOUNDER",
    title: "Founder & CEO",
    bio: "Established MedPobeda Group with a vision to bridge the gap between Central Asian patients and world-class Indian healthcare. Over 15 years of experience in international healthcare coordination.",
    languages: ["English", "Russian", "Uzbek"],
    specializations: ["Healthcare Strategy", "Hospital Partnerships", "International Relations"],
    yearsExperience: 15,
    initials: "MP",
    gradient: "from-blue-700 to-blue-500",
  },
  {
    name: "Patient Coordination Team",
    role: "COORDINATOR",
    title: "Senior Patient Coordinators",
    bio: "Our coordinators handle every step of your medical journey — from initial consultation to post-treatment follow-up. Each coordinator specializes in specific medical specialties and regions.",
    languages: ["English", "Russian", "Uzbek", "Kazakh"],
    specializations: ["Patient Navigation", "Hospital Liaison", "Treatment Planning"],
    yearsExperience: 8,
    initials: "PC",
    gradient: "from-blue-600 to-cyan-500",
  },
  {
    name: "Medical Advisory Board",
    role: "MEDICAL_ADVISOR",
    title: "Medical Advisors",
    bio: "Our medical advisors review patient cases, recommend appropriate specialists and hospitals, and ensure treatment plans meet international standards. They maintain relationships with leading Indian physicians.",
    languages: ["English", "Russian"],
    specializations: ["Clinical Review", "Treatment Matching", "Quality Assurance"],
    yearsExperience: 20,
    initials: "MA",
    gradient: "from-emerald-600 to-teal-500",
  },
  {
    name: "International Relations",
    role: "INTERNATIONAL_RELATIONS",
    title: "International Relations Team",
    bio: "Manages partnerships with hospitals, coordinates visa processes, and ensures smooth communication between patients, hospitals, and our regional offices across Central Asia.",
    languages: ["English", "Russian", "Uzbek", "Kazakh", "Kyrgyz"],
    specializations: ["Hospital Relations", "Visa Coordination", "Cross-cultural Communication"],
    yearsExperience: 10,
    initials: "IR",
    gradient: "from-violet-600 to-purple-500",
  },
  {
    name: "Regional Coordinators",
    role: "COORDINATOR",
    title: "Country-Specific Coordinators",
    bio: "Dedicated coordinators in each served country who provide localized support in local languages, understand cultural nuances, and offer timezone-aligned assistance.",
    languages: ["Local languages + English"],
    specializations: ["Local Patient Support", "Cultural Liaison", "In-country Logistics"],
    yearsExperience: 5,
    initials: "RC",
    gradient: "from-amber-600 to-orange-500",
  },
  {
    name: "Patient Support",
    role: "PATIENT_SUPPORT",
    title: "24/7 Patient Support",
    bio: "Round-the-clock support team available via WhatsApp, Telegram, and phone. We handle emergencies, answer queries, and provide reassurance throughout your treatment journey.",
    languages: ["English", "Russian", "Uzbek"],
    specializations: ["Emergency Response", "Patient Assistance", "Follow-up Care"],
    yearsExperience: 5,
    initials: "PS",
    gradient: "from-sky-600 to-blue-400",
  },
];

const roleLabels: Record<string, string> = {
  FOUNDER: "Leadership",
  COORDINATOR: "Coordination",
  MEDICAL_ADVISOR: "Medical",
  INTERNATIONAL_RELATIONS: "Relations",
  PATIENT_SUPPORT: "Support",
};

export function TeamPageContent() {
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
              <span className="section-kicker">Our Team</span>
              <h1 className="mt-5 font-display text-3xl font-bold tracking-[-0.035em] text-[#0B1F4D] sm:text-5xl lg:text-6xl">
                Meet the People Behind Your Care
              </h1>
              <p className="mt-5 body-lg mx-auto max-w-3xl">
                A multidisciplinary team of medical coordinators, healthcare advisors, and international relations specialists — all dedicated to your healthcare journey.
              </p>
            </motion.div>

            <div className="mx-auto mt-10 grid max-w-3xl grid-cols-3 gap-4">
              <div className="rounded-2xl border border-[#D6E8FF] bg-white/80 p-4 text-center shadow-sm">
                <Users className="mx-auto h-6 w-6 text-[#1D4ED8]" />
                <p className="mt-2 font-display text-2xl font-bold text-[#0B1F4D]">30+</p>
                <p className="text-xs text-slate-500">Team Members</p>
              </div>
              <div className="rounded-2xl border border-[#D6E8FF] bg-white/80 p-4 text-center shadow-sm">
                <Globe2 className="mx-auto h-6 w-6 text-cyan-500" />
                <p className="mt-2 font-display text-2xl font-bold text-[#0B1F4D]">7</p>
                <p className="text-xs text-slate-500">Languages</p>
              </div>
              <div className="rounded-2xl border border-[#D6E8FF] bg-white/80 p-4 text-center shadow-sm">
                <Award className="mx-auto h-6 w-6 text-emerald-500" />
                <p className="mt-2 font-display text-2xl font-bold text-[#0B1F4D]">15+</p>
                <p className="text-xs text-slate-500">Years Experience</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Grid */}
      <section className="section-shell pt-0">
        <div className="container-wide">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.06, ease: easeOutExpo }}
                className={cn(
                  "group overflow-hidden rounded-[1.5rem] border border-[#D6E8FF] bg-white/90",
                  "shadow-[0_18px_48px_rgba(7,27,58,0.06)] backdrop-blur-xl",
                  "transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_64px_rgba(29,78,216,0.12)]"
                )}
              >
                {/* Header */}
                <div className="relative bg-gradient-to-br from-blue-50 to-sky-50 p-6">
                  <div className="flex items-center gap-4">
                    <div className={cn("flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br text-2xl font-bold text-white shadow-lg", member.gradient)}>
                      {member.initials}
                    </div>
                    <div>
                      <span className="inline-flex rounded-full bg-white/90 px-3 py-1 text-[0.6rem] font-bold uppercase tracking-[0.18em] text-[#1D4ED8] shadow-sm">
                        {roleLabels[member.role] ?? member.role}
                      </span>
                      <p className="mt-1 text-xs text-slate-500">{member.yearsExperience}+ years experience</p>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-[#0B1F4D]">{member.name}</h3>
                  <p className="mt-1 text-sm text-[#1D4ED8]">{member.title}</p>
                  <p className="mt-3 text-xs leading-6 text-slate-500">{member.bio}</p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {member.languages.map((lang) => (
                      <span key={lang} className="inline-flex items-center gap-1 rounded-full border border-blue-100 bg-blue-50 px-2 py-0.5 text-[0.65rem] font-medium text-blue-700">
                        <Globe2 className="h-2.5 w-2.5" />
                        {lang}
                      </span>
                    ))}
                  </div>

                  <p className="mt-3 text-[0.7rem] leading-5 text-slate-400">
                    {member.specializations.join(" • ")}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-shell-compact">
        <div className="container-wide">
          <div className="section-frame-accent p-6 sm:p-8 lg:p-10 text-center">
            <span className="section-kicker">Why Work With Us</span>
            <h2 className="mt-5 font-display text-2xl font-bold tracking-[-0.03em] text-[#0B1F4D] sm:text-3xl">
              Our Values
            </h2>
            <div className="mx-auto mt-8 grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { title: "Patient First", desc: "Every decision we make prioritizes patient safety, comfort, and outcomes." },
                { title: "Transparency", desc: "Honest pricing, clear communication, no hidden fees or surprises." },
                { title: "Cultural Sensitivity", desc: "We understand and respect the cultural needs of Central Asian patients." },
                { title: "24/7 Availability", desc: "Round-the-clock support because healthcare emergencies don't wait." },
              ].map((value, i) => (
                <div key={value.title} className="rounded-2xl bg-white/80 p-5 text-left shadow-sm">
                  <p className="text-sm font-bold text-[#0B1F4D]">{value.title}</p>
                  <p className="mt-2 text-xs leading-6 text-slate-500">{value.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}