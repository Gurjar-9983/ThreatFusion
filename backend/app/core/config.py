
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    APP_NAME: str = "ThreatFusion API"
    VERSION: str = "1.0.0"

    DATABASE_URL: str

    SECRET_KEY: str
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30

    VIRUSTOTAL_API_KEY: str
    ABUSEIPDB_API_KEY: str

    # Cache configuration
    ENRICHMENT_CACHE_TTL_HOURS: int = 24

    model_config = SettingsConfigDict(
        env_file=".env",
        case_sensitive=True,
    )


settings = Settings()
VIRUSTOTAL_API_KEY: str
ABUSEIPDB_API_KEY: str
NVD_API_KEY: str | None = None