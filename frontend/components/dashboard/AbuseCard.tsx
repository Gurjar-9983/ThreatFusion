
"use client";

import { Globe } from "lucide-react";

export default function AbuseCard() {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">

      <div className="flex items-center gap-3">

        <Globe className="h-5 w-5 text-cyan-400" />

        <h3 className="font-semibold">
          AbuseIPDB
        </h3>

      </div>

      <div className="mt-4 space-y-2 text-sm">

        <div className="flex justify-between">
          <span>Confidence</span>
          <span>0%</span>
        </div>

        <div className="flex justify-between">
          <span>Reports</span>
          <span>0</span>
        </div>

        <div className="flex justify-between">
          <span>Usage</span>
          <span>Public DNS</span>
        </div>

      </div>

    </div>
  );
}