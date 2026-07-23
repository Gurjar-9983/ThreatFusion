
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.schemas.ioc import (
    IOCCreate,
    IOCUpdate,
    IOCResponse,
    IOCPaginatedResponse,
)
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
    response_model=IOCPaginatedResponse,
)
def get_iocs(
    search: str | None = Query(default=None),
    type: str | None = Query(default=None),
    severity: str | None = Query(default=None),
    page: int = Query(default=1, ge=1),
    limit: int = Query(default=10, ge=1, le=100),
    db: Session = Depends(get_db),
):
    return IOCService.get_all(
        db=db,
        search=search,
        ioc_type=type,
        severity=severity,
        page=page,
        limit=limit,
    )


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


@router.get(
    "/{ioc_id}/enrich",
)
def enrich_ioc(
    ioc_id: UUID,
    db: Session = Depends(get_db),
):
    try:
        report = IOCService.enrich(db, ioc_id)

        if not report:
            raise HTTPException(
                status_code=404,
                detail="IOC not found",
            )

        return report

    except ValueError as e:
        raise HTTPException(
            status_code=400,
            detail=str(e),
        )


@router.put(
    "/{ioc_id}",
    response_model=IOCResponse,
)
def update_ioc(
    ioc_id: UUID,
    data: IOCUpdate,
    db: Session = Depends(get_db),
):
    ioc = IOCService.update(db, ioc_id, data)

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