"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView } from "framer-motion";

import type { StatItem } from "@/lib/content";

type StatsSectionProps = {
  eyebrow: string;
  title: string;
  description: string;
  items: StatItem[];
};

function Counter({
  value,
  suffix = "",
}: {
  value: number;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) {
      return;
    }

    const controls = animate(0, value, {
      duration: 1.2,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => setCount(Math.round(latest)),
    });

    return () => controls.stop();
  }, [inView, value]);

  return (
    <span ref={ref} className="font-display text-5xl font-semibold text-white sm:text-6xl">
      {count}
      {suffix}
    </span>
  );
}

export function StatsSection({
  eyebrow,
  title,
  description,
  items,
}: StatsSectionProps) {
  return (
    <section className="relative z-10 -mt-16 px-6 pb-10 lg:px-8">
      <div className="mx-auto max-w-7xl rounded-[2.2rem] border border-white/12 bg-[linear-gradient(180deg,rgba(255,255,255,0.14),rgba(255,255,255,0.05))] p-7 shadow-premium backdrop-blur-2xl lg:p-10">
        <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-100/70">
              {eyebrow}
            </p>
            <h2 className="mt-5 font-display text-3xl font-semibold text-white sm:text-4xl">
              {title}
            </h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-slate-300">
              {description}
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {items.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ delay: index * 0.08, duration: 0.5 }}
                className="rounded-[1.7rem] border border-white/10 bg-slate-950/34 p-5"
              >
                <Counter value={item.value} suffix={item.suffix} />
                <p className="mt-3 text-lg font-semibold text-white">{item.label}</p>
                <p className="mt-2 text-sm leading-7 text-slate-300">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

