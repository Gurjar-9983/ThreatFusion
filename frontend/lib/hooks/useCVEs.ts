
import { useQuery } from "@tanstack/react-query";
import { getCVEs } from "@/lib/services/cve";

export function useCVEs() {
  return useQuery({
    queryKey: ["cves"],
    queryFn: getCVEs,
  });
}