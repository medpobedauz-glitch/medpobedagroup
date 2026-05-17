import { InquiryStatus } from "@prisma/client";

import {
  addLeadNoteAction,
  updateLeadStatusAction,
} from "@/lib/actions/admin";
import type { AdminInquiryFeedItem } from "@/lib/data/dashboard";
import { SubmitButton } from "@/components/forms/submit-button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

type InquiryFeedTableProps = {
  items: AdminInquiryFeedItem[];
};

const statusOptions = Object.values(InquiryStatus);

export function InquiryFeedTable({ items }: InquiryFeedTableProps) {
  if (!items.length) {
    return (
      <Card className="border-white/10 p-6 text-slate-300">
        No inquiries match the current filter set.
      </Card>
    );
  }

  return (
    <div className="grid gap-5">
      {items.map((item) => (
        <Card key={`${item.model}-${item.id}`} className="border-white/10 p-6">
          <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
            <div className="max-w-3xl">
              <div className="flex flex-wrap gap-3">
                <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-100">
                  {item.inquiryType.replace(/_/g, " ")}
                </span>
                <span className="rounded-full border border-white/10 bg-white/8 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-slate-300">
                  {item.status}
                </span>
                <span className="rounded-full border border-white/10 bg-white/8 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-slate-300">
                  {item.model}
                </span>
              </div>
              <h3 className="mt-4 font-display text-2xl font-semibold text-white">
                {item.name}
              </h3>
              <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-300">
                <span>{item.organization || "No organization provided"}</span>
                <span>{item.email}</span>
                {item.country ? <span>{item.country}</span> : null}
                {item.phone ? <span>{item.phone}</span> : null}
                {item.telegram ? <span>{item.telegram}</span> : null}
              </div>
              {item.secondaryLabel ? (
                <p className="mt-4 text-sm font-medium text-cyan-100/80">
                  {item.secondaryLabel}
                </p>
              ) : null}
              <p className="mt-4 text-base leading-8 text-slate-200">{item.message}</p>
              <div className="mt-4 text-xs uppercase tracking-[0.24em] text-slate-400">
                {item.createdAt.toLocaleString()}
              </div>
            </div>
            <div className="w-full max-w-xl space-y-4">
              <form action={updateLeadStatusAction} className="grid gap-3 md:grid-cols-[1fr_auto]">
                <input type="hidden" name="id" value={item.id} />
                <input type="hidden" name="model" value={item.model} />
                <select
                  name="status"
                  defaultValue={item.status}
                  className="flex h-12 w-full rounded-2xl border border-white/10 bg-white/90 px-4 py-3 text-sm text-slate-950"
                >
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
                <SubmitButton
                  type="submit"
                  variant="secondary"
                  pendingLabel="Updating..."
                >
                  Update Status
                </SubmitButton>
              </form>
              <div className="rounded-[1.4rem] border border-white/10 bg-slate-950/26 p-4">
                <p className="text-sm font-semibold text-white">
                  Notes ({item.noteCount})
                </p>
                {item.notes.length ? (
                  <div className="mt-3 grid gap-3">
                    {item.notes.map((note) => (
                      <div
                        key={note.id}
                        className="rounded-[1rem] border border-white/8 bg-white/6 px-3 py-3 text-sm leading-7 text-slate-300"
                      >
                        <p>{note.content}</p>
                        <p className="mt-2 text-xs uppercase tracking-[0.2em] text-slate-500">
                          {note.authorName} • {note.createdAt.toLocaleDateString()}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="mt-3 text-sm text-slate-400">No notes added yet.</p>
                )}
                <form action={addLeadNoteAction} className="mt-4 grid gap-3">
                  <input type="hidden" name="id" value={item.id} />
                  <input type="hidden" name="model" value={item.model} />
                  <Textarea
                    name="content"
                    placeholder="Add an internal note for this lead"
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
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

