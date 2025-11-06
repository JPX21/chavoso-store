"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { games as initialGames, type Game, type Review } from "./games-data"

interface GamesContextType {
  games: Game[]
  updateGame: (gameId: number, updates: Partial<Game>) => void
  addGame: (game: Game) => void
  deleteGame: (gameId: number) => void
  addReview: (gameSlug: string, review: Review) => void
  deleteReview: (gameSlug: string, reviewId: number) => void
  updateReview: (gameSlug: string, reviewId: number, updates: Partial<Review>) => void
  getGameBySlug: (slug: string) => Game | undefined
}

const GamesContext = createContext<GamesContextType | undefined>(undefined)

export function GamesProvider({ children }: { children: React.ReactNode }) {
  const [games, setGames] = useState<Game[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem("chavoso-games")
    if (stored) {
      try {
        setGames(JSON.parse(stored))
      } catch {
        setGames(initialGames)
      }
    } else {
      setGames(initialGames)
    }
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("chavoso-games", JSON.stringify(games))
    }
  }, [games, isLoaded])

  const updateGame = (gameId: number, updates: Partial<Game>) => {
    setGames((prev) => prev.map((game) => (game.id === gameId ? { ...game, ...updates } : game)))
  }

  const addGame = (game: Game) => {
    setGames((prev) => [...prev, game])
  }

  const deleteGame = (gameId: number) => {
    setGames((prev) => prev.filter((game) => game.id !== gameId))
  }

  const addReview = (gameSlug: string, review: Review) => {
    setGames((prev) =>
      prev.map((game) => (game.slug === gameSlug ? { ...game, reviews: [review, ...game.reviews] } : game)),
    )
  }

  const deleteReview = (gameSlug: string, reviewId: number) => {
    setGames((prev) =>
      prev.map((game) =>
        game.slug === gameSlug ? { ...game, reviews: game.reviews.filter((r) => r.id !== reviewId) } : game,
      ),
    )
  }

  const updateReview = (gameSlug: string, reviewId: number, updates: Partial<Review>) => {
    setGames((prev) =>
      prev.map((game) =>
        game.slug === gameSlug
          ? { ...game, reviews: game.reviews.map((r) => (r.id === reviewId ? { ...r, ...updates } : r)) }
          : game,
      ),
    )
  }

  const getGameBySlug = (slug: string) => {
    return games.find((game) => game.slug === slug)
  }

  return (
    <GamesContext.Provider
      value={{ games, updateGame, addGame, deleteGame, addReview, deleteReview, updateReview, getGameBySlug }}
    >
      {children}
    </GamesContext.Provider>
  )
}

export function useGames() {
  const context = useContext(GamesContext)
  if (context === undefined) {
    throw new Error("useGames must be used within a GamesProvider")
  }
  return context
}
