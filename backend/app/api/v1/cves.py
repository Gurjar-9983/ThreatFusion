
from fastapi import APIRouter, Query

from app.services.cve_service import CVEService

router = APIRouter(tags=["CVEs"])


@router.get("/")
def get_recent_cves(
    limit: int = Query(
        default=20,
        ge=1,
        le=100,
        description="Number of CVEs to return",
    ),
    start_index: int = Query(
        default=0,
        ge=0,
        description="Pagination start index",
    ),
    severity: str | None = Query(
        default=None,
        description="Filter by severity (LOW, MEDIUM, HIGH, CRITICAL)",
    ),
    keyword: str | None = Query(
        default=None,
        description="Search CVE description",
    ),
):
    return CVEService.get_recent_cves(
        limit=limit,
        start_index=start_index,
        severity=severity,
        keyword=keyword,
    )