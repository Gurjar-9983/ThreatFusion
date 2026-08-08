
import { useQuery } from "@tanstack/react-query";
import { getDashboard } from "@/lib/services/dashboard";

export function useDashboard() {
  return useQuery({
    queryKey: ["dashboard"],
    queryFn: getDashboard,
  });
}