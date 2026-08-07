
from datetime import UTC, datetime, timedelta

import httpx
from fastapi import HTTPException

from app.core.config import settings


class NVDClient:
    BASE_URL = "https://services.nvd.nist.gov/rest/json/cves/2.0"

    @classmethod
    def get_recent_cves(
        cls,
        limit: int = 20,
        start_index: int = 0,
    ):
        headers = {}

        if getattr(settings, "NVD_API_KEY", None):
            headers["apiKey"] = settings.NVD_API_KEY

        # Fetch CVEs from the last 30 days
        end_date = datetime.now(UTC)
        start_date = end_date - timedelta(days=30)

        params = {
            "resultsPerPage": limit,
            "startIndex": start_index,
            "pubStartDate": start_date.isoformat(timespec="milliseconds").replace("+00:00", "Z"),
            "pubEndDate": end_date.isoformat(timespec="milliseconds").replace("+00:00", "Z"),
        }

        try:
            with httpx.Client(timeout=30.0) as client:
                response = client.get(
                    cls.BASE_URL,
                    headers=headers,
                    params=params,
                )

            response.raise_for_status()
            return response.json()

        except httpx.HTTPStatusError as e:
            raise HTTPException(
                status_code=e.response.status_code,
                detail={
                    "error": "NVD API returned an error",
                    "status_code": e.response.status_code,
                    "response": e.response.text,
                },
            )

        except httpx.RequestError as e:
            raise HTTPException(
                status_code=503,
                detail={
                    "error": "Request to NVD failed",
                    "exception": type(e).__name__,
                    "message": str(e),
                },
            )

        except (ValueError, KeyError) as e:
            raise HTTPException(
                status_code=500,
                detail={
                    "error": "Unexpected error",
                    "exception": type(e).__name__,
                    "message": str(e),
                },
            )