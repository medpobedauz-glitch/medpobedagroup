"use server";

import { revalidatePath } from "next/cache";

import { logAuditEvent } from "@/lib/audit";
import { requireSuperAdmin } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma";
import { assertValidServerActionOrigin } from "@/lib/security/origin";
import { getClientIdentifier } from "@/lib/security/spam";
import { platformSettingsSchema } from "@/lib/validators/settings";
import { toOptionalString, toRequiredString, unique } from "@/lib/utils";

function revalidateSettingsSurface() {
  [
    "/",
    "/about",
    "/services",
    "/medical-tourism",
    "/hospital-partnerships",
    "/international-patients",
    "/student-mobility",
    "/contact",
    "/blog",
    "/admin/settings",
  ].forEach((path) => revalidatePath(path));
}

export async function savePlatformSettingsAction(formData: FormData) {
  assertValidServerActionOrigin();
  const user = await requireSuperAdmin();

  const parsed = platformSettingsSchema.parse({
    brandName: toRequiredString(formData.get("brandName")),
    shortName: toRequiredString(formData.get("shortName")),
    siteUrl: toRequiredString(formData.get("siteUrl")),
    seoDefaultTitle: toRequiredString(formData.get("seoDefaultTitle")),
    seoDefaultDescription: toRequiredString(formData.get("seoDefaultDescription")),
    seoKeywords: unique(
      toRequiredString(formData.get("seoKeywords"))
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
    ),
    ogImage: toOptionalString(formData.get("ogImage")),
    twitterHandle: toOptionalString(formData.get("twitterHandle")),
    linkedinUrl: toOptionalString(formData.get("linkedinUrl")) ?? "",
    xUrl: toOptionalString(formData.get("xUrl")) ?? "",
    youtubeUrl: toOptionalString(formData.get("youtubeUrl")) ?? "",
    whatsappNumber: toOptionalString(formData.get("whatsappNumber")),
    telegramHandle: toOptionalString(formData.get("telegramHandle")),
    contactEmail: toRequiredString(formData.get("contactEmail")),
    contactPhone: toOptionalString(formData.get("contactPhone")),
    medicalTourismEmail: toOptionalString(formData.get("medicalTourismEmail")) ?? "",
    partnershipEmail: toOptionalString(formData.get("partnershipEmail")) ?? "",
    studentMobilityEmail: toOptionalString(formData.get("studentMobilityEmail")) ?? "",
    generalInquiryEmail: toOptionalString(formData.get("generalInquiryEmail")) ?? "",
    highUrgencyEmail: toOptionalString(formData.get("highUrgencyEmail")) ?? "",
    brandingPrimary: toRequiredString(formData.get("brandingPrimary")),
    brandingSecondary: toRequiredString(formData.get("brandingSecondary")),
  });

  const requestSource = getClientIdentifier();

  await prisma.platformSetting.upsert({
    where: { id: "main" },
    create: {
      id: "main",
      ...parsed,
      inquiryRouting: {
        contact: parsed.generalInquiryEmail,
        partnership: parsed.partnershipEmail,
        medicalTourism: parsed.medicalTourismEmail,
        studentMobility: parsed.studentMobilityEmail,
        highUrgency: parsed.highUrgencyEmail,
      },
    },
    update: {
      ...parsed,
      inquiryRouting: {
        contact: parsed.generalInquiryEmail,
        partnership: parsed.partnershipEmail,
        medicalTourism: parsed.medicalTourismEmail,
        studentMobility: parsed.studentMobilityEmail,
        highUrgency: parsed.highUrgencyEmail,
      },
    },
  });

  await logAuditEvent({
    actorId: user.id,
    action: "settings.platform.saved",
    entityType: "platformSetting",
    entityId: "main",
    description: "Platform settings updated from the admin settings console.",
    metadata: {
      requestSource,
      siteUrl: parsed.siteUrl,
      contactEmail: parsed.contactEmail,
    },
  });

  revalidateSettingsSurface();
}
