import { InquiryPriority, InquiryStatus } from "@prisma/client";

import { cn, startCase } from "@/lib/utils";

export function InquiryStatusBadge({ status }: { status: InquiryStatus }) {
  const tone =
    status === InquiryStatus.NEW
      ? "border-sky-200 bg-sky-50 text-sky-700"
      : status === InquiryStatus.CONTACTED
        ? "border-blue-200 bg-blue-50 text-blue-700"
        : status === InquiryStatus.IN_PROGRESS
          ? "border-amber-200 bg-amber-50 text-amber-700"
          : status === InquiryStatus.CLOSED
            ? "border-emerald-200 bg-emerald-50 text-emerald-700"
            : "border-rose-200 bg-rose-50 text-rose-700";

  return (
    <span
      className={cn(
        "inline-flex rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em]",
        tone,
      )}
    >
      {startCase(status)}
    </span>
  );
}

export function InquiryPriorityBadge({ priority }: { priority: InquiryPriority }) {
  const tone =
    priority === InquiryPriority.URGENT
      ? "border-rose-200 bg-rose-50 text-rose-700"
      : priority === InquiryPriority.HIGH
        ? "border-amber-200 bg-amber-50 text-amber-700"
        : priority === InquiryPriority.NORMAL
          ? "border-blue-200 bg-blue-50 text-blue-700"
          : "border-slate-200 bg-slate-50 text-slate-700";

  return (
    <span
      className={cn(
        "inline-flex rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em]",
        tone,
      )}
    >
      {startCase(priority)}
    </span>
  );
}
