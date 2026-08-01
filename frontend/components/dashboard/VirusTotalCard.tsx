
"use client";

import { ShieldCheck } from "lucide-react";

export default function VirusTotalCard() {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">

      <div className="flex items-center gap-3">

        <ShieldCheck className="h-5 w-5 text-green-400" />

        <h3 className="font-semibold">
          VirusTotal
        </h3>

      </div>

      <div className="mt-4 space-y-2 text-sm">

        <div className="flex justify-between">
          <span>Status</span>
          <span className="text-green-400">
            Clean
          </span>
        </div>

        <div className="flex justify-between">
          <span>Detection</span>
          <span>0 / 97</span>
        </div>

        <div className="flex justify-between">
          <span>Community</span>
          <span>Harmless</span>
        </div>

      </div>

    </div>
  );
}