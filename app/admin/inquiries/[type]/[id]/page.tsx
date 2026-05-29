import Link from "next/link";
import { notFound } from "next/navigation";

import { updateAdminInquiryAction } from "@/app/actions/admin-inquiries";
import {
  adminInquiryTypes,
  dashboardInquiryPriorities,
  dashboardInquiryStatuses,
  getInquiryDetail,
  type AdminInquiryType,
} from "@/lib/data/inquiry-crm";
import { requireAdminUser } from "@/lib/auth/session";
import { AdminShell } from "@/components/admin/admin-shell";
import {
  InquiryPriorityBadge,
  InquiryStatusBadge,
} from "@/components/admin/inquiry-crm-badges";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

export const dynamic = "force-dynamic";

type AdminInquiryDetailPageProps = {
  params: {
    type: string;
    id: string;
  };
};

function isAdminInquiryType(value: string): value is AdminInquiryType {
  return adminInquiryTypes.includes(value as (typeof adminInquiryTypes)[number]) && value !== "all";
}

export default async function AdminInquiryDetailPage({
  params,
}: AdminInquiryDetailPageProps) {
  const user = await requireAdminUser();

  if (!isAdminInquiryType(params.type)) {
    notFound();
  }

  const detail = await getInquiryDetail(params.type, params.id);

  if (!detail) {
    notFound();
  }

  return (
    <AdminShell
      currentPath="/admin/inquiries"
      title={detail.typeLabel}
      description="Review the submitted information, update the internal workflow status, and move directly into WhatsApp, Telegram, or email follow-up."
      user={user}
      actions={
        <Button asChild variant="secondary" size="lg">
          <Link href="/admin/inquiries">Back to Inquiry CRM</Link>
        </Button>
      }
    >
      <div className="grid gap-6 xl:grid-cols-[1.08fr_0.92fr]">
        <Card variant="light" className="p-6 sm:p-7">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-700">
                Inquiry Detail
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-slate-950">
                {detail.name}
              </h2>
              {detail.organization ? (
                <p className="mt-2 text-sm text-slate-500">{detail.organization}</p>
              ) : null}
            </div>
            <div className="flex flex-wrap gap-2">
              <InquiryStatusBadge status={detail.status} />
              <InquiryPriorityBadge priority={detail.priority} />
            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {detail.fields.map((field) => (
              <div
                key={field.label}
                className="rounded-[1.4rem] border border-slate-200 bg-slate-50 px-4 py-4"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  {field.label}
                </p>
                <p className="mt-3 text-sm leading-7 text-slate-700">{field.value}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-[1.6rem] border border-slate-200 bg-white px-5 py-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">
              Submitted Message
            </p>
            <p className="mt-4 whitespace-pre-wrap text-sm leading-7 text-slate-700">
              {detail.message}
            </p>
          </div>

          {detail.attachments.length ? (
            <div className="mt-8 rounded-[1.6rem] border border-slate-200 bg-white px-5 py-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">
                Uploaded Documents
              </p>
              <div className="mt-4 grid gap-3">
                {detail.attachments.map((attachment) => (
                  <a
                    key={attachment.id}
                    href={`/api/files/${attachment.id}`}
                    className="rounded-[1.2rem] border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-700 transition hover:border-blue-200 hover:bg-blue-50/60"
                  >
                    <p className="font-semibold text-slate-950">{attachment.originalName}</p>
                    <p className="mt-1 text-slate-500">
                      {attachment.mimeType} • {Math.round(attachment.sizeBytes / 1024)} KB
                    </p>
                  </a>
                ))}
              </div>
            </div>
          ) : null}
        </Card>

        <div className="grid gap-6">
          <Card variant="light" className="p-6 sm:p-7">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-700">
              Quick Follow-Up
            </p>
            <div className="mt-5 grid gap-3">
              <Button
                asChild
                variant="outline"
                size="lg"
                className="w-full justify-center"
              >
                <a
                  href={detail.whatsappHref || detail.telegramHref}
                  target="_blank"
                  rel="noreferrer"
                >
                  WhatsApp Follow-Up
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="w-full justify-center">
                <a href={detail.telegramHref} target="_blank" rel="noreferrer">
                  Telegram Follow-Up
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="w-full justify-center">
                <a href={detail.emailHref}>Email Reply</a>
              </Button>
            </div>
          </Card>

          <Card variant="light" className="p-6 sm:p-7">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-700">
              Admin Update
            </p>
            <form action={updateAdminInquiryAction} className="mt-5 grid gap-4">
              <input type="hidden" name="id" value={detail.id} />
              <input type="hidden" name="type" value={detail.type} />
              <input
                type="hidden"
                name="redirectTo"
                value={`/admin/inquiries/${detail.type}/${detail.id}`}
              />
              <label className="grid gap-2 text-sm font-medium text-slate-700">
                Status
                <select
                  name="status"
                  defaultValue={detail.status}
                  className="select-enterprise"
                >
                  {dashboardInquiryStatuses.map((status) => (
                    <option key={status} value={status}>
                      {status.replace(/_/g, " ")}
                    </option>
                  ))}
                </select>
              </label>
              <label className="grid gap-2 text-sm font-medium text-slate-700">
                Priority
                <select
                  name="priority"
                  defaultValue={detail.priority}
                  className="select-enterprise"
                >
                  {dashboardInquiryPriorities.map((priority) => (
                    <option key={priority} value={priority}>
                      {priority.replace(/_/g, " ")}
                    </option>
                  ))}
                </select>
              </label>
              <label className="grid gap-2 text-sm font-medium text-slate-700">
                Internal Note
                <Textarea
                  name="internalNote"
                  defaultValue={detail.internalNote || ""}
                  placeholder="Add follow-up context, next steps, or internal handling notes."
                  className="min-h-[180px]"
                />
              </label>
              <Button type="submit" variant="primary" size="lg" className="w-full justify-center">
                Save Inquiry Update
              </Button>
            </form>
          </Card>

          <Card variant="light" className="p-6 sm:p-7">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-700">
              Submission Metadata
            </p>
            <div className="mt-5 grid gap-3 text-sm leading-7 text-slate-600">
              <div className="rounded-[1.2rem] border border-slate-200 bg-slate-50 px-4 py-4">
                Submitted: {detail.createdAt.toLocaleString()}
              </div>
              <div className="rounded-[1.2rem] border border-slate-200 bg-slate-50 px-4 py-4">
                Updated: {detail.updatedAt.toLocaleString()}
              </div>
              <div className="rounded-[1.2rem] border border-slate-200 bg-slate-50 px-4 py-4">
                Source page: {detail.sourcePage || "Website"}
              </div>
              <div className="rounded-[1.2rem] border border-slate-200 bg-slate-50 px-4 py-4">
                Locale: {detail.locale || "Not provided"}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </AdminShell>
  );
}
