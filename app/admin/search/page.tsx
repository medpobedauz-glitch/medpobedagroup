import { requireAdminUser } from "@/lib/auth/session";
import { searchPlatformData } from "@/lib/data/search";
import { AdminSearchConsole } from "@/components/admin/admin-search-console";
import { AdminShell } from "@/components/admin/admin-shell";

export const dynamic = "force-dynamic";

type AdminSearchPageProps = {
  searchParams?: {
    query?: string;
    scope?: "all" | "leads" | "hospitals" | "partnerships" | "blog";
  };
};

export default async function AdminSearchPage({
  searchParams,
}: AdminSearchPageProps) {
  const user = await requireAdminUser();
  const results = await searchPlatformData({
    query: searchParams?.query,
    scope: searchParams?.scope,
  });

  return (
    <AdminShell
      currentPath="/admin/search"
      title="Global Search"
      description="Search the live CRM, hospital registry, partnership pipeline, and published blog content from one enterprise lookup surface."
      user={user}
    >
      <AdminSearchConsole
        query={searchParams?.query ?? ""}
        scope={searchParams?.scope ?? "all"}
        results={results}
      />
    </AdminShell>
  );
}
