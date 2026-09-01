"use server";

import {
  AnalyticsEventType,
  FileCategory,
  InquiryPriority,
  InquiryStatus,
  InquiryType,
  Prisma,
} from "@prisma/client";
import { revalidatePath } from "next/cache";

import { buildSimpleEmail, sendEmail } from "@/lib/email";
import { getInquiryAdminRecipient } from "@/lib/email/routing";
import { env } from "@/lib/env";
import { getLocaleFromPathname } from "@/lib/i18n/config";
import { absoluteUrl } from "@/lib/metadata";
import { sendTelegramNotification } from "@/lib/notifications";
import { prisma } from "@/lib/prisma";
import { assertValidServerActionOrigin } from "@/lib/security/origin";
import { assertRateLimit } from "@/lib/security/rate-limit";
import {
  getClientCountry,
  getClientIdentifier,
  getClientUserAgent,
  getSuspiciousMessageReason,
} from "@/lib/security/spam";
import {
  costEstimateLeadSchema,
  parseCostEstimateSnapshot,
} from "@/lib/validators/cost-estimate";
import { storeUploadedFile, validateUploadedFile } from "@/lib/uploads";
import { toOptionalString, toRequiredString } from "@/lib/utils";

export type CostEstimateLeadResult =
  | {
      success: true;
      message: string;
      inquiryId?: string;
      uploadWarning?: string;
    }
  | {
      success: false;
      message: string;
      code: "VALIDATION_ERROR" | "RATE_LIMITED" | "SUBMISSION_ERROR";
      fieldErrors?: Record<string, string[] | undefined>;
    };

function parseBoolean(value: FormDataEntryValue | null | undefined) {
  return value === "true" || value === "on" || value === "1";
}

function getReports(formData: FormData) {
  const files = [
    ...formData.getAll("medicalReports"),
    ...formData.getAll("attachments"),
  ].filter((entry): entry is File => entry instanceof File && entry.size > 0);

  if (files.length > 5) {
    throw new Error("You can upload a maximum of five medical reports.");
  }

  files.forEach((file) => validateUploadedFile(file, FileCategory.MEDICAL_REPORT));
  return files;
}

function buildBudgetRange(
  minimum?: number,
  maximum?: number,
  currency = "USD",
) {
  if (minimum === undefined && maximum === undefined) {
    return undefined;
  }

  const formatter = new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0,
  });

  if (minimum !== undefined && maximum !== undefined) {
    return `${formatter.format(minimum)}–${formatter.format(maximum)} ${currency}`;
  }

  return `${formatter.format(minimum ?? maximum ?? 0)} ${currency}`;
}

function getSnapshotJson(
  snapshot: ReturnType<typeof parseCostEstimateSnapshot>,
): Prisma.InputJsonValue {
  return JSON.parse(JSON.stringify(snapshot)) as Prisma.InputJsonValue;
}

function buildAdminMessage({
  inquiryId,
  fullName,
  country,
  phone,
  whatsapp,
  email,
  preferredTreatment,
  medicalCondition,
  estimateRange,
}: {
  inquiryId: string;
  fullName: string;
  country: string;
  phone: string;
  whatsapp: string;
  email: string;
  preferredTreatment: string;
  medicalCondition: string;
  estimateRange?: string;
}) {
  return [
    "A medical cost calculator lead has been submitted.",
    `Inquiry ID: ${inquiryId}`,
    `Patient: ${fullName}`,
    `Country: ${country}`,
    `Phone: ${phone}`,
    `WhatsApp: ${whatsapp}`,
    `Email: ${email}`,
    `Preferred treatment: ${preferredTreatment}`,
    `Displayed estimate: ${estimateRange || "Not provided"}`,
    `Medical condition: ${medicalCondition}`,
    `CRM record: ${absoluteUrl(`/admin/inquiries/patient/${inquiryId}`)}`,
  ].join("\n");
}

export async function submitCostEstimateLead(
  formData: FormData,
): Promise<CostEstimateLeadResult> {
  assertValidServerActionOrigin();

  if (toOptionalString(formData.get(env.SPAM_HONEYPOT_FIELD))) {
    return {
      success: true,
      message: "Your request has been received.",
    };
  }

  const identifier = getClientIdentifier();

  try {
    assertRateLimit({
      key: `cost-estimate-lead:${identifier}`,
      limit: 4,
      windowMs: 1000 * 60 * 10,
    });
  } catch {
    return {
      success: false,
      code: "RATE_LIMITED",
      message: "Too many requests. Please wait a few minutes and try again.",
    };
  }

  let estimateSnapshot: ReturnType<typeof parseCostEstimateSnapshot>;
  let reports: File[];

  try {
    estimateSnapshot = parseCostEstimateSnapshot(formData.get("estimateSnapshot"));
    reports = getReports(formData);
  } catch (error) {
    return {
      success: false,
      code: "VALIDATION_ERROR",
      message:
        error instanceof Error
          ? error.message
          : "Please review the estimate and uploaded reports.",
    };
  }

  const phone = toRequiredString(formData.get("phone"));
  const parsed = costEstimateLeadSchema.safeParse({
    fullName:
      toOptionalString(formData.get("fullName")) ||
      toOptionalString(formData.get("patientName")) ||
      toRequiredString(formData.get("name")),
    country: toRequiredString(formData.get("country")),
    phone,
    whatsapp: toOptionalString(formData.get("whatsapp")) || phone,
    email: toRequiredString(formData.get("email")),
    preferredTreatment:
      toOptionalString(formData.get("preferredTreatment")) ||
      toOptionalString(formData.get("treatmentName")) ||
      toRequiredString(formData.get("treatmentSlug")),
    medicalCondition:
      toOptionalString(formData.get("medicalCondition")) ||
      toOptionalString(formData.get("diagnosisOrConcern")) ||
      toRequiredString(formData.get("message")),
    consentAccepted:
      parseBoolean(formData.get("consentAccepted")) ||
      parseBoolean(formData.get("consent")),
    redirectPath:
      toOptionalString(formData.get("redirectPath")) || "/cost-calculator",
    sessionId: toOptionalString(formData.get("sessionId")),
    estimateSnapshot,
  });

  if (!parsed.success) {
    return {
      success: false,
      code: "VALIDATION_ERROR",
      message: "Please review the highlighted fields and try again.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const sourcePage = parsed.data.redirectPath;
  const locale = getLocaleFromPathname(sourcePage);
  const estimateRange = buildBudgetRange(
    parsed.data.estimateSnapshot.minimumEstimate ??
      parsed.data.estimateSnapshot.estimatedTotal,
    parsed.data.estimateSnapshot.maximumEstimate ??
      parsed.data.estimateSnapshot.estimatedTotal,
    parsed.data.estimateSnapshot.currency,
  );
  const operationalMessage = [
    `Cost estimate request for ${parsed.data.preferredTreatment}.`,
    `Medical condition: ${parsed.data.medicalCondition}`,
  ].join("\n");
  const suspiciousReason = getSuspiciousMessageReason(operationalMessage);

  try {
    const record = await prisma.patientInquiry.create({
      data: {
        patientName: parsed.data.fullName,
        age: parsed.data.estimateSnapshot.age,
        gender: parsed.data.estimateSnapshot.gender,
        country: parsed.data.country,
        phone: parsed.data.phone,
        whatsapp: parsed.data.whatsapp,
        email: parsed.data.email,
        patientNationality: parsed.data.country,
        preferredTreatmentDepartment: parsed.data.preferredTreatment,
        diagnosisOrConcern: parsed.data.medicalCondition,
        preferredTreatmentCountry: "India",
        preferredHospital:
          parsed.data.estimateSnapshot.hospitalName ||
          parsed.data.estimateSnapshot.hospitalId,
        budgetRange: estimateRange,
        needsVisaSupport:
          parsed.data.estimateSnapshot.services?.visaAssistance ?? false,
        needsAccommodationSupport: Boolean(
          parsed.data.estimateSnapshot.hotelCategory ||
            parsed.data.estimateSnapshot.expectedStayDays,
        ),
        costEstimateSnapshot: getSnapshotJson(parsed.data.estimateSnapshot),
        message: operationalMessage,
        consent: parsed.data.consentAccepted,
        locale,
        sourcePage,
        userCountry: getClientCountry(),
        userIp: identifier,
        userAgent: getClientUserAgent(),
        status: suspiciousReason ? InquiryStatus.SPAM : InquiryStatus.NEW,
        priority: suspiciousReason
          ? InquiryPriority.HIGH
          : InquiryPriority.NORMAL,
        internalNote: suspiciousReason || null,
      },
    });

    const uploadResults = await Promise.allSettled(
      reports.map((file) =>
        storeUploadedFile({
          file,
          category: FileCategory.MEDICAL_REPORT,
          patientInquiryId: record.id,
          documentLabel: "Cost estimate medical report",
        }),
      ),
    );
    const storedUploads = uploadResults
      .filter(
        (
          result,
        ): result is PromiseFulfilledResult<
          Awaited<ReturnType<typeof storeUploadedFile>>
        > => result.status === "fulfilled",
      )
      .map((result) => result.value)
      .filter(Boolean);
    const failedUploadCount = uploadResults.length - storedUploads.length;
    const firstUpload = storedUploads[0];

    if (firstUpload || failedUploadCount) {
      await prisma.patientInquiry.update({
        where: { id: record.id },
        data: {
          uploadedDocumentUrl: firstUpload
            ? `/api/files/${firstUpload.id}`
            : undefined,
          internalNote: [
            suspiciousReason,
            failedUploadCount
              ? `${failedUploadCount} report upload(s) could not be stored.`
              : null,
          ]
            .filter(Boolean)
            .join("\n") || undefined,
        },
      });
    }

    if (!suspiciousReason) {
      const adminMessage = buildAdminMessage({
        inquiryId: record.id,
        fullName: parsed.data.fullName,
        country: parsed.data.country,
        phone: parsed.data.phone,
        whatsapp: parsed.data.whatsapp,
        email: parsed.data.email,
        preferredTreatment: parsed.data.preferredTreatment,
        medicalCondition: parsed.data.medicalCondition,
        estimateRange,
      });

      await Promise.allSettled([
        sendEmail({
          to: await getInquiryAdminRecipient(InquiryType.MEDICAL_TOURISM),
          subject: "New Medical Cost Estimate Lead | MedPobeda Group",
          ...buildSimpleEmail({
            heading: "New Medical Cost Estimate Lead",
            body: adminMessage,
          }),
          templateKey: "admin-cost-estimate-lead",
          log: {
            metadata: {
              inquiryId: record.id,
              source: "cost-calculator",
            },
          },
        }),
        sendEmail({
          to: parsed.data.email,
          subject: "Your cost estimate request was received",
          ...buildSimpleEmail({
            heading: "Your cost estimate request was received",
            body: `Thank you, ${parsed.data.fullName}. We received your request regarding ${parsed.data.preferredTreatment}. A MedPobeda Group coordinator will review the information and contact you with the next steps. The calculator estimate is informational and the final quotation will depend on medical review and hospital confirmation.`,
          }),
          templateKey: "cost-estimate-lead-acknowledgement",
          log: {
            metadata: {
              inquiryId: record.id,
              source: "cost-calculator",
            },
          },
        }),
        sendTelegramNotification(
          `New cost estimate lead: ${parsed.data.fullName}, ${parsed.data.country}, ${parsed.data.preferredTreatment}. Inquiry ${record.id}.`,
        ),
        prisma.analyticsEvent.create({
          data: {
            eventType: AnalyticsEventType.FORM_SUCCESS,
            path: sourcePage,
            country: parsed.data.country,
            inquiryType: InquiryType.MEDICAL_TOURISM,
            sessionId: parsed.data.sessionId,
            metadata: {
              calculatorEvent: "LEAD_SUBMISSION",
              inquiryId: record.id,
              treatment: parsed.data.preferredTreatment,
              hospitalId: parsed.data.estimateSnapshot.hospitalId ?? null,
            },
          },
        }),
      ]);
    }

    revalidatePath("/admin");
    revalidatePath("/admin/inquiries");
    revalidatePath(sourcePage);

    return {
      success: true,
      inquiryId: record.id,
      message:
        "Your estimate request has been saved. Our medical coordination team will contact you shortly.",
      ...(failedUploadCount
        ? {
            uploadWarning:
              "Your request was saved, but one or more reports could not be uploaded. A coordinator will help you resend them.",
          }
        : {}),
    };
  } catch (error) {
    console.error("Cost estimate lead submission failed", error);

    return {
      success: false,
      code: "SUBMISSION_ERROR",
      message:
        "We could not save your request right now. Please try again or contact MedPobeda Group directly.",
    };
  }
}
