import { Card } from "@/components/ui/card";

type PagePerformanceItem = {
  path: string;
  pageViews: number;
  formSuccesses: number;
  leadCount: number;
  conversionRate: number | null;
};

export function AdminPagePerformance({
  items,
  trafficAnalyticsStatus,
}: {
  items: PagePerformanceItem[];
  trafficAnalyticsStatus: "live" | "placeholder";
}) {
  return (
    <Card variant="dashboard" className="border-white/10 p-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.26em] text-cyan-100/70">
            Top Performing Pages
          </p>
          <h2 className="mt-4 font-display text-2xl font-semibold text-white">
            Conversion-facing page performance
          </h2>
        </div>
        <span className="rounded-full border border-white/10 bg-white/8 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-300">
          {trafficAnalyticsStatus === "live" ? "Live traffic" : "CRM-led placeholder"}
        </span>
      </div>
      <div className="mt-6 grid gap-3">
        {items.length ? (
          items.map((item) => (
            <div
              key={item.path}
              className="grid gap-3 rounded-[1.3rem] border border-white/8 bg-slate-950/28 px-4 py-4 lg:grid-cols-[1.2fr_0.8fr]"
            >
              <div>
                <p className="text-sm font-semibold text-white">{item.path}</p>
                <p className="mt-2 text-sm text-slate-300">
                  Leads: {item.leadCount} • Page views: {item.pageViews} • Successes:{" "}
                  {item.formSuccesses}
                </p>
              </div>
              <div className="text-left lg:text-right">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                  Conversion rate
                </p>
                <p className="mt-2 text-lg font-semibold text-cyan-100">
                  {item.conversionRate == null ? "Awaiting traffic" : `${item.conversionRate}%`}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-slate-400">
            No page performance data is available yet.
          </p>
        )}
      </div>
    </Card>
  );
}
