import "server-only";

import { TaskStatus } from "@prisma/client";

import { prisma } from "@/lib/prisma";
import { notifyUsers } from "@/lib/services/notification-service";

export async function createOperationalTask({
  title,
  description,
  priority,
  assignedToId,
  createdById,
  leadModel,
  leadId,
  patientCaseId,
  partnershipId,
  dueAt,
}: {
  title: string;
  description?: string | null;
  priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT";
  assignedToId?: string | null;
  createdById?: string | null;
  leadModel?: string | null;
  leadId?: string | null;
  patientCaseId?: string | null;
  partnershipId?: string | null;
  dueAt?: Date | null;
}) {
  const task = await prisma.staffTask.create({
    data: {
      title,
      description: description ?? undefined,
      priority,
      assignedToId: assignedToId ?? undefined,
      createdById: createdById ?? undefined,
      leadModel: leadModel ?? undefined,
      leadId: leadId ?? undefined,
      patientCaseId: patientCaseId ?? undefined,
      partnershipId: partnershipId ?? undefined,
      dueAt: dueAt ?? undefined,
    },
    include: {
      assignedTo: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
        },
      },
    },
  });

  await notifyUsers({
    userIds: [assignedToId],
    type: "TASK",
    title: "New task assigned",
    message: title,
    link: patientCaseId ? "/admin/cases" : "/admin/operations",
    metadata: {
      taskId: task.id,
      patientCaseId,
      partnershipId,
      leadModel,
      leadId,
    },
  });

  return task;
}

export async function updateOperationalTaskStatus(taskId: string, status: TaskStatus) {
  return prisma.staffTask.update({
    where: { id: taskId },
    data: {
      status,
      completedAt: status === TaskStatus.DONE ? new Date() : null,
    },
  });
}
