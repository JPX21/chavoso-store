from pydantic import BaseModel, EmailStr

# Schema base para usuário
class UserBase(BaseModel):
    name: str
    email: EmailStr
    phone: str | None = None
    cpf: str

# Schema usado para criação de usuário
class UserCreate(UserBase):
    password: str

# Schema usado para exibir usuário (sem senha)
class UserRead(UserBase):
    id: int

    class Config:
        orm_mode = True

class UserLogin(BaseModel):
    email: EmailStr
    password: str
