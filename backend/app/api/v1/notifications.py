
from fastapi import APIRouter

router = APIRouter()


@router.get("/")
def get_notifications():
    return [
        {
            "title": "IOC Created",
            "message": "8.8.8.8",
            "level": "info",
            "time": "2 min ago",
        },
        {
            "title": "High Severity IOC",
            "message": "1.1.1.1",
            "level": "critical",
            "time": "5 min ago",
        },
        {
            "title": "VirusTotal Updated",
            "message": "Latest enrichment completed",
            "level": "success",
            "time": "12 min ago",
        },
    ]