
from uuid import uuid4

from sqlalchemy import Column
from sqlalchemy import DateTime
from sqlalchemy import ForeignKey
from sqlalchemy import String

from sqlalchemy.dialects.postgresql import UUID

from sqlalchemy.sql import func

from app.db.database import Base


class Report(Base):
    __tablename__ = "reports"

    id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid4,
    )

    ioc_id = Column(
        UUID(as_uuid=True),
        ForeignKey("iocs.id"),
        nullable=False,
    )

    filename = Column(
        String,
        nullable=False,
    )

    report_type = Column(
        String,
        nullable=False,
        default="PDF",
    )

    created_by = Column(
        String,
        nullable=False,
        default="Analyst",
    )

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
    )