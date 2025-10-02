"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Gamepad2 } from "lucide-react"

export function Navigation() {
  const pathname = usePathname()

  const links = [
    { href: "/", label: "Sobre" },
    { href: "/jogos", label: "Jogos" },
    { href: "/contato", label: "Contato" },
  ]

  return (
    <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold">
            <Gamepad2 className="h-6 w-6 text-primary" />
            <span className="text-foreground">Chavoso Store</span>
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
          </div>
        </div>
      </div>
    </nav>
  )
}
