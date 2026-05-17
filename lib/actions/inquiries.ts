"use server";

import { FileCategory, InquiryType, UrgencyLevel } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import {
  buildAdminInquiryNotificationEmail,
  buildHighUrgencyMedicalAlertEmail,
  buildInquiryAcknowledgementEmail,
  sendEmail,
} from "@/lib/email";
import { getHighUrgencyAlertRecipient, getInquiryAdminRecipient } from "@/lib/email/routing";
import { sendTelegramNotification } from "@/lib/notifications";
import { prisma } from "@/lib/prisma";
import { assertRateLimit } from "@/lib/security/rate-limit";
import {
  assertHoneypotClear,
  assertMessageIsClean,
  getClientIdentifier,
} from "@/lib/security/spam";
import { createLeadAssessmentRecord } from "@/lib/services/ai/lead-assessment-service";
import { resolveInternationalRouting } from "@/lib/services/international-routing-service";
import { notifyUsers } from "@/lib/services/notification-service";
import { storeUploadedFile } from "@/lib/uploads";
import {
  contactInquirySchema,
  medicalTourismInquirySchema,
} from "@/lib/validators/inquiries";
import { startCase, toOptionalString, toRequiredString } from "@/lib/utils";

function resolveRedirectPath(
  value: FormDataEntryValue | null | undefined,
  fallback: string,
) {
  if (typeof value !== "string") {
    return fallback;
  }

  const normalized = value.trim();
  if (!normalized.startsWith("/") || normalized.startsWith("/admin")) {
    return fallback;
  }

  return normalized;
}

async function getAssignedAdminId(type: InquiryType) {
  const email = await getInquiryAdminRecipient(type);

  const user = await prisma.user.findFirst({
    where: {
      email,
      isActive: true,
    },
    select: { id: true },
  });

  return user?.id ?? null;
}

function getInquiryAcknowledgementSubject(type: InquiryType) {
  if (type === InquiryType.PARTNERSHIP) {
    return "Hospital partnership request received";
  }

  if (type === InquiryType.STUDENT_MOBILITY) {
    return "Student mobility inquiry received";
  }

  if (type === InquiryType.INTERNATIONAL_PATIENT) {
    return "International patient assistance request received";
  }

  if (type === InquiryType.MEDICAL_TOURISM) {
    return "Medical tourism inquiry received";
  }

  return "General contact inquiry received";
}

function getInquiryOpsLink(type: InquiryType) {
  if (type === InquiryType.MEDICAL_TOURISM) {
    return "/admin/medical-tourism";
  }

  if (type === InquiryType.STUDENT_MOBILITY) {
    return "/admin/student-mobility";
  }

  if (type === InquiryType.PARTNERSHIP) {
    return "/admin/partnerships";
  }

  return "/admin/leads";
}

export async function submitContactInquiryAction(formData: FormData) {
  assertHoneypotClear(formData);
  const identifier = getClientIdentifier();
  const redirectPath = resolveRedirectPath(formData.get("redirectPath"), "/contact");

  assertRateLimit({
    key: `contact:${identifier}`,
    limit: 6,
    windowMs: 1000 * 60 * 10,
  });

  const parsed = contactInquirySchema.safeParse({
    name: toRequiredString(formData.get("name")),
    organization: toOptionalString(formData.get("organization")),
    country: toOptionalString(formData.get("country")),
    phone: toOptionalString(formData.get("phone")),
    telegram: toOptionalString(formData.get("telegram")),
    email: toRequiredString(formData.get("email")),
    inquiryType: toRequiredString(formData.get("inquiryType")),
    message: toRequiredString(formData.get("message")),
    academicBackground: toOptionalString(formData.get("academicBackground")),
    preferredCountry: toOptionalString(formData.get("preferredCountry")),
    programInterest: toOptionalString(formData.get("programInterest")),
    preferredContactTime: toOptionalString(formData.get("preferredContactTime")),
    collaborationInterest: toOptionalString(formData.get("collaborationInterest")),
  });

  if (!parsed.success) {
    redirect(`${redirectPath}?error=validation`);
  }

  assertMessageIsClean(parsed.data.message);
  const routingDecision = await resolveInternationalRouting({
    inquiryType: parsed.data.inquiryType,
    country: parsed.data.country,
    preferredCountry: parsed.data.preferredCountry,
    redirectPath,
  });

  let inquiryRecordId = "";
  let assignedToId: string | null = null;
  let leadModel = "contactSubmission";

  if (parsed.data.inquiryType === InquiryType.PARTNERSHIP) {
    leadModel = "partnershipLead";
    assignedToId = await getAssignedAdminId(InquiryType.PARTNERSHIP);
    const lead = await prisma.partnershipLead.create({
      data: {
        name: parsed.data.name,
        organization: parsed.data.organization,
        country: parsed.data.country,
        phone: parsed.data.phone,
        telegram: parsed.data.telegram,
        email: parsed.data.email,
        message: parsed.data.message,
        collaborationInterest: parsed.data.collaborationInterest,
        preferredContactTime: parsed.data.preferredContactTime,
        assignedToId,
        sourcePath: redirectPath,
      },
    });

    inquiryRecordId = lead.id;

    const partnershipDocuments = formData
      .getAll("partnershipDocuments")
      .filter(Boolean) as File[];
    const attachments = formData.getAll("attachments").filter(Boolean) as File[];

    for (const document of [...partnershipDocuments, ...attachments]) {
      await storeUploadedFile({
        file: document,
        category: FileCategory.PARTNERSHIP_DOCUMENT,
        partnershipLeadId: lead.id,
      });
    }
  } else if (parsed.data.inquiryType === InquiryType.STUDENT_MOBILITY) {
    leadModel = "studentMobilityInquiry";
    assignedToId = await getAssignedAdminId(InquiryType.STUDENT_MOBILITY);
    const lead = await prisma.studentMobilityInquiry.create({
      data: {
        name: parsed.data.name,
        organization: parsed.data.organization,
        country: parsed.data.country,
        phone: parsed.data.phone,
        telegram: parsed.data.telegram,
        email: parsed.data.email,
        message: parsed.data.message,
        preferredCountry: parsed.data.preferredCountry,
        academicBackground: parsed.data.academicBackground,
        programInterest: parsed.data.programInterest,
        assignedToId,
        sourcePath: redirectPath,
      },
    });

    inquiryRecordId = lead.id;

    const attachments = formData.getAll("attachments").filter(Boolean) as File[];
    for (const attachment of attachments) {
      await storeUploadedFile({
        file: attachment,
        category: FileCategory.GENERAL,
        studentMobilityInquiryId: lead.id,
      });
    }
  } else {
    assignedToId = await getAssignedAdminId(parsed.data.inquiryType);
    const lead = await prisma.contactSubmission.create({
      data: {
        name: parsed.data.name,
        organization: parsed.data.organization,
        country: parsed.data.country,
        phone: parsed.data.phone,
        telegram: parsed.data.telegram,
        email: parsed.data.email,
        inquiryType: parsed.data.inquiryType,
        message: parsed.data.message,
        preferredCountry: parsed.data.preferredCountry,
        preferredContactTime: parsed.data.preferredContactTime,
        collaborationInterest: parsed.data.collaborationInterest,
        assignedToId,
        sourcePath: redirectPath,
      },
    });

    inquiryRecordId = lead.id;

    const attachments = formData.getAll("attachments").filter(Boolean) as File[];
    const medicalReports = formData.getAll("medicalReports").filter(Boolean) as File[];
    const passportCopies = formData.getAll("passportCopies").filter(Boolean) as File[];

    for (const attachment of attachments) {
      await storeUploadedFile({
        file: attachment,
        category: FileCategory.GENERAL,
        contactSubmissionId: lead.id,
      });
    }

    if (parsed.data.inquiryType === InquiryType.INTERNATIONAL_PATIENT) {
      for (const report of medicalReports) {
        await storeUploadedFile({
          file: report,
          category: FileCategory.MEDICAL_REPORT,
          contactSubmissionId: lead.id,
        });
      }

      for (const passport of passportCopies) {
        await storeUploadedFile({
          file: passport,
          category: FileCategory.PASSPORT,
          contactSubmissionId: lead.id,
        });
      }
    }
  }

  const contactLogContext =
    parsed.data.inquiryType === InquiryType.PARTNERSHIP
      ? { partnershipLeadId: inquiryRecordId }
      : parsed.data.inquiryType === InquiryType.STUDENT_MOBILITY
        ? { studentMobilityInquiryId: inquiryRecordId }
        : { contactSubmissionId: inquiryRecordId };

  await Promise.allSettled([
    sendEmail({
      to: parsed.data.email,
      subject: getInquiryAcknowledgementSubject(parsed.data.inquiryType),
      ...buildInquiryAcknowledgementEmail({
        recipientName: parsed.data.name,
        inquiryType: parsed.data.inquiryType,
        detailLabel:
          parsed.data.inquiryType === InquiryType.PARTNERSHIP
            ? "Collaboration focus"
            : parsed.data.inquiryType === InquiryType.STUDENT_MOBILITY
              ? "Program interest"
              : "Inquiry focus",
        detailValue:
          parsed.data.collaborationInterest ||
          parsed.data.programInterest ||
          parsed.data.preferredCountry ||
          "Coordination request",
        detailMessage:
          parsed.data.inquiryType === InquiryType.PARTNERSHIP
            ? "Our partnership team will review the request and respond with suitable next steps for hospital collaboration."
            : parsed.data.inquiryType === InquiryType.STUDENT_MOBILITY
              ? "Our student mobility team will review the inquiry and respond with the next coordination steps."
              : parsed.data.inquiryType === InquiryType.INTERNATIONAL_PATIENT
                ? "Our patient coordination team will review the support request and come back with the next practical steps."
                : "Our team will review the inquiry and respond shortly.",
      }),
      templateKey: `acknowledgement-${parsed.data.inquiryType.toLowerCase()}`,
      log: {
        ...contactLogContext,
        metadata: {
          flow: "public-inquiry",
        },
      },
    }),
    sendEmail({
      to: await getInquiryAdminRecipient(parsed.data.inquiryType),
      subject: `New ${startCase(parsed.data.inquiryType).toLowerCase()} inquiry`,
      ...buildAdminInquiryNotificationEmail({
        inquiryType: parsed.data.inquiryType,
        name: parsed.data.name,
        email: parsed.data.email,
        organization: parsed.data.organization,
        country: parsed.data.country,
        detailLabel:
          parsed.data.inquiryType === InquiryType.PARTNERSHIP
            ? "Collaboration focus"
            : parsed.data.inquiryType === InquiryType.STUDENT_MOBILITY
              ? "Program interest"
              : "Inquiry focus",
        detailValue:
          parsed.data.collaborationInterest ||
          parsed.data.programInterest ||
          parsed.data.preferredCountry ||
          "General coordination request",
        message: parsed.data.message,
      }),
      templateKey: `admin-notification-${parsed.data.inquiryType.toLowerCase()}`,
      log: {
        ...contactLogContext,
        metadata: {
          flow: "admin-notification",
        },
      },
    }),
  ]);

  await sendTelegramNotification(
    `New ${parsed.data.inquiryType} inquiry from ${parsed.data.name} (${parsed.data.email})`,
  );

  await Promise.allSettled([
    createLeadAssessmentRecord({
      leadModel,
      leadId: inquiryRecordId,
      language: routingDecision.language,
      suggestedCoordinatorId: routingDecision.coordinator?.id,
      leadScore: routingDecision.leadScore,
      routingRecommendation: routingDecision.routingRecommendation,
      summary: `Operational assessment prepared for ${parsed.data.inquiryType} inquiry.`,
      metadata: {
        country: routingDecision.country?.name || parsed.data.country || null,
        redirectPath,
      },
    }),
    notifyUsers({
      userIds: [assignedToId, routingDecision.coordinator?.user?.id],
      title: `New ${startCase(parsed.data.inquiryType).toLowerCase()} inquiry`,
      message: `${parsed.data.name} submitted a new inquiry from ${parsed.data.country || "an unspecified country"}.`,
      type: "INFO",
      link: getInquiryOpsLink(parsed.data.inquiryType),
      metadata: {
        leadModel,
        leadId: inquiryRecordId,
        countryId: routingDecision.country?.id ?? null,
        coordinatorId: routingDecision.coordinator?.id ?? null,
      },
    }),
  ]);

  revalidatePath("/admin");
  revalidatePath("/admin/leads");
  revalidatePath(redirectPath);
  redirect(
    `${redirectPath}?submitted=${parsed.data.inquiryType.toLowerCase()}&id=${inquiryRecordId}`,
  );
}

export async function submitMedicalTourismInquiryAction(formData: FormData) {
  assertHoneypotClear(formData);
  const identifier = getClientIdentifier();
  const redirectPath = resolveRedirectPath(
    formData.get("redirectPath"),
    "/medical-tourism",
  );

  assertRateLimit({
    key: `medical-tourism:${identifier}`,
    limit: 4,
    windowMs: 1000 * 60 * 15,
  });

  const parsed = medicalTourismInquirySchema.safeParse({
    name: toRequiredString(formData.get("name")),
    organization: toOptionalString(formData.get("organization")),
    country: toOptionalString(formData.get("country")),
    phone: toOptionalString(formData.get("phone")),
    telegram: toOptionalString(formData.get("telegram")),
    email: toRequiredString(formData.get("email")),
    message: toRequiredString(formData.get("message")),
    treatmentType: toRequiredString(formData.get("treatmentType")),
    preferredCountry: toOptionalString(formData.get("preferredCountry")),
    budgetRange: toOptionalString(formData.get("budgetRange")),
    preferredHospital: toOptionalString(formData.get("preferredHospital")),
    patientNationality: toRequiredString(formData.get("patientNationality")),
    urgencyLevel: toRequiredString(formData.get("urgencyLevel")),
    reportsSummary: toOptionalString(formData.get("reportsSummary")),
    patientName: toOptionalString(formData.get("patientName")),
    passportNumber: toOptionalString(formData.get("passportNumber")),
  });

  if (!parsed.success) {
    redirect(`${redirectPath}?error=validation`);
  }

  assertMessageIsClean(parsed.data.message);
  const assignedToId = await getAssignedAdminId(InquiryType.MEDICAL_TOURISM);
  const routingDecision = await resolveInternationalRouting({
    inquiryType: InquiryType.MEDICAL_TOURISM,
    country: parsed.data.country,
    preferredCountry: parsed.data.preferredCountry,
    redirectPath,
    urgencyLevel: parsed.data.urgencyLevel,
  });

  const patient = await prisma.patient.create({
    data: {
      fullName: parsed.data.patientName || parsed.data.name,
      nationality: parsed.data.patientNationality,
      country: parsed.data.country,
      countryId: routingDecision.country?.id,
      phone: parsed.data.phone,
      telegram: parsed.data.telegram,
      email: parsed.data.email,
      passportNumber: parsed.data.passportNumber,
      preferredLanguage: routingDecision.language,
      notes: parsed.data.reportsSummary,
    },
  });

  const inquiry = await prisma.medicalTourismInquiry.create({
    data: {
      name: parsed.data.name,
      organization: parsed.data.organization,
      country: parsed.data.country,
      phone: parsed.data.phone,
      telegram: parsed.data.telegram,
      email: parsed.data.email,
      message: parsed.data.message,
      treatmentType: parsed.data.treatmentType,
      preferredCountry: parsed.data.preferredCountry,
      budgetRange: parsed.data.budgetRange,
      preferredHospital: parsed.data.preferredHospital,
      patientNationality: parsed.data.patientNationality,
      urgencyLevel: parsed.data.urgencyLevel,
      reportsSummary: parsed.data.reportsSummary,
      patientId: patient.id,
      assignedToId,
      sourcePath: redirectPath,
    },
  });

  const medicalReports = formData.getAll("medicalReports").filter(Boolean) as File[];
  const passportCopies = formData.getAll("passportCopies").filter(Boolean) as File[];
  const treatmentDocuments = formData.getAll("treatmentDocuments").filter(Boolean) as File[];

  for (const report of medicalReports) {
    await storeUploadedFile({
      file: report,
      category: FileCategory.MEDICAL_REPORT,
      patientId: patient.id,
      medicalTourismInquiryId: inquiry.id,
    });
  }

  for (const passport of passportCopies) {
    await storeUploadedFile({
      file: passport,
      category: FileCategory.PASSPORT,
      patientId: patient.id,
      medicalTourismInquiryId: inquiry.id,
    });
  }

  for (const document of treatmentDocuments) {
    await storeUploadedFile({
      file: document,
      category: FileCategory.TREATMENT_DOCUMENT,
      patientId: patient.id,
      medicalTourismInquiryId: inquiry.id,
    });
  }

  const adminNotificationRecipient = await getInquiryAdminRecipient(
    InquiryType.MEDICAL_TOURISM,
  );

  await Promise.allSettled([
    sendEmail({
      to: parsed.data.email,
      subject: "Medical tourism inquiry received",
      ...buildInquiryAcknowledgementEmail({
        recipientName: parsed.data.name,
        inquiryType: InquiryType.MEDICAL_TOURISM,
        detailLabel: "Treatment type",
        detailValue: parsed.data.treatmentType,
        detailMessage:
          "Our medical tourism coordination team will review the case information, uploaded reports, and urgency level before responding with the next steps.",
      }),
      templateKey: "acknowledgement-medical-tourism",
      log: {
        medicalTourismInquiryId: inquiry.id,
        metadata: {
          urgencyLevel: parsed.data.urgencyLevel,
        },
      },
    }),
    sendEmail({
      to: adminNotificationRecipient,
      subject: "New medical tourism inquiry received",
      ...buildAdminInquiryNotificationEmail({
        inquiryType: InquiryType.MEDICAL_TOURISM,
        name: parsed.data.name,
        email: parsed.data.email,
        organization: parsed.data.organization,
        country: parsed.data.country,
        detailLabel: "Treatment type",
        detailValue: `${parsed.data.treatmentType} • ${startCase(parsed.data.urgencyLevel)}`,
        message: parsed.data.message,
      }),
      templateKey: "admin-notification-medical-tourism",
      log: {
        medicalTourismInquiryId: inquiry.id,
        metadata: {
          urgencyLevel: parsed.data.urgencyLevel,
        },
      },
    }),
    ...(parsed.data.urgencyLevel === UrgencyLevel.HIGH ||
    parsed.data.urgencyLevel === UrgencyLevel.CRITICAL
      ? [
          sendEmail({
            to: await getHighUrgencyAlertRecipient(),
            subject: `Urgent medical tourism alert: ${parsed.data.treatmentType}`,
            ...buildHighUrgencyMedicalAlertEmail({
              name: parsed.data.name,
              email: parsed.data.email,
              treatmentType: parsed.data.treatmentType,
              urgencyLevel: parsed.data.urgencyLevel,
              message: parsed.data.message,
            }),
            templateKey: "high-urgency-medical-alert",
            log: {
              medicalTourismInquiryId: inquiry.id,
              metadata: {
                urgencyLevel: parsed.data.urgencyLevel,
                alert: true,
              },
            },
          }),
        ]
      : []),
  ]);

  await sendTelegramNotification(
    `New medical tourism inquiry: ${parsed.data.name} / ${parsed.data.treatmentType} / ${parsed.data.urgencyLevel}`,
  );

  await Promise.allSettled([
    createLeadAssessmentRecord({
      leadModel: "medicalTourismInquiry",
      leadId: inquiry.id,
      language: routingDecision.language,
      suggestedCoordinatorId: routingDecision.coordinator?.id,
      leadScore: routingDecision.leadScore,
      routingRecommendation: routingDecision.routingRecommendation,
      summary: `Operational assessment prepared for ${parsed.data.treatmentType}.`,
      metadata: {
        urgencyLevel: parsed.data.urgencyLevel,
        country: routingDecision.country?.name || parsed.data.country || null,
        redirectPath,
      },
    }),
    notifyUsers({
      userIds: [assignedToId, routingDecision.coordinator?.user?.id],
      title:
        parsed.data.urgencyLevel === UrgencyLevel.HIGH ||
        parsed.data.urgencyLevel === UrgencyLevel.CRITICAL
          ? "Urgent medical inquiry received"
          : "New medical tourism inquiry",
      message: `${parsed.data.name} requested support for ${parsed.data.treatmentType}.`,
      type:
        parsed.data.urgencyLevel === UrgencyLevel.HIGH ||
        parsed.data.urgencyLevel === UrgencyLevel.CRITICAL
          ? "URGENT"
          : "CASE",
      link: "/admin/medical-tourism",
      metadata: {
        leadModel: "medicalTourismInquiry",
        leadId: inquiry.id,
        countryId: routingDecision.country?.id ?? null,
        coordinatorId: routingDecision.coordinator?.id ?? null,
        urgencyLevel: parsed.data.urgencyLevel,
      },
    }),
  ]);

  revalidatePath("/admin");
  revalidatePath("/admin/leads");
  revalidatePath(redirectPath);
  redirect(`${redirectPath}?submitted=1&id=${inquiry.id}`);
}
