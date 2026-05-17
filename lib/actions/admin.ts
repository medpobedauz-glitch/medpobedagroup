"use server";

import bcrypt from "bcryptjs";
import {
  FileCategory,
  InquiryStatus,
  MeetingType,
  PipelineStage,
  UserRole,
} from "@prisma/client";
import { revalidatePath } from "next/cache";

import { logAuditEvent } from "@/lib/audit";
import { requireAdminUser, requireSuperAdmin } from "@/lib/auth/session";
import { buildFollowUpEmail, sendEmail } from "@/lib/email";
import { prisma } from "@/lib/prisma";
import { assertValidServerActionOrigin } from "@/lib/security/origin";
import { storeUploadedFile } from "@/lib/uploads";
import {
  adminUserSchema,
  adminUserUpdateSchema,
} from "@/lib/validators/auth";
import {
  leadFollowUpEmailSchema,
  leadNoteSchema,
  leadStatusSchema,
  leadWorkflowSchema,
} from "@/lib/validators/inquiries";
import {
  contactPersonSchema,
  hospitalSchema,
  partnershipMeetingSchema,
  partnershipNoteSchema,
  partnershipStatusSchema,
} from "@/lib/validators/partnership";
import { slugify, toOptionalString, toRequiredString } from "@/lib/utils";

function revalidateAdminWorkspace() {
  revalidatePath("/admin");
  revalidatePath("/admin/leads");
  revalidatePath("/admin/medical-tourism");
  revalidatePath("/admin/student-mobility");
  revalidatePath("/admin/partnerships");
  revalidatePath("/admin/hospitals");
  revalidatePath("/admin/settings");
}

function parseLeadTags(value?: string | null) {
  if (!value) {
    return [];
  }

  return Array.from(
    new Set(
      value
        .split(",")
        .map((tag) => tag.trim().toLowerCase())
        .filter(Boolean),
    ),
  );
}

function resolvePipelineStage(status: InquiryStatus, pipelineStage?: PipelineStage) {
  if (pipelineStage) {
    return pipelineStage;
  }

  if (status === InquiryStatus.CONTACTED) return PipelineStage.CONTACTED;
  if (status === InquiryStatus.QUALIFIED) return PipelineStage.QUALIFIED;
  if (status === InquiryStatus.IN_PROGRESS) return PipelineStage.NEGOTIATION;
  if (status === InquiryStatus.WON) return PipelineStage.CONVERTED;
  if (
    status === InquiryStatus.CLOSED ||
    status === InquiryStatus.REJECTED ||
    status === InquiryStatus.LOST
  ) {
    return PipelineStage.CLOSED;
  }

  return PipelineStage.NEW;
}

export async function updateLeadStatusAction(formData: FormData) {
  assertValidServerActionOrigin();
  const user = await requireAdminUser();

  const parsed = leadStatusSchema.parse({
    id: toRequiredString(formData.get("id")),
    model: toRequiredString(formData.get("model")),
    status: toRequiredString(formData.get("status")),
  });

  const data = { status: parsed.status };

  if (parsed.model === "contactSubmission") {
    await prisma.contactSubmission.update({ where: { id: parsed.id }, data });
  } else if (parsed.model === "partnershipLead") {
    await prisma.partnershipLead.update({ where: { id: parsed.id }, data });
  } else if (parsed.model === "studentMobilityInquiry") {
    await prisma.studentMobilityInquiry.update({
      where: { id: parsed.id },
      data,
    });
  } else {
    await prisma.medicalTourismInquiry.update({
      where: { id: parsed.id },
      data,
    });
  }

  await logAuditEvent({
    actorId: user.id,
    action: "lead.status.updated",
    entityType: parsed.model,
    entityId: parsed.id,
    description: `Lead status updated to ${parsed.status}.`,
  });

  revalidateAdminWorkspace();
}

export async function updateLeadWorkflowAction(formData: FormData) {
  assertValidServerActionOrigin();
  const user = await requireAdminUser();

  const parsed = leadWorkflowSchema.parse({
    id: toRequiredString(formData.get("id")),
    model: toRequiredString(formData.get("model")),
    status: toRequiredString(formData.get("status")),
    priority: toRequiredString(formData.get("priority")),
    pipelineStage: toOptionalString(formData.get("pipelineStage")) ?? undefined,
    assignedToId: toOptionalString(formData.get("assignedToId")) ?? "",
    assignedHospitalId: toOptionalString(formData.get("assignedHospitalId")) ?? "",
    tags: toOptionalString(formData.get("tags")),
    closedReason: toOptionalString(formData.get("closedReason")),
  });

  const now = new Date();
  const pipelineStage = resolvePipelineStage(parsed.status, parsed.pipelineStage);
  const workflowData = {
    status: parsed.status,
    pipelineStage,
    priority: parsed.priority,
    assignedToId: parsed.assignedToId || null,
    tags: parseLeadTags(parsed.tags),
    closedReason:
      parsed.status === InquiryStatus.CLOSED || parsed.status === InquiryStatus.REJECTED
        ? parsed.closedReason ?? null
        : null,
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
        ...workflowData,
        firstContactedAt:
          pipelineStage === PipelineStage.CONTACTED
            ? existing?.firstContactedAt ?? now
            : undefined,
        qualifiedAt:
          pipelineStage === PipelineStage.QUALIFIED
            ? existing?.qualifiedAt ?? now
            : undefined,
        convertedAt:
          pipelineStage === PipelineStage.CONVERTED
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
        ...workflowData,
        firstContactedAt:
          pipelineStage === PipelineStage.CONTACTED
            ? existing?.firstContactedAt ?? now
            : undefined,
        qualifiedAt:
          pipelineStage === PipelineStage.QUALIFIED
            ? existing?.qualifiedAt ?? now
            : undefined,
        convertedAt:
          pipelineStage === PipelineStage.CONVERTED
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
        ...workflowData,
        firstContactedAt:
          pipelineStage === PipelineStage.CONTACTED
            ? existing?.firstContactedAt ?? now
            : undefined,
        qualifiedAt:
          pipelineStage === PipelineStage.QUALIFIED
            ? existing?.qualifiedAt ?? now
            : undefined,
        convertedAt:
          pipelineStage === PipelineStage.CONVERTED
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
        ...workflowData,
        assignedHospitalId: parsed.assignedHospitalId || null,
        firstContactedAt:
          pipelineStage === PipelineStage.CONTACTED
            ? existing?.firstContactedAt ?? now
            : undefined,
        qualifiedAt:
          pipelineStage === PipelineStage.QUALIFIED
            ? existing?.qualifiedAt ?? now
            : undefined,
        convertedAt:
          pipelineStage === PipelineStage.CONVERTED
            ? existing?.convertedAt ?? now
            : undefined,
      },
    });
  }

  await logAuditEvent({
    actorId: user.id,
    action: "lead.workflow.updated",
    entityType: parsed.model,
    entityId: parsed.id,
    description: `Workflow updated to ${parsed.status} with ${parsed.priority} priority.`,
    metadata: {
      assignedToId: parsed.assignedToId || null,
      assignedHospitalId: parsed.assignedHospitalId || null,
      pipelineStage,
      tags: parseLeadTags(parsed.tags),
    },
  });

  revalidateAdminWorkspace();
}

export async function markLeadContactedAction(formData: FormData) {
  formData.set("status", InquiryStatus.CONTACTED);
  formData.set("pipelineStage", PipelineStage.CONTACTED);
  formData.set("closedReason", "");
  await updateLeadWorkflowAction(formData);
}

export async function addLeadNoteAction(formData: FormData) {
  assertValidServerActionOrigin();
  const user = await requireAdminUser();

  const parsed = leadNoteSchema.parse({
    id: toRequiredString(formData.get("id")),
    model: toRequiredString(formData.get("model")),
    content: toRequiredString(formData.get("content")),
  });

  await prisma.leadNote.create({
    data: {
      authorId: user.id,
      content: parsed.content,
      ...(parsed.model === "contactSubmission"
        ? { contactSubmissionId: parsed.id }
        : parsed.model === "partnershipLead"
          ? { partnershipLeadId: parsed.id }
          : parsed.model === "studentMobilityInquiry"
            ? { studentMobilityInquiryId: parsed.id }
            : { medicalTourismInquiryId: parsed.id }),
    },
  });

  await logAuditEvent({
    actorId: user.id,
    action: "lead.note.added",
    entityType: parsed.model,
    entityId: parsed.id,
    description: "Internal lead note added.",
  });

  revalidateAdminWorkspace();
}

export async function sendLeadFollowUpEmailAction(formData: FormData) {
  assertValidServerActionOrigin();
  const user = await requireAdminUser();

  const parsed = leadFollowUpEmailSchema.parse({
    id: toRequiredString(formData.get("id")),
    model: toRequiredString(formData.get("model")),
    subject: toRequiredString(formData.get("subject")),
    body: toRequiredString(formData.get("body")),
    markContacted: toOptionalString(formData.get("markContacted")) ?? undefined,
  });

  const lead =
    parsed.model === "contactSubmission"
      ? await prisma.contactSubmission.findUnique({
          where: { id: parsed.id },
          select: { id: true, name: true, email: true },
        })
      : parsed.model === "partnershipLead"
        ? await prisma.partnershipLead.findUnique({
            where: { id: parsed.id },
            select: { id: true, name: true, email: true },
          })
        : parsed.model === "studentMobilityInquiry"
          ? await prisma.studentMobilityInquiry.findUnique({
              where: { id: parsed.id },
              select: { id: true, name: true, email: true },
            })
          : await prisma.medicalTourismInquiry.findUnique({
              where: { id: parsed.id },
              select: { id: true, name: true, email: true },
            });

  if (!lead) {
    throw new Error("Lead not found.");
  }

  const template = buildFollowUpEmail({
    subject: parsed.subject,
    greetingName: lead.name,
    body: parsed.body,
  });

  await sendEmail({
    to: lead.email,
    subject: parsed.subject,
    html: template.html,
    text: template.text,
    templateKey: "admin-follow-up",
    log: {
      sentByUserId: user.id,
      ...(parsed.model === "contactSubmission"
        ? { contactSubmissionId: lead.id }
        : parsed.model === "partnershipLead"
          ? { partnershipLeadId: lead.id }
          : parsed.model === "studentMobilityInquiry"
            ? { studentMobilityInquiryId: lead.id }
            : { medicalTourismInquiryId: lead.id }),
      metadata: {
        source: "admin-dashboard",
      },
    },
  });

  if (parsed.markContacted) {
    if (parsed.model === "contactSubmission") {
      await prisma.contactSubmission.update({
        where: { id: lead.id },
        data: {
          status: InquiryStatus.CONTACTED,
          pipelineStage: PipelineStage.CONTACTED,
          firstContactedAt: new Date(),
        },
      });
    } else if (parsed.model === "partnershipLead") {
      await prisma.partnershipLead.update({
        where: { id: lead.id },
        data: {
          status: InquiryStatus.CONTACTED,
          pipelineStage: PipelineStage.CONTACTED,
          firstContactedAt: new Date(),
        },
      });
    } else if (parsed.model === "studentMobilityInquiry") {
      await prisma.studentMobilityInquiry.update({
        where: { id: lead.id },
        data: {
          status: InquiryStatus.CONTACTED,
          pipelineStage: PipelineStage.CONTACTED,
          firstContactedAt: new Date(),
        },
      });
    } else {
      await prisma.medicalTourismInquiry.update({
        where: { id: lead.id },
        data: {
          status: InquiryStatus.CONTACTED,
          pipelineStage: PipelineStage.CONTACTED,
          firstContactedAt: new Date(),
        },
      });
    }
  }

  await logAuditEvent({
    actorId: user.id,
    action: "lead.followup.sent",
    entityType: parsed.model,
    entityId: lead.id,
    description: `Follow-up email sent to ${lead.email}.`,
    metadata: {
      subject: parsed.subject,
      markContacted: parsed.markContacted,
    },
  });

  revalidateAdminWorkspace();
}

export async function updatePartnershipStatusAction(formData: FormData) {
  assertValidServerActionOrigin();
  const user = await requireAdminUser([UserRole.SUPER_ADMIN, UserRole.ADMIN]);

  const parsed = partnershipStatusSchema.parse({
    id: toRequiredString(formData.get("id")),
    status: toRequiredString(formData.get("status")),
    nextStep: toOptionalString(formData.get("nextStep")),
    agreementStatus: toOptionalString(formData.get("agreementStatus")) ?? undefined,
  });

  await prisma.partnership.update({
    where: { id: parsed.id },
    data: {
      collaborationStatus: parsed.status,
      nextStep: parsed.nextStep,
      agreementStatus: parsed.agreementStatus,
    },
  });

  await logAuditEvent({
    actorId: user.id,
    action: "partnership.updated",
    entityType: "partnership",
    entityId: parsed.id,
    description: `Partnership stage updated to ${parsed.status}.`,
    metadata: {
      agreementStatus: parsed.agreementStatus ?? null,
      nextStep: parsed.nextStep ?? null,
    },
  });

  revalidateAdminWorkspace();
}

export async function addPartnershipNoteAction(formData: FormData) {
  assertValidServerActionOrigin();
  const user = await requireAdminUser([UserRole.SUPER_ADMIN, UserRole.ADMIN]);

  const parsed = partnershipNoteSchema.parse({
    partnershipId: toRequiredString(formData.get("partnershipId")),
    content: toRequiredString(formData.get("content")),
  });

  await prisma.partnershipNote.create({
    data: {
      partnershipId: parsed.partnershipId,
      authorId: user.id,
      content: parsed.content,
    },
  });

  await logAuditEvent({
    actorId: user.id,
    action: "partnership.note.added",
    entityType: "partnership",
    entityId: parsed.partnershipId,
    description: "Partnership note added.",
  });

  revalidateAdminWorkspace();
}

export async function createPartnershipMeetingAction(formData: FormData) {
  assertValidServerActionOrigin();
  const user = await requireAdminUser([UserRole.SUPER_ADMIN, UserRole.ADMIN]);

  const parsed = partnershipMeetingSchema.parse({
    partnershipId: toRequiredString(formData.get("partnershipId")),
    hospitalId: toOptionalString(formData.get("hospitalId")),
    title: toRequiredString(formData.get("title")),
    meetingType: toOptionalString(formData.get("meetingType")) ?? MeetingType.CALL,
    meetingAt: toRequiredString(formData.get("meetingAt")),
    location: toOptionalString(formData.get("location")),
    notes: toOptionalString(formData.get("notes")),
    outcome: toOptionalString(formData.get("outcome")),
  });

  await prisma.meeting.create({
    data: {
      partnershipId: parsed.partnershipId,
      hospitalId: parsed.hospitalId,
      createdById: user.id,
      title: parsed.title,
      meetingType: parsed.meetingType,
      meetingAt: new Date(parsed.meetingAt),
      location: parsed.location,
      notes: parsed.notes,
      outcome: parsed.outcome,
    },
  });

  await logAuditEvent({
    actorId: user.id,
    action: "partnership.meeting.created",
    entityType: "partnership",
    entityId: parsed.partnershipId,
    description: `Meeting scheduled: ${parsed.title}.`,
  });

  revalidateAdminWorkspace();
}

export async function createHospitalAction(formData: FormData) {
  assertValidServerActionOrigin();
  const user = await requireAdminUser([UserRole.SUPER_ADMIN, UserRole.ADMIN]);

  const parsed = hospitalSchema.parse({
    name: toRequiredString(formData.get("name")),
    country: toRequiredString(formData.get("country")),
    city: toOptionalString(formData.get("city")),
    website: toOptionalString(formData.get("website")) ?? "",
    description: toOptionalString(formData.get("description")),
    hospitalType: toOptionalString(formData.get("hospitalType")),
    internationalDeskEmail:
      toOptionalString(formData.get("internationalDeskEmail")) ?? "",
    internationalDeskPhone: toOptionalString(formData.get("internationalDeskPhone")),
    status: toRequiredString(formData.get("status")),
  });

  const hospital = await prisma.hospital.create({
    data: {
      ...parsed,
      slug: slugify(parsed.name),
    },
  });

  await prisma.partnership.create({
    data: {
      hospitalId: hospital.id,
      country: hospital.country,
      collaborationStatus: hospital.status,
      source: "ADMIN_IMPORT",
      summary: hospital.description,
    },
  });

  await logAuditEvent({
    actorId: user.id,
    action: "hospital.created",
    entityType: "hospital",
    entityId: hospital.id,
    description: `Hospital record created for ${hospital.name}.`,
  });

  revalidateAdminWorkspace();
}

export async function updateHospitalProfileAction(formData: FormData) {
  assertValidServerActionOrigin();
  const user = await requireAdminUser([UserRole.SUPER_ADMIN, UserRole.ADMIN]);

  const hospitalId = toRequiredString(formData.get("hospitalId"));
  const parsed = hospitalSchema.parse({
    name: toRequiredString(formData.get("name")),
    country: toRequiredString(formData.get("country")),
    city: toOptionalString(formData.get("city")),
    website: toOptionalString(formData.get("website")) ?? "",
    description: toOptionalString(formData.get("description")),
    hospitalType: toOptionalString(formData.get("hospitalType")),
    internationalDeskEmail:
      toOptionalString(formData.get("internationalDeskEmail")) ?? "",
    internationalDeskPhone: toOptionalString(formData.get("internationalDeskPhone")),
    status: toRequiredString(formData.get("status")),
  });

  await prisma.hospital.update({
    where: { id: hospitalId },
    data: {
      ...parsed,
      slug: slugify(parsed.name),
    },
  });

  await prisma.partnership.updateMany({
    where: { hospitalId },
    data: {
      country: parsed.country,
      collaborationStatus: parsed.status,
      summary: parsed.description,
    },
  });

  await logAuditEvent({
    actorId: user.id,
    action: "hospital.updated",
    entityType: "hospital",
    entityId: hospitalId,
    description: `Hospital profile updated for ${parsed.name}.`,
  });

  revalidateAdminWorkspace();
}

export async function createContactPersonAction(formData: FormData) {
  assertValidServerActionOrigin();
  const user = await requireAdminUser([UserRole.SUPER_ADMIN, UserRole.ADMIN]);

  const parsed = contactPersonSchema.parse({
    partnershipId: toOptionalString(formData.get("partnershipId")),
    hospitalId: toOptionalString(formData.get("hospitalId")),
    name: toRequiredString(formData.get("name")),
    role: toOptionalString(formData.get("role")),
    email: toOptionalString(formData.get("email")) ?? "",
    phone: toOptionalString(formData.get("phone")),
    telegram: toOptionalString(formData.get("telegram")),
    country: toOptionalString(formData.get("country")),
  });

  const contact = await prisma.contactPerson.create({
    data: parsed,
  });

  await logAuditEvent({
    actorId: user.id,
    action: "hospital.contact.created",
    entityType: parsed.partnershipId ? "partnership" : "hospital",
    entityId: parsed.partnershipId ?? parsed.hospitalId ?? contact.id,
    description: `Contact person added: ${contact.name}.`,
  });

  revalidateAdminWorkspace();
}

export async function uploadPartnershipDocumentAction(formData: FormData) {
  assertValidServerActionOrigin();
  const user = await requireAdminUser([UserRole.SUPER_ADMIN, UserRole.ADMIN]);

  const partnershipId = toRequiredString(formData.get("partnershipId"));
  const hospitalId = toOptionalString(formData.get("hospitalId"));
  const category =
    (toOptionalString(formData.get("category")) as FileCategory | undefined) ??
    FileCategory.PARTNERSHIP_DOCUMENT;
  const file = formData.get("file");

  if (!(file instanceof File) || file.size === 0) {
    throw new Error("A document is required.");
  }

  const uploaded = await storeUploadedFile({
    file,
    category,
    uploadedByUserId: user.id,
    partnershipId,
    hospitalId: hospitalId ?? undefined,
  });

  await logAuditEvent({
    actorId: user.id,
    action: "partnership.document.uploaded",
    entityType: "partnership",
    entityId: partnershipId,
    description: `Partnership document uploaded: ${file.name}.`,
    metadata: {
      uploadedFileId: uploaded?.id ?? null,
      category,
    },
  });

  revalidateAdminWorkspace();
}

export async function createAdminUserAction(formData: FormData) {
  assertValidServerActionOrigin();
  const currentUser = await requireSuperAdmin();

  const parsed = adminUserSchema.parse({
    name: toRequiredString(formData.get("name")),
    email: toRequiredString(formData.get("email")),
    password: toRequiredString(formData.get("password")),
    role: toRequiredString(formData.get("role")),
  });

  const passwordHash = await bcrypt.hash(parsed.password, 12);

  const user = await prisma.user.create({
    data: {
      name: parsed.name,
      email: parsed.email,
      passwordHash,
      role: parsed.role,
      isActive: true,
    },
  });

  await logAuditEvent({
    actorId: currentUser.id,
    action: "admin.user.created",
    entityType: "user",
    entityId: user.id,
    description: `Admin user created for ${user.email}.`,
    metadata: {
      role: user.role,
    },
  });

  revalidateAdminWorkspace();
}

export async function updateAdminUserAccessAction(formData: FormData) {
  assertValidServerActionOrigin();
  const currentUser = await requireSuperAdmin();

  const parsed = adminUserUpdateSchema.parse({
    userId: toRequiredString(formData.get("userId")),
    role: toOptionalString(formData.get("role")) ?? undefined,
    isActive:
      formData.get("isActive") == null
        ? undefined
        : formData.get("isActive") === "true",
  });

  const user = await prisma.user.update({
    where: { id: parsed.userId },
    data: {
      ...(parsed.role ? { role: parsed.role } : {}),
      ...(typeof parsed.isActive === "boolean"
        ? { isActive: parsed.isActive }
        : {}),
    },
  });

  await logAuditEvent({
    actorId: currentUser.id,
    action: "admin.user.updated",
    entityType: "user",
    entityId: user.id,
    description: `Admin user access updated for ${user.email}.`,
    metadata: {
      role: user.role,
      isActive: user.isActive,
    },
  });

  revalidateAdminWorkspace();
}
