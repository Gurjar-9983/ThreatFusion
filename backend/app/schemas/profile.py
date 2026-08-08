
from pydantic import BaseModel


class ProfileStats(BaseModel):
    reports: int
    iocs: int
    searches: int
    api_calls: int


class ProfileUser(BaseModel):
    full_name: str
    email: str
    joined: str
    active: bool


class ProfileResponse(BaseModel):
    user: ProfileUser
    stats: ProfileStats