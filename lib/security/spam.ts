import "server-only";

import { headers } from "next/headers";

import { env } from "@/lib/env";
import { toOptionalString } from "@/lib/utils";

const urlPattern = /(https?:\/\/|www\.)/gi;
const suspiciousKeywordPattern =
  /\b(crypto|casino|loan|seo|backlink|escort|porn|forex|betting|viagra)\b/i;
const repeatedCharacterPattern = /(.)\1{7,}/i;

export function assertHoneypotClear(formData: FormData) {
  const honeypot = toOptionalString(formData.get(env.SPAM_HONEYPOT_FIELD));

  if (honeypot) {
    throw new Error("Spam protection triggered.");
  }
}

export function assertMessageIsClean(message: string) {
  const suspiciousReason = getSuspiciousMessageReason(message);

  if (suspiciousReason) {
    throw new Error(suspiciousReason);
  }
}

export function getClientIdentifier() {
  const headerStore = headers();
  const forwardedFor = headerStore.get("x-forwarded-for");
  const realIp = headerStore.get("x-real-ip");
  return forwardedFor?.split(",")[0]?.trim() || realIp || "anonymous";
}

export function getClientUserAgent() {
  return headers().get("user-agent") || "unknown";
}

export function getClientCountry() {
  const headerStore = headers();
  return (
    headerStore.get("x-vercel-ip-country") ||
    headerStore.get("cf-ipcountry") ||
    undefined
  );
}

export function getSuspiciousMessageReason(message: string) {
  const normalized = message.trim();

  if (!normalized) {
    return "Empty message.";
  }

  if (normalized.length < 12) {
    return "Message is too short.";
  }

  const urlMatches = normalized.match(urlPattern) ?? [];
  if (urlMatches.length > 3) {
    return "Message contains too many links.";
  }

  if (suspiciousKeywordPattern.test(normalized)) {
    return "Message contains spam keywords.";
  }

  if (repeatedCharacterPattern.test(normalized)) {
    return "Message looks auto-generated.";
  }

  return null;
}
