import { InquiryStatus } from "@prisma/client";

import { crmStatusOptions } from "@/lib/admin-config";
import { requireAdminUser } from "@/lib/auth/session";
import { getAdminUsers, getStudentMobilityCrmData } from "@/lib/data/dashboard";
import { startCase, toPositiveInt } from "@/lib/utils";
import { AdminShell } from "@/components/admin/admin-shell";
import { AdminPagination } from "@/components/admin/admin-pagination";
import { StudentMobilityTable } from "@/components/admin/student-mobility-table";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export const dynamic = "force-dynamic";

type AdminStudentMobilityPageProps = {
  searchParams?: {
    search?: string;
    status?: InquiryStatus;
    country?: string;
    page?: string;
  };
};

export default async function AdminStudentMobilityPage({
  searchParams,
}: AdminStudentMobilityPageProps) {
  const user = await requireAdminUser();
  const page = toPositiveInt(searchParams?.page, 1);

  const [result, staff] = await Promise.all([
    getStudentMobilityCrmData({
      search: searchParams?.search,
      status: searchParams?.status,
      country: searchParams?.country,
      page,
      pageSize: 8,
    }),
    getAdminUsers(),
  ]);

  return (
    <AdminShell
      currentPath="/admin/student-mobility"
      title="Student Mobility CRM"
      description="Track academic mobility enquiries with assignment, pipeline workflow, institutional context, and internal note management."
      user={user}
    >
      <Card className="border-white/10 p-6">
        <form className="grid gap-4 xl:grid-cols-[1.6fr_1fr_1fr_auto]">
          <Input
            name="search"
            defaultValue={searchParams?.search ?? ""}
            placeholder="Search name, organization, email, or message"
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
          <Button type="submit" variant="secondary" className="justify-center">
            Apply Filters
          </Button>
        </form>
      </Card>
      <StudentMobilityTable
        items={result.items}
        staff={staff
          .filter((member) => member.isActive)
          .map((member) => ({ id: member.id, name: member.name }))}
      />
      <AdminPagination
        page={result.page}
        pageCount={result.pageCount}
        pathname="/admin/student-mobility"
        searchParams={{
          search: searchParams?.search,
          status: searchParams?.status,
          country: searchParams?.country,
        }}
      />
    </AdminShell>
  );
}
