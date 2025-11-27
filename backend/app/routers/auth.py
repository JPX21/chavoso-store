from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..schemas.user import UserCreate, UserRead, UserLogin
from ..schemas.crud import get_user_by_email, create_user, authenticate_user
from ..dependencies import get_db

router = APIRouter(prefix="/auth", tags=["auth"])

# ------------------- CADASTRO -------------------
@router.post("/register", response_model=UserRead)
def register(user_data: UserCreate, db: Session = Depends(get_db)):
    existing_user = get_user_by_email(db, user_data.email)
    if existing_user:
        raise HTTPException(status_code=400, detail="Email já cadastrado")
    return create_user(db, user_data)

# ------------------- LOGIN -------------------
@router.post("/login", response_model=UserRead)
def login(user_data: UserLogin, db: Session = Depends(get_db)):
    user = authenticate_user(db, user_data.email, user_data.password)
    if not user:
        raise HTTPException(status_code=401, detail="Credenciais inválidas")
    return user
