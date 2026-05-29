"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Star, MapPin, Award } from "lucide-react";

import { easeOutExpo } from "@/lib/motion";
import { cn } from "@/lib/utils";

type HospitalPartner = {
  id: string;
  name: string;
  slug: string;
  shortName: string | null;
  logo: string | null;
  coverImage: string | null;
  country: string;
  city: string | null;
  specialties: string[];
  bedCount: number | null;
  establishedYear: number | null;
  accreditations: string[];
  patientRating: number | null;
};

type HospitalPartnersSectionProps = {
  partners: HospitalPartner[];
  eyebrow?: string;
  title?: string;
  description?: string;
};

export function HospitalPartnersSection({
  partners,
  eyebrow = "Our Partner Network",
  title = "World-Class Hospital Partners",
  description = "We collaborate with India's most trusted JCI and NABH accredited hospitals, each equipped with dedicated international patient desks.",
}: HospitalPartnersSectionProps) {
  if (partners.length === 0) return null;

  return (
    <section className="section-shell pt-0">
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
          {partners.map((partner, index) => (
            <motion.div
              key={partner.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.05,
                ease: easeOutExpo,
              }}
            >
              <Link
                href={`/hospitals/${partner.slug}`}
                className={cn(
                  "group block h-full overflow-hidden rounded-[1.5rem] border border-[#D6E8FF] bg-white/90",
                  "shadow-[0_18px_48px_rgba(7,27,58,0.06)] backdrop-blur-xl",
                  "transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_64px_rgba(29,78,216,0.12)]"
                )}
              >
                {/* Hospital Image/Logo */}
                <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-sky-50 p-6">
                  {partner.coverImage ? (
                    <div className="relative aspect-[16/9] overflow-hidden rounded-2xl">
                      <Image
                        src={partner.coverImage}
                        alt={partner.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  ) : partner.logo ? (
                    <div className="flex h-28 items-center justify-center">
                      <Image
                        src={partner.logo}
                        alt={partner.name}
                        width={120}
                        height={80}
                        className="object-contain"
                      />
                    </div>
                  ) : (
                    <div className="flex h-28 items-center justify-center">
                      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white">
                        <Award className="h-8 w-8" />
                      </div>
                    </div>
                  )}

                  {/* Rating Badge */}
                  {partner.patientRating && (
                    <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-white/95 px-3 py-1.5 shadow-lg backdrop-blur-sm">
                      <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                      <span className="text-xs font-bold text-slate-900">
                        {partner.patientRating.toFixed(1)}
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-[#0B1F4D] group-hover:text-[#1D4ED8] transition-colors">
                    {partner.shortName || partner.name}
                  </h3>

                  <div className="mt-2 flex items-center gap-1.5 text-xs text-slate-500">
                    <MapPin className="h-3.5 w-3.5" />
                    <span>
                      {partner.city ? `${partner.city}, ` : ""}
                      {partner.country}
                    </span>
                  </div>

                  {/* Accreditations */}
                  {partner.accreditations.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {partner.accreditations.slice(0, 3).map((acc) => (
                        <span
                          key={acc}
                          className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[0.65rem] font-semibold text-emerald-700"
                        >
                          {acc}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Specialties */}
                  {partner.specialties.length > 0 && (
                    <p className="mt-3 text-xs leading-6 text-slate-500">
                      {partner.specialties.slice(0, 3).join(" • ")}
                      {partner.specialties.length > 3 &&
                        ` +${partner.specialties.length - 3} more`}
                    </p>
                  )}

                  {/* Stats Row */}
                  <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
                    <div className="flex gap-4 text-xs text-slate-500">
                      {partner.bedCount && (
                        <span>{partner.bedCount} beds</span>
                      )}
                      {partner.establishedYear && (
                        <span>Est. {partner.establishedYear}</span>
                      )}
                    </div>
                    <ArrowRight className="h-4 w-4 text-[#1D4ED8] transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
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
            href="/hospitals"
            className="inline-flex items-center gap-2 rounded-full border border-[#D6E8FF] bg-white px-6 py-3 text-sm font-semibold text-[#1D4ED8] shadow-[0_12px_32px_rgba(7,27,58,0.06)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_48px_rgba(29,78,216,0.12)]"
          >
            View All Partner Hospitals
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}