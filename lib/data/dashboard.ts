import "server-only";

import {
  AnalyticsEventType,
  InquiryStatus,
  InquiryType,
  LeadPriority,
  PipelineStage,
  PartnershipStatus,
  Prisma,
  UserRole,
  type UrgencyLevel,
} from "@prisma/client";
import { unstable_noStore as noStore } from "next/cache";

import { adminVisibleRoles } from "@/lib/admin-config";
import { prisma } from "@/lib/prisma";
import { formatMonthKey, startCase } from "@/lib/utils";

export type LeadModelKey =
  | "contactSubmission"
  | "partnershipLead"
  | "studentMobilityInquiry"
  | "medicalTourismInquiry";

export type AdminInquiryFeedItem = {
  id: string;
  model: LeadModelKey;
  name: string;
  organization?: string | null;
  country?: string | null;
  phone?: string | null;
  telegram?: string | null;
  email: string;
  inquiryType: InquiryType;
  message: string;
  status: InquiryStatus;
  priority: LeadPriority;
  pipelineStage: PipelineStage;
  createdAt: Date;
  updatedAt: Date;
  secondaryLabel?: string | null;
  assignedToId?: string | null;
  assignedToName?: string | null;
  sourcePath?: string | null;
  tags: string[];
  noteCount: number;
  attachmentCount: number;
  emailCount: number;
  closedReason?: string | null;
  budgetRange?: string | null;
  urgencyLevel?: UrgencyLevel | null;
  patientName?: string | null;
  assignedHospitalId?: string | null;
  assignedHospitalName?: string | null;
  notes: Array<{
    id: string;
    content: string;
    createdAt: Date;
    authorName: string;
  }>;
  timeline: Array<{
    id: string;
    label: string;
    value: string;
    createdAt: Date;
  }>;
  uploadedFiles: Array<{
    id: string;
    originalName: string;
    mimeType: string;
    uploadedAt: Date;
  }>;
  emailLogs: Array<{
    id: string;
    subject: string;
    toEmail: string;
    status: string;
    createdAt: Date;
  }>;
};

type UnifiedInquiryParams = {
  search?: string;
  status?: InquiryStatus;
  type?: InquiryType;
  country?: string;
  priority?: LeadPriority;
  assignedToId?: string;
  page?: number;
  pageSize?: number;
};

type MedicalTourismCrmParams = {
  search?: string;
  status?: InquiryStatus;
  country?: string;
  urgency?: string;
  budget?: string;
  page?: number;
  pageSize?: number;
};

type StudentMobilityCrmParams = {
  search?: string;
  status?: InquiryStatus;
  country?: string;
  page?: number;
  pageSize?: number;
};

function buildSearchWhere(search?: string, country?: string) {
  const where: {
    OR?: Array<{
      name?: { contains: string; mode: "insensitive" };
      organization?: { contains: string; mode: "insensitive" };
      email?: { contains: string; mode: "insensitive" };
      message?: { contains: string; mode: "insensitive" };
    }>;
    country?: { contains: string; mode: "insensitive" };
  } = {};

  if (search) {
    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { organization: { contains: search, mode: "insensitive" } },
      { email: { contains: search, mode: "insensitive" } },
      { message: { contains: search, mode: "insensitive" } },
    ];
  }

  if (country) {
    where.country = { contains: country, mode: "insensitive" };
  }

  return where;
}

function buildTimeline({
  createdAt,
  updatedAt,
  notes,
  emailLogs,
}: Pick<AdminInquiryFeedItem, "createdAt" | "updatedAt" | "notes" | "emailLogs">) {
  const entries = [
    {
      id: "created",
      label: "Lead created",
      value: "Captured through MedPobeda intake flow",
      createdAt,
    },
    ...(updatedAt.getTime() !== createdAt.getTime()
      ? [
          {
            id: "updated",
            label: "Last updated",
            value: "Workflow record updated",
            createdAt: updatedAt,
          },
        ]
      : []),
    ...notes.map((note) => ({
      id: note.id,
      label: `Note by ${note.authorName}`,
      value: note.content,
      createdAt: note.createdAt,
    })),
    ...emailLogs.map((email) => ({
      id: email.id,
      label: `Email ${email.status.toLowerCase()}`,
      value: `${email.subject} → ${email.toEmail}`,
      createdAt: email.createdAt,
    })),
  ];

  return entries.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
}

export async function getAdminUsers() {
  noStore();

  return prisma.user.findMany({
    where: {
      role: { in: [...adminVisibleRoles] },
    },
    orderBy: [{ role: "asc" }, { name: "asc" }],
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      isActive: true,
      lastLoginAt: true,
      lastSeenAt: true,
      createdAt: true,
    },
  });
}

export async function getRecentAuditLogs(limit = 20) {
  noStore();

  return prisma.auditLog.findMany({
    orderBy: { createdAt: "desc" },
    take: limit,
    include: {
      actor: {
        select: {
          id: true,
          name: true,
          role: true,
        },
      },
    },
  });
}

export async function getDashboardAnalytics() {
  noStore();

  const now = new Date();
  const rollingWindowStart = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - 5, 1),
  );
  const heatmapWindowStart = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() - 41),
  );
  const currentMonthStart = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1),
  );
  const previousMonthStart = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - 1, 1),
  );

  const [
    contactCount,
    partnershipCount,
    medicalTourismCount,
    studentMobilityCount,
    hospitalCount,
    closedContactCount,
    closedPartnershipLeadCount,
    closedMedicalCount,
    closedStudentCount,
    recentContacts,
    recentPartnerships,
    recentTourism,
    recentMobility,
    recentHospitals,
    partnershipPipelineSnapshot,
    analyticsEvents,
    auditLogs,
  ] = await Promise.all([
    prisma.contactSubmission.count(),
    prisma.partnershipLead.count(),
    prisma.medicalTourismInquiry.count(),
    prisma.studentMobilityInquiry.count(),
    prisma.hospital.count(),
    prisma.contactSubmission.count({ where: { status: InquiryStatus.CLOSED } }),
    prisma.partnershipLead.count({ where: { status: InquiryStatus.CLOSED } }),
    prisma.medicalTourismInquiry.count({ where: { status: InquiryStatus.CLOSED } }),
    prisma.studentMobilityInquiry.count({ where: { status: InquiryStatus.CLOSED } }),
    prisma.contactSubmission.findMany({
      select: {
        createdAt: true,
        country: true,
        inquiryType: true,
        sourcePath: true,
        firstContactedAt: true,
      },
      where: { createdAt: { gte: rollingWindowStart } },
    }),
    prisma.partnershipLead.findMany({
      select: {
        createdAt: true,
        country: true,
        inquiryType: true,
        sourcePath: true,
        firstContactedAt: true,
      },
      where: { createdAt: { gte: rollingWindowStart } },
    }),
    prisma.medicalTourismInquiry.findMany({
      select: {
        createdAt: true,
        country: true,
        inquiryType: true,
        sourcePath: true,
        firstContactedAt: true,
      },
      where: { createdAt: { gte: rollingWindowStart } },
    }),
    prisma.studentMobilityInquiry.findMany({
      select: {
        createdAt: true,
        country: true,
        inquiryType: true,
        sourcePath: true,
        firstContactedAt: true,
      },
      where: { createdAt: { gte: rollingWindowStart } },
    }),
    prisma.hospital.findMany({
      select: { createdAt: true, country: true },
      where: { createdAt: { gte: rollingWindowStart } },
    }),
    prisma.partnership.findMany({
      select: {
        collaborationStatus: true,
      },
    }),
    prisma.analyticsEvent.findMany({
      where: {
        createdAt: { gte: rollingWindowStart },
        eventType: {
          in: [AnalyticsEventType.PAGE_VIEW, AnalyticsEventType.FORM_SUCCESS],
        },
      },
      select: {
        path: true,
        eventType: true,
        createdAt: true,
      },
    }),
    prisma.auditLog.findMany({
      orderBy: { createdAt: "desc" },
      take: 12,
      include: {
        actor: {
          select: {
            name: true,
            role: true,
          },
        },
      },
    }),
  ]);

  const leadEvents = [
    ...recentContacts,
    ...recentPartnerships,
    ...recentTourism,
    ...recentMobility,
  ];

  const totalInquiries =
    contactCount + partnershipCount + medicalTourismCount + studentMobilityCount;
  const monthlyInquiries = leadEvents.filter(
    (item) => item.createdAt >= currentMonthStart,
  ).length;
  const currentMonthCount = monthlyInquiries;
  const previousMonthCount = leadEvents.filter(
    (item) =>
      item.createdAt >= previousMonthStart && item.createdAt < currentMonthStart,
  ).length;

  const monthlyGrowth =
    previousMonthCount === 0
      ? currentMonthCount > 0
        ? 100
        : 0
      : Math.round(
          ((currentMonthCount - previousMonthCount) / previousMonthCount) * 100,
        );

  const closedCount =
    closedContactCount +
    closedPartnershipLeadCount +
    closedMedicalCount +
    closedStudentCount;
  const conversionRatio = totalInquiries
    ? Math.round((closedCount / totalInquiries) * 100)
    : 0;

  const countryTally = new Map<string, number>();
  for (const item of leadEvents) {
    if (!item.country) {
      continue;
    }

    countryTally.set(item.country, (countryTally.get(item.country) ?? 0) + 1);
  }

  const topCountries = [...countryTally.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([country, total]) => ({ country, total }));

  const monthBuckets = new Map<
    string,
    {
      total: number;
      partnership: number;
      medicalTourism: number;
      studentMobility: number;
      contact: number;
    }
  >();

  for (const item of leadEvents) {
    const key = formatMonthKey(item.createdAt);
    const bucket = monthBuckets.get(key) ?? {
      total: 0,
      partnership: 0,
      medicalTourism: 0,
      studentMobility: 0,
      contact: 0,
    };

    bucket.total += 1;
    if (item.inquiryType === InquiryType.PARTNERSHIP) bucket.partnership += 1;
    if (item.inquiryType === InquiryType.MEDICAL_TOURISM) bucket.medicalTourism += 1;
    if (item.inquiryType === InquiryType.STUDENT_MOBILITY) bucket.studentMobility += 1;
    if (
      item.inquiryType === InquiryType.CONTACT ||
      item.inquiryType === InquiryType.INTERNATIONAL_PATIENT
    ) {
      bucket.contact += 1;
    }

    monthBuckets.set(key, bucket);
  }

  const inquiryTrends = Array.from({ length: 6 }, (_, index) => {
    const month = new Date(
      Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - (5 - index), 1),
    );
    const key = formatMonthKey(month);
    const bucket = monthBuckets.get(key) ?? {
      total: 0,
      partnership: 0,
      medicalTourism: 0,
      studentMobility: 0,
      contact: 0,
    };

    return {
      label: month.toLocaleString("en-US", { month: "short" }),
      ...bucket,
    };
  });

  const countryAnalytics = topCountries.map((item) => ({
    name: item.country,
    value: item.total,
  }));

  const responseTimesInHours = leadEvents
    .filter((item) => item.firstContactedAt)
    .map((item) => {
      const firstContactedAt = item.firstContactedAt as Date;
      return (
        Math.max(firstContactedAt.getTime() - item.createdAt.getTime(), 0) /
        (1000 * 60 * 60)
      );
    });

  const averageResponseHours = responseTimesInHours.length
    ? Math.round(
        (responseTimesInHours.reduce((total, value) => total + value, 0) /
          responseTimesInHours.length) *
          10,
      ) / 10
    : 0;

  const pageViewTally = new Map<string, number>();
  const formSuccessTally = new Map<string, number>();
  for (const event of analyticsEvents) {
    if (event.eventType === AnalyticsEventType.PAGE_VIEW) {
      pageViewTally.set(event.path, (pageViewTally.get(event.path) ?? 0) + 1);
    }

    if (event.eventType === AnalyticsEventType.FORM_SUCCESS) {
      formSuccessTally.set(event.path, (formSuccessTally.get(event.path) ?? 0) + 1);
    }
  }

  const leadSourceTally = new Map<string, number>();
  for (const item of leadEvents) {
    const sourcePath = item.sourcePath || "Direct / Unknown";
    leadSourceTally.set(sourcePath, (leadSourceTally.get(sourcePath) ?? 0) + 1);
  }

  const sourceBreakdown = [...leadSourceTally.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([path, total]) => ({
      path,
      total,
    }));

  const pageKeys = new Set([
    ...pageViewTally.keys(),
    ...formSuccessTally.keys(),
    ...leadSourceTally.keys(),
  ]);

  const pagePerformance = [...pageKeys]
    .map((path) => {
      const pageViews = pageViewTally.get(path) ?? 0;
      const formSuccesses = formSuccessTally.get(path) ?? 0;
      const leadCount = leadSourceTally.get(path) ?? 0;
      const conversionRate = pageViews
        ? Math.round((formSuccesses / pageViews) * 1000) / 10
        : null;

      return {
        path,
        pageViews,
        formSuccesses,
        leadCount,
        conversionRate,
      };
    })
    .sort((a, b) => {
      if (b.leadCount !== a.leadCount) {
        return b.leadCount - a.leadCount;
      }

      return b.pageViews - a.pageViews;
    })
    .slice(0, 8);

  const contactConversionRate = analyticsEvents.some(
    (event) => event.eventType === AnalyticsEventType.PAGE_VIEW,
  )
    ? Math.round(
        ((analyticsEvents.filter(
          (event) => event.eventType === AnalyticsEventType.FORM_SUCCESS,
        ).length || 0) /
          Math.max(
            analyticsEvents.filter(
              (event) => event.eventType === AnalyticsEventType.PAGE_VIEW,
            ).length,
            1,
          )) *
          1000,
      ) / 10
    : 0;

  const medicalTourismTrend = inquiryTrends.map((item) => ({
    label: item.label,
    total: item.medicalTourism,
  }));

  const partnershipPipeline = Object.values(PartnershipStatus).map((status) => ({
    label: startCase(status),
    value: partnershipPipelineSnapshot.filter(
      (item) => item.collaborationStatus === status,
    ).length,
  }));

  const convertedPartnershipStatuses = new Set<PartnershipStatus>([
    PartnershipStatus.ACTIVE,
    PartnershipStatus.WON,
  ]);
  const partnershipConvertedCount = partnershipPipelineSnapshot.filter((item) =>
    convertedPartnershipStatuses.has(item.collaborationStatus),
  ).length;
  const partnershipConversionRate = partnershipCount
    ? Math.round((partnershipConvertedCount / partnershipCount) * 1000) / 10
    : 0;

  const heatmapTally = new Map<string, number>();
  for (const item of leadEvents.filter((entry) => entry.createdAt >= heatmapWindowStart)) {
    const key = item.createdAt.toISOString().slice(0, 10);
    heatmapTally.set(key, (heatmapTally.get(key) ?? 0) + 1);
  }

  const activityHeatmap = Array.from({ length: 42 }, (_, index) => {
    const day = new Date(heatmapWindowStart);
    day.setUTCDate(heatmapWindowStart.getUTCDate() + index);
    const key = day.toISOString().slice(0, 10);

    return {
      date: key,
      label: day.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      weekday: day.toLocaleDateString("en-US", { weekday: "short" }),
      total: heatmapTally.get(key) ?? 0,
    };
  });

  const recentInquiries = await getUnifiedInquiries({
    page: 1,
    pageSize: 8,
  });

  return {
    totalInquiries,
    monthlyInquiries,
    monthlyGrowth,
    partnershipRequests: partnershipCount,
    medicalTourismLeads: medicalTourismCount,
    studentMobilityLeads: studentMobilityCount,
    newHospitalsAdded: recentHospitals.filter(
      (item) => item.createdAt >= currentMonthStart,
    ).length,
    hospitalCount,
    topCountries,
    conversionRatio,
    partnershipConversionRate,
    contactConversionRate,
    averageResponseHours,
    inquiryTrends,
    medicalTourismTrend,
    countryAnalytics,
    sourceBreakdown,
    pagePerformance,
    trafficAnalyticsStatus: analyticsEvents.length
      ? ("live" as const)
      : ("placeholder" as const),
    partnershipPipeline,
    activityHeatmap,
    recentInquiries: recentInquiries.items,
    activityTimeline: auditLogs.map((log) => ({
      id: log.id,
      action: log.action,
      description: log.description,
      createdAt: log.createdAt,
      actorName: log.actor?.name ?? "System",
      actorRole: log.actor?.role ?? UserRole.ADMIN,
      entityType: log.entityType,
    })),
  };
}

export async function getUnifiedInquiries({
  search,
  status,
  type,
  country,
  priority,
  assignedToId,
  page = 1,
  pageSize = 10,
}: UnifiedInquiryParams) {
  noStore();

  const sharedWhere = buildSearchWhere(search, country);
  const shouldInclude = (target: InquiryType) => !type || type === target;
  const assignmentFilter = assignedToId ? { assignedToId } : {};
  const priorityFilter = priority ? { priority } : {};

  const [contacts, partnerships, studentMobility, medicalTourism] = await Promise.all([
    shouldInclude(InquiryType.CONTACT) || shouldInclude(InquiryType.INTERNATIONAL_PATIENT)
      ? prisma.contactSubmission.findMany({
          where: {
            ...sharedWhere,
            ...(status ? { status } : {}),
            ...(type ? { inquiryType: type } : {}),
            ...assignmentFilter,
            ...priorityFilter,
          },
          orderBy: { createdAt: "desc" },
          take: 200,
          include: {
            assignedTo: {
              select: { id: true, name: true },
            },
            _count: { select: { notes: true, uploadedFiles: true, emailLogs: true } },
            emailLogs: {
              orderBy: { createdAt: "desc" },
              take: 5,
              select: {
                id: true,
                subject: true,
                toEmail: true,
                status: true,
                createdAt: true,
              },
            },
            uploadedFiles: {
              orderBy: { uploadedAt: "desc" },
              take: 6,
              select: {
                id: true,
                originalName: true,
                mimeType: true,
                uploadedAt: true,
              },
            },
            notes: {
              orderBy: { createdAt: "desc" },
              take: 5,
              include: { author: { select: { name: true } } },
            },
          },
        })
      : Promise.resolve([]),
    shouldInclude(InquiryType.PARTNERSHIP)
      ? prisma.partnershipLead.findMany({
          where: {
            ...sharedWhere,
            ...(status ? { status } : {}),
            ...assignmentFilter,
            ...priorityFilter,
          },
          orderBy: { createdAt: "desc" },
          take: 200,
          include: {
            assignedTo: {
              select: { id: true, name: true },
            },
            _count: { select: { notes: true, uploadedFiles: true, emailLogs: true } },
            emailLogs: {
              orderBy: { createdAt: "desc" },
              take: 5,
              select: {
                id: true,
                subject: true,
                toEmail: true,
                status: true,
                createdAt: true,
              },
            },
            uploadedFiles: {
              orderBy: { uploadedAt: "desc" },
              take: 6,
              select: {
                id: true,
                originalName: true,
                mimeType: true,
                uploadedAt: true,
              },
            },
            notes: {
              orderBy: { createdAt: "desc" },
              take: 5,
              include: { author: { select: { name: true } } },
            },
          },
        })
      : Promise.resolve([]),
    shouldInclude(InquiryType.STUDENT_MOBILITY)
      ? prisma.studentMobilityInquiry.findMany({
          where: {
            ...sharedWhere,
            ...(status ? { status } : {}),
            ...assignmentFilter,
            ...priorityFilter,
          },
          orderBy: { createdAt: "desc" },
          take: 200,
          include: {
            assignedTo: {
              select: { id: true, name: true },
            },
            _count: { select: { notes: true, uploadedFiles: true, emailLogs: true } },
            uploadedFiles: {
              orderBy: { uploadedAt: "desc" },
              take: 6,
              select: {
                id: true,
                originalName: true,
                mimeType: true,
                uploadedAt: true,
              },
            },
            emailLogs: {
              orderBy: { createdAt: "desc" },
              take: 5,
              select: {
                id: true,
                subject: true,
                toEmail: true,
                status: true,
                createdAt: true,
              },
            },
            notes: {
              orderBy: { createdAt: "desc" },
              take: 5,
              include: { author: { select: { name: true } } },
            },
          },
        })
      : Promise.resolve([]),
    shouldInclude(InquiryType.MEDICAL_TOURISM)
      ? prisma.medicalTourismInquiry.findMany({
          where: {
            ...sharedWhere,
            ...(status ? { status } : {}),
            ...assignmentFilter,
            ...priorityFilter,
          },
          orderBy: { createdAt: "desc" },
          take: 200,
          include: {
            patient: {
              select: { fullName: true },
            },
            assignedTo: {
              select: { id: true, name: true },
            },
            assignedHospital: {
              select: { id: true, name: true },
            },
            _count: {
              select: {
                notes: true,
                uploadedFiles: true,
                emailLogs: true,
              },
            },
            uploadedFiles: {
              orderBy: { uploadedAt: "desc" },
              take: 6,
              select: {
                id: true,
                originalName: true,
                mimeType: true,
                uploadedAt: true,
              },
            },
            emailLogs: {
              orderBy: { createdAt: "desc" },
              take: 5,
              select: {
                id: true,
                subject: true,
                toEmail: true,
                status: true,
                createdAt: true,
              },
            },
            notes: {
              orderBy: { createdAt: "desc" },
              take: 5,
              include: { author: { select: { name: true } } },
            },
          },
        })
      : Promise.resolve([]),
  ]);

  const unified: AdminInquiryFeedItem[] = [
    ...contacts.map((item) => {
      const notes = item.notes.map((note) => ({
        id: note.id,
        content: note.content,
        createdAt: note.createdAt,
        authorName: note.author.name,
      }));

      const lead = {
        id: item.id,
        model: "contactSubmission" as const,
        name: item.name,
        organization: item.organization,
        country: item.country,
        phone: item.phone,
        telegram: item.telegram,
        email: item.email,
        inquiryType: item.inquiryType,
        message: item.message,
        status: item.status,
        priority: item.priority,
        pipelineStage: item.pipelineStage,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
        secondaryLabel: item.inquiryType,
        assignedToId: item.assignedToId,
        assignedToName: item.assignedTo?.name,
        sourcePath: item.sourcePath,
        tags: item.tags,
        noteCount: item._count.notes,
        attachmentCount: item._count.uploadedFiles,
        emailCount: item._count.emailLogs,
        closedReason: item.closedReason,
        notes,
        uploadedFiles: item.uploadedFiles,
        emailLogs: item.emailLogs,
        timeline: [] as AdminInquiryFeedItem["timeline"],
      };

      return {
        ...lead,
        timeline: buildTimeline(lead),
      };
    }),
    ...partnerships.map((item) => {
      const notes = item.notes.map((note) => ({
        id: note.id,
        content: note.content,
        createdAt: note.createdAt,
        authorName: note.author.name,
      }));

      const lead = {
        id: item.id,
        model: "partnershipLead" as const,
        name: item.name,
        organization: item.organization,
        country: item.country,
        phone: item.phone,
        telegram: item.telegram,
        email: item.email,
        inquiryType: item.inquiryType,
        message: item.message,
        status: item.status,
        priority: item.priority,
        pipelineStage: item.pipelineStage,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
        secondaryLabel: item.collaborationInterest,
        assignedToId: item.assignedToId,
        assignedToName: item.assignedTo?.name,
        sourcePath: item.sourcePath,
        tags: item.tags,
        noteCount: item._count.notes,
        attachmentCount: item._count.uploadedFiles,
        emailCount: item._count.emailLogs,
        closedReason: item.closedReason,
        notes,
        uploadedFiles: item.uploadedFiles,
        emailLogs: item.emailLogs,
        timeline: [] as AdminInquiryFeedItem["timeline"],
      };

      return {
        ...lead,
        timeline: buildTimeline(lead),
      };
    }),
    ...studentMobility.map((item) => {
      const notes = item.notes.map((note) => ({
        id: note.id,
        content: note.content,
        createdAt: note.createdAt,
        authorName: note.author.name,
      }));

      const lead = {
        id: item.id,
        model: "studentMobilityInquiry" as const,
        name: item.name,
        organization: item.organization,
        country: item.country,
        phone: item.phone,
        telegram: item.telegram,
        email: item.email,
        inquiryType: item.inquiryType,
        message: item.message,
        status: item.status,
        priority: item.priority,
        pipelineStage: item.pipelineStage,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
        secondaryLabel: item.programInterest,
        assignedToId: item.assignedToId,
        assignedToName: item.assignedTo?.name,
        sourcePath: item.sourcePath,
        tags: item.tags,
        noteCount: item._count.notes,
        attachmentCount: item._count.uploadedFiles,
        emailCount: item._count.emailLogs,
        closedReason: item.closedReason,
        notes,
        uploadedFiles: item.uploadedFiles,
        emailLogs: item.emailLogs,
        timeline: [] as AdminInquiryFeedItem["timeline"],
      };

      return {
        ...lead,
        timeline: buildTimeline(lead),
      };
    }),
    ...medicalTourism.map((item) => {
      const notes = item.notes.map((note) => ({
        id: note.id,
        content: note.content,
        createdAt: note.createdAt,
        authorName: note.author.name,
      }));

      const lead = {
        id: item.id,
        model: "medicalTourismInquiry" as const,
        name: item.name,
        organization: item.organization,
        country: item.country,
        phone: item.phone,
        telegram: item.telegram,
        email: item.email,
        inquiryType: item.inquiryType,
        message: item.message,
        status: item.status,
        priority: item.priority,
        pipelineStage: item.pipelineStage,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
        secondaryLabel: item.treatmentType,
        assignedToId: item.assignedToId,
        assignedToName: item.assignedTo?.name,
        sourcePath: item.sourcePath,
        tags: item.tags,
        noteCount: item._count.notes,
        attachmentCount: item._count.uploadedFiles,
        emailCount: item._count.emailLogs,
        closedReason: item.closedReason,
        budgetRange: item.budgetRange,
        urgencyLevel: item.urgencyLevel,
        patientName: item.patient?.fullName,
        assignedHospitalId: item.assignedHospitalId,
        assignedHospitalName: item.assignedHospital?.name,
        notes,
        uploadedFiles: item.uploadedFiles.map((file) => ({
          id: file.id,
          originalName: file.originalName,
          mimeType: file.mimeType,
          uploadedAt: file.uploadedAt,
        })),
        emailLogs: item.emailLogs,
        timeline: [] as AdminInquiryFeedItem["timeline"],
      };

      return {
        ...lead,
        timeline: buildTimeline(lead),
      };
    }),
  ]
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

  const total = unified.length;
  const pageCount = Math.max(Math.ceil(total / pageSize), 1);
  const start = (page - 1) * pageSize;

  return {
    items: unified.slice(start, start + pageSize),
    total,
    page,
    pageSize,
    pageCount,
  };
}

export async function getMedicalTourismCrmData({
  search,
  status,
  country,
  urgency,
  budget,
  page = 1,
  pageSize = 10,
}: MedicalTourismCrmParams) {
  noStore();

  const where: Prisma.MedicalTourismInquiryWhereInput = {
    ...buildSearchWhere(search, country),
    ...(status ? { status } : {}),
    ...(urgency ? { urgencyLevel: urgency as UrgencyLevel } : {}),
    ...(budget
      ? { budgetRange: { contains: budget, mode: "insensitive" } }
      : {}),
  };

  const [total, items] = await Promise.all([
    prisma.medicalTourismInquiry.count({ where }),
    prisma.medicalTourismInquiry.findMany({
      where,
      orderBy: [{ priority: "desc" }, { createdAt: "desc" }],
      skip: (page - 1) * pageSize,
      take: pageSize,
      include: {
        patient: true,
        assignedTo: {
          select: { id: true, name: true },
        },
        assignedHospital: {
          select: { id: true, name: true },
        },
        uploadedFiles: {
          orderBy: { uploadedAt: "desc" },
          take: 6,
        },
        emailLogs: {
          orderBy: { createdAt: "desc" },
          take: 5,
        },
        notes: {
          orderBy: { createdAt: "desc" },
          include: { author: { select: { name: true } } },
          take: 5,
        },
      },
    }),
  ]);

  return {
    items,
    total,
    page,
    pageSize,
    pageCount: Math.max(Math.ceil(total / pageSize), 1),
  };
}

export async function getStudentMobilityCrmData({
  search,
  status,
  country,
  page = 1,
  pageSize = 10,
}: StudentMobilityCrmParams) {
  noStore();

  const where: Prisma.StudentMobilityInquiryWhereInput = {
    ...buildSearchWhere(search, country),
    ...(status ? { status } : {}),
  };

  const [total, items] = await Promise.all([
    prisma.studentMobilityInquiry.count({ where }),
    prisma.studentMobilityInquiry.findMany({
      where,
      orderBy: [{ priority: "desc" }, { createdAt: "desc" }],
      skip: (page - 1) * pageSize,
      take: pageSize,
      include: {
        assignedTo: {
          select: { id: true, name: true },
        },
        uploadedFiles: {
          orderBy: { uploadedAt: "desc" },
          take: 6,
        },
        emailLogs: {
          orderBy: { createdAt: "desc" },
          take: 5,
        },
        notes: {
          orderBy: { createdAt: "desc" },
          include: { author: { select: { name: true } } },
          take: 5,
        },
      },
    }),
  ]);

  return {
    items,
    total,
    page,
    pageSize,
    pageCount: Math.max(Math.ceil(total / pageSize), 1),
  };
}
