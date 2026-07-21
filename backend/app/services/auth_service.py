
from sqlalchemy.orm import Session

from app.core.security import (
    hash_password,
    verify_password,
    create_access_token,
)
from app.models.user import User
from app.repositories.user_repository import UserRepository


class AuthService:

    @staticmethod
    def register(db: Session, data):
        # Check if email already exists
        existing_user = UserRepository.get_by_email(db, data.email)

        if existing_user:
            raise ValueError("Email already exists")

        # Create new user
        user = User(
            email=data.email,
            full_name=data.full_name,
            hashed_password=hash_password(data.password),
        )

        return UserRepository.create(db, user)

    @staticmethod
    def login(db: Session, data):
        # Find user by email
        user = UserRepository.get_by_email(db, data.email)

        if not user:
            return None

        # Verify password
        if not verify_password(data.password, user.hashed_password):
            return None

        # Generate JWT
        access_token = create_access_token(
            data={"sub": str(user.id)}
        )

        return {
            "access_token": access_token,
            "token_type": "bearer",
        }