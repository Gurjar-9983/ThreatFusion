
import httpx
from fastapi import HTTPException

from app.core.config import settings


class VirusTotalClient:
    BASE_URL = "https://www.virustotal.com/api/v3"

    @classmethod
    def get_ip_report(cls, ip_address: str):
        headers = {
            "x-apikey": settings.VIRUSTOTAL_API_KEY
        }

        url = f"{cls.BASE_URL}/ip_addresses/{ip_address}"

        try:
            response = httpx.get(
                url,
                headers=headers,
                timeout=30,
            )

            response.raise_for_status()

            data = response.json()["data"]
            attributes = data["attributes"]
            stats = attributes["last_analysis_stats"]

            return {
                "ioc": data["id"],
                "type": "ip",
                "reputation": attributes.get("reputation", 0),
                "malicious": stats.get("malicious", 0),
                "suspicious": stats.get("suspicious", 0),
                "harmless": stats.get("harmless", 0),
                "undetected": stats.get("undetected", 0),
                "last_analysis_date": attributes.get("last_analysis_date"),
            }

        except httpx.HTTPStatusError as e:
            if e.response.status_code == 404:
                raise HTTPException(
                    status_code=404,
                    detail="IOC not found in VirusTotal"
                )

            if e.response.status_code == 429:
                raise HTTPException(
                    status_code=429,
                    detail="VirusTotal API rate limit exceeded"
                )

            raise HTTPException(
                status_code=e.response.status_code,
                detail="VirusTotal API error"
            )

        except httpx.RequestError:
            raise HTTPException(
                status_code=503,
                detail="Unable to connect to VirusTotal"
            )