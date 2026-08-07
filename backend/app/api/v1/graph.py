
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.services.graph_service import GraphService

router = APIRouter()


@router.get("/")
def get_graph(db: Session = Depends(get_db)):
    return GraphService.build_graph(db)