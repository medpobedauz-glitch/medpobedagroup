import Link from "next/link";

import { sendLeadFollowUpEmailAction } from "@/lib/actions/admin";
import { isPreviewableMimeType } from "@/lib/file-utils";
import { SubmitButton } from "@/components/forms/submit-button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

type LeadCommunicationPanelProps = {
  leadId: string;
  model:
    | "contactSubmission"
    | "partnershipLead"
    | "studentMobilityInquiry"
    | "medicalTourismInquiry";
  recipientName: string;
  recipientEmail: string;
  uploadedFiles: Array<{
    id: string;
    originalName: string;
    mimeType: string;
    uploadedAt: Date;
  }>;
  emailLogs: Array<{
    id: string;
    subject: string;
    toEmail: string;
    status: string;
    createdAt: Date;
  }>;
};

export function LeadCommunicationPanel({
  leadId,
  model,
  recipientName,
  recipientEmail,
  uploadedFiles,
  emailLogs,
}: LeadCommunicationPanelProps) {
  return (
    <div className="grid gap-4">
      <Card className="border-white/10 bg-slate-950/26 p-4">
        <p className="text-sm font-semibold text-white">Communication History</p>
        <div className="mt-3 grid gap-3">
          {emailLogs.length ? (
            emailLogs.map((log) => (
              <div
                key={log.id}
                className="rounded-[1rem] border border-white/8 bg-white/6 px-3 py-3 text-sm leading-7 text-slate-300"
              >
                <p className="font-medium text-white">{log.subject}</p>
                <p className="mt-1">{log.toEmail}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.2em] text-slate-500">
                  {log.status} • {log.createdAt.toLocaleString()}
                </p>
              </div>
            ))
          ) : (
            <p className="text-sm text-slate-400">No email history recorded yet.</p>
          )}
        </div>
        <form action={sendLeadFollowUpEmailAction} className="mt-4 grid gap-3">
          <input type="hidden" name="id" value={leadId} />
          <input type="hidden" name="model" value={model} />
          <Input
            name="subject"
            defaultValue={`Follow-up from MedPobeda Group for ${recipientName}`}
            placeholder="Email subject"
          />
          <Textarea
            name="body"
            defaultValue={`Dear ${recipientName},\n\nWe are following up regarding your recent inquiry submitted to MedPobeda Group.\n\nBest regards,\nMedPobeda Group`}
            placeholder="Write the follow-up email body"
            className="min-h-[150px]"
          />
          <label className="inline-flex items-center gap-3 text-sm text-slate-300">
            <input
              type="checkbox"
              name="markContacted"
              value="true"
              className="h-4 w-4 rounded border-white/20 bg-white/10"
              defaultChecked
            />
            Mark this lead as contacted after sending
          </label>
          <SubmitButton
            type="submit"
            variant="outline"
            pendingLabel="Sending follow-up..."
          >
            Send Follow-Up Email
          </SubmitButton>
          <p className="text-xs leading-6 text-slate-500">
            Outbound email will be logged against {recipientEmail}.
          </p>
        </form>
      </Card>

      <Card className="border-white/10 bg-slate-950/26 p-4">
        <p className="text-sm font-semibold text-white">Uploaded Files</p>
        <div className="mt-3 grid gap-3">
          {uploadedFiles.length ? (
            uploadedFiles.map((file) => (
              <div
                key={file.id}
                className="rounded-[1rem] border border-white/8 bg-white/6 px-3 py-3 text-sm text-slate-300"
              >
                <p className="font-medium text-white">{file.originalName}</p>
                <p className="mt-1">{file.uploadedAt.toLocaleString()}</p>
                <div className="mt-3 flex flex-wrap gap-3">
                  <Link
                    href={`/api/files/${file.id}`}
                    target="_blank"
                    className="rounded-full border border-white/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-white/10"
                  >
                    {isPreviewableMimeType(file.mimeType) ? "Preview" : "Open"}
                  </Link>
                  <Link
                    href={`/api/files/${file.id}?download=1`}
                    className="rounded-full border border-white/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-white/10"
                  >
                    Download
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-slate-400">No uploaded files attached to this lead.</p>
          )}
        </div>
      </Card>
    </div>
  );
}
