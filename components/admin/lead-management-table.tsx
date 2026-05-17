import { InquiryType, type Hospital } from "@prisma/client";

import {
  crmStatusOptions,
  leadPriorityOptions,
  pipelineStageOptions,
} from "@/lib/admin-config";
import {
  addLeadNoteAction,
  markLeadContactedAction,
  updateLeadWorkflowAction,
} from "@/lib/actions/admin";
import type { AdminInquiryFeedItem } from "@/lib/data/dashboard";
import { startCase } from "@/lib/utils";
import { LeadCommunicationPanel } from "@/components/admin/lead-communication-panel";
import { LeadDetailsSheet } from "@/components/admin/lead-details-sheet";
import {
  PipelineStagePill,
  PriorityPill,
  StatusPill,
} from "@/components/admin/status-pill";
import { SubmitButton } from "@/components/forms/submit-button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type StaffOption = {
  id: string;
  name: string;
  role: import("@prisma/client").UserRole;
};

type LeadManagementTableProps = {
  items: AdminInquiryFeedItem[];
  staff: StaffOption[];
  hospitals: Pick<Hospital, "id" | "name">[];
};

export function LeadManagementTable({
  items,
  staff,
  hospitals,
}: LeadManagementTableProps) {
  if (!items.length) {
    return (
      <Card variant="dashboard" className="border-white/10 p-6 text-slate-300">
        No inquiries match the current filter set.
      </Card>
    );
  }

  return (
    <div className="grid gap-5">
      {items.map((item) => (
        <Card key={`${item.model}-${item.id}`} variant="dashboard" className="border-white/10 p-6">
          <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
            <div>
              <div className="flex flex-wrap gap-3">
                <StatusPill status={item.status} />
                <PriorityPill priority={item.priority} />
                <PipelineStagePill stage={item.pipelineStage} />
                <span className="rounded-full border border-white/10 bg-white/8 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-slate-300">
                  {startCase(item.inquiryType)}
                </span>
                <span className="rounded-full border border-white/10 bg-white/8 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-slate-300">
                  {item.model}
                </span>
              </div>
              <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <h3 className="font-display text-2xl font-semibold text-white">
                    {item.name}
                  </h3>
                  <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-300">
                    <span>{item.organization || "No organization provided"}</span>
                    <span>{item.email}</span>
                    {item.country ? <span>{item.country}</span> : null}
                    {item.phone ? <span>{item.phone}</span> : null}
                  </div>
                  <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-400">
                    <span>Assigned: {item.assignedToName || "Unassigned"}</span>
                    <span>Notes: {item.noteCount}</span>
                    {item.attachmentCount ? (
                      <span>Files: {item.attachmentCount}</span>
                    ) : null}
                    {item.emailCount ? <span>Emails: {item.emailCount}</span> : null}
                    {item.sourcePath ? <span>Source: {item.sourcePath}</span> : null}
                    <span>{item.createdAt.toLocaleString()}</span>
                  </div>
                </div>
                <LeadDetailsSheet
                  item={{
                    name: item.name,
                    email: item.email,
                    organization: item.organization,
                    phone: item.phone,
                    telegram: item.telegram,
                    country: item.country,
                    message: item.message,
                    status: item.status,
                    priority: item.priority,
                    createdAt: item.createdAt.toISOString(),
                    secondaryLabel: item.secondaryLabel,
                    assignedToName: item.assignedToName,
                    assignedHospitalName: item.assignedHospitalName,
                    patientName: item.patientName,
                    budgetRange: item.budgetRange,
                    urgencyLevel: item.urgencyLevel ?? undefined,
                    notes: item.notes.map((note) => ({
                      ...note,
                      createdAt: note.createdAt.toISOString(),
                    })),
                    timeline: item.timeline.map((entry) => ({
                      ...entry,
                      createdAt: entry.createdAt.toISOString(),
                    })),
                    uploadedFiles: item.uploadedFiles.map((file) => ({
                      ...file,
                      uploadedAt: file.uploadedAt.toISOString(),
                    })),
                    emailLogs: item.emailLogs.map((email) => ({
                      ...email,
                      createdAt: email.createdAt.toISOString(),
                    })),
                  }}
                />
              </div>
              {item.secondaryLabel ? (
                <p className="mt-4 text-sm font-medium text-cyan-100/80">
                  {item.secondaryLabel}
                </p>
              ) : null}
              {item.tags.length ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-100"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              ) : null}
              <p className="mt-4 text-base leading-8 text-slate-200">{item.message}</p>
            </div>
            <div className="space-y-4">
              <form
                action={updateLeadWorkflowAction}
                className="grid gap-3 rounded-[1.5rem] border border-white/10 bg-slate-950/26 p-4"
              >
                <input type="hidden" name="id" value={item.id} />
                <input type="hidden" name="model" value={item.model} />
                <div className="grid gap-3 sm:grid-cols-2">
                  <select
                    name="status"
                    defaultValue={item.status}
                    className="select-enterprise"
                  >
                    {crmStatusOptions.map((status) => (
                      <option key={status} value={status}>
                        {startCase(status)}
                      </option>
                    ))}
                  </select>
                  <select
                    name="pipelineStage"
                    defaultValue={item.pipelineStage}
                    className="select-enterprise"
                  >
                    {pipelineStageOptions.map((stage) => (
                      <option key={stage} value={stage}>
                        {startCase(stage)}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <select
                    name="priority"
                    defaultValue={item.priority}
                    className="select-enterprise"
                  >
                    {leadPriorityOptions.map((priority) => (
                      <option key={priority} value={priority}>
                        {startCase(priority)}
                      </option>
                    ))}
                  </select>
                  <select
                    name="assignedToId"
                    defaultValue={item.assignedToId ?? ""}
                    className="select-enterprise"
                  >
                    <option value="">Unassigned</option>
                    {staff.map((member) => (
                      <option key={member.id} value={member.id}>
                        {member.name}
                      </option>
                    ))}
                  </select>
                  {item.inquiryType === InquiryType.MEDICAL_TOURISM ? (
                    <select
                      name="assignedHospitalId"
                      defaultValue={item.assignedHospitalId ?? ""}
                      className="select-enterprise"
                    >
                      <option value="">No hospital assigned</option>
                      {hospitals.map((hospital) => (
                        <option key={hospital.id} value={hospital.id}>
                          {hospital.name}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input type="hidden" name="assignedHospitalId" value="" />
                  )}
                </div>
                <Input
                  name="tags"
                  defaultValue={item.tags.join(", ")}
                  placeholder="Priority tags, comma separated"
                />
                <Textarea
                  name="closedReason"
                  defaultValue={item.closedReason ?? ""}
                  placeholder="Optional close or rejection reason"
                  className="min-h-[90px]"
                />
                <div className="flex flex-col gap-3 sm:flex-row">
                  <SubmitButton
                    type="submit"
                    variant="secondary"
                    pendingLabel="Updating..."
                  >
                    Save Workflow
                  </SubmitButton>
                  <button
                    type="submit"
                    formAction={markLeadContactedAction}
                    className="inline-flex h-12 items-center justify-center rounded-full border border-white/10 px-5 text-sm font-semibold text-white transition hover:bg-white/8"
                  >
                    Mark Contacted
                  </button>
                </div>
              </form>
              <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/26 p-4">
                <p className="text-sm font-semibold text-white">
                  Internal Notes ({item.noteCount})
                </p>
                <div className="mt-3 grid gap-3">
                  {item.notes.length ? (
                    item.notes.map((note) => (
                      <div
                        key={note.id}
                        className="rounded-[1rem] border border-white/8 bg-white/6 px-3 py-3 text-sm leading-7 text-slate-300"
                      >
                        <p>{note.content}</p>
                        <p className="mt-2 text-xs uppercase tracking-[0.2em] text-slate-500">
                          {note.authorName} • {note.createdAt.toLocaleDateString()}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-slate-400">No notes added yet.</p>
                  )}
                </div>
                <form action={addLeadNoteAction} className="mt-4 grid gap-3">
                  <input type="hidden" name="id" value={item.id} />
                  <input type="hidden" name="model" value={item.model} />
                  <Textarea
                    name="content"
                    placeholder="Add an internal follow-up note"
                    className="min-h-[96px]"
                  />
                  <SubmitButton
                    type="submit"
                    variant="outline"
                    pendingLabel="Saving note..."
                  >
                    Add Note
                  </SubmitButton>
                </form>
              </div>
              <LeadCommunicationPanel
                leadId={item.id}
                model={item.model}
                recipientName={item.name}
                recipientEmail={item.email}
                uploadedFiles={item.uploadedFiles}
                emailLogs={item.emailLogs}
              />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
