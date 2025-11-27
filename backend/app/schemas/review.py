from pydantic import BaseModel
from typing import Optional

class ReviewBase(BaseModel):
    rating: float
    comment: Optional[str] = None

class ReviewCreate(ReviewBase):
    game_id: int
    user_id: int

class ReviewUpdate(BaseModel):
    rating: Optional[float]
    comment: Optional[str]

class ReviewRead(ReviewBase):
    id: int
    user_id: int
    game_id: int

    class Config:
        orm_mode = True
