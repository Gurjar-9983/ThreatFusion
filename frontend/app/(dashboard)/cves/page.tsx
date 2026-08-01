
"use client";

import { useState } from "react";

import CVEFilters from "@/components/cves/CVEFilters";
import CVEStats from "@/components/cves/CVEStats";
import CVETable from "@/components/cves/CVETable";

import { useCVEs } from "@/lib/hooks/useCVEs";

export default function CVEsPage() {
  const [limit, setLimit] = useState(20);
  const [severity, setSeverity] = useState("");
  const [keyword, setKeyword] = useState("");

  const { data, isLoading, error } = useCVEs({
    limit,
    severity,
    keyword,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <p className="text-lg text-muted-foreground">
          Loading CVE Intelligence...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="rounded-lg border border-red-500 bg-red-50 p-6">
          <h2 className="text-lg font-semibold text-red-600">
            Failed to load CVEs
          </h2>

          <p className="mt-2 text-sm text-red-500">
            Please check your backend server or network connection.
          </p>
        </div>
      </div>
    );
  }

  const cves = data?.items ?? [];

  return (
    <div className="space-y-6 p-6">

      {/* Header */}

      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          CVE Intelligence
        </h1>

        <p className="text-muted-foreground mt-1">
          Search, filter and analyze the latest vulnerabilities from the
          National Vulnerability Database (NVD).
        </p>
      </div>

      {/* Filters */}

      <CVEFilters
        limit={limit}
        severity={severity}
        keyword={keyword}
        onLimitChange={setLimit}
        onSeverityChange={setSeverity}
        onKeywordChange={setKeyword}
      />

      {/* Analytics */}

      <CVEStats cves={cves} />

      {/* Table */}

      <CVETable cves={cves} />

      {/* Footer */}

      <div className="flex justify-between items-center text-sm text-muted-foreground border-t pt-4">

        <span>
          Showing <strong>{data?.count ?? 0}</strong> of{" "}
          <strong>{data?.total ?? 0}</strong> CVEs
        </span>

        <span>
          Powered by NVD • EPSS • CISA KEV
        </span>

      </div>

    </div>
  );
}