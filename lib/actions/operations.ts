"use server";

import {
  CaseTimelineEntryType,
  LeadPriority,
  UserRole,
} from "@prisma/client";
import { revalidatePath } from "next/cache";

import { logAuditEvent } from "@/lib/audit";
import { requireAdminUser } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma";
import { assertValidServerActionOrigin } from "@/lib/security/origin";
import { markNotificationAsRead } from "@/lib/services/notification-service";
import {
  addPatientCaseCommunication,
  addPatientCaseTimelineEntry,
  createPatientCaseFromInquiry,
  updatePatientCaseWorkflow,
} from "@/lib/services/patient-case-service";
import {
  createOperationalTask,
  updateOperationalTaskStatus,
} from "@/lib/services/task-service";
import {
  caseCommunicationSchema,
  caseTimelineEntrySchema,
  countryOfficeSchema,
  countrySchema,
  notificationReadSchema,
  patientCaseCreateSchema,
  patientCaseUpdateSchema,
  regionalCoordinatorSchema,
  staffTaskSchema,
  taskStatusSchema,
} from "@/lib/validators/operations";
import { toOptionalString, toRequiredString } from "@/lib/utils";

function toOptionalDate(value: FormDataEntryValue | null | undefined) {
  if (typeof value !== "string" || !value.trim()) {
    return undefined;
  }

  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? undefined : parsed;
}

function toBoolean(value: FormDataEntryValue | null | undefined) {
  return value === "on" || value === "true";
}

function getLanguageSelections(formData: FormData) {
  return formData.getAll("languages").filter((value): value is string => typeof value === "string");
}

function revalidateOperationsSurface() {
  [
    "/admin",
    "/admin/cases",
    "/admin/operations",
    "/admin/medical-tourism",
  ].forEach((path) => revalidatePath(path));
}

export async function createCountryAction(formData: FormData) {
  assertValidServerActionOrigin();
  const user = await requireAdminUser([UserRole.SUPER_ADMIN, UserRole.ADMIN]);

  const parsed = countrySchema.parse({
    code: toRequiredString(formData.get("code")).toUpperCase(),
    name: toRequiredString(formData.get("name")),
    localName: toOptionalString(formData.get("localName")),
    region: toRequiredString(formData.get("region")),
    timezone: toRequiredString(formData.get("timezone")),
    languages: getLanguageSelections(formData),
    isPriorityMarket: toBoolean(formData.get("isPriorityMarket")),
  });

  const country = await prisma.country.upsert({
    where: { code: parsed.code },
    create: parsed,
    update: parsed,
  });

  await logAuditEvent({
    actorId: user.id,
    action: "operations.country.saved",
    entityType: "country",
    entityId: country.id,
    description: `Country operations record saved for ${country.name}.`,
  });

  revalidateOperationsSurface();
}

export async function createCountryOfficeAction(formData: FormData) {
  assertValidServerActionOrigin();
  const user = await requireAdminUser([UserRole.SUPER_ADMIN, UserRole.ADMIN]);

  const parsed = countryOfficeSchema.parse({
    countryId: toRequiredString(formData.get("countryId")),
    officeName: toRequiredString(formData.get("officeName")),
    city: toRequiredString(formData.get("city")),
    address: toOptionalString(formData.get("address")),
    contactEmail: toOptionalString(formData.get("contactEmail")),
    contactPhone: toOptionalString(formData.get("contactPhone")),
    telegram: toOptionalString(formData.get("telegram")),
    timezone: toRequiredString(formData.get("timezone")),
    isPrimary: toBoolean(formData.get("isPrimary")),
  });

  const office = await prisma.countryOffice.create({
    data: parsed,
  });

  await logAuditEvent({
    actorId: user.id,
    action: "operations.office.created",
    entityType: "countryOffice",
    entityId: office.id,
    description: `Country office created for ${parsed.officeName}.`,
  });

  revalidateOperationsSurface();
}

export async function createRegionalCoordinatorAction(formData: FormData) {
  assertValidServerActionOrigin();
  const user = await requireAdminUser([UserRole.SUPER_ADMIN, UserRole.ADMIN]);

  const parsed = regionalCoordinatorSchema.parse({
    userId: toOptionalString(formData.get("userId")),
    countryId: toRequiredString(formData.get("countryId")),
    officeId: toOptionalString(formData.get("officeId")),
    name: toRequiredString(formData.get("name")),
    email: toRequiredString(formData.get("email")),
    phone: toOptionalString(formData.get("phone")),
    telegram: toOptionalString(formData.get("telegram")),
    specialization: toOptionalString(formData.get("specialization")),
    languages: getLanguageSelections(formData),
    timezone: toRequiredString(formData.get("timezone")),
  });

  const coordinator = await prisma.regionalCoordinator.create({
    data: parsed,
  });

  await logAuditEvent({
    actorId: user.id,
    action: "operations.coordinator.created",
    entityType: "regionalCoordinator",
    entityId: coordinator.id,
    description: `Regional coordinator created for ${parsed.name}.`,
  });

  revalidateOperationsSurface();
}

export async function createPatientCaseAction(formData: FormData) {
  assertValidServerActionOrigin();
  const user = await requireAdminUser();

  const parsed = patientCaseCreateSchema.parse({
    medicalTourismInquiryId: toRequiredString(formData.get("medicalTourismInquiryId")),
    countryId: toOptionalString(formData.get("countryId")),
    coordinatorId: toOptionalString(formData.get("coordinatorId")),
    assignedHospitalId: toOptionalString(formData.get("assignedHospitalId")),
    assignedManagerId: toOptionalString(formData.get("assignedManagerId")),
    summary: toOptionalString(formData.get("summary")),
    treatmentPlan: toOptionalString(formData.get("treatmentPlan")),
    nextAction: toOptionalString(formData.get("nextAction")),
    targetTravelDate: toOptionalDate(formData.get("targetTravelDate"))?.toISOString(),
  });

  const patientCase = await createPatientCaseFromInquiry({
    ...parsed,
    targetTravelDate: parsed.targetTravelDate ? new Date(parsed.targetTravelDate) : undefined,
    actorId: user.id,
  });

  await logAuditEvent({
    actorId: user.id,
    action: "case.created",
    entityType: "patientCase",
    entityId: patientCase.id,
    description: `Patient case ${patientCase.caseNumber} created.`,
  });

  revalidateOperationsSurface();
}

export async function updatePatientCaseAction(formData: FormData) {
  assertValidServerActionOrigin();
  const user = await requireAdminUser();

  const parsed = patientCaseUpdateSchema.parse({
    caseId: toRequiredString(formData.get("caseId")),
    status: toRequiredString(formData.get("status")),
    journeyStage: toRequiredString(formData.get("journeyStage")),
    countryId: toOptionalString(formData.get("countryId")),
    coordinatorId: toOptionalString(formData.get("coordinatorId")),
    assignedHospitalId: toOptionalString(formData.get("assignedHospitalId")),
    assignedManagerId: toOptionalString(formData.get("assignedManagerId")),
    summary: toOptionalString(formData.get("summary")),
    treatmentPlan: toOptionalString(formData.get("treatmentPlan")),
    nextAction: toOptionalString(formData.get("nextAction")),
    targetTravelDate: toOptionalDate(formData.get("targetTravelDate"))?.toISOString(),
  });

  await updatePatientCaseWorkflow({
    ...parsed,
    targetTravelDate: parsed.targetTravelDate ? new Date(parsed.targetTravelDate) : undefined,
    actorId: user.id,
  });

  await logAuditEvent({
    actorId: user.id,
    action: "case.updated",
    entityType: "patientCase",
    entityId: parsed.caseId,
    description: `Patient case workflow updated to ${parsed.status}.`,
  });

  revalidateOperationsSurface();
}

export async function addPatientCaseTimelineEntryAction(formData: FormData) {
  assertValidServerActionOrigin();
  const user = await requireAdminUser();

  const parsed = caseTimelineEntrySchema.parse({
    patientCaseId: toRequiredString(formData.get("patientCaseId")),
    title: toRequiredString(formData.get("title")),
    description: toOptionalString(formData.get("description")),
    entryType:
      toOptionalString(formData.get("entryType")) ?? CaseTimelineEntryType.NOTE,
  });

  await addPatientCaseTimelineEntry({
    ...parsed,
    actorId: user.id,
  });

  await logAuditEvent({
    actorId: user.id,
    action: "case.timeline.added",
    entityType: "patientCase",
    entityId: parsed.patientCaseId,
    description: `Case timeline entry added: ${parsed.title}.`,
  });

  revalidateOperationsSurface();
}

export async function addPatientCaseCommunicationAction(formData: FormData) {
  assertValidServerActionOrigin();
  const user = await requireAdminUser();

  const parsed = caseCommunicationSchema.parse({
    patientCaseId: toRequiredString(formData.get("patientCaseId")),
    channel: toRequiredString(formData.get("channel")),
    direction: toRequiredString(formData.get("direction")),
    subject: toOptionalString(formData.get("subject")),
    content: toRequiredString(formData.get("content")),
  });

  await addPatientCaseCommunication({
    ...parsed,
    actorId: user.id,
  });

  await logAuditEvent({
    actorId: user.id,
    action: "case.communication.added",
    entityType: "patientCase",
    entityId: parsed.patientCaseId,
    description: `Case communication logged via ${parsed.channel}.`,
  });

  revalidateOperationsSurface();
}

export async function createStaffTaskAction(formData: FormData) {
  assertValidServerActionOrigin();
  const user = await requireAdminUser();

  const parsed = staffTaskSchema.parse({
    title: toRequiredString(formData.get("title")),
    description: toOptionalString(formData.get("description")),
    priority:
      toOptionalString(formData.get("priority")) ?? LeadPriority.MEDIUM,
    assignedToId: toOptionalString(formData.get("assignedToId")),
    patientCaseId: toOptionalString(formData.get("patientCaseId")),
    partnershipId: toOptionalString(formData.get("partnershipId")),
    leadModel: toOptionalString(formData.get("leadModel")),
    leadId: toOptionalString(formData.get("leadId")),
    dueAt: toOptionalDate(formData.get("dueAt"))?.toISOString(),
  });

  const task = await createOperationalTask({
    ...parsed,
    dueAt: parsed.dueAt ? new Date(parsed.dueAt) : undefined,
    createdById: user.id,
  });

  await logAuditEvent({
    actorId: user.id,
    action: "task.created",
    entityType: "staffTask",
    entityId: task.id,
    description: `Task created: ${task.title}.`,
  });

  revalidateOperationsSurface();
}

export async function updateStaffTaskStatusAction(formData: FormData) {
  assertValidServerActionOrigin();
  const user = await requireAdminUser();

  const parsed = taskStatusSchema.parse({
    taskId: toRequiredString(formData.get("taskId")),
    status: toRequiredString(formData.get("status")),
  });

  await updateOperationalTaskStatus(parsed.taskId, parsed.status);

  await logAuditEvent({
    actorId: user.id,
    action: "task.status.updated",
    entityType: "staffTask",
    entityId: parsed.taskId,
    description: `Task moved to ${parsed.status}.`,
  });

  revalidateOperationsSurface();
}

export async function markNotificationReadAction(formData: FormData) {
  assertValidServerActionOrigin();
  const user = await requireAdminUser();

  const parsed = notificationReadSchema.parse({
    notificationId: toRequiredString(formData.get("notificationId")),
  });

  await markNotificationAsRead(parsed.notificationId, user.id);

  await logAuditEvent({
    actorId: user.id,
    action: "notification.read",
    entityType: "internalNotification",
    entityId: parsed.notificationId,
    description: "Internal notification marked as read.",
  });

  revalidateOperationsSurface();
}
