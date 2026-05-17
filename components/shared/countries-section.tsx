import { FadeIn } from "@/components/shared/fade-in";
import { SectionHeading } from "@/components/shared/section-heading";
import { Card } from "@/components/ui/card";

type CountryItem = {
  name: string;
  label: string;
  description: string;
};

type CountriesSectionProps = {
  eyebrow: string;
  title: string;
  description: string;
  items: CountryItem[];
};

export function CountriesSection({
  eyebrow,
  title,
  description,
  items,
}: CountriesSectionProps) {
  return (
    <section className="px-6 py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <FadeIn>
          <SectionHeading
            eyebrow={eyebrow}
            title={title}
            description={description}
            align="center"
          />
        </FadeIn>
        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item, index) => (
            <FadeIn key={item.name} delay={index * 0.06}>
              <Card className="h-full border-white/12 p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.26em] text-cyan-100/70">
                  {item.label}
                </p>
                <h3 className="mt-4 font-display text-3xl font-semibold text-white">
                  {item.name}
                </h3>
                <p className="mt-4 text-sm leading-7 text-slate-300">
                  {item.description}
                </p>
              </Card>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
