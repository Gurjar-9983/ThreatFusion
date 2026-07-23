
import httpx
from fastapi import HTTPException

from app.core.config import settings


class AbuseIPDBClient:
    BASE_URL = "https://api.abuseipdb.com/api/v2"

    @classmethod
    def get_ip_report(cls, ip_address: str):
        headers = {
            "Key": settings.ABUSEIPDB_API_KEY,
            "Accept": "application/json",
        }

        params = {
            "ipAddress": ip_address,
            "maxAgeInDays": 90,
        }

        try:
            response = httpx.get(
                f"{cls.BASE_URL}/check",
                headers=headers,
                params=params,
                timeout=30,
            )

            response.raise_for_status()

            data = response.json()["data"]

            return {
                "ioc": data["ipAddress"],
                "type": "ip",
                "abuse_confidence_score": data.get("abuseConfidenceScore", 0),
                "country": data.get("countryCode"),
                "isp": data.get("isp"),
                "usage_type": data.get("usageType"),
                "domain": data.get("domain"),
                "is_public": data.get("isPublic"),
                "is_whitelisted": data.get("isWhitelisted"),
                "total_reports": data.get("totalReports"),
                "last_reported_at": data.get("lastReportedAt"),
            }

        except httpx.HTTPStatusError as e:
            if e.response.status_code == 404:
                raise HTTPException(
                    status_code=404,
                    detail="IOC not found in AbuseIPDB"
                )

            if e.response.status_code == 429:
                raise HTTPException(
                    status_code=429,
                    detail="AbuseIPDB API rate limit exceeded"
                )

            raise HTTPException(
                status_code=e.response.status_code,
                detail="AbuseIPDB API error"
            )

        except httpx.RequestError:
            raise HTTPException(
                status_code=503,
                detail="Unable to connect to AbuseIPDB"
            )