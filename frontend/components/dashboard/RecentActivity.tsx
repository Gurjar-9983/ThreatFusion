
"use client";

import { IOC } from "@/lib/types/ioc";
import SeverityBadge from "@/components/ioc/SeverityBadge";

interface Props {
  data: IOC[];
}

export default function RecentActivity({
  data,
}: Props) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="mb-5 text-lg font-semibold">
        Recent Activity
      </h2>

      <div className="space-y-4">
        {data.length ? (
          data.map((ioc) => (
            <div
              key={ioc.id}
              className="flex items-center justify-between border-b border-slate-800 pb-3"
            >
              <div>
                <p className="font-medium capitalize">
                  {ioc.type}
                </p>

                <p className="font-mono text-sm text-slate-400">
                  {ioc.value}
                </p>
              </div>

              <SeverityBadge severity={ioc.severity} />
            </div>
          ))
        ) : (
          <p className="text-slate-400">
            No recent activity.
          </p>
        )}
      </div>
    </div>
  );
}