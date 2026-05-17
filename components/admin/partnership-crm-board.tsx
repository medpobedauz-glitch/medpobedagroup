import { AgreementStatus, MeetingType, PartnershipStatus } from "@prisma/client";

import {
  addPartnershipNoteAction,
  createContactPersonAction,
  createHospitalAction,
  createPartnershipMeetingAction,
  updatePartnershipStatusAction,
  uploadPartnershipDocumentAction,
} from "@/lib/actions/admin";
import { getHospitalsForAdmin } from "@/lib/data/partnerships";
import { startCase } from "@/lib/utils";
import { SubmitButton } from "@/components/forms/submit-button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type PartnershipCrmBoardProps = {
  partnerships: Awaited<
    ReturnType<typeof import("@/lib/data/partnerships").getPartnershipCrmData>
  >;
};

const partnershipStatuses = Object.values(PartnershipStatus);
const agreementStatuses = Object.values(AgreementStatus);
const meetingTypes = Object.values(MeetingType);

export async function PartnershipCrmBoard({
  partnerships,
}: PartnershipCrmBoardProps) {
  const hospitals = await getHospitalsForAdmin();

  return (
    <div className="grid gap-6">
      <Card className="border-white/10 p-6">
        <h2 className="font-display text-2xl font-semibold text-white">
          Add Hospital and Initialize CRM Record
        </h2>
        <form action={createHospitalAction} className="mt-5 grid gap-4 lg:grid-cols-3">
          <Input name="name" placeholder="Hospital name" required />
          <Input name="country" placeholder="Country" required />
          <Input name="city" placeholder="City" />
          <Input name="website" placeholder="Website" />
          <Input name="hospitalType" placeholder="Hospital type" />
          <Input name="internationalDeskEmail" placeholder="International desk email" />
          <Input name="internationalDeskPhone" placeholder="International desk phone" />
          <select
            name="status"
            defaultValue={PartnershipStatus.PROSPECT}
            className="flex h-12 w-full rounded-2xl border border-white/10 bg-white/90 px-4 py-3 text-sm text-slate-950"
          >
            {partnershipStatuses.map((status) => (
              <option key={status} value={status}>
                {startCase(status)}
              </option>
            ))}
          </select>
          <Textarea
            name="description"
            placeholder="Hospital description or international partnership context"
            className="lg:col-span-3"
          />
          <SubmitButton type="submit" variant="hero" pendingLabel="Creating hospital...">
            Create Hospital Record
          </SubmitButton>
        </form>
      </Card>
      {partnerships.map((partnership) => (
        <Card key={partnership.id} className="border-white/10 p-6">
          <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
            <div>
              <div className="flex flex-wrap gap-3">
                <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-100">
                  {startCase(partnership.collaborationStatus)}
                </span>
                <span className="rounded-full border border-white/10 bg-white/8 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-slate-300">
                  {partnership.country}
                </span>
                <span className="rounded-full border border-white/10 bg-white/8 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-slate-300">
                  Agreement: {startCase(partnership.agreementStatus)}
                </span>
              </div>
              <h3 className="mt-4 font-display text-3xl font-semibold text-white">
                {partnership.hospital.name}
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-300">
                {partnership.summary || "No CRM summary has been recorded yet."}
              </p>
              <div className="mt-5 grid gap-3 text-sm text-slate-300">
                {partnership.hospital.website ? <p>{partnership.hospital.website}</p> : null}
                {partnership.hospital.internationalDeskEmail ? (
                  <p>{partnership.hospital.internationalDeskEmail}</p>
                ) : null}
                {partnership.nextStep ? (
                  <p className="text-cyan-100">Next step: {partnership.nextStep}</p>
                ) : null}
              </div>
              <div className="mt-6 rounded-[1.4rem] border border-white/10 bg-slate-950/28 p-4">
                <p className="text-sm font-semibold text-white">Contact Persons</p>
                <div className="mt-3 grid gap-3">
                  {partnership.contacts.length ? (
                    partnership.contacts.map((contact) => (
                      <div
                        key={contact.id}
                        className="rounded-[1rem] border border-white/8 bg-white/6 px-3 py-3 text-sm text-slate-300"
                      >
                        <p className="font-medium text-white">{contact.name}</p>
                        <p>{contact.role || "No role provided"}</p>
                        <p>
                          {contact.email ||
                            contact.phone ||
                            contact.telegram ||
                            "No direct contact recorded"}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-slate-400">No contact people recorded yet.</p>
                  )}
                </div>
                <form action={createContactPersonAction} className="mt-4 grid gap-3">
                  <input type="hidden" name="partnershipId" value={partnership.id} />
                  <input type="hidden" name="hospitalId" value={partnership.hospitalId} />
                  <Input name="name" placeholder="Contact name" />
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Input name="role" placeholder="Role" />
                    <Input name="email" placeholder="Email" />
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Input name="phone" placeholder="Phone" />
                    <Input name="telegram" placeholder="Telegram" />
                  </div>
                  <SubmitButton
                    type="submit"
                    variant="outline"
                    pendingLabel="Adding contact..."
                  >
                    Add Contact Person
                  </SubmitButton>
                </form>
              </div>
            </div>
            <div className="space-y-4">
              <form
                action={updatePartnershipStatusAction}
                className="grid gap-3 rounded-[1.4rem] border border-white/10 bg-slate-950/28 p-4 lg:grid-cols-[1fr_1fr_1fr_auto]"
              >
                <input type="hidden" name="id" value={partnership.id} />
                <select
                  name="status"
                  defaultValue={partnership.collaborationStatus}
                  className="flex h-12 w-full rounded-2xl border border-white/10 bg-white/90 px-4 py-3 text-sm text-slate-950"
                >
                  {partnershipStatuses.map((status) => (
                    <option key={status} value={status}>
                      {startCase(status)}
                    </option>
                  ))}
                </select>
                <select
                  name="agreementStatus"
                  defaultValue={partnership.agreementStatus}
                  className="flex h-12 w-full rounded-2xl border border-white/10 bg-white/90 px-4 py-3 text-sm text-slate-950"
                >
                  {agreementStatuses.map((status) => (
                    <option key={status} value={status}>
                      {startCase(status)}
                    </option>
                  ))}
                </select>
                <Input
                  name="nextStep"
                  defaultValue={partnership.nextStep ?? ""}
                  placeholder="Next step"
                />
                <SubmitButton type="submit" variant="secondary" pendingLabel="Saving...">
                  Save
                </SubmitButton>
              </form>
              <div className="grid gap-4 lg:grid-cols-2">
                <div className="rounded-[1.4rem] border border-white/10 bg-slate-950/28 p-4">
                  <p className="text-sm font-semibold text-white">Recent Notes</p>
                  <div className="mt-3 grid gap-3">
                    {partnership.notes.length ? (
                      partnership.notes.map((note) => (
                        <div
                          key={note.id}
                          className="rounded-[1rem] border border-white/8 bg-white/6 px-3 py-3 text-sm text-slate-300"
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
                  <form action={addPartnershipNoteAction} className="mt-4 grid gap-3">
                    <input type="hidden" name="partnershipId" value={partnership.id} />
                    <Textarea
                      name="content"
                      placeholder="Add partnership note"
                      className="min-h-[90px]"
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
                <div className="rounded-[1.4rem] border border-white/10 bg-slate-950/28 p-4">
                  <p className="text-sm font-semibold text-white">Meeting History</p>
                  <div className="mt-3 grid gap-3">
                    {partnership.meetings.length ? (
                      partnership.meetings.map((meeting) => (
                        <div
                          key={meeting.id}
                          className="rounded-[1rem] border border-white/8 bg-white/6 px-3 py-3 text-sm text-slate-300"
                        >
                          <p className="font-medium text-white">{meeting.title}</p>
                          <p>
                            {startCase(meeting.meetingType)} •{" "}
                            {meeting.meetingAt.toLocaleString()}
                          </p>
                          {meeting.outcome ? <p className="mt-2">{meeting.outcome}</p> : null}
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-slate-400">No meetings scheduled yet.</p>
                    )}
                  </div>
                  <form action={createPartnershipMeetingAction} className="mt-4 grid gap-3">
                    <input type="hidden" name="partnershipId" value={partnership.id} />
                    <select
                      name="hospitalId"
                      defaultValue={partnership.hospitalId}
                      className="flex h-12 w-full rounded-2xl border border-white/10 bg-white/90 px-4 py-3 text-sm text-slate-950"
                    >
                      {hospitals.map((hospital) => (
                        <option key={hospital.id} value={hospital.id}>
                          {hospital.name}
                        </option>
                      ))}
                    </select>
                    <Input name="title" placeholder="Meeting title" />
                    <select
                      name="meetingType"
                      defaultValue={MeetingType.CALL}
                      className="flex h-12 w-full rounded-2xl border border-white/10 bg-white/90 px-4 py-3 text-sm text-slate-950"
                    >
                      {meetingTypes.map((type) => (
                        <option key={type} value={type}>
                          {startCase(type)}
                        </option>
                      ))}
                    </select>
                    <Input name="meetingAt" type="datetime-local" />
                    <Input name="location" placeholder="Meeting link or location" />
                    <Textarea
                      name="notes"
                      placeholder="Agenda or meeting notes"
                      className="min-h-[90px]"
                    />
                    <Input name="outcome" placeholder="Expected outcome" />
                    <SubmitButton
                      type="submit"
                      variant="outline"
                      pendingLabel="Scheduling..."
                    >
                      Add Meeting
                    </SubmitButton>
                  </form>
                </div>
              </div>
              <div className="grid gap-4 lg:grid-cols-2">
                <div className="rounded-[1.4rem] border border-white/10 bg-slate-950/28 p-4">
                  <p className="text-sm font-semibold text-white">Partnership Documents</p>
                  <div className="mt-3 grid gap-3">
                    {partnership.uploadedFiles.length ? (
                      partnership.uploadedFiles.map((file) => (
                        <a
                          key={file.id}
                          href={`/api/files/${file.id}`}
                          className="rounded-[1rem] border border-white/8 bg-white/6 px-3 py-3 text-sm text-slate-300 transition hover:bg-white/10"
                        >
                          {file.originalName}
                        </a>
                      ))
                    ) : (
                      <p className="text-sm text-slate-400">No documents uploaded yet.</p>
                    )}
                  </div>
                  <form
                    action={uploadPartnershipDocumentAction}
                    encType="multipart/form-data"
                    className="mt-4 grid gap-3"
                  >
                    <input type="hidden" name="partnershipId" value={partnership.id} />
                    <input type="hidden" name="hospitalId" value={partnership.hospitalId} />
                    <select
                      name="category"
                      defaultValue="PARTNERSHIP_DOCUMENT"
                      className="flex h-12 w-full rounded-2xl border border-white/10 bg-white/90 px-4 py-3 text-sm text-slate-950"
                    >
                      <option value="PARTNERSHIP_DOCUMENT">Partnership document</option>
                      <option value="AGREEMENT_DOCUMENT">Agreement document</option>
                    </select>
                    <Input
                      type="file"
                      name="file"
                      accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                    />
                    <SubmitButton
                      type="submit"
                      variant="outline"
                      pendingLabel="Uploading..."
                    >
                      Upload Document
                    </SubmitButton>
                  </form>
                </div>
                <div className="rounded-[1.4rem] border border-white/10 bg-slate-950/28 p-4">
                  <p className="text-sm font-semibold text-white">Related Leads</p>
                  <div className="mt-3 grid gap-3">
                    {partnership.leads.length ? (
                      partnership.leads.map((lead) => (
                        <div
                          key={lead.id}
                          className="rounded-[1rem] border border-white/8 bg-white/6 px-3 py-3 text-sm text-slate-300"
                        >
                          <p className="font-medium text-white">{lead.name}</p>
                          <p>{lead.organization || "No organization"}</p>
                          <p>{lead.email}</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-slate-400">No linked partnership leads yet.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
