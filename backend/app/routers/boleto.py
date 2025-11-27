from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from datetime import datetime, timedelta
import random

router = APIRouter(prefix="/boleto", tags=["boleto"])

class BoletoRequest(BaseModel):
    valor: float
    nome: str
    cpf: str

@router.post("/")
def gerar_boleto(data: BoletoRequest):
    try:
        codigo_barras = ''.join([str(random.randint(0, 9)) for _ in range(44)])
        linha_digitavel = f"{codigo_barras[:5]}.{codigo_barras[5:10]} {codigo_barras[10:15]}.{codigo_barras[15:21]} {codigo_barras[21:26]}.{codigo_barras[26:32]} {codigo_barras[32]} {codigo_barras[33:]}"
        data_vencimento = (datetime.now() + timedelta(days=3)).strftime("%d/%m/%Y")
        numero_documento = str(random.randint(0, 999999)).zfill(10)
        return {
            "success": True,
            "boleto": {
                "codigoBarras": codigo_barras,
                "linhaDigitavel": linha_digitavel,
                "dataVencimento": data_vencimento,
                "valor": data.valor,
                "beneficiario": "Chavoso Store LTDA",
                "cnpj": "12.345.678/0001-90",
                "pagador": data.nome,
                "cpfPagador": data.cpf,
                "numeroDocumento": numero_documento,
                "nossoNumero": str(random.randint(0, 99999999)).zfill(11),
                "agencia": "1234-5",
                "conta": "67890-1"
            }
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro ao gerar boleto: {e}")
