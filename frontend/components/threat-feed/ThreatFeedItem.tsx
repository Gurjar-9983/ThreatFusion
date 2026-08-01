
"use client";

import { ThreatFeedEvent } from "@/lib/hooks/useThreatFeed";
import EventBadge from "./EventBadge";

interface Props {
  event: ThreatFeedEvent;
}

export default function ThreatFeedItem({
  event,
}: Props) {
  return (
    <div className="flex items-start justify-between border-b border-slate-800 pb-4">
      <div className="space-y-1">
        <p className="font-medium text-sm">
          {event.title}
        </p>

        <p className="font-mono text-xs text-slate-400 break-all">
          {event.ioc.value}
        </p>

        <p className="text-xs text-slate-500">
          {new Date(event.timestamp).toLocaleString()}
        </p>
      </div>

      <EventBadge type={event.type} />
    </div>
  );
}