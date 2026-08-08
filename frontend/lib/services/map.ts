
import { api } from "@/lib/api";

export interface ThreatLocation {
  country: string;
  lat: number;
  lng: number;
  count: number;
}

export async function getThreatMap() {
  const { data } = await api.get<ThreatLocation[]>("/dashboard/map");
  return data;
}