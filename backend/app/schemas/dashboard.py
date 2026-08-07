
from datetime import datetime

from pydantic import BaseModel


class DashboardOverview(BaseModel):
    total_iocs: int
    total_users: int
    threat_score: int
    high_severity: int
    ioc_sources: int


class SeverityDistribution(BaseModel):
    critical: int
    high: int
    medium: int
    low: int


class IOCTypeDistribution(BaseModel):
    ip: int
    domain: int
    url: int
    hash: int


class RecentActivity(BaseModel):
    id: str
    value: str
    type: str
    severity: str
    source: str
    created_at: datetime


class TopSource(BaseModel):
    source: str
    count: int


class DashboardResponse(BaseModel):
    overview: DashboardOverview
    severity_distribution: SeverityDistribution
    ioc_type_distribution: IOCTypeDistribution
    recent_activity: list[RecentActivity]
    top_sources: list[TopSource]