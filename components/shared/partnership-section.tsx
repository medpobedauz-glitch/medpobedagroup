import type { ProcessStep } from "@/lib/content";
import { FadeIn } from "@/components/shared/fade-in";
import { SectionHeading } from "@/components/shared/section-heading";
import { Card } from "@/components/ui/card";

type PartnershipSectionProps = {
  eyebrow: string;
  title: string;
  description: string;
  steps: ProcessStep[];
  highlightTitle: string;
  highlightDescription: string;
};

export function PartnershipSection({
  eyebrow,
  title,
  description,
  steps,
  highlightTitle,
  highlightDescription,
}: PartnershipSectionProps) {
  return (
    <section className="px-6 py-20 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <FadeIn>
          <SectionHeading eyebrow={eyebrow} title={title} description={description} />
          <Card className="mt-8 border-white/12 p-7">
            <p className="text-sm font-semibold uppercase tracking-[0.26em] text-cyan-100/70">
              Strategic Perspective
            </p>
            <h3 className="mt-4 font-display text-3xl font-semibold text-white">
              {highlightTitle}
            </h3>
            <p className="mt-4 text-base leading-8 text-slate-300">
              {highlightDescription}
            </p>
          </Card>
        </FadeIn>
        <div className="relative">
          <div className="absolute bottom-0 left-6 top-0 hidden w-px bg-gradient-to-b from-cyan-300/0 via-cyan-300/30 to-cyan-300/0 lg:block" />
          <div className="grid gap-5">
            {steps.map((step, index) => (
              <FadeIn key={step.step} delay={index * 0.05}>
                <Card className="border-white/10 bg-white/8 p-6 lg:ml-14">
                  <div className="flex flex-col gap-5 lg:flex-row lg:items-start">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-300/10 font-display text-lg font-semibold text-cyan-100 lg:absolute lg:left-0">
                      {step.step}
                    </div>
                    <div className="lg:pl-2">
                      <h3 className="font-display text-2xl font-semibold text-white">
                        {step.title}
                      </h3>
                      <p className="mt-3 text-base leading-8 text-slate-200">
                        {step.description}
                      </p>
                      <p className="mt-3 text-sm leading-7 text-slate-400">
                        {step.detail}
                      </p>
                    </div>
                  </div>
                </Card>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

