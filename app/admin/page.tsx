"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/lib/auth-context"
import { useGames } from "@/lib/games-context"
import type { Game } from "@/lib/games-data"
import { Pencil, Trash2, Plus, Loader2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function AdminPage() {
  const router = useRouter()
  const { user, isLoading } = useAuth()
  const { games, updateGame, addGame, deleteGame } = useGames()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingGame, setEditingGame] = useState<Game | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    originalPrice: "",
    genre: "",
    description: "",
    gameplay: "",
    image: "",
  })

  useEffect(() => {
    if (!isLoading && (!user || user.email !== "admin@admin.com")) {
      router.push("/")
    }
  }, [user, isLoading, router])

  const handleEdit = (game: Game) => {
    setEditingGame(game)
    setFormData({
      title: game.title,
      price: game.price.toString(),
      originalPrice: game.originalPrice.toString(),
      genre: game.genre,
      description: game.description,
      gameplay: game.gameplay,
      image: game.image,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = (gameId: number) => {
    if (confirm("Tem certeza que deseja excluir este jogo?")) {
      deleteGame(gameId)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)

    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (editingGame) {
      updateGame(editingGame.id, {
        title: formData.title,
        price: Number.parseFloat(formData.price),
        originalPrice: Number.parseFloat(formData.originalPrice),
        genre: formData.genre,
        description: formData.description,
        gameplay: formData.gameplay,
        image: formData.image,
        discount: `-${Math.round(((Number.parseFloat(formData.originalPrice) - Number.parseFloat(formData.price)) / Number.parseFloat(formData.originalPrice)) * 100)}%`,
      })
    } else {
      const newGame: Game = {
        id: Math.max(...games.map((g) => g.id)) + 1,
        title: formData.title,
        price: Number.parseFloat(formData.price),
        originalPrice: Number.parseFloat(formData.originalPrice),
        discount: `-${Math.round(((Number.parseFloat(formData.originalPrice) - Number.parseFloat(formData.price)) / Number.parseFloat(formData.originalPrice)) * 100)}%`,
        genre: formData.genre,
        slug: formData.title.toLowerCase().replace(/\s+/g, "-"),
        description: formData.description,
        gameplay: formData.gameplay,
        image: formData.image,
        features: [],
        reviews: [],
      }
      addGame(newGame)
    }

    setIsSaving(false)
    setIsDialogOpen(false)
    resetForm()
  }

  const resetForm = () => {
    setFormData({
      title: "",
      price: "",
      originalPrice: "",
      genre: "",
      description: "",
      gameplay: "",
      image: "",
    })
    setEditingGame(null)
  }

  const handleNewGame = () => {
    resetForm()
    setIsDialogOpen(true)
  }

  if (isLoading || !user || user.email !== "admin@admin.com") {
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
      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold">Gerenciar Jogos</h1>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={handleNewGame} className="w-full sm:w-auto">
                <Plus className="mr-2 h-4 w-4" />
                Novo Jogo
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto mx-4">
              <DialogHeader>
                <DialogTitle>{editingGame ? "Editar Jogo" : "Novo Jogo"}</DialogTitle>
                <DialogDescription>
                  {editingGame ? "Atualize as informações do jogo" : "Adicione um novo jogo à loja"}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Título</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Preço (R$)</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="originalPrice">Preço Original (R$)</Label>
                    <Input
                      id="originalPrice"
                      type="number"
                      step="0.01"
                      value={formData.originalPrice}
                      onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="genre">Gênero</Label>
                  <Input
                    id="genre"
                    value={formData.genre}
                    onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image">URL da Imagem</Label>
                  <Input
                    id="image"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="/caminho/para/imagem.jpg"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={4}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gameplay">Jogabilidade</Label>
                  <Textarea
                    id="gameplay"
                    value={formData.gameplay}
                    onChange={(e) => setFormData({ ...formData, gameplay: e.target.value })}
                    rows={4}
                    required
                  />
                </div>

                <div className="flex gap-2 justify-end">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setIsDialogOpen(false)
                      resetForm()
                    }}
                  >
                    Cancelar
                  </Button>
                  <Button type="submit" disabled={isSaving}>
                    {isSaving ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Salvando...
                      </>
                    ) : editingGame ? (
                      "Atualizar"
                    ) : (
                      "Criar"
                    )}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-4">
          {games.map((game) => (
            <Card key={game.id}>
              <CardHeader>
                <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                  <div className="flex flex-col sm:flex-row gap-4 w-full">
                    <img
                      src={game.image || "/placeholder.svg"}
                      alt={game.title}
                      className="w-full sm:w-24 h-32 sm:h-24 rounded object-cover"
                    />
                    <div className="flex-1">
                      <CardTitle className="text-lg md:text-xl">{game.title}</CardTitle>
                      <CardDescription className="mt-2 text-sm">
                        {game.genre} • R$ {game.price.toFixed(2)} (de R$ {game.originalPrice.toFixed(2)})
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex gap-2 w-full sm:w-auto">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(game)}
                      className="flex-1 sm:flex-none"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(game.id)}
                      className="flex-1 sm:flex-none"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-2">{game.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
