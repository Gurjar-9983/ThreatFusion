
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
    def get_all(
        db: Session,
        search: str | None = None,
        ioc_type: str | None = None,
        severity: str | None = None,
    ):
        query = db.query(IOC)

        if search:
            query = query.filter(IOC.value.ilike(f"%{search}%"))

        if ioc_type:
            query = query.filter(IOC.type == ioc_type)

        if severity:
            query = query.filter(IOC.severity == severity)

        return query.all()

    @staticmethod
    def get_by_id(db: Session, ioc_id: UUID):
        return db.query(IOC).filter(IOC.id == ioc_id).first()

    @staticmethod
    def delete(db: Session, ioc: IOC):
        db.delete(ioc)
        db.commit()

    @staticmethod
    def update(db: Session, ioc: IOC, data):
        if data.severity is not None:
            ioc.severity = data.severity

        if data.source is not None:
            ioc.source = data.source

        if data.description is not None:
            ioc.description = data.description

        db.commit()
        db.refresh(ioc)

        return ioc