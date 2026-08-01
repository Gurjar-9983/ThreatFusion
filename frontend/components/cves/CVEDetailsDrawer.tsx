
"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { Badge } from "@/components/ui/badge";

import { CVE } from "@/lib/types/cve";

interface Props {
  cve: CVE | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CVEDetailsDrawer({
  cve,
  open,
  onOpenChange,
}: Props) {
  if (!cve) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[700px] sm:max-w-[700px] overflow-y-auto">

        <SheetHeader>
          <SheetTitle>{cve.id}</SheetTitle>
        </SheetHeader>

        <div className="space-y-6 mt-6">

          <Badge>{cve.severity}</Badge>

          <div>
            <h3 className="font-semibold mb-2">
              Description
            </h3>

            <p className="text-sm text-muted-foreground">
              {cve.description}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">

            <div>
              <p className="text-sm text-muted-foreground">
                CVSS
              </p>

              <p className="font-semibold">
                {cve.cvss}
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                EPSS
              </p>

              <p>{cve.epss}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                KEV
              </p>

              <p>{cve.kev ? "Yes" : "No"}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Published
              </p>

              <p>{new Date(cve.published).toLocaleString()}</p>
            </div>

          </div>

          <a
            href={`https://nvd.nist.gov/vuln/detail/${cve.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            View on NVD →
          </a>

        </div>

      </SheetContent>
    </Sheet>
  );
}