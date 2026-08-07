
from pydantic import BaseModel


class CorrelationRequest(BaseModel):
    ioc: str
    providers: dict


class CorrelationResponse(BaseModel):
    indicator: str
    indicator_type: str

    threat_score: int
    threat_level: str

    summary: list[str]

    providers: dict

    malware: list
    threat_actors: list
    related_cves: list
    mitre: list