
from fastapi import APIRouter

from app.services.correlation_service import CorrelationService

router = APIRouter()


from app.schemas.correlation import (
    CorrelationRequest,
    CorrelationResponse,
)

@router.post(
    "/",
    response_model=CorrelationResponse,
)
def correlate(
    payload: CorrelationRequest,
):
    return CorrelationService.correlate(
        payload.model_dump()
    )