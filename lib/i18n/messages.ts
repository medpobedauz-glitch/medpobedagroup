import enMessages from "@/messages/en.json";
import kkMessages from "@/messages/kk.json";
import kyMessages from "@/messages/ky.json";
import ruMessages from "@/messages/ru.json";
import tgMessages from "@/messages/tg.json";
import tkMessages from "@/messages/tk.json";
import uzMessages from "@/messages/uz.json";
import type { AppLocale } from "@/lib/i18n/config";
import { defaultLocale } from "@/lib/i18n/config";

export type Messages = typeof enMessages;
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends Array<infer Item>
    ? Item[]
    : T[K] extends object
      ? DeepPartial<T[K]>
      : T[K];
};

const messageOverrides: Record<AppLocale, DeepPartial<Messages>> = {
  uz: uzMessages,
  ky: kyMessages,
  en: enMessages,
  kk: kkMessages,
  tg: tgMessages,
  tk: tkMessages,
  ru: ruMessages,
};

export function getMessages(locale: AppLocale) {
  if (locale === defaultLocale) {
    return enMessages;
  }

  return mergeMessages(enMessages, messageOverrides[locale] ?? {});
}

function mergeMessages<T>(base: T, override: DeepPartial<T>): T {
  if (Array.isArray(base)) {
    return ((override as T | undefined) ?? base) as T;
  }

  if (!isPlainObject(base) || !isPlainObject(override)) {
    return ((override as T | undefined) ?? base) as T;
  }

  const merged = { ...base } as Record<string, unknown>;

  for (const [key, value] of Object.entries(override)) {
    if (value === undefined) {
      continue;
    }

    const baseValue = merged[key];
    merged[key] = isPlainObject(baseValue) && isPlainObject(value)
      ? mergeMessages(baseValue, value)
      : value;
  }

  return merged as T;
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
