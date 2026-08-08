
import { useQuery } from "@tanstack/react-query";

import { getGraph } from "@/lib/services/graph";

export function useGraph() {
  return useQuery({
    queryKey: ["graph"],
    queryFn: getGraph,
  });
}