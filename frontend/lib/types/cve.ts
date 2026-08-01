
export interface CVE {
  id: string;
  description: string;

  cvss: number;

  severity: string;

  epss: number;

  kev: boolean;

  published: string;

  modified: string;
}