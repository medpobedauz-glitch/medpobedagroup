import "server-only";

import { unstable_noStore as noStore } from "next/cache";

import { env } from "@/lib/env";
import { prisma } from "@/lib/prisma";
import { siteConfig } from "@/lib/site";

export const defaultPlatformSettings = {
  id: "main",
  brandName: siteConfig.name,
  shortName: siteConfig.shortName,
  siteUrl: siteConfig.siteUrl,
  seoDefaultTitle: `${siteConfig.name} | ${siteConfig.tagline}`,
  seoDefaultDescription: siteConfig.description,
  seoKeywords: [
    "MedPobeda Group",
    "medical tourism Uzbekistan",
    "hospital partnership India",
    "international patient coordination",
    "student mobility Uzbekistan",
  ],
  ogImage: "/opengraph-image",
  twitterHandle: "",
  linkedinUrl: "",
  xUrl: "",
  youtubeUrl: "",
  whatsappNumber: siteConfig.whatsappNumber,
  telegramHandle: siteConfig.telegramHandle,
  contactEmail: siteConfig.contactEmail,
  contactPhone: siteConfig.contactPhone,
  medicalTourismEmail: env.MEDICAL_TOURISM_ADMIN_EMAIL,
  partnershipEmail: env.PARTNERSHIP_ADMIN_EMAIL,
  studentMobilityEmail: env.STUDENT_MOBILITY_ADMIN_EMAIL,
  generalInquiryEmail: env.CONTACT_ADMIN_EMAIL || siteConfig.contactEmail,
  highUrgencyEmail: env.HIGH_URGENCY_ALERT_EMAIL || env.MEDICAL_TOURISM_ADMIN_EMAIL,
  brandingPrimary: "#0B1F4D",
  brandingSecondary: "#1D4ED8",
} as const;

export type PlatformSettingsSnapshot = typeof defaultPlatformSettings;

export async function getPlatformSettings() {
  noStore();

  if (!env.DATABASE_URL) {
    return defaultPlatformSettings;
  }

  const stored = await prisma.platformSetting.findUnique({
    where: { id: "main" },
  });

  if (!stored) {
    return defaultPlatformSettings;
  }

  return {
    ...defaultPlatformSettings,
    ...stored,
    siteUrl: stored.siteUrl || defaultPlatformSettings.siteUrl,
    seoDefaultTitle:
      stored.seoDefaultTitle || defaultPlatformSettings.seoDefaultTitle,
    seoDefaultDescription:
      stored.seoDefaultDescription || defaultPlatformSettings.seoDefaultDescription,
    seoKeywords: stored.seoKeywords.length
      ? stored.seoKeywords
      : defaultPlatformSettings.seoKeywords,
    contactEmail: stored.contactEmail || defaultPlatformSettings.contactEmail,
    contactPhone: stored.contactPhone || defaultPlatformSettings.contactPhone,
    medicalTourismEmail:
      stored.medicalTourismEmail || defaultPlatformSettings.medicalTourismEmail,
    partnershipEmail:
      stored.partnershipEmail || defaultPlatformSettings.partnershipEmail,
    studentMobilityEmail:
      stored.studentMobilityEmail || defaultPlatformSettings.studentMobilityEmail,
    generalInquiryEmail:
      stored.generalInquiryEmail || defaultPlatformSettings.generalInquiryEmail,
    highUrgencyEmail:
      stored.highUrgencyEmail || defaultPlatformSettings.highUrgencyEmail,
    brandingPrimary:
      stored.brandingPrimary || defaultPlatformSettings.brandingPrimary,
    brandingSecondary:
      stored.brandingSecondary || defaultPlatformSettings.brandingSecondary,
  };
}
