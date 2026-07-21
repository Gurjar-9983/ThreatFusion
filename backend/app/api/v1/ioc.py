
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.schemas.ioc import IOCCreate, IOCResponse
from app.services.ioc_service import IOCService

router = APIRouter(
    prefix="/iocs",
    tags=["IOC"],
)


@router.post(
    "",
    response_model=IOCResponse,
)
def create_ioc(
    data: IOCCreate,
    db: Session = Depends(get_db),
):
    return IOCService.create(db, data)


@router.get(
    "",
    response_model=list[IOCResponse],
)
def get_iocs(
    db: Session = Depends(get_db),
):
    return IOCService.get_all(db)


@router.get(
    "/{ioc_id}",
    response_model=IOCResponse,
)
def get_ioc(
    ioc_id: UUID,
    db: Session = Depends(get_db),
):
    ioc = IOCService.get_by_id(db, ioc_id)

    if not ioc:
        raise HTTPException(
            status_code=404,
            detail="IOC not found",
        )

    return ioc


@router.delete(
    "/{ioc_id}",
)
def delete_ioc(
    ioc_id: UUID,
    db: Session = Depends(get_db),
):
    deleted = IOCService.delete(db, ioc_id)

    if not deleted:
        raise HTTPException(
            status_code=404,
            detail="IOC not found",
        )

    return {
        "message": "IOC deleted successfully"
    }