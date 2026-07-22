
from uuid import UUID

from sqlalchemy.orm import Session

from app.repositories.ioc_repository import IOCRepository
from app.schemas.ioc import IOCCreate, IOCUpdate


class IOCService:

    @staticmethod
    def create(db: Session, data: IOCCreate):
        return IOCRepository.create(db, data)

    @staticmethod
    def get_all(
        db: Session,
        search: str | None = None,
        ioc_type: str | None = None,
        severity: str | None = None,
    ):
        return IOCRepository.get_all(
            db,
            search=search,
            ioc_type=ioc_type,
            severity=severity,
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