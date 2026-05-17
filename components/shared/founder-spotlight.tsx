import { leadershipHighlights } from "@/lib/content";
import { FadeIn } from "@/components/shared/fade-in";
import { ImageCard } from "@/components/shared/image-card";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { getSiteImage } from "@/lib/site-images";

export function FounderSpotlight() {
  const founderImage = getSiteImage("aboutFounderVision");

  return (
    <section className="px-6 py-20 lg:px-8">
      <FadeIn className="mx-auto max-w-7xl">
        <Card className="overflow-hidden border-slate-200/80 p-8 shadow-premium lg:p-12">
          <div className="grid gap-10 lg:grid-cols-[0.62fr_1fr] lg:items-center">
            <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_20px_52px_rgba(15,23,42,0.08)]">
              <Badge variant="solid">Leadership Vision</Badge>
              <div className="mt-8 flex h-28 w-28 items-center justify-center rounded-full border border-sky-100 bg-sky-50 text-3xl font-semibold text-sky-800">
                DR
              </div>
              <p className="mt-6 font-display text-3xl font-semibold text-slate-950">Dr. Ravi</p>
              <p className="mt-2 text-base text-sky-700">
                Founder & Director, MedPobeda Group
              </p>
              <div className="mt-8">
                <ImageCard
                  asset={founderImage}
                  showCaption={false}
                  aspectClassName="aspect-[4/5]"
                />
              </div>
            </div>
            <div>
              <h2 className="font-display text-3xl font-semibold text-slate-950 sm:text-4xl">
                Healthcare entrepreneur and international medical collaboration
                facilitator based in Tashkent, Uzbekistan.
              </h2>
              <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600">
                MedPobeda Group is positioned to bring together hospitals,
                doctors, patients, and international medical institutions
                through practical coordination, local presence, and
                relationship-led execution.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {leadershipHighlights.map((item) => (
                  <div
                    key={item}
                    className="rounded-[1.4rem] border border-slate-200 bg-white px-5 py-4 text-sm leading-7 text-slate-600 shadow-[0_12px_28px_rgba(15,23,42,0.05)]"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </FadeIn>
    </section>
  );
}
