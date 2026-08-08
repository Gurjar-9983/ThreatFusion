
from sqlalchemy.orm import Session

from app.models.user import User
from app.models.ioc import IOC
from app.models.report import Report
from app.core.security import hash_password, verify_password
from app.repositories.user_repository import UserRepository


class ProfileService:

    @staticmethod
    def get_profile(
        db: Session,
        current_user: User,
    ):
        report_count = (
            db.query(Report)
            .count()
        )

        ioc_count = (
            db.query(IOC)
            .count()
        )

        return {
            "user": {
                "full_name": current_user.full_name,
                "email": current_user.email,
                "joined": current_user.created_at.strftime("%d %B %Y"),
                "active": current_user.is_active,
            },
            "stats": {
                "reports": report_count,
                "iocs": ioc_count,
                "searches": 0,
                "api_calls": 0,
            },
        }

    @staticmethod
    def update_profile(
        db: Session,
        current_user: User,
        full_name: str,
        email: str,
    ):
        existing_user = UserRepository.get_by_email(db, email)

        if existing_user and existing_user.id != current_user.id:
            raise ValueError("Email already exists")

        current_user.full_name = full_name
        current_user.email = email

        db.commit()
        db.refresh(current_user)

        return current_user

    @staticmethod
    def change_password(
        db: Session,
        current_user: User,
        current_password: str,
        new_password: str,
    ):
        if not verify_password(
            current_password,
            current_user.hashed_password,
        ):
            raise ValueError("Current password is incorrect")

        if len(new_password) < 8:
            raise ValueError(
                "New password must be at least 8 characters"
            )

        current_user.hashed_password = hash_password(new_password)

        db.commit()
        db.refresh(current_user)

        return True