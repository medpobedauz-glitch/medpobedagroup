import "server-only";

import { NotificationStatus, type NotificationType, Prisma } from "@prisma/client";

import { prisma } from "@/lib/prisma";

export async function notifyUsers({
  userIds,
  title,
  message,
  type = "INFO",
  link,
  metadata,
}: {
  userIds: Array<string | null | undefined>;
  title: string;
  message: string;
  type?: NotificationType;
  link?: string | null;
  metadata?: Record<string, unknown> | null;
}) {
  const uniqueUserIds = Array.from(
    new Set(userIds.filter((value): value is string => Boolean(value))),
  );

  if (!uniqueUserIds.length) {
    return [];
  }

  return Promise.all(
    uniqueUserIds.map((userId) =>
      prisma.internalNotification.create({
        data: {
          userId,
          title,
          message,
          type,
          link: link ?? undefined,
          metadata: (metadata as Prisma.InputJsonValue | null | undefined) ?? undefined,
        },
      }),
    ),
  );
}

export async function markNotificationAsRead(notificationId: string, userId: string) {
  return prisma.internalNotification.updateMany({
    where: {
      id: notificationId,
      userId,
      status: NotificationStatus.UNREAD,
    },
    data: {
      status: NotificationStatus.READ,
      readAt: new Date(),
    },
  });
}
