import {
  crmStatusOptions,
  leadPriorityOptions,
  pipelineStageOptions,
} from "@/lib/admin-config";
import {
  addLeadNoteAction,
  updateLeadWorkflowAction,
} from "@/lib/actions/admin";
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

type StudentMobilityTableProps = {
  items: Awaited<
    ReturnType<typeof import("@/lib/data/dashboard").getStudentMobilityCrmData>
  >["items"];
  staff: Array<{ id: string; name: string }>;
};

export function StudentMobilityTable({
  items,
  staff,
}: StudentMobilityTableProps) {
  if (!items.length) {
    return (
      <Card className="border-white/10 p-6 text-slate-300">
        No student mobility inquiries match the current filters.
      </Card>
    );
  }

  return (
    <div className="grid gap-5">
      {items.map((item) => (
        <Card key={item.id} className="border-white/10 p-6">
          <div className="grid gap-6 xl:grid-cols-[1.08fr_0.92fr]">
            <div>
              <div className="flex flex-wrap gap-3">
                <StatusPill status={item.status} />
                <PriorityPill priority={item.priority} />
                <PipelineStagePill stage={item.pipelineStage} />
                {item.preferredCountry ? (
                  <span className="rounded-full border border-white/10 bg-white/8 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-slate-300">
                    {item.preferredCountry}
                  </span>
                ) : null}
              </div>
              <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <h3 className="font-display text-2xl font-semibold text-white">
                    {item.name}
                  </h3>
                  <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-300">
                    <span>{item.organization || "Independent inquiry"}</span>
                    <span>{item.email}</span>
                    {item.country ? <span>{item.country}</span> : null}
                    {item.programInterest ? <span>{item.programInterest}</span> : null}
                  </div>
                  <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-400">
                    <span>Assigned: {item.assignedTo?.name || "Unassigned"}</span>
                    {item.academicBackground ? (
                      <span>{item.academicBackground}</span>
                    ) : null}
                    {item.intakePeriod ? <span>{item.intakePeriod}</span> : null}
                    {item.sourcePath ? <span>Source: {item.sourcePath}</span> : null}
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
                    secondaryLabel: item.programInterest,
                    assignedToName: item.assignedTo?.name,
                    notes: item.notes.map((note) => ({
                      id: note.id,
                      content: note.content,
                      createdAt: note.createdAt.toISOString(),
                      authorName: note.author.name,
                    })),
                    uploadedFiles: item.uploadedFiles.map((file) => ({
                      id: file.id,
                      originalName: file.originalName,
                      mimeType: file.mimeType,
                      uploadedAt: file.uploadedAt.toISOString(),
                    })),
                    emailLogs: item.emailLogs.map((email) => ({
                      id: email.id,
                      subject: email.subject,
                      toEmail: email.toEmail,
                      status: email.status,
                      createdAt: email.createdAt.toISOString(),
                    })),
                    timeline: [
                      {
                        id: "created",
                        label: "Inquiry created",
                        value: "Student mobility inquiry captured in the CRM.",
                        createdAt: item.createdAt.toISOString(),
                      },
                      ...item.notes.map((note) => ({
                        id: note.id,
                        label: `Note by ${note.author.name}`,
                        value: note.content,
                        createdAt: note.createdAt.toISOString(),
                      })),
                    ],
                  }}
                />
              </div>
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
                <input type="hidden" name="model" value="studentMobilityInquiry" />
                <input type="hidden" name="assignedHospitalId" value="" />
                <div className="grid gap-3 sm:grid-cols-2">
                  <select
                    name="status"
                    defaultValue={item.status}
                    className="flex h-12 rounded-2xl border border-white/10 bg-white/90 px-4 py-3 text-sm text-slate-950"
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
                    className="flex h-12 rounded-2xl border border-white/10 bg-white/90 px-4 py-3 text-sm text-slate-950"
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
                    className="flex h-12 rounded-2xl border border-white/10 bg-white/90 px-4 py-3 text-sm text-slate-950"
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
                    className="flex h-12 rounded-2xl border border-white/10 bg-white/90 px-4 py-3 text-sm text-slate-950"
                  >
                    <option value="">Unassigned</option>
                    {staff.map((member) => (
                      <option key={member.id} value={member.id}>
                        {member.name}
                      </option>
                    ))}
                  </select>
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
                <SubmitButton
                  type="submit"
                  variant="secondary"
                  pendingLabel="Updating inquiry..."
                >
                  Save Inquiry Workflow
                </SubmitButton>
              </form>
              <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/26 p-4">
                <p className="text-sm font-semibold text-white">Internal Notes</p>
                <div className="mt-3 grid gap-3">
                  {item.notes.length ? (
                    item.notes.map((note) => (
                      <div
                        key={note.id}
                        className="rounded-[1rem] border border-white/8 bg-white/6 px-3 py-3 text-sm leading-7 text-slate-300"
                      >
                        <p>{note.content}</p>
                        <p className="mt-2 text-xs uppercase tracking-[0.2em] text-slate-500">
                          {note.author.name} • {note.createdAt.toLocaleDateString()}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-slate-400">No notes added yet.</p>
                  )}
                </div>
                <form action={addLeadNoteAction} className="mt-4 grid gap-3">
                  <input type="hidden" name="id" value={item.id} />
                  <input type="hidden" name="model" value="studentMobilityInquiry" />
                  <Textarea
                    name="content"
                    placeholder="Add a note for the mobility inquiry"
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
                model="studentMobilityInquiry"
                recipientName={item.name}
                recipientEmail={item.email}
                uploadedFiles={item.uploadedFiles.map((file) => ({
                  id: file.id,
                  originalName: file.originalName,
                  mimeType: file.mimeType,
                  uploadedAt: file.uploadedAt,
                }))}
                emailLogs={item.emailLogs.map((email) => ({
                  id: email.id,
                  subject: email.subject,
                  toEmail: email.toEmail,
                  status: email.status,
                  createdAt: email.createdAt,
                }))}
              />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
