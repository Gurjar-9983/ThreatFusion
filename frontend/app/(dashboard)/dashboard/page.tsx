
"use client";

import AuthGuard from "@/components/auth/AuthGuard";

import { useIOCs } from "@/lib/hooks/useIOCs";
import { useDashboardAnalytics } from "@/lib/hooks/useDashboardAnalytics";

import DashboardHero from "@/components/dashboard/DashboardHero";
import QuickActions from "@/components/dashboard/QuickActions";
import StatsCards from "@/components/dashboard/StatsCards";
import SeverityChart from "@/components/dashboard/SeverityChart";
import IOCTypeChart from "@/components/dashboard/IOCTypeChart";
import RecentActivity from "@/components/dashboard/RecentActivity";
import TopSourcesCard from "@/components/dashboard/TopSourcesCard";

import IOCTable from "@/components/ioc/IOCTable";
import ThreatFeed from "@/components/threat-feed/ThreatFeed";

import SkeletonCard from "@/components/common/SkeletonCard";

export default function DashboardPage() {
  const { data, isLoading } = useIOCs();

  const iocs = data?.items ?? [];

  const analytics = useDashboardAnalytics(iocs);

  return (
    <AuthGuard>
      <main className="min-h-screen bg-slate-950 p-8 text-white">

        {/* Hero */}
        <DashboardHero />

        {/* Quick Actions */}
        <section className="mt-6">
          <QuickActions />
        </section>

        {/* Statistics */}
        <section className="mt-8">
          <StatsCards />
        </section>

        {isLoading ? (
          <section className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </section>
        ) : (
          <>
            {/* Charts */}
            <section className="mt-8 grid gap-6 xl:grid-cols-2">
              <SeverityChart
                data={analytics.severityData}
              />

              <IOCTypeChart
                data={analytics.typeData}
              />
            </section>

            {/* Activity */}
            <section className="mt-8 grid gap-6 xl:grid-cols-2">
              <RecentActivity
                data={analytics.recentActivity}
              />

              <TopSourcesCard
                data={analytics.topSources}
              />
            </section>

            {/* Threat Feed */}
            <section className="mt-8">
              <h2 className="mb-4 text-2xl font-semibold">
                Live Threat Feed
              </h2>

              <ThreatFeed iocs={iocs} />
            </section>
          </>
        )}

        {/* IOC Table */}
        <section className="mt-10">

          <div className="mb-4 flex items-center justify-between">

            <div>
              <h2 className="text-2xl font-semibold">
                Indicators of Compromise
              </h2>

              <p className="text-sm text-slate-400">
                Monitor, search and manage your threat indicators.
              </p>
            </div>

          </div>

          <IOCTable />

        </section>

      </main>
    </AuthGuard>
  );
}