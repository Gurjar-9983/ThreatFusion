
from pydantic import BaseModel


class IOCReportResponse(BaseModel):
    generated_at: str

    ioc: dict

    threat_report: dict