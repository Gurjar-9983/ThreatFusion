
import { useQuery } from "@tanstack/react-query";

import { getThreatMap } from "@/lib/services/map";

export function useThreatMap() {
  return useQuery({
    queryKey: ["threat-map"],
    queryFn: getThreatMap,
    refetchInterval: 30000,
  });
}