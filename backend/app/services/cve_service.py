
from app.integrations.epss import EPSSClient
from app.integrations.nvd import NVDClient
from app.integrations.kev import KEVClient
from app.integrations.mitre_attack import MITREAttackClient
class CVEService:

    @staticmethod
    def get_recent_cves(
        limit: int = 20,
        start_index: int = 0,
        severity: str | None = None,
        keyword: str | None = None,
    ):
        response = NVDClient.get_recent_cves(
            limit=limit,
            start_index=start_index,
        )

        vulnerabilities = response.get("vulnerabilities", [])

        # Collect all CVE IDs
        cve_ids = [
            item.get("cve", {}).get("id")
            for item in vulnerabilities
            if item.get("cve", {}).get("id")
        ]

        # Fetch all EPSS scores in a single request
        epss_scores = EPSSClient.get_scores(cve_ids)
        kev_catalog = KEVClient.get_catalog()
        cves = []

        for item in vulnerabilities:
            cve = item.get("cve", {})

            descriptions = cve.get("descriptions", [])

            description = next(
                (
                    d.get("value")
                    for d in descriptions
                    if d.get("lang") == "en"
                ),
                "",
            )

            metrics = cve.get("metrics", {})

            cvss = 0.0
            severity_value = "UNKNOWN"
            
            attack = MITREAttackClient.get_attack(
    cve.get("id")
)

            if metrics.get("cvssMetricV31"):
                metric = metrics["cvssMetricV31"][0]
                cvss = metric["cvssData"]["baseScore"]
                severity_value = metric["cvssData"]["baseSeverity"]

            elif metrics.get("cvssMetricV30"):
                metric = metrics["cvssMetricV30"][0]
                cvss = metric["cvssData"]["baseScore"]
                severity_value = metric["cvssData"]["baseSeverity"]

            elif metrics.get("cvssMetricV2"):
                metric = metrics["cvssMetricV2"][0]
                cvss = metric["cvssData"]["baseScore"]
                severity_value = metric.get("baseSeverity", "UNKNOWN")

            # Filter by severity
            if severity and severity_value.upper() != severity.upper():
                continue

            # Filter by keyword
            if keyword:
                search = keyword.lower()
                if (
                    search not in description.lower()
                    and search not in cve.get("id", "").lower()
                ):
                    continue

            # Get EPSS score from cached batch results
            epss = epss_scores.get(
                cve.get("id"),
                {
                    "epss": 0.0,
                    "percentile": 0.0,
                },
            )

            cves.append(
                {
                    "id": cve.get("id"),
                    "description": description,
                    "severity": severity_value,
                    "cvss": cvss,
                    "epss": epss["epss"],
                    "epss_percentile": epss["percentile"],
                    "kev":  cve.get("id") in kev_catalog,  # Placeholder until KEV integration
                    "published": cve.get("published"),
                    "modified": cve.get("lastModified"),
                    "attack": attack,
                }
            )

        return {
            "items": cves,
            "total": response.get("totalResults", len(cves)),
            "count": len(cves),
            "limit": limit,
            "start_index": start_index,
        }