"use client";

import Link from "next/link";
import { useDeferredValue, useMemo, useState } from "react";
import { RotateCcw, Search } from "lucide-react";

import { DiseaseCard } from "@/components/diseases/disease-card";
import { Button } from "@/components/ui/button";
import type { DiseaseDirectoryEntry } from "@/lib/data/diseases";
import { cn } from "@/lib/utils";

const ALL = "All";
const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

type DirectoryOptions = {
  categories: string[];
  organSystems: string[];
  specialties: string[];
  hospitals: Array<{ slug: string; name: string }>;
  treatments: Array<{ slug: string; name: string }>;
  severities: string[];
};

export function DiseaseDirectory({ diseases }: { diseases: DiseaseDirectoryEntry[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(ALL);
  const [organSystem, setOrganSystem] = useState(ALL);
  const [specialty, setSpecialty] = useState(ALL);
  const [hospital, setHospital] = useState(ALL);
  const [treatment, setTreatment] = useState(ALL);
  const [severity, setSeverity] = useState(ALL);
  const [letter, setLetter] = useState(ALL);
  const deferredQuery = useDeferredValue(query);

  const options = useMemo<DirectoryOptions>(() => {
    const unique = (values: string[]) =>
      [...new Set(values.filter(Boolean))].sort((a, b) => a.localeCompare(b));
    const relationMap = (
      relations: Array<{ slug: string; name: string }>,
    ) =>
      [...new Map(relations.map((item) => [item.slug, item])).values()].sort(
        (a, b) => a.name.localeCompare(b.name),
      );

    return {
      categories: unique(diseases.map((item) => item.category)),
      organSystems: unique(diseases.map((item) => item.organSystem)),
      specialties: unique(diseases.map((item) => item.specialty)),
      hospitals: relationMap(diseases.flatMap((item) => item.hospitals)),
      treatments: relationMap(diseases.flatMap((item) => item.treatments)),
      severities: unique(diseases.map((item) => item.severity)),
    };
  }, [diseases]);

  const results = useMemo(() => {
    const needle = deferredQuery.trim().toLocaleLowerCase();

    return diseases
      .filter((disease) => {
        const searchable = [
          disease.name,
          disease.category,
          disease.organSystem,
          disease.specialty,
          disease.shortDescription,
          ...disease.symptoms,
          ...disease.warningSigns,
          ...disease.hospitals.map((item) => item.name),
          ...disease.treatments.map((item) => item.name),
          ...disease.doctorSearchTerms,
        ]
          .join(" ")
          .toLocaleLowerCase();

        return (
          (!needle || searchable.includes(needle)) &&
          (category === ALL || disease.category === category) &&
          (organSystem === ALL || disease.organSystem === organSystem) &&
          (specialty === ALL || disease.specialty === specialty) &&
          (hospital === ALL || disease.hospitals.some((item) => item.slug === hospital)) &&
          (treatment === ALL || disease.treatments.some((item) => item.slug === treatment)) &&
          (severity === ALL || disease.severity === severity) &&
          (letter === ALL ||
            disease.name.toLocaleUpperCase().startsWith(letter))
        );
      })
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [
    category,
    deferredQuery,
    diseases,
    hospital,
    letter,
    organSystem,
    severity,
    specialty,
    treatment,
  ]);

  const spotlights = useMemo(() => {
    const featured = diseases.filter((item) => item.featured);
    const popular = diseases.filter((item) => item.popular);
    const recentlyAdded = [...diseases]
      .sort((a, b) => b.addedAt.localeCompare(a.addedAt))
      .slice(0, 6);

    return {
      featured: (featured.length > 0 ? featured : diseases).slice(0, 6),
      popular: (popular.length > 0 ? popular : diseases).slice(0, 6),
      recentlyAdded,
    };
  }, [diseases]);

  const availableLetters = useMemo(
    () =>
      new Set(
        diseases
          .map((disease) => disease.name.trim().charAt(0).toLocaleUpperCase())
          .filter(Boolean),
      ),
    [diseases],
  );

  const filtersActive =
    query !== "" ||
    category !== ALL ||
    organSystem !== ALL ||
    specialty !== ALL ||
    hospital !== ALL ||
    treatment !== ALL ||
    severity !== ALL ||
    letter !== ALL;

  function resetFilters() {
    setQuery("");
    setCategory(ALL);
    setOrganSystem(ALL);
    setSpecialty(ALL);
    setHospital(ALL);
    setTreatment(ALL);
    setSeverity(ALL);
    setLetter(ALL);
  }

  return (
    <div>
      <DiseaseStrip title="Featured Diseases" items={spotlights.featured} />
      <DiseaseStrip title="Popular Diseases" items={spotlights.popular} />
      <DiseaseStrip title="Recently Added" items={spotlights.recentlyAdded} />

      <div className="section-frame-soft mt-10 p-5 sm:p-6">
        <label htmlFor="disease-search" className="sr-only">
          Search diseases, symptoms, treatments, hospitals, doctors, or
          specialties
        </label>
        <div className="relative">
          <Search
            className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
            aria-hidden="true"
          />
          <input
            id="disease-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search disease, symptom, treatment, hospital, doctor, or specialty"
            className="h-14 w-full rounded-xl border border-slate-200 bg-white pl-12 pr-4 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          <Select
            label="Category"
            value={category}
            options={options.categories}
            onChange={setCategory}
          />
          <Select
            label="Body System"
            value={organSystem}
            options={options.organSystems}
            onChange={setOrganSystem}
          />
          <Select
            label="Specialty"
            value={specialty}
            options={options.specialties}
            onChange={setSpecialty}
          />
          <RelationSelect
            label="Hospital"
            value={hospital}
            options={options.hospitals}
            onChange={setHospital}
          />
          <RelationSelect
            label="Treatment"
            value={treatment}
            options={options.treatments}
            onChange={setTreatment}
          />
          <Select
            label="Severity"
            value={severity}
            options={options.severities}
            onChange={setSeverity}
          />
        </div>

        <div className="mt-5 border-t border-slate-200 pt-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p
              id="disease-alphabet-label"
              className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500"
            >
              Browse A–Z
            </p>
            {filtersActive ? (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={resetFilters}
                aria-label="Clear all disease filters"
              >
                <RotateCcw className="h-4 w-4" aria-hidden="true" />
                Clear filters
              </Button>
            ) : null}
          </div>
          <nav
            className="mt-3 flex flex-wrap gap-1.5"
            aria-labelledby="disease-alphabet-label"
          >
            <AlphabetButton
              value={ALL}
              active={letter === ALL}
              available
              onSelect={setLetter}
            />
            {ALPHABET.map((item) => (
              <AlphabetButton
                key={item}
                value={item}
                active={letter === item}
                available={availableLetters.has(item)}
                onSelect={setLetter}
              />
            ))}
          </nav>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-slate-600" aria-live="polite" aria-atomic="true">
          {results.length} {results.length === 1 ? "disease" : "diseases"} found
        </p>
        {letter !== ALL ? (
          <p className="text-sm text-slate-500">
            Showing conditions beginning with “{letter}”
          </p>
        ) : null}
      </div>

      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {results.map((disease) => (
          <DiseaseCard key={disease.id} disease={disease} />
        ))}
      </div>

      {results.length === 0 ? (
        <div
          className="mt-8 rounded-[1.5rem] border border-slate-200 bg-white p-8 text-center"
          role="status"
        >
          <p className="font-semibold text-slate-900">
            No diseases match these filters.
          </p>
          <p className="mt-2 text-sm text-slate-600">
            Try another search term or clear the selected filters.
          </p>
          <Button
            type="button"
            variant="outline"
            className="mt-5"
            onClick={resetFilters}
          >
            Clear filters
          </Button>
        </div>
      ) : null}
    </div>
  );
}

function DiseaseStrip({
  title,
  items,
}: {
  title: string;
  items: DiseaseDirectoryEntry[];
}) {
  if (items.length === 0) return null;

  return (
    <section className="mt-8 first:mt-0" aria-labelledby={`disease-${toId(title)}`}>
      <h2
        id={`disease-${toId(title)}`}
        className="font-display text-2xl font-semibold text-slate-950"
      >
        {title}
      </h2>
      <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
        {items.map((item) => (
          <Link
            key={item.slug}
            href={`/diseases/${item.slug}`}
            className="shrink-0 rounded-full border border-[#D6E8FF] bg-white px-5 py-3 text-sm font-semibold text-[#1D4ED8] transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          >
            {item.name}
          </Link>
        ))}
      </div>
    </section>
  );
}

function Select({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <label>
      <span className="sr-only">Filter by {label}</span>
      <select
        aria-label={`Filter by ${label}`}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="min-h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700"
      >
        <option value={ALL}>{label}: All</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function RelationSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: Array<{ slug: string; name: string }>;
  onChange: (value: string) => void;
}) {
  return (
    <label>
      <span className="sr-only">Filter by {label}</span>
      <select
        aria-label={`Filter by ${label}`}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="min-h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700"
      >
        <option value={ALL}>{label}: All</option>
        {options.map((option) => (
          <option key={option.slug} value={option.slug}>
            {option.name}
          </option>
        ))}
      </select>
    </label>
  );
}

function AlphabetButton({
  value,
  active,
  available,
  onSelect,
}: {
  value: string;
  active: boolean;
  available: boolean;
  onSelect: (value: string) => void;
}) {
  return (
    <button
      type="button"
      disabled={!available}
      aria-pressed={active}
      aria-label={
        value === ALL ? "Show all diseases" : `Show diseases beginning with ${value}`
      }
      onClick={() => onSelect(value)}
      className={cn(
        "flex h-9 min-w-9 items-center justify-center rounded-lg border px-2 text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
        active
          ? "border-blue-700 bg-blue-700 text-white"
          : "border-slate-200 bg-white text-slate-600 hover:border-blue-300 hover:text-blue-700",
        !available && "cursor-not-allowed opacity-35",
      )}
    >
      {value}
    </button>
  );
}

function toId(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}
