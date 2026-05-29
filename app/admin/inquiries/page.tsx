import { InquiryPriority, InquiryStatus } from "@prisma/client";
import Link from "next/link";

import {
  adminInquiryTypes,
  dashboardInquiryPriorities,
  dashboardInquiryStatuses,
  getInquiryDashboardData,
  type AdminInquiryFilterType,
  type InquiryDashboardFilters,
} from "@/lib/data/inquiry-crm";
import { requireAdminUser } from "@/lib/auth/session";
import { startCase } from "@/lib/utils";
import { AdminShell } from "@/components/admin/admin-shell";
import {
  InquiryPriorityBadge,
  InquiryStatusBadge,
} from "@/components/admin/inquiry-crm-badges";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export const dynamic = "force-dynamic";

type AdminInquiriesPageProps = {
  searchParams?: {
    search?: string;
    type?: string;
    status?: string;
    priority?: string;
    from?: string;
    to?: string;
  };
};

function SummaryCard({
  label,
  value,
  description,
}: {
  label: string;
  value: number;
  description: string;
}) {
  return (
    <Card variant="light" className="p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-700">
        {label}
      </p>
      <p className="mt-4 text-3xl font-semibold text-slate-950">{value}</p>
      <p className="mt-3 text-sm leading-7 text-slate-600">{description}</p>
    </Card>
  );
}

export default async function AdminInquiriesPage({
  searchParams,
}: AdminInquiriesPageProps) {
  const user = await requireAdminUser();
  const filters: InquiryDashboardFilters = {
    search: searchParams?.search || undefined,
    type: (searchParams?.type as AdminInquiryFilterType | undefined) || "all",
    status: (searchParams?.status as InquiryStatus | undefined) || undefined,
    priority: (searchParams?.priority as InquiryPriority | undefined) || undefined,
    from: searchParams?.from || undefined,
    to: searchParams?.to || undefined,
  };
  const { records, totals } = await getInquiryDashboardData(filters);
  const exportHref = `/api/admin/inquiries/export?${new URLSearchParams(
    Object.entries({
      search: filters.search || "",
      type: filters.type || "all",
      status: filters.status || "",
      priority: filters.priority || "",
      from: filters.from || "",
      to: filters.to || "",
    }),
  ).toString()}`;

  return (
    <AdminShell
      currentPath="/admin/inquiries"
      title="Inquiry CRM"
      description="Review website inquiry submissions, update lifecycle status, and move quickly into WhatsApp, Telegram, or email follow-up."
      user={user}
      actions={
        <Button asChild variant="primary" size="lg">
          <a href={exportHref}>Export CSV</a>
        </Button>
      }
    >
      <div className="grid gap-5 xl:grid-cols-5">
        <SummaryCard
          label="Total Inquiries"
          value={totals.total}
          description="All website inquiries matching the current filters."
        />
        <SummaryCard
          label="New"
          value={totals.new}
          description="Items that still require a first response."
        />
        <SummaryCard
          label="In Progress"
          value={totals.inProgress}
          description="Inquiries currently being handled by the team."
        />
        <SummaryCard
          label="Closed"
          value={totals.closed}
          description="Requests that have already been completed or archived."
        />
        <SummaryCard
          label="Urgent"
          value={totals.urgent}
          description="Items marked for priority review and quicker follow-up."
        />
      </div>

      <Card variant="light" className="p-5 sm:p-6">
        <form className="grid gap-4 lg:grid-cols-6">
          <label className="grid gap-2 text-sm font-medium text-slate-700 lg:col-span-2">
            Search
            <Input
              name="search"
              defaultValue={filters.search}
              placeholder="Name, email, phone, country"
            />
          </label>
          <label className="grid gap-2 text-sm font-medium text-slate-700">
            Type
            <select
              name="type"
              defaultValue={filters.type || "all"}
              className="select-enterprise"
            >
              {adminInquiryTypes.map((type) => (
                <option key={type} value={type}>
                  {type === "all" ? "All inquiries" : startCase(type)}
                </option>
              ))}
            </select>
          </label>
          <label className="grid gap-2 text-sm font-medium text-slate-700">
            Status
            <select
              name="status"
              defaultValue={filters.status || ""}
              className="select-enterprise"
            >
              <option value="">All statuses</option>
              {dashboardInquiryStatuses.map((status) => (
                <option key={status} value={status}>
                  {startCase(status)}
                </option>
              ))}
            </select>
          </label>
          <label className="grid gap-2 text-sm font-medium text-slate-700">
            Priority
            <select
              name="priority"
              defaultValue={filters.priority || ""}
              className="select-enterprise"
            >
              <option value="">All priorities</option>
              {dashboardInquiryPriorities.map((priority) => (
                <option key={priority} value={priority}>
                  {startCase(priority)}
                </option>
              ))}
            </select>
          </label>
          <label className="grid gap-2 text-sm font-medium text-slate-700">
            From
            <Input name="from" type="date" defaultValue={filters.from} />
          </label>
          <label className="grid gap-2 text-sm font-medium text-slate-700">
            To
            <Input name="to" type="date" defaultValue={filters.to} />
          </label>
          <div className="flex flex-col gap-3 lg:col-span-6 lg:flex-row">
            <Button type="submit" variant="primary" size="lg" className="w-full sm:w-auto">
              Apply Filters
            </Button>
            <Button asChild type="button" variant="secondary" size="lg" className="w-full sm:w-auto">
              <Link href="/admin/inquiries">Reset</Link>
            </Button>
          </div>
        </form>
      </Card>

      <Card variant="light" className="p-5 sm:p-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-700">
              Inquiry Feed
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-slate-950">
              Website inquiry records
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
              Every public inquiry form saves here with the source page, locale, and
              contact channel details needed for responsible follow-up.
            </p>
          </div>
          <p className="text-sm text-slate-500">{records.length} records</p>
        </div>

        {records.length === 0 ? (
          <div className="mt-8 rounded-[1.6rem] border border-dashed border-slate-200 bg-slate-50 px-5 py-10 text-center text-sm leading-7 text-slate-600">
            No inquiries matched the current filters.
          </div>
        ) : (
          <>
            <div className="mt-8 hidden overflow-hidden rounded-[1.6rem] border border-slate-200 lg:block">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                  <tr className="text-left text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                    <th className="px-4 py-4">Type</th>
                    <th className="px-4 py-4">Contact</th>
                    <th className="px-4 py-4">Country</th>
                    <th className="px-4 py-4">Status</th>
                    <th className="px-4 py-4">Priority</th>
                    <th className="px-4 py-4">Submitted</th>
                    <th className="px-4 py-4" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white">
                  {records.map((record) => (
                    <tr key={`${record.type}-${record.id}`} className="align-top">
                      <td className="px-4 py-4 text-sm text-slate-700">
                        <p className="font-semibold text-slate-950">{record.typeLabel}</p>
                        <p className="mt-1 text-slate-500">{record.sourcePage || "Website"}</p>
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-700">
                        <p className="font-semibold text-slate-950">{record.name}</p>
                        {record.organization ? (
                          <p className="mt-1 text-slate-500">{record.organization}</p>
                        ) : null}
                        <p className="mt-1 text-slate-500">{record.email || "No email"}</p>
                        <p className="mt-1 text-slate-500">{record.phone || "No phone"}</p>
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-700">
                        <p>{record.country || "Not provided"}</p>
                        <p className="mt-1 text-slate-500">{record.locale || "Unknown locale"}</p>
                      </td>
                      <td className="px-4 py-4">
                        <InquiryStatusBadge status={record.status} />
                      </td>
                      <td className="px-4 py-4">
                        <InquiryPriorityBadge priority={record.priority} />
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-700">
                        {record.createdAt.toLocaleString()}
                      </td>
                      <td className="px-4 py-4 text-right">
                        <Button asChild variant="secondary" size="sm">
                          <Link href={`/admin/inquiries/${record.type}/${record.id}`}>
                            View Detail
                          </Link>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-8 grid gap-4 lg:hidden">
              {records.map((record) => (
                <div
                  key={`${record.type}-${record.id}`}
                  className="rounded-[1.6rem] border border-slate-200 bg-white p-5 shadow-[0_18px_50px_rgba(8,22,52,0.06)]"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">
                        {record.typeLabel}
                      </p>
                      <h3 className="mt-2 text-lg font-semibold text-slate-950">
                        {record.name}
                      </h3>
                      {record.organization ? (
                        <p className="mt-1 text-sm text-slate-500">{record.organization}</p>
                      ) : null}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <InquiryStatusBadge status={record.status} />
                      <InquiryPriorityBadge priority={record.priority} />
                    </div>
                  </div>
                  <div className="mt-4 grid gap-2 text-sm leading-7 text-slate-600">
                    <p>{record.email || "No email provided"}</p>
                    <p>{record.phone || "No phone provided"}</p>
                    <p>{record.country || "Country not provided"}</p>
                    <p>{record.sourcePage || "Website"}</p>
                  </div>
                  <p className="mt-4 line-clamp-3 text-sm leading-7 text-slate-600">
                    {record.message}
                  </p>
                  <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-sm text-slate-500">
                      {record.createdAt.toLocaleString()}
                    </p>
                    <Button asChild variant="secondary" size="lg" className="w-full sm:w-auto">
                      <Link href={`/admin/inquiries/${record.type}/${record.id}`}>
                        View Detail
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </Card>
    </AdminShell>
  );
}
