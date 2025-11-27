"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface ThemeContextType {
  isChavoso: boolean
  toggleChavoso: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isChavoso, setIsChavoso] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem("chavoso-mode")
    if (saved === "true") {
      setIsChavoso(true)
      document.documentElement.classList.add("chavoso")
    }
  }, [])

  const toggleChavoso = () => {
    setIsChavoso((prev) => {
      const newValue = !prev
      localStorage.setItem("chavoso-mode", String(newValue))
      if (newValue) {
        document.documentElement.classList.add("chavoso")
      } else {
        document.documentElement.classList.remove("chavoso")
      }
      return newValue
    })
  }

  return <ThemeContext.Provider value={{ isChavoso, toggleChavoso }}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
