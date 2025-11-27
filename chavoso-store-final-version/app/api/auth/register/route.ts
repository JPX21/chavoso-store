import { NextResponse } from "next/server"
import { randomUUID } from "crypto"

// Simulação de banco de dados de usuários
const users = new Map()

export async function POST(request: Request) {
  try {
    const { name, email, phone, cpf, password } = await request.json()

    // Verifica se o email já está cadastrado
    if (users.has(email)) {
      return NextResponse.json({ error: "Email já cadastrado" }, { status: 400 })
    }

    // Cria novo usuário
    const newUser = {
      id: randomUUID(),
      name,
      email,
      phone,
      cpf,
      password, // Em produção, use hash de senha!
    }

    // Salva no "banco de dados"
    users.set(email, newUser)

    // Remove a senha antes de retornar
    const { password: _, ...userWithoutPassword } = newUser

    return NextResponse.json({
      success: true,
      user: userWithoutPassword,
    })
  } catch (error) {
    console.error("Erro no cadastro:", error)
    return NextResponse.json({ error: "Erro ao processar cadastro" }, { status: 500 })
  }
}
