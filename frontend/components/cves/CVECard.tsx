
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CVESeverityBadge from "./CVESeverityBadge";
import { CVE } from "@/lib/types/cve";

interface Props {
  cve: CVE;
}

export default function CVECard({ cve }: Props) {
  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{cve.id}</span>

          <CVESeverityBadge severity={cve.severity} />
        </CardTitle>
      </CardHeader>

      <CardContent>

        <p className="text-sm text-muted-foreground mb-4">
          {cve.description}
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

          <div>
            <p className="text-xs text-muted-foreground">
              CVSS
            </p>

            <p className="font-semibold">
              {cve.cvss}
            </p>
          </div>

          <div>
            <p className="text-xs text-muted-foreground">
              EPSS
            </p>

            <p>{cve.epss}</p>
          </div>

          <div>
            <p className="text-xs text-muted-foreground">
              KEV
            </p>

            <p>{cve.kev ? "Yes" : "No"}</p>
          </div>

          <div>
            <p className="text-xs text-muted-foreground">
              Published
            </p>

            <p>
              {new Date(cve.published).toLocaleDateString()}
            </p>
          </div>

        </div>

      </CardContent>
    </Card>
  );
}