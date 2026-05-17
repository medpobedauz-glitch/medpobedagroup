import { FileCategory, FileVisibility } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { getAuthenticatedAdminUser } from "@/lib/auth/session";
import { assertValidRouteHandlerOrigin } from "@/lib/security/origin";
import { assertRateLimit } from "@/lib/security/rate-limit";
import { storeUploadedFile } from "@/lib/uploads";
import { toOptionalString } from "@/lib/utils";

export const dynamic = "force-dynamic";

const uploadSchema = z.object({
  category: z.nativeEnum(FileCategory),
  patientId: z.string().cuid().optional(),
  medicalTourismInquiryId: z.string().cuid().optional(),
  contactSubmissionId: z.string().cuid().optional(),
  partnershipLeadId: z.string().cuid().optional(),
  studentMobilityInquiryId: z.string().cuid().optional(),
  hospitalId: z.string().cuid().optional(),
  partnershipId: z.string().cuid().optional(),
  blogPostId: z.string().cuid().optional(),
  patientCaseId: z.string().cuid().optional(),
  visibility: z.nativeEnum(FileVisibility).optional(),
  versionGroup: z.string().max(240).optional(),
  documentLabel: z.string().max(240).optional(),
});

export async function POST(request: NextRequest) {
  assertValidRouteHandlerOrigin(request);
  const user = await getAuthenticatedAdminUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  assertRateLimit({
    key: `admin-upload:${user.id}`,
    limit: 40,
    windowMs: 1000 * 60 * 60,
  });

  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File) || file.size === 0) {
    return NextResponse.json({ error: "A file is required." }, { status: 400 });
  }

  const parsed = uploadSchema.safeParse({
    category: toOptionalString(formData.get("category")),
    patientId: toOptionalString(formData.get("patientId")),
    medicalTourismInquiryId: toOptionalString(formData.get("medicalTourismInquiryId")),
    contactSubmissionId: toOptionalString(formData.get("contactSubmissionId")),
    partnershipLeadId: toOptionalString(formData.get("partnershipLeadId")),
    studentMobilityInquiryId: toOptionalString(formData.get("studentMobilityInquiryId")),
    hospitalId: toOptionalString(formData.get("hospitalId")),
    partnershipId: toOptionalString(formData.get("partnershipId")),
    blogPostId: toOptionalString(formData.get("blogPostId")),
    patientCaseId: toOptionalString(formData.get("patientCaseId")),
    visibility: toOptionalString(formData.get("visibility")),
    versionGroup: toOptionalString(formData.get("versionGroup")),
    documentLabel: toOptionalString(formData.get("documentLabel")),
  });

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid upload payload." }, { status: 400 });
  }

  const uploadedFile = await storeUploadedFile({
    file,
    category: parsed.data.category,
    uploadedByUserId: user.id,
    patientId: parsed.data.patientId,
    medicalTourismInquiryId: parsed.data.medicalTourismInquiryId,
    contactSubmissionId: parsed.data.contactSubmissionId,
    partnershipLeadId: parsed.data.partnershipLeadId,
    studentMobilityInquiryId: parsed.data.studentMobilityInquiryId,
    hospitalId: parsed.data.hospitalId,
    partnershipId: parsed.data.partnershipId,
    blogPostId: parsed.data.blogPostId,
    patientCaseId: parsed.data.patientCaseId,
    visibility: parsed.data.visibility,
    versionGroup: parsed.data.versionGroup,
    documentLabel: parsed.data.documentLabel,
  });

  if (!uploadedFile) {
    return NextResponse.json({ error: "File could not be stored." }, { status: 400 });
  }

  return NextResponse.json({
    id: uploadedFile.id,
    category: uploadedFile.category,
    originalName: uploadedFile.originalName,
    sizeBytes: uploadedFile.sizeBytes,
    mimeType: uploadedFile.mimeType,
    visibility: uploadedFile.visibility,
    version: uploadedFile.version,
    url: `/api/files/${uploadedFile.id}`,
  });
}
