
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CVE } from "@/lib/types/cve";

interface Props {
  cves: CVE[];
}

export default function CVEStats({ cves }: Props) {
  const critical = cves.filter(c => c.severity === "CRITICAL").length;
  const high = cves.filter(c => c.severity === "HIGH").length;
  const kev = cves.filter(c => c.kev).length;

  const avgCvss =
    cves.length > 0
      ? (
          cves.reduce((sum, c) => sum + Number(c.cvss || 0), 0) / cves.length
        ).toFixed(1)
      : "0.0";

  const avgEpss =
    cves.length > 0
      ? (
          cves.reduce((sum, c) => sum + Number(c.epss || 0), 0) / cves.length
        ).toFixed(3)
      : "0.000";

  const stats = [
    { title: "Total CVEs", value: cves.length },
    { title: "Critical", value: critical },
    { title: "High", value: high },
    { title: "Known Exploited", value: kev },
    { title: "Avg CVSS", value: avgCvss },
    { title: "Avg EPSS", value: avgEpss },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-6">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              {stat.title}
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="text-3xl font-bold">
              {stat.value}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}