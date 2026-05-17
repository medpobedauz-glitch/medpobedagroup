import "server-only";

import { headers } from "next/headers";

import { env } from "@/lib/env";
import { toOptionalString } from "@/lib/utils";

const urlPattern = /(https?:\/\/|www\.)/gi;

export function assertHoneypotClear(formData: FormData) {
  const honeypot = toOptionalString(formData.get(env.SPAM_HONEYPOT_FIELD));

  if (honeypot) {
    throw new Error("Spam protection triggered.");
  }
}

export function assertMessageIsClean(message: string) {
  const urlMatches = message.match(urlPattern) ?? [];
  if (urlMatches.length > 3) {
    throw new Error("Message looks like spam.");
  }
}

export function getClientIdentifier() {
  const headerStore = headers();
  const forwardedFor = headerStore.get("x-forwarded-for");
  const realIp = headerStore.get("x-real-ip");
  return forwardedFor?.split(",")[0]?.trim() || realIp || "anonymous";
}

