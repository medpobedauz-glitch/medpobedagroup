import "server-only";

import { headers } from "next/headers";
import type { NextRequest } from "next/server";

function normalizeOrigin(value: string) {
  return value.replace(/\/$/, "").toLowerCase();
}

function buildAllowedOrigin(host: string, forwardedProto?: string | null) {
  const protocol = forwardedProto?.split(",")[0]?.trim() || "https";
  return normalizeOrigin(`${protocol}://${host}`);
}

export function assertValidServerActionOrigin() {
  const requestHeaders = headers();
  const origin = requestHeaders.get("origin");
  const host = requestHeaders.get("x-forwarded-host") || requestHeaders.get("host");

  if (!origin || !host) {
    return;
  }

  const allowedOrigin = buildAllowedOrigin(
    host,
    requestHeaders.get("x-forwarded-proto"),
  );

  if (normalizeOrigin(origin) !== allowedOrigin) {
    throw new Error("Invalid request origin.");
  }
}

export function assertValidRouteHandlerOrigin(request: NextRequest) {
  const origin = request.headers.get("origin");
  const host = request.headers.get("x-forwarded-host") || request.headers.get("host");

  if (!origin || !host) {
    return;
  }

  const allowedOrigin = buildAllowedOrigin(
    host,
    request.headers.get("x-forwarded-proto"),
  );

  if (normalizeOrigin(origin) !== allowedOrigin) {
    throw new Error("Invalid request origin.");
  }
}
