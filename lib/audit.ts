import "server-only";

import { Prisma } from "@prisma/client";
import { headers } from "next/headers";

import { prisma } from "@/lib/prisma";

type AuditEventInput = {
  actorId?: string | null;
  action: string;
  entityType?: string | null;
  entityId?: string | null;
  description: string;
  metadata?: Record<string, unknown> | null;
};

export async function logAuditEvent({
  actorId,
  action,
  entityType,
  entityId,
  description,
  metadata,
}: AuditEventInput) {
  const requestHeaders = headers();
  const forwardedFor = requestHeaders.get("x-forwarded-for");
  const ipAddress = forwardedFor?.split(",")[0]?.trim() || requestHeaders.get("x-real-ip");
  const userAgent = requestHeaders.get("user-agent");

  await prisma.auditLog.create({
    data: {
      actorId: actorId ?? undefined,
      action,
      entityType: entityType ?? undefined,
      entityId: entityId ?? undefined,
      description,
      metadata: (metadata as Prisma.InputJsonValue | null | undefined) ?? undefined,
      ipAddress: ipAddress ?? undefined,
      userAgent: userAgent ?? undefined,
    },
  });
}
