import { Activity, CheckCircle2, Clock3, UserX } from "lucide-react";

import { requireAdminUser } from "@/lib/auth/session";
import { getAdminUsers } from "@/lib/data/dashboard";
import { getLeadPipelineBoardData } from "@/lib/data/pipeline";
import { AdminShell } from "@/components/admin/admin-shell";
import { AdminStatCard } from "@/components/admin/admin-stat-card";
import { LeadPipelineBoard } from "@/components/admin/lead-pipeline-board";

export const dynamic = "force-dynamic";

export default async function AdminPipelinePage() {
  const user = await requireAdminUser();
  const [pipeline, staff] = await Promise.all([
    getLeadPipelineBoardData(),
    getAdminUsers(),
  ]);

  return (
    <AdminShell
      currentPath="/admin/pipeline"
      title="Lead Pipeline"
      description="Manage inquiry progression in a Kanban-style workflow with drag-and-drop stage movement, staff assignment, reminder scheduling, and conversion-focused CRM tracking."
      user={user}
    >
      <div className="grid gap-5 xl:grid-cols-4">
        <AdminStatCard
          label="Pipeline Leads"
          value={String(pipeline.stats.total)}
          description="All leads currently mapped across the active delivery pipeline."
          icon={<Activity className="h-6 w-6" />}
        />
        <AdminStatCard
          label="Converted"
          value={String(pipeline.stats.converted)}
          description="Leads that have reached the converted stage."
          icon={<CheckCircle2 className="h-6 w-6" />}
        />
        <AdminStatCard
          label="Due Today"
          value={String(pipeline.stats.dueToday)}
          description="Reminder tasks that need follow-up today."
          icon={<Clock3 className="h-6 w-6" />}
        />
        <AdminStatCard
          label="Unassigned"
          value={String(pipeline.stats.unassigned)}
          description="Pipeline cards that still need a staff owner."
          icon={<UserX className="h-6 w-6" />}
        />
      </div>
      <LeadPipelineBoard
        columns={pipeline.columns}
        reminders={pipeline.reminders}
        staff={staff.filter((member) => member.isActive).map((member) => ({
          id: member.id,
          name: member.name,
        }))}
      />
    </AdminShell>
  );
}
