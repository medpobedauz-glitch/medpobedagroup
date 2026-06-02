import { NextResponse } from "next/server";

import { searchPublicContent, type PublicSearchItemType } from "@/lib/data/public-search";

const ALLOWED_TYPES: ReadonlyArray<PublicSearchItemType | "all"> = [
  "all",
  "page",
  "cost",
  "faq",
  "specialty",
];

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = (searchParams.get("q") ?? "").slice(0, 120);
  const limitParam = Number.parseInt(searchParams.get("limit") ?? "10", 10);
  const limit = Number.isFinite(limitParam)
    ? Math.min(Math.max(limitParam, 1), 20)
    : 10;
  const typeParam = (searchParams.get("type") ?? "all") as
    | PublicSearchItemType
    | "all";
  const type = ALLOWED_TYPES.includes(typeParam) ? typeParam : "all";

  const result = searchPublicContent({ query, limit, type });

  return NextResponse.json(result, {
    headers: {
      "Cache-Control": "public, max-age=30, s-maxage=60, stale-while-revalidate=300",
    },
  });
}
