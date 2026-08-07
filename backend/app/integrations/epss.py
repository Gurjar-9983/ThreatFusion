
import httpx


class EPSSClient:
    BASE_URL = "https://api.first.org/data/v1/epss"

    @classmethod
    def get_scores(cls, cve_ids: list[str]) -> dict:
        if not cve_ids:
            return {}

        try:
            response = httpx.get(
                cls.BASE_URL,
                params={
                    "cve": ",".join(cve_ids),
                },
                timeout=15,
            )

            response.raise_for_status()

            data = response.json().get("data", [])

            scores = {}

            for item in data:
                scores[item["cve"]] = {
                    "epss": float(item["epss"]),
                    "percentile": float(item["percentile"]),
                }

            return scores

        except (httpx.RequestError, httpx.HTTPStatusError, ValueError):
         return {}