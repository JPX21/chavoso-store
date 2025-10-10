"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/lib/auth-context"
import { LogOut, Mail, Phone, User, CreditCard, Star, Pencil, Trash2 } from "lucide-react"
import { games, type Review } from "@/lib/games-data"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export default function AccountPage() {
  const router = useRouter()
  const { user, logout, isLoading } = useAuth()
  const [userReviews, setUserReviews] = useState<(Review & { gameTitle: string; gameSlug: string })[]>([])
  const [editingReview, setEditingReview] = useState<Review | null>(null)
  const [editComment, setEditComment] = useState("")
  const [editRating, setEditRating] = useState(5)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    }

    if (user) {
      const reviews: (Review & { gameTitle: string; gameSlug: string })[] = []
      games.forEach((game) => {
        game.reviews.forEach((review) => {
          if (review.userId === user.email) {
            reviews.push({
              ...review,
              gameTitle: game.title,
              gameSlug: game.slug,
            })
          }
        })
      })
      setUserReviews(reviews)
    }
  }, [user, isLoading, router])

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  const handleEditReview = (review: Review & { gameTitle: string; gameSlug: string }) => {
    setEditingReview(review)
    setEditComment(review.comment)
    setEditRating(review.rating)
    setIsDialogOpen(true)
  }

  const handleSaveEdit = () => {
    if (editingReview) {
      setUserReviews(
        userReviews.map((r) => (r.id === editingReview.id ? { ...r, comment: editComment, rating: editRating } : r)),
      )
      setIsDialogOpen(false)
      setEditingReview(null)
    }
  }

  const handleDeleteReview = (reviewId: number) => {
    if (confirm("Tem certeza que deseja excluir esta avaliação?")) {
      setUserReviews(userReviews.filter((r) => r.id !== reviewId))
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

  if (isLoading || !user) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="container mx-auto px-4 py-12">
          <p className="text-center">Carregando...</p>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-balance">Minha Conta</h1>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Sair
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Informações Pessoais</CardTitle>
              <CardDescription>Seus dados cadastrados na Chavoso Store</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <User className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Nome</p>
                  <p className="font-medium">{user.name}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{user.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <Phone className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Telefone</p>
                  <p className="font-medium">{user.phone}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <CreditCard className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">CPF</p>
                  <p className="font-medium">{user.cpf}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Minhas Avaliações</CardTitle>
              <CardDescription>Avaliações que você deixou nos jogos</CardDescription>
            </CardHeader>
            <CardContent>
              {userReviews.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-8">
                  Você ainda não deixou nenhuma avaliação
                </p>
              ) : (
                <div className="space-y-4">
                  {userReviews.map((review) => (
                    <div key={review.id} className="p-4 border border-border rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <p className="font-semibold">{review.gameTitle}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(review.date).toLocaleDateString("pt-BR")}
                          </p>
                          <div className="mt-2">{renderStars(review.rating)}</div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" onClick={() => handleEditReview(review)}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleDeleteReview(review.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <p className="text-muted-foreground">{review.comment}</p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Histórico de Compras</CardTitle>
              <CardDescription>Suas compras recentes</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground text-center py-8">Você ainda não realizou nenhuma compra</p>
            </CardContent>
          </Card>
        </div>
      </main>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Avaliação</DialogTitle>
            <DialogDescription>Atualize sua avaliação do jogo</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Sua nota</label>
              {renderStars(editRating, true, setEditRating)}
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Seu comentário</label>
              <Textarea value={editComment} onChange={(e) => setEditComment(e.target.value)} rows={4} />
            </div>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleSaveEdit}>Salvar</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
