
"use client";

import { Bot } from "lucide-react";

export default function AIThreatSummary() {
  return (
    <div className="rounded-xl border border-cyan-500/20 bg-slate-900 p-6 shadow-lg shadow-cyan-500/10">
      <div className="mb-4 flex items-center gap-3">
        <Bot className="h-6 w-6 text-cyan-400" />

        <h2 className="text-xl font-semibold">
          AI Threat Analyst
        </h2>
      </div>

      <div className="space-y-3 text-sm">

        <p className="text-slate-300">
          Latest Intelligence
        </p>

        <p className="rounded-lg bg-slate-800 p-4 leading-7 text-slate-400">
          AI detected malicious behavior based on
          correlated intelligence from VirusTotal
          and AbuseIPDB.
        </p>

        <div className="flex items-center justify-between">

          <span>Confidence</span>

          <span className="font-bold text-cyan-400">
            92%
          </span>

        </div>

        <div className="h-2 rounded-full bg-slate-700">

          <div className="h-full w-[92%] rounded-full bg-cyan-500" />

        </div>

      </div>
    </div>
  );
}