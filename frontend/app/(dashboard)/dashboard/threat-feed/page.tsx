
"use client";

import AuthGuard from "@/components/auth/AuthGuard";
import ThreatFeed from "@/components/threat-feed/ThreatFeed";
import { useIOCs } from "@/lib/hooks/useIOCs";

export default function ThreatFeedPage() {

  const { data } = useIOCs();

  return (
    <AuthGuard>
      <main className="min-h-screen bg-slate-950 p-8 text-white">

        <h1 className="mb-6 text-3xl font-bold">
          Live Threat Feed
        </h1>

        <ThreatFeed
          iocs={data?.items ?? []}
        />

      </main>
    </AuthGuard>
  );
}