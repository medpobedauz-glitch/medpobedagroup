import "server-only";

import { prisma } from "@/lib/prisma";

export async function getPatientCasesForAdmin() {
  return prisma.patientCase.findMany({
    include: {
      patient: {
        include: {
          countryRecord: true,
        },
      },
      medicalTourismInquiry: {
        include: {
          assignedHospital: true,
        },
      },
      country: true,
      coordinator: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              role: true,
            },
          },
          office: true,
          country: true,
        },
      },
      assignedHospital: true,
      assignedManager: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
        },
      },
      timelineEntries: {
        include: {
          createdBy: {
            select: {
              id: true,
              name: true,
              role: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
        take: 8,
      },
      communications: {
        include: {
          createdBy: {
            select: {
              id: true,
              name: true,
              role: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
        take: 8,
      },
      uploadedFiles: {
        orderBy: [{ uploadedAt: "desc" }],
        take: 10,
      },
      tasks: {
        include: {
          assignedTo: {
            select: {
              id: true,
              name: true,
              email: true,
              role: true,
            },
          },
          createdBy: {
            select: {
              id: true,
              name: true,
              role: true,
            },
          },
        },
        orderBy: [{ dueAt: "asc" }, { createdAt: "desc" }],
        take: 8,
      },
    },
    orderBy: [{ updatedAt: "desc" }],
  });
}

export async function getOpenMedicalTourismInquiriesForCases() {
  return prisma.medicalTourismInquiry.findMany({
    where: {
      patientCase: null,
    },
    include: {
      patient: true,
      assignedHospital: true,
      assignedTo: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
        },
      },
    },
    orderBy: [{ createdAt: "desc" }],
    take: 60,
  });
}

export async function getPatientCaseById(caseId: string) {
  return prisma.patientCase.findUnique({
    where: { id: caseId },
    include: {
      patient: true,
      coordinator: {
        include: {
          user: true,
          office: true,
          country: true,
        },
      },
      assignedHospital: true,
      assignedManager: true,
      medicalTourismInquiry: true,
    },
  });
}
