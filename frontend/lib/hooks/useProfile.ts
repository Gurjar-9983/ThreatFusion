
"use client";

import { useQuery } from "@tanstack/react-query";
import { getProfile } from "@/lib/services/profile";

export function useProfile() {
  return useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });
}