
"use client";

import { useQuery } from "@tanstack/react-query";
import { getNotifications } from "../services/notifications";

export function useNotifications() {
  return useQuery({
    queryKey: ["notifications"],
    queryFn: getNotifications,
    refetchInterval: 10000,
  });
}