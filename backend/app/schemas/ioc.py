
from datetime import datetime
from typing import Literal
from uuid import UUID

from pydantic import BaseModel


class IOCCreate(BaseModel):
    type: Literal["ip", "domain", "url", "hash"]
    value: str
    severity: str = "Low"
    source: str = "Manual"
    description: str | None = None

class IOCUpdate(BaseModel):
    severity: str | None = None
    source: str | None = None
    description: str | None = None
    
class IOCResponse(BaseModel):
    id: UUID
    type: str
    value: str
    severity: str
    source: str
    description: str | None
    created_at: datetime
    updated_at: datetime

    model_config = {
        "from_attributes": True
    }