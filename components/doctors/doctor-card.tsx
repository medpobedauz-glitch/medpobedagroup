import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Building2, Languages, Stethoscope } from "lucide-react";

import type { Doctor } from "@/lib/data/doctors";

export function DoctorCard({
  doctor,
  sourceDiseaseSlug,
}: {
  doctor: Doctor;
  sourceDiseaseSlug?: string;
}) {
  const Heading = sourceDiseaseSlug ? "h3" : "h2";

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-[1.85rem] border border-slate-200 bg-white shadow-sm">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image src={doctor.image} alt={`${doctor.name}, ${doctor.specialization}`} fill loading="lazy" className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-sky-700"><Stethoscope className="h-4 w-4" />{doctor.specialization}</p>
        <Heading className="mt-3 font-display text-2xl font-semibold text-slate-950">{doctor.name}</Heading>
        <p className="mt-2 text-sm font-medium text-slate-600">{doctor.title}</p>
        <p className="mt-4 flex items-start gap-2 text-xs leading-6 text-slate-500"><Building2 className="mt-1 h-4 w-4 shrink-0" />{doctor.hospitalGroup}, {doctor.city}</p>
        <p className="mt-2 flex items-center gap-2 text-xs text-slate-500"><Languages className="h-4 w-4" />{doctor.languages.join(", ")}</p>
        <p className="mt-3 text-sm font-semibold text-[#0B1F4D]">{doctor.yearsOfExperience}+ years of experience</p>
        <div className="mt-auto flex flex-col gap-2 pt-6">
          <Link
            href={`/doctors/${doctor.slug}`}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-700 to-blue-600 px-5 py-3 text-sm font-bold text-white"
            data-analytics-content-type={sourceDiseaseSlug ? "disease" : undefined}
            data-analytics-disease={sourceDiseaseSlug}
            data-analytics-event={sourceDiseaseSlug ? "doctor_profile_visit" : undefined}
            data-analytics-target={sourceDiseaseSlug ? doctor.slug : undefined}
          >
            View Profile <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href={`/contact?doctor=${encodeURIComponent(doctor.name)}${sourceDiseaseSlug ? `&source=disease&disease=${encodeURIComponent(sourceDiseaseSlug)}` : ""}`}
            className="inline-flex items-center justify-center rounded-full border border-[#D6E8FF] bg-white px-5 py-3 text-sm font-bold text-[#0B1F4D]"
            data-analytics-content-type={sourceDiseaseSlug ? "disease" : undefined}
            data-analytics-disease={sourceDiseaseSlug}
            data-analytics-event={sourceDiseaseSlug ? "consultation_lead" : undefined}
            data-analytics-target={sourceDiseaseSlug ? doctor.slug : undefined}
          >
            Book Consultation
          </Link>
        </div>
      </div>
    </article>
  );
}
