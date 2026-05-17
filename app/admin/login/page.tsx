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
    <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
      <AdminLoginForm hasError={searchParams?.error === "invalid"} />
    </div>
  );
}
