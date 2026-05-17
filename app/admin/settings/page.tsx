import { requireSuperAdmin } from "@/lib/auth/session";
import { getAdminUsers, getRecentAuditLogs } from "@/lib/data/dashboard";
import { getPlatformSettings } from "@/lib/data/settings";
import { AdminShell } from "@/components/admin/admin-shell";
import { SettingsConsole } from "@/components/admin/settings-console";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  const user = await requireSuperAdmin();
  const [users, auditLogs, settings] = await Promise.all([
    getAdminUsers(),
    getRecentAuditLogs(25),
    getPlatformSettings(),
  ]);

  return (
    <AdminShell
      currentPath="/admin/settings"
      title="Settings and Security"
      description="Manage admin access, review audit activity, and govern the operational security posture of the MedPobeda healthcare CRM workspace."
      user={user}
    >
      <SettingsConsole users={users} auditLogs={auditLogs} settings={settings} />
    </AdminShell>
  );
}
