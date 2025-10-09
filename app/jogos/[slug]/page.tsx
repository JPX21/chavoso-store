import { Navigation } from "@/components/navigation"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import { getGameBySlug } from "@/lib/games-data"
import { notFound } from "next/navigation"
import Link from "next/link"
import { AddToCartButton } from "@/components/add-to-cart-button"

export default function GamePage({ params }: { params: { slug: string } }) {
  const game = getGameBySlug(params.slug)

  if (!game) {
    notFound()
  }

  return (
    <div className="min-h-screen">
      <Navigation />

      <div className="container mx-auto px-4 py-12">
        <Link href="/jogos" className="inline-flex items-center text-muted-foreground hover:text-primary mb-8">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar para Jogos
        </Link>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div>
            <img src={game.image || "/placeholder.svg"} alt={game.title} className="w-full rounded-lg shadow-lg" />
          </div>

          <div className="space-y-6">
            <div>
              <Badge variant="secondary" className="mb-3">
                {game.genre}
              </Badge>
              <h1 className="text-4xl font-bold mb-4">{game.title}</h1>
            </div>

            <div className="flex items-center gap-4">
              <div>
                <p className="text-sm text-muted-foreground line-through">R$ {game.originalPrice.toFixed(2)}</p>
                <p className="text-4xl font-bold text-primary">R$ {game.price.toFixed(2)}</p>
              </div>
              <Badge className="bg-destructive text-destructive-foreground text-lg px-3 py-1">{game.discount}</Badge>
            </div>

            <AddToCartButton game={game} />

            <Card className="p-6 bg-card/50">
              <h3 className="font-semibold text-lg mb-3">Recursos Principais</h3>
              <ul className="space-y-2">
                {game.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>

        <div className="space-y-8">
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-4">Sobre o Jogo</h2>
            <p className="text-muted-foreground leading-relaxed">{game.description}</p>
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-4">Jogabilidade</h2>
            <p className="text-muted-foreground leading-relaxed">{game.gameplay}</p>
          </Card>
        </div>
      </div>

      <footer className="border-t border-border mt-20">
        <div className="container mx-auto px-4 py-8 text-center text-muted-foreground text-sm">
          <p>© 2025 Chavoso Store. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  )
}
