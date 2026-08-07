
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from fastapi.responses import Response
from app.db.database import get_db
from app.services.report_service import ReportService

router = APIRouter()


@router.get(
    "/ioc/{ioc_id}",
)
def get_ioc_report(
    ioc_id: UUID,
    db: Session = Depends(get_db),
):

    report = ReportService.generate_ioc_report(
        db=db,
        ioc_id=ioc_id,
    )
    ReportService.save_report(
    db=db,
    ioc_id=ioc_id,
    filename=f"ioc-report-{ioc_id}.pdf",
)

    if not report:
        raise HTTPException(
            status_code=404,
            detail="IOC not found",
        )

    return report
@router.get(
    "/ioc/{ioc_id}/pdf",
)
def download_ioc_report(
    ioc_id: UUID,
    db: Session = Depends(get_db),
):
    pdf = ReportService.generate_ioc_pdf(
        db=db,
        ioc_id=ioc_id,
    )

    return Response(
        content=pdf,
        media_type="application/pdf",
        headers={
            "Content-Disposition":
            f'attachment; filename="ioc-report-{ioc_id}.pdf"'
        },
    )
@router.get("/stats")
def report_stats(
    db: Session = Depends(get_db),
):
    return ReportService.stats(db)

@router.get("/")
def get_reports(
    db: Session = Depends(get_db),
):
    return ReportService.list_reports(db)

@router.delete("/{report_id}")
def delete_report(
    report_id: UUID,
    db: Session = Depends(get_db),
):
    report = ReportService.delete_report(
        db,
        report_id,
    )

    if not report:
        raise HTTPException(
            status_code=404,
            detail="Report not found",
        )

    return {
        "message": "Report deleted"
    }