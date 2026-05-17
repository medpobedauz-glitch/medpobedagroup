import { AnalyticsEventType, InquiryType, Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
import { z } from "zod";

import { env } from "@/lib/env";
import { prisma } from "@/lib/prisma";
import { assertRateLimit } from "@/lib/security/rate-limit";

const analyticsEventSchema = z.object({
  eventType: z.nativeEnum(AnalyticsEventType),
  path: z.string().startsWith("/"),
  inquiryType: z.nativeEnum(InquiryType).optional(),
  sessionId: z.string().max(120).optional(),
  metadata: z.record(z.unknown()).optional(),
});

export async function POST(request: Request) {
  try {
    const forwardedFor = request.headers.get("x-forwarded-for");
    const realIp = request.headers.get("x-real-ip");
    const identifier =
      forwardedFor?.split(",")[0]?.trim() || realIp || "anonymous-analytics";

    assertRateLimit({
      key: `analytics:${identifier}`,
      limit: 120,
      windowMs: 1000 * 60 * 10,
    });

    const body = analyticsEventSchema.parse(await request.json());

    if (env.DATABASE_URL) {
      await prisma.analyticsEvent.create({
        data: {
          eventType: body.eventType,
          path: body.path,
          inquiryType: body.inquiryType,
          sessionId: body.sessionId,
          referrer: request.headers.get("referer") ?? undefined,
          metadata:
            (body.metadata as Prisma.InputJsonValue | null | undefined) ?? undefined,
        },
      });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to record analytics event.";

    return NextResponse.json({ error: message }, { status: 400 });
  }
}
