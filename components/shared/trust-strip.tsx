import { ShieldCheck } from "lucide-react";

import { trustIndicators } from "@/lib/content";
import { FadeIn } from "@/components/shared/fade-in";

export function TrustStrip() {
  return (
    <section className="relative z-10 -mt-10 px-6 lg:px-8">
      <FadeIn className="mx-auto max-w-7xl">
        <div className="grid gap-3 rounded-[2rem] border border-white/12 bg-white/8 p-5 shadow-soft backdrop-blur-2xl md:grid-cols-2 xl:grid-cols-4">
          {trustIndicators.map((item) => (
            <div
              key={item}
              className="flex items-center gap-3 rounded-[1.4rem] border border-white/8 bg-slate-950/28 px-4 py-4"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-300/12 text-cyan-100">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <p className="text-sm font-medium text-slate-100">{item}</p>
            </div>
          ))}
        </div>
      </FadeIn>
    </section>
  );
}

