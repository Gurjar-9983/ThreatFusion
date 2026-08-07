
from uuid import UUID

from sqlalchemy.orm import Session

from app.core.logger import logger
from app.integrations.correlation import CorrelationEngine
from app.repositories.ioc_repository import IOCRepository
from app.schemas.ioc import IOCCreate, IOCUpdate
from app.services.enrichment_service import EnrichmentService
from app.validators.ioc_validator import validate_ioc


class IOCService:
    @staticmethod
    def create(db: Session, data: IOCCreate):
        logger.info(f"Creating IOC: {data.value}")

        # Validate the IOC before saving it
        validate_ioc(data.type, data.value)

        ioc = IOCRepository.create(db, data)

        logger.info(f"IOC created successfully: {ioc.value}")

        return ioc

    @staticmethod
    def get_all(
        db: Session,
        search: str | None = None,
        ioc_type: str | None = None,
        severity: str | None = None,
        page: int = 1,
        limit: int = 10,
    ):
        return IOCRepository.get_all(
            db=db,
            search=search,
            ioc_type=ioc_type,
            severity=severity,
            page=page,
            limit=limit,
        )

    @staticmethod
    def get_by_id(db: Session, ioc_id: UUID):
        return IOCRepository.get_by_id(db, ioc_id)

    @staticmethod
    def update(db: Session, ioc_id: UUID, data: IOCUpdate):
        logger.info(f"Updating IOC: {ioc_id}")

        ioc = IOCRepository.get_by_id(db, ioc_id)

        if not ioc:
            return None

        updated_ioc = IOCRepository.update(db, ioc, data)

        logger.info(f"IOC updated successfully: {ioc_id}")

        return updated_ioc

    @staticmethod
    def delete(db: Session, ioc_id: UUID):
        logger.info(f"Deleting IOC: {ioc_id}")

        ioc = IOCRepository.get_by_id(db, ioc_id)

        if not ioc:
            return False

        IOCRepository.delete(db, ioc)

        logger.info(f"IOC deleted successfully: {ioc_id}")

        return True

    @staticmethod
    def enrich(db: Session, ioc_id: UUID):
        ioc = IOCRepository.get_by_id(db, ioc_id)

        if not ioc:
            return None

        if ioc.type.lower() != "ip":
            raise ValueError(
                "Threat enrichment currently supports IP IOCs only."
            )

        logger.info(f"Enriching IOC: {ioc.value}")

        try:
            report = EnrichmentService.enrich_ip(
                db=db,
                ioc=ioc,
            )

            correlated_report = CorrelationEngine.correlate(
                report
            )

            logger.info(
                f"IOC enrichment and correlation completed: {ioc.value}"
            )

            return {
                "ioc": {
                    "id": str(ioc.id),
                    "value": ioc.value,
                    "type": ioc.type,
                    "severity": ioc.severity,
                    "source": ioc.source,
                    "description": ioc.description,
                },
                "threat_report": correlated_report,
            }

        except Exception as e:
            logger.error(
                f"Failed to enrich IOC {ioc.value}: {e}"
            )
            raise