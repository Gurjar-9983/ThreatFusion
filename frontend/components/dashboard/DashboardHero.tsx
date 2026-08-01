
"use client";

import { ShieldCheck, Activity, Globe, Clock } from "lucide-react";

export default function DashboardHero() {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-r from-slate-900 via-slate-900 to-cyan-950 p-8">

      <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="relative z-10">

        <div className="flex items-center gap-4">

          <div className="rounded-xl bg-cyan-500/15 p-4">
            <ShieldCheck className="h-10 w-10 text-cyan-400" />
          </div>

          <div>
            <h1 className="text-4xl font-bold text-white">
              ThreatFusion
            </h1>

            <p className="mt-1 text-slate-400">
              Cyber Threat Intelligence Platform
            </p>

            <p className="mt-3 text-cyan-300">
              Analyze • Correlate • Detect • Respond
            </p>
          </div>

        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-4">

          <StatusCard
            icon={<Activity className="h-5 w-5" />}
            title="System"
            value="Healthy"
            color="text-green-400"
          />

          <StatusCard
            icon={<Globe className="h-5 w-5" />}
            title="Threat Feeds"
            value="Online"
            color="text-cyan-400"
          />

          <StatusCard
            icon={<ShieldCheck className="h-5 w-5" />}
            title="Intelligence"
            value="Connected"
            color="text-blue-400"
          />

          <StatusCard
            icon={<Clock className="h-5 w-5" />}
            title="Last Sync"
            value="Just Now"
            color="text-yellow-400"
          />

        </div>

      </div>

    </section>
  );
}

function StatusCard({
  icon,
  title,
  value,
  color,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  color: string;
}) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-5">

      <div className="flex items-center gap-3">

        <div className="rounded-lg bg-slate-800 p-2">
          {icon}
        </div>

        <div>

          <p className="text-xs uppercase tracking-wide text-slate-500">
            {title}
          </p>

          <p className={`font-semibold ${color}`}>
            {value}
          </p>

        </div>

      </div>

    </div>
  );
}