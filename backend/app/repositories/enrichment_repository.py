
from sqlalchemy.orm import Session

from app.models.enrichment import Enrichment


class EnrichmentRepository:

    @staticmethod
    def save(
        db: Session,
        ioc_id,
        provider: str,
        raw_response: dict,
    ):
        enrichment = Enrichment(
            ioc_id=ioc_id,
            provider=provider,
            raw_response=raw_response,
        )

        db.add(enrichment)
        db.commit()
        db.refresh(enrichment)

        return enrichment

    @staticmethod
    def get_latest(
        db: Session,
        ioc_id,
        provider: str,
    ):
        return (
            db.query(Enrichment)
            .filter(
                Enrichment.ioc_id == ioc_id,
                Enrichment.provider == provider,
            )
            .order_by(Enrichment.created_at.desc())
            .first()
        )