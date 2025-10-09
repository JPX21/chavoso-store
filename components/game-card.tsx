"use client"

import type React from "react"

import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import type { Game } from "@/lib/games-data"
import { useState } from "react"

interface GameCardProps {
  game: Game
}

export function GameCard({ game }: GameCardProps) {
  const { addToCart, items } = useCart()
  const [added, setAdded] = useState(false)
  const isInCart = items.some((item) => item.id === game.id)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    addToCart({
      id: game.id,
      title: game.title,
      price: game.price,
      image: game.image,
      genre: game.genre,
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <Link href={`/jogos/${game.slug}`}>
      <Card className="overflow-hidden bg-card hover:bg-card/80 transition-all hover:scale-105 cursor-pointer">
        <div className="relative">
          <img src={game.image || "/placeholder.svg"} alt={game.title} className="w-full h-48 object-cover" />
          <Badge className="absolute top-2 right-2 bg-destructive text-destructive-foreground">{game.discount}</Badge>
        </div>
        <div className="p-4 space-y-3">
          <div>
            <Badge variant="secondary" className="mb-2 text-xs">
              {game.genre}
            </Badge>
            <h3 className="font-semibold text-lg text-card-foreground text-balance">{game.title}</h3>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground line-through">R$ {game.originalPrice.toFixed(2)}</p>
            <p className="text-2xl font-bold text-primary">R$ {game.price.toFixed(2)}</p>
          </div>
          <Button
            className="w-full bg-primary hover:bg-primary/90"
            size="sm"
            onClick={handleAddToCart}
            disabled={isInCart}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            {isInCart ? "No Carrinho" : added ? "Adicionado!" : "Adicionar"}
          </Button>
        </div>
      </Card>
    </Link>
  )
}
