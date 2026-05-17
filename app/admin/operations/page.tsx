import { UserRole } from "@prisma/client";

import { requireAdminUser } from "@/lib/auth/session";
import { getOperationsWorkspace } from "@/lib/data/operations";
import { AdminShell } from "@/components/admin/admin-shell";
import { OperationsWorkspace } from "@/components/admin/operations-workspace";

export const dynamic = "force-dynamic";

export default async function AdminOperationsPage() {
  const user = await requireAdminUser([
    UserRole.SUPER_ADMIN,
    UserRole.ADMIN,
    UserRole.STAFF,
  ]);
  const workspace = await getOperationsWorkspace(user);

  return (
    <AdminShell
      currentPath="/admin/operations"
      title="International Operations"
      description="Manage country operations, regional coordinators, internal tasks, notification queues, and AI-ready routing infrastructure for the MedPobeda operations layer."
      user={user}
    >
      <OperationsWorkspace {...workspace} />
    </AdminShell>
  );
}
