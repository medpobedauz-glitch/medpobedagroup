import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Building2, MapPin } from "lucide-react";

import type { Hospital } from "@/lib/data/hospitals";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function HospitalCard({
  hospital,
  sourceDiseaseSlug,
}: {
  hospital: Hospital;
  sourceDiseaseSlug?: string;
}) {
  const Heading = sourceDiseaseSlug ? "h3" : "h2";

  return (
    <Card className="flex h-full flex-col overflow-hidden rounded-[1.85rem] border border-slate-200 shadow-sm">
      <div className="relative flex h-36 items-center justify-center bg-gradient-to-br from-blue-50 to-sky-50 p-5">
        {hospital.logo ? (
          <Image
            src={hospital.logo}
            alt={`${hospital.name} logo`}
            width={150}
            height={84}
            className="max-h-20 w-auto object-contain"
            loading="lazy"
          />
        ) : (
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white">
            <Building2 className="h-8 w-8" aria-hidden="true" />
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <Heading className="font-display text-xl font-semibold text-slate-950">{hospital.name}</Heading>
        <p className="mt-2 flex items-center gap-1.5 text-sm text-slate-500">
          <MapPin className="h-4 w-4 text-emerald-600" aria-hidden="true" />
          {hospital.city}, {hospital.state}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {hospital.specialties.slice(0, 3).map((specialty) => (
            <span key={specialty} className="glass-badge">{specialty}</span>
          ))}
        </div>
        <div className="mt-auto pt-6">
          <Button asChild variant="primary" className="w-full justify-center">
            <Link
              href={`/hospitals/${hospital.slug}`}
              aria-label={`View details for ${hospital.name}`}
              data-analytics-content-type={sourceDiseaseSlug ? "disease" : undefined}
              data-analytics-disease={sourceDiseaseSlug}
              data-analytics-event={sourceDiseaseSlug ? "hospital_referral" : undefined}
              data-analytics-target={sourceDiseaseSlug ? hospital.slug : undefined}
            >
              View Details
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </div>
    </Card>
  );
}
