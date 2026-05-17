import { Quote } from "lucide-react";

import { FadeIn } from "@/components/shared/fade-in";
import { SectionHeading } from "@/components/shared/section-heading";
import { Card } from "@/components/ui/card";

type PerspectiveItem = {
  quote: string;
  role: string;
  context: string;
};

type StakeholderPerspectivesProps = {
  eyebrow: string;
  title: string;
  description: string;
  items: PerspectiveItem[];
};

export function StakeholderPerspectives({
  eyebrow,
  title,
  description,
  items,
}: StakeholderPerspectivesProps) {
  return (
    <section className="section-shell-compact">
      <div className="container-wide">
        <div className="section-frame px-6 py-8 sm:px-8 lg:px-10 lg:py-10">
          <div className="relative">
            <FadeIn>
              <SectionHeading
                eyebrow={eyebrow}
                title={title}
                description={description}
                align="center"
              />
            </FadeIn>
            <div className="mt-12 grid gap-5 lg:grid-cols-3">
              {items.map((item, index) => (
                <FadeIn key={item.role} delay={index * 0.06}>
                  <Card className="h-full border-slate-200/80 p-7">
                    <Quote className="h-8 w-8 text-sky-700" />
                    <p className="mt-6 text-lg leading-8 text-slate-700">{item.quote}</p>
                    <div className="mt-8 border-t border-slate-200 pt-5">
                      <p className="text-sm font-semibold text-slate-950">{item.role}</p>
                      <p className="mt-1 text-sm text-slate-500">{item.context}</p>
                    </div>
                  </Card>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
