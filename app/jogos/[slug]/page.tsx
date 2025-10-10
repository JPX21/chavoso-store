"use client"

import type React from "react"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Star, Loader2, Trash2 } from "lucide-react"
import { useGames } from "@/lib/games-context"
import type { Review } from "@/lib/games-data"
import { notFound } from "next/navigation"
import Link from "next/link"
import { AddToCartButton } from "@/components/add-to-cart-button"
import { useAuth } from "@/lib/auth-context"

export default function GamePage({ params }: { params: { slug: string } }) {
  const { getGameBySlug, addReview, deleteReview } = useGames()
  const game = getGameBySlug(params.slug)
  const { user } = useAuth()
  const [newReview, setNewReview] = useState({ rating: 5, comment: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (!game) {
    notFound()
  }

  const reviews = game.reviews
  const averageRating = reviews.length > 0 ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length : 0
  const isAdmin = user?.email === "admin@admin.com"

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

    addReview(params.slug, review)
    setNewReview({ rating: 5, comment: "" })
    setIsSubmitting(false)
  }

  const handleDeleteReview = (reviewId: number) => {
    if (confirm("Tem certeza que deseja excluir esta avaliação?")) {
      deleteReview(params.slug, reviewId)
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
              <div className="flex items-center gap-2 mb-4">
                {renderStars(Math.round(averageRating))}
                <span className="text-sm text-muted-foreground">
                  {averageRating.toFixed(1)} ({reviews.length} {reviews.length === 1 ? "avaliação" : "avaliações"})
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div>
                <p className="text-sm text-muted-foreground line-through">R$ {game.originalPrice.toFixed(2)}</p>
                <p className="text-4xl font-bold text-primary">R$ {game.price.toFixed(2)}</p>
              </div>
              <Badge className="bg-black text-white border border-primary/20 text-lg px-3 py-1">{game.discount}</Badge>
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

          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-6">Avaliações</h2>

            {user && (
              <form onSubmit={handleSubmitReview} className="mb-8 p-4 border border-border rounded-lg">
                <h3 className="font-semibold mb-4">Deixe sua avaliação</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 block">Sua nota</label>
                    {renderStars(newReview.rating, true, (rating) => setNewReview({ ...newReview, rating }))}
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 block">Seu comentário</label>
                    <Textarea
                      value={newReview.comment}
                      onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                      placeholder="Conte o que você achou do jogo..."
                      rows={4}
                      required
                    />
                  </div>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
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
                <p className="text-center text-muted-foreground py-8">Nenhuma avaliação ainda. Seja o primeiro!</p>
              ) : (
                reviews.map((review) => (
                  <div key={review.id} className="p-4 border border-border rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-semibold">{review.userName}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(review.date).toLocaleDateString("pt-BR")}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        {renderStars(review.rating)}
                        {isAdmin && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteReview(review.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                    <p className="text-muted-foreground">{review.comment}</p>
                  </div>
                ))
              )}
            </div>
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
