import { NextResponse } from "next/server";

import { requireAdminUser } from "@/lib/auth/session";
import { getDashboardAnalytics } from "@/lib/data/dashboard";

export const dynamic = "force-dynamic";

export async function GET() {
  await requireAdminUser();

  const analytics = await getDashboardAnalytics();

  return NextResponse.json(analytics);
}
