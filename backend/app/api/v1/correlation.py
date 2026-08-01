
from fastapi import APIRouter

from app.services.correlation_service import CorrelationService

router = APIRouter()


@router.post("/")
def correlate(payload: dict):

    return CorrelationService.correlate(payload)