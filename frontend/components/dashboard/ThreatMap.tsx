
"use client";

import dynamic from "next/dynamic";

const ThreatMapClient = dynamic(
  () => import("./ThreatMapClient"),
  {
    ssr: false,
    loading: () => (
      <div className="rounded-xl border border-slate-800 bg-slate-900 p-12 text-center text-slate-400">
        Loading Threat Map...
      </div>
    ),
  }
);

export default function ThreatMap() {
  return <ThreatMapClient />;
}