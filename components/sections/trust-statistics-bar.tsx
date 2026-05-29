"use client";

import { motion } from "framer-motion";
import { Users, Building2, Globe2, Headphones } from "lucide-react";

import { easeOutExpo } from "@/lib/motion";
import { cn } from "@/lib/utils";

type TrustStat = {
  value: string;
  label: string;
  description: string;
};

const statIcons = [Users, Building2, Globe2, Headphones] as const;

const statColors = [
  "from-blue-600 to-blue-500",
  "from-blue-700 to-cyan-500",
  "from-cyan-500 to-sky-400",
  "from-blue-800 to-blue-600",
] as const;

type TrustStatisticsBarProps = {
  stats: TrustStat[];
};

export function TrustStatisticsBar({ stats }: TrustStatisticsBarProps) {
  return (
    <section className="relative py-6 sm:py-8">
      <div className="container-wide">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
          {stats.map((stat, index) => {
            const Icon = statIcons[index] ?? Users;

            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.08,
                  ease: easeOutExpo,
                }}
                className={cn(
                  "group relative overflow-hidden rounded-[1.5rem] border border-[#D6E8FF] bg-white/90 p-5 sm:p-6",
                  "shadow-[0_18px_48px_rgba(7,27,58,0.06)] backdrop-blur-xl",
                  "transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_64px_rgba(29,78,216,0.12)]"
                )}
              >
                <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gradient-to-br from-blue-50 to-sky-50 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div
                  className={cn(
                    "flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-[0_12px_32px_rgba(29,78,216,0.18)]",
                    statColors[index]
                  )}
                >
                  <Icon className="h-5 w-5" />
                </div>

                <p className="mt-4 font-display text-2xl font-bold tracking-[-0.03em] text-[#0B1F4D] sm:text-3xl">
                  {stat.value}
                </p>

                <p className="mt-1 text-sm font-semibold text-[#1D4ED8]">
                  {stat.label}
                </p>

                <p className="mt-2 text-xs leading-6 text-slate-500 sm:text-sm sm:leading-7">
                  {stat.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}