import type { FeatureItem } from "@/lib/content";
import { AnimatedCard } from "@/components/shared/animated-card";
import { FadeIn } from "@/components/shared/fade-in";
import { SectionHeading } from "@/components/shared/section-heading";

type FeatureGridSectionProps = {
  eyebrow?: string;
  title: string;
  description: string;
  items: FeatureItem[];
  align?: "left" | "center";
  columns?: 2 | 3;
};

export function FeatureGridSection({
  eyebrow,
  title,
  description,
  items,
  align = "left",
  columns = 3,
}: FeatureGridSectionProps) {
  return (
    <section className="section-shell-compact">
      <div className="container-wide">
        <div className="section-frame-soft px-6 py-8 sm:px-8 lg:px-10 lg:py-10">
          <div className="relative">
            <FadeIn>
              <SectionHeading
                eyebrow={eyebrow}
                title={title}
                description={description}
                align={align}
              />
            </FadeIn>
            <div
              className={`mt-12 grid gap-5 ${
                columns === 2 ? "lg:grid-cols-2" : "md:grid-cols-2 xl:grid-cols-3"
              }`}
            >
              {items.map((item, index) => {
                return (
                  <FadeIn key={item.title} delay={index * 0.05}>
                    <AnimatedCard
                      title={item.title}
                      description={item.description}
                      icon={item.icon}
                      href={item.href}
                      className="h-full"
                    />
                  </FadeIn>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
