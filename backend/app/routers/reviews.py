from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from .. import schemas
from app.schemas import crud
from ..dependencies import get_db

router = APIRouter(prefix="/reviews", tags=["reviews"])

@router.get("/game/{game_id}", response_model=List[schemas.ReviewRead])
def list_reviews(game_id: int, db: Session = Depends(get_db)):
    return crud.get_reviews_by_game(db, game_id)

@router.post("/", response_model=schemas.ReviewRead)
def create_review(review: schemas.ReviewCreate, db: Session = Depends(get_db)):
    return crud.create_review(db, review)

@router.put("/{review_id}", response_model=schemas.ReviewRead)
def update_review(review_id: int, updates: schemas.ReviewUpdate, db: Session = Depends(get_db)):
    updated = crud.update_review(db, review_id, updates)
    if not updated:
        raise HTTPException(status_code=404, detail="Review não encontrada")
    return updated

@router.delete("/{review_id}")
def delete_review(review_id: int, db: Session = Depends(get_db)):
    success = crud.delete_review(db, review_id)
    if not success:
        raise HTTPException(status_code=404, detail="Review não encontrada")
    return {"success": True}
