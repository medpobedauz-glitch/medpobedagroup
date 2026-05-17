import "server-only";

import { prisma } from "@/lib/prisma";

export async function getOperationsTasks() {
  return prisma.staffTask.findMany({
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
          email: true,
          role: true,
        },
      },
      patientCase: {
        select: {
          id: true,
          caseNumber: true,
          status: true,
        },
      },
      partnership: {
        include: {
          hospital: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
    orderBy: [{ dueAt: "asc" }, { createdAt: "desc" }],
  });
}
