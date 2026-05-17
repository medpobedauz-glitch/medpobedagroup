import { LeadPriority, TaskStatus } from "@prisma/client";

import {
  createCountryAction,
  createCountryOfficeAction,
  createRegionalCoordinatorAction,
  createStaffTaskAction,
  markNotificationReadAction,
  updateStaffTaskStatusAction,
} from "@/lib/actions/operations";
import type { OperationsWorkspace as OperationsWorkspaceData } from "@/lib/data/operations";
import { startCase } from "@/lib/utils";
import { AdminStatCard } from "@/components/admin/admin-stat-card";
import {
  NotificationTypePill,
  PriorityPill,
  TaskStatusPill,
} from "@/components/admin/status-pill";
import { SubmitButton } from "@/components/forms/submit-button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  BellRing,
  BrainCircuit,
  Building2,
  Clock3,
  Globe2,
  UserCog,
} from "lucide-react";

const languageOptions = ["EN", "RU", "UZ", "AR", "HI"] as const;
const taskStatuses = Object.values(TaskStatus);
const taskPriorities = Object.values(LeadPriority);
type CountryItem = OperationsWorkspaceData["countries"][number];
type OfficeItem = CountryItem["offices"][number];
type StaffItem = OperationsWorkspaceData["staff"][number];
type TaskItem = OperationsWorkspaceData["tasks"][number];
type NotificationItem = OperationsWorkspaceData["notifications"][number];
type AssessmentItem = OperationsWorkspaceData["assessments"][number];

export function OperationsWorkspace({
  countries,
  tasks,
  notifications,
  assessments,
  staff,
  metrics,
}: OperationsWorkspaceData) {
  const officeOptions = countries.flatMap((country: CountryItem) =>
    country.offices.map((office: OfficeItem) => ({
      id: office.id,
      label: `${country.name} • ${office.officeName}`,
    })),
  );

  return (
    <div className="grid gap-6">
      <div className="grid gap-5 xl:grid-cols-3">
        <AdminStatCard
          label="Active Countries"
          value={String(metrics.activeCountries)}
          description="Configured country operations, routing zones, and office coverage."
          icon={<Globe2 className="h-6 w-6" />}
        />
        <AdminStatCard
          label="Coordinators"
          value={String(metrics.activeCoordinators)}
          description="Regional coordinators available for cross-border case handling."
          icon={<UserCog className="h-6 w-6" />}
        />
        <AdminStatCard
          label="Open Patient Cases"
          value={String(metrics.openCaseCount)}
          description="Live patient case records currently moving through operations."
          icon={<Building2 className="h-6 w-6" />}
        />
        <AdminStatCard
          label="Overdue Tasks"
          value={String(metrics.overdueTasks)}
          description="Operational follow-ups that have crossed their due time."
          icon={<Clock3 className="h-6 w-6" />}
        />
        <AdminStatCard
          label="Unread Notifications"
          value={String(metrics.unreadNotifications)}
          description="Internal alerts waiting for staff review or acknowledgement."
          icon={<BellRing className="h-6 w-6" />}
        />
        <AdminStatCard
          label="Ready Assessments"
          value={String(metrics.readyAssessments)}
          description="AI-ready routing assessments available for operational review."
          icon={<BrainCircuit className="h-6 w-6" />}
        />
      </div>
      <div className="grid gap-6 xl:grid-cols-[1.02fr_0.98fr]">
        <Card className="border-white/10 p-6">
          <h2 className="font-display text-2xl font-semibold text-white">
            Country Operations Registry
          </h2>
          <div className="mt-6 grid gap-4">
            {countries.map((country: CountryItem) => (
              <div
                key={country.id}
                className="rounded-[1.5rem] border border-white/8 bg-white/6 p-4"
              >
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full border border-white/10 bg-white/8 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-white">
                    {country.code}
                  </span>
                  <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-100">
                    {country.region}
                  </span>
                  {country.isPriorityMarket ? (
                    <span className="rounded-full border border-amber-300/20 bg-amber-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-amber-100">
                      Priority Market
                    </span>
                  ) : null}
                </div>
                <h3 className="mt-4 text-xl font-semibold text-white">{country.name}</h3>
                <div className="mt-3 grid gap-2 text-sm leading-7 text-slate-300">
                  <p>Timezone: {country.timezone}</p>
                  <p>
                    Languages:{" "}
                    {country.languages
                      .map((item: CountryItem["languages"][number]) => startCase(item))
                      .join(", ")}
                  </p>
                  <p>
                    Offices: {country._count.offices} • Coordinators: {country._count.coordinators} •
                    Hospitals: {country._count.hospitals} • Cases: {country._count.patientCases}
                  </p>
                </div>
                <div className="mt-4 grid gap-3 lg:grid-cols-2">
                  <div className="rounded-[1rem] border border-white/8 bg-slate-950/28 p-3">
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
                      Offices
                    </p>
                    <div className="mt-3 grid gap-2">
                      {country.offices.length ? (
                        country.offices.map((office: OfficeItem) => (
                          <div key={office.id} className="text-sm text-slate-300">
                            {office.officeName} • {office.city}
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-slate-400">No office recorded yet.</p>
                      )}
                    </div>
                  </div>
                  <div className="rounded-[1rem] border border-white/8 bg-slate-950/28 p-3">
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
                      Coordinators
                    </p>
                    <div className="mt-3 grid gap-2">
                      {country.coordinators.length ? (
                        country.coordinators.map((coordinator: CountryItem["coordinators"][number]) => (
                          <div key={coordinator.id} className="text-sm text-slate-300">
                            {coordinator.name} • {coordinator.user?.name || "No linked user"}
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-slate-400">No coordinator assigned yet.</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
        <div className="grid gap-6">
          <Card className="border-white/10 p-6">
            <h2 className="font-display text-2xl font-semibold text-white">Add Country</h2>
            <form action={createCountryAction} className="mt-5 grid gap-3">
              <div className="grid gap-3 sm:grid-cols-2">
                <Input name="code" placeholder="Country code" />
                <Input name="name" placeholder="Country name" />
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <Input name="localName" placeholder="Local name" />
                <Input name="region" placeholder="Region" />
              </div>
              <Input name="timezone" placeholder="Timezone" />
              <div className="grid gap-2">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
                  Languages
                </p>
                <div className="flex flex-wrap gap-3">
                  {languageOptions.map((language: (typeof languageOptions)[number]) => (
                    <label
                      key={language}
                      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/8 px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-200"
                    >
                      <input type="checkbox" name="languages" value={language} />
                      {language}
                    </label>
                  ))}
                </div>
              </div>
              <label className="inline-flex items-center gap-3 text-sm text-slate-300">
                <input type="checkbox" name="isPriorityMarket" />
                Mark as priority market
              </label>
              <SubmitButton type="submit" variant="hero" pendingLabel="Saving country...">
                Save Country
              </SubmitButton>
            </form>
          </Card>
          <Card className="border-white/10 p-6">
            <h2 className="font-display text-2xl font-semibold text-white">
              Add Country Office
            </h2>
            <form action={createCountryOfficeAction} className="mt-5 grid gap-3">
              <select
                name="countryId"
                className="flex h-12 w-full rounded-2xl border border-white/10 bg-white/90 px-4 py-3 text-sm text-slate-950"
              >
                <option value="">Country</option>
                {countries.map((country: CountryItem) => (
                  <option key={country.id} value={country.id}>
                    {country.name}
                  </option>
                ))}
              </select>
              <div className="grid gap-3 sm:grid-cols-2">
                <Input name="officeName" placeholder="Office name" />
                <Input name="city" placeholder="City" />
              </div>
              <Input name="timezone" placeholder="Timezone" />
              <Textarea name="address" placeholder="Address" className="min-h-[90px]" />
              <div className="grid gap-3 sm:grid-cols-2">
                <Input name="contactEmail" placeholder="Contact email" />
                <Input name="contactPhone" placeholder="Contact phone" />
              </div>
              <Input name="telegram" placeholder="Telegram" />
              <label className="inline-flex items-center gap-3 text-sm text-slate-300">
                <input type="checkbox" name="isPrimary" />
                Primary office
              </label>
              <SubmitButton type="submit" variant="secondary" pendingLabel="Saving office...">
                Save Office
              </SubmitButton>
            </form>
          </Card>
          <Card className="border-white/10 p-6">
            <h2 className="font-display text-2xl font-semibold text-white">
              Add Regional Coordinator
            </h2>
            <form action={createRegionalCoordinatorAction} className="mt-5 grid gap-3">
              <select
                name="userId"
                className="flex h-12 w-full rounded-2xl border border-white/10 bg-white/90 px-4 py-3 text-sm text-slate-950"
              >
                <option value="">Linked staff user</option>
                {staff.map((member: StaffItem) => (
                  <option key={member.id} value={member.id}>
                    {member.name} • {startCase(member.role)}
                  </option>
                ))}
              </select>
              <div className="grid gap-3 sm:grid-cols-2">
                <select
                  name="countryId"
                  className="flex h-12 w-full rounded-2xl border border-white/10 bg-white/90 px-4 py-3 text-sm text-slate-950"
                >
                  <option value="">Country</option>
                  {countries.map((country: CountryItem) => (
                    <option key={country.id} value={country.id}>
                      {country.name}
                    </option>
                  ))}
                </select>
                <select
                  name="officeId"
                  className="flex h-12 w-full rounded-2xl border border-white/10 bg-white/90 px-4 py-3 text-sm text-slate-950"
                >
                  <option value="">Office</option>
                  {officeOptions.map((office: (typeof officeOptions)[number]) => (
                    <option key={office.id} value={office.id}>
                      {office.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <Input name="name" placeholder="Coordinator name" />
                <Input name="email" placeholder="Coordinator email" />
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <Input name="phone" placeholder="Phone" />
                <Input name="telegram" placeholder="Telegram" />
              </div>
              <Input name="specialization" placeholder="Specialization" />
              <Input name="timezone" placeholder="Timezone" />
              <div className="flex flex-wrap gap-3">
                {languageOptions.map((language: (typeof languageOptions)[number]) => (
                  <label
                    key={language}
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/8 px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-200"
                  >
                    <input type="checkbox" name="languages" value={language} />
                    {language}
                  </label>
                ))}
              </div>
              <SubmitButton
                type="submit"
                variant="outline"
                pendingLabel="Saving coordinator..."
              >
                Save Coordinator
              </SubmitButton>
            </form>
          </Card>
        </div>
      </div>
      <div className="grid gap-6 xl:grid-cols-[0.98fr_1.02fr]">
        <Card className="border-white/10 p-6">
          <h2 className="font-display text-2xl font-semibold text-white">
            Task Management
          </h2>
          <form action={createStaffTaskAction} className="mt-6 grid gap-3">
            <Input name="title" placeholder="Task title" />
            <Textarea
              name="description"
              placeholder="Task description"
              className="min-h-[90px]"
            />
            <div className="grid gap-3 sm:grid-cols-2">
              <select
                name="priority"
                defaultValue={LeadPriority.MEDIUM}
                className="flex h-12 w-full rounded-2xl border border-white/10 bg-white/90 px-4 py-3 text-sm text-slate-950"
              >
                {taskPriorities.map((priority: (typeof taskPriorities)[number]) => (
                  <option key={priority} value={priority}>
                    {startCase(priority)}
                  </option>
                ))}
              </select>
              <select
                name="assignedToId"
                className="flex h-12 w-full rounded-2xl border border-white/10 bg-white/90 px-4 py-3 text-sm text-slate-950"
              >
                <option value="">Assigned staff</option>
                {staff.map((member: StaffItem) => (
                  <option key={member.id} value={member.id}>
                    {member.name}
                  </option>
                ))}
              </select>
            </div>
            <Input name="patientCaseId" placeholder="Linked patient case ID (optional)" />
            <Input name="leadModel" placeholder="Linked lead model (optional)" />
            <Input name="leadId" placeholder="Linked lead ID (optional)" />
            <Input name="dueAt" type="datetime-local" />
            <SubmitButton type="submit" variant="hero" pendingLabel="Creating task...">
              Create Task
            </SubmitButton>
          </form>
          <div className="mt-6 grid gap-3">
            {tasks.map((task: TaskItem) => (
              <div
                key={task.id}
                className="rounded-[1.4rem] border border-white/8 bg-white/6 p-4"
              >
                <div className="flex flex-wrap items-center gap-3">
                  <TaskStatusPill status={task.status} />
                  <PriorityPill priority={task.priority} />
                  <span className="text-xs uppercase tracking-[0.18em] text-slate-500">
                    {task.assignedTo?.name || "Unassigned"}
                  </span>
                </div>
                <p className="mt-3 text-base font-semibold text-white">{task.title}</p>
                {task.description ? (
                  <p className="mt-2 text-sm leading-7 text-slate-300">{task.description}</p>
                ) : null}
                <div className="mt-3 flex flex-wrap gap-3 text-xs uppercase tracking-[0.18em] text-slate-500">
                  {task.patientCase?.caseNumber ? <span>{task.patientCase.caseNumber}</span> : null}
                  {task.partnership?.hospital?.name ? <span>{task.partnership.hospital.name}</span> : null}
                  {task.dueAt ? <span>Due {task.dueAt.toLocaleString()}</span> : null}
                </div>
                <form action={updateStaffTaskStatusAction} className="mt-4 flex gap-3">
                  <input type="hidden" name="taskId" value={task.id} />
                  <select
                    name="status"
                    defaultValue={task.status}
                    className="flex h-10 w-full rounded-2xl border border-white/10 bg-white/90 px-4 py-2 text-sm text-slate-950"
                  >
                    {taskStatuses.map((status: (typeof taskStatuses)[number]) => (
                      <option key={status} value={status}>
                        {startCase(status)}
                      </option>
                    ))}
                  </select>
                  <SubmitButton
                    type="submit"
                    size="sm"
                    variant="outline"
                    pendingLabel="Updating..."
                  >
                    Update
                  </SubmitButton>
                </form>
              </div>
            ))}
          </div>
        </Card>
        <div className="grid gap-6">
          <Card className="border-white/10 p-6">
            <h2 className="font-display text-2xl font-semibold text-white">
              Internal Notifications
            </h2>
            <div className="mt-6 grid gap-3">
              {notifications.map((notification: NotificationItem) => (
                <div
                  key={notification.id}
                  className="rounded-[1.4rem] border border-white/8 bg-white/6 p-4"
                >
                  <div className="flex flex-wrap items-center gap-3">
                    <NotificationTypePill type={notification.type} />
                    <span className="text-xs uppercase tracking-[0.18em] text-slate-500">
                      {notification.user.name}
                    </span>
                    <span className="text-xs uppercase tracking-[0.18em] text-slate-500">
                      {notification.status}
                    </span>
                  </div>
                  <p className="mt-3 text-base font-semibold text-white">{notification.title}</p>
                  <p className="mt-2 text-sm leading-7 text-slate-300">
                    {notification.message}
                  </p>
                  <div className="mt-3 flex items-center justify-between gap-3">
                    <span className="text-xs uppercase tracking-[0.18em] text-slate-500">
                      {notification.createdAt.toLocaleString()}
                    </span>
                    {notification.status === "UNREAD" ? (
                      <form action={markNotificationReadAction}>
                        <input
                          type="hidden"
                          name="notificationId"
                          value={notification.id}
                        />
                        <SubmitButton
                          type="submit"
                          size="sm"
                          variant="outline"
                          pendingLabel="Saving..."
                        >
                          Mark Read
                        </SubmitButton>
                      </form>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </Card>
          <Card className="border-white/10 p-6">
            <h2 className="font-display text-2xl font-semibold text-white">
              AI-Ready Routing Queue
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              These internal assessments prepare the platform for multilingual lead
              scoring, country-aware routing, and coordinator recommendation without
              exposing automation publicly.
            </p>
            <div className="mt-6 grid gap-3">
              {assessments.map((assessment: AssessmentItem) => (
                <div
                  key={assessment.id}
                  className="rounded-[1.4rem] border border-white/8 bg-white/6 p-4"
                >
                  <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.18em] text-slate-500">
                    <span>{assessment.leadModel}</span>
                    <span>Score {assessment.leadScore ?? "NA"}</span>
                    <span>{assessment.status}</span>
                  </div>
                  <p className="mt-3 text-base font-semibold text-white">
                    {assessment.routingRecommendation || "Routing recommendation pending"}
                  </p>
                  {assessment.suggestedCoordinator ? (
                    <p className="mt-2 text-sm leading-7 text-slate-300">
                      Suggested coordinator: {assessment.suggestedCoordinator.name} •{" "}
                      {assessment.suggestedCoordinator.country.name}
                    </p>
                  ) : null}
                  {assessment.summary ? (
                    <p className="mt-2 text-sm leading-7 text-slate-300">
                      {assessment.summary}
                    </p>
                  ) : null}
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
