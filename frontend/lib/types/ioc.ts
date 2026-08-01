
export type IOCType = "ip" | "domain" | "url" | "hash";

export interface IOC {
  id: string;
  type: IOCType;
  value: string;
  severity: string;
  source: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface IOCResponse {
  items: IOC[];
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export interface CreateIOCRequest {
  type: IOCType;
  value: string;
  severity: string;
  source: string;
  description: string;
}

/* ---------- Threat Intelligence ---------- */

export interface VirusTotalReport {
  ioc: string;
  type: string;
  reputation: number;
  malicious: number;
  suspicious: number;
  harmless: number;
  undetected: number;
  last_analysis_date: number;
}

export interface AbuseIPDBReport {
  ioc: string;
  type: string;
  abuse_confidence_score: number;
  country: string;
  isp: string;
  usage_type: string;
  domain: string;
  is_public: boolean;
  is_whitelisted: boolean;
  total_reports: number;
  last_reported_at: string;
}

export interface IOCEnrichmentResponse {
  ioc: IOC;
  threat_report: {
    ioc: string;
    providers: {
      virustotal: VirusTotalReport;
      abuseipdb: AbuseIPDBReport;
    };
  };
}
export interface UpdateIOCRequest {
  severity: string;
  source: string;
  description: string;
}