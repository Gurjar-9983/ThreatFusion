
"use client";

import AuthGuard from "@/components/auth/AuthGuard";

import IOCTable from "@/components/ioc/IOCTable";
import IOCStats from "@/components/ioc/IOCStats";
import CreateIOCModal from "@/components/ioc/CreateIOCModal";

import { useIOCs } from "@/lib/hooks/useIOCs";

export default function IOCPage() {

  const { data } = useIOCs();

  const iocs = data?.items ?? [];

  return (
    <AuthGuard>

      <main className="min-h-screen bg-slate-950 p-8 text-white">

        <div className="mb-8 flex items-center justify-between">

          <div>

            <h1 className="text-4xl font-bold">
              IOC Management
            </h1>

            <p className="mt-2 text-slate-400">
              Search, enrich and manage Indicators of Compromise.
            </p>

          </div>

          <CreateIOCModal />

        </div>

        <IOCStats
          iocs={iocs}
        />

        <section className="mt-10">

          <IOCTable />

        </section>

      </main>

    </AuthGuard>
  );
}