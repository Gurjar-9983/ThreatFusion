
import { IOC } from "@/lib/types/ioc";

export interface ThreatFeedEvent {
  id: string;
  type: "created" | "updated" | "high";
  title: string;
  timestamp: string;
  ioc: IOC;
}

export function useThreatFeed(iocs: IOC[]): ThreatFeedEvent[] {
  return [...iocs]
    .sort(
      (a, b) =>
        new Date(b.updated_at).getTime() -
        new Date(a.updated_at).getTime()
    )
    .slice(0, 10)
    .map((ioc) => {
      let type: ThreatFeedEvent["type"] = "created";
      let title = "IOC Created";

      if (ioc.severity.toLowerCase() === "high") {
        type = "high";
        title = "High Severity IOC Detected";
      } else if (ioc.updated_at !== ioc.created_at) {
        type = "updated";
        title = "IOC Updated";
      }

      return {
        id: ioc.id,
        type,
        title,
        timestamp: ioc.updated_at,
        ioc,
      };
    });
}