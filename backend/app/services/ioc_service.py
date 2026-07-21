
from uuid import UUID

from sqlalchemy.orm import Session

from app.repositories.ioc_repository import IOCRepository
from app.schemas.ioc import IOCCreate


class IOCService:

    @staticmethod
    def create(db: Session, data: IOCCreate):
        return IOCRepository.create(db, data)

    @staticmethod
    def get_all(db: Session):
        return IOCRepository.get_all(db)

    @staticmethod
    def get_by_id(db: Session, ioc_id: UUID):
        return IOCRepository.get_by_id(db, ioc_id)

    @staticmethod
    def delete(db: Session, ioc_id: UUID):
        ioc = IOCRepository.get_by_id(db, ioc_id)

        if not ioc:
            return None

        IOCRepository.delete(db, ioc)
        return True