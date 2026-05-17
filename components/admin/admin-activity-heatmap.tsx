import { Card } from "@/components/ui/card";

type HeatmapItem = {
  date: string;
  label: string;
  weekday: string;
  total: number;
};

function getTone(total: number, max: number) {
  if (total === 0) {
    return "bg-white/6";
  }

  const ratio = total / Math.max(max, 1);
  if (ratio >= 0.75) return "bg-cyan-300";
  if (ratio >= 0.5) return "bg-sky-400";
  if (ratio >= 0.25) return "bg-blue-500";
  return "bg-blue-900";
}

export function AdminActivityHeatmap({ items }: { items: HeatmapItem[] }) {
  const max = Math.max(...items.map((item) => item.total), 1);

  return (
    <Card className="border-white/10 p-6">
      <p className="text-sm font-semibold uppercase tracking-[0.26em] text-cyan-100/70">
        Activity Heatmap
      </p>
      <h2 className="mt-4 font-display text-2xl font-semibold text-white">
        Six-week inquiry rhythm
      </h2>
      <div className="mt-6 grid grid-cols-7 gap-2">
        {items.map((item) => (
          <div
            key={item.date}
            title={`${item.label} • ${item.total} inquiries`}
            className="group rounded-2xl border border-white/8 bg-slate-950/28 p-2"
          >
            <div
              className={`h-10 rounded-xl transition ${getTone(item.total, max)}`}
            />
            <p className="mt-2 text-[10px] uppercase tracking-[0.18em] text-slate-500">
              {item.weekday}
            </p>
            <p className="mt-1 text-xs text-slate-300">{item.total}</p>
          </div>
        ))}
      </div>
      <div className="mt-5 flex flex-wrap items-center gap-4 text-xs uppercase tracking-[0.18em] text-slate-500">
        <span>Lower</span>
        <span className="h-2.5 w-2.5 rounded-full bg-white/8" />
        <span className="h-2.5 w-2.5 rounded-full bg-blue-900" />
        <span className="h-2.5 w-2.5 rounded-full bg-blue-500" />
        <span className="h-2.5 w-2.5 rounded-full bg-sky-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-cyan-300" />
        <span>Higher</span>
      </div>
    </Card>
  );
}
