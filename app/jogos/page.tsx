import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart } from "lucide-react"

export default function JogosPage() {
  const games = [
    {
      id: 1,
      title: "Cyberpunk 2077",
      price: "R$ 149,90",
      originalPrice: "R$ 249,90",
      discount: "-40%",
      image: "/cyberpunk-cityscape.png",
      genre: "RPG",
    },
    {
      id: 2,
      title: "Elden Ring",
      price: "R$ 179,90",
      originalPrice: "R$ 249,90",
      discount: "-28%",
      image: "/elden-ring-inspired-landscape.png",
      genre: "Action RPG",
    },
    {
      id: 3,
      title: "Red Dead Redemption 2",
      price: "R$ 129,90",
      originalPrice: "R$ 199,90",
      discount: "-35%",
      image: "/red-dead-redemption-2.jpg",
      genre: "Adventure",
    },
    {
      id: 4,
      title: "The Witcher 3",
      price: "R$ 59,90",
      originalPrice: "R$ 119,90",
      discount: "-50%",
      image: "/the-witcher-3-game.jpg",
      genre: "RPG",
    },
    {
      id: 5,
      title: "Grand Theft Auto V",
      price: "R$ 89,90",
      originalPrice: "R$ 149,90",
      discount: "-40%",
      image: "/gta-5-game.jpg",
      genre: "Action",
    },
    {
      id: 6,
      title: "Baldurs Gate 3",
      price: "R$ 199,90",
      originalPrice: "R$ 249,90",
      discount: "-20%",
      image: "/baldurs-gate-3-scene.png",
      genre: "RPG",
    },
    {
      id: 7,
      title: "Hogwarts Legacy",
      price: "R$ 169,90",
      originalPrice: "R$ 249,90",
      discount: "-32%",
      image: "/hogwarts-legacy-game.jpg",
      genre: "Adventure",
    },
    {
      id: 8,
      title: "Starfield",
      price: "R$ 189,90",
      originalPrice: "R$ 299,90",
      discount: "-37%",
      image: "/starfield-game.png",
      genre: "RPG",
    },
  ]

  return (
    <div className="min-h-screen">
      <Navigation />

      <div className="container mx-auto px-4 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Catálogo de Jogos</h1>
          <p className="text-muted-foreground text-lg">Explore nossa seleção de jogos com os melhores preços</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {games.map((game) => (
            <Card key={game.id} className="overflow-hidden bg-card hover:bg-card/80 transition-all hover:scale-105">
              <div className="relative">
                <img src={game.image || "/placeholder.svg"} alt={game.title} className="w-full h-48 object-cover" />
                <Badge className="absolute top-2 right-2 bg-destructive text-destructive-foreground">
                  {game.discount}
                </Badge>
              </div>
              <div className="p-4 space-y-3">
                <div>
                  <Badge variant="secondary" className="mb-2 text-xs">
                    {game.genre}
                  </Badge>
                  <h3 className="font-semibold text-lg text-card-foreground text-balance">{game.title}</h3>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground line-through">{game.originalPrice}</p>
                  <p className="text-2xl font-bold text-primary">{game.price}</p>
                </div>
                <Button className="w-full bg-primary hover:bg-primary/90" size="sm">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Comprar Agora
                </Button>
              </div>
            </Card>
          ))}
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
