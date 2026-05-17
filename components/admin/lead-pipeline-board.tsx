"use client";

import { LeadPriority, PipelineStage } from "@prisma/client";
import { useState, useTransition } from "react";

import {
  completeLeadReminderAction,
  createLeadReminderAction,
  updateLeadPipelineStageAction,
} from "@/lib/actions/pipeline";
import { startCase } from "@/lib/utils";
import { PipelineStagePill, PriorityPill } from "@/components/admin/status-pill";
import { SubmitButton } from "@/components/forms/submit-button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type PipelineBoardProps = {
  columns: Awaited<ReturnType<typeof import("@/lib/data/pipeline").getLeadPipelineBoardData>>["columns"];
  reminders: Awaited<ReturnType<typeof import("@/lib/data/pipeline").getLeadPipelineBoardData>>["reminders"];
  staff: Array<{ id: string; name: string }>;
};

type DragState = {
  id: string;
  model:
    | "contactSubmission"
    | "partnershipLead"
    | "studentMobilityInquiry"
    | "medicalTourismInquiry";
  assignedToId?: string | null;
  tags: string[];
};

const reminderPriorityOptions = [
  LeadPriority.LOW,
  LeadPriority.MEDIUM,
  LeadPriority.HIGH,
  LeadPriority.URGENT,
] as const;

export function LeadPipelineBoard({
  columns,
  reminders,
  staff,
}: PipelineBoardProps) {
  const [dragState, setDragState] = useState<DragState | null>(null);
  const [activeStage, setActiveStage] = useState<PipelineStage | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleDrop(stage: PipelineStage) {
    if (!dragState) {
      return;
    }

    const formData = new FormData();
    formData.set("id", dragState.id);
    formData.set("model", dragState.model);
    formData.set("pipelineStage", stage);
    formData.set("assignedToId", dragState.assignedToId ?? "");
    formData.set("tags", dragState.tags.join(", "));

    startTransition(async () => {
      await updateLeadPipelineStageAction(formData);
      setDragState(null);
      setActiveStage(null);
    });
  }

  return (
    <div className="grid gap-6">
      <div className="grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="grid gap-5 lg:grid-cols-3">
          {columns.map((column) => (
            <div
              key={column.stage}
              onDragOver={(event) => {
                event.preventDefault();
                setActiveStage(column.stage);
              }}
              onDrop={(event) => {
                event.preventDefault();
                handleDrop(column.stage);
              }}
              onDragLeave={() => {
                if (activeStage === column.stage) {
                  setActiveStage(null);
                }
              }}
              className={`rounded-[1.8rem] border p-4 transition ${
                activeStage === column.stage
                  ? "border-cyan-300/40 bg-cyan-300/8"
                  : "border-white/10 bg-white/6"
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <PipelineStagePill stage={column.stage} />
                <span className="rounded-full border border-white/10 bg-slate-950/28 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-300">
                  {column.items.length}
                </span>
              </div>
              <div className="mt-4 grid gap-4">
                {column.items.length ? (
                  column.items.map((item) => (
                    <Card
                      key={`${item.model}-${item.id}`}
                      draggable={!isPending}
                      onDragStart={() =>
                        setDragState({
                          id: item.id,
                          model: item.model,
                          assignedToId: item.assignedToId,
                          tags: item.tags,
                        })
                      }
                      onDragEnd={() => {
                        setDragState(null);
                        setActiveStage(null);
                      }}
                      className="border-white/10 p-4"
                    >
                      <div className="flex flex-wrap gap-2">
                        <PriorityPill priority={item.priority} />
                        <span className="rounded-full border border-white/10 bg-white/8 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-300">
                          {startCase(item.inquiryType)}
                        </span>
                      </div>
                      <h3 className="mt-4 text-lg font-semibold text-white">
                        {item.name}
                      </h3>
                      <p className="mt-2 text-sm text-slate-300">
                        {item.secondaryLabel || item.organization || item.email}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs uppercase tracking-[0.18em] text-slate-500">
                        <span>{item.country || "No country"}</span>
                        <span>{item.assignedToName || "Unassigned"}</span>
                        <span>{item.noteCount} notes</span>
                      </div>
                      {item.tags.length ? (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {item.tags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-cyan-100"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      ) : null}
                      <form
                        action={updateLeadPipelineStageAction}
                        className="mt-4 grid gap-3"
                      >
                        <input type="hidden" name="id" value={item.id} />
                        <input type="hidden" name="model" value={item.model} />
                        <input
                          type="hidden"
                          name="pipelineStage"
                          value={item.pipelineStage}
                        />
                        <select
                          name="assignedToId"
                          defaultValue={item.assignedToId ?? ""}
                          className="flex h-11 rounded-2xl border border-white/10 bg-white/90 px-4 py-3 text-sm text-slate-950"
                        >
                          <option value="">Unassigned</option>
                          {staff.map((member) => (
                            <option key={member.id} value={member.id}>
                              {member.name}
                            </option>
                          ))}
                        </select>
                        <Input
                          name="tags"
                          defaultValue={item.tags.join(", ")}
                          placeholder="Tags, comma separated"
                          className="h-11"
                        />
                        <SubmitButton
                          type="submit"
                          size="sm"
                          variant="secondary"
                          pendingLabel="Saving..."
                        >
                          Save Card
                        </SubmitButton>
                      </form>
                      <div className="mt-5 rounded-[1.2rem] border border-white/8 bg-slate-950/24 p-3">
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                          Reminders
                        </p>
                        <div className="mt-3 grid gap-2">
                          {item.reminders.length ? (
                            item.reminders.slice(0, 3).map((reminder) => (
                              <div
                                key={reminder.id}
                                className="rounded-[1rem] border border-white/8 bg-white/6 px-3 py-3"
                              >
                                <div className="flex items-start justify-between gap-3">
                                  <div>
                                    <p className="text-sm font-medium text-white">
                                      {reminder.title}
                                    </p>
                                    <p className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-500">
                                      {reminder.dueAt.toLocaleString()}
                                    </p>
                                  </div>
                                  <form action={completeLeadReminderAction}>
                                    <input
                                      type="hidden"
                                      name="reminderId"
                                      value={reminder.id}
                                    />
                                    <input
                                      type="hidden"
                                      name="isCompleted"
                                      value="true"
                                    />
                                    <SubmitButton
                                      type="submit"
                                      size="sm"
                                      variant="outline"
                                      pendingLabel="..."
                                    >
                                      Done
                                    </SubmitButton>
                                  </form>
                                </div>
                              </div>
                            ))
                          ) : (
                            <p className="text-sm text-slate-400">No reminders scheduled.</p>
                          )}
                        </div>
                        <form action={createLeadReminderAction} className="mt-3 grid gap-2">
                          <input type="hidden" name="leadId" value={item.id} />
                          <input type="hidden" name="leadModel" value={item.model} />
                          <Input
                            name="title"
                            placeholder="Follow-up title"
                            className="h-10 rounded-xl"
                          />
                          <Input
                            name="dueAt"
                            type="datetime-local"
                            className="h-10 rounded-xl"
                          />
                          <div className="grid gap-2 sm:grid-cols-2">
                            <select
                              name="priority"
                              defaultValue={LeadPriority.MEDIUM}
                              className="flex h-10 rounded-xl border border-white/10 bg-white/90 px-4 py-2 text-sm text-slate-950"
                            >
                              {reminderPriorityOptions.map((priority) => (
                                <option key={priority} value={priority}>
                                  {startCase(priority)}
                                </option>
                              ))}
                            </select>
                            <select
                              name="assignedToId"
                              defaultValue={item.assignedToId ?? ""}
                              className="flex h-10 rounded-xl border border-white/10 bg-white/90 px-4 py-2 text-sm text-slate-950"
                            >
                              <option value="">No assignee</option>
                              {staff.map((member) => (
                                <option key={member.id} value={member.id}>
                                  {member.name}
                                </option>
                              ))}
                            </select>
                          </div>
                          <Textarea
                            name="note"
                            placeholder="Reminder note"
                            className="min-h-[70px] rounded-xl"
                          />
                          <SubmitButton
                            type="submit"
                            size="sm"
                            variant="outline"
                            pendingLabel="Scheduling..."
                          >
                            Add Reminder
                          </SubmitButton>
                        </form>
                      </div>
                    </Card>
                  ))
                ) : (
                  <div className="rounded-[1.3rem] border border-dashed border-white/10 px-4 py-8 text-center text-sm text-slate-400">
                    Drop leads here to move them into {startCase(column.stage)}.
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        <Card className="border-white/10 p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.26em] text-cyan-100/70">
            Upcoming Reminders
          </p>
          <h2 className="mt-4 font-display text-2xl font-semibold text-white">
            Cross-team follow-up queue
          </h2>
          <div className="mt-6 grid gap-3">
            {reminders.length ? (
              reminders.map((reminder) => (
                <div
                  key={reminder.id}
                  className="rounded-[1.2rem] border border-white/8 bg-white/6 px-4 py-4"
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold text-white">{reminder.title}</p>
                    <span className="rounded-full border border-white/10 bg-slate-950/24 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-300">
                      {startCase(reminder.priority)}
                    </span>
                  </div>
                  <p className="mt-2 text-xs uppercase tracking-[0.18em] text-slate-500">
                    {reminder.leadModel} • {reminder.dueAt.toLocaleString()}
                  </p>
                  <p className="mt-2 text-sm text-slate-300">
                    Assigned: {reminder.assignedToName || "Unassigned"}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-400">
                No reminders are currently scheduled.
              </p>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
