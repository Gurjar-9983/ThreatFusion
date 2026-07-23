
from app.integrations.abuseipdb import AbuseIPDBClient
from app.integrations.virustotal import VirusTotalClient


class EnrichmentService:

    @staticmethod
    def enrich_ip(ip_address: str):
        virustotal = VirusTotalClient.get_ip_report(ip_address)
        abuseipdb = AbuseIPDBClient.get_ip_report(ip_address)

        return {
            "ioc": ip_address,
            "providers": {
                "virustotal": virustotal,
                "abuseipdb": abuseipdb,
            }
        }