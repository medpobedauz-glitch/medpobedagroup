import "server-only";

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";

import { FileCategory, FileVisibility } from "@prisma/client";

import { env } from "@/lib/env";
import { prisma } from "@/lib/prisma";

const officeMimeTypes = [
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const categoryMimeMap: Record<FileCategory, string[]> = {
  MEDICAL_REPORT: ["application/pdf", "image/jpeg", "image/png", ...officeMimeTypes],
  PASSPORT: ["application/pdf", "image/jpeg", "image/png", ...officeMimeTypes],
  TREATMENT_DOCUMENT: ["application/pdf", "image/jpeg", "image/png", ...officeMimeTypes],
  PARTNERSHIP_DOCUMENT: [
    "application/pdf",
    "image/jpeg",
    "image/png",
    ...officeMimeTypes,
  ],
  AGREEMENT_DOCUMENT: [
    "application/pdf",
    "image/jpeg",
    "image/png",
    ...officeMimeTypes,
  ],
  BLOG_COVER: ["image/jpeg", "image/png", "image/webp"],
  GENERAL: ["application/pdf", "image/jpeg", "image/png", ...officeMimeTypes],
};

const categoryExtensionMap: Record<FileCategory, string[]> = {
  MEDICAL_REPORT: [".pdf", ".jpg", ".jpeg", ".png", ".doc", ".docx"],
  PASSPORT: [".pdf", ".jpg", ".jpeg", ".png", ".doc", ".docx"],
  TREATMENT_DOCUMENT: [".pdf", ".jpg", ".jpeg", ".png", ".doc", ".docx"],
  PARTNERSHIP_DOCUMENT: [".pdf", ".jpg", ".jpeg", ".png", ".doc", ".docx"],
  AGREEMENT_DOCUMENT: [".pdf", ".jpg", ".jpeg", ".png", ".doc", ".docx"],
  BLOG_COVER: [".jpg", ".jpeg", ".png", ".webp"],
  GENERAL: [".pdf", ".jpg", ".jpeg", ".png", ".doc", ".docx"],
};

function sanitizeFileName(fileName: string) {
  return fileName.replace(/[^a-zA-Z0-9.-]/g, "-").toLowerCase();
}

function getFileExtension(fileName: string) {
  return path.extname(fileName).toLowerCase();
}

function resolveUploadVisibility(category: FileCategory, visibility?: FileVisibility) {
  if (visibility) {
    return visibility;
  }

  if (category === FileCategory.BLOG_COVER) {
    return FileVisibility.PUBLIC;
  }

  return FileVisibility.ADMIN_ONLY;
}

function resolveEntityDirectory({
  patientCaseId,
  patientId,
  medicalTourismInquiryId,
  contactSubmissionId,
  partnershipLeadId,
  studentMobilityInquiryId,
  hospitalId,
  partnershipId,
  blogPostId,
}: {
  patientCaseId?: string;
  patientId?: string;
  medicalTourismInquiryId?: string;
  contactSubmissionId?: string;
  partnershipLeadId?: string;
  studentMobilityInquiryId?: string;
  hospitalId?: string;
  partnershipId?: string;
  blogPostId?: string;
}) {
  if (patientCaseId) {
    return path.join("cases", patientCaseId);
  }

  if (medicalTourismInquiryId) {
    return path.join("inquiries", "medical-tourism", medicalTourismInquiryId);
  }

  if (contactSubmissionId) {
    return path.join("inquiries", "contact", contactSubmissionId);
  }

  if (partnershipLeadId) {
    return path.join("inquiries", "partnership", partnershipLeadId);
  }

  if (studentMobilityInquiryId) {
    return path.join("inquiries", "student-mobility", studentMobilityInquiryId);
  }

  if (partnershipId) {
    return path.join("partnerships", partnershipId);
  }

  if (hospitalId) {
    return path.join("hospitals", hospitalId);
  }

  if (patientId) {
    return path.join("patients", patientId);
  }

  if (blogPostId) {
    return path.join("blog", blogPostId);
  }

  return path.join("unassigned");
}

export function isPreviewableMimeType(mimeType: string) {
  return (
    mimeType === "application/pdf" ||
    mimeType.startsWith("image/")
  );
}

export async function storeUploadedFile({
  file,
  category,
  visibility,
  versionGroup,
  documentLabel,
  uploadedByUserId,
  patientId,
  medicalTourismInquiryId,
  contactSubmissionId,
  partnershipLeadId,
  studentMobilityInquiryId,
  hospitalId,
  partnershipId,
  blogPostId,
  patientCaseId,
}: {
  file: File;
  category: FileCategory;
  visibility?: FileVisibility;
  versionGroup?: string;
  documentLabel?: string;
  uploadedByUserId?: string;
  patientId?: string;
  medicalTourismInquiryId?: string;
  contactSubmissionId?: string;
  partnershipLeadId?: string;
  studentMobilityInquiryId?: string;
  hospitalId?: string;
  partnershipId?: string;
  blogPostId?: string;
  patientCaseId?: string;
}) {
  if (!file || file.size === 0) {
    return null;
  }

  const allowedMimeTypes = categoryMimeMap[category];
  const extension = getFileExtension(file.name);
  const allowedExtensions = categoryExtensionMap[category];

  if (!allowedMimeTypes.includes(file.type) || !allowedExtensions.includes(extension)) {
    throw new Error(`Unsupported file type for ${category}.`);
  }

  const maxSizeBytes = env.MAX_UPLOAD_SIZE_MB * 1024 * 1024;
  if (file.size > maxSizeBytes) {
    throw new Error(`File exceeds ${env.MAX_UPLOAD_SIZE_MB}MB limit.`);
  }

  const date = new Date();
  const entityDirectory = resolveEntityDirectory({
    patientCaseId,
    patientId,
    medicalTourismInquiryId,
    contactSubmissionId,
    partnershipLeadId,
    studentMobilityInquiryId,
    hospitalId,
    partnershipId,
    blogPostId,
  });
  const relativeDir = path.join(
    entityDirectory,
    category.toLowerCase(),
    String(date.getUTCFullYear()),
    String(date.getUTCMonth() + 1).padStart(2, "0"),
  );
  const absoluteDir = path.resolve(process.cwd(), env.UPLOAD_ROOT, relativeDir);

  await mkdir(absoluteDir, { recursive: true });

  const safeName = sanitizeFileName(file.name);
  const fileName = `${Date.now()}-${randomUUID()}-${safeName}`;
  const absolutePath = path.join(absoluteDir, fileName);
  const storagePath = path.join(relativeDir, fileName);
  const resolvedVersionGroup =
    versionGroup ||
    `${entityDirectory}:${category.toLowerCase()}:${sanitizeFileName(documentLabel || file.name)}`;
  const latestVersion = await prisma.uploadedFile.findFirst({
    where: {
      versionGroup: resolvedVersionGroup,
    },
    orderBy: {
      version: "desc",
    },
    select: {
      version: true,
    },
  });
  const nextVersion = (latestVersion?.version ?? 0) + 1;
  const resolvedVisibility = resolveUploadVisibility(category, visibility);

  const bytes = Buffer.from(await file.arrayBuffer());
  await writeFile(absolutePath, bytes);

  return prisma.uploadedFile.create({
    data: {
      originalName: file.name,
      fileName,
      mimeType: file.type,
      sizeBytes: file.size,
      storagePath,
      category,
      visibility: resolvedVisibility,
      version: nextVersion,
      versionGroup: resolvedVersionGroup,
      documentLabel: documentLabel ?? file.name,
      uploadedByUserId,
      patientId,
      medicalTourismInquiryId,
      contactSubmissionId,
      partnershipLeadId,
      studentMobilityInquiryId,
      hospitalId,
      partnershipId,
      blogPostId,
      patientCaseId,
    },
  });
}
