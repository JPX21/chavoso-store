import { NextResponse } from "next/server"

// Simulação de banco de dados de usuários
const users = new Map()

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    // Busca usuário no "banco de dados"
    const user = users.get(email)

    if (!user || user.password !== password) {
      return NextResponse.json({ error: "Credenciais inválidas" }, { status: 401 })
    }

    // Remove a senha antes de retornar
    const { password: _, ...userWithoutPassword } = user

    return NextResponse.json({
      success: true,
      user: userWithoutPassword,
    })
  } catch (error) {
    console.error("Erro no login:", error)
    return NextResponse.json({ error: "Erro ao processar login" }, { status: 500 })
  }
}
