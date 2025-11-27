from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os

# Pegando a URL do banco de dados do .env
# Exemplo: mysql+pymysql://user:password@localhost:3306/dbname
DATABASE_URL = os.getenv("DATABASE_URL", "mysql+pymysql://root:ifsp@localhost:3306/chavoso_store")

# Criar engine do SQLAlchemy
engine = create_engine(
    DATABASE_URL,
    echo=True,  # mostra os logs SQL no console
    pool_pre_ping=True  # verifica se a conexão está ativa antes de usar
)

# Criar sessão local para interação com o DB
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base declarativa para os models
Base = declarative_base()

# Dependency para FastAPI
def get_db():
    """
    Dependency para usar nas rotas.
    Exemplo:
        def some_route(db: Session = Depends(get_db)):
            ...
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
