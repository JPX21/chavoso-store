import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const cep = searchParams.get("cep")

  if (!cep || cep.length !== 8) {
    return NextResponse.json({ success: false, error: "CEP inválido" }, { status: 400 })
  }

  try {
    // Using ViaCEP API to fetch address data
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
    const data = await response.json()

    if (data.erro) {
      return NextResponse.json({ success: false, error: "CEP não encontrado" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      endereco: {
        cep: data.cep,
        logradouro: data.logradouro,
        complemento: data.complemento,
        bairro: data.bairro,
        localidade: data.localidade,
        uf: data.uf,
      },
    })
  } catch (error) {
    console.error("[v0] Erro ao buscar CEP:", error)
    return NextResponse.json({ success: false, error: "Erro ao buscar CEP" }, { status: 500 })
  }
}
