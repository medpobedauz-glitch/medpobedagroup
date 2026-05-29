"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ShieldCheck, Award, FileCheck, BadgeCheck } from "lucide-react";

import { easeOutExpo } from "@/lib/motion";
import { cn } from "@/lib/utils";

type Accreditation = {
  id: string;
  name: string;
  type: string;
  issuer: string;
  description: string | null;
  logo: string | null;
};

type AccreditationsSectionProps = {
  accreditations: Accreditation[];
  eyebrow?: string;
  title?: string;
  description?: string;
};

const typeIcons: Record<string, typeof ShieldCheck> = {
  CERTIFICATION: ShieldCheck,
  REGISTRATION: FileCheck,
  MEMBERSHIP: Award,
  COMPLIANCE: BadgeCheck,
  AWARD: Award,
};

export function AccreditationsSection({
  accreditations,
  eyebrow = "Trust & Compliance",
  title = "Accreditations & Memberships",
  description = "MedPobeda Group operates with full compliance and maintains active memberships in international healthcare organizations.",
}: AccreditationsSectionProps) {
  if (accreditations.length === 0) return null;

  return (
    <section className="section-shell-compact">
      <div className="container-wide">
        <div className="section-frame-accent p-6 sm:p-8 lg:p-10">
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

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {accreditations.map((acc, index) => {
              const Icon = typeIcons[acc.type] ?? ShieldCheck;

              return (
                <motion.div
                  key={acc.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.04,
                    ease: easeOutExpo,
                  }}
                  className={cn(
                    "rounded-[1.3rem] border border-[#D6E8FF] bg-white/92 p-5",
                    "shadow-[0_14px_36px_rgba(7,27,58,0.05)] backdrop-blur-xl",
                    "transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_48px_rgba(29,78,216,0.1)]"
                  )}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-md">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-sm font-semibold text-[#0B1F4D]">
                        {acc.name}
                      </h3>
                      <p className="mt-1 text-xs text-slate-500">
                        {acc.issuer}
                      </p>
                    </div>
                  </div>
                  {acc.description && (
                    <p className="mt-3 text-xs leading-6 text-slate-500">
                      {acc.description}
                    </p>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Trust Badges Row */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-4"
          >
            {[
              "JCI Accredited Partners",
              "NABH Certified Hospitals",
              "ISO 9001 Compliant",
              "Ministry of Health Registered",
            ].map((badge) => (
              <div
                key={badge}
                className="inline-flex items-center gap-2 rounded-full border border-emerald-200/80 bg-emerald-50/80 px-4 py-2 text-xs font-semibold text-emerald-700"
              >
                <ShieldCheck className="h-3.5 w-3.5" />
                {badge}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}