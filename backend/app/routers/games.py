from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app import schemas
from app.schemas import crud
from ..dependencies import get_db

router = APIRouter(prefix="/games", tags=["games"])

@router.get("/", response_model=List[schemas.Game])
def list_games(db: Session = Depends(get_db)):
    return crud.get_all_games(db)

@router.post("/", response_model=schemas.Game)
def create_game(game: schemas.GameCreate, db: Session = Depends(get_db)):
    return crud.create_game(db, game)

@router.put("/{game_id}", response_model=schemas.Game)
def update_game(game_id: int, updates: schemas.GameUpdate, db: Session = Depends(get_db)):
    updated_game = crud.update_game(db, game_id, updates)
    if not updated_game:
        raise HTTPException(status_code=404, detail="Jogo não encontrado")
    return updated_game

@router.delete("/{game_id}")
def delete_game(game_id: int, db: Session = Depends(get_db)):
    success = crud.delete_game(db, game_id)
    if not success:
        raise HTTPException(status_code=404, detail="Jogo não encontrado")
    return {"success": True}
