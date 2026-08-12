
import { api } from "@/lib/api";

import {
  IOCResponse,
  CreateIOCRequest,
  IOCEnrichmentResponse,
  UpdateIOCRequest,
} from "@/lib/types/ioc";

export async function getIOCs(
  search = ""
): Promise<IOCResponse> {
  const response = await api.get<IOCResponse>("/iocs", {
    params: {
      search,
    },
  });

  return response.data;
}

export async function createIOC(
  data: CreateIOCRequest
) {
  const response = await api.post("/iocs", data);

  return response.data;
}

export async function getIOCEnrichment(
  id: string
): Promise<IOCEnrichmentResponse> {
  const response = await api.get<IOCEnrichmentResponse>(
     `/iocs/${id}/enrich`
  );

  return response.data;
}

export async function updateIOC(
  id: string,
  data: UpdateIOCRequest
) {
  const response = await api.put(
    `/iocs/${id}`,
    data
  );

  return response.data;
}

export async function deleteIOC(id: string) {
  const response = await api.delete(
    `/iocs/${id}`
  );

  return response.data;
}