import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { valor, nome } = await request.json()

    // Gerar chave PIX aleatória (simulação)
    const chavePix = `${Math.random().toString(36).substring(2, 15)}@chavoso.pix`

    // Gerar código PIX fictício (normalmente seria um QR code real)
    const codigoPix = `00020126580014br.gov.bcb.pix0136${chavePix}520400005303986540${valor.toFixed(2)}5802BR5913Chavoso Store6009SAO PAULO62070503***6304${Math.random().toString(36).substring(2, 6).toUpperCase()}`

    // Gerar QR code como data URL (simulação - em produção usaria uma biblioteca real)
    const qrCodeDataUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(codigoPix)}`

    const pixData = {
      chavePix,
      codigoPix,
      qrCode: qrCodeDataUrl,
      valor: valor.toFixed(2),
      beneficiario: "Chavoso Store LTDA",
      cnpj: "12.345.678/0001-90",
      pagador: nome,
      dataExpiracao: new Date(Date.now() + 30 * 60 * 1000).toLocaleString("pt-BR"), // 30 minutos
      identificador: `PIX${Date.now()}`,
    }

    return NextResponse.json({
      success: true,
      pix: pixData,
    })
  } catch (error) {
    console.error("[v0] Erro ao gerar PIX:", error)
    return NextResponse.json({ success: false, error: "Erro ao gerar PIX" }, { status: 500 })
  }
}
