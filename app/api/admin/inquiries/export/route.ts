import { InquiryPriority, InquiryStatus } from "@prisma/client";
import { NextResponse } from "next/server";

import { getAuthenticatedAdminUser } from "@/lib/auth/session";
import { exportInquiriesCsv } from "@/lib/data/inquiry-crm";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const user = await getAuthenticatedAdminUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);

  const csv = await exportInquiriesCsv({
    search: searchParams.get("search") || undefined,
    type: (searchParams.get("type") as
      | "all"
      | "contact"
      | "patient"
      | "hospital"
      | "student"
      | null) || undefined,
    status: (searchParams.get("status") as InquiryStatus | null) || undefined,
    priority: (searchParams.get("priority") as InquiryPriority | null) || undefined,
    from: searchParams.get("from") || undefined,
    to: searchParams.get("to") || undefined,
  });

  return new NextResponse(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="medpobeda-inquiries.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
