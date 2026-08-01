
"use client";

import Link from "next/link";

import { CVE } from "@/lib/types/cve";
import CVESeverityBadge from "./CVESeverityBadge";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Props {
  cves: CVE[];
}

export default function CVETable({ cves }: Props) {
  if (!cves.length) {
    return (
      <div className="rounded-lg border p-8 text-center text-muted-foreground">
        No CVEs found.
      </div>
    );
  }

  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>CVE ID</TableHead>
            <TableHead>Severity</TableHead>
            <TableHead>CVSS</TableHead>
            <TableHead>EPSS</TableHead>
            <TableHead>KEV</TableHead>
            <TableHead>Published</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="text-right">NVD</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {cves.map((cve) => (
            <TableRow key={cve.id}>
              <TableCell className="font-medium">
                {cve.id}
              </TableCell>

              <TableCell>
                <CVESeverityBadge severity={cve.severity} />
              </TableCell>

              <TableCell>{cve.cvss}</TableCell>

              <TableCell>{cve.epss}</TableCell>

              <TableCell>
                {cve.kev ? "✅" : "—"}
              </TableCell>

              <TableCell>
                {new Date(cve.published).toLocaleDateString()}
              </TableCell>

              <TableCell className="max-w-xl truncate">
                {cve.description}
              </TableCell>

              <TableCell className="text-right">
                <Link
                  href={`https://nvd.nist.gov/vuln/detail/${cve.id}`}
                  target="_blank"
                  className="text-blue-600 hover:underline"
                >
                  View
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}