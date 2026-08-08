
import { useQuery } from "@tanstack/react-query";

import { getReportStats } from "@/lib/services/report";

export function useReportStats() {
  return useQuery({
    queryKey: ["report-stats"],
    queryFn: getReportStats,
  });
}