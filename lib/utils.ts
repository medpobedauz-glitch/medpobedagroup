import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function toOptionalString(value: FormDataEntryValue | null | undefined) {
  if (typeof value !== "string") {
    return undefined;
  }

  const normalized = value.trim();
  return normalized.length > 0 ? normalized : undefined;
}

export function toRequiredString(value: FormDataEntryValue | null | undefined) {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim();
}

export function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export function unique<T>(values: T[]) {
  return [...new Set(values)];
}

export function formatMonthKey(date: Date) {
  return `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, "0")}`;
}

export function toCsvValue(value: string | number | null | undefined) {
  const raw = value == null ? "" : String(value);
  return `"${raw.replace(/"/g, '""')}"`;
}

export function startCase(value: string) {
  return value
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function toPositiveInt(value: string | undefined, fallback: number) {
  const numeric = Number(value);

  if (!Number.isFinite(numeric) || numeric <= 0) {
    return fallback;
  }

  return Math.floor(numeric);
}

export function stripHtml(input: string) {
  return input.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

export function calculateReadingTime(input: string, wordsPerMinute = 220) {
  const plainText = stripHtml(input);
  const wordCount = plainText ? plainText.split(/\s+/).length : 0;

  if (!wordCount) {
    return 1;
  }

  return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
}
