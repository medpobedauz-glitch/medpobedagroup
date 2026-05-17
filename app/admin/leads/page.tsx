import { InquiryStatus, InquiryType, LeadPriority } from "@prisma/client";
import Link from "next/link";

import { requireAdminUser } from "@/lib/auth/session";
import { crmStatusOptions, leadPriorityOptions } from "@/lib/admin-config";
import { getAdminUsers, getUnifiedInquiries } from "@/lib/data/dashboard";
import { getHospitalsForAdmin } from "@/lib/data/partnerships";
import { AdminShell } from "@/components/admin/admin-shell";
import { AdminPagination } from "@/components/admin/admin-pagination";
import { LeadManagementTable } from "@/components/admin/lead-management-table";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { startCase, toPositiveInt } from "@/lib/utils";

export const dynamic = "force-dynamic";

type LeadsPageProps = {
  searchParams?: {
    search?: string;
    status?: InquiryStatus;
    type?: InquiryType;
    country?: string;
    priority?: LeadPriority;
    assignedToId?: string;
    page?: string;
  };
};

export default async function AdminLeadsPage({ searchParams }: LeadsPageProps) {
  const user = await requireAdminUser();
  const page = toPositiveInt(searchParams?.page, 1);

  const [leadResult, staff, hospitals] = await Promise.all([
    getUnifiedInquiries({
      search: searchParams?.search,
      status: searchParams?.status,
      type: searchParams?.type,
      country: searchParams?.country,
      priority: searchParams?.priority,
      assignedToId: searchParams?.assignedToId,
      page,
      pageSize: 10,
    }),
    getAdminUsers(),
    getHospitalsForAdmin(),
  ]);

  return (
    <AdminShell
      currentPath="/admin/leads"
      title="Lead Management"
      description="Search, filter, paginate, assign staff, update priorities, and track the full inquiry pipeline across every healthcare CRM intake stream."
      user={user}
      actions={
        <Button asChild variant="hero">
          <Link href="/api/admin/export?scope=all">Export CSV</Link>
        </Button>
      }
    >
      <Card className="border-white/10 p-6">
        <form className="grid gap-4 xl:grid-cols-[1.5fr_1fr_1fr_1fr_1fr_1fr_auto]">
          <Input
            name="search"
            defaultValue={searchParams?.search ?? ""}
            placeholder="Search by name, organization, email, or message"
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
          <select
            name="type"
            defaultValue={searchParams?.type ?? ""}
            className="flex h-12 rounded-2xl border border-white/10 bg-white/90 px-4 py-3 text-sm text-slate-950"
          >
            <option value="">All inquiry types</option>
            {Object.values(InquiryType).map((type) => (
              <option key={type} value={type}>
                {startCase(type)}
              </option>
            ))}
          </select>
          <select
            name="priority"
            defaultValue={searchParams?.priority ?? ""}
            className="flex h-12 rounded-2xl border border-white/10 bg-white/90 px-4 py-3 text-sm text-slate-950"
          >
            <option value="">All priorities</option>
            {leadPriorityOptions.map((priority) => (
              <option key={priority} value={priority}>
                {startCase(priority)}
              </option>
            ))}
          </select>
          <select
            name="assignedToId"
            defaultValue={searchParams?.assignedToId ?? ""}
            className="flex h-12 rounded-2xl border border-white/10 bg-white/90 px-4 py-3 text-sm text-slate-950"
          >
            <option value="">All assignees</option>
            {staff.map((member) => (
              <option key={member.id} value={member.id}>
                {member.name}
              </option>
            ))}
          </select>
          <Input
            name="country"
            defaultValue={searchParams?.country ?? ""}
            placeholder="Country filter"
          />
          <Button type="submit" variant="secondary" className="justify-center">
            Apply Filters
          </Button>
        </form>
      </Card>
      <LeadManagementTable
        items={leadResult.items}
        staff={staff.filter((member) => member.isActive)}
        hospitals={hospitals.map((hospital) => ({
          id: hospital.id,
          name: hospital.name,
        }))}
      />
      <AdminPagination
        page={leadResult.page}
        pageCount={leadResult.pageCount}
        pathname="/admin/leads"
        searchParams={{
          search: searchParams?.search,
          status: searchParams?.status,
          type: searchParams?.type,
          country: searchParams?.country,
          priority: searchParams?.priority,
          assignedToId: searchParams?.assignedToId,
        }}
      />
    </AdminShell>
  );
}
