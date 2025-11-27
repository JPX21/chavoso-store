import os
from dotenv import load_dotenv

load_dotenv()  # Carrega variáveis do .env

class Settings:
    # Banco de dados
    DATABASE_URL: str = os.getenv("DATABASE_URL", "mysql+pymysql://user:password@localhost:3306/chavoso_db")
    
    # Chaves de API
    RESEND_API_KEY: str = os.getenv("RESEND_API_KEY", "")
    CONTACT_EMAIL: str = os.getenv("CONTACT_EMAIL", "contato@chavosostore.com")

    # Configurações gerais
    DEBUG: bool = os.getenv("DEBUG", "True").lower() == "true"

settings = Settings()
