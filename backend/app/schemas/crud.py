from sqlalchemy.orm import Session
from typing import List, Optional

# Importando models corretamente
from ..models.user import User
from ..models.game import Game
from ..models.review import Review
from ..schemas.user import UserCreate, UserLogin
from ..schemas.game import GameCreate
from ..schemas.review import ReviewCreate


# ----------------- USUÁRIOS -----------------

def get_user_by_email(db: Session, email: str) -> Optional[User]:
    return db.query(User).filter(User.email == email).first()


def create_user(db: Session, user: UserCreate) -> User:
    db_user = User(
        name=user.name,
        email=user.email,
        phone=user.phone,
        cpf=user.cpf,
        password=user.password  # em produção, gere hash!
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def authenticate_user(db: Session, email: str, password: str) -> Optional[User]:
    user = get_user_by_email(db, email)
    if not user:
        return None
    if user.password != password:  # SEM hash por enquanto
        return None
    return user


# ----------------- JOGOS -----------------

def get_game(db: Session, game_id: int) -> Optional[Game]:
    return db.query(Game).filter(Game.id == game_id).first()


def get_game_by_slug(db: Session, slug: str) -> Optional[Game]:
    return db.query(Game).filter(Game.slug == slug).first()


def get_all_games(db: Session) -> List[Game]:
    return db.query(Game).all()


def create_game(db: Session, game: GameCreate) -> Game:
    db_game = Game(
        title=game.title,
        price=game.price,
        original_price=game.original_price,
        discount=game.discount,
        genre=game.genre,
        slug=game.slug,
        description=game.description,
        gameplay=game.gameplay,
        image=game.image
    )
    db.add(db_game)
    db.commit()
    db.refresh(db_game)
    return db_game


def update_game(db: Session, game_id: int, updates: dict) -> Optional[Game]:
    game = get_game(db, game_id)
    if not game:
        return None

    for key, value in updates.items():
        setattr(game, key, value)

    db.commit()
    db.refresh(game)
    return game


def delete_game(db: Session, game_id: int) -> bool:
    game = get_game(db, game_id)
    if not game:
        return False

    db.delete(game)
    db.commit()
    return True


# ----------------- REVIEWS -----------------

def get_review(db: Session, review_id: int) -> Optional[Review]:
    return db.query(Review).filter(Review.id == review_id).first()


def get_reviews_by_game(db: Session, game_id: int) -> List[Review]:
    return db.query(Review).filter(Review.game_id == game_id).all()


def create_review(db: Session, review: ReviewCreate) -> Review:
    db_review = Review(
        game_id=review.game_id,
        user_id=review.user_id,
        rating=review.rating,
        comment=review.comment
    )
    db.add(db_review)
    db.commit()
    db.refresh(db_review)
    return db_review


def update_review(db: Session, review_id: int, updates: dict) -> Optional[Review]:
    review = get_review(db, review_id)

    if not review:
        return None

    for key, value in updates.items():
        setattr(review, key, value)

    db.commit()
    db.refresh(review)
    return review


def delete_review(db: Session, review_id: int) -> bool:
    review = get_review(db, review_id)

    if not review:
        return False

    db.delete(review)
    db.commit()
    return True
