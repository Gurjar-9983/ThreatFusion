
import {
  AlertTriangle,
  ShieldCheck,
  Activity,
  Search,
} from "lucide-react";

export default function DashboardPreview() {
  return (
    <div className="w-full max-w-xl rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl">

      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-xl font-semibold text-white">
          ThreatFusion Dashboard
        </h3>

        <span className="rounded-full bg-green-500/20 px-3 py-1 text-xs text-green-400">
          Live
        </span>
      </div>

      {/* Statistics */}

      <div className="grid grid-cols-3 gap-4">

        <div className="rounded-xl bg-slate-800 p-4">
          <AlertTriangle className="mb-3 text-red-500" />

          <p className="text-sm text-slate-400">
            Threat Score
          </p>

          <h2 className="text-3xl font-bold text-red-500">
            92
          </h2>
        </div>

        <div className="rounded-xl bg-slate-800 p-4">
          <ShieldCheck className="mb-3 text-green-500" />

          <p className="text-sm text-slate-400">
            Active Threats
          </p>

          <h2 className="text-3xl font-bold text-white">
            18
          </h2>
        </div>

        <div className="rounded-xl bg-slate-800 p-4">
          <Search className="mb-3 text-blue-500" />

          <p className="text-sm text-slate-400">
            IOC Searches
          </p>

          <h2 className="text-3xl font-bold text-white">
            1247
          </h2>
        </div>

      </div>

      {/* Threat Feed */}

      <div className="mt-8 rounded-xl bg-slate-800 p-5">

        <div className="mb-4 flex items-center gap-2">

          <Activity className="text-blue-500" />

          <h4 className="font-semibold text-white">
            Recent Threats
          </h4>

        </div>

        <div className="space-y-3">

          <div className="flex items-center justify-between rounded-lg bg-slate-900 p-3">
            <span className="text-white">
              Emotet Malware
            </span>

            <span className="rounded bg-red-500/20 px-2 py-1 text-xs text-red-400">
              Critical
            </span>
          </div>

          <div className="flex items-center justify-between rounded-lg bg-slate-900 p-3">
            <span className="text-white">
              Phishing Domain
            </span>

            <span className="rounded bg-yellow-500/20 px-2 py-1 text-xs text-yellow-400">
              Medium
            </span>
          </div>

          <div className="flex items-center justify-between rounded-lg bg-slate-900 p-3">
            <span className="text-white">
              Malicious IP
            </span>

            <span className="rounded bg-orange-500/20 px-2 py-1 text-xs text-orange-400">
              High
            </span>
          </div>

        </div>

      </div>

    </div>
  );
}