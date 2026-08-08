
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
      <div className="flex h-[60vh] items-center justify-center">
        <p className="text-lg text-muted-foreground">
          Loading CVE Intelligence...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
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
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          CVE Intelligence
        </h1>

        <p className="mt-1 text-muted-foreground">
          Search, filter and analyze the latest vulnerabilities from the
          National Vulnerability Database (NVD).
        </p>
      </div>

      <CVEFilters
        limit={limit}
        severity={severity}
        keyword={keyword}
        onLimitChange={setLimit}
        onSeverityChange={setSeverity}
        onKeywordChange={setKeyword}
      />

      <CVEStats cves={cves} />

      <CVETable cves={cves} />

      <div className="flex items-center justify-between border-t pt-4 text-sm text-muted-foreground">
        <span>
          Showing <strong>{data?.count ?? 0}</strong> of{" "}
          <strong>{data?.total ?? 0}</strong> CVEs
        </span>

        <span>Powered by NVD • EPSS • CISA KEV</span>
      </div>
    </div>
  );
}