
from uuid import UUID

from sqlalchemy.orm import Session

from app.models.ioc import IOC
from app.schemas.ioc import IOCCreate


class IOCRepository:

    @staticmethod
    def create(db: Session, data: IOCCreate) -> IOC:
        ioc = IOC(
            type=data.type,
            value=data.value,
            severity=data.severity,
            source=data.source,
            description=data.description,
        )

        db.add(ioc)
        db.commit()
        db.refresh(ioc)

        return ioc

    @staticmethod
    def get_all(db: Session):
        return db.query(IOC).all()

    @staticmethod
    def get_by_id(db: Session, ioc_id: UUID):
        return db.query(IOC).filter(IOC.id == ioc_id).first()

    @staticmethod
    def delete(db: Session, ioc: IOC):
        db.delete(ioc)
        db.commit()