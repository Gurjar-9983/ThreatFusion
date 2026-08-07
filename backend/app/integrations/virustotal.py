
import httpx

from app.core.config import settings


class VirusTotalClient:
    BASE_URL = "https://www.virustotal.com/api/v3"

    @classmethod
    def lookup_ip(cls, ip: str):
        headers = {
            "x-apikey": settings.VIRUSTOTAL_API_KEY,
        }

        response = httpx.get(
            f"{cls.BASE_URL}/ip_addresses/{ip}",
            headers=headers,
            timeout=30,
        )

        response.raise_for_status()

        return response.json()

    @classmethod
    def lookup_domain(cls, domain: str):
        headers = {
            "x-apikey": settings.VIRUSTOTAL_API_KEY,
        }

        response = httpx.get(
            f"{cls.BASE_URL}/domains/{domain}",
            headers=headers,
            timeout=30,
        )

        response.raise_for_status()

        return response.json()

    @classmethod
    def lookup_url(cls, url_id: str):
        headers = {
            "x-apikey": settings.VIRUSTOTAL_API_KEY,
        }

        response = httpx.get(
            f"{cls.BASE_URL}/urls/{url_id}",
            headers=headers,
            timeout=30,
        )

        response.raise_for_status()

        return response.json()

    @classmethod
    def get_ip_report(cls, ip: str):
        """
        Normalized VirusTotal report used throughout ThreatFusion.
        """

        data = cls.lookup_ip(ip)

        attributes = data["data"]["attributes"]

        stats = attributes.get(
            "last_analysis_stats",
            {},
        )

        return {
            "ioc": ip,
            "type": "ip",
            "reputation": attributes.get(
                "reputation",
                0,
            ),
            "country": attributes.get(
                "country",
            ),
            "asn": attributes.get(
                "asn",
            ),
            "network": attributes.get(
                "network",
            ),
            "malicious": stats.get(
                "malicious",
                0,
            ),
            "suspicious": stats.get(
                "suspicious",
                0,
            ),
            "harmless": stats.get(
                "harmless",
                0,
            ),
            "undetected": stats.get(
                "undetected",
                0,
            ),
            "last_analysis_date": attributes.get(
                "last_analysis_date",
            ),
        }