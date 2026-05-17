import Link from "next/link";

import { Button } from "@/components/ui/button";

type AdminPaginationProps = {
  page: number;
  pageCount: number;
  pathname: string;
  searchParams?: Record<string, string | undefined>;
};

function buildHref(
  pathname: string,
  searchParams: Record<string, string | undefined> | undefined,
  page: number,
) {
  const params = new URLSearchParams();

  Object.entries(searchParams ?? {}).forEach(([key, value]) => {
    if (!value || key === "page") {
      return;
    }

    params.set(key, value);
  });

  params.set("page", String(page));

  return `${pathname}?${params.toString()}`;
}

export function AdminPagination({
  page,
  pageCount,
  pathname,
  searchParams,
}: AdminPaginationProps) {
  if (pageCount <= 1) {
    return null;
  }

  return (
    <div className="flex flex-col gap-3 rounded-[1.6rem] border border-white/10 bg-white/6 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-slate-300">
        Page {page} of {pageCount}
      </p>
      <div className="flex gap-3">
        <Button
          asChild
          variant="outline"
          size="sm"
          className={page <= 1 ? "pointer-events-none opacity-50" : undefined}
        >
          <Link href={buildHref(pathname, searchParams, Math.max(page - 1, 1))}>
            Previous
          </Link>
        </Button>
        <Button
          asChild
          variant="outline"
          size="sm"
          className={
            page >= pageCount ? "pointer-events-none opacity-50" : undefined
          }
        >
          <Link
            href={buildHref(pathname, searchParams, Math.min(page + 1, pageCount))}
          >
            Next
          </Link>
        </Button>
      </div>
    </div>
  );
}
