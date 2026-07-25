
from datetime import datetime, timedelta, timezone

from app.core.config import settings
from app.integrations.abuseipdb import AbuseIPDBClient
from app.integrations.virustotal import VirusTotalClient
from app.repositories.enrichment_repository import EnrichmentRepository


class EnrichmentService:

    @staticmethod
    def _is_cache_valid(enrichment) -> bool:
        if enrichment is None:
            return False

        if enrichment.updated_at is None:
            return False

        expires_at = enrichment.updated_at + timedelta(
            hours=settings.ENRICHMENT_CACHE_TTL_HOURS
        )

        return datetime.now(timezone.utc) < expires_at

    @staticmethod
    def enrich_ip(db, ioc):
        providers = {
            "virustotal": VirusTotalClient,
            "abuseipdb": AbuseIPDBClient,
        }

        report = {
            "ioc": ioc.value,
            "providers": {},
        }

        for provider_name, provider_client in providers.items():

            cached = EnrichmentRepository.get_latest(
                db=db,
                ioc_id=ioc.id,
                provider=provider_name,
            )

            if EnrichmentService._is_cache_valid(cached):
                report["providers"][provider_name] = cached.raw_response
                continue

            response = provider_client.get_ip_report(ioc.value)

            EnrichmentRepository.save(
                db=db,
                ioc_id=ioc.id,
                provider=provider_name,
                raw_response=response,
            )

            report["providers"][provider_name] = response

        return report