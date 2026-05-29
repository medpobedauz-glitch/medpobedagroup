import {
  InquiryPriority,
  InquiryStatus,
  LeadPriority,
  PartnershipInterest,
  Prisma,
  StudentService,
} from "@prisma/client";

import { prisma } from "@/lib/prisma";
import { siteConfig } from "@/lib/site";
import { startCase, toCsvValue } from "@/lib/utils";

export const adminInquiryTypes = ["all", "contact", "patient", "hospital", "student"] as const;
export type AdminInquiryFilterType = (typeof adminInquiryTypes)[number];
export type AdminInquiryType = Exclude<AdminInquiryFilterType, "all">;

export const dashboardInquiryStatuses = [
  InquiryStatus.NEW,
  InquiryStatus.CONTACTED,
  InquiryStatus.IN_PROGRESS,
  InquiryStatus.CLOSED,
  InquiryStatus.SPAM,
] as const;

export const dashboardInquiryPriorities = [
  InquiryPriority.LOW,
  InquiryPriority.NORMAL,
  InquiryPriority.HIGH,
  InquiryPriority.URGENT,
] as const;

export type InquiryDashboardFilters = {
  search?: string;
  type?: AdminInquiryFilterType;
  status?: InquiryStatus | "";
  priority?: InquiryPriority | "";
  from?: string;
  to?: string;
};

export type InquiryListItem = {
  id: string;
  type: AdminInquiryType;
  typeLabel: string;
  createdAt: Date;
  updatedAt: Date;
  status: InquiryStatus;
  priority: InquiryPriority;
  name: string;
  organization?: string | null;
  email?: string | null;
  phone?: string | null;
  country?: string | null;
  locale?: string | null;
  sourcePage?: string | null;
  userCountry?: string | null;
  message: string;
  internalNote?: string | null;
};

export type InquiryAttachment = {
  id: string;
  originalName: string;
  mimeType: string;
  sizeBytes: number;
  uploadedAt: Date;
};

export type InquiryDetail = InquiryListItem & {
  attachments: InquiryAttachment[];
  fields: Array<{ label: string; value: string }>;
  whatsappHref: string;
  telegramHref: string;
  emailHref: string;
};

function normalizeSearch(search?: string) {
  return search?.trim() || undefined;
}

function buildDateRange(filters: InquiryDashboardFilters) {
  const createdAt: Prisma.DateTimeFilter = {};

  if (filters.from) {
    const fromDate = new Date(filters.from);
    if (!Number.isNaN(fromDate.valueOf())) {
      createdAt.gte = fromDate;
    }
  }

  if (filters.to) {
    const toDate = new Date(filters.to);
    if (!Number.isNaN(toDate.valueOf())) {
      toDate.setHours(23, 59, 59, 999);
      createdAt.lte = toDate;
    }
  }

  return Object.keys(createdAt).length ? createdAt : undefined;
}

function toLeadPriority(priority?: InquiryPriority | "") {
  if (priority === InquiryPriority.LOW) {
    return LeadPriority.LOW;
  }

  if (priority === InquiryPriority.HIGH) {
    return LeadPriority.HIGH;
  }

  if (priority === InquiryPriority.URGENT) {
    return LeadPriority.URGENT;
  }

  if (priority === InquiryPriority.NORMAL) {
    return LeadPriority.MEDIUM;
  }

  return undefined;
}

function toInquiryPriority(priority: LeadPriority | InquiryPriority) {
  if (priority === "LOW") {
    return InquiryPriority.LOW;
  }

  if (priority === "HIGH") {
    return InquiryPriority.HIGH;
  }

  if (priority === "URGENT") {
    return InquiryPriority.URGENT;
  }

  return InquiryPriority.NORMAL;
}

function sanitizePhone(phone?: string | null) {
  return (phone || "").replace(/[^\d]/g, "");
}

function buildWhatsAppMessage(typeLabel: string) {
  return `Hello, this is MedPobeda Group, Tashkent. We received your inquiry regarding ${typeLabel}. Our team would like to understand your requirement and guide you with the next steps.`;
}

export function buildWhatsAppFollowUpUrl(phone?: string | null, typeLabel = "your inquiry") {
  const normalized = sanitizePhone(phone);

  if (!normalized) {
    return "";
  }

  return `https://wa.me/${normalized}?text=${encodeURIComponent(
    buildWhatsAppMessage(typeLabel),
  )}`;
}

export function buildTelegramFollowUpUrl(phone?: string | null) {
  const normalized = sanitizePhone(phone);
  return normalized ? `https://t.me/${normalized}` : siteConfig.telegramUrl;
}

export function buildEmailReplyUrl(email?: string | null) {
  return email ? `mailto:${email}` : `mailto:${siteConfig.contactEmail}`;
}

function getTypeLabel(type: AdminInquiryType) {
  if (type === "contact") return "Contact Inquiry";
  if (type === "patient") return "Patient Inquiry";
  if (type === "hospital") return "Hospital Partnership Inquiry";
  return "Student Mobility Inquiry";
}

function buildContactWhere(filters: InquiryDashboardFilters): Prisma.ContactInquiryWhereInput {
  const search = normalizeSearch(filters.search);
  const createdAt = buildDateRange(filters);

  return {
    ...(filters.status ? { status: filters.status } : {}),
    ...(filters.priority ? { priority: filters.priority } : {}),
    ...(createdAt ? { createdAt } : {}),
    ...(search
      ? {
          OR: [
            { fullName: { contains: search, mode: "insensitive" } },
            { email: { contains: search, mode: "insensitive" } },
            { phone: { contains: search, mode: "insensitive" } },
            { country: { contains: search, mode: "insensitive" } },
          ],
        }
      : {}),
  };
}

function buildPatientWhere(filters: InquiryDashboardFilters): Prisma.PatientInquiryWhereInput {
  const search = normalizeSearch(filters.search);
  const createdAt = buildDateRange(filters);

  return {
    ...(filters.status ? { status: filters.status } : {}),
    ...(filters.priority ? { priority: filters.priority } : {}),
    ...(createdAt ? { createdAt } : {}),
    ...(search
      ? {
          OR: [
            { patientName: { contains: search, mode: "insensitive" } },
            { email: { contains: search, mode: "insensitive" } },
            { phone: { contains: search, mode: "insensitive" } },
            { country: { contains: search, mode: "insensitive" } },
            {
              preferredTreatmentDepartment: {
                contains: search,
                mode: "insensitive",
              },
            },
          ],
        }
      : {}),
  };
}

function buildHospitalWhere(
  filters: InquiryDashboardFilters,
): Prisma.HospitalPartnershipInquiryWhereInput {
  const search = normalizeSearch(filters.search);
  const createdAt = buildDateRange(filters);

  return {
    ...(filters.status ? { status: filters.status } : {}),
    ...(filters.priority ? { priority: filters.priority } : {}),
    ...(createdAt ? { createdAt } : {}),
    ...(search
      ? {
          OR: [
            { hospitalName: { contains: search, mode: "insensitive" } },
            { contactPersonName: { contains: search, mode: "insensitive" } },
            { email: { contains: search, mode: "insensitive" } },
            { phone: { contains: search, mode: "insensitive" } },
            { country: { contains: search, mode: "insensitive" } },
            { city: { contains: search, mode: "insensitive" } },
          ],
        }
      : {}),
  };
}

function buildStudentWhere(
  filters: InquiryDashboardFilters,
): Prisma.StudentMobilityInquiryWhereInput {
  const search = normalizeSearch(filters.search);
  const createdAt = buildDateRange(filters);
  const priority = toLeadPriority(filters.priority);

  return {
    ...(filters.status ? { status: filters.status } : {}),
    ...(priority ? { priority } : {}),
    ...(createdAt ? { createdAt } : {}),
    ...(search
      ? {
          OR: [
            { name: { contains: search, mode: "insensitive" } },
            { organization: { contains: search, mode: "insensitive" } },
            { email: { contains: search, mode: "insensitive" } },
            { phone: { contains: search, mode: "insensitive" } },
            { country: { contains: search, mode: "insensitive" } },
          ],
        }
      : {}),
  };
}

async function fetchContactInquiries(filters: InquiryDashboardFilters) {
  const records = await prisma.contactInquiry.findMany({
    where: buildContactWhere(filters),
    orderBy: { createdAt: "desc" },
  });

  return records.map<InquiryListItem>((record) => ({
    id: record.id,
    type: "contact",
    typeLabel: getTypeLabel("contact"),
    createdAt: record.createdAt,
    updatedAt: record.updatedAt,
    status: record.status,
    priority: record.priority,
    name: record.fullName,
    organization: record.organization,
    email: record.email,
    phone: record.phone,
    country: record.country,
    locale: record.locale,
    sourcePage: record.sourcePage,
    userCountry: record.userCountry,
    message: record.message,
    internalNote: record.internalNote,
  }));
}

async function fetchPatientInquiries(filters: InquiryDashboardFilters) {
  const records = await prisma.patientInquiry.findMany({
    where: buildPatientWhere(filters),
    orderBy: { createdAt: "desc" },
  });

  return records.map<InquiryListItem>((record) => ({
    id: record.id,
    type: "patient",
    typeLabel: getTypeLabel("patient"),
    createdAt: record.createdAt,
    updatedAt: record.updatedAt,
    status: record.status,
    priority: record.priority,
    name: record.patientName,
    organization: record.contactPersonName,
    email: record.email,
    phone: record.phone,
    country: record.country,
    locale: record.locale,
    sourcePage: record.sourcePage,
    userCountry: record.userCountry,
    message: record.message,
    internalNote: record.internalNote,
  }));
}

async function fetchHospitalInquiries(filters: InquiryDashboardFilters) {
  const records = await prisma.hospitalPartnershipInquiry.findMany({
    where: buildHospitalWhere(filters),
    orderBy: { createdAt: "desc" },
  });

  return records.map<InquiryListItem>((record) => ({
    id: record.id,
    type: "hospital",
    typeLabel: getTypeLabel("hospital"),
    createdAt: record.createdAt,
    updatedAt: record.updatedAt,
    status: record.status,
    priority: record.priority,
    name: record.contactPersonName,
    organization: record.hospitalName,
    email: record.email,
    phone: record.phone,
    country: record.country,
    locale: record.locale,
    sourcePage: record.sourcePage,
    userCountry: record.userCountry,
    message: record.message,
    internalNote: record.internalNote,
  }));
}

async function fetchStudentInquiries(filters: InquiryDashboardFilters) {
  const records = await prisma.studentMobilityInquiry.findMany({
    where: buildStudentWhere(filters),
    orderBy: { createdAt: "desc" },
  });

  return records.map<InquiryListItem>((record) => ({
    id: record.id,
    type: "student",
    typeLabel: getTypeLabel("student"),
    createdAt: record.createdAt,
    updatedAt: record.updatedAt,
    status: record.status,
    priority: toInquiryPriority(record.priority),
    name: record.name,
    organization: record.organization,
    email: record.email,
    phone: record.phone,
    country: record.country,
    locale: record.locale,
    sourcePage: record.sourcePage || record.sourcePath,
    userCountry: record.userCountry,
    message: record.message,
    internalNote: record.internalNote,
  }));
}

export async function getInquiryRecords(filters: InquiryDashboardFilters = {}) {
  const requestedType = filters.type || "all";
  const results = await Promise.all([
    requestedType === "all" || requestedType === "contact"
      ? fetchContactInquiries(filters)
      : Promise.resolve([]),
    requestedType === "all" || requestedType === "patient"
      ? fetchPatientInquiries(filters)
      : Promise.resolve([]),
    requestedType === "all" || requestedType === "hospital"
      ? fetchHospitalInquiries(filters)
      : Promise.resolve([]),
    requestedType === "all" || requestedType === "student"
      ? fetchStudentInquiries(filters)
      : Promise.resolve([]),
  ]);

  return results
    .flat()
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
}

export async function getInquiryDashboardData(filters: InquiryDashboardFilters = {}) {
  const records = await getInquiryRecords(filters);

  return {
    records,
    totals: {
      total: records.length,
      new: records.filter((item) => item.status === InquiryStatus.NEW).length,
      inProgress: records.filter((item) => item.status === InquiryStatus.IN_PROGRESS).length,
      closed: records.filter((item) => item.status === InquiryStatus.CLOSED).length,
      urgent: records.filter((item) => item.priority === InquiryPriority.URGENT).length,
    },
  };
}

function formatFieldValue(value: unknown) {
  if (value === null || value === undefined || value === "") {
    return "Not provided";
  }

  if (typeof value === "boolean") {
    return value ? "Yes" : "No";
  }

  return String(value);
}

function normalizeDetail(
  item: Omit<InquiryDetail, "whatsappHref" | "telegramHref" | "emailHref">,
) {
  return {
    ...item,
    whatsappHref: buildWhatsAppFollowUpUrl(item.phone, item.typeLabel),
    telegramHref: buildTelegramFollowUpUrl(item.phone),
    emailHref: buildEmailReplyUrl(item.email),
  };
}

function formatPartnershipInterest(value?: PartnershipInterest | null) {
  return value ? startCase(value) : "Not provided";
}

function formatStudentService(value?: StudentService | null) {
  return value ? startCase(value) : "Not provided";
}

export async function getInquiryDetail(type: AdminInquiryType, id: string) {
  if (type === "contact") {
    const record = await prisma.contactInquiry.findUnique({
      where: { id },
      include: {
        uploadedFiles: {
          orderBy: { uploadedAt: "desc" },
          select: {
            id: true,
            originalName: true,
            mimeType: true,
            sizeBytes: true,
            uploadedAt: true,
          },
        },
      },
    });

    if (!record) return null;

    return normalizeDetail({
      id: record.id,
      type,
      typeLabel: getTypeLabel(type),
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
      status: record.status,
      priority: record.priority,
      name: record.fullName,
      organization: record.organization,
      email: record.email,
      phone: record.phone,
      country: record.country,
      locale: record.locale,
      sourcePage: record.sourcePage,
      userCountry: record.userCountry,
      message: record.message,
      internalNote: record.internalNote,
      attachments: record.uploadedFiles,
      fields: [
        { label: "Inquiry Type", value: startCase(record.inquiryType) },
        { label: "Full Name", value: record.fullName },
        { label: "Organization", value: formatFieldValue(record.organization) },
        { label: "Email", value: record.email },
        { label: "Phone", value: formatFieldValue(record.phone) },
        { label: "Country", value: formatFieldValue(record.country) },
        { label: "Consent", value: formatFieldValue(record.consent) },
        { label: "Locale", value: formatFieldValue(record.locale) },
        { label: "Source Page", value: formatFieldValue(record.sourcePage) },
        { label: "User Country", value: formatFieldValue(record.userCountry) },
        { label: "IP Address", value: formatFieldValue(record.userIp) },
        { label: "User Agent", value: formatFieldValue(record.userAgent) },
      ],
    });
  }

  if (type === "patient") {
    const record = await prisma.patientInquiry.findUnique({
      where: { id },
      include: {
        uploadedFiles: {
          orderBy: { uploadedAt: "desc" },
          select: {
            id: true,
            originalName: true,
            mimeType: true,
            sizeBytes: true,
            uploadedAt: true,
          },
        },
      },
    });

    if (!record) return null;

    return normalizeDetail({
      id: record.id,
      type,
      typeLabel: getTypeLabel(type),
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
      status: record.status,
      priority: record.priority,
      name: record.patientName,
      organization: record.contactPersonName,
      email: record.email,
      phone: record.phone,
      country: record.country,
      locale: record.locale,
      sourcePage: record.sourcePage,
      userCountry: record.userCountry,
      message: record.message,
      internalNote: record.internalNote,
      attachments: record.uploadedFiles,
      fields: [
        { label: "Patient Name", value: record.patientName },
        { label: "Contact Person", value: formatFieldValue(record.contactPersonName) },
        { label: "Email", value: formatFieldValue(record.email) },
        { label: "Phone", value: formatFieldValue(record.phone) },
        { label: "Country", value: formatFieldValue(record.country) },
        { label: "Age", value: formatFieldValue(record.age) },
        { label: "Gender", value: formatFieldValue(record.gender ? startCase(record.gender) : null) },
        {
          label: "Treatment Department",
          value: record.preferredTreatmentDepartment,
        },
        {
          label: "Preferred Treatment Country",
          value: formatFieldValue(record.preferredTreatmentCountry),
        },
        { label: "Preferred Hospital", value: formatFieldValue(record.preferredHospital) },
        { label: "Patient Nationality", value: formatFieldValue(record.patientNationality) },
        { label: "Budget Range", value: formatFieldValue(record.budgetRange) },
        { label: "Visa Support", value: formatFieldValue(record.needsVisaSupport) },
        {
          label: "Accommodation Support",
          value: formatFieldValue(record.needsAccommodationSupport),
        },
        {
          label: "Diagnosis / Concern",
          value: formatFieldValue(record.diagnosisOrConcern),
        },
        { label: "Locale", value: formatFieldValue(record.locale) },
        { label: "Source Page", value: formatFieldValue(record.sourcePage) },
        { label: "User Country", value: formatFieldValue(record.userCountry) },
        { label: "IP Address", value: formatFieldValue(record.userIp) },
        { label: "User Agent", value: formatFieldValue(record.userAgent) },
      ],
    });
  }

  if (type === "hospital") {
    const record = await prisma.hospitalPartnershipInquiry.findUnique({
      where: { id },
      include: {
        uploadedFiles: {
          orderBy: { uploadedAt: "desc" },
          select: {
            id: true,
            originalName: true,
            mimeType: true,
            sizeBytes: true,
            uploadedAt: true,
          },
        },
      },
    });

    if (!record) return null;

    return normalizeDetail({
      id: record.id,
      type,
      typeLabel: getTypeLabel(type),
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
      status: record.status,
      priority: record.priority,
      name: record.contactPersonName,
      organization: record.hospitalName,
      email: record.email,
      phone: record.phone,
      country: record.country,
      locale: record.locale,
      sourcePage: record.sourcePage,
      userCountry: record.userCountry,
      message: record.message,
      internalNote: record.internalNote,
      attachments: record.uploadedFiles,
      fields: [
        { label: "Hospital Name", value: record.hospitalName },
        { label: "Contact Person", value: record.contactPersonName },
        { label: "Designation", value: formatFieldValue(record.designation) },
        { label: "Email", value: record.email },
        { label: "Phone", value: formatFieldValue(record.phone) },
        { label: "Country", value: formatFieldValue(record.country) },
        { label: "City", value: formatFieldValue(record.city) },
        { label: "Website", value: formatFieldValue(record.website) },
        {
          label: "Partnership Interest",
          value: formatPartnershipInterest(record.partnershipInterest),
        },
        { label: "Consent", value: formatFieldValue(record.consent) },
        { label: "Locale", value: formatFieldValue(record.locale) },
        { label: "Source Page", value: formatFieldValue(record.sourcePage) },
        { label: "User Country", value: formatFieldValue(record.userCountry) },
        { label: "IP Address", value: formatFieldValue(record.userIp) },
        { label: "User Agent", value: formatFieldValue(record.userAgent) },
      ],
    });
  }

  const record = await prisma.studentMobilityInquiry.findUnique({
    where: { id },
    include: {
      uploadedFiles: {
        orderBy: { uploadedAt: "desc" },
        select: {
          id: true,
          originalName: true,
          mimeType: true,
          sizeBytes: true,
          uploadedAt: true,
        },
      },
    },
  });

  if (!record) return null;

  return normalizeDetail({
    id: record.id,
    type,
    typeLabel: getTypeLabel(type),
    createdAt: record.createdAt,
    updatedAt: record.updatedAt,
    status: record.status,
    priority: toInquiryPriority(record.priority),
    name: record.name,
    organization: record.organization,
    email: record.email,
    phone: record.phone,
    country: record.country,
    locale: record.locale,
    sourcePage: record.sourcePage || record.sourcePath,
    userCountry: record.userCountry,
    message: record.message,
    internalNote: record.internalNote,
    attachments: record.uploadedFiles,
    fields: [
      { label: "Student / Contact Name", value: record.name },
      { label: "Organization", value: formatFieldValue(record.organization) },
      { label: "Email", value: record.email },
      { label: "Phone", value: formatFieldValue(record.phone) },
      { label: "Country", value: formatFieldValue(record.country) },
      { label: "City", value: formatFieldValue(record.city) },
      {
        label: "Interested Service",
        value: formatStudentService(record.interestedService),
      },
      { label: "Preferred Country", value: formatFieldValue(record.preferredCountry) },
      { label: "Preferred Course", value: formatFieldValue(record.preferredCourse) },
      { label: "Program Interest", value: formatFieldValue(record.programInterest) },
      {
        label: "Academic Background",
        value: formatFieldValue(record.academicBackground),
      },
      { label: "Consent", value: formatFieldValue(record.consent) },
      { label: "Locale", value: formatFieldValue(record.locale) },
      {
        label: "Source Page",
        value: formatFieldValue(record.sourcePage || record.sourcePath),
      },
      { label: "User Country", value: formatFieldValue(record.userCountry) },
      { label: "IP Address", value: formatFieldValue(record.userIp) },
      { label: "User Agent", value: formatFieldValue(record.userAgent) },
    ],
  });
}

export async function updateInquiryRecord(params: {
  type: AdminInquiryType;
  id: string;
  status: InquiryStatus;
  priority: InquiryPriority;
  internalNote?: string;
}) {
  const note = params.internalNote?.trim() || null;

  if (params.type === "contact") {
    await prisma.contactInquiry.update({
      where: { id: params.id },
      data: {
        status: params.status,
        priority: params.priority,
        internalNote: note,
      },
    });
    return;
  }

  if (params.type === "patient") {
    await prisma.patientInquiry.update({
      where: { id: params.id },
      data: {
        status: params.status,
        priority: params.priority,
        internalNote: note,
      },
    });
    return;
  }

  if (params.type === "hospital") {
    await prisma.hospitalPartnershipInquiry.update({
      where: { id: params.id },
      data: {
        status: params.status,
        priority: params.priority,
        internalNote: note,
      },
    });
    return;
  }

  await prisma.studentMobilityInquiry.update({
    where: { id: params.id },
    data: {
      status: params.status,
      priority: toLeadPriority(params.priority) ?? LeadPriority.MEDIUM,
      internalNote: note,
    },
  });
}

export async function exportInquiriesCsv(filters: InquiryDashboardFilters = {}) {
  const records = await getInquiryRecords(filters);
  const header = [
    "Created Date",
    "Inquiry Type",
    "Name",
    "Email",
    "Phone",
    "Country",
    "Status",
    "Priority",
    "Message",
    "Internal Note",
  ];

  const rows = records.map((record) =>
    [
      record.createdAt.toISOString(),
      record.typeLabel,
      record.organization ? `${record.name} (${record.organization})` : record.name,
      record.email ?? "",
      record.phone ?? "",
      record.country ?? "",
      startCase(record.status),
      startCase(record.priority),
      record.message,
      record.internalNote ?? "",
    ]
      .map((value) => toCsvValue(value))
      .join(","),
  );

  return [header.map((value) => toCsvValue(value)).join(","), ...rows].join("\n");
}
