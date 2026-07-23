
from math import ceil
from uuid import UUID

from fastapi import HTTPException
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from app.models.ioc import IOC
from app.schemas.ioc import IOCCreate, IOCUpdate


class IOCRepository:

    @staticmethod
    def create(db: Session, data: IOCCreate):
        ioc = IOC(**data.model_dump())

        db.add(ioc)

        try:
            db.commit()
            db.refresh(ioc)

        except IntegrityError:
            db.rollback()
            raise HTTPException(
                status_code=409,
                detail="IOC already exists",
            )

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
        query = db.query(IOC)

        if search:
            query = query.filter(IOC.value.ilike(f"%{search}%"))

        if ioc_type:
            query = query.filter(IOC.type == ioc_type)

        if severity:
            query = query.filter(IOC.severity == severity)

        total = query.count()

        items = (
            query.offset((page - 1) * limit)
            .limit(limit)
            .all()
        )

        return {
            "items": items,
            "page": page,
            "limit": limit,
            "total": total,
            "pages": ceil(total / limit) if total else 1,
        }

    @staticmethod
    def get_by_id(db: Session, ioc_id: UUID):
        return db.query(IOC).filter(IOC.id == ioc_id).first()

    @staticmethod
    def update(db: Session, ioc: IOC, data: IOCUpdate):
        update_data = data.model_dump(exclude_unset=True)

        for key, value in update_data.items():
            setattr(ioc, key, value)

        try:
            db.commit()
            db.refresh(ioc)

        except IntegrityError:
            db.rollback()
            raise HTTPException(
                status_code=409,
                detail="IOC already exists",
            )

        return ioc

    @staticmethod
    def delete(db: Session, ioc: IOC):
        db.delete(ioc)
        db.commit()