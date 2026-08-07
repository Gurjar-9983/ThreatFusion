
from app.core.logger import logger

from sqlalchemy.orm import Session

from app.repositories.dashboard_repository import DashboardRepository
from app.schemas.dashboard import (
    DashboardOverview,
    DashboardResponse,
    IOCTypeDistribution,
    RecentActivity,
    SeverityDistribution,
    TopSource,
)

logger.info("Dashboard requested")

class DashboardService:

    @staticmethod
    def calculate_threat_score(severity: dict) -> int:
        """
        Calculate Threat Score (0-100)
        """

        critical = severity.get("Critical", 0)
        high = severity.get("High", 0)
        medium = severity.get("Medium", 0)
        low = severity.get("Low", 0)

        weighted_score = (
            critical * 10
            + high * 6
            + medium * 3
            + low
        )

        total = critical + high + medium + low

        if total == 0:
            return 0

        max_score = total * 10

        score = int((weighted_score / max_score) * 100)

        return min(score, 100)

    @staticmethod
    def get_dashboard(db: Session):

        data = DashboardRepository.get_dashboard_data(db)

        threat_score = DashboardService.calculate_threat_score(
            data["severity_distribution"]
        )

        overview = DashboardOverview(
            total_iocs=data["total_iocs"],
            total_users=data["total_users"],
            threat_score=threat_score,
            high_severity=data["high_severity"],
            ioc_sources=data["ioc_sources"],
        )

        severity = SeverityDistribution(
            critical=data["severity_distribution"]["Critical"],
            high=data["severity_distribution"]["High"],
            medium=data["severity_distribution"]["Medium"],
            low=data["severity_distribution"]["Low"],
        )

        types = IOCTypeDistribution(
            ip=data["ioc_type_distribution"]["ip"],
            domain=data["ioc_type_distribution"]["domain"],
            url=data["ioc_type_distribution"]["url"],
            hash=data["ioc_type_distribution"]["hash"],
        )

        activity = [
            RecentActivity(
                id=str(i.id),
                value=i.value,
                type=i.type,
                severity=i.severity,
                source=i.source,
                created_at=i.created_at,
            )
            for i in data["recent_activity"]
        ]

        sources = [
            TopSource(
                source=s.source,
                count=s.count,
            )
            for s in data["top_sources"]
        ]

        response = DashboardResponse(
            overview=overview,
            severity_distribution=severity,
            ioc_type_distribution=types,
            recent_activity=activity,
            top_sources=sources,
        )

        logger.info("Dashboard generated successfully")

        return response