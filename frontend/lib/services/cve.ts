import { api } from "@/lib/api";

export interface CVE {
  id: string;
  description: string;
  cvss: number;
  severity: string;
  epss: number;
  epss_percentile?: number;
  kev: boolean;
  published: string;
  modified: string;
  mitre?: unknown;
}

export interface CVEQuery {
  limit?: number;
  start_index?: number;
  severity?: string;
  keyword?: string;
}

export interface CVEResponse {
  items: CVE[];
  total: number;
  count: number;
  limit: number;
  start_index: number;
}

export async function getCVEs(
  params: CVEQuery = {}
): Promise<CVEResponse> {
  const { data } = await api.get<CVEResponse>("/cves/", {
    params: {
      limit: params.limit ?? 20,
      start_index: params.start_index ?? 0,
      ...(params.severity ? { severity: params.severity } : {}),
      ...(params.keyword ? { keyword: params.keyword } : {}),
    },
  });

  return data;
}
