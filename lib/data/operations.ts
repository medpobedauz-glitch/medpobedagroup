import "server-only";

import { TaskStatus } from "@prisma/client";
import { unstable_noStore as noStore } from "next/cache";

import { adminVisibleRoles } from "@/lib/admin-config";
import { prisma } from "@/lib/prisma";
import { getRecentAIAssessments } from "@/lib/repositories/ai-assessment-repository";
import { getInternationalOperationsSnapshot } from "@/lib/repositories/international-operations-repository";
import {
  getOpenMedicalTourismInquiriesForCases,
  getPatientCasesForAdmin,
} from "@/lib/repositories/patient-case-repository";
import { getAdminNotificationFeed } from "@/lib/repositories/notification-repository";
import { getOperationsTasks } from "@/lib/repositories/task-repository";

export async function getPatientCaseWorkspace() {
  noStore();

  const [cases, inquiryOptions, staff, hospitals, countries, coordinators] =
    await Promise.all([
      getPatientCasesForAdmin(),
      getOpenMedicalTourismInquiriesForCases(),
      prisma.user.findMany({
        where: {
          isActive: true,
          role: { in: [...adminVisibleRoles] },
        },
        orderBy: [{ name: "asc" }],
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
        },
      }),
      prisma.hospital.findMany({
        orderBy: [{ country: "asc" }, { name: "asc" }],
        select: {
          id: true,
          name: true,
          country: true,
        },
      }),
      prisma.country.findMany({
        where: {
          isActive: true,
        },
        orderBy: [{ region: "asc" }, { name: "asc" }],
        select: {
          id: true,
          code: true,
          name: true,
          region: true,
        },
      }),
      prisma.regionalCoordinator.findMany({
        where: {
          isActive: true,
        },
        orderBy: [{ name: "asc" }],
        select: {
          id: true,
          name: true,
          email: true,
          timezone: true,
          country: {
            select: {
              name: true,
            },
          },
          office: {
            select: {
              officeName: true,
            },
          },
          user: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      }),
    ]);

  return {
    cases,
    inquiryOptions,
    staff,
    hospitals,
    countries,
    coordinators,
  };
}

export type PatientCaseWorkspace = Awaited<ReturnType<typeof getPatientCaseWorkspace>>;

export async function getOperationsWorkspace(user: {
  id: string;
  role: "SUPER_ADMIN" | "ADMIN" | "STAFF" | "EDITOR" | "ANALYST";
}) {
  noStore();

  const [countries, tasks, notifications, assessments, staff] = await Promise.all([
    getInternationalOperationsSnapshot(),
    getOperationsTasks(),
    getAdminNotificationFeed(user.id, user.role),
    getRecentAIAssessments(24),
    prisma.user.findMany({
      where: {
        isActive: true,
        role: { in: [...adminVisibleRoles] },
      },
      orderBy: [{ name: "asc" }],
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    }),
  ]);

  const openCaseCount = countries.reduce(
    (total: number, country: (typeof countries)[number]) =>
      total + country._count.patientCases,
    0,
  );

  return {
    countries,
    tasks,
    notifications,
    assessments,
    staff,
    metrics: {
      activeCountries: countries.length,
      activeCoordinators: countries.reduce(
        (total: number, country: (typeof countries)[number]) =>
          total + country.coordinators.length,
        0,
      ),
      openCaseCount,
      overdueTasks: tasks.filter(
        (task: (typeof tasks)[number]) =>
          task.status !== TaskStatus.DONE &&
          Boolean(task.dueAt) &&
          task.dueAt!.getTime() < Date.now(),
      ).length,
      unreadNotifications: notifications.filter(
        (notification: (typeof notifications)[number]) => notification.status === "UNREAD",
      ).length,
      readyAssessments: assessments.filter(
        (item: (typeof assessments)[number]) => item.status === "READY",
      ).length,
    },
  };
}

export type OperationsWorkspace = Awaited<ReturnType<typeof getOperationsWorkspace>>;
