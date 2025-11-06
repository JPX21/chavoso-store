"use client"

import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import type { Game } from "@/lib/games-data"
import { useState } from "react"

interface AddToCartButtonProps {
  game: Game
}

export function AddToCartButton({ game }: AddToCartButtonProps) {
  const { addToCart, items } = useCart()
  const [added, setAdded] = useState(false)
  const isInCart = items.some((item) => item.id === game.id)

  const handleAddToCart = () => {
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
    <Button
      size="lg"
      className="w-full bg-primary hover:bg-primary/90 text-lg"
      onClick={handleAddToCart}
      disabled={isInCart}
    >
      <ShoppingCart className="h-5 w-5 mr-2" />
      {isInCart ? "Já está no Carrinho" : added ? "Adicionado ao Carrinho!" : "Adicionar ao Carrinho"}
    </Button>
  )
}
