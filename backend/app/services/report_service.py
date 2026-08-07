
from uuid import UUID

from sqlalchemy.orm import Session

from app.ai.analyst import ThreatAnalyst
from app.repositories.report_repository import ReportRepository
from app.services.ioc_service import IOCService
from app.utils.pdf_generator import PDFGenerator


class ReportService:

    @staticmethod
    def generate_ioc_pdf(
        db: Session,
        ioc_id: UUID,
    ):
        report = ReportService.generate_ioc_report(
            db=db,
            ioc_id=ioc_id,
        )

        return PDFGenerator.generate_ioc_report(report)

    @staticmethod
    def generate_ioc_report(
        db: Session,
        ioc_id: UUID,
    ):
        report = IOCService.enrich(
            db=db,
            ioc_id=ioc_id,
        )

        if not report:
            return None

        # AI analyzes ONLY the threat report
        report["ai_analysis"] = ThreatAnalyst.analyze(
            report["threat_report"]
        )

        return report

    @staticmethod
    def list_reports(db: Session):
        return ReportRepository.get_all(db)

    @staticmethod
    def save_report(
        db: Session,
        ioc_id: UUID,
        filename: str,
    ):
        return ReportRepository.create(
            db,
            ioc_id,
            filename,
        )

    @staticmethod
    def delete_report(
        db: Session,
        report_id: UUID,
    ):
        report = ReportRepository.get(
            db,
            report_id,
        )

        if report:
            ReportRepository.delete(
                db,
                report,
            )

        return report
    @staticmethod
    def stats(db: Session):
        reports = ReportRepository.get_all(db)

        return {
            "total_reports": len(reports),
            "pdf_reports": len(reports),
            "generated_today": len(reports),
            "generated_this_month": len(reports),
        }