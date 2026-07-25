
import uuid

from sqlalchemy import Column, DateTime, ForeignKey, JSON, String
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func

from app.db.database import Base


class Enrichment(Base):
    __tablename__ = "enrichments"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)

    ioc_id = Column(
        UUID(as_uuid=True),
        ForeignKey("iocs.id", ondelete="CASCADE"),
        nullable=False,
    )

    provider = Column(String, nullable=False)

    raw_response = Column(JSON, nullable=False)

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
    )