
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.schemas.dashboard import DashboardResponse
from app.services.dashboard_service import DashboardService
from app.services.map_service import MapService

router = APIRouter()


@router.get(
    "",
    response_model=DashboardResponse,
)
def get_dashboard(
    db: Session = Depends(get_db),
):
    """
    Get dashboard overview and analytics.
    """
    return DashboardService.get_dashboard(db)

@router.get("/map")
def get_map(
    db: Session = Depends(get_db),
):
    return MapService.get_map_data(db)