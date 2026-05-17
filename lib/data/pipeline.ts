import "server-only";

import { LeadPriority, PipelineStage } from "@prisma/client";
import { unstable_noStore as noStore } from "next/cache";

import { pipelineStageOptions } from "@/lib/admin-config";
import { env } from "@/lib/env";
import { prisma } from "@/lib/prisma";
import { startCase } from "@/lib/utils";

export type PipelineLeadItem = {
  id: string;
  model:
    | "contactSubmission"
    | "partnershipLead"
    | "studentMobilityInquiry"
    | "medicalTourismInquiry";
  name: string;
  email: string;
  organization?: string | null;
  country?: string | null;
  inquiryType: string;
  pipelineStage: PipelineStage;
  priority: LeadPriority;
  assignedToId?: string | null;
  assignedToName?: string | null;
  sourcePath?: string | null;
  tags: string[];
  createdAt: Date;
  secondaryLabel?: string | null;
  reminderCount: number;
  noteCount: number;
  reminders: Array<{
    id: string;
    title: string;
    dueAt: Date;
    priority: LeadPriority;
    isCompleted: boolean;
    assignedToName?: string | null;
  }>;
};

export async function getLeadPipelineBoardData() {
  noStore();

  if (!env.DATABASE_URL) {
    return {
      columns: pipelineStageOptions.map((stage) => ({
        stage,
        label: startCase(stage),
        items: [] as PipelineLeadItem[],
      })),
      stats: {
        total: 0,
        unassigned: 0,
        converted: 0,
        overdueReminders: 0,
        dueToday: 0,
      },
      reminders: [] as Array<{
        id: string;
        leadModel: string;
        leadId: string;
        title: string;
        dueAt: Date;
        priority: LeadPriority;
        assignedToName?: string | null;
      }>,
    };
  }

  const [contacts, partnerships, students, tourism, reminders] = await Promise.all([
    prisma.contactSubmission.findMany({
      include: {
        assignedTo: { select: { id: true, name: true } },
        _count: { select: { notes: true } },
      },
      orderBy: [{ priority: "desc" }, { createdAt: "desc" }],
      take: 120,
    }),
    prisma.partnershipLead.findMany({
      include: {
        assignedTo: { select: { id: true, name: true } },
        _count: { select: { notes: true } },
      },
      orderBy: [{ priority: "desc" }, { createdAt: "desc" }],
      take: 120,
    }),
    prisma.studentMobilityInquiry.findMany({
      include: {
        assignedTo: { select: { id: true, name: true } },
        _count: { select: { notes: true } },
      },
      orderBy: [{ priority: "desc" }, { createdAt: "desc" }],
      take: 120,
    }),
    prisma.medicalTourismInquiry.findMany({
      include: {
        assignedTo: { select: { id: true, name: true } },
        _count: { select: { notes: true } },
      },
      orderBy: [{ priority: "desc" }, { createdAt: "desc" }],
      take: 120,
    }),
    prisma.leadReminder.findMany({
      where: {
        isCompleted: false,
      },
      include: {
        assignedTo: {
          select: { name: true },
        },
      },
      orderBy: [{ dueAt: "asc" }, { createdAt: "desc" }],
      take: 200,
    }),
  ]);

  const reminderMap = new Map<string, typeof reminders>();
  reminders.forEach((reminder) => {
    const key = `${reminder.leadModel}:${reminder.leadId}`;
    const current = reminderMap.get(key) ?? [];
    current.push(reminder);
    reminderMap.set(key, current);
  });

  const unified: PipelineLeadItem[] = [
    ...contacts.map((item) => ({
      id: item.id,
      model: "contactSubmission" as const,
      name: item.name,
      email: item.email,
      organization: item.organization,
      country: item.country,
      inquiryType: item.inquiryType,
      pipelineStage: item.pipelineStage,
      priority: item.priority,
      assignedToId: item.assignedToId,
      assignedToName: item.assignedTo?.name,
      sourcePath: item.sourcePath,
      tags: item.tags,
      createdAt: item.createdAt,
      secondaryLabel: item.preferredCountry || item.preferredContactTime,
      reminderCount: reminderMap.get(`contactSubmission:${item.id}`)?.length ?? 0,
      noteCount: item._count.notes,
      reminders:
        reminderMap.get(`contactSubmission:${item.id}`)?.map((reminder) => ({
          id: reminder.id,
          title: reminder.title,
          dueAt: reminder.dueAt,
          priority: reminder.priority,
          isCompleted: reminder.isCompleted,
          assignedToName: reminder.assignedTo?.name,
        })) ?? [],
    })),
    ...partnerships.map((item) => ({
      id: item.id,
      model: "partnershipLead" as const,
      name: item.name,
      email: item.email,
      organization: item.organization,
      country: item.country,
      inquiryType: item.inquiryType,
      pipelineStage: item.pipelineStage,
      priority: item.priority,
      assignedToId: item.assignedToId,
      assignedToName: item.assignedTo?.name,
      sourcePath: item.sourcePath,
      tags: item.tags,
      createdAt: item.createdAt,
      secondaryLabel: item.collaborationInterest,
      reminderCount: reminderMap.get(`partnershipLead:${item.id}`)?.length ?? 0,
      noteCount: item._count.notes,
      reminders:
        reminderMap.get(`partnershipLead:${item.id}`)?.map((reminder) => ({
          id: reminder.id,
          title: reminder.title,
          dueAt: reminder.dueAt,
          priority: reminder.priority,
          isCompleted: reminder.isCompleted,
          assignedToName: reminder.assignedTo?.name,
        })) ?? [],
    })),
    ...students.map((item) => ({
      id: item.id,
      model: "studentMobilityInquiry" as const,
      name: item.name,
      email: item.email,
      organization: item.organization,
      country: item.country,
      inquiryType: item.inquiryType,
      pipelineStage: item.pipelineStage,
      priority: item.priority,
      assignedToId: item.assignedToId,
      assignedToName: item.assignedTo?.name,
      sourcePath: item.sourcePath,
      tags: item.tags,
      createdAt: item.createdAt,
      secondaryLabel: item.programInterest,
      reminderCount: reminderMap.get(`studentMobilityInquiry:${item.id}`)?.length ?? 0,
      noteCount: item._count.notes,
      reminders:
        reminderMap.get(`studentMobilityInquiry:${item.id}`)?.map((reminder) => ({
          id: reminder.id,
          title: reminder.title,
          dueAt: reminder.dueAt,
          priority: reminder.priority,
          isCompleted: reminder.isCompleted,
          assignedToName: reminder.assignedTo?.name,
        })) ?? [],
    })),
    ...tourism.map((item) => ({
      id: item.id,
      model: "medicalTourismInquiry" as const,
      name: item.name,
      email: item.email,
      organization: item.organization,
      country: item.country,
      inquiryType: item.inquiryType,
      pipelineStage: item.pipelineStage,
      priority: item.priority,
      assignedToId: item.assignedToId,
      assignedToName: item.assignedTo?.name,
      sourcePath: item.sourcePath,
      tags: item.tags,
      createdAt: item.createdAt,
      secondaryLabel: item.treatmentType,
      reminderCount: reminderMap.get(`medicalTourismInquiry:${item.id}`)?.length ?? 0,
      noteCount: item._count.notes,
      reminders:
        reminderMap.get(`medicalTourismInquiry:${item.id}`)?.map((reminder) => ({
          id: reminder.id,
          title: reminder.title,
          dueAt: reminder.dueAt,
          priority: reminder.priority,
          isCompleted: reminder.isCompleted,
          assignedToName: reminder.assignedTo?.name,
        })) ?? [],
    })),
  ].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

  const today = new Date();
  const todayKey = today.toDateString();

  return {
    columns: pipelineStageOptions.map((stage) => ({
      stage,
      label: startCase(stage),
      items: unified.filter((item) => item.pipelineStage === stage),
    })),
    stats: {
      total: unified.length,
      unassigned: unified.filter((item) => !item.assignedToId).length,
      converted: unified.filter((item) => item.pipelineStage === PipelineStage.CONVERTED)
        .length,
      overdueReminders: reminders.filter((item) => item.dueAt < today).length,
      dueToday: reminders.filter((item) => item.dueAt.toDateString() === todayKey).length,
    },
    reminders: reminders.slice(0, 14).map((item) => ({
      id: item.id,
      leadModel: item.leadModel,
      leadId: item.leadId,
      title: item.title,
      dueAt: item.dueAt,
      priority: item.priority,
      assignedToName: item.assignedTo?.name,
    })),
  };
}
