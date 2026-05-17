import "server-only";

import { InquiryType } from "@prisma/client";

import { env } from "@/lib/env";
import { prisma } from "@/lib/prisma";

function getDefaultAdminEmail() {
  return (
    env.CONTACT_ADMIN_EMAIL ||
    env.NEXT_PUBLIC_CONTACT_EMAIL ||
    env.ADMIN_BOOTSTRAP_EMAIL
  );
}

async function getStoredRouting() {
  if (!env.DATABASE_URL) {
    return null;
  }

  return prisma.platformSetting.findUnique({
    where: { id: "main" },
    select: {
      medicalTourismEmail: true,
      partnershipEmail: true,
      studentMobilityEmail: true,
      generalInquiryEmail: true,
      highUrgencyEmail: true,
    },
  });
}

export async function getInquiryAdminRecipient(type: InquiryType) {
  const stored = await getStoredRouting();
  const defaultAdmin = stored?.generalInquiryEmail || getDefaultAdminEmail();

  if (type === InquiryType.MEDICAL_TOURISM || type === InquiryType.INTERNATIONAL_PATIENT) {
    return stored?.medicalTourismEmail || env.MEDICAL_TOURISM_ADMIN_EMAIL || defaultAdmin;
  }

  if (type === InquiryType.PARTNERSHIP) {
    return stored?.partnershipEmail || env.PARTNERSHIP_ADMIN_EMAIL || defaultAdmin;
  }

  if (type === InquiryType.STUDENT_MOBILITY) {
    return (
      stored?.studentMobilityEmail || env.STUDENT_MOBILITY_ADMIN_EMAIL || defaultAdmin
    );
  }

  return defaultAdmin;
}

export async function getHighUrgencyAlertRecipient() {
  const stored = await getStoredRouting();

  return (
    stored?.highUrgencyEmail ||
    stored?.medicalTourismEmail ||
    env.HIGH_URGENCY_ALERT_EMAIL ||
    env.MEDICAL_TOURISM_ADMIN_EMAIL ||
    stored?.generalInquiryEmail ||
    getDefaultAdminEmail()
  );
}
