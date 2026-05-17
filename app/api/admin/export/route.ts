import { NextRequest, NextResponse } from "next/server";

import { requireAdminUser } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma";
import { toCsvValue } from "@/lib/utils";

export const dynamic = "force-dynamic";

type ExportScope =
  | "all"
  | "contact"
  | "partnership"
  | "medical-tourism"
  | "student-mobility";

const allowedScopes = new Set<ExportScope>([
  "all",
  "contact",
  "partnership",
  "medical-tourism",
  "student-mobility",
]);

type ExportRow = {
  sourceModel: string;
  inquiryType: string;
  status: string;
  priority: string | null;
  name: string;
  organization: string | null;
  country: string | null;
  email: string;
  phone: string | null;
  telegram: string | null;
  assignedTo: string | null;
  context: string | null;
  message: string;
  createdAt: Date;
};

function toCsv(rows: ExportRow[]) {
  const headers = [
    "sourceModel",
    "inquiryType",
    "status",
    "priority",
    "name",
    "organization",
    "country",
    "email",
    "phone",
    "telegram",
    "assignedTo",
    "context",
    "message",
    "createdAt",
  ];

  const lines = [
    headers.join(","),
    ...rows.map((row) =>
      [
        row.sourceModel,
        row.inquiryType,
        row.status,
        row.priority,
        row.name,
        row.organization,
        row.country,
        row.email,
        row.phone,
        row.telegram,
        row.assignedTo,
        row.context,
        row.message,
        row.createdAt.toISOString(),
      ]
        .map((value) => toCsvValue(value))
        .join(","),
    ),
  ];

  return lines.join("\n");
}

export async function GET(request: NextRequest) {
  await requireAdminUser();

  const scope = (request.nextUrl.searchParams.get("scope") ?? "all") as ExportScope;

  if (!allowedScopes.has(scope)) {
    return NextResponse.json({ error: "Invalid export scope." }, { status: 400 });
  }

  const [contacts, partnerships, medicalTourism, studentMobility] = await Promise.all([
    scope === "all" || scope === "contact"
      ? prisma.contactSubmission.findMany({
          orderBy: { createdAt: "desc" },
          include: { assignedTo: { select: { name: true } } },
        })
      : Promise.resolve([]),
    scope === "all" || scope === "partnership"
      ? prisma.partnershipLead.findMany({
          orderBy: { createdAt: "desc" },
          include: { assignedTo: { select: { name: true } } },
        })
      : Promise.resolve([]),
    scope === "all" || scope === "medical-tourism"
      ? prisma.medicalTourismInquiry.findMany({
          orderBy: { createdAt: "desc" },
          include: {
            assignedTo: { select: { name: true } },
            assignedHospital: { select: { name: true } },
          },
        })
      : Promise.resolve([]),
    scope === "all" || scope === "student-mobility"
      ? prisma.studentMobilityInquiry.findMany({
          orderBy: { createdAt: "desc" },
          include: { assignedTo: { select: { name: true } } },
        })
      : Promise.resolve([]),
  ]);

  const rows: ExportRow[] = [
    ...contacts.map((item) => ({
      sourceModel: "contactSubmission",
      inquiryType: item.inquiryType,
      status: item.status,
      priority: item.priority,
      name: item.name,
      organization: item.organization,
      country: item.country,
      email: item.email,
      phone: item.phone,
      telegram: item.telegram,
      assignedTo: item.assignedTo?.name ?? null,
      context: null,
      message: item.message,
      createdAt: item.createdAt,
    })),
    ...partnerships.map((item) => ({
      sourceModel: "partnershipLead",
      inquiryType: item.inquiryType,
      status: item.status,
      priority: item.priority,
      name: item.name,
      organization: item.organization,
      country: item.country,
      email: item.email,
      phone: item.phone,
      telegram: item.telegram,
      assignedTo: item.assignedTo?.name ?? null,
      context: item.collaborationInterest,
      message: item.message,
      createdAt: item.createdAt,
    })),
    ...medicalTourism.map((item) => ({
      sourceModel: "medicalTourismInquiry",
      inquiryType: item.inquiryType,
      status: item.status,
      priority: item.priority,
      name: item.name,
      organization: item.organization,
      country: item.country,
      email: item.email,
      phone: item.phone,
      telegram: item.telegram,
      assignedTo: item.assignedTo?.name ?? null,
      context: `${item.treatmentType} | ${item.urgencyLevel} | ${item.assignedHospital?.name ?? "No hospital assigned"}`,
      message: item.message,
      createdAt: item.createdAt,
    })),
    ...studentMobility.map((item) => ({
      sourceModel: "studentMobilityInquiry",
      inquiryType: item.inquiryType,
      status: item.status,
      priority: item.priority,
      name: item.name,
      organization: item.organization,
      country: item.country,
      email: item.email,
      phone: item.phone,
      telegram: item.telegram,
      assignedTo: item.assignedTo?.name ?? null,
      context: item.programInterest,
      message: item.message,
      createdAt: item.createdAt,
    })),
  ].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

  const csv = toCsv(rows);
  const fileName = `medpobeda-${scope}-export-${new Date().toISOString().slice(0, 10)}.csv`;

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${fileName}"`,
      "Cache-Control": "no-store",
    },
  });
}
