
"use client";

import { useState } from "react";

import AuthGuard from "@/components/auth/AuthGuard";

import ReportStats from "@/components/reports/ReportStats";
import ReportSearch from "@/components/reports/ReportSearch";
import ReportsTable from "@/components/reports/ReportsTable";

import { useReports } from "@/lib/hooks/useReports";
import { useReportStats } from "@/lib/hooks/useReportStats";
import { deleteReport } from "@/lib/services/report";

export default function ReportsPage() {
  const [search, setSearch] = useState("");

  const {
    data: reports = [],
    refetch,
    isLoading,
  } = useReports();

  const {
    data: stats,
    isLoading: statsLoading,
  } = useReportStats();

  async function handleDelete(id: string) {
    try {
      await deleteReport(id);

      refetch();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <AuthGuard>
      <main className="min-h-screen bg-slate-950 p-8 text-white">

        {/* Header */}

        <div className="mb-8">

          <h1 className="text-4xl font-bold">
            Reports
          </h1>

          <p className="mt-2 text-slate-400">
            Manage and download IOC Intelligence Reports.
          </p>

        </div>

        {/* Statistics */}

        {statsLoading ? (

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="h-32 animate-pulse rounded-xl bg-slate-800"
              />
            ))}

          </div>

        ) : (

          <ReportStats
            stats={
              stats ?? {
                total_reports: 0,
                pdf_reports: 0,
                generated_today: 0,
                generated_this_month: 0,
              }
            }
          />

        )}

        {/* Search */}

        <div className="my-8">

          <ReportSearch
            value={search}
            onChange={setSearch}
          />

        </div>

        {/* Table */}

        {isLoading ? (

          <div className="rounded-xl border border-slate-800 bg-slate-900 p-12 text-center text-slate-400">
            Loading reports...
          </div>

        ) : (

          <ReportsTable
            reports={reports}
            search={search}
            onDelete={handleDelete}
          />

        )}

      </main>
    </AuthGuard>
  );
}