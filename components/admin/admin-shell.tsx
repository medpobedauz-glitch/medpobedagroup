import Link from "next/link";
import type { UserRole } from "@prisma/client";
import {
  BriefcaseMedical,
  ClipboardList,
  Globe2,
  Home,
  Hospital,
  LayoutDashboard,
  Newspaper,
  Route,
  Search,
  Settings,
  Stethoscope,
  Users,
  Workflow,
} from "lucide-react";

import { logoutAdminAction } from "@/lib/actions/auth";
import { siteConfig } from "@/lib/site";
import { cn, startCase } from "@/lib/utils";
import { BrandMark } from "@/components/layout/brand-mark";
import { RolePill } from "@/components/admin/status-pill";
import { SubmitButton } from "@/components/forms/submit-button";

type AdminShellProps = {
  currentPath: string;
  title: string;
  description: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
  user: {
    name: string;
    email: string;
    role: UserRole;
  };
};

const adminNav = [
  {
    href: "/admin",
    label: "Dashboard",
    icon: LayoutDashboard,
    roles: ["SUPER_ADMIN", "ADMIN", "STAFF"] as UserRole[],
  },
  {
    href: "/admin/inquiries",
    label: "Inquiry CRM",
    icon: ClipboardList,
    roles: ["SUPER_ADMIN", "ADMIN", "STAFF"] as UserRole[],
  },
  {
    href: "/admin/leads",
    label: "Leads",
    icon: Users,
    roles: ["SUPER_ADMIN", "ADMIN", "STAFF"] as UserRole[],
  },
  {
    href: "/admin/pipeline",
    label: "Pipeline",
    icon: Workflow,
    roles: ["SUPER_ADMIN", "ADMIN", "STAFF"] as UserRole[],
  },
  {
    href: "/admin/search",
    label: "Search",
    icon: Search,
    roles: ["SUPER_ADMIN", "ADMIN", "STAFF"] as UserRole[],
  },
  {
    href: "/admin/cases",
    label: "Patient Cases",
    icon: BriefcaseMedical,
    roles: ["SUPER_ADMIN", "ADMIN", "STAFF"] as UserRole[],
  },
  {
    href: "/admin/operations",
    label: "Operations",
    icon: Globe2,
    roles: ["SUPER_ADMIN", "ADMIN", "STAFF"] as UserRole[],
  },
  {
    href: "/admin/medical-tourism",
    label: "Medical Tourism",
    icon: Stethoscope,
    roles: ["SUPER_ADMIN", "ADMIN", "STAFF"] as UserRole[],
  },
  {
    href: "/admin/student-mobility",
    label: "Student Mobility",
    icon: Route,
    roles: ["SUPER_ADMIN", "ADMIN", "STAFF"] as UserRole[],
  },
  {
    href: "/admin/partnerships",
    label: "Partnerships",
    icon: Home,
    roles: ["SUPER_ADMIN", "ADMIN"] as UserRole[],
  },
  {
    href: "/admin/hospitals",
    label: "Hospitals",
    icon: Hospital,
    roles: ["SUPER_ADMIN", "ADMIN"] as UserRole[],
  },
  {
    href: "/admin/blog",
    label: "Blog CMS",
    icon: Newspaper,
    roles: ["SUPER_ADMIN", "ADMIN", "STAFF"] as UserRole[],
  },
  {
    href: "/admin/settings",
    label: "Settings",
    icon: Settings,
    roles: ["SUPER_ADMIN"] as UserRole[],
  },
];

export function AdminShell({
  currentPath,
  title,
  description,
  children,
  actions,
  user,
}: AdminShellProps) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.1),transparent_26%),linear-gradient(180deg,#06101f,#091b3f_38%,#071a38)]">
      <div className="mx-auto grid min-h-screen max-w-[1440px] gap-6 px-4 py-6 sm:px-6 sm:py-8 xl:grid-cols-[320px_1fr] xl:px-8">
        <aside className="surface-admin h-fit rounded-[2rem] border border-white/10 p-5 sm:p-6 xl:sticky xl:top-8">
          <Link href="/" className="block">
            <BrandMark />
          </Link>
          <div className="mt-6 rounded-[1.4rem] border border-cyan-300/14 bg-cyan-300/8 px-4 py-4">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-100/72">
              Enterprise CRM
            </p>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              Secure MedPobeda healthcare CRM for hospital collaboration, medical tourism operations, student mobility, and institutional lead management.
            </p>
          </div>
          <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-slate-950/32 p-4">
            <p className="text-xs uppercase tracking-[0.24em] text-cyan-100/70">
              Signed In
            </p>
            <p className="mt-3 text-sm font-semibold text-white">{user.name}</p>
            <p className="mt-1 text-sm text-slate-300">{user.email}</p>
            <div className="mt-3">
              <RolePill role={user.role} />
            </div>
          </div>
          <div className="mt-8">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
              Workspace Navigation
            </p>
          </div>
          <nav className="mt-4 grid gap-2">
            {adminNav
              .filter((item) => item.roles.includes(user.role))
              .map((item) => {
                const Icon = item.icon;
                const isActive =
                  currentPath === item.href ||
                  (item.href !== "/admin" && currentPath.startsWith(item.href));

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "group flex items-center gap-3 rounded-[1.2rem] border px-4 py-3 text-sm font-medium transition",
                      isActive
                        ? "border-cyan-300/20 bg-white/10 text-white shadow-soft"
                        : "border-transparent text-slate-300 hover:border-white/8 hover:bg-white/6 hover:text-white",
                    )}
                  >
                    <span
                      className={cn(
                        "flex h-9 w-9 items-center justify-center rounded-xl border transition",
                        isActive
                          ? "border-cyan-300/20 bg-cyan-300/10 text-cyan-100"
                          : "border-white/8 bg-slate-950/34 text-slate-400 group-hover:text-cyan-100",
                      )}
                    >
                      <Icon className="h-4 w-4" />
                    </span>
                    {item.label}
                  </Link>
                );
              })}
          </nav>
          <div className="mt-8 rounded-[1.5rem] border border-white/10 bg-slate-950/30 p-4">
            <p className="text-xs uppercase tracking-[0.24em] text-cyan-100/70">
              Operational Base
            </p>
            <p className="mt-3 text-sm text-white">{siteConfig.location}</p>
            <p className="mt-2 text-sm text-slate-300">
              {siteConfig.contactEmail}
            </p>
          </div>
          <form action={logoutAdminAction} className="mt-8">
            <SubmitButton
              type="submit"
              variant="surface"
              size="lg"
              className="w-full justify-center"
              pendingLabel="Signing out..."
            >
              Sign Out
            </SubmitButton>
          </form>
        </aside>
        <main className="space-y-8">
          <div className="surface-admin rounded-[2rem] border border-white/10 p-5 sm:p-7">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-100/70">
                  Admin Workspace
                </p>
                <h1 className="mt-4 font-display text-4xl font-semibold text-white">
                  {title}
                </h1>
                <p className="mt-4 max-w-3xl text-base leading-8 text-slate-300">
                  {description}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <div className="rounded-full border border-white/10 bg-white/8 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-slate-300">
                  {startCase(user.role)}
                </div>
                <div className="rounded-full border border-cyan-300/16 bg-cyan-300/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-100">
                  Enterprise Analytics
                </div>
                {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
              </div>
            </div>
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}
