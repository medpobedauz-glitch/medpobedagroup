import "server-only";

import { unstable_noStore as noStore } from "next/cache";

import { prisma } from "@/lib/prisma";

export async function getPartnershipCrmData() {
  noStore();

  return prisma.partnership.findMany({
    include: {
      hospital: true,
      contacts: true,
      uploadedFiles: {
        orderBy: { uploadedAt: "desc" },
        take: 6,
      },
      notes: {
        include: { author: true },
        orderBy: { createdAt: "desc" },
        take: 5,
      },
      meetings: {
        orderBy: { meetingAt: "desc" },
        take: 5,
      },
      leads: {
        orderBy: { createdAt: "desc" },
        take: 5,
      },
    },
    orderBy: { updatedAt: "desc" },
  });
}

export async function getHospitalsForAdmin() {
  noStore();

  return prisma.hospital.findMany({
    include: {
      _count: {
        select: {
          partnerships: true,
          partnerLeads: true,
          assignedMedicalTourismInquiries: true,
          uploadedFiles: true,
        },
      },
      partnerships: {
        orderBy: { updatedAt: "desc" },
        take: 1,
      },
      contacts: {
        orderBy: { createdAt: "desc" },
        take: 3,
      },
    },
    orderBy: [{ country: "asc" }, { name: "asc" }],
  });
}
