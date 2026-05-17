import "server-only";

import { AIAssessmentStatus, type LanguageCode, Prisma } from "@prisma/client";

import { prisma } from "@/lib/prisma";

export async function createLeadAssessmentRecord({
  leadModel,
  leadId,
  language,
  suggestedCoordinatorId,
  leadScore,
  routingRecommendation,
  summary,
  metadata,
}: {
  leadModel: string;
  leadId: string;
  language?: LanguageCode | null;
  suggestedCoordinatorId?: string | null;
  leadScore?: number | null;
  routingRecommendation?: string | null;
  summary?: string | null;
  metadata?: Record<string, unknown> | null;
}) {
  return prisma.aILeadAssessment.create({
    data: {
      leadModel,
      leadId,
      language: language ?? undefined,
      suggestedCoordinatorId: suggestedCoordinatorId ?? undefined,
      leadScore: leadScore ?? undefined,
      routingRecommendation: routingRecommendation ?? undefined,
      summary: summary ?? undefined,
      status: AIAssessmentStatus.READY,
      metadata: (metadata as Prisma.InputJsonValue | null | undefined) ?? undefined,
    },
  });
}
