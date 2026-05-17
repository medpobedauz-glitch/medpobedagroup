"use server";

import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { logAuditEvent } from "@/lib/audit";
import { createAdminSession, clearAdminSession } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma";
import { assertValidServerActionOrigin } from "@/lib/security/origin";
import { assertRateLimit } from "@/lib/security/rate-limit";
import { getClientIdentifier } from "@/lib/security/spam";
import { adminLoginSchema } from "@/lib/validators/auth";
import { toRequiredString } from "@/lib/utils";

export async function loginAdminAction(formData: FormData) {
  assertValidServerActionOrigin();
  const identifier = getClientIdentifier();
  assertRateLimit({
    key: `admin-login:${identifier}`,
    limit: 5,
    windowMs: 1000 * 60 * 10,
  });

  const parsed = adminLoginSchema.safeParse({
    email: toRequiredString(formData.get("email")),
    password: toRequiredString(formData.get("password")),
  });

  if (!parsed.success) {
    await logAuditEvent({
      action: "auth.login.failed",
      entityType: "user",
      description: "Admin login failed validation.",
    });
    redirect("/admin/login?error=invalid");
  }

  const user = await prisma.user.findUnique({
    where: { email: parsed.data.email },
  });

  if (!user || !user.isActive) {
    await logAuditEvent({
      action: "auth.login.failed",
      entityType: "user",
      description: `Admin login failed for ${parsed.data.email}.`,
    });
    redirect("/admin/login?error=invalid");
  }

  const passwordMatches = await bcrypt.compare(
    parsed.data.password,
    user.passwordHash,
  );

  if (!passwordMatches) {
    await logAuditEvent({
      actorId: user.id,
      action: "auth.login.failed",
      entityType: "user",
      entityId: user.id,
      description: `Admin login failed for ${user.email}.`,
    });
    redirect("/admin/login?error=invalid");
  }

  await prisma.user.update({
    where: { id: user.id },
    data: {
      lastLoginAt: new Date(),
      lastSeenAt: new Date(),
    },
  });

  await createAdminSession({
    userId: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  });

  await logAuditEvent({
    actorId: user.id,
    action: "auth.login",
    entityType: "user",
    entityId: user.id,
    description: `${user.email} signed in to the admin workspace.`,
  });

  revalidatePath("/admin");
  redirect("/admin");
}

export async function logoutAdminAction() {
  assertValidServerActionOrigin();
  await logAuditEvent({
    action: "auth.logout",
    entityType: "user",
    description: "Admin session signed out.",
  });
  clearAdminSession();
  revalidatePath("/admin");
  redirect("/admin/login");
}
