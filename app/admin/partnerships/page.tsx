import { UserRole } from "@prisma/client";

import { requireAdminUser } from "@/lib/auth/session";
import { getPartnershipCrmData } from "@/lib/data/partnerships";
import { AdminShell } from "@/components/admin/admin-shell";
import { PartnershipCrmBoard } from "@/components/admin/partnership-crm-board";

export const dynamic = "force-dynamic";

export default async function AdminPartnershipsPage() {
  const user = await requireAdminUser([UserRole.SUPER_ADMIN, UserRole.ADMIN]);
  const partnerships = await getPartnershipCrmData();

  return (
    <AdminShell
      currentPath="/admin/partnerships"
      title="Hospital Partnership CRM"
      description="Track hospital partners, collaboration stages, meeting history, notes, contact persons, and linked partnership leads."
      user={user}
    >
      <PartnershipCrmBoard partnerships={partnerships} />
    </AdminShell>
  );
}
