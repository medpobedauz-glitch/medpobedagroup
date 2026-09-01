import Image from "next/image";
import Link from "next/link";
import { Activity, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { DiseaseDirectoryEntry } from "@/lib/data/diseases";

export function DiseaseCard({ disease }: { disease: DiseaseDirectoryEntry }) {
  return (
    <Card className="flex h-full flex-col overflow-hidden rounded-[1.85rem] border border-slate-200 shadow-sm">
      <div className="relative aspect-[16/9] overflow-hidden bg-gradient-to-br from-blue-50 to-sky-50">
        <Image
          src={disease.heroImage}
          alt={`${disease.name} patient education`}
          fill
          loading="lazy"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition duration-700 hover:scale-[1.03]"
        />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-sky-700">
          <Activity className="h-4 w-4" aria-hidden="true" />
          {disease.specialty}
        </p>
        <h3 className="mt-3 font-display text-2xl font-semibold text-slate-950">
          {disease.name}
        </h3>
        <p className="mt-3 text-sm leading-7 text-slate-600">
          {disease.shortDescription}
        </p>

        {disease.symptoms.length > 0 ? (
          <div className="mt-4" aria-label={`Common symptoms of ${disease.name}`}>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
              Common symptoms
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {disease.symptoms.slice(0, 3).map((symptom) => (
                <span key={symptom} className="glass-badge">
                  {symptom}
                </span>
              ))}
            </div>
          </div>
        ) : null}

        <div className="mt-auto pt-6">
          <Button asChild variant="primary" className="w-full justify-center">
            <Link
              href={`/diseases/${disease.slug}`}
              aria-label={`Learn about ${disease.name}`}
            >
              View Disease
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </div>
    </Card>
  );
}
