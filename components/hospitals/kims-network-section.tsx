import Link from "next/link";
import { ArrowRight, Building2, MapPin } from "lucide-react";

import type { Hospital } from "@/lib/data/hospitals";

export function KimsNetworkSection({ hospitals }: { hospitals: Hospital[] }) {
  const kimsHospitals = hospitals.filter((hospital) => hospital.hospitalGroupSlug === "kims");
  const hospitalsByState = kimsHospitals.reduce<Record<string, Hospital[]>>((groups, hospital) => {
    (groups[hospital.state] ??= []).push(hospital);
    return groups;
  }, {});

  return (
    <section className="section-shell pt-0" aria-labelledby="kims-network-title">
      <div className="container-wide">
        <div className="section-frame px-4 py-8 sm:px-8 lg:px-10 lg:py-12">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="section-kicker">KIMS Hospital Network</p>
              <h2 id="kims-network-title" className="mt-5 heading-section">
                All {kimsHospitals.length} KIMS hospital branches
              </h2>
              <p className="mt-4 text-base leading-8 text-slate-600">
                Explore every KIMS location in the MedPobeda India hospital network,
                organized by state for faster hospital selection.
              </p>
            </div>
            <Link
              href="/hospital-groups/kims"
              className="inline-flex w-fit items-center gap-2 rounded-full bg-gradient-to-r from-blue-700 to-blue-600 px-6 py-3 text-sm font-bold text-white shadow-[0_12px_32px_rgba(29,78,216,0.2)] transition hover:-translate-y-0.5"
            >
              View Full KIMS Network
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {Object.entries(hospitalsByState).map(([state, branches]) => (
              <div key={state} className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50 text-sky-700">
                    <Building2 className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-semibold text-slate-950">{state}</h3>
                    <p className="text-xs text-slate-500">{branches.length} branches</p>
                  </div>
                </div>
                <ul className="mt-5 space-y-2">
                  {branches.map((hospital) => (
                    <li key={hospital.slug}>
                      <Link
                        href={`/hospitals/${hospital.slug}`}
                        className="group flex items-center justify-between gap-3 rounded-xl border border-slate-100 px-3 py-3 text-sm font-semibold text-slate-700 transition hover:border-sky-200 hover:text-sky-700"
                        aria-label={`View ${hospital.name} hospital profile`}
                      >
                        <span className="flex items-center gap-2">
                          <MapPin className="h-3.5 w-3.5 shrink-0 text-emerald-600" aria-hidden="true" />
                          {hospital.name}
                        </span>
                        <ArrowRight className="h-3.5 w-3.5 shrink-0 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
