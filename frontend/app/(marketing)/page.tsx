"use client";

import { useHealth } from "@/lib/hooks/useHealth";

export default function HomePage() {
  const { data, isLoading, error } = useHealth();

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
      <div className="rounded-xl border border-slate-700 bg-slate-900 p-8 shadow-lg">
        <h1 className="text-4xl font-bold text-cyan-400">
          ThreatFusion
        </h1>

        <p className="mt-4 text-slate-300">
          Frontend successfully connected.
        </p>

        <div className="mt-6">
          {isLoading && (
            <p className="text-yellow-400">
              Checking backend...
            </p>
          )}

          {error && (
            <p className="text-red-400">
              Backend is unreachable.
            </p>
          )}

          {data && (
            <div className="rounded-lg bg-green-900/30 p-4">
              <p className="text-green-400 font-semibold">
                Backend Connected ✅
              </p>

              <pre className="mt-2 text-sm">
                {JSON.stringify(data, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
