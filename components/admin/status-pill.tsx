import type {
  InquiryStatus,
  LeadPriority,
  NotificationType,
  PatientCaseStatus,
  PipelineStage,
  TaskStatus,
  TreatmentJourneyStage,
  UserRole,
} from "@prisma/client";

import { cn, startCase } from "@/lib/utils";

export function StatusPill({ status }: { status: InquiryStatus }) {
  const tone =
    status === "NEW"
      ? "border-cyan-300/20 bg-cyan-300/10 text-cyan-100"
      : status === "ACKNOWLEDGED" || status === "REVIEWING"
        ? "border-sky-300/20 bg-sky-300/10 text-sky-100"
        : status === "QUALIFIED"
          ? "border-violet-300/20 bg-violet-300/10 text-violet-100"
      : status === "CONTACTED"
        ? "border-blue-300/20 bg-blue-300/10 text-blue-100"
        : status === "IN_PROGRESS"
          ? "border-amber-300/20 bg-amber-300/10 text-amber-100"
          : status === "WON"
            ? "border-emerald-300/20 bg-emerald-300/10 text-emerald-100"
          : status === "CLOSED"
            ? "border-emerald-300/20 bg-emerald-300/10 text-emerald-100"
            : "border-rose-300/20 bg-rose-300/10 text-rose-100";

  return (
    <span
      className={cn(
        "inline-flex rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em]",
        tone,
      )}
    >
      {startCase(status)}
    </span>
  );
}

export function PriorityPill({ priority }: { priority: LeadPriority }) {
  const tone =
    priority === "URGENT"
      ? "border-rose-300/20 bg-rose-300/10 text-rose-100"
      : priority === "HIGH"
        ? "border-amber-300/20 bg-amber-300/10 text-amber-100"
        : priority === "MEDIUM"
          ? "border-blue-300/20 bg-blue-300/10 text-blue-100"
          : "border-white/10 bg-white/8 text-slate-300";

  return (
    <span
      className={cn(
        "inline-flex rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em]",
        tone,
      )}
    >
      {startCase(priority)}
    </span>
  );
}

export function RolePill({ role }: { role: UserRole }) {
  const tone =
    role === "SUPER_ADMIN"
      ? "border-fuchsia-300/20 bg-fuchsia-300/10 text-fuchsia-100"
      : role === "ADMIN"
        ? "border-cyan-300/20 bg-cyan-300/10 text-cyan-100"
        : "border-white/10 bg-white/8 text-slate-300";

  return (
    <span
      className={cn(
        "inline-flex rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em]",
        tone,
      )}
    >
      {startCase(role)}
    </span>
  );
}

export function PipelineStagePill({ stage }: { stage: PipelineStage }) {
  const tone =
    stage === "NEW"
      ? "border-cyan-300/20 bg-cyan-300/10 text-cyan-100"
      : stage === "CONTACTED"
        ? "border-blue-300/20 bg-blue-300/10 text-blue-100"
        : stage === "QUALIFIED"
          ? "border-violet-300/20 bg-violet-300/10 text-violet-100"
          : stage === "NEGOTIATION"
            ? "border-amber-300/20 bg-amber-300/10 text-amber-100"
            : stage === "CONVERTED"
              ? "border-emerald-300/20 bg-emerald-300/10 text-emerald-100"
              : "border-slate-300/20 bg-slate-300/10 text-slate-100";

  return (
    <span
      className={cn(
        "inline-flex rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em]",
        tone,
      )}
    >
      {startCase(stage)}
    </span>
  );
}

export function PatientCaseStatusPill({ status }: { status: PatientCaseStatus }) {
  const tone =
    status === "NEW"
      ? "border-cyan-300/20 bg-cyan-300/10 text-cyan-100"
      : status === "TRIAGED"
        ? "border-blue-300/20 bg-blue-300/10 text-blue-100"
        : status === "COORDINATING"
          ? "border-amber-300/20 bg-amber-300/10 text-amber-100"
          : status === "TRAVEL_READY"
            ? "border-violet-300/20 bg-violet-300/10 text-violet-100"
            : status === "ADMITTED"
              ? "border-emerald-300/20 bg-emerald-300/10 text-emerald-100"
              : "border-slate-300/20 bg-slate-300/10 text-slate-100";

  return (
    <span
      className={cn(
        "inline-flex rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em]",
        tone,
      )}
    >
      {startCase(status)}
    </span>
  );
}

export function TreatmentStagePill({ stage }: { stage: TreatmentJourneyStage }) {
  return (
    <span className="inline-flex rounded-full border border-white/10 bg-white/8 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-slate-200">
      {startCase(stage)}
    </span>
  );
}

export function TaskStatusPill({ status }: { status: TaskStatus }) {
  const tone =
    status === "TODO"
      ? "border-cyan-300/20 bg-cyan-300/10 text-cyan-100"
      : status === "IN_PROGRESS"
        ? "border-blue-300/20 bg-blue-300/10 text-blue-100"
        : status === "BLOCKED"
          ? "border-rose-300/20 bg-rose-300/10 text-rose-100"
          : "border-emerald-300/20 bg-emerald-300/10 text-emerald-100";

  return (
    <span
      className={cn(
        "inline-flex rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em]",
        tone,
      )}
    >
      {startCase(status)}
    </span>
  );
}

export function NotificationTypePill({ type }: { type: NotificationType }) {
  const tone =
    type === "URGENT"
      ? "border-rose-300/20 bg-rose-300/10 text-rose-100"
      : type === "TASK"
        ? "border-blue-300/20 bg-blue-300/10 text-blue-100"
        : type === "CASE"
          ? "border-violet-300/20 bg-violet-300/10 text-violet-100"
          : type === "PARTNERSHIP"
            ? "border-amber-300/20 bg-amber-300/10 text-amber-100"
            : "border-cyan-300/20 bg-cyan-300/10 text-cyan-100";

  return (
    <span
      className={cn(
        "inline-flex rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em]",
        tone,
      )}
    >
      {startCase(type)}
    </span>
  );
}
