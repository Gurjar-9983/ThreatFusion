
from pydantic import BaseModel


class CorrelatedCVE(BaseModel):
    id: str
    severity: str
    cvss: float
    epss: float
    kev: bool


class IOCCorrelationResponse(BaseModel):
    indicator: str
    indicator_type: str
    threat_score: int
    malware: list[str]
    threat_actors: list[str]
    related_cves: list[CorrelatedCVE]
    mitre: list[str]