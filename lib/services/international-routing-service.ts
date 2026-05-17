import "server-only";

import { InquiryType, LanguageCode, type UrgencyLevel } from "@prisma/client";

import {
  getLocaleFromPathname,
  type AppLocale,
} from "@/lib/i18n/config";
import {
  findCountryByNameOrCode,
  findPreferredCoordinator,
} from "@/lib/repositories/international-operations-repository";
import { clamp, startCase } from "@/lib/utils";

const localeLanguageMap: Record<AppLocale, LanguageCode> = {
  en: LanguageCode.EN,
  ru: LanguageCode.RU,
  uz: LanguageCode.UZ,
  kk: LanguageCode.RU,
  ky: LanguageCode.RU,
  tg: LanguageCode.RU,
  tk: LanguageCode.RU,
};

function getLeadScore({
  inquiryType,
  hasCountry,
  urgencyLevel,
}: {
  inquiryType: InquiryType;
  hasCountry: boolean;
  urgencyLevel?: UrgencyLevel | null;
}) {
  let score = 38;

  if (inquiryType === InquiryType.MEDICAL_TOURISM) {
    score += 26;
  }

  if (inquiryType === InquiryType.PARTNERSHIP) {
    score += 18;
  }

  if (inquiryType === InquiryType.STUDENT_MOBILITY) {
    score += 12;
  }

  if (hasCountry) {
    score += 10;
  }

  if (urgencyLevel === "HIGH") {
    score += 16;
  }

  if (urgencyLevel === "CRITICAL") {
    score += 28;
  }

  return clamp(score, 1, 100);
}

export async function resolveInternationalRouting({
  inquiryType,
  country,
  preferredCountry,
  redirectPath,
  urgencyLevel,
}: {
  inquiryType: InquiryType;
  country?: string | null;
  preferredCountry?: string | null;
  redirectPath?: string | null;
  urgencyLevel?: UrgencyLevel | null;
}) {
  const locale = redirectPath ? getLocaleFromPathname(redirectPath) : "en";
  const language = localeLanguageMap[locale] ?? LanguageCode.EN;
  const countryRecord = await findCountryByNameOrCode(preferredCountry || country);
  const coordinator = countryRecord
    ? await findPreferredCoordinator(countryRecord.id, language)
    : null;
  const leadScore = getLeadScore({
    inquiryType,
    hasCountry: Boolean(countryRecord),
    urgencyLevel,
  });

  return {
    language,
    country: countryRecord,
    coordinator,
    leadScore,
    routingRecommendation: coordinator
      ? `Route to ${coordinator.name} for ${countryRecord?.name || "regional"} coordination.`
      : countryRecord
        ? `Route to the ${countryRecord.name} operations desk for manual triage.`
        : `Route to the ${startCase(inquiryType).toLowerCase()} admin workflow for manual review.`,
  };
}
