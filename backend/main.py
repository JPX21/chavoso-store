from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers import auth, contact, boleto, pix, games, reviews
from app.database import engine, Base

# Cria as tabelas no banco de dados (se estiver usando ORM)
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Chavoso Store API",
    description="API para gerenciamento de usuários, jogos, pagamentos e contato",
    version="1.0.0"
)

# Configuração de CORS
origins = [
    "http://localhost",
    "http://localhost:3000",  # front-end Next.js padrão
    "https://meusite.com",    # exemplo produção
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Incluindo routers
app.include_router(auth.router, prefix="/auth", tags=["Auth"])
app.include_router(contact.router, prefix="/contact", tags=["Contact"])
app.include_router(boleto.router, prefix="/boleto", tags=["Boleto"])
app.include_router(pix.router, prefix="/pix", tags=["PIX"])
app.include_router(games.router, prefix="/games", tags=["Games"])
app.include_router(reviews.router, prefix="/reviews", tags=["Reviews"])

@app.get("/")
async def root():
    return {"message": "Chavoso Games ta ON!"}
