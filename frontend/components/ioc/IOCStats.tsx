
"use client";

import { Database, AlertTriangle, ShieldAlert, ShieldCheck } from "lucide-react";
import { IOC } from "@/lib/types/ioc";

interface Props {
  iocs: IOC[];
}

export default function IOCStats({
  iocs,
}: Props) {
  const total = iocs.length;

  const high = iocs.filter(
    (i) => i.severity.toLowerCase() === "high"
  ).length;

  const medium = iocs.filter(
    (i) => i.severity.toLowerCase() === "medium"
  ).length;

  const low = iocs.filter(
    (i) => i.severity.toLowerCase() === "low"
  ).length;

  const cards = [
    {
      title: "Total IOCs",
      value: total,
      icon: Database,
    },
    {
      title: "High",
      value: high,
      icon: AlertTriangle,
    },
    {
      title: "Medium",
      value: medium,
      icon: ShieldAlert,
    },
    {
      title: "Low",
      value: low,
      icon: ShieldCheck,
    },
  ];

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="rounded-xl border border-slate-800 bg-slate-900 p-5"
          >
            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-slate-400">
                  {card.title}
                </p>

                <h2 className="mt-2 text-3xl font-bold">
                  {card.value}
                </h2>

              </div>

              <Icon className="h-8 w-8 text-cyan-400" />

            </div>
          </div>
        );
      })}
    </div>
  );
}