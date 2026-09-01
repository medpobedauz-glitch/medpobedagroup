"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";

import { DoctorCard } from "@/components/doctors/doctor-card";
import type { Doctor } from "@/lib/data/doctors";
import type { Hospital } from "@/lib/data/hospitals";
import type { Treatment } from "@/lib/data/treatments";

const ALL = "All";

export function DoctorDirectory({ doctors, hospitals, treatments }: { doctors: Doctor[]; hospitals: Hospital[]; treatments: Treatment[] }) {
  const [query, setQuery] = useState("");
  const [specialty, setSpecialty] = useState(ALL);
  const [hospital, setHospital] = useState(ALL);
  const [group, setGroup] = useState(ALL);
  const [city, setCity] = useState(ALL);
  const [state, setState] = useState(ALL);
  const [experience, setExperience] = useState(ALL);
  const [language, setLanguage] = useState(ALL);
  const [treatment, setTreatment] = useState(ALL);
  const [teleconsultation, setTeleconsultation] = useState(false);
  const [international, setInternational] = useState(false);
  const [sort, setSort] = useState("experience");

  const hospitalBySlug = useMemo(() => new Map(hospitals.map((item) => [item.slug, item])), [hospitals]);
  const treatmentBySlug = useMemo(() => new Map(treatments.map((item) => [item.slug, item])), [treatments]);
  const unique = (values: string[]) => [...new Set(values)].sort();
  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return doctors.filter((doctor) => {
      const searchable = [doctor.name, doctor.specialization, doctor.hospitalGroup, doctor.city, ...doctor.languages, ...doctor.diseases, ...doctor.procedures, ...doctor.treatments.map((slug) => treatmentBySlug.get(slug)?.name ?? slug)].join(" ").toLowerCase();
      return (!needle || searchable.includes(needle)) &&
        (specialty === ALL || doctor.specialization === specialty) &&
        (hospital === ALL || doctor.hospitalId === hospital) &&
        (group === ALL || doctor.hospitalGroup === group) &&
        (city === ALL || doctor.city === city) &&
        (state === ALL || doctor.state === state) &&
        (experience === ALL || doctor.yearsOfExperience >= Number(experience)) &&
        (language === ALL || doctor.languages.includes(language)) &&
        (treatment === ALL || doctor.treatments.includes(treatment)) &&
        (!teleconsultation || doctor.teleconsultationAvailable) &&
        (!international || doctor.internationalPatients);
    }).sort((a, b) => {
      if (sort === "alphabetical") return a.name.localeCompare(b.name);
      if (sort === "hospital") return a.hospitalGroup.localeCompare(b.hospitalGroup);
      if (sort === "newest") return b.addedAt.localeCompare(a.addedAt);
      return b.yearsOfExperience - a.yearsOfExperience;
    });
  }, [city, doctors, experience, group, hospital, international, language, query, sort, specialty, state, teleconsultation, treatment, treatmentBySlug]);

  return (
    <div>
      <div className="section-frame-soft p-5 sm:p-6">
        <label htmlFor="doctor-search" className="sr-only">Search doctors by name, disease, treatment, procedure, hospital, specialty, language, or city</label>
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
          <input id="doctor-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search doctor, disease, treatment, procedure, hospital, specialty, language, or city" className="h-14 w-full rounded-xl border border-slate-200 bg-white pl-12 pr-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          <Select label="Specialty" value={specialty} options={unique(doctors.map((item) => item.specialization))} onChange={setSpecialty} />
          <label><span className="sr-only">Hospital</span><select aria-label="Filter by hospital" value={hospital} onChange={(event) => setHospital(event.target.value)} className="filter-select"><option value={ALL}>Hospital: All</option>{unique(doctors.map((item) => item.hospitalId)).map((slug) => <option key={slug} value={slug}>{hospitalBySlug.get(slug)?.name ?? slug}</option>)}</select></label>
          <Select label="Hospital Group" value={group} options={unique(doctors.map((item) => item.hospitalGroup))} onChange={setGroup} />
          <Select label="City" value={city} options={unique(doctors.map((item) => item.city))} onChange={setCity} />
          <Select label="State" value={state} options={unique(doctors.map((item) => item.state))} onChange={setState} />
          <Select label="Experience" value={experience} options={["10", "20", "30", "40"]} onChange={setExperience} suffix="+ years" />
          <Select label="Language" value={language} options={unique(doctors.flatMap((item) => item.languages))} onChange={setLanguage} />
          <label><span className="sr-only">Treatment</span><select aria-label="Filter by treatment" value={treatment} onChange={(event) => setTreatment(event.target.value)} className="filter-select"><option value={ALL}>Treatment: All</option>{unique(doctors.flatMap((item) => item.treatments)).map((slug) => <option key={slug} value={slug}>{treatmentBySlug.get(slug)?.name ?? slug}</option>)}</select></label>
          <label><span className="sr-only">Sort doctors</span><select aria-label="Sort doctors" value={sort} onChange={(event) => setSort(event.target.value)} className="filter-select"><option value="experience">Most Experienced</option><option value="alphabetical">Alphabetical</option><option value="hospital">Hospital</option><option value="newest">Newest</option></select></label>
          <div className="grid grid-cols-2 gap-2">
            <Check label="Teleconsultation" checked={teleconsultation} onChange={setTeleconsultation} />
            <Check label="International" checked={international} onChange={setInternational} />
          </div>
        </div>
      </div>
      <p className="mt-6 text-sm text-slate-600" aria-live="polite">{results.length} doctors found</p>
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{results.map((doctor) => <DoctorCard key={doctor.id} doctor={doctor} />)}</div>
      {results.length === 0 && <div className="mt-8 rounded-[1.5rem] border border-slate-200 bg-white p-8 text-center text-slate-600">No doctors match these filters.</div>}
      <style jsx>{`.filter-select{min-height:2.75rem;width:100%;border-radius:.75rem;border:1px solid rgb(226 232 240);background:white;padding:0 .75rem;font-size:.875rem;color:rgb(51 65 85)}`}</style>
    </div>
  );
}

function Select({ label, value, options, onChange, suffix = "" }: { label: string; value: string; options: string[]; onChange: (value: string) => void; suffix?: string }) {
  return <label><span className="sr-only">{label}</span><select aria-label={`Filter by ${label}`} value={value} onChange={(event) => onChange(event.target.value)} className="min-h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700"><option value={ALL}>{label}: All</option>{options.map((option) => <option key={option} value={option}>{option}{suffix ? ` ${suffix}` : ""}</option>)}</select></label>;
}

function Check({ label, checked, onChange }: { label: string; checked: boolean; onChange: (value: boolean) => void }) {
  return <label className="flex min-h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white px-2 text-xs text-slate-700"><input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} />{label}</label>;
}
