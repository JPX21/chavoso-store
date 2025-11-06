"use client"

import type React from "react"
import { useState, use } from "react"
import { Navigation } from "@/components/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Star } from "lucide-react"
import { useGames } from "@/lib/games-context"
import type { Review } from "@/lib/games-data"
import { notFound } from "next/navigation"
import Link from "next/link"
import { useCart } from "@/lib/cart-context"
import { useAuth } from "@/lib/auth-context"

export default function GamePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const { getGameBySlug, addReview, deleteReview } = useGames()
  const game = getGameBySlug(slug)
  const { user } = useAuth()
  const { addToCart, items } = useCart()
  const [newReview, setNewReview] = useState({ rating: 5, comment: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [added, setAdded] = useState(false)

  if (!game) {
    notFound()
  }

  const reviews = game.reviews
  const averageRating = reviews.length > 0 ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length : 0
  const isAdmin = user?.email === "admin@admin.com"
  const isInCart = items.some((item) => item.id === game.id)
  const hasDiscount = game.originalPrice > game.price

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

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) {
      alert("Você precisa estar logado para deixar uma avaliação")
      return
    }

    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const review: Review = {
      id: Date.now(),
      userId: user.email,
      userName: user.name,
      rating: newReview.rating,
      comment: newReview.comment,
      date: new Date().toISOString().split("T")[0],
    }

    addReview(slug, review)
    setNewReview({ rating: 5, comment: "" })
    setIsSubmitting(false)
  }

  const handleDeleteReview = (reviewId: number) => {
    if (confirm("Tem certeza que deseja excluir esta avaliação?")) {
      deleteReview(slug, reviewId)
    }
  }

  const renderStars = (rating: number, interactive = false, onRate?: (rating: number) => void) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-5 w-5 ${star <= rating ? "fill-primary text-primary" : "text-muted-foreground"} ${interactive ? "cursor-pointer hover:fill-primary hover:text-primary" : ""}`}
            onClick={() => interactive && onRate?.(star)}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Navigation />

      <div className="container mx-auto px-4 py-8 sm:py-12">
        <Link
          href="/jogos"
          className="inline-flex items-center text-muted-foreground hover:text-primary mb-6 sm:mb-8 text-sm sm:text-base"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar para Jogos
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
          <div>
            <img src={game.image || "/placeholder.svg"} alt={game.title} className="w-full rounded-lg shadow-lg" />
          </div>

          <div className="space-y-4 sm:space-y-6">
            <div>
              <Badge variant="secondary" className="mb-2 sm:mb-3 text-xs sm:text-sm">
                {game.genre}
              </Badge>
              <h1 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4 text-balance">{game.title}</h1>
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                {renderStars(Math.round(averageRating))}
                <span className="text-xs sm:text-sm text-muted-foreground">
                  {averageRating.toFixed(1)} ({reviews.length} {reviews.length === 1 ? "avaliação" : "avaliações"})
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <div>
                {hasDiscount && (
                  <p className="text-xs sm:text-sm text-muted-foreground line-through">
                    R$ {game.originalPrice.toFixed(2)}
                  </p>
                )}
                <p className="text-3xl sm:text-4xl font-bold text-primary">R$ {game.price.toFixed(2)}</p>
              </div>
              {hasDiscount && (
                <Badge className="bg-black text-white border border-primary/20 text-base sm:text-lg px-2 sm:px-3 py-1">
                  {game.discount}
                </Badge>
              )}
            </div>

            <Button
              className="w-full bg-primary hover:bg-primary/90 text-sm sm:text-base"
              size="lg"
              onClick={handleAddToCart}
              disabled={isInCart}
            >
              {isInCart ? "No Carrinho" : added ? "Adicionado!" : "Adicionar ao Carrinho"}
            </Button>

            <Card className="p-4 sm:p-6 bg-card/50">
              <h3 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4">Recursos Principais</h3>
              <ul className="space-y-2">
                {game.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2 text-xs sm:text-sm">
                    <span className="text-primary mt-1">✓</span>
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>

        <div className="space-y-6 sm:space-y-8">
          <Card className="p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Sobre o Jogo</h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{game.description}</p>
          </Card>

          <Card className="p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Jogabilidade</h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{game.gameplay}</p>
          </Card>

          <Card className="p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Avaliações</h2>

            {user && (
              <form onSubmit={handleSubmitReview} className="mb-6 sm:mb-8 p-3 sm:p-4 border border-border rounded-lg">
                <h3 className="font-semibold mb-4 text-sm sm:text-base">Deixe sua avaliação</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-xs sm:text-sm text-muted-foreground mb-2 block">Sua nota</label>
                    {renderStars(newReview.rating, true, (rating) => setNewReview({ ...newReview, rating }))}
                  </div>
                  <div>
                    <label className="text-xs sm:text-sm text-muted-foreground mb-2 block">Seu comentário</label>
                    <Textarea
                      value={newReview.comment}
                      onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                      placeholder="Conte o que você achou do jogo..."
                      rows={4}
                      required
                      className="text-sm"
                    />
                  </div>
                  <Button type="submit" disabled={isSubmitting} className="text-sm">
                    {isSubmitting ? (
                      <>
                        <Star className="mr-2 h-4 w-4 animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      "Enviar Avaliação"
                    )}
                  </Button>
                </div>
              </form>
            )}

            <div className="space-y-4">
              {reviews.length === 0 ? (
                <p className="text-center text-muted-foreground py-8 text-sm">
                  Nenhuma avaliação ainda. Seja o primeiro!
                </p>
              ) : (
                reviews.map((review) => (
                  <div key={review.id} className="p-3 sm:p-4 border border-border rounded-lg">
                    <div className="flex items-start justify-between mb-2 gap-2">
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-sm sm:text-base truncate">{review.userName}</p>
                        <p className="text-xs sm:text-sm text-muted-foreground">
                          {new Date(review.date).toLocaleDateString("pt-BR")}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {renderStars(review.rating)}
                        {isAdmin && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteReview(review.id)}
                            className="text-destructive hover:text-destructive h-8 w-8 p-0"
                          >
                            <Star className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                    <p className="text-muted-foreground text-sm sm:text-base">{review.comment}</p>
                  </div>
                ))
              )}
            </div>
          </Card>
        </div>
      </div>

      <footer className="border-t border-border mt-12 sm:mt-20">
        <div className="container mx-auto px-4 py-6 sm:py-8 text-center text-muted-foreground text-xs sm:text-sm">
          <p>© 2025 Chavoso Store. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  )
}
