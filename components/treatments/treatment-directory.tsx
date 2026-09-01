"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, Search, Stethoscope } from "lucide-react";

import type { Hospital } from "@/lib/data/hospitals";
import type { Treatment } from "@/lib/data/treatments";

const ALL = "All";

export function TreatmentDirectory({ treatments, hospitals }: { treatments: Treatment[]; hospitals: Hospital[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(ALL);
  const [specialty, setSpecialty] = useState(ALL);
  const [hospital, setHospital] = useState(ALL);
  const [city, setCity] = useState(ALL);
  const [organSystem, setOrganSystem] = useState(ALL);
  const [popularOnly, setPopularOnly] = useState(false);

  const hospitalBySlug = useMemo(() => new Map(hospitals.map((item) => [item.slug, item])), [hospitals]);
  const options = useMemo(() => ({
    categories: [...new Set(treatments.map((item) => item.category))].sort(),
    specialties: [...new Set(treatments.map((item) => item.specialty))].sort(),
    organSystems: [...new Set(treatments.map((item) => item.organSystem))].sort(),
    hospitals: [...new Set(treatments.flatMap((item) => item.suitableHospitals))]
      .map((slug) => hospitalBySlug.get(slug))
      .filter((item): item is Hospital => Boolean(item))
      .sort((a, b) => a.name.localeCompare(b.name)),
    cities: [...new Set(
      treatments
        .flatMap((item) => item.suitableHospitals)
        .map((slug) => hospitalBySlug.get(slug)?.city)
        .filter((item): item is string => Boolean(item)),
    )].sort(),
  }), [hospitalBySlug, treatments]);

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return treatments.filter((treatment) => {
      const hospitalNames = treatment.suitableHospitals.map((slug) => hospitalBySlug.get(slug)?.name ?? "");
      const searchable = [
        treatment.name,
        treatment.category,
        treatment.specialty,
        treatment.organSystem,
        treatment.shortDescription,
        ...treatment.symptoms,
        ...treatment.diagnosis,
        ...treatment.treatmentOptions,
        ...hospitalNames,
      ].join(" ").toLowerCase();
      return (
        (!needle || searchable.includes(needle)) &&
        (category === ALL || treatment.category === category) &&
        (specialty === ALL || treatment.specialty === specialty) &&
        (hospital === ALL || treatment.suitableHospitals.includes(hospital)) &&
        (city === ALL || treatment.suitableHospitals.some((slug) => hospitalBySlug.get(slug)?.city === city)) &&
        (organSystem === ALL || treatment.organSystem === organSystem) &&
        (!popularOnly || treatment.popular)
      );
    });
  }, [category, city, hospital, hospitalBySlug, organSystem, popularOnly, query, specialty, treatments]);

  const featured = treatments.filter((item) => item.featured).slice(0, 6);
  const newest = [...treatments].sort((a, b) => b.addedAt.localeCompare(a.addedAt)).slice(0, 6);

  return (
    <div>
      <TreatmentStrip title="Featured treatments" items={featured} />
      <TreatmentStrip title="Newest treatments" items={newest} />

      <div className="section-frame-soft mt-10 p-5 sm:p-6">
        <label htmlFor="treatment-search" className="sr-only">Search by disease, treatment, procedure, hospital, or specialty</label>
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" aria-hidden="true" />
          <input
            id="treatment-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search disease, treatment, procedure, hospital, or specialty"
            className="h-14 w-full rounded-xl border border-slate-200 bg-white pl-12 pr-4 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          <Select label="Category" value={category} options={options.categories} onChange={setCategory} />
          <Select label="Specialty" value={specialty} options={options.specialties} onChange={setSpecialty} />
          <label>
            <span className="sr-only">Filter by hospital</span>
            <select value={hospital} onChange={(event) => setHospital(event.target.value)} aria-label="Filter by hospital" className="min-h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700">
              <option value={ALL}>Hospital: All</option>
              {options.hospitals.map((item) => <option key={item.slug} value={item.slug}>{item.name}</option>)}
            </select>
          </label>
          <Select label="City" value={city} options={options.cities} onChange={setCity} />
          <Select label="Organ System" value={organSystem} options={options.organSystems} onChange={setOrganSystem} />
          <label className="flex min-h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700">
            <input type="checkbox" checked={popularOnly} onChange={(event) => setPopularOnly(event.target.checked)} />
            Popular treatments
          </label>
        </div>
      </div>

      <p className="mt-6 text-sm text-slate-600" aria-live="polite">{results.length} treatments found</p>
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {results.map((treatment) => (
          <TreatmentCard key={treatment.id} treatment={treatment} hospitalNames={treatment.suitableHospitals.map((slug) => hospitalBySlug.get(slug)?.name).filter(Boolean) as string[]} />
        ))}
      </div>
      {results.length === 0 && <div className="mt-8 rounded-[1.5rem] border border-slate-200 bg-white p-8 text-center text-slate-600">No treatments match these filters.</div>}
    </div>
  );
}

function TreatmentCard({ treatment, hospitalNames }: { treatment: Treatment; hospitalNames: string[] }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-[1.85rem] border border-slate-200 bg-white shadow-sm">
      <div className="relative aspect-[16/9] overflow-hidden">
        <Image src={treatment.heroImage} alt={`${treatment.name} treatment planning`} fill loading="lazy" className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-sky-700"><Stethoscope className="h-4 w-4" />{treatment.specialty}</p>
        <h3 className="mt-3 font-display text-2xl font-semibold text-slate-950">{treatment.name}</h3>
        <p className="mt-3 text-sm leading-7 text-slate-600">{treatment.shortDescription}</p>
        <p className="mt-4 text-xs leading-6 text-slate-500"><span className="font-semibold text-slate-700">Partner hospitals:</span> {hospitalNames.slice(0, 3).join(", ")}</p>
        <div className="mt-auto flex flex-col gap-2 pt-6">
          <Link href={`/treatments/${treatment.slug}`} className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-700 to-blue-600 px-5 py-3 text-sm font-bold text-white">View Details <ArrowRight className="h-4 w-4" /></Link>
          <Link href="/international-patient-care" className="inline-flex items-center justify-center rounded-full border border-[#D6E8FF] bg-white px-5 py-3 text-sm font-bold text-[#0B1F4D]">Book Consultation</Link>
        </div>
      </div>
    </article>
  );
}

function TreatmentStrip({ title, items }: { title: string; items: Treatment[] }) {
  return <div className="mt-8 first:mt-0"><h2 className="font-display text-2xl font-semibold text-slate-950">{title}</h2><div className="mt-4 flex gap-3 overflow-x-auto pb-2">{items.map((item) => <Link key={item.slug} href={`/treatments/${item.slug}`} className="shrink-0 rounded-full border border-[#D6E8FF] bg-white px-5 py-3 text-sm font-semibold text-[#1D4ED8] transition hover:-translate-y-0.5">{item.name}</Link>)}</div></div>;
}

function Select({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (value: string) => void }) {
  return <label><span className="sr-only">Filter by {label}</span><select aria-label={`Filter by ${label}`} value={value} onChange={(event) => onChange(event.target.value)} className="min-h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700"><option value={ALL}>{label}: All</option>{options.map((option) => <option key={option}>{option}</option>)}</select></label>;
}
