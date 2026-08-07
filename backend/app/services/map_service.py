
from sqlalchemy.orm import Session

from app.models.enrichment import Enrichment


class MapService:

    COUNTRY_COORDINATES = {
        "US": {
            "country": "United States",
            "lat": 37.0902,
            "lng": -95.7129,
        },
        "IN": {
            "country": "India",
            "lat": 20.5937,
            "lng": 78.9629,
        },
        "DE": {
            "country": "Germany",
            "lat": 51.1657,
            "lng": 10.4515,
        },
        "GB": {
            "country": "United Kingdom",
            "lat": 55.3781,
            "lng": -3.4360,
        },
        "RU": {
            "country": "Russia",
            "lat": 61.5240,
            "lng": 105.3188,
        },
        "CN": {
            "country": "China",
            "lat": 35.8617,
            "lng": 104.1954,
        },
    }

    @staticmethod
    def get_map_data(db: Session):
        enrichments = db.query(Enrichment).all()

        countries = {}

        for enrichment in enrichments:
            raw = enrichment.raw_response or {}

            code = raw.get("country")

            if not code:
                continue

            if code not in MapService.COUNTRY_COORDINATES:
                continue

            if code not in countries:

                info = MapService.COUNTRY_COORDINATES[code]

                countries[code] = {
                    "country": info["country"],
                    "lat": info["lat"],
                    "lng": info["lng"],
                    "count": 0,
                }

            countries[code]["count"] += 1

        return list(countries.values())