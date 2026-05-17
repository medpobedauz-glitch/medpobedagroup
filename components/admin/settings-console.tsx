import { UserRole } from "@prisma/client";

import { createAdminUserAction, updateAdminUserAccessAction } from "@/lib/actions/admin";
import { savePlatformSettingsAction } from "@/lib/actions/settings";
import { adminVisibleRoles } from "@/lib/admin-config";
import { startCase } from "@/lib/utils";
import { RolePill } from "@/components/admin/status-pill";
import { SubmitButton } from "@/components/forms/submit-button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type SettingsConsoleProps = {
  users: Awaited<ReturnType<typeof import("@/lib/data/dashboard").getAdminUsers>>;
  auditLogs: Awaited<
    ReturnType<typeof import("@/lib/data/dashboard").getRecentAuditLogs>
  >;
  settings: Awaited<ReturnType<typeof import("@/lib/data/settings").getPlatformSettings>>;
};

export function SettingsConsole({
  users,
  auditLogs,
  settings,
}: SettingsConsoleProps) {
  const readiness = [
    {
      label: "SEO Defaults",
      value: settings.seoDefaultTitle && settings.seoDefaultDescription ? "Ready" : "Needs review",
    },
    {
      label: "Inquiry Routing",
      value:
        settings.generalInquiryEmail &&
        settings.medicalTourismEmail &&
        settings.partnershipEmail
          ? "Ready"
          : "Partial",
    },
    {
      label: "Messaging Links",
      value: settings.whatsappNumber || settings.telegramHandle ? "Ready" : "Pending",
    },
  ];

  return (
    <div className="grid gap-6">
      <Card className="border-white/10 p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.26em] text-cyan-100/70">
              Platform Settings
            </p>
            <h2 className="mt-4 font-display text-2xl font-semibold text-white">
              SEO, routing, contact, and branding controls
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            {readiness.map((item) => (
              <span
                key={item.label}
                className="rounded-full border border-white/10 bg-white/8 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-300"
              >
                {item.label}: {item.value}
              </span>
            ))}
          </div>
        </div>
        <form action={savePlatformSettingsAction} className="mt-6 grid gap-6">
          <div className="grid gap-4 lg:grid-cols-2">
            <Input name="brandName" defaultValue={settings.brandName} placeholder="Brand name" />
            <Input name="shortName" defaultValue={settings.shortName} placeholder="Short name" />
            <Input name="siteUrl" defaultValue={settings.siteUrl} placeholder="https://..." />
            <Input name="ogImage" defaultValue={settings.ogImage ?? ""} placeholder="/opengraph-image" />
            <Input
              name="seoDefaultTitle"
              defaultValue={settings.seoDefaultTitle}
              placeholder="Default SEO title"
              className="lg:col-span-2"
            />
            <Textarea
              name="seoDefaultDescription"
              defaultValue={settings.seoDefaultDescription}
              placeholder="Default SEO description"
              className="min-h-[110px] lg:col-span-2"
            />
            <Input
              name="seoKeywords"
              defaultValue={settings.seoKeywords.join(", ")}
              placeholder="Keyword one, keyword two"
              className="lg:col-span-2"
            />
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            <Input name="contactEmail" defaultValue={settings.contactEmail} placeholder="Contact email" />
            <Input name="contactPhone" defaultValue={settings.contactPhone ?? ""} placeholder="Contact phone" />
            <Input
              name="medicalTourismEmail"
              defaultValue={settings.medicalTourismEmail ?? ""}
              placeholder="Medical tourism routing email"
            />
            <Input
              name="partnershipEmail"
              defaultValue={settings.partnershipEmail ?? ""}
              placeholder="Partnership routing email"
            />
            <Input
              name="studentMobilityEmail"
              defaultValue={settings.studentMobilityEmail ?? ""}
              placeholder="Student mobility routing email"
            />
            <Input
              name="generalInquiryEmail"
              defaultValue={settings.generalInquiryEmail ?? ""}
              placeholder="General inquiry routing email"
            />
            <Input
              name="highUrgencyEmail"
              defaultValue={settings.highUrgencyEmail ?? ""}
              placeholder="High urgency alert email"
            />
            <Input
              name="whatsappNumber"
              defaultValue={settings.whatsappNumber ?? ""}
              placeholder="WhatsApp number"
            />
            <Input
              name="telegramHandle"
              defaultValue={settings.telegramHandle ?? ""}
              placeholder="@telegramhandle"
            />
            <Input
              name="twitterHandle"
              defaultValue={settings.twitterHandle ?? ""}
              placeholder="@brandhandle"
            />
            <Input
              name="linkedinUrl"
              defaultValue={settings.linkedinUrl ?? ""}
              placeholder="LinkedIn URL"
            />
            <Input name="xUrl" defaultValue={settings.xUrl ?? ""} placeholder="X URL" />
            <Input
              name="youtubeUrl"
              defaultValue={settings.youtubeUrl ?? ""}
              placeholder="YouTube URL"
            />
            <Input
              name="brandingPrimary"
              defaultValue={settings.brandingPrimary ?? "#0B1F4D"}
              placeholder="#0B1F4D"
            />
            <Input
              name="brandingSecondary"
              defaultValue={settings.brandingSecondary ?? "#1D4ED8"}
              placeholder="#1D4ED8"
            />
          </div>
          <div>
            <SubmitButton type="submit" variant="hero" pendingLabel="Saving settings...">
              Save Platform Settings
            </SubmitButton>
          </div>
        </form>
      </Card>
      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <Card className="border-white/10 p-6">
          <h2 className="font-display text-2xl font-semibold text-white">
            Create Admin User
          </h2>
          <form action={createAdminUserAction} className="mt-5 grid gap-4">
            <Input name="name" placeholder="Full name" />
            <Input name="email" type="email" placeholder="admin@medpobeda.com" />
            <Input name="password" type="password" placeholder="Temporary password" />
            <select
              name="role"
              defaultValue={UserRole.STAFF}
              className="flex h-12 w-full rounded-2xl border border-white/10 bg-white/90 px-4 py-3 text-sm text-slate-950"
            >
              {adminVisibleRoles.map((role) => (
                <option key={role} value={role}>
                  {startCase(role)}
                </option>
              ))}
            </select>
            <SubmitButton type="submit" variant="secondary" pendingLabel="Creating user...">
              Create User
            </SubmitButton>
          </form>
        </Card>
        <Card className="border-white/10 p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.26em] text-cyan-100/70">
            Admin Access
          </p>
          <div className="mt-6 grid gap-4">
            {users.map((user) => (
              <div
                key={user.id}
                className="rounded-[1.4rem] border border-white/8 bg-white/6 p-4"
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <p className="text-lg font-semibold text-white">{user.name}</p>
                      <RolePill role={user.role} />
                    </div>
                    <p className="mt-2 text-sm text-slate-300">{user.email}</p>
                    <p className="mt-2 text-xs uppercase tracking-[0.2em] text-slate-500">
                      Last login: {user.lastLoginAt ? user.lastLoginAt.toLocaleString() : "Never"}
                    </p>
                  </div>
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <form action={updateAdminUserAccessAction} className="flex gap-3">
                      <input type="hidden" name="userId" value={user.id} />
                      <select
                        name="role"
                        defaultValue={user.role}
                        className="flex h-12 rounded-2xl border border-white/10 bg-white/90 px-4 py-3 text-sm text-slate-950"
                      >
                        {adminVisibleRoles.map((role) => (
                          <option key={role} value={role}>
                            {startCase(role)}
                          </option>
                        ))}
                      </select>
                      <SubmitButton
                        type="submit"
                        variant="secondary"
                        pendingLabel="Saving..."
                      >
                        Save Role
                      </SubmitButton>
                    </form>
                    <form action={updateAdminUserAccessAction}>
                      <input type="hidden" name="userId" value={user.id} />
                      <input type="hidden" name="isActive" value={String(!user.isActive)} />
                      <SubmitButton
                        type="submit"
                        variant="outline"
                        pendingLabel="Updating..."
                      >
                        {user.isActive ? "Deactivate" : "Activate"}
                      </SubmitButton>
                    </form>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
      <Card className="border-white/10 p-6">
        <p className="text-sm font-semibold uppercase tracking-[0.26em] text-cyan-100/70">
          Audit Logs
        </p>
        <div className="mt-6 grid gap-4">
          {auditLogs.map((log) => (
            <div
              key={log.id}
              className="rounded-[1.4rem] border border-white/8 bg-white/6 px-4 py-4"
            >
              <div className="flex flex-wrap gap-3 text-xs uppercase tracking-[0.22em] text-slate-500">
                <span>{startCase(log.action)}</span>
                {log.entityType ? <span>{startCase(log.entityType)}</span> : null}
                <span>{log.createdAt.toLocaleString()}</span>
              </div>
              <p className="mt-3 text-sm leading-7 text-slate-300">{log.description}</p>
              <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs uppercase tracking-[0.18em] text-slate-500">
                <span>Actor: {log.actor?.name ?? "System"}</span>
                <span>IP: {log.ipAddress ?? "Unknown"}</span>
                <span>Entity: {log.entityId ?? "N/A"}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
