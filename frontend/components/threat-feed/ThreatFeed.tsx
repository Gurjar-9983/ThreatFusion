
"use client";

import { IOC } from "@/lib/types/ioc";
import ThreatFeedItem from "./ThreatFeedItem";
import LiveStatus from "./LiveStatus";
import { useThreatFeed } from "@/lib/hooks/useThreatFeed";

interface Props {
  iocs: IOC[];
}

export default function ThreatFeed({ iocs }: Props) {
  const events = useThreatFeed(iocs);

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold">
          Threat Feed
        </h2>

        <LiveStatus />
      </div>

      <div className="space-y-4">
        {events.length ? (
          events.map((event) => (
            <ThreatFeedItem
              key={event.id}
              event={event}
            />
          ))
        ) : (
          <p className="text-slate-400">
            No threat events.
          </p>
        )}
      </div>
    </div>
  );
}