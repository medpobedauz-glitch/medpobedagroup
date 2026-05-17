import "server-only";

import { prisma } from "@/lib/prisma";

export async function getRecentAIAssessments(limit = 20) {
  return prisma.aILeadAssessment.findMany({
    include: {
      suggestedCoordinator: {
        include: {
          country: true,
          office: true,
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              role: true,
            },
          },
        },
      },
    },
    orderBy: [{ updatedAt: "desc" }],
    take: limit,
  });
}
