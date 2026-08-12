"use client";

import type { IOC } from "@/lib/types/ioc";

import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { useIOCs } from "@/lib/hooks/useIOCs";

import CreateIOCModal from "./CreateIOCModal";
import EditIOCModal from "./EditIOCModal";
import DeleteIOCDialog from "./DeleteIOCDialog";

import IOCTypeIcon from "./IOCTypeIcon";
import IOCBadge from "./IOCBadge";
import RiskBadge from "./RiskBadge";
import RelativeTime from "./RelativeTime";
import IOCDetailsDrawer from "./IOCDetailsDrawer";

export default function IOCTable() {
  const queryClient = useQueryClient();

  const [search, setSearch] = useState("");
  const [selectedIOC, setSelectedIOC] = useState<IOC | null>(null);

  const { data, isLoading } = useIOCs(search);

  const iocs = data?.items ?? [];

  function calculateRisk(severity: string) {
    switch (severity.toLowerCase()) {
      case "high":
        return 92;

      case "medium":
        return 68;

      case "low":
        return 28;

      default:
        return 10;
    }
  }

  function refreshIOCs() {
    queryClient.invalidateQueries({
      queryKey: ["iocs"],
    });

    setSelectedIOC(null);
  }

  if (isLoading) {
    return (
      <div className="rounded-xl border border-slate-800 bg-slate-900 p-8 text-center text-slate-400">
        Loading indicators...
      </div>
    );
  }

  return (
    <div className="space-y-4">

      {/* Toolbar */}

      <div className="flex items-center justify-between gap-4">

        <input
          type="text"
          placeholder="Search IP, Domain, URL, Hash..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-white outline-none focus:border-cyan-500"
        />

        <CreateIOCModal />

      </div>

      {/* Table */}

      <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900">

        <table className="w-full">

          <thead className="bg-slate-800">

            <tr className="text-left text-sm uppercase tracking-wide text-slate-400">

              <th className="px-4 py-3">
                Type
              </th>

              <th className="px-4 py-3">
                Indicator
              </th>

              <th className="px-4 py-3">
                Risk
              </th>

              <th className="px-4 py-3">
                Severity
              </th>

              <th className="px-4 py-3">
                Source
              </th>

              <th className="px-4 py-3">
                Updated
              </th>

              <th className="px-4 py-3 text-center">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {iocs.map((ioc) => (

              <tr
                key={ioc.id}
                onClick={() => setSelectedIOC(ioc)}
                className="cursor-pointer border-t border-slate-800 transition hover:bg-slate-800/50"
              >

                <td className="px-4 py-4">

                  <div className="flex items-center gap-2">

                    <IOCTypeIcon type={ioc.type} />

                    <span className="capitalize">
                      {ioc.type}
                    </span>

                  </div>

                </td>

                <td className="px-4 py-4 font-mono text-cyan-300">
                  {ioc.value}
                </td>

                <td className="px-4 py-4">

                  <RiskBadge
                    score={calculateRisk(ioc.severity)}
                  />

                </td>

                <td className="px-4 py-4">

                  <IOCBadge
                    severity={ioc.severity}
                  />

                </td>

                <td className="px-4 py-4">
                  {ioc.source}
                </td>

                <td className="px-4 py-4">

                  <RelativeTime
                    date={ioc.updated_at}
                  />

                </td>

                <td
                  className="px-4 py-4"
                  onClick={(e) => e.stopPropagation()}
                >

                  <div className="flex justify-center gap-2">

                    <EditIOCModal
                      ioc={ioc}
                    />

                    <DeleteIOCDialog
                      ioc={ioc}
                    />

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

        {iocs.length === 0 && (

          <div className="p-12 text-center">

            <div className="text-5xl">
              🛡️
            </div>

            <h3 className="mt-4 text-xl font-semibold">
              No Indicators Found
            </h3>

            <p className="mt-2 text-slate-400">
              Start by creating your first IOC.
            </p>

          </div>

        )}

      </div>

      {/* IOC Details Drawer */}

      <IOCDetailsDrawer
        open={selectedIOC !== null}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedIOC(null);
          }
        }}
        onDeleted={refreshIOCs}
        ioc={selectedIOC}
      />

    </div>
  );
}
