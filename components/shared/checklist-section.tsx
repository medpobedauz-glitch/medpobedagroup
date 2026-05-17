import { CheckCircle2 } from "lucide-react";

import { FadeIn } from "@/components/shared/fade-in";
import { ImageCard } from "@/components/shared/image-card";
import { SectionHeading } from "@/components/shared/section-heading";
import { Card } from "@/components/ui/card";
import { getSiteImage, type SiteImageKey } from "@/lib/site-images";

type ChecklistSectionProps = {
  eyebrow: string;
  title: string;
  description: string;
  bullets: string[];
  asideTitle: string;
  asideDescription: string;
  reverse?: boolean;
  imageKey?: SiteImageKey;
};

export function ChecklistSection({
  eyebrow,
  title,
  description,
  bullets,
  asideTitle,
  asideDescription,
  reverse = false,
  imageKey,
}: ChecklistSectionProps) {
  const image = imageKey ? getSiteImage(imageKey) : null;

  return (
    <section className="px-6 py-20 lg:px-8">
      <div
        className={`mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_0.88fr] ${
          reverse ? "lg:[&>*:first-child]:order-2" : ""
        }`}
      >
        <FadeIn>
          <SectionHeading eyebrow={eyebrow} title={title} description={description} />
          <div className="mt-10 grid gap-4">
            {bullets.map((bullet) => (
              <div
                key={bullet}
                className="flex items-start gap-4 rounded-[1.5rem] border border-slate-200/80 bg-white px-5 py-4 shadow-[0_14px_34px_rgba(15,23,42,0.06)]"
              >
                <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-sky-700" />
                <p className="text-base leading-7 text-slate-600">{bullet}</p>
              </div>
            ))}
          </div>
        </FadeIn>
        <FadeIn delay={0.08}>
          <Card className="relative h-full overflow-hidden border-slate-200/80 p-8 shadow-glow">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.12),transparent_32%),linear-gradient(180deg,rgba(255,255,255,0.42),rgba(255,255,255,0.02))]" />
            <div className="relative">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-sky-700">
                Strategic Focus
              </p>
              <h3 className="mt-6 font-display text-3xl font-semibold text-slate-950 sm:text-4xl">
                {asideTitle}
              </h3>
              <p className="mt-5 max-w-lg text-base leading-8 text-slate-600">
                {asideDescription}
              </p>
              {image ? (
                <div className="mt-8">
                  <ImageCard
                    asset={image}
                    title={image.title}
                    showCaption={false}
                    aspectClassName="aspect-[16/10]"
                  />
                </div>
              ) : null}
              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                <div className="rounded-[1.5rem] border border-slate-200 bg-white p-5">
                  <p className="text-3xl font-semibold text-slate-950">Uzbekistan</p>
                  <p className="mt-2 text-sm text-slate-600">
                    Local operating base for stakeholder communication and coordination.
                  </p>
                </div>
                <div className="rounded-[1.5rem] border border-slate-200 bg-white p-5">
                  <p className="text-3xl font-semibold text-slate-950">India</p>
                  <p className="mt-2 text-sm text-slate-600">
                    Destination network for specialist access, treatment pathways, and hospital collaboration.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </FadeIn>
      </div>
    </section>
  );
}
