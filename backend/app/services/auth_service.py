
from sqlalchemy.orm import Session

from app.core.logger import logger
from app.core.security import (
    create_access_token,
    hash_password,
    verify_password,
)
from app.models.user import User
from app.repositories.user_repository import UserRepository


class AuthService:
    @staticmethod
    def register(db: Session, data):
        existing_user = UserRepository.get_by_email(db, data.email)

        if existing_user:
            logger.warning(f"Registration failed: {data.email} already exists")
            raise ValueError("Email already exists")

        user = User(
            email=data.email,
            full_name=data.full_name,
            hashed_password=hash_password(data.password),
        )

        created_user = UserRepository.create(db, user)

        logger.info(f"New user registered: {created_user.email}")

        return created_user

    @staticmethod
    def login(db: Session, data):
        logger.info(f"Login attempt: {data.email}")

        user = UserRepository.get_by_email(db, data.email)

        if not user:
            logger.warning(f"Failed login: {data.email}")
            return None

        if not verify_password(data.password, user.hashed_password):
            logger.warning(f"Failed login: {data.email}")
            return None

        access_token = create_access_token(
            data={"sub": str(user.id)}
        )

        logger.info(f"User logged in: {user.email}")

        return {
            "access_token": access_token,
            "token_type": "bearer",
        }