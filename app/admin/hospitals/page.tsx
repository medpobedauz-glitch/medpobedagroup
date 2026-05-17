import { UserRole } from "@prisma/client";

import { requireAdminUser } from "@/lib/auth/session";
import { getHospitalsForAdmin } from "@/lib/data/partnerships";
import { AdminShell } from "@/components/admin/admin-shell";
import { HospitalRegistryBoard } from "@/components/admin/hospital-registry-board";

export const dynamic = "force-dynamic";

export default async function AdminHospitalsPage() {
  const user = await requireAdminUser([UserRole.SUPER_ADMIN, UserRole.ADMIN]);
  const hospitals = await getHospitalsForAdmin();

  return (
    <AdminShell
      currentPath="/admin/hospitals"
      title="Hospital Registry"
      description="Manage hospital profiles, international desk contacts, country segmentation, collaboration readiness, and hospital-level operational visibility."
      user={user}
    >
      <HospitalRegistryBoard hospitals={hospitals} />
    </AdminShell>
  );
}
