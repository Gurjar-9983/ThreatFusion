
from fastapi import APIRouter

from app.services.intelligence_service import IntelligenceService

router = APIRouter()


@router.get("/ip/{ip}")
def enrich_ip(ip: str):
    return IntelligenceService.enrich_ip(ip)