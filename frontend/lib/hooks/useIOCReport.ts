
"use client";

import { useQuery } from "@tanstack/react-query";
import { getIOCReport } from "@/lib/services/report";

export function useIOCReport(id?: string) {
  return useQuery({
    queryKey: ["ioc-report", id],
    queryFn: () => getIOCReport(id!),
    enabled: !!id,
  });
}