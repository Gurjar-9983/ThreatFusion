
"use client";

export default function RecommendationCard() {
  return (
    <div className="rounded-xl border border-cyan-800 bg-cyan-950/20 p-5">

      <h3 className="font-semibold text-cyan-400">
        Analyst Recommendation
      </h3>

      <p className="mt-4 text-sm text-slate-300">
        No malicious activity detected.

        Continue monitoring this IOC.

        Blocking is not recommended at this time.
      </p>

    </div>
  );
}