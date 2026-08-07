
from uuid import UUID

from sqlalchemy.orm import Session

from app.models.report import Report


class ReportRepository:

    @staticmethod
    def create(
        db: Session,
        ioc_id: UUID,
        filename: str,
    ) -> Report:

        report = Report(
            ioc_id=ioc_id,
            filename=filename,
        )

        db.add(report)
        db.commit()
        db.refresh(report)

        return report

    @staticmethod
    def get_all(db: Session):
        return (
            db.query(Report)
            .order_by(Report.created_at.desc())
            .all()
        )

    @staticmethod
    def get(
        db: Session,
        report_id: UUID,
    ):
        return (
            db.query(Report)
            .filter(Report.id == report_id)
            .first()
        )

    @staticmethod
    def count(db: Session):
        return db.query(Report).count()

    @staticmethod
    def delete(
        db: Session,
        report: Report,
    ):
        db.delete(report)
        db.commit()