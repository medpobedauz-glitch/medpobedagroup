import { UserRole } from "@prisma/client";

import { requireAdminUser } from "@/lib/auth/session";
import { getPatientCaseWorkspace } from "@/lib/data/operations";
import { AdminShell } from "@/components/admin/admin-shell";
import { PatientCaseBoard } from "@/components/admin/patient-case-board";

export const dynamic = "force-dynamic";

export default async function AdminCasesPage() {
  const user = await requireAdminUser([
    UserRole.SUPER_ADMIN,
    UserRole.ADMIN,
    UserRole.STAFF,
  ]);
  const workspace = await getPatientCaseWorkspace();

  return (
    <AdminShell
      currentPath="/admin/cases"
      title="Patient Case Management"
      description="Manage case IDs, treatment journey stages, hospital assignment, coordinator assignment, document timelines, communication logs, and next-step execution."
      user={user}
    >
      <PatientCaseBoard {...workspace} />
    </AdminShell>
  );
}
