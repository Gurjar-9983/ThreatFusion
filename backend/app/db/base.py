
from app.db.database import Base

# Import all models so Alembic can discover them
from app.models.user import User  # noqa: F401
from app.models.ioc import IOC  # noqa: F401
from app.models.enrichment import Enrichment  # noqa: F401
from app.models.report import Report  # noqa: F401