
"use client";

import {
  CheckCircle2,
  Shield,
  Search,
  FileText,
} from "lucide-react";

const events = [
  {
    title: "IOC Created",
    time: "10 minutes ago",
    icon: CheckCircle2,
  },
  {
    title: "VirusTotal Scan",
    time: "8 minutes ago",
    icon: Shield,
  },
  {
    title: "AbuseIPDB Lookup",
    time: "7 minutes ago",
    icon: Search,
  },
  {
    title: "Report Generated",
    time: "2 minutes ago",
    icon: FileText,
  },
];

export default function Timeline() {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">

      <h3 className="mb-6 font-semibold">
        IOC Timeline
      </h3>

      <div className="space-y-6">

        {events.map((event, index) => {

          const Icon = event.icon;

          return (
            <div
              key={index}
              className="flex gap-4"
            >

              <div className="mt-1">
                <Icon
                  className="h-5 w-5 text-cyan-400"
                />
              </div>

              <div>

                <p className="font-medium">
                  {event.title}
                </p>

                <p className="text-sm text-slate-400">
                  {event.time}
                </p>

              </div>

            </div>
          );
        })}

      </div>

    </div>
  );
}