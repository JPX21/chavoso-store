"use client"

import { useState, useEffect } from "react"
import type { Game } from "@/lib/games-data"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { useRouter } from "next/navigation"

interface FeaturedCarouselProps {
  games: Game[]
}

export function FeaturedCarousel({ games }: FeaturedCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const { addToCart } = useCart()
  const router = useRouter()

  useEffect(() => {
    if (games.length === 0) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % games.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [games.length])

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % games.length)
  }

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + games.length) % games.length)
  }

  const goToIndex = (index: number) => {
    setCurrentIndex(index)
  }

  const currentGame = games[currentIndex]

  if (!currentGame) {
    return null
  }

  const handleAddToCart = () => {
    addToCart(currentGame, )
  }

  const handleViewDetails = () => {
    router.push(`/jogos/${currentGame.slug}`)
  }

  return (
    <div className="relative w-full">
      {/* Main Featured Game */}
      <div className="relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[550px] rounded-lg overflow-hidden mb-4">
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-700"
          style={{
            backgroundImage: `url(${currentGame.image})`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent" />
        </div>

        {/* conteudo */}
        <div className="relative h-full flex flex-col justify-end p-4 sm:p-6 md:p-8 lg:p-10">
          <div className="max-w-2xl">
            <Badge className="mb-2 md:mb-3 bg-primary/20 text-primary border-primary/30 text-xs sm:text-sm">
              {currentGame.genre}
            </Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-4 text-white text-balance">
              {currentGame.title}
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-gray-200 mb-4 md:mb-6 line-clamp-2 sm:line-clamp-3 leading-relaxed">
              {currentGame.description}
            </p>

            <div className="flex flex-wrap items-center gap-2 sm:gap-3 md:gap-4 mb-4 md:mb-6">
              <div className="flex items-center gap-2 sm:gap-3">
                {currentGame.discount !== "0%" && (
                  <>
                    <Badge className="bg-black text-white border border-white/20 text-sm sm:text-base md:text-lg px-2 sm:px-3 py-0.5 sm:py-1">
                      {currentGame.discount}
                    </Badge>
                    <span className="text-gray-400 line-through text-sm sm:text-base md:text-lg">
                      R$ {currentGame.originalPrice.toFixed(2)}
                    </span>
                  </>
                )}
                <span className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                  R$ {currentGame.price.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <Button
                onClick={handleAddToCart}
                size="lg"
                className="bg-primary hover:bg-primary/90 text-sm sm:text-base"
              >
                <ShoppingCart className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                Adicionar ao Carrinho
              </Button>
              <Button
                onClick={handleViewDetails}
                variant="outline"
                size="lg"
                className="bg-white/10 hover:bg-white/20 text-white border-white/30 text-sm sm:text-base"
              >
                Ver Detalhes
              </Button>
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <Button
          onClick={goToPrev}
          variant="ghost"
          size="icon"
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white h-8 w-8 sm:h-10 sm:w-10"
        >
          <ChevronLeft className="h-4 w-4 sm:h-6 sm:w-6" />
        </Button>
        <Button
          onClick={goToNext}
          variant="ghost"
          size="icon"
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white h-8 w-8 sm:h-10 sm:w-10"
        >
          <ChevronRight className="h-4 w-4 sm:h-6 sm:w-6" />
        </Button>
      </div>

      {/* Thumbnail Strip */}
      <div className="flex gap-1 sm:gap-2 overflow-x-auto scrollbar-hide pb-2">
        {games.map((game, index) => (
          <button
            key={game.id}
            onClick={() => goToIndex(index)}
            className={`relative flex-shrink-0 w-24 sm:w-32 md:w-40 h-16 sm:h-20 md:h-24 rounded overflow-hidden transition-all duration-300 ${
              index === currentIndex ? "ring-2 ring-primary scale-105 opacity-100" : "opacity-60 hover:opacity-80"
            }`}
          >
            <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${game.image})` }} />
            {index === currentIndex && <div className="absolute inset-0 border-2 border-primary" />}
          </button>
        ))}
      </div>
    </div>
  )
}
