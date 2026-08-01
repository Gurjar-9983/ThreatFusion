
import httpx


class KEVClient:
    URL = "https://www.cisa.gov/sites/default/files/feeds/known_exploited_vulnerabilities.json"

    _cache = None

    @classmethod
    def get_catalog(cls):
        if cls._cache is not None:
            return cls._cache

        try:
            response = httpx.get(cls.URL, timeout=30)
            response.raise_for_status()

            data = response.json()

            cls._cache = {
                item["cveID"]
                for item in data.get("vulnerabilities", [])
            }

            return cls._cache

        except Exception:
            return set()

    @classmethod
    def is_kev(cls, cve_id: str) -> bool:
        return cve_id in cls.get_catalog()