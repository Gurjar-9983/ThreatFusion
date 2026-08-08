
import { useQuery } from "@tanstack/react-query";

import { getReports } from "@/lib/services/report";

export function useReports() {
  return useQuery({
    queryKey: ["reports"],
    queryFn: getReports,
  });
}