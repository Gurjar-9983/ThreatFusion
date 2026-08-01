
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  getIOCs,
  getIOCEnrichment,
  updateIOC,
  deleteIOC,
} from "@/lib/services/ioc";

export function useIOCs(search = "") {
  return useQuery({
    queryKey: ["iocs", search],
    queryFn: () => getIOCs(search),
  });
}

export function useIOCEnrichment(
  id: string | null,
  enabled = true
) {
  return useQuery({
    queryKey: ["ioc-enrichment", id],
    queryFn: () => getIOCEnrichment(id!),
    enabled: enabled && !!id,
    staleTime: 1000 * 60 * 5,
  });
}

export function useUpdateIOC() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: {
        severity: string;
        source: string;
        description: string;
      };
    }) => updateIOC(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["iocs"],
      });
    },
  });
}

export function useDeleteIOC() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteIOC(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["iocs"],
      });
    },
  });
}