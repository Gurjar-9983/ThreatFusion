
"use client";

import {
  Shield,
  Database,
  AlertTriangle,
  Globe,
} from "lucide-react";

import StatCard from "./StatCard";
import { useIOCs } from "@/lib/hooks/useIOCs";

export default function StatsCards() {
  const { data, isLoading } = useIOCs();

  if (isLoading) {
    return <p className="text-slate-400">Loading dashboard...</p>;
  }

  const iocs = data?.items ?? [];

  const total = iocs.length;

  const highSeverity = iocs.filter(
    (ioc) => ioc.severity.toLowerCase() === "high"
  ).length;

  const sources = new Set(iocs.map((ioc) => ioc.source)).size;

  const threatScore = Math.min(100, total * 10 + highSeverity * 15);

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      <StatCard
        title="Threat Score"
        value={threatScore.toString()}
        description="Calculated from IOC severity"
        icon={Shield}
      />

      <StatCard
        title="Total IOCs"
        value={total.toString()}
        description="Indicators in database"
        icon={Database}
      />

      <StatCard
        title="High Severity"
        value={highSeverity.toString()}
        description="Critical indicators"
        icon={AlertTriangle}
      />

      <StatCard
        title="IOC Sources"
        value={sources.toString()}
        description="Unique intelligence sources"
        icon={Globe}
      />
    </div>
  );
}