"use server";

import {
  FileCategory,
  InquiryPriority,
  InquiryStatus,
  InquiryType,
  LeadPriority,
  PartnershipInterest,
  StudentService,
  UrgencyLevel,
} from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { buildSimpleEmail, sendEmail } from "@/lib/email";
import { getInquiryAdminRecipient } from "@/lib/email/routing";
import { env } from "@/lib/env";
import { getLocaleFromPathname } from "@/lib/i18n/config";
import { getMessages } from "@/lib/i18n/messages";
import { absoluteUrl } from "@/lib/metadata";
import { prisma } from "@/lib/prisma";
import { assertValidServerActionOrigin } from "@/lib/security/origin";
import { assertRateLimit } from "@/lib/security/rate-limit";
import {
  getClientCountry,
  getClientIdentifier,
  getClientUserAgent,
  getSuspiciousMessageReason,
} from "@/lib/security/spam";
import { storeUploadedFile } from "@/lib/uploads";
import {
  createContactInquirySubmissionSchema,
  createHospitalPartnershipInquirySubmissionSchema,
  createPatientInquirySubmissionSchema,
  createStudentMobilityInquirySubmissionSchema,
  type InquiryValidationMessages,
} from "@/lib/validators/inquiries";
import { toOptionalString, toRequiredString } from "@/lib/utils";

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

function getValidationMessages(redirectPath: string): InquiryValidationMessages {
  const locale = getLocaleFromPathname(redirectPath);
  const messages = getMessages(locale);
  return messages.forms.validationCommon;
}

function redirectWithError(redirectPath: string): never {
  redirect(`${redirectPath}?error=validation`);
}

function resolveHoneypotValue(formData: FormData) {
  return toOptionalString(formData.get(env.SPAM_HONEYPOT_FIELD));
}

function parseBoolean(value: FormDataEntryValue | null | undefined) {
  return value === "true" || value === "on" || value === "1";
}

function parseOptionalAge(value: FormDataEntryValue | null | undefined) {
  const normalized = toOptionalString(value);

  if (!normalized) {
    return undefined;
  }

  const numeric = Number(normalized);
  return Number.isFinite(numeric) ? numeric : Number.NaN;
}

function getSourceLocale(redirectPath: string) {
  return getLocaleFromPathname(redirectPath);
}

function buildAdminEmailSubject(type: InquiryType) {
  if (type === InquiryType.MEDICAL_TOURISM) {
    return "New Patient Inquiry | MedPobeda Group";
  }

  if (type === InquiryType.INTERNATIONAL_PATIENT) {
    return "New Patient Inquiry | MedPobeda Group";
  }

  if (type === InquiryType.PARTNERSHIP) {
    return "New Hospital Partnership Inquiry | MedPobeda Group";
  }

  if (type === InquiryType.STUDENT_MOBILITY) {
    return "New Student Mobility Inquiry | MedPobeda Group";
  }

  return "New Contact Inquiry | MedPobeda Group";
}

function buildAutoReplySubject(type: InquiryType) {
  if (type === InquiryType.PARTNERSHIP) {
    return "Hospital partnership inquiry received";
  }

  if (type === InquiryType.STUDENT_MOBILITY) {
    return "Student mobility inquiry received";
  }

  if (type === InquiryType.MEDICAL_TOURISM || type === InquiryType.INTERNATIONAL_PATIENT) {
    return "Patient inquiry received";
  }

  return "Contact inquiry received";
}

async function sendInquiryNotifications({
  publicType,
  detailTitle,
  recipientName,
  recipientEmail,
  adminFields,
  detailPagePath,
  message,
  metadata,
}: {
  publicType: InquiryType;
  detailTitle: string;
  recipientName: string;
  recipientEmail?: string | null;
  adminFields: Array<[string, string | null | undefined]>;
  detailPagePath: string;
  message: string;
  metadata?: Record<string, unknown>;
}) {
  const adminRecipient = await getInquiryAdminRecipient(publicType);
  const adminBody = [
    `Inquiry type: ${detailTitle}`,
    ...adminFields.map(([label, value]) => `${label}: ${value || "Not provided"}`),
    `Message: ${message}`,
    `Admin dashboard link: ${absoluteUrl(detailPagePath)}`,
  ].join("\n");

  const tasks: Promise<unknown>[] = [
    sendEmail({
      to: adminRecipient,
      subject: buildAdminEmailSubject(publicType),
      ...buildSimpleEmail({
        heading: buildAdminEmailSubject(publicType),
        body: adminBody,
      }),
      templateKey: `admin-${publicType.toLowerCase()}-inquiry`,
      log: { metadata },
    }),
  ];

  if (recipientEmail) {
    tasks.push(
      sendEmail({
        to: recipientEmail,
        subject: buildAutoReplySubject(publicType),
        ...buildSimpleEmail({
          heading: "Thank you for contacting MedPobeda Group",
          body: `Thank you for contacting MedPobeda Group, ${recipientName}. Our coordination team has received your inquiry and will review it carefully. We will contact you using the details provided.`,
        }),
        templateKey: `autoreply-${publicType.toLowerCase()}-inquiry`,
        log: { metadata },
      }),
    );
  }

  await Promise.allSettled(tasks);
}

function mapPartnershipInterest(value?: string | null) {
  const normalized = value?.toLowerCase().trim();

  if (!normalized) {
    return undefined;
  }

  if (normalized.includes("referral")) {
    return PartnershipInterest.PATIENT_REFERRAL_PATHWAY;
  }

  if (normalized.includes("conference") || normalized.includes("training")) {
    return PartnershipInterest.TRAINING_AND_CONFERENCE_COLLABORATION;
  }

  if (normalized.includes("mou") || normalized.includes("institution")) {
    return PartnershipInterest.INSTITUTIONAL_MOU_DISCUSSION;
  }

  if (normalized.includes("tourism")) {
    return PartnershipInterest.MEDICAL_TOURISM_COOPERATION;
  }

  if (normalized.includes("partner")) {
    return PartnershipInterest.PARTNERSHIP_DISCUSSION;
  }

  return PartnershipInterest.OTHER;
}

function mapStudentService(value?: string | null) {
  const normalized = value?.toLowerCase().trim();

  if (!normalized) {
    return undefined;
  }

  if (normalized.includes("clinical") || normalized.includes("exposure")) {
    return StudentService.CLINICAL_EXPOSURE_PLANNING;
  }

  if (normalized.includes("academic") || normalized.includes("faculty")) {
    return StudentService.ACADEMIC_COOPERATION;
  }

  if (normalized.includes("institution")) {
    return StudentService.INSTITUTIONAL_COMMUNICATION;
  }

  if (normalized.includes("observership")) {
    return StudentService.OBSERVERSHIP_DISCUSSION;
  }

  if (normalized.includes("mobility") || normalized.includes("student")) {
    return StudentService.STUDENT_MOBILITY_GUIDANCE;
  }

  return StudentService.OTHER;
}

function derivePatientPriority(
  urgencyLevel?: UrgencyLevel | null,
  suspiciousReason?: string | null,
) {
  if (suspiciousReason) {
    return InquiryPriority.HIGH;
  }

  if (urgencyLevel === UrgencyLevel.CRITICAL) {
    return InquiryPriority.URGENT;
  }

  if (urgencyLevel === UrgencyLevel.HIGH) {
    return InquiryPriority.HIGH;
  }

  return InquiryPriority.NORMAL;
}

async function handleContactInquirySubmission(formData: FormData) {
  assertValidServerActionOrigin();
  const redirectPath = resolveRedirectPath(formData.get("redirectPath"), "/contact");

  if (resolveHoneypotValue(formData)) {
    redirect(redirectPath);
  }

  const validationMessages = getValidationMessages(redirectPath);
  const identifier = getClientIdentifier();

  try {
    assertRateLimit({
      key: `contact-inquiry:${identifier}`,
      limit: 5,
      windowMs: 1000 * 60 * 10,
    });
  } catch {
    redirectWithError(redirectPath);
  }

  const schema = createContactInquirySubmissionSchema(validationMessages);
  const parsed = schema.safeParse({
    fullName: toRequiredString(formData.get("name")),
    email: toRequiredString(formData.get("email")),
    phone: toOptionalString(formData.get("phone")),
    country: toOptionalString(formData.get("country")),
    inquiryType: InquiryType.CONTACT,
    message: toRequiredString(formData.get("message")),
    consent: parseBoolean(formData.get("consentAccepted")),
  });

  if (!parsed.success) {
    redirectWithError(redirectPath);
  }

  const suspiciousReason = getSuspiciousMessageReason(parsed.data.message);
  const locale = getSourceLocale(redirectPath);
  const record = await prisma.contactInquiry.create({
    data: {
      fullName: parsed.data.fullName,
      organization: toOptionalString(formData.get("organization")),
      email: parsed.data.email,
      phone: parsed.data.phone,
      country: parsed.data.country,
      inquiryType: InquiryType.CONTACT,
      message: parsed.data.message,
      consent: parsed.data.consent,
      locale,
      sourcePage: redirectPath,
      userCountry: getClientCountry(),
      userIp: identifier,
      userAgent: getClientUserAgent(),
      status: suspiciousReason ? InquiryStatus.SPAM : InquiryStatus.NEW,
      priority: suspiciousReason ? InquiryPriority.HIGH : InquiryPriority.NORMAL,
      internalNote: suspiciousReason || null,
    },
  });

  const attachments = formData.getAll("attachments").filter(Boolean) as File[];

  await Promise.all(
    attachments.map((file) =>
      storeUploadedFile({
        file,
        category: FileCategory.GENERAL,
        contactInquiryId: record.id,
      }),
    ),
  );

  if (suspiciousReason) {
    revalidatePath("/admin/inquiries");
    redirectWithError(redirectPath);
  }

  await sendInquiryNotifications({
    publicType: InquiryType.CONTACT,
    detailTitle: "Contact Inquiry",
    recipientName: parsed.data.fullName,
    recipientEmail: parsed.data.email,
    adminFields: [
      ["Name", parsed.data.fullName],
      ["Email", parsed.data.email],
      ["Phone", parsed.data.phone],
      ["Country", parsed.data.country],
      ["Source page", redirectPath],
      ["Locale", locale],
      ["User country", getClientCountry()],
      ["Submitted time", record.createdAt.toISOString()],
    ],
    detailPagePath: `/admin/inquiries/contact/${record.id}`,
    message: parsed.data.message,
    metadata: {
      inquiryType: "contact",
      inquiryId: record.id,
    },
  });

  revalidatePath("/admin");
  revalidatePath("/admin/inquiries");
  revalidatePath(redirectPath);
  redirect(`${redirectPath}?submitted=contact&id=${record.id}`);
}

async function handlePatientInquirySubmission(
  formData: FormData,
  sourceType: InquiryType,
) {
  assertValidServerActionOrigin();
  const redirectPath = resolveRedirectPath(
    formData.get("redirectPath"),
    sourceType === InquiryType.MEDICAL_TOURISM
      ? "/international-patient-care"
      : "/international-patients",
  );

  if (resolveHoneypotValue(formData)) {
    redirect(redirectPath);
  }

  const validationMessages = getValidationMessages(redirectPath);
  const identifier = getClientIdentifier();

  try {
    assertRateLimit({
      key: `patient-inquiry:${identifier}`,
      limit: 5,
      windowMs: 1000 * 60 * 10,
    });
  } catch {
    redirectWithError(redirectPath);
  }

  const department =
    toOptionalString(formData.get("treatmentType")) ||
    toOptionalString(formData.get("collaborationInterest"));
  const message = toRequiredString(formData.get("message"));
  const reportsSummary = toOptionalString(formData.get("reportsSummary"));
  const schema = createPatientInquirySubmissionSchema(validationMessages);
  const parsed = schema.safeParse({
    patientName:
      toOptionalString(formData.get("patientName")) ||
      toRequiredString(formData.get("name")),
    age: parseOptionalAge(formData.get("age")),
    gender: toOptionalString(formData.get("gender")) || undefined,
    country: toOptionalString(formData.get("country")),
    phone: toOptionalString(formData.get("phone")),
    email: toOptionalString(formData.get("email")),
    preferredTreatmentDepartment: department,
    diagnosisOrConcern: reportsSummary || message,
    preferredTreatmentCountry: toOptionalString(formData.get("preferredCountry")),
    needsVisaSupport: parseBoolean(formData.get("needsVisaSupport")),
    needsAccommodationSupport: parseBoolean(formData.get("needsAccommodationSupport")),
    message,
    consent: parseBoolean(formData.get("consentAccepted")),
  });

  if (!parsed.success) {
    redirectWithError(redirectPath);
  }

  const locale = getSourceLocale(redirectPath);
  const urgencyLevel = toOptionalString(formData.get("urgencyLevel")) as
    | UrgencyLevel
    | undefined;
  const suspiciousReason = getSuspiciousMessageReason(parsed.data.message);
  const record = await prisma.patientInquiry.create({
    data: {
      patientName: parsed.data.patientName,
      age: parsed.data.age,
      gender: parsed.data.gender,
      country: parsed.data.country,
      phone: parsed.data.phone,
      telegram: toOptionalString(formData.get("telegram")),
      email: parsed.data.email,
      contactPersonName: toOptionalString(formData.get("name")),
      patientNationality: toOptionalString(formData.get("patientNationality")),
      preferredTreatmentDepartment: parsed.data.preferredTreatmentDepartment,
      diagnosisOrConcern: parsed.data.diagnosisOrConcern,
      preferredTreatmentCountry: parsed.data.preferredTreatmentCountry,
      preferredHospital: toOptionalString(formData.get("preferredHospital")),
      budgetRange: toOptionalString(formData.get("budgetRange")),
      needsVisaSupport: parsed.data.needsVisaSupport,
      needsAccommodationSupport: parsed.data.needsAccommodationSupport,
      message: parsed.data.message,
      consent: parsed.data.consent,
      locale,
      sourcePage: redirectPath,
      userCountry: getClientCountry(),
      userIp: identifier,
      userAgent: getClientUserAgent(),
      status: suspiciousReason ? InquiryStatus.SPAM : InquiryStatus.NEW,
      priority: derivePatientPriority(urgencyLevel, suspiciousReason),
      internalNote: suspiciousReason || null,
    },
  });

  const uploads = [
    ...((formData.getAll("medicalReports").filter(Boolean) as File[]) || []),
    ...((formData.getAll("treatmentDocuments").filter(Boolean) as File[]) || []),
    ...((formData.getAll("attachments").filter(Boolean) as File[]) || []),
  ];

  const storedUploads = await Promise.all(
    uploads.map((file, index) =>
      storeUploadedFile({
        file,
        category:
          index === 0 ? FileCategory.MEDICAL_REPORT : FileCategory.TREATMENT_DOCUMENT,
        patientInquiryId: record.id,
      }),
    ),
  );

  const firstUpload = storedUploads.find(Boolean);

  if (firstUpload) {
    await prisma.patientInquiry.update({
      where: { id: record.id },
      data: {
        uploadedDocumentUrl: `/api/files/${firstUpload.id}`,
      },
    });
  }

  if (suspiciousReason) {
    revalidatePath("/admin/inquiries");
    redirectWithError(redirectPath);
  }

  await sendInquiryNotifications({
    publicType: sourceType,
    detailTitle: "Patient Inquiry",
    recipientName: parsed.data.patientName,
    recipientEmail: parsed.data.email,
    adminFields: [
      ["Patient name", parsed.data.patientName],
      ["Contact person", toOptionalString(formData.get("name"))],
      ["Email", parsed.data.email],
      ["Phone", parsed.data.phone],
      ["Country", parsed.data.country],
      ["Treatment department", parsed.data.preferredTreatmentDepartment],
      ["Preferred treatment country", parsed.data.preferredTreatmentCountry],
      ["Source page", redirectPath],
      ["Locale", locale],
      ["User country", getClientCountry()],
      ["Submitted time", record.createdAt.toISOString()],
    ],
    detailPagePath: `/admin/inquiries/patient/${record.id}`,
    message: parsed.data.message,
    metadata: {
      inquiryType: "patient",
      inquiryId: record.id,
    },
  });

  revalidatePath("/admin");
  revalidatePath("/admin/inquiries");
  revalidatePath(redirectPath);
  redirect(
    sourceType === InquiryType.MEDICAL_TOURISM
      ? `${redirectPath}?submitted=1&id=${record.id}`
      : `${redirectPath}?submitted=international_patient&id=${record.id}`,
  );
}

async function handleHospitalPartnershipInquirySubmission(formData: FormData) {
  assertValidServerActionOrigin();
  const redirectPath = resolveRedirectPath(
    formData.get("redirectPath"),
    "/hospital-partnerships",
  );

  if (resolveHoneypotValue(formData)) {
    redirect(redirectPath);
  }

  const validationMessages = getValidationMessages(redirectPath);
  const identifier = getClientIdentifier();

  try {
    assertRateLimit({
      key: `hospital-inquiry:${identifier}`,
      limit: 5,
      windowMs: 1000 * 60 * 10,
    });
  } catch {
    redirectWithError(redirectPath);
  }

  const schema = createHospitalPartnershipInquirySubmissionSchema(validationMessages);
  const parsed = schema.safeParse({
    hospitalName: toRequiredString(formData.get("organization")),
    contactPersonName: toRequiredString(formData.get("name")),
    designation: toOptionalString(formData.get("designation")),
    country: toRequiredString(formData.get("country")),
    city: toOptionalString(formData.get("city")),
    email: toRequiredString(formData.get("email")),
    phone: toOptionalString(formData.get("phone")),
    website: toOptionalString(formData.get("website")),
    partnershipInterest: mapPartnershipInterest(
      toOptionalString(formData.get("collaborationInterest")),
    ),
    message: toRequiredString(formData.get("message")),
    consent: parseBoolean(formData.get("consentAccepted")),
  });

  if (!parsed.success) {
    redirectWithError(redirectPath);
  }

  const locale = getSourceLocale(redirectPath);
  const suspiciousReason = getSuspiciousMessageReason(parsed.data.message);
  const record = await prisma.hospitalPartnershipInquiry.create({
    data: {
      hospitalName: parsed.data.hospitalName,
      contactPersonName: parsed.data.contactPersonName,
      designation: parsed.data.designation,
      country: parsed.data.country,
      city: parsed.data.city,
      email: parsed.data.email,
      phone: parsed.data.phone,
      telegram: toOptionalString(formData.get("telegram")),
      website: parsed.data.website,
      partnershipInterest: parsed.data.partnershipInterest,
      message: parsed.data.message,
      consent: parsed.data.consent,
      locale,
      sourcePage: redirectPath,
      userCountry: getClientCountry(),
      userIp: identifier,
      userAgent: getClientUserAgent(),
      status: suspiciousReason ? InquiryStatus.SPAM : InquiryStatus.NEW,
      priority: suspiciousReason ? InquiryPriority.HIGH : InquiryPriority.NORMAL,
      internalNote: suspiciousReason || null,
    },
  });

  const uploads = [
    ...((formData.getAll("partnershipDocuments").filter(Boolean) as File[]) || []),
    ...((formData.getAll("attachments").filter(Boolean) as File[]) || []),
  ];

  const storedUploads = await Promise.all(
    uploads.map((file) =>
      storeUploadedFile({
        file,
        category: FileCategory.PARTNERSHIP_DOCUMENT,
        hospitalPartnershipInquiryId: record.id,
      }),
    ),
  );

  const firstUpload = storedUploads.find(Boolean);

  if (firstUpload) {
    await prisma.hospitalPartnershipInquiry.update({
      where: { id: record.id },
      data: {
        uploadedDocumentUrl: `/api/files/${firstUpload.id}`,
      },
    });
  }

  if (suspiciousReason) {
    revalidatePath("/admin/inquiries");
    redirectWithError(redirectPath);
  }

  await sendInquiryNotifications({
    publicType: InquiryType.PARTNERSHIP,
    detailTitle: "Hospital Partnership Inquiry",
    recipientName: parsed.data.contactPersonName,
    recipientEmail: parsed.data.email,
    adminFields: [
      ["Hospital", parsed.data.hospitalName],
      ["Contact person", parsed.data.contactPersonName],
      ["Email", parsed.data.email],
      ["Phone", parsed.data.phone],
      ["Country", parsed.data.country],
      ["Website", parsed.data.website],
      ["Source page", redirectPath],
      ["Locale", locale],
      ["User country", getClientCountry()],
      ["Submitted time", record.createdAt.toISOString()],
    ],
    detailPagePath: `/admin/inquiries/hospital/${record.id}`,
    message: parsed.data.message,
    metadata: {
      inquiryType: "hospital",
      inquiryId: record.id,
    },
  });

  revalidatePath("/admin");
  revalidatePath("/admin/inquiries");
  revalidatePath(redirectPath);
  redirect(`${redirectPath}?submitted=partnership&id=${record.id}`);
}

async function handleStudentMobilityInquirySubmission(formData: FormData) {
  assertValidServerActionOrigin();
  const redirectPath = resolveRedirectPath(
    formData.get("redirectPath"),
    "/student-mobility",
  );

  if (resolveHoneypotValue(formData)) {
    redirect(redirectPath);
  }

  const validationMessages = getValidationMessages(redirectPath);
  const identifier = getClientIdentifier();

  try {
    assertRateLimit({
      key: `student-inquiry:${identifier}`,
      limit: 5,
      windowMs: 1000 * 60 * 10,
    });
  } catch {
    redirectWithError(redirectPath);
  }

  const rawProgramInterest =
    toOptionalString(formData.get("programInterest")) ||
    toOptionalString(formData.get("collaborationInterest"));
  const schema = createStudentMobilityInquirySubmissionSchema(validationMessages);
  const parsed = schema.safeParse({
    studentName: toRequiredString(formData.get("name")),
    country: toRequiredString(formData.get("country")),
    phone: toOptionalString(formData.get("phone")),
    email: toRequiredString(formData.get("email")),
    interestedService: mapStudentService(rawProgramInterest),
    preferredCountry: toOptionalString(formData.get("preferredCountry")),
    preferredCourse: toOptionalString(formData.get("preferredCourse")),
    message: toRequiredString(formData.get("message")),
    consent: parseBoolean(formData.get("consentAccepted")),
  });

  if (!parsed.success) {
    redirectWithError(redirectPath);
  }

  const locale = getSourceLocale(redirectPath);
  const suspiciousReason = getSuspiciousMessageReason(parsed.data.message);
  const record = await prisma.studentMobilityInquiry.create({
    data: {
      name: parsed.data.studentName,
      organization: toOptionalString(formData.get("organization")),
      country: parsed.data.country,
      city: toOptionalString(formData.get("city")),
      phone: parsed.data.phone,
      telegram: toOptionalString(formData.get("telegram")),
      email: parsed.data.email,
      message: parsed.data.message,
      programInterest: rawProgramInterest,
      preferredCountry: parsed.data.preferredCountry,
      preferredCourse: parsed.data.preferredCourse,
      interestedService: parsed.data.interestedService,
      academicBackground: toOptionalString(formData.get("academicBackground")),
      consent: parsed.data.consent,
      locale,
      sourcePage: redirectPath,
      sourcePath: redirectPath,
      userCountry: getClientCountry(),
      userIp: identifier,
      userAgent: getClientUserAgent(),
      status: suspiciousReason ? InquiryStatus.SPAM : InquiryStatus.NEW,
      priority: suspiciousReason ? LeadPriority.HIGH : LeadPriority.MEDIUM,
      internalNote: suspiciousReason || null,
    },
  });

  const uploads = (formData.getAll("attachments").filter(Boolean) as File[]) || [];

  await Promise.all(
    uploads.map((file) =>
      storeUploadedFile({
        file,
        category: FileCategory.GENERAL,
        studentMobilityInquiryId: record.id,
      }),
    ),
  );

  if (suspiciousReason) {
    revalidatePath("/admin/inquiries");
    redirectWithError(redirectPath);
  }

  await sendInquiryNotifications({
    publicType: InquiryType.STUDENT_MOBILITY,
    detailTitle: "Student Mobility Inquiry",
    recipientName: parsed.data.studentName,
    recipientEmail: parsed.data.email,
    adminFields: [
      ["Name", parsed.data.studentName],
      ["Organization", toOptionalString(formData.get("organization"))],
      ["Email", parsed.data.email],
      ["Phone", parsed.data.phone],
      ["Country", parsed.data.country],
      ["Preferred country", parsed.data.preferredCountry],
      ["Preferred course", parsed.data.preferredCourse],
      ["Source page", redirectPath],
      ["Locale", locale],
      ["User country", getClientCountry()],
      ["Submitted time", record.createdAt.toISOString()],
    ],
    detailPagePath: `/admin/inquiries/student/${record.id}`,
    message: parsed.data.message,
    metadata: {
      inquiryType: "student",
      inquiryId: record.id,
    },
  });

  revalidatePath("/admin");
  revalidatePath("/admin/inquiries");
  revalidatePath(redirectPath);
  redirect(`${redirectPath}?submitted=student_mobility&id=${record.id}`);
}

export async function submitContactInquiry(formData: FormData) {
  return handleContactInquirySubmission(formData);
}

export async function submitPatientInquiry(formData: FormData) {
  return handlePatientInquirySubmission(formData, InquiryType.INTERNATIONAL_PATIENT);
}

export async function submitHospitalPartnershipInquiry(formData: FormData) {
  return handleHospitalPartnershipInquirySubmission(formData);
}

export async function submitStudentMobilityInquiry(formData: FormData) {
  return handleStudentMobilityInquirySubmission(formData);
}

export async function submitContactInquiryAction(formData: FormData) {
  const inquiryType = toOptionalString(formData.get("inquiryType"));

  if (inquiryType === InquiryType.PARTNERSHIP) {
    return handleHospitalPartnershipInquirySubmission(formData);
  }

  if (inquiryType === InquiryType.INTERNATIONAL_PATIENT) {
    return handlePatientInquirySubmission(formData, InquiryType.INTERNATIONAL_PATIENT);
  }

  if (inquiryType === InquiryType.STUDENT_MOBILITY) {
    return handleStudentMobilityInquirySubmission(formData);
  }

  return handleContactInquirySubmission(formData);
}

export async function submitMedicalTourismInquiryAction(formData: FormData) {
  return handlePatientInquirySubmission(formData, InquiryType.MEDICAL_TOURISM);
}
