import "server-only";

import {
  CaseTimelineEntryType,
  type CommunicationChannel,
  type CommunicationDirection,
  type LeadPriority,
  type PatientCaseStatus,
  type TreatmentJourneyStage,
} from "@prisma/client";

import { prisma } from "@/lib/prisma";
import { getPatientCaseById } from "@/lib/repositories/patient-case-repository";
import { notifyUsers } from "@/lib/services/notification-service";
import { createOperationalTask } from "@/lib/services/task-service";

function generateCaseNumber() {
  const date = new Date();
  const stamp = `${date.getUTCFullYear()}${String(date.getUTCMonth() + 1).padStart(2, "0")}${String(
    date.getUTCDate(),
  ).padStart(2, "0")}`;
  const entropy = Math.random().toString(36).slice(2, 6).toUpperCase();

  return `MPC-${stamp}-${entropy}`;
}

export async function createPatientCaseFromInquiry({
  medicalTourismInquiryId,
  countryId,
  coordinatorId,
  assignedHospitalId,
  assignedManagerId,
  summary,
  treatmentPlan,
  nextAction,
  targetTravelDate,
  actorId,
}: {
  medicalTourismInquiryId: string;
  countryId?: string | null;
  coordinatorId?: string | null;
  assignedHospitalId?: string | null;
  assignedManagerId?: string | null;
  summary?: string | null;
  treatmentPlan?: string | null;
  nextAction?: string | null;
  targetTravelDate?: Date | null;
  actorId?: string | null;
}) {
  const inquiry = await prisma.medicalTourismInquiry.findUnique({
    where: { id: medicalTourismInquiryId },
    include: {
      patient: true,
      assignedHospital: true,
      assignedTo: {
        select: {
          id: true,
          name: true,
          role: true,
        },
      },
    },
  });

  if (!inquiry) {
    throw new Error("Medical tourism inquiry not found.");
  }

  let patientId = inquiry.patientId;
  if (!patientId) {
    const patient = await prisma.patient.create({
      data: {
        fullName: inquiry.name,
        nationality: inquiry.patientNationality,
        country: inquiry.country,
        phone: inquiry.phone,
        telegram: inquiry.telegram,
        email: inquiry.email,
      },
    });
    patientId = patient.id;
  }

  const patientCase = await prisma.patientCase.create({
    data: {
      caseNumber: generateCaseNumber(),
      patientId,
      medicalTourismInquiryId,
      countryId: countryId ?? undefined,
      coordinatorId: coordinatorId ?? undefined,
      assignedHospitalId: assignedHospitalId || inquiry.assignedHospitalId || undefined,
      assignedManagerId: assignedManagerId || inquiry.assignedToId || undefined,
      summary: summary || inquiry.reportsSummary || undefined,
      treatmentPlan: treatmentPlan ?? undefined,
      nextAction: nextAction ?? undefined,
      targetTravelDate: targetTravelDate ?? undefined,
    },
  });

  await prisma.caseTimelineEntry.create({
    data: {
      patientCaseId: patientCase.id,
      title: "Case opened",
      description: `Patient case created from medical tourism inquiry ${inquiry.id}.`,
      entryType: CaseTimelineEntryType.STATUS_UPDATE,
      createdById: actorId ?? undefined,
    },
  });

  await createOperationalTask({
    title: `Review patient case ${patientCase.caseNumber}`,
    description: nextAction || "Confirm case review, hospital fit, and next coordination step.",
    priority: inquiry.urgencyLevel === "CRITICAL" ? "URGENT" : "HIGH",
    assignedToId: assignedManagerId || inquiry.assignedToId || undefined,
    createdById: actorId ?? undefined,
    patientCaseId: patientCase.id,
    leadModel: "medicalTourismInquiry",
    leadId: inquiry.id,
    dueAt: targetTravelDate ?? undefined,
  });

  const coordinator = coordinatorId
    ? await prisma.regionalCoordinator.findUnique({
        where: { id: coordinatorId },
        include: {
          user: {
            select: {
              id: true,
            },
          },
        },
      })
    : null;

  await notifyUsers({
    userIds: [assignedManagerId || inquiry.assignedToId, coordinator?.user?.id],
    type: "CASE",
    title: "New patient case created",
    message: `${patientCase.caseNumber} is ready for coordination.`,
    link: "/admin/cases",
    metadata: {
      patientCaseId: patientCase.id,
      medicalTourismInquiryId,
    },
  });

  return patientCase;
}

export async function updatePatientCaseWorkflow({
  caseId,
  status,
  journeyStage,
  countryId,
  coordinatorId,
  assignedHospitalId,
  assignedManagerId,
  summary,
  treatmentPlan,
  nextAction,
  targetTravelDate,
  actorId,
}: {
  caseId: string;
  status: PatientCaseStatus;
  journeyStage: TreatmentJourneyStage;
  countryId?: string | null;
  coordinatorId?: string | null;
  assignedHospitalId?: string | null;
  assignedManagerId?: string | null;
  summary?: string | null;
  treatmentPlan?: string | null;
  nextAction?: string | null;
  targetTravelDate?: Date | null;
  actorId?: string | null;
}) {
  const currentCase = await getPatientCaseById(caseId);

  if (!currentCase) {
    throw new Error("Patient case not found.");
  }

  const updatedCase = await prisma.patientCase.update({
    where: { id: caseId },
    data: {
      status,
      journeyStage,
      countryId: countryId ?? null,
      coordinatorId: coordinatorId ?? null,
      assignedHospitalId: assignedHospitalId ?? null,
      assignedManagerId: assignedManagerId ?? null,
      summary: summary ?? null,
      treatmentPlan: treatmentPlan ?? null,
      nextAction: nextAction ?? null,
      targetTravelDate: targetTravelDate ?? null,
    },
  });

  if (
    currentCase.status !== status ||
    currentCase.journeyStage !== journeyStage ||
    currentCase.nextAction !== nextAction
  ) {
    await prisma.caseTimelineEntry.create({
      data: {
        patientCaseId: caseId,
        title: "Case workflow updated",
        description: `Status moved to ${status} and journey stage moved to ${journeyStage}.`,
        entryType: CaseTimelineEntryType.STATUS_UPDATE,
        createdById: actorId ?? undefined,
      },
    });
  }

  await notifyUsers({
    userIds: [assignedManagerId ?? currentCase.assignedManagerId, currentCase.coordinator?.userId],
    type: "CASE",
    title: "Patient case updated",
    message: `${currentCase.caseNumber} moved to ${status}.`,
    link: "/admin/cases",
    metadata: {
      patientCaseId: caseId,
      status,
      journeyStage,
    },
  });

  return updatedCase;
}

export async function addPatientCaseTimelineEntry({
  patientCaseId,
  title,
  description,
  entryType,
  actorId,
}: {
  patientCaseId: string;
  title: string;
  description?: string | null;
  entryType: CaseTimelineEntryType;
  actorId?: string | null;
}) {
  return prisma.caseTimelineEntry.create({
    data: {
      patientCaseId,
      title,
      description: description ?? undefined,
      entryType,
      createdById: actorId ?? undefined,
    },
  });
}

export async function addPatientCaseCommunication({
  patientCaseId,
  channel,
  direction,
  subject,
  content,
  actorId,
}: {
  patientCaseId: string;
  channel: CommunicationChannel;
  direction: CommunicationDirection;
  subject?: string | null;
  content: string;
  actorId?: string | null;
}) {
  return prisma.caseCommunicationLog.create({
    data: {
      patientCaseId,
      channel,
      direction,
      subject: subject ?? undefined,
      content,
      createdById: actorId ?? undefined,
    },
  });
}

export function getTaskPriorityFromCaseStatus(status: PatientCaseStatus): LeadPriority {
  if (status === "TRAVEL_READY" || status === "ADMITTED") {
    return "HIGH";
  }

  if (status === "COORDINATING") {
    return "MEDIUM";
  }

  return "LOW";
}
