import {
  CaseTimelineEntryType,
  CommunicationChannel,
  CommunicationDirection,
  PatientCaseStatus,
  TreatmentJourneyStage,
} from "@prisma/client";

import {
  addPatientCaseCommunicationAction,
  addPatientCaseTimelineEntryAction,
  createPatientCaseAction,
  updatePatientCaseAction,
} from "@/lib/actions/operations";
import type { PatientCaseWorkspace as PatientCaseWorkspaceData } from "@/lib/data/operations";
import { formatFileSize, isPreviewableMimeType } from "@/lib/file-utils";
import { startCase } from "@/lib/utils";
import {
  PatientCaseStatusPill,
  TaskStatusPill,
  TreatmentStagePill,
} from "@/components/admin/status-pill";
import { SubmitButton } from "@/components/forms/submit-button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const timelineTypeOptions = Object.values(CaseTimelineEntryType);
const communicationChannels = Object.values(CommunicationChannel);
const communicationDirections = Object.values(CommunicationDirection);
const patientCaseStatuses = Object.values(PatientCaseStatus);
const treatmentJourneyStages = Object.values(TreatmentJourneyStage);
type CaseItem = PatientCaseWorkspaceData["cases"][number];
type InquiryItem = PatientCaseWorkspaceData["inquiryOptions"][number];
type StaffItem = PatientCaseWorkspaceData["staff"][number];
type HospitalItem = PatientCaseWorkspaceData["hospitals"][number];
type CountryItem = PatientCaseWorkspaceData["countries"][number];
type CoordinatorItem = PatientCaseWorkspaceData["coordinators"][number];

export function PatientCaseBoard({
  cases,
  inquiryOptions,
  staff,
  hospitals,
  countries,
  coordinators,
}: PatientCaseWorkspaceData) {
  return (
    <div className="grid gap-6">
      <Card className="border-white/10 p-6">
        <h2 className="font-display text-2xl font-semibold text-white">
          Create Patient Case
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">
          Convert a qualified medical tourism inquiry into a structured patient case
          with an assigned hospital, regional coordinator, case manager, and next
          operational step.
        </p>
        <form action={createPatientCaseAction} className="mt-6 grid gap-4 xl:grid-cols-2">
          <select
            name="medicalTourismInquiryId"
            required
            className="flex h-12 w-full rounded-2xl border border-white/10 bg-white/90 px-4 py-3 text-sm text-slate-950"
          >
            <option value="">Select medical tourism inquiry</option>
            {inquiryOptions.map((inquiry: InquiryItem) => (
              <option key={inquiry.id} value={inquiry.id}>
                {inquiry.name} • {inquiry.treatmentType} • {inquiry.country || "Country pending"}
              </option>
            ))}
          </select>
          <select
            name="assignedManagerId"
            className="flex h-12 w-full rounded-2xl border border-white/10 bg-white/90 px-4 py-3 text-sm text-slate-950"
          >
            <option value="">Assign case manager</option>
            {staff.map((member: StaffItem) => (
              <option key={member.id} value={member.id}>
                {member.name} • {startCase(member.role)}
              </option>
            ))}
          </select>
          <select
            name="countryId"
            className="flex h-12 w-full rounded-2xl border border-white/10 bg-white/90 px-4 py-3 text-sm text-slate-950"
          >
            <option value="">Country routing</option>
            {countries.map((country: CountryItem) => (
              <option key={country.id} value={country.id}>
                {country.name} ({country.code})
              </option>
            ))}
          </select>
          <select
            name="coordinatorId"
            className="flex h-12 w-full rounded-2xl border border-white/10 bg-white/90 px-4 py-3 text-sm text-slate-950"
          >
            <option value="">Regional coordinator</option>
            {coordinators.map((coordinator: CoordinatorItem) => (
              <option key={coordinator.id} value={coordinator.id}>
                {coordinator.name} • {coordinator.country.name}
              </option>
            ))}
          </select>
          <select
            name="assignedHospitalId"
            className="flex h-12 w-full rounded-2xl border border-white/10 bg-white/90 px-4 py-3 text-sm text-slate-950"
          >
            <option value="">Assigned hospital</option>
            {hospitals.map((hospital: HospitalItem) => (
              <option key={hospital.id} value={hospital.id}>
                {hospital.name} • {hospital.country}
              </option>
            ))}
          </select>
          <Input
            name="targetTravelDate"
            type="date"
            placeholder="Target travel date"
          />
          <Input
            name="nextAction"
            placeholder="Next action"
            className="xl:col-span-2"
          />
          <Textarea
            name="summary"
            placeholder="Case summary"
            className="min-h-[100px]"
          />
          <Textarea
            name="treatmentPlan"
            placeholder="Treatment plan or coordination plan"
            className="min-h-[100px]"
          />
          <div className="xl:col-span-2">
            <SubmitButton
              type="submit"
              variant="hero"
              pendingLabel="Creating case..."
            >
              Create Patient Case
            </SubmitButton>
          </div>
        </form>
      </Card>
      {cases.map((patientCase: CaseItem) => (
        <Card key={patientCase.id} className="border-white/10 p-6">
          <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-5">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full border border-white/10 bg-white/8 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-slate-200">
                  {patientCase.caseNumber}
                </span>
                <PatientCaseStatusPill status={patientCase.status} />
                <TreatmentStagePill stage={patientCase.journeyStage} />
              </div>
              <div>
                <h3 className="font-display text-3xl font-semibold text-white">
                  {patientCase.patient.fullName}
                </h3>
                <div className="mt-4 grid gap-2 text-sm leading-7 text-slate-300">
                  <p>Nationality: {patientCase.patient.nationality}</p>
                  {patientCase.country?.name ? <p>Country route: {patientCase.country.name}</p> : null}
                  {patientCase.assignedHospital?.name ? (
                    <p>Hospital: {patientCase.assignedHospital.name}</p>
                  ) : null}
                  {patientCase.coordinator?.name ? (
                    <p>Coordinator: {patientCase.coordinator.name}</p>
                  ) : null}
                  {patientCase.assignedManager?.name ? (
                    <p>Case manager: {patientCase.assignedManager.name}</p>
                  ) : null}
                  {patientCase.targetTravelDate ? (
                    <p>
                      Travel target: {patientCase.targetTravelDate.toLocaleDateString("en-US")}
                    </p>
                  ) : null}
                  {patientCase.nextAction ? <p>Next action: {patientCase.nextAction}</p> : null}
                </div>
              </div>
              {patientCase.summary ? (
                <div className="rounded-[1.4rem] border border-white/8 bg-white/6 p-4">
                  <p className="text-sm font-semibold text-white">Case Summary</p>
                  <p className="mt-3 text-sm leading-7 text-slate-300">{patientCase.summary}</p>
                </div>
              ) : null}
              <div className="grid gap-4 lg:grid-cols-2">
                <div className="rounded-[1.4rem] border border-white/8 bg-white/6 p-4">
                  <p className="text-sm font-semibold text-white">Timeline</p>
                  <div className="mt-4 grid gap-3">
                    {patientCase.timelineEntries.length ? (
                      patientCase.timelineEntries.map((entry: CaseItem["timelineEntries"][number]) => (
                        <div
                          key={entry.id}
                          className="rounded-[1rem] border border-white/8 bg-slate-950/30 px-3 py-3"
                        >
                          <p className="text-sm font-medium text-white">{entry.title}</p>
                          {entry.description ? (
                            <p className="mt-2 text-sm leading-7 text-slate-300">
                              {entry.description}
                            </p>
                          ) : null}
                          <p className="mt-2 text-xs uppercase tracking-[0.18em] text-slate-500">
                            {startCase(entry.entryType)} • {new Date(entry.createdAt).toLocaleString()}
                          </p>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-slate-400">No timeline entries yet.</p>
                    )}
                  </div>
                </div>
                <div className="rounded-[1.4rem] border border-white/8 bg-white/6 p-4">
                  <p className="text-sm font-semibold text-white">Communication Log</p>
                  <div className="mt-4 grid gap-3">
                    {patientCase.communications.length ? (
                      patientCase.communications.map((entry: CaseItem["communications"][number]) => (
                        <div
                          key={entry.id}
                          className="rounded-[1rem] border border-white/8 bg-slate-950/30 px-3 py-3"
                        >
                          <p className="text-sm font-medium text-white">
                            {entry.subject || startCase(entry.channel)}
                          </p>
                          <p className="mt-2 text-sm leading-7 text-slate-300">
                            {entry.content}
                          </p>
                          <p className="mt-2 text-xs uppercase tracking-[0.18em] text-slate-500">
                            {startCase(entry.direction)} • {new Date(entry.createdAt).toLocaleString()}
                          </p>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-slate-400">No communication history yet.</p>
                    )}
                  </div>
                </div>
              </div>
              <div className="rounded-[1.4rem] border border-white/8 bg-white/6 p-4">
                <p className="text-sm font-semibold text-white">Case Files</p>
                <div className="mt-4 grid gap-3">
                  {patientCase.uploadedFiles.length ? (
                    patientCase.uploadedFiles.map((file: CaseItem["uploadedFiles"][number]) => (
                      <div
                        key={file.id}
                        className="rounded-[1rem] border border-white/8 bg-slate-950/30 px-3 py-3"
                      >
                        <p className="text-sm font-medium text-white">
                          {file.documentLabel || file.originalName}
                        </p>
                        <p className="mt-2 text-xs uppercase tracking-[0.18em] text-slate-500">
                          {file.mimeType} • {formatFileSize(file.sizeBytes)} • v{file.version}
                        </p>
                        <div className="mt-3 flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-[0.18em]">
                          <a
                            href={`/api/files/${file.id}`}
                            target="_blank"
                            rel="noreferrer"
                            className="text-cyan-100 transition hover:text-white"
                          >
                            {isPreviewableMimeType(file.mimeType) ? "Preview" : "Open"}
                          </a>
                          <a
                            href={`/api/files/${file.id}?download=1`}
                            className="text-slate-300 transition hover:text-white"
                          >
                            Download
                          </a>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-slate-400">No case files linked yet.</p>
                  )}
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <form
                action={updatePatientCaseAction}
                className="grid gap-3 rounded-[1.5rem] border border-white/10 bg-slate-950/28 p-4"
              >
                <input type="hidden" name="caseId" value={patientCase.id} />
                <p className="text-sm font-semibold text-white">Update Workflow</p>
                <div className="grid gap-3 sm:grid-cols-2">
                  <select
                    name="status"
                    defaultValue={patientCase.status}
                    className="flex h-12 w-full rounded-2xl border border-white/10 bg-white/90 px-4 py-3 text-sm text-slate-950"
                  >
                    {patientCaseStatuses.map((status: (typeof patientCaseStatuses)[number]) => (
                      <option key={status} value={status}>
                        {startCase(status)}
                      </option>
                    ))}
                  </select>
                  <select
                    name="journeyStage"
                    defaultValue={patientCase.journeyStage}
                    className="flex h-12 w-full rounded-2xl border border-white/10 bg-white/90 px-4 py-3 text-sm text-slate-950"
                  >
                    {treatmentJourneyStages.map((stage: (typeof treatmentJourneyStages)[number]) => (
                      <option key={stage} value={stage}>
                        {startCase(stage)}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <select
                    name="countryId"
                    defaultValue={patientCase.countryId ?? ""}
                    className="flex h-12 w-full rounded-2xl border border-white/10 bg-white/90 px-4 py-3 text-sm text-slate-950"
                  >
                    <option value="">Country route</option>
                    {countries.map((country: CountryItem) => (
                      <option key={country.id} value={country.id}>
                        {country.name}
                      </option>
                    ))}
                  </select>
                  <select
                    name="coordinatorId"
                    defaultValue={patientCase.coordinatorId ?? ""}
                    className="flex h-12 w-full rounded-2xl border border-white/10 bg-white/90 px-4 py-3 text-sm text-slate-950"
                  >
                    <option value="">Regional coordinator</option>
                    {coordinators.map((coordinator: CoordinatorItem) => (
                      <option key={coordinator.id} value={coordinator.id}>
                        {coordinator.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <select
                    name="assignedHospitalId"
                    defaultValue={patientCase.assignedHospitalId ?? ""}
                    className="flex h-12 w-full rounded-2xl border border-white/10 bg-white/90 px-4 py-3 text-sm text-slate-950"
                  >
                    <option value="">Assigned hospital</option>
                    {hospitals.map((hospital: HospitalItem) => (
                      <option key={hospital.id} value={hospital.id}>
                        {hospital.name}
                      </option>
                    ))}
                  </select>
                  <select
                    name="assignedManagerId"
                    defaultValue={patientCase.assignedManagerId ?? ""}
                    className="flex h-12 w-full rounded-2xl border border-white/10 bg-white/90 px-4 py-3 text-sm text-slate-950"
                  >
                    <option value="">Case manager</option>
                    {staff.map((member: StaffItem) => (
                      <option key={member.id} value={member.id}>
                        {member.name}
                      </option>
                    ))}
                  </select>
                </div>
                <Input
                  name="targetTravelDate"
                  type="date"
                  defaultValue={
                    patientCase.targetTravelDate
                      ? patientCase.targetTravelDate.toISOString().slice(0, 10)
                      : ""
                  }
                />
                <Input
                  name="nextAction"
                  defaultValue={patientCase.nextAction ?? ""}
                  placeholder="Next action"
                />
                <Textarea
                  name="summary"
                  defaultValue={patientCase.summary ?? ""}
                  className="min-h-[90px]"
                  placeholder="Case summary"
                />
                <Textarea
                  name="treatmentPlan"
                  defaultValue={patientCase.treatmentPlan ?? ""}
                  className="min-h-[90px]"
                  placeholder="Treatment plan"
                />
                <SubmitButton
                  type="submit"
                  variant="secondary"
                  pendingLabel="Saving case..."
                >
                  Save Case Workflow
                </SubmitButton>
              </form>
              <form
                action={addPatientCaseTimelineEntryAction}
                className="grid gap-3 rounded-[1.5rem] border border-white/10 bg-slate-950/28 p-4"
              >
                <input type="hidden" name="patientCaseId" value={patientCase.id} />
                <p className="text-sm font-semibold text-white">Add Timeline Entry</p>
                <Input name="title" placeholder="Entry title" />
                <select
                  name="entryType"
                  defaultValue={CaseTimelineEntryType.NOTE}
                  className="flex h-12 w-full rounded-2xl border border-white/10 bg-white/90 px-4 py-3 text-sm text-slate-950"
                >
                  {timelineTypeOptions.map((entryType: (typeof timelineTypeOptions)[number]) => (
                    <option key={entryType} value={entryType}>
                      {startCase(entryType)}
                    </option>
                  ))}
                </select>
                <Textarea
                  name="description"
                  placeholder="Timeline note"
                  className="min-h-[90px]"
                />
                <SubmitButton
                  type="submit"
                  variant="outline"
                  pendingLabel="Adding note..."
                >
                  Add Timeline Entry
                </SubmitButton>
              </form>
              <form
                action={addPatientCaseCommunicationAction}
                className="grid gap-3 rounded-[1.5rem] border border-white/10 bg-slate-950/28 p-4"
              >
                <input type="hidden" name="patientCaseId" value={patientCase.id} />
                <p className="text-sm font-semibold text-white">Log Communication</p>
                <div className="grid gap-3 sm:grid-cols-2">
                  <select
                    name="channel"
                    defaultValue={CommunicationChannel.INTERNAL_NOTE}
                    className="flex h-12 w-full rounded-2xl border border-white/10 bg-white/90 px-4 py-3 text-sm text-slate-950"
                  >
                    {communicationChannels.map((channel: (typeof communicationChannels)[number]) => (
                      <option key={channel} value={channel}>
                        {startCase(channel)}
                      </option>
                    ))}
                  </select>
                  <select
                    name="direction"
                    defaultValue={CommunicationDirection.INTERNAL}
                    className="flex h-12 w-full rounded-2xl border border-white/10 bg-white/90 px-4 py-3 text-sm text-slate-950"
                  >
                    {communicationDirections.map((direction: (typeof communicationDirections)[number]) => (
                      <option key={direction} value={direction}>
                        {startCase(direction)}
                      </option>
                    ))}
                  </select>
                </div>
                <Input name="subject" placeholder="Subject" />
                <Textarea
                  name="content"
                  placeholder="Communication detail"
                  className="min-h-[110px]"
                />
                <SubmitButton
                  type="submit"
                  variant="outline"
                  pendingLabel="Logging communication..."
                >
                  Save Communication
                </SubmitButton>
              </form>
              <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/28 p-4">
                <p className="text-sm font-semibold text-white">Linked Tasks</p>
                <div className="mt-4 grid gap-3">
                  {patientCase.tasks.length ? (
                    patientCase.tasks.map((task: CaseItem["tasks"][number]) => (
                      <div
                        key={task.id}
                        className="rounded-[1rem] border border-white/8 bg-white/6 px-3 py-3"
                      >
                        <div className="flex flex-wrap items-center gap-3">
                          <TaskStatusPill status={task.status} />
                          <span className="text-xs uppercase tracking-[0.18em] text-slate-500">
                            {task.assignedTo?.name || "Unassigned"}
                          </span>
                        </div>
                        <p className="mt-3 text-sm font-medium text-white">{task.title}</p>
                        {task.description ? (
                          <p className="mt-2 text-sm leading-7 text-slate-300">
                            {task.description}
                          </p>
                        ) : null}
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-slate-400">No case-linked tasks yet.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
