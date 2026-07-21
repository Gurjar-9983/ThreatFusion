
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.v1.auth import router as auth_router
from app.api.v1.health import router as health_router
from app.db.base import Base  # Import Base after models are registered
from app.db.database import engine
from app.api.v1.users import router as user_router
from app.api.v1.ioc import router as ioc_router


app = FastAPI(
    title="ThreatFusion API",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health_router, prefix="/api/v1")
app.include_router(auth_router, prefix="/api/v1")
app.include_router(
    user_router,
    prefix="/api/v1",
)
app.include_router(
    ioc_router,
    prefix="/api/v1",
)