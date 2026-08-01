
from app.integrations.virustotal import VirusTotalClient


class IntelligenceService:

    @staticmethod
    def enrich_ip(ip):

        data = VirusTotalClient.lookup_ip(ip)

        stats = data["data"]["attributes"]["last_analysis_stats"]

        return {
            "malicious": stats["malicious"],
            "suspicious": stats["suspicious"],
            "harmless": stats["harmless"],
            "undetected": stats["undetected"],
        }