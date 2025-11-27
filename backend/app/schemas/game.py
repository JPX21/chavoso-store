from pydantic import BaseModel
from typing import List, Optional
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from .review import ReviewRead


class GameBase(BaseModel):
    title: str
    slug: str
    price: float
    original_price: float
    discount: Optional[str] = None
    genre: str
    description: Optional[str] = None
    gameplay: Optional[str] = None
    image: Optional[str] = None

class GameCreate(GameBase):
    pass

class GameUpdate(BaseModel):
    title: Optional[str]
    price: Optional[float]
    original_price: Optional[float]
    discount: Optional[str]
    genre: Optional[str]
    description: Optional[str]
    gameplay: Optional[str]
    image: Optional[str]

class Game(GameBase):
    id: int
    reviews: List["ReviewRead"] = []

    class Config:
        orm_mode = True
