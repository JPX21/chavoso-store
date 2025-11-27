import resend
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter(prefix="/contact", tags=["contact"])

class ContactMessage(BaseModel):
    name: str
    email: str
    message: str

@router.post("/")
def send_message(contact: ContactMessage):
    try:
        resend.api_key = "SUA_API_KEY_AQUI"  # coloque a sua key ou use .env

        result = resend.Emails.send({
            "from": f"{contact.name} <email@seudominio.com>",
            "to": ["seu-email@seudominio.com"],
            "subject": "Nova mensagem do site",
            "html": f"""
                <h3>Nova mensagem de contato</h3>
                <p><strong>Nome:</strong> {contact.name}</p>
                <p><strong>Email:</strong> {contact.email}</p>
                <p><strong>Mensagem:</strong> {contact.message}</p>
            """
        })

        return {"status": "success", "result": result}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
