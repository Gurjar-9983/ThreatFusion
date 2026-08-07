
from datetime import datetime

from pydantic import BaseModel, ConfigDict


class CVEBase(BaseModel):
    id: str
    description: str
    severity: str
    cvss: float
    epss: float
    kev: bool
    published: datetime
    modified: datetime


class CVEResponse(CVEBase):
    model_config = ConfigDict(from_attributes=True)


class CVEListResponse(BaseModel):
    items: list[CVEResponse]
    total: int