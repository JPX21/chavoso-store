from sqlalchemy import Column, String, Integer, Float
from sqlalchemy.orm import relationship
from ..database import Base

class Game(Base):
    __tablename__ = "games"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200), nullable=False)
    slug = Column(String(200), unique=True, nullable=False)
    price = Column(Float, nullable=False)
    original_price = Column(Float, nullable=False)
    discount = Column(String(10), nullable=True)
    genre = Column(String(50), nullable=False)
    description = Column(String(1000), nullable=True)
    gameplay = Column(String(1000), nullable=True)
    image = Column(String(300), nullable=True)

    reviews = relationship("Review", back_populates="game", cascade="all, delete-orphan")
