
from app.core.logger import logger
from app.integrations.virustotal import VirusTotalClient


class IntelligenceService:

    @staticmethod
    def enrich_ip(ip: str):
        logger.info(f"VirusTotal lookup: {ip}")

        report = VirusTotalClient.get_ip_report(ip)

        return {
            "malicious": report["malicious"],
            "suspicious": report["suspicious"],
            "harmless": report["harmless"],
            "undetected": report["undetected"],
        }