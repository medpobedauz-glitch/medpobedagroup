"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Building2, MapPin } from "lucide-react";

import { easeOutExpo } from "@/lib/motion";

type HospitalPartner = {
  id: string;
  name: string;
  slug: string;
  logo: string | null;
  featuredImage: string;
  country: string;
  city: string;
  state: string;
  shortDescription: string;
  specialties: string[];
};

export function HospitalPartnersSection({
  partners,
  eyebrow = "Our Partner Network",
  title = "World-Class Hospital Partners",
  description = "We collaborate with trusted hospitals across India, each equipped to support international patient journeys.",
}: {
  partners: HospitalPartner[];
  eyebrow?: string;
  title?: string;
  description?: string;
}) {
  if (partners.length === 0) return null;
  return (
    <section className="section-shell pt-0">
      <div className="container-wide">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: easeOutExpo }} className="text-center">
          <span className="section-kicker">{eyebrow}</span>
          <h2 className="mt-5 heading-section">{title}</h2>
          <p className="mt-4 body-lg mx-auto">{description}</p>
        </motion.div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {partners.map((partner, index) => (
            <motion.article key={partner.id} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.05, ease: easeOutExpo }} className="flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-[#D6E8FF] bg-white/90 shadow-[0_18px_48px_rgba(7,27,58,0.06)]">
              <div className="relative flex h-32 items-center justify-center bg-gradient-to-br from-blue-50 to-sky-50 p-5">
                {partner.logo ? <Image src={partner.logo} alt={`${partner.name} logo`} width={120} height={70} loading="lazy" className="max-h-20 w-auto object-contain" /> : <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white"><Building2 className="h-8 w-8" /></div>}
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-lg font-semibold text-[#0B1F4D]">{partner.name}</h3>
                <p className="mt-2 flex items-center gap-1.5 text-xs text-slate-500"><MapPin className="h-3.5 w-3.5" />{partner.city}, {partner.state}</p>
                <p className="mt-3 text-sm leading-6 text-slate-600">{partner.shortDescription}</p>
                <div className="mt-auto flex flex-col gap-2 pt-5">
                  <Link href={`/hospitals/${partner.slug}`} className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-700 to-blue-600 px-5 py-3 text-sm font-bold text-white">View Hospital <ArrowRight className="h-4 w-4" /></Link>
                  <Link href="/contact" className="inline-flex items-center justify-center rounded-full border border-[#D6E8FF] bg-white px-5 py-3 text-sm font-bold text-[#0B1F4D]">Request Treatment</Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
        <div className="mt-10 text-center"><Link href="/hospitals" className="inline-flex items-center gap-2 rounded-full border border-[#D6E8FF] bg-white px-6 py-3 text-sm font-semibold text-[#1D4ED8]">View All Partner Hospitals <ArrowRight className="h-4 w-4" /></Link></div>
      </div>
    </section>
  );
}
