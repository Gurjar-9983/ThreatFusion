
import { IOC } from "@/lib/types/ioc";

interface DashboardAnalytics {
  severityData: {
    name: string;
    value: number;
  }[];

  typeData: {
    type: string;
    count: number;
  }[];

  topSources: {
    source: string;
    count: number;
  }[];

  recentActivity: IOC[];

  totalIOCs: number;

  highSeverityCount: number;

  threatScore: number;
}

export function useDashboardAnalytics(
  iocs: IOC[]
): DashboardAnalytics {
  const severity = {
    low: 0,
    medium: 0,
    high: 0,
  };

  const types: Record<string, number> = {};

  const sources: Record<string, number> = {};

  iocs.forEach((ioc) => {
    const sev = ioc.severity.toLowerCase();

    if (sev === "low") severity.low++;
    else if (sev === "medium") severity.medium++;
    else if (sev === "high") severity.high++;

    types[ioc.type] = (types[ioc.type] || 0) + 1;

    sources[ioc.source] =
      (sources[ioc.source] || 0) + 1;
  });

  const severityData = [
    {
      name: "Low",
      value: severity.low,
    },
    {
      name: "Medium",
      value: severity.medium,
    },
    {
      name: "High",
      value: severity.high,
    },
  ];

  const typeData = Object.entries(types).map(
    ([type, count]) => ({
      type,
      count,
    })
  );

  const topSources = Object.entries(sources)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([source, count]) => ({
      source,
      count,
    }));

  const recentActivity = [...iocs]
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() -
        new Date(a.created_at).getTime()
    )
    .slice(0, 5);

  const totalIOCs = iocs.length;

  const highSeverityCount = severity.high;

  // Simple threat score (0–100)
  const threatScore =
    totalIOCs === 0
      ? 0
      : Math.min(
          100,
          Math.round(
            ((severity.high * 3 +
              severity.medium * 2 +
              severity.low) /
              (totalIOCs * 3)) *
              100
          )
        );

  return {
    severityData,
    typeData,
    topSources,
    recentActivity,
    totalIOCs,
    highSeverityCount,
    threatScore,
  };
}