import type { FeatureItem } from "@/lib/content";
import { AnimatedCard } from "@/components/shared/animated-card";
import { FadeIn } from "@/components/shared/fade-in";
import { SectionHeading } from "@/components/shared/section-heading";

type TrustSectionProps = {
  eyebrow: string;
  title: string;
  description: string;
  items: FeatureItem[];
  pillars?: string[];
};

export function TrustSection({
  eyebrow,
  title,
  description,
  items,
  pillars = [],
}: TrustSectionProps) {
  return (
    <section className="section-shell-compact">
      <div className="container-wide">
        <div className="section-frame-soft px-6 py-8 sm:px-8 lg:px-10 lg:py-10">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.12),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(37,99,235,0.08),transparent_28%)]" />

          <div className="relative">
            <FadeIn>
              <SectionHeading eyebrow={eyebrow} title={title} description={description} />
            </FadeIn>
            {pillars.length ? (
              <FadeIn delay={0.06}>
                <div className="mt-8 flex flex-wrap gap-3">
                  {pillars.map((pillar) => (
                    <span
                      key={pillar}
                      className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-[0_12px_28px_rgba(15,23,42,0.06)]"
                    >
                      {pillar}
                    </span>
                  ))}
                </div>
              </FadeIn>
            ) : null}
            <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {items.map((item, index) => (
                <FadeIn key={item.title} delay={index * 0.05}>
                  <AnimatedCard
                    title={item.title}
                    description={item.description}
                    icon={item.icon}
                    href={item.href}
                    eyebrow={index < 2 ? "Core Lane" : undefined}
                  />
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
