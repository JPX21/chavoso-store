"use client"

import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/lib/cart-context"
import { Trash2, Tag, Loader2 } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { BoletoModal } from "@/components/boleto-modal"

interface ShippingOption {
  name: string
  price: number
  days: number
  description: string
}

interface BoletoData {
  codigoBarras: string
  linhaDigitavel: string
  dataVencimento: string
  valor: string
  beneficiario: string
  cnpj: string
  pagador: string
  cpfPagador: string
  numeroDocumento: string
  nossoNumero: string
  agencia: string
  conta: string
}

export default function CarrinhoPage() {
  const { items, removeFromCart, totalPrice, clearCart } = useCart()
  const [cupom, setCupom] = useState("")
  const [cupomAplicado, setCupomAplicado] = useState(false)
  const [desconto, setDesconto] = useState(0)
  const [metodoPagamento, setMetodoPagamento] = useState("pix")
  const [boletoModalOpen, setBoletoModalOpen] = useState(false)
  const [boletoData, setBoletoData] = useState<BoletoData | null>(null)
  const [loadingBoleto, setLoadingBoleto] = useState(false)

  const finalizarCompra = async () => {
    if (metodoPagamento === "boleto") {
      setLoadingBoleto(true)
      try {
        const response = await fetch("/api/gerar-boleto", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            valor: total,
            nome: "Cliente Chavoso Store",
            cpf: "123.456.789-00",
          }),
        })

        if (!response.ok) {
          throw new Error("Erro ao gerar boleto")
        }

        const data = await response.json()
        if (data.success) {
          setBoletoData(data.boleto)
          setBoletoModalOpen(true)
        }
      } catch (error) {
        console.error("[v0] Erro ao gerar boleto:", error)
        alert("Erro ao gerar boleto. Tente novamente.")
      } finally {
        setLoadingBoleto(false)
      }
    } else {
      alert(`Compra finalizada com ${metodoPagamento}! Total: R$ ${total.toFixed(2)}`)
      clearCart()
    }
  }

  const aplicarCupom = () => {
    const cupons: Record<string, number> = {
      CHAVOSO10: 0.1,
      CHAVOSO20: 0.2,
      PRIMEIRACOMPRA: 0.15,
    }

    const descontoPercentual = cupons[cupom.toUpperCase()]
    if (descontoPercentual) {
      setDesconto(totalPrice * descontoPercentual)
      setCupomAplicado(true)
    } else {
      alert("Cupom inválido!")
    }
  }

  const total = totalPrice - desconto

  if (items.length === 0) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="container mx-auto px-4 py-12">
          <Card className="p-12 text-center">
            <h2 className="text-2xl font-bold mb-4">Seu carrinho está vazio</h2>
            <p className="text-muted-foreground mb-6">Adicione jogos ao carrinho para continuar</p>
            <Link href="/jogos">
              <Button>Ver Jogos</Button>
            </Link>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Navigation />

      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">Carrinho de Compras</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <Card key={item.id} className="p-4">
                <div className="flex gap-4">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    className="w-24 h-24 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.genre}</p>
                    <p className="text-xl font-bold text-primary mt-2">R$ {item.price.toFixed(2)}</p>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.id)}>
                    <Trash2 className="h-5 w-5 text-destructive" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <Tag className="h-5 w-5" />
                Cupom de Desconto
              </h3>
              <div className="flex gap-2">
                <Input
                  placeholder="Digite o cupom"
                  value={cupom}
                  onChange={(e) => setCupom(e.target.value)}
                  disabled={cupomAplicado}
                />
                <Button onClick={aplicarCupom} disabled={cupomAplicado}>
                  {cupomAplicado ? "Aplicado" : "Aplicar"}
                </Button>
              </div>
              {cupomAplicado && <p className="text-sm text-green-600 mt-2">Cupom aplicado com sucesso!</p>}
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold text-lg mb-4">Método de Pagamento</h3>
              <RadioGroup value={metodoPagamento} onValueChange={setMetodoPagamento}>
                <div className="flex items-center space-x-2 mb-3">
                  <RadioGroupItem value="pix" id="pix" />
                  <Label htmlFor="pix" className="cursor-pointer">
                    PIX (5% de desconto)
                  </Label>
                </div>
                <div className="flex items-center space-x-2 mb-3">
                  <RadioGroupItem value="credito" id="credito" />
                  <Label htmlFor="credito" className="cursor-pointer">
                    Cartão de Crédito
                  </Label>
                </div>
                <div className="flex items-center space-x-2 mb-3">
                  <RadioGroupItem value="debito" id="debito" />
                  <Label htmlFor="debito" className="cursor-pointer">
                    Cartão de Débito
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="boleto" id="boleto" />
                  <Label htmlFor="boleto" className="cursor-pointer">
                    Boleto Bancário
                  </Label>
                </div>
              </RadioGroup>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold text-lg mb-4">Resumo do Pedido</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>R$ {totalPrice.toFixed(2)}</span>
                </div>
                {desconto > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Desconto</span>
                    <span>- R$ {desconto.toFixed(2)}</span>
                  </div>
                )}
                <Separator className="my-2" />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-primary">R$ {total.toFixed(2)}</span>
                </div>
              </div>
              <Button className="w-full mt-6" size="lg" onClick={finalizarCompra} disabled={loadingBoleto}>
                {loadingBoleto ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Gerando Boleto...
                  </>
                ) : (
                  "Finalizar Compra"
                )}
              </Button>
            </Card>
          </div>
        </div>
      </div>

      <BoletoModal open={boletoModalOpen} onOpenChange={setBoletoModalOpen} boleto={boletoData} />

      <footer className="border-t border-border mt-20">
        <div className="container mx-auto px-4 py-8 text-center text-muted-foreground text-sm">
          <p>© 2025 Chavoso Store. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  )
}
