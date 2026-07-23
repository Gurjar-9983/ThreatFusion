
from uuid import UUID

from sqlalchemy.orm import Session

from app.repositories.ioc_repository import IOCRepository
from app.schemas.ioc import IOCCreate, IOCUpdate
from app.services.enrichment_service import EnrichmentService
from app.validators.ioc_validator import validate_ioc


class IOCService:

    @staticmethod
    def create(db: Session, data: IOCCreate):
        # Validate the IOC before saving it
        validate_ioc(data.type, data.value)

        return IOCRepository.create(db, data)

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
        ioc = IOCRepository.get_by_id(db, ioc_id)

        if not ioc:
            return None

        return IOCRepository.update(db, ioc, data)

    @staticmethod
    def delete(db: Session, ioc_id: UUID):
        ioc = IOCRepository.get_by_id(db, ioc_id)

        if not ioc:
            return False

        IOCRepository.delete(db, ioc)
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

        threat_report = EnrichmentService.enrich_ip(ioc.value)

        return {
            "id": str(ioc.id),
            "type": ioc.type,
            "value": ioc.value,
            "threat_report": threat_report,
        }