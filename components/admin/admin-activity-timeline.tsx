import { RolePill } from "@/components/admin/status-pill";
import { Card } from "@/components/ui/card";
import { startCase } from "@/lib/utils";

type ActivityItem = {
  id: string;
  action: string;
  description: string;
  createdAt: Date;
  actorName: string;
  actorRole: import("@prisma/client").UserRole;
  entityType?: string | null;
};

export function AdminActivityTimeline({ items }: { items: ActivityItem[] }) {
  return (
    <Card className="border-white/10 p-6">
      <p className="text-sm font-semibold uppercase tracking-[0.26em] text-cyan-100/70">
        Activity Timeline
      </p>
      <div className="mt-6 grid gap-4">
        {items.length ? (
          items.map((item) => (
            <div
              key={item.id}
              className="relative rounded-[1.4rem] border border-white/8 bg-white/6 px-5 py-4"
            >
              <div className="flex flex-wrap items-center gap-3">
                <RolePill role={item.actorRole} />
                <span className="text-xs uppercase tracking-[0.22em] text-slate-400">
                  {startCase(item.action)}
                </span>
                {item.entityType ? (
                  <span className="text-xs uppercase tracking-[0.22em] text-slate-500">
                    {startCase(item.entityType)}
                  </span>
                ) : null}
              </div>
              <p className="mt-4 text-base font-semibold text-white">
                {item.actorName}
              </p>
              <p className="mt-2 text-sm leading-7 text-slate-300">
                {item.description}
              </p>
              <p className="mt-3 text-xs uppercase tracking-[0.22em] text-slate-500">
                {item.createdAt.toLocaleString()}
              </p>
            </div>
          ))
        ) : (
          <p className="text-sm text-slate-400">No activity has been logged yet.</p>
        )}
      </div>
    </Card>
  );
}
