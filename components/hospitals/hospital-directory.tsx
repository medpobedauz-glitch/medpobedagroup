"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";

import { HospitalCard } from "@/components/hospitals/hospital-card";
import { Input } from "@/components/ui/input";
import type { Hospital } from "@/lib/data/hospitals";

const ALL = "All";

export function HospitalDirectory({ hospitals }: { hospitals: Hospital[] }) {
  const [query, setQuery] = useState("");
  const [city, setCity] = useState(ALL);
  const [state, setState] = useState(ALL);
  const [specialty, setSpecialty] = useState(ALL);
  const [treatment, setTreatment] = useState(ALL);
  const [group, setGroup] = useState(ALL);
  const [international, setInternational] = useState(false);

  const options = useMemo(() => ({
    cities: [...new Set(hospitals.map((item) => item.city))].sort(),
    states: [...new Set(hospitals.map((item) => item.state))].sort(),
    specialties: [...new Set(hospitals.flatMap((item) => item.specialties))].sort(),
    treatments: [...new Set(hospitals.flatMap((item) => item.treatments))].sort(),
    groups: [...new Set(hospitals.map((item) => item.hospitalGroup))].sort(),
  }), [hospitals]);

  const results = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return hospitals.filter((hospital) => {
      const searchable = [
        hospital.name,
        hospital.city,
        hospital.state,
        hospital.hospitalGroup,
        ...hospital.specialties,
        ...hospital.treatments,
        ...hospital.diseases,
      ].join(" ").toLowerCase();
      return (
        (!normalizedQuery || searchable.includes(normalizedQuery)) &&
        (city === ALL || hospital.city === city) &&
        (state === ALL || hospital.state === state) &&
        (specialty === ALL || hospital.specialties.includes(specialty as never)) &&
        (treatment === ALL || hospital.treatments.includes(treatment as never)) &&
        (group === ALL || hospital.hospitalGroup === group) &&
        (!international || hospital.internationalPatients)
      );
    });
  }, [city, group, hospitals, international, query, specialty, state, treatment]);

  return (
    <div>
      <div className="section-frame-soft p-5 sm:p-6">
        <label htmlFor="hospital-search" className="sr-only">Search hospitals, treatments, diseases, specialties, cities, or states</label>
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" aria-hidden="true" />
          <Input
            id="hospital-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search hospital, treatment, disease, specialty, city, or state"
            className="h-14 pl-12"
          />
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          <Filter label="City" value={city} options={options.cities} onChange={setCity} />
          <Filter label="State" value={state} options={options.states} onChange={setState} />
          <Filter label="Specialty" value={specialty} options={options.specialties} onChange={setSpecialty} />
          <Filter label="Treatment" value={treatment} options={options.treatments} onChange={setTreatment} />
          <Filter label="Hospital Group" value={group} options={options.groups} onChange={setGroup} />
          <label className="flex min-h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700">
            <input type="checkbox" checked={international} onChange={(event) => setInternational(event.target.checked)} />
            International Patients
          </label>
        </div>
      </div>

      <p className="mt-6 text-sm text-slate-600" aria-live="polite">{results.length} hospitals found</p>
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {results.map((hospital) => <HospitalCard key={hospital.id} hospital={hospital} />)}
      </div>
      {results.length === 0 && (
        <div className="mt-8 rounded-[1.5rem] border border-slate-200 bg-white p-8 text-center text-slate-600">
          No hospitals match these filters. Try removing a filter or using a broader search term.
        </div>
      )}
    </div>
  );
}

function Filter({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (value: string) => void }) {
  return (
    <label className="sr-only">
      {label}
      <select
        aria-label={`Filter by ${label}`}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="not-sr-only min-h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700"
      >
        <option value={ALL}>{label}: All</option>
        {options.map((option) => <option key={option} value={option}>{option}</option>)}
      </select>
    </label>
  );
}
