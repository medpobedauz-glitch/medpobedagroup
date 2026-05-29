"use server";

import { InquiryPriority, InquiryStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import { requireAdminUser } from "@/lib/auth/session";
import {
  updateInquiryRecord,
} from "@/lib/data/inquiry-crm";
import { assertValidServerActionOrigin } from "@/lib/security/origin";
import { toOptionalString, toRequiredString } from "@/lib/utils";

const updateInquirySchema = z.object({
  id: z.string().cuid(),
  type: z.enum(["contact", "patient", "hospital", "student"]),
  status: z.nativeEnum(InquiryStatus),
  priority: z.nativeEnum(InquiryPriority),
  internalNote: z.string().max(4000).optional(),
  redirectTo: z.string().optional(),
});

export async function updateAdminInquiryAction(formData: FormData) {
  assertValidServerActionOrigin();
  await requireAdminUser();

  const parsed = updateInquirySchema.safeParse({
    id: toRequiredString(formData.get("id")),
    type: toRequiredString(formData.get("type")),
    status: toRequiredString(formData.get("status")),
    priority: toRequiredString(formData.get("priority")),
    internalNote: toOptionalString(formData.get("internalNote")),
    redirectTo: toOptionalString(formData.get("redirectTo")),
  });

  if (!parsed.success) {
    redirect("/admin/inquiries");
  }

  await updateInquiryRecord({
    id: parsed.data.id,
    type: parsed.data.type,
    status: parsed.data.status,
    priority: parsed.data.priority,
    internalNote: parsed.data.internalNote,
  });

  revalidatePath("/admin");
  revalidatePath("/admin/inquiries");
  revalidatePath(`/admin/inquiries/${parsed.data.type}/${parsed.data.id}`);

  redirect(parsed.data.redirectTo || `/admin/inquiries/${parsed.data.type}/${parsed.data.id}`);
}
