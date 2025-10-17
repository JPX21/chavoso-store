import { NextResponse } from "next/server"

// Simulação de banco de dados de usuários com um usuário de teste
const users = new Map([
  [
    "admin@admin.com",
    {
      id: "1",
      name: "Administrador",
      email: "admin@admin.com",
      phone: "(11) 99999-9999",
      cpf: "123.456.789-00",
      password: "admin",
    },
  ],
])

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
