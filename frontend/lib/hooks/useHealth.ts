
"use client";

import { useQuery } from "@tanstack/react-query";
import { getHealth } from "@/lib/services/health";

export function useHealth() {
  return useQuery({
    queryKey: ["health"],
    queryFn: getHealth,
  });
}