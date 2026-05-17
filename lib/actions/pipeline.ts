"use server";

import { InquiryStatus, PipelineStage } from "@prisma/client";
import { revalidatePath } from "next/cache";

import { logAuditEvent } from "@/lib/audit";
import { requireAdminUser } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma";
import { assertValidServerActionOrigin } from "@/lib/security/origin";
import { leadPipelineStageSchema, leadReminderSchema } from "@/lib/validators/inquiries";
import { toOptionalString, toRequiredString, unique } from "@/lib/utils";

function revalidatePipelineWorkspace() {
  [
    "/admin",
    "/admin/leads",
    "/admin/medical-tourism",
    "/admin/student-mobility",
    "/admin/pipeline",
  ].forEach((path) => revalidatePath(path));
}

function mapPipelineStageToStatus(stage: PipelineStage) {
  if (stage === PipelineStage.CONTACTED) {
    return InquiryStatus.CONTACTED;
  }

  if (stage === PipelineStage.QUALIFIED) {
    return InquiryStatus.QUALIFIED;
  }

  if (stage === PipelineStage.NEGOTIATION) {
    return InquiryStatus.IN_PROGRESS;
  }

  if (stage === PipelineStage.CONVERTED) {
    return InquiryStatus.WON;
  }

  if (stage === PipelineStage.CLOSED) {
    return InquiryStatus.CLOSED;
  }

  return InquiryStatus.NEW;
}

function normalizeTags(value?: string | null) {
  if (!value) {
    return [];
  }

  return unique(
    value
      .split(",")
      .map((tag) => tag.trim().toLowerCase())
      .filter(Boolean),
  );
}

export async function updateLeadPipelineStageAction(formData: FormData) {
  assertValidServerActionOrigin();
  const user = await requireAdminUser();

  const parsed = leadPipelineStageSchema.parse({
    id: toRequiredString(formData.get("id")),
    model: toRequiredString(formData.get("model")),
    pipelineStage: toRequiredString(formData.get("pipelineStage")),
    assignedToId: toOptionalString(formData.get("assignedToId")) ?? "",
    tags: toOptionalString(formData.get("tags")),
  });

  const now = new Date();
  const data = {
    pipelineStage: parsed.pipelineStage,
    status: mapPipelineStageToStatus(parsed.pipelineStage),
    assignedToId: parsed.assignedToId || null,
    tags: normalizeTags(parsed.tags),
  };

  if (parsed.model === "contactSubmission") {
    const existing = await prisma.contactSubmission.findUnique({
      where: { id: parsed.id },
      select: {
        firstContactedAt: true,
        qualifiedAt: true,
        convertedAt: true,
      },
    });

    await prisma.contactSubmission.update({
      where: { id: parsed.id },
      data: {
        ...data,
        firstContactedAt:
          parsed.pipelineStage === PipelineStage.CONTACTED
            ? existing?.firstContactedAt ?? now
            : undefined,
        qualifiedAt:
          parsed.pipelineStage === PipelineStage.QUALIFIED
            ? existing?.qualifiedAt ?? now
            : undefined,
        convertedAt:
          parsed.pipelineStage === PipelineStage.CONVERTED
            ? existing?.convertedAt ?? now
            : undefined,
      },
    });
  } else if (parsed.model === "partnershipLead") {
    const existing = await prisma.partnershipLead.findUnique({
      where: { id: parsed.id },
      select: {
        firstContactedAt: true,
        qualifiedAt: true,
        convertedAt: true,
      },
    });

    await prisma.partnershipLead.update({
      where: { id: parsed.id },
      data: {
        ...data,
        firstContactedAt:
          parsed.pipelineStage === PipelineStage.CONTACTED
            ? existing?.firstContactedAt ?? now
            : undefined,
        qualifiedAt:
          parsed.pipelineStage === PipelineStage.QUALIFIED
            ? existing?.qualifiedAt ?? now
            : undefined,
        convertedAt:
          parsed.pipelineStage === PipelineStage.CONVERTED
            ? existing?.convertedAt ?? now
            : undefined,
      },
    });
  } else if (parsed.model === "studentMobilityInquiry") {
    const existing = await prisma.studentMobilityInquiry.findUnique({
      where: { id: parsed.id },
      select: {
        firstContactedAt: true,
        qualifiedAt: true,
        convertedAt: true,
      },
    });

    await prisma.studentMobilityInquiry.update({
      where: { id: parsed.id },
      data: {
        ...data,
        firstContactedAt:
          parsed.pipelineStage === PipelineStage.CONTACTED
            ? existing?.firstContactedAt ?? now
            : undefined,
        qualifiedAt:
          parsed.pipelineStage === PipelineStage.QUALIFIED
            ? existing?.qualifiedAt ?? now
            : undefined,
        convertedAt:
          parsed.pipelineStage === PipelineStage.CONVERTED
            ? existing?.convertedAt ?? now
            : undefined,
      },
    });
  } else {
    const existing = await prisma.medicalTourismInquiry.findUnique({
      where: { id: parsed.id },
      select: {
        firstContactedAt: true,
        qualifiedAt: true,
        convertedAt: true,
      },
    });

    await prisma.medicalTourismInquiry.update({
      where: { id: parsed.id },
      data: {
        ...data,
        firstContactedAt:
          parsed.pipelineStage === PipelineStage.CONTACTED
            ? existing?.firstContactedAt ?? now
            : undefined,
        qualifiedAt:
          parsed.pipelineStage === PipelineStage.QUALIFIED
            ? existing?.qualifiedAt ?? now
            : undefined,
        convertedAt:
          parsed.pipelineStage === PipelineStage.CONVERTED
            ? existing?.convertedAt ?? now
            : undefined,
      },
    });
  }

  await logAuditEvent({
    actorId: user.id,
    action: "lead.pipeline.updated",
    entityType: parsed.model,
    entityId: parsed.id,
    description: `Lead pipeline updated to ${parsed.pipelineStage}.`,
    metadata: {
      assignedToId: parsed.assignedToId || null,
      tags: normalizeTags(parsed.tags),
    },
  });

  revalidatePipelineWorkspace();
}

export async function createLeadReminderAction(formData: FormData) {
  assertValidServerActionOrigin();
  const user = await requireAdminUser();

  const parsed = leadReminderSchema.parse({
    leadId: toRequiredString(formData.get("leadId")),
    leadModel: toRequiredString(formData.get("leadModel")),
    title: toRequiredString(formData.get("title")),
    note: toOptionalString(formData.get("note")),
    dueAt: toRequiredString(formData.get("dueAt")),
    priority: toRequiredString(formData.get("priority")),
    assignedToId: toOptionalString(formData.get("assignedToId")) ?? "",
  });

  const reminder = await prisma.leadReminder.create({
    data: {
      leadId: parsed.leadId,
      leadModel: parsed.leadModel,
      title: parsed.title,
      note: parsed.note,
      dueAt: new Date(parsed.dueAt),
      priority: parsed.priority,
      assignedToId: parsed.assignedToId || null,
      createdById: user.id,
    },
  });

  await logAuditEvent({
    actorId: user.id,
    action: "lead.reminder.created",
    entityType: parsed.leadModel,
    entityId: parsed.leadId,
    description: `Reminder scheduled: ${reminder.title}.`,
    metadata: {
      dueAt: reminder.dueAt.toISOString(),
      assignedToId: reminder.assignedToId,
    },
  });

  revalidatePipelineWorkspace();
}

export async function completeLeadReminderAction(formData: FormData) {
  assertValidServerActionOrigin();
  const user = await requireAdminUser();

  const reminderId = toRequiredString(formData.get("reminderId"));
  const nextState = formData.get("isCompleted") === "true";

  const reminder = await prisma.leadReminder.update({
    where: { id: reminderId },
    data: {
      isCompleted: nextState,
    },
  });

  await logAuditEvent({
    actorId: user.id,
    action: nextState ? "lead.reminder.completed" : "lead.reminder.reopened",
    entityType: reminder.leadModel,
    entityId: reminder.leadId,
    description: `${nextState ? "Completed" : "Reopened"} reminder "${reminder.title}".`,
  });

  revalidatePipelineWorkspace();
}
