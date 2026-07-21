
import {
  ShieldAlert,
  Search,
  Bug,
  Activity,
} from "lucide-react";

import StatCard from "@/components/dashboard/StatCard";
import AIInsights from "@/components/dashboard/AIInsights";
import ThreatFeed from "@/components/dashboard/ThreatFeed";

export default function DashboardPage() {
  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-3xl font-bold text-white">
          Dashboard
        </h1>

        <p className="text-slate-400">
          Welcome back, Analyst.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <StatCard
          title="Threat Score"
          value="87"
          description="High Risk"
          icon={ShieldAlert}
        />

        <StatCard
          title="IOC Searches"
          value="1,248"
          description="Today"
          icon={Search}
        />

        <StatCard
          title="Critical CVEs"
          value="36"
          description="Need Attention"
          icon={Bug}
        />

        <StatCard
          title="Active Threats"
          value="142"
          description="Live Feeds"
          icon={Activity}
        />
        <div className="grid gap-6 lg:grid-cols-2">
  <AIInsights />
  <ThreatFeed />
</div>

      </div>

    </div>
  );
}