"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from "next/image"
import { ShoppingCart, User } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { useAuth } from "@/lib/auth-context"
import { Badge } from "@/components/ui/badge"

export function Navigation() {
  const pathname = usePathname()
  const { totalItems } = useCart()
  const { user } = useAuth()

  const links = [
    { href: "/", label: "Sobre" },
    { href: "/jogos", label: "Jogos" },
    { href: "/contato", label: "Contato" },
  ]

  return (
    <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo.jpeg" alt="Chavoso Store Logo" width={50} height={50} className="rounded-lg" />
            <span className="text-xl font-bold text-foreground">Chavoso Store</span>
          </Link>

          <div className="flex items-center gap-6">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname === link.href ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href={user ? "/conta" : "/login"}
              className={`text-sm font-medium transition-colors hover:text-primary flex items-center gap-2 ${
                pathname === "/login" || pathname === "/conta" ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <User className="h-5 w-5" />
              {user && <span className="hidden md:inline">{user.name.split(" ")[0]}</span>}
            </Link>
            <Link
              href="/carrinho"
              className={`relative text-sm font-medium transition-colors hover:text-primary ${
                pathname === "/carrinho" ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                  {totalItems}
                </Badge>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
