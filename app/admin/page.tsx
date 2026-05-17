import {
  Activity,
  Building2,
  Globe2,
  HeartHandshake,
  Hospital,
  Sparkles,
  UserPlus,
  Users,
} from "lucide-react";

import { requireAdminUser } from "@/lib/auth/session";
import { getDashboardAnalytics } from "@/lib/data/dashboard";
import { AdminActivityHeatmap } from "@/components/admin/admin-activity-heatmap";
import { AdminActivityTimeline } from "@/components/admin/admin-activity-timeline";
import { AdminAnalyticsCharts } from "@/components/admin/admin-analytics-charts";
import { AdminPagePerformance } from "@/components/admin/admin-page-performance";
import { AdminShell } from "@/components/admin/admin-shell";
import { AdminStatCard } from "@/components/admin/admin-stat-card";
import { AdminTrendBars } from "@/components/admin/admin-trend-bars";
import { LeadManagementTable } from "@/components/admin/lead-management-table";
import { Card } from "@/components/ui/card";
import { getHospitalsForAdmin } from "@/lib/data/partnerships";
import { getAdminUsers } from "@/lib/data/dashboard";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const user = await requireAdminUser();
  const [analytics, staff, hospitals] = await Promise.all([
    getDashboardAnalytics(),
    getAdminUsers(),
    getHospitalsForAdmin(),
  ]);

  return (
    <AdminShell
      currentPath="/admin"
      title="Dashboard Overview"
      description="Operational analytics across contact submissions, partnership requests, medical tourism leads, and student mobility enquiries."
      user={user}
    >
      <div className="grid gap-5 xl:grid-cols-4">
        <AdminStatCard
          label="Total Inquiries"
          value={String(analytics.totalInquiries)}
          description="Combined inquiry volume across all live intake models."
          icon={<Activity className="h-6 w-6" />}
        />
        <AdminStatCard
          label="Monthly Inquiries"
          value={String(analytics.monthlyInquiries)}
          description="New leads captured during the current calendar month."
          icon={<Globe2 className="h-6 w-6" />}
        />
        <AdminStatCard
          label="Partnership Requests"
          value={String(analytics.partnershipRequests)}
          description="Hospital partnership and institutional collaboration requests."
          icon={<Building2 className="h-6 w-6" />}
        />
        <AdminStatCard
          label="Medical Tourism Leads"
          value={String(analytics.medicalTourismLeads)}
          description="Advanced treatment coordination enquiries captured through the intake flow."
          icon={<HeartHandshake className="h-6 w-6" />}
        />
        <AdminStatCard
          label="Student Mobility"
          value={String(analytics.studentMobilityLeads)}
          description="Active clinical exposure and mobility enquiries in the CRM."
          icon={<Users className="h-6 w-6" />}
        />
        <AdminStatCard
          label="New Hospitals"
          value={String(analytics.newHospitalsAdded)}
          description="Hospital records added during the current month."
          icon={<Hospital className="h-6 w-6" />}
        />
        <AdminStatCard
          label="Conversion Ratio"
          value={`${analytics.conversionRatio}%`}
          description="Closed inquiries as a share of all captured leads."
          icon={<Sparkles className="h-6 w-6" />}
        />
        <AdminStatCard
          label="Monthly Growth"
          value={`${analytics.monthlyGrowth}%`}
          description="Month-over-month movement across the website lead funnel."
          icon={<UserPlus className="h-6 w-6" />}
        />
        <AdminStatCard
          label="Response Time"
          value={`${analytics.averageResponseHours}h`}
          description="Average first-response time across leads with tracked contact activity."
          icon={<Sparkles className="h-6 w-6" />}
        />
        <AdminStatCard
          label="Partnership Conversion"
          value={`${analytics.partnershipConversionRate}%`}
          description="Active and won partnership outcomes across the institutional pipeline."
          icon={<Building2 className="h-6 w-6" />}
        />
        <AdminStatCard
          label="Contact Conversion"
          value={`${analytics.contactConversionRate}%`}
          description="Form-success to page-view conversion across tracked public inquiry pages."
          icon={<Globe2 className="h-6 w-6" />}
        />
      </div>
      <AdminAnalyticsCharts
        trends={analytics.inquiryTrends}
        countries={analytics.countryAnalytics}
      />
      <div className="grid gap-5 xl:grid-cols-[0.95fr_1.05fr]">
        <Card variant="dashboard" className="border-white/10 p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.26em] text-cyan-100/70">
            Inquiry Sources
          </p>
          <h2 className="mt-4 font-display text-2xl font-semibold text-white">
            Source page contribution
          </h2>
          <div className="mt-6">
            <AdminTrendBars
              items={analytics.sourceBreakdown.map((item) => ({
                label: item.path,
                total: item.total,
              }))}
            />
          </div>
        </Card>
        <Card variant="dashboard" className="border-white/10 p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.26em] text-cyan-100/70">
            Partnership Pipeline
          </p>
          <h2 className="mt-4 font-display text-2xl font-semibold text-white">
            Institutional collaboration stages
          </h2>
          <div className="mt-6">
            <AdminTrendBars
              items={analytics.partnershipPipeline.map((item) => ({
                label: item.label,
                total: item.value,
              }))}
            />
          </div>
        </Card>
      </div>
      <div className="grid gap-5 xl:grid-cols-[1.08fr_0.92fr]">
        <Card variant="dashboard" className="border-white/10 p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.26em] text-cyan-100/70">
            Top Countries
          </p>
          <h2 className="mt-4 font-display text-2xl font-semibold text-white">
            Leading inquiry geographies
          </h2>
          <div className="mt-6 grid gap-3">
            {analytics.topCountries.map((item) => (
              <div
                key={item.country}
                className="flex items-center justify-between rounded-[1.2rem] border border-white/8 bg-white/6 px-4 py-3 text-sm text-slate-200"
              >
                <span>{item.country}</span>
                <span>{item.total}</span>
              </div>
            ))}
          </div>
        </Card>
        <AdminActivityTimeline items={analytics.activityTimeline} />
      </div>
      <div className="grid gap-5 xl:grid-cols-[1.04fr_0.96fr]">
        <AdminPagePerformance
          items={analytics.pagePerformance}
          trafficAnalyticsStatus={analytics.trafficAnalyticsStatus}
        />
        <AdminActivityHeatmap items={analytics.activityHeatmap} />
      </div>
      <div className="space-y-5">
        <Card variant="dashboard" className="border-white/10 p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.26em] text-cyan-100/70">
            Recent Inquiries
          </p>
          <h2 className="mt-4 font-display text-2xl font-semibold text-white">
            Latest lead intake across the platform
          </h2>
        </Card>
        <LeadManagementTable
          items={analytics.recentInquiries}
          staff={staff.filter((member) => member.isActive)}
          hospitals={hospitals.map((hospital) => ({
            id: hospital.id,
            name: hospital.name,
          }))}
        />
      </div>
    </AdminShell>
  );
}
