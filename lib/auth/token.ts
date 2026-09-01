import { SignJWT, jwtVerify } from "jose";

import { env } from "../env";

export const SESSION_COOKIE_NAME = "medpobeda_admin_session";

const encoder = new TextEncoder();
const secret = encoder.encode(env.AUTH_SECRET);

export type AdminSessionPayload = {
  userId: string;
  email: string;
  name: string;
  role: import("@prisma/client").UserRole;
};

export async function signSessionToken(payload: AdminSessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(payload.userId)
    .setIssuedAt()
    .setExpirationTime("12h")
    .sign(secret);
}

export async function verifySessionToken(token: string) {
  const { payload } = await jwtVerify(token, secret);
  return payload as unknown as AdminSessionPayload;
}
