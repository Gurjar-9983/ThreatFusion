
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.schemas.user import UserCreate, UserLogin, UserResponse
from app.services.auth_service import AuthService

router = APIRouter(
    tags=["Authentication"],
)


@router.post(
    "/register",
    response_model=UserResponse,
    status_code=status.HTTP_201_CREATED,
)
def register(
    user: UserCreate,
    db: Session = Depends(get_db),
):
    try:
        return AuthService.register(db, user)
    except ValueError as e:
        raise HTTPException(
            status_code=400,
            detail=str(e),
        )


@router.post("/login")
def login(
    credentials: UserLogin,
    db: Session = Depends(get_db),
):
    token = AuthService.login(db, credentials)

    if not token:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password",
        )

    return token                       