import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { valor, nome, cpf } = await request.json()

    // Gerar código de barras fictício (44 dígitos)
    const codigoBarras = generateBarcode()

    // Gerar linha digitável (47 dígitos com espaços)
    const linhaDigitavel = formatLinhaDigitavel(codigoBarras)

    // Data de vencimento (3 dias úteis a partir de hoje)
    const dataVencimento = new Date()
    dataVencimento.setDate(dataVencimento.getDate() + 3)

    // Número do documento
    const numeroDocumento = Math.floor(Math.random() * 1000000)
      .toString()
      .padStart(10, "0")

    return NextResponse.json({
      success: true,
      boleto: {
        codigoBarras,
        linhaDigitavel,
        dataVencimento: dataVencimento.toLocaleDateString("pt-BR"),
        valor: valor.toFixed(2),
        beneficiario: "Chavoso Store LTDA",
        cnpj: "12.345.678/0001-90",
        pagador: nome,
        cpfPagador: cpf,
        numeroDocumento,
        nossoNumero: Math.floor(Math.random() * 100000000)
          .toString()
          .padStart(11, "0"),
        agencia: "1234-5",
        conta: "67890-1",
      },
    })
  } catch (error) {
    console.error("[v0] Erro ao gerar boleto:", error)
    return NextResponse.json({ success: false, error: "Erro ao gerar boleto" }, { status: 500 })
  }
}

function generateBarcode(): string {
  // Formato simplificado de código de barras bancário
  // Banco (3) + Moeda (1) + DV (1) + Fator Vencimento (4) + Valor (10) + Campo Livre (25)
  const banco = "001" // Banco do Brasil
  const moeda = "9" // Real
  const fatorVencimento = Math.floor(Math.random() * 9999)
    .toString()
    .padStart(4, "0")
  const valor = Math.floor(Math.random() * 10000000000)
    .toString()
    .padStart(10, "0")
  const campoLivre = Math.floor(Math.random() * 10 ** 25)
    .toString()
    .padStart(25, "0")
  const dv = Math.floor(Math.random() * 10).toString()

  return banco + moeda + dv + fatorVencimento + valor + campoLivre
}

function formatLinhaDigitavel(codigoBarras: string): string {
  // Formatar código de barras em linha digitável
  // Formato: XXXXX.XXXXX XXXXX.XXXXXX XXXXX.XXXXXX X XXXXXXXXXXXXXXXX
  const parte1 = codigoBarras.substring(0, 5) + "." + codigoBarras.substring(5, 10)
  const parte2 = codigoBarras.substring(10, 15) + "." + codigoBarras.substring(15, 21)
  const parte3 = codigoBarras.substring(21, 26) + "." + codigoBarras.substring(26, 32)
  const parte4 = codigoBarras.substring(32, 33)
  const parte5 = codigoBarras.substring(33, 44)

  return `${parte1} ${parte2} ${parte3} ${parte4} ${parte5}`
}
