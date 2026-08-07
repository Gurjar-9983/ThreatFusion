
class CorrelationEngine:
    """
    ThreatFusion Correlation Engine

    Combines intelligence from multiple providers
    into a single threat assessment.

    Current providers:
        - VirusTotal
        - AbuseIPDB

    Future:
        - MITRE ATT&CK
        - NVD
        - CISA KEV
        - EPSS
        - OpenCTI
        - MISP
    """

    @staticmethod
    def _calculate_score(vt: dict, abuse: dict) -> int:
        """
        Calculate a threat score from 0–100.
        """

        malicious = vt.get("malicious", 0)
        suspicious = vt.get("suspicious", 0)
        abuse_score = abuse.get("abuse_confidence_score", 0)

        score = (
            malicious * 3
            + suspicious * 2
            + abuse_score
        )

        return min(score, 100)

    @staticmethod
    def _threat_level(score: int) -> str:
        if score >= 75:
            return "Critical"

        if score >= 50:
            return "High"

        if score >= 25:
            return "Medium"

        return "Low"

    @staticmethod
    def _summary(vt: dict, abuse: dict) -> list[str]:
        summary = []

        if vt.get("malicious", 0):
            summary.append(
                f"VirusTotal detected "
                f"{vt['malicious']} malicious engines."
            )

        if vt.get("suspicious", 0):
            summary.append(
                f"VirusTotal reported "
                f"{vt['suspicious']} suspicious detections."
            )

        if abuse.get("abuse_confidence_score", 0):
            summary.append(
                f"AbuseIPDB confidence score is "
                f"{abuse['abuse_confidence_score']}%."
            )

        if abuse.get("country"):
            summary.append(
                f"Observed from {abuse['country']}."
            )

        return summary

    @staticmethod
    def correlate(enrichment: dict):

        providers = enrichment.get("providers", {})

        vt = providers.get("virustotal", {})
        abuse = providers.get("abuseipdb", {})

        score = CorrelationEngine._calculate_score(
            vt,
            abuse,
        )

        return {
            "indicator": enrichment.get("ioc"),
            "indicator_type": vt.get("type", "ip"),

            "threat_score": score,
            "threat_level": CorrelationEngine._threat_level(
                score
            ),

            "summary": CorrelationEngine._summary(
                vt,
                abuse,
            ),

            "providers": providers,

            "malware": [],

            "threat_actors": [],

            "related_cves": [],

            "mitre": [],
        }