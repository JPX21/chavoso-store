from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from datetime import datetime, timedelta
import random

router = APIRouter(prefix="/pix", tags=["pix"])

class PixRequest(BaseModel):
    valor: float
    nome: str

@router.post("/")
def gerar_pix(data: PixRequest):
    try:
        chave_pix = f"{random.randint(10000000, 99999999)}@chavoso.pix"
        codigo_pix = f"00020126580014br.gov.bcb.pix0136{chave_pix}520400005303986540{data.valor:.2f}5802BR5913Chavoso Store6009SAO PAULO62070503***6304{random.randint(1000,9999)}"
        qr_code_url = f"https://api.qrserver.com/v1/create-qr-code/?size=300x300&data={codigo_pix}"
        return {
            "success": True,
            "pix": {
                "chavePix": chave_pix,
                "codigoPix": codigo_pix,
                "qrCode": qr_code_url,
                "valor": data.valor,
                "beneficiario": "Chavoso Store LTDA",
                "cnpj": "12.345.678/0001-90",
                "pagador": data.nome,
                "dataExpiracao": (datetime.now() + timedelta(minutes=30)).strftime("%d/%m/%Y %H:%M:%S"),
                "identificador": f"PIX{int(datetime.now().timestamp())}"
            }
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro ao gerar PIX: {e}")
