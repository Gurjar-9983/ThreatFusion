
"use client";

import { X } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { IOC } from "@/lib/types/ioc";
import { useIOCReport } from "@/lib/hooks/useIOCReport";

import ThreatScoreCard from "./ThreatScoreCard";
import VirusTotalCard from "./VirusTotalCard";
import AbuseIPDBCard from "./AbuseIPDBCard";
import DownloadReportButton from "./DownloadReportButton";
import MitreCard from "./MitreCard";
import CVECard from "./CVECard";
import AIAnalystCard from "./AIAnalystCard";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  ioc: IOC | null;
}

export default function IOCIntelligenceModal({
  open,
  onOpenChange,
  ioc,
}: Props) {
  const { data, isLoading } = useIOCReport(ioc?.id);

  const report = data?.threat_report;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="
          w-[96vw]
          max-w-6xl
          h-[92vh]
          overflow-y-auto
          border-slate-800
          bg-slate-950
          text-white
        "
      >
        {/* Close Button */}
        <button
          onClick={() => onOpenChange(false)}
          className="absolute right-4 top-4 rounded-md p-2 hover:bg-slate-800"
        >
          <X className="h-5 w-5" />
        </button>

        <DialogHeader className="sticky top-0 z-10 border-b border-slate-800 bg-slate-950 pb-4">
          <DialogTitle className="text-2xl">
            Threat Intelligence Report
          </DialogTitle>
        </DialogHeader>

        {!ioc ? null : isLoading ? (
          <div className="py-12 text-center text-slate-400">
            Loading intelligence...
          </div>
        ) : (
          <div className="space-y-8 pb-8">
            
            {/* IOC Information */}
            <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
              <h3 className="mb-5 text-xl font-semibold">
                Indicator Information
              </h3>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <div>
                  <p className="text-sm text-slate-400">Indicator</p>
                  <p className="font-semibold">{ioc.value}</p>
                </div>

                <div>
                  <p className="text-sm text-slate-400">Type</p>
                  <p>{ioc.type}</p>
                </div>

                <div>
                  <p className="text-sm text-slate-400">Severity</p>
                  <p>{ioc.severity}</p>
                </div>

                <div>
                  <p className="text-sm text-slate-400">Source</p>
                  <p>{ioc.source}</p>
                </div>
              </div>
            </div>

            {/* Threat Score */}
            <ThreatScoreCard
              score={report?.threat_score ?? 0}
              level={report?.threat_level ?? "Unknown"}
            />

            <AIAnalystCard
              analysis={report?.ai_analysis}
            />

            {/* Provider Cards */}
            <div className="grid gap-6 lg:grid-cols-2">
              <VirusTotalCard
                data={report?.providers?.virustotal}
              />

              <AbuseIPDBCard
                data={report?.providers?.abuseipdb}
              />
            </div>

            {/* MITRE + CVEs */}
            <div className="grid gap-6 lg:grid-cols-2">
              <MitreCard
                techniques={report?.mitre ?? []}
              />

              <CVECard
                cves={report?.related_cves ?? []}
              />
            </div>

            {/* Analyst Summary */}
            <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
              <h3 className="mb-4 text-xl font-semibold">
                Analyst Summary
              </h3>

              <ul className="list-disc space-y-2 pl-6">
                {(report?.summary ?? []).length ? (
                  report?.summary?.map((item: string, index: number) => (
                    <li key={index}>{item}</li>
                  ))
                ) : (
                  <li>No summary available.</li>
                )}
              </ul>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between border-t border-slate-800 pt-6">
              <button
                onClick={() => onOpenChange(false)}
                className="rounded-lg bg-slate-700 px-6 py-2 transition hover:bg-slate-600"
              >
                Close
              </button>

              <DownloadReportButton id={ioc.id} />
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}