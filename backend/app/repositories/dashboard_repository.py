
from sqlalchemy import func
from sqlalchemy.orm import Session

from app.models.ioc import IOC
from app.models.user import User


class DashboardRepository:

    @staticmethod
    def get_dashboard_data(db: Session):
        # Overview
        total_iocs = db.query(IOC).count()

        total_users = db.query(User).count()

        high_severity = (
            db.query(IOC)
            .filter(IOC.severity.in_(["High", "Critical"]))
            .count()
        )

        ioc_sources = (
            db.query(IOC.source)
            .distinct()
            .count()
        )

        # Severity Distribution
        severity_rows = (
            db.query(
                IOC.severity,
                func.count(IOC.id)
            )
            .group_by(IOC.severity)
            .limit(5).all()
        )

        severity_distribution = {
            "Critical": 0,
            "High": 0,
            "Medium": 0,
            "Low": 0,
        }

        for severity, count in severity_rows:
            severity_distribution[severity] = count

        # IOC Type Distribution
        type_rows = (
            db.query(
                IOC.type,
                func.count(IOC.id)
            )
            .group_by(IOC.type)
            .all()
        )

        ioc_type_distribution = {
            "ip": 0,
            "domain": 0,
            "url": 0,
            "hash": 0,
        }

        for ioc_type, count in type_rows:
            ioc_type_distribution[ioc_type.lower()] = count

        # Recent Activity
        recent_activity = (
            db.query(IOC)
            .order_by(IOC.created_at.desc())
            .limit(10)
            .limit(5).all()
        )

        # Top Sources
        top_sources = (
            db.query(
                IOC.source,
                func.count(IOC.id).label("count")
            )
            .group_by(IOC.source)
            .order_by(func.count(IOC.id).desc())
            .limit(5).all()
        )

        return {
            "total_iocs": total_iocs,
            "total_users": total_users,
            "high_severity": high_severity,
            "ioc_sources": ioc_sources,
            "severity_distribution": severity_distribution,
            "ioc_type_distribution": ioc_type_distribution,
            "recent_activity": recent_activity,
            "top_sources": top_sources,
        }