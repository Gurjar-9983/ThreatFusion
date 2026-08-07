
from app.repositories.enrichment_repository import (
    EnrichmentRepository,
)


class CacheService:

    @staticmethod
    def get(
        db,
        ioc_id,
        provider,
    ):
        enrichment = (
            EnrichmentRepository.get_by_provider(
                db,
                ioc_id,
                provider,
            )
        )

        if enrichment:
            return enrichment.raw_response

        return None

    @staticmethod
    def save(
        db,
        ioc_id,
        provider,
        data,
    ):
        existing = (
            EnrichmentRepository.get_by_provider(
                db,
                ioc_id,
                provider,
            )
        )

        if existing:

            return EnrichmentRepository.update(
                db,
                existing,
                data,
            )

        return EnrichmentRepository.save(
            db,
            ioc_id,
            provider,
            data,
        )