
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.v1 import (
    auth,
    users,
    ioc,
    health,
    reports,
    cves,
    correlation,
    intelligence,
    dashboard,
)

app = FastAPI(
    title="ThreatFusion API",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change this in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(
    health.router,
    prefix="/api/v1/health",
    tags=["Health"],
)

app.include_router(
    auth.router,
    prefix="/api/v1/auth",
    tags=["Authentication"],
)

app.include_router(
    users.router,
    prefix="/api/v1/users",
    tags=["Users"],
)

app.include_router(
    ioc.router,
    prefix="/api/v1/iocs",
    tags=["IOC"],
)

app.include_router(
    reports.router,
    prefix="/api/v1/reports",
    tags=["Reports"],
)

app.include_router(
    cves.router,
    prefix="/api/v1/cves",
    tags=["CVEs"],
)

app.include_router(
    correlation.router,
    prefix="/api/v1/correlation",
    tags=["Correlation"],
)

app.include_router(
    intelligence.router,
    prefix="/api/v1/intelligence",
    tags=["Threat Intelligence"],
)

app.include_router(
    dashboard.router,
    prefix="/api/v1/dashboard",
    tags=["Dashboard"],
)

@app.get("/")
def root():
    return {
        "message": "ThreatFusion API is running",
        "version": "1.0.0",
    }