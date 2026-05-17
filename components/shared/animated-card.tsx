import Link from "next/link";
import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";

import { HoverPanel } from "@/components/shared/hover-panel";
import { cn } from "@/lib/utils";

type AnimatedCardProps = {
  title: string;
  description: string;
  icon: LucideIcon;
  eyebrow?: string;
  href?: string;
  className?: string;
  children?: ReactNode;
};

export function AnimatedCard({
  title,
  description,
  icon: Icon,
  eyebrow,
  href,
  className,
  children,
}: AnimatedCardProps) {
  const cardBody = (
    <div
      className={cn(
        "group relative h-full overflow-hidden rounded-[2rem] border border-slate-200/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.99),rgba(246,250,255,0.96))] p-7 shadow-soft backdrop-blur-2xl transition duration-300",
        className,
      )}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.12),transparent_28%),linear-gradient(180deg,transparent,rgba(191,219,254,0.12))]" />
      <div className="relative">
        <div className="flex items-start justify-between gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-sky-100 bg-sky-50 text-sky-700">
            <Icon className="h-6 w-6" />
          </div>
          {eyebrow ? (
            <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-sky-700">
              {eyebrow}
            </span>
          ) : null}
        </div>
        <h3 className="mt-8 font-display text-2xl font-semibold text-slate-950">
          {title}
        </h3>
        <p className="mt-4 text-base leading-8 text-slate-600">{description}</p>
        {children}
        {href ? (
          <div className="mt-8 flex items-center gap-2 text-sm font-semibold text-sky-700">
            <span>Explore</span>
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </div>
        ) : null}
      </div>
    </div>
  );

  return href ? (
    <HoverPanel className="h-full">
      <Link href={href} className="block h-full">
        {cardBody}
      </Link>
    </HoverPanel>
  ) : (
    <HoverPanel className="h-full">{cardBody}</HoverPanel>
  );
}
