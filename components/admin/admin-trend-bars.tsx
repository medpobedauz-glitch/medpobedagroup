type AdminTrendBarsProps = {
  items: Array<{
    label: string;
    total: number;
  }>;
};

export function AdminTrendBars({ items }: AdminTrendBarsProps) {
  const max = Math.max(...items.map((item) => item.total), 1);

  return (
    <div className="grid gap-4">
      {items.map((item) => (
        <div key={item.label}>
          <div className="mb-2 flex items-center justify-between text-sm text-slate-300">
            <span>{item.label}</span>
            <span>{item.total}</span>
          </div>
          <div className="h-3 rounded-full bg-white/8">
            <div
              className="h-3 rounded-full bg-[linear-gradient(90deg,#22d3ee,#1d4ed8)]"
              style={{
                width: `${Math.max((item.total / max) * 100, item.total > 0 ? 12 : 0)}%`,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

