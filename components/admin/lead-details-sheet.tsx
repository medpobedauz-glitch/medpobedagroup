"use client";

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { PriorityPill, StatusPill } from "@/components/admin/status-pill";

type LeadDetailsSheetProps = {
  item: {
    name: string;
    email: string;
    organization?: string | null;
    phone?: string | null;
    telegram?: string | null;
    country?: string | null;
    message: string;
    status: import("@prisma/client").InquiryStatus;
    priority: import("@prisma/client").LeadPriority;
    createdAt: string;
    secondaryLabel?: string | null;
    assignedToName?: string | null;
    assignedHospitalName?: string | null;
    patientName?: string | null;
    budgetRange?: string | null;
    urgencyLevel?: string | null;
    notes: Array<{
      id: string;
      content: string;
      createdAt: string;
      authorName: string;
    }>;
    timeline: Array<{
      id: string;
      label: string;
      value: string;
      createdAt: string;
    }>;
    uploadedFiles?: Array<{
      id: string;
      originalName: string;
      mimeType: string;
      uploadedAt: string;
    }>;
    emailLogs?: Array<{
      id: string;
      subject: string;
      toEmail: string;
      status: string;
      createdAt: string;
    }>;
  };
};

export function LeadDetailsSheet({ item }: LeadDetailsSheetProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button type="button" variant="outline" size="sm">
          View Details
        </Button>
      </SheetTrigger>
      <SheetContent className="max-w-xl overflow-y-auto">
        <SheetHeader>
          <div className="flex flex-wrap gap-3">
            <StatusPill status={item.status} />
            <PriorityPill priority={item.priority} />
          </div>
          <SheetTitle className="mt-4 font-display text-2xl">
            {item.name}
          </SheetTitle>
          <SheetDescription className="leading-7">
            {item.organization || item.email}
          </SheetDescription>
        </SheetHeader>
        <div className="mt-8 grid gap-6">
          <div className="rounded-[1.5rem] border border-white/10 bg-white/6 p-4">
            <p className="text-sm font-semibold text-white">Lead Snapshot</p>
            <div className="mt-4 grid gap-2 text-sm leading-7 text-slate-300">
              <p>Email: {item.email}</p>
              {item.phone ? <p>Phone: {item.phone}</p> : null}
              {item.telegram ? <p>Telegram: {item.telegram}</p> : null}
              {item.country ? <p>Country: {item.country}</p> : null}
              {item.secondaryLabel ? <p>Context: {item.secondaryLabel}</p> : null}
              {item.patientName ? <p>Patient: {item.patientName}</p> : null}
              {item.budgetRange ? <p>Budget: {item.budgetRange}</p> : null}
              {item.urgencyLevel ? <p>Urgency: {item.urgencyLevel}</p> : null}
              {item.assignedToName ? <p>Assigned Staff: {item.assignedToName}</p> : null}
              {item.assignedHospitalName ? (
                <p>Assigned Hospital: {item.assignedHospitalName}</p>
              ) : null}
              <p>Created: {new Date(item.createdAt).toLocaleString()}</p>
            </div>
          </div>
          <div className="rounded-[1.5rem] border border-white/10 bg-white/6 p-4">
            <p className="text-sm font-semibold text-white">Message</p>
            <p className="mt-3 text-sm leading-7 text-slate-300">{item.message}</p>
          </div>
          <div className="rounded-[1.5rem] border border-white/10 bg-white/6 p-4">
            <p className="text-sm font-semibold text-white">Lead Timeline</p>
            <div className="mt-4 grid gap-3">
              {item.timeline.map((entry) => (
                <div
                  key={entry.id}
                  className="rounded-[1rem] border border-white/8 bg-slate-950/28 px-3 py-3"
                >
                  <p className="text-sm font-medium text-white">{entry.label}</p>
                  <p className="mt-2 text-sm leading-7 text-slate-300">
                    {entry.value}
                  </p>
                  <p className="mt-2 text-xs uppercase tracking-[0.2em] text-slate-500">
                    {new Date(entry.createdAt).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
          {item.emailLogs?.length ? (
            <div className="rounded-[1.5rem] border border-white/10 bg-white/6 p-4">
              <p className="text-sm font-semibold text-white">Email History</p>
              <div className="mt-4 grid gap-3">
                {item.emailLogs.map((email) => (
                  <div
                    key={email.id}
                    className="rounded-[1rem] border border-white/8 bg-slate-950/28 px-3 py-3"
                  >
                    <p className="text-sm font-medium text-white">{email.subject}</p>
                    <p className="mt-2 text-sm leading-7 text-slate-300">
                      {email.toEmail}
                    </p>
                    <p className="mt-2 text-xs uppercase tracking-[0.2em] text-slate-500">
                      {email.status} • {new Date(email.createdAt).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
          {item.uploadedFiles?.length ? (
            <div className="rounded-[1.5rem] border border-white/10 bg-white/6 p-4">
              <p className="text-sm font-semibold text-white">Uploaded Files</p>
              <div className="mt-4 grid gap-3">
                {item.uploadedFiles.map((file) => (
                  <div
                    key={file.id}
                    className="rounded-[1rem] border border-white/8 bg-slate-950/28 px-3 py-3"
                  >
                    <p className="text-sm font-medium text-white">{file.originalName}</p>
                    <p className="mt-2 text-xs uppercase tracking-[0.2em] text-slate-500">
                      {file.mimeType} • {new Date(file.uploadedAt).toLocaleString()}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-[0.18em]">
                      <a
                        href={`/api/files/${file.id}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-cyan-100 transition hover:text-white"
                      >
                        Preview
                      </a>
                      <a
                        href={`/api/files/${file.id}?download=1`}
                        className="text-slate-300 transition hover:text-white"
                      >
                        Download
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </SheetContent>
    </Sheet>
  );
}
