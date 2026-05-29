import { redirect } from "next/navigation";

import { getAuthenticatedAdminUser } from "@/lib/auth/session";
import { AdminLoginForm } from "@/components/admin/admin-login-form";

type AdminLoginPageProps = {
  searchParams?: {
    error?: string;
  };
};

export default async function AdminLoginPage({ searchParams }: AdminLoginPageProps) {
  const user = await getAuthenticatedAdminUser();

  if (user) {
    redirect("/admin");
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.16),transparent_26%),linear-gradient(180deg,#f8fbff_0%,#eef6ff_42%,#ffffff_100%)]">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <AdminLoginForm hasError={searchParams?.error === "invalid"} />
      </div>
    </div>
  );
}
