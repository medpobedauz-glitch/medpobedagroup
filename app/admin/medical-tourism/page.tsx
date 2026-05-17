import { InquiryStatus } from "@prisma/client";

import { requireAdminUser } from "@/lib/auth/session";
import { getAdminUsers, getMedicalTourismCrmData } from "@/lib/data/dashboard";
import { getHospitalsForAdmin } from "@/lib/data/partnerships";
import { AdminShell } from "@/components/admin/admin-shell";
import { AdminPagination } from "@/components/admin/admin-pagination";
import { MedicalTourismCrmTable } from "@/components/admin/medical-tourism-crm-table";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { startCase, toPositiveInt } from "@/lib/utils";
import { crmStatusOptions } from "@/lib/admin-config";

export const dynamic = "force-dynamic";

type AdminMedicalTourismPageProps = {
  searchParams?: {
    search?: string;
    status?: InquiryStatus;
    country?: string;
    urgency?: string;
    budget?: string;
    page?: string;
  };
};

export default async function AdminMedicalTourismPage({
  searchParams,
}: AdminMedicalTourismPageProps) {
  const user = await requireAdminUser();
  const page = toPositiveInt(searchParams?.page, 1);

  const [result, staff, hospitals] = await Promise.all([
    getMedicalTourismCrmData({
      search: searchParams?.search,
      status: searchParams?.status,
      country: searchParams?.country,
      urgency: searchParams?.urgency,
      budget: searchParams?.budget,
      page,
      pageSize: 8,
    }),
    getAdminUsers(),
    getHospitalsForAdmin(),
  ]);

  return (
    <AdminShell
      currentPath="/admin/medical-tourism"
      title="Medical Tourism CRM"
      description="Operate patient coordination with treatment categorisation, uploaded file review, urgency handling, hospital assignment, and follow-up workflow."
      user={user}
    >
      <Card className="border-white/10 p-6">
        <form className="grid gap-4 xl:grid-cols-[1.5fr_1fr_1fr_1fr_1fr_auto]">
          <Input
            name="search"
            defaultValue={searchParams?.search ?? ""}
            placeholder="Search patient, contact, email, or message"
          />
          <select
            name="status"
            defaultValue={searchParams?.status ?? ""}
            className="flex h-12 rounded-2xl border border-white/10 bg-white/90 px-4 py-3 text-sm text-slate-950"
          >
            <option value="">All statuses</option>
            {crmStatusOptions.map((status) => (
              <option key={status} value={status}>
                {startCase(status)}
              </option>
            ))}
          </select>
          <Input
            name="country"
            defaultValue={searchParams?.country ?? ""}
            placeholder="Country"
          />
          <select
            name="urgency"
            defaultValue={searchParams?.urgency ?? ""}
            className="flex h-12 rounded-2xl border border-white/10 bg-white/90 px-4 py-3 text-sm text-slate-950"
          >
            <option value="">All urgency levels</option>
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
            <option value="CRITICAL">Critical</option>
          </select>
          <Input
            name="budget"
            defaultValue={searchParams?.budget ?? ""}
            placeholder="Budget contains..."
          />
          <Button type="submit" variant="secondary" className="justify-center">
            Filter Cases
          </Button>
        </form>
      </Card>
      <MedicalTourismCrmTable
        items={result.items}
        staff={staff
          .filter((member) => member.isActive)
          .map((member) => ({ id: member.id, name: member.name }))}
        hospitals={hospitals.map((hospital) => ({ id: hospital.id, name: hospital.name }))}
      />
      <AdminPagination
        page={result.page}
        pageCount={result.pageCount}
        pathname="/admin/medical-tourism"
        searchParams={{
          search: searchParams?.search,
          status: searchParams?.status,
          country: searchParams?.country,
          urgency: searchParams?.urgency,
          budget: searchParams?.budget,
        }}
      />
    </AdminShell>
  );
}
