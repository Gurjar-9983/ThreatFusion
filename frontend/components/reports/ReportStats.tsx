
"use client";

import {
  FileText,
  FileCheck,
  Calendar,
  CalendarDays,
} from "lucide-react";

interface Props {
  stats: {
    total_reports: number;
    pdf_reports: number;
    generated_today: number;
    generated_this_month: number;
  };
}

const cards = [
  {
    key: "total_reports",
    title: "Total Reports",
    icon: FileText,
    color: "text-cyan-400",
  },
  {
    key: "pdf_reports",
    title: "PDF Reports",
    icon: FileCheck,
    color: "text-green-400",
  },
  {
    key: "generated_today",
    title: "Generated Today",
    icon: Calendar,
    color: "text-yellow-400",
  },
  {
    key: "generated_this_month",
    title: "This Month",
    icon: CalendarDays,
    color: "text-purple-400",
  },
];

export default function ReportStats({ stats }: Props) {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.key}
            className="rounded-xl border border-slate-800 bg-slate-900 p-6 transition hover:border-cyan-500"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">
                  {card.title}
                </p>

                <h2 className="mt-2 text-3xl font-bold text-white">
                  {stats[
                    card.key as keyof typeof stats
                  ]}
                </h2>
              </div>

              <div className="rounded-lg bg-slate-800 p-3">
                <Icon
                  className={`h-7 w-7 ${card.color}`}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}