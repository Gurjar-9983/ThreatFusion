import { useQuery } from "@tanstack/react-query";

import {
  getCVEs,
  type CVEQuery,
} from "@/lib/services/cve";

export function useCVEs(params: CVEQuery = {}) {
  return useQuery({
    queryKey: ["cves", params],
    queryFn: () => getCVEs(params),
  });
}
