import type { ReactNode } from "react";

import { Card } from "@/components/ui/card";

type AdminStatCardProps = {
  label: string;
  value: string;
  description: string;
  icon?: ReactNode;
};

export function AdminStatCard({
  label,
  value,
  description,
  icon,
}: AdminStatCardProps) {
  return (
    <Card variant="dashboard" className="h-full border-white/10 p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-cyan-100/72">
            {label}
          </p>
          <p className="mt-4 font-display text-4xl font-semibold text-white">
            {value}
          </p>
          <p className="mt-4 text-sm leading-7 text-slate-300">{description}</p>
        </div>
        {icon ? (
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-300/16 bg-cyan-300/10 text-cyan-100">
            {icon}
          </div>
        ) : null}
      </div>
    </Card>
  );
}
