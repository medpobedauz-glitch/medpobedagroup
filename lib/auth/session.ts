import "server-only";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { UserRole } from "@prisma/client";

import { env } from "@/lib/env";
import { prisma } from "@/lib/prisma";
import {
  SESSION_COOKIE_NAME,
  signSessionToken,
  verifySessionToken,
  type AdminSessionPayload,
} from "@/lib/auth/token";

export { SESSION_COOKIE_NAME, signSessionToken, verifySessionToken };
export type { AdminSessionPayload };

export async function createAdminSession(payload: AdminSessionPayload) {
  const token = await signSessionToken(payload);
  cookies().set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 12,
  });
}

export function clearAdminSession() {
  cookies().delete(SESSION_COOKIE_NAME);
}

export async function getAdminSession() {
  const token = cookies().get(SESSION_COOKIE_NAME)?.value;

  if (!token) {
    return null;
  }

  try {
    return await verifySessionToken(token);
  } catch {
    return null;
  }
}

export async function getAuthenticatedAdminUser() {
  const session = await getAdminSession();

  if (!session) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
  });

  if (!user || !user.isActive) {
    clearAdminSession();
    return null;
  }

  await prisma.user.update({
    where: { id: user.id },
    data: { lastSeenAt: new Date() },
  });

  return user;
}

export async function requireAdminUser(allowedRoles?: UserRole[]) {
  const user = await getAuthenticatedAdminUser();

  if (!user) {
    redirect("/admin/login");
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    redirect("/admin");
  }

  return user;
}

export async function requireSuperAdmin() {
  return requireAdminUser([UserRole.SUPER_ADMIN]);
}
