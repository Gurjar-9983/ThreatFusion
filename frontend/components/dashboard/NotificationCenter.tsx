
"use client";

import { Bell } from "lucide-react";
import { useNotifications } from "@/lib/hooks/useNotifications";

export default function NotificationCenter() {
  const { data } = useNotifications();

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">

      <div className="mb-6 flex items-center gap-2">

        <Bell className="h-5 w-5 text-cyan-400"/>

        <h2 className="text-xl font-semibold">
          Notifications
        </h2>

      </div>

      <div className="space-y-4">

        {data?.map((item: any, index: number) => (

          <div
            key={index}
            className="border-b border-slate-800 pb-3"
          >

            <p className="font-medium">
              {item.title}
            </p>

            <p className="text-sm text-slate-400">
              {item.message}
            </p>

            <p className="text-xs text-slate-500">
              {item.time}
            </p>

          </div>

        ))}

      </div>

    </div>
  );
}