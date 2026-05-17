import "server-only";

import type { UserRole } from "@prisma/client";

import { prisma } from "@/lib/prisma";

export async function getAdminNotificationFeed(userId: string, role: UserRole) {
  return prisma.internalNotification.findMany({
    where:
      role === "SUPER_ADMIN" || role === "ADMIN"
        ? undefined
        : {
            userId,
          },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
        },
      },
    },
    orderBy: [{ createdAt: "desc" }],
    take: 50,
  });
}
