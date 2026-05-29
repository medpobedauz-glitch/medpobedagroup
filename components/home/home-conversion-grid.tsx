import Link from "next/link";
import { ArrowRight, Building2, Headphones, HeartPulse } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const routes = [
  {
    title: "General Coordination Desk",
    description:
      "Use this when a hospital team, healthcare operator, or institutional stakeholder needs a serious conversation path.",
    href: "/contact",
    icon: Headphones,
  },
  {
    title: "Medical Case Intake",
    description:
      "Use this when the request includes diagnosis detail, specialist matching, or travel-readiness discussion.",
    href: "/international-patient-care",
    icon: HeartPulse,
  },
  {
    title: "Hospital Partnership Track",
    description:
      "Use this when the objective is referrals, desk collaboration, specialist coordination, or long-term institutional alignment.",
    href: "/hospital-partnerships",
    icon: Building2,
  },
];

export function HomeConversionGrid() {
  return (
    <section className="section-shell-compact">
      <div className="container-wide">
        <div className="section-frame-accent px-6 py-8 sm:px-8 lg:px-10 lg:py-10">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.55),transparent_20%),radial-gradient(circle_at_bottom_right,rgba(125,211,252,0.22),transparent_24%)]" />
          <div className="relative">
            <div className="mx-auto max-w-3xl text-center">
              <p className="section-kicker">Conversion Optimization</p>
              <h2 className="mt-5 heading-section">
                Inquiry generation designed like a premium healthcare funnel
              </h2>
              <p className="mt-5 body-lg">
                Each path is intentionally framed around the stakeholder’s real objective so
                inquiry volume improves without reducing trust quality.
              </p>
            </div>
            <div className="mt-10 grid gap-5 xl:grid-cols-3">
              {routes.map((item, index) => {
                const Icon = item.icon;

                return (
                  <Card
                    key={item.title}
                    variant={index === 1 ? "accent" : "panel"}
                    className="flex h-full flex-col p-6"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-sky-100 bg-sky-50 text-sky-700">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-5 font-display text-2xl font-semibold text-slate-950">
                      {item.title}
                    </h3>
                    <p className="mt-4 flex-1 text-sm leading-7 text-slate-600">
                      {item.description}
                    </p>
                    <Button asChild variant={index === 1 ? "hero" : "surface"} size="xl" className="mt-6">
                      <Link href={item.href}>
                        Open Route
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
