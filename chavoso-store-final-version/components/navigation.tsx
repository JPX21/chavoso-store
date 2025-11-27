"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from "next/image"
import { ShoppingCart, User, Settings, LogIn, UserPlus, Zap, LayoutDashboard, Menu, LogOut } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { useAuth } from "@/lib/auth-context"
import { useTheme } from "@/lib/theme-context"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useState, useEffect } from "react"

export function Navigation() {
  const pathname = usePathname()
  const { totalItems } = useCart()
  const { user, logout } = useAuth()
  const { isChavoso, toggleChavoso } = useTheme()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [userDropdownOpen, setUserDropdownOpen] = useState(false)
  const [loginDropdownOpen, setLoginDropdownOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const links = [
    { href: "/", label: "Sobre" },
    { href: "/jogos", label: "Jogos" },
    { href: "/contato", label: "Contato" },
  ]

  return (
    <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 md:gap-3">
            <Image
              src="/logo.png"
              alt="Chavoso Store Logo"
              width={40}
              height={40}
              className="rounded-lg md:w-[50px] md:h-[50px]"
            />
            <span className="text-lg md:text-xl font-bold text-foreground">Chavoso Store</span>
          </Link>

          {/* Desktop Navegação */}
          <div className="hidden md:flex items-center gap-6">
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

            {mounted && (
              <>
                {user ? (
                  <DropdownMenu
                    key={`user-dropdown-${mounted}`}
                    open={userDropdownOpen}
                    onOpenChange={setUserDropdownOpen}
                    modal={false}
                  >
                    <DropdownMenuTrigger asChild suppressHydrationWarning>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-sm font-medium transition-colors hover:text-primary flex items-center gap-2"
                      >
                        <User className="h-5 w-5" />
                        <span className="hidden lg:inline">{user.name.split(" ")[0]}</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56" suppressHydrationWarning>
                      <DropdownMenuItem asChild>
                        <Link href="/conta" className="flex items-center gap-2 cursor-pointer">
                          <Settings className="h-4 w-4" />
                          <span>Minha Conta</span>
                        </Link>
                      </DropdownMenuItem>
                      {user.email === "admin@admin.com" && (
                        <DropdownMenuItem asChild>
                          <Link href="/admin" className="flex items-center gap-2 cursor-pointer">
                            <LayoutDashboard className="h-4 w-4" />
                            <span>Gerenciar Jogos</span>
                          </Link>
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={toggleChavoso} className="flex items-center gap-2 cursor-pointer">
                        <Zap className={`h-4 w-4 ${isChavoso ? "text-primary" : ""}`} />
                        <span>{isChavoso ? "Desativar" : "Ativar"} Modo Chavoso</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={logout} className="flex items-center gap-2 cursor-pointer">
                        <LogOut className="h-4 w-4" />
                        <span>Sair</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <DropdownMenu
                    key={`login-dropdown-${mounted}`}
                    open={loginDropdownOpen}
                    onOpenChange={setLoginDropdownOpen}
                    modal={false}
                  >
                    <DropdownMenuTrigger asChild suppressHydrationWarning>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-sm font-medium transition-colors hover:text-primary flex items-center gap-2"
                      >
                        <User className="h-5 w-5" />
                        <span className="hidden lg:inline">Entrar</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56" suppressHydrationWarning>
                      <DropdownMenuItem asChild>
                        <Link href="/login?tab=login" className="flex items-center gap-2 cursor-pointer">
                          <LogIn className="h-4 w-4" />
                          <span>Login</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/login?tab=cadastro" className="flex items-center gap-2 cursor-pointer">
                          <UserPlus className="h-4 w-4" />
                          <span>Cadastro</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={toggleChavoso} className="flex items-center gap-2 cursor-pointer">
                        <Zap className={`h-4 w-4 ${isChavoso ? "text-primary" : ""}`} />
                        <span>{isChavoso ? "Desativar" : "Ativar"} Modo Chavoso</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </>
            )}

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

          {/* Mobile Navigation */}
          <div className="flex md:hidden items-center gap-3">
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

            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px]">
                <div className="flex flex-col gap-6 mt-8">
                  {links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`text-lg font-medium transition-colors hover:text-primary ${
                        pathname === link.href ? "text-primary" : "text-muted-foreground"
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}

                  <div className="border-t border-border pt-6 space-y-4">
                    {user ? (
                      <>
                        <Link
                          href="/conta"
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex items-center gap-3 text-lg font-medium text-muted-foreground hover:text-primary"
                        >
                          <Settings className="h-5 w-5" />
                          <span>Minha Conta</span>
                        </Link>
                        {user.email === "admin@admin.com" && (
                          <Link
                            href="/admin"
                            onClick={() => setMobileMenuOpen(false)}
                            className="flex items-center gap-3 text-lg font-medium text-muted-foreground hover:text-primary"
                          >
                            <LayoutDashboard className="h-5 w-5" />
                            <span>Gerenciar Jogos</span>
                          </Link>
                        )}
                        <button
                          onClick={() => {
                            toggleChavoso()
                            setMobileMenuOpen(false)
                          }}
                          className="flex items-center gap-3 text-lg font-medium text-muted-foreground hover:text-primary w-full text-left"
                        >
                          <Zap className={`h-5 w-5 ${isChavoso ? "text-primary" : ""}`} />
                          <span>{isChavoso ? "Desativar" : "Ativar"} Modo Chavoso</span>
                        </button>
                        <button
                          onClick={() => {
                            logout()
                            setMobileMenuOpen(false)
                          }}
                          className="flex items-center gap-3 text-lg font-medium text-muted-foreground hover:text-primary w-full text-left"
                        >
                          <LogOut className="h-5 w-5" />
                          <span>Sair</span>
                        </button>
                      </>
                    ) : (
                      <>
                        <Link
                          href="/login?tab=login"
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex items-center gap-3 text-lg font-medium text-muted-foreground hover:text-primary"
                        >
                          <LogIn className="h-5 w-5" />
                          <span>Login</span>
                        </Link>
                        <Link
                          href="/login?tab=cadastro"
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex items-center gap-3 text-lg font-medium text-muted-foreground hover:text-primary"
                        >
                          <UserPlus className="h-5 w-5" />
                          <span>Cadastro</span>
                        </Link>
                        <button
                          onClick={() => {
                            toggleChavoso()
                            setMobileMenuOpen(false)
                          }}
                          className="flex items-center gap-3 text-lg font-medium text-muted-foreground hover:text-primary w-full text-left"
                        >
                          <Zap className={`h-5 w-5 ${isChavoso ? "text-primary" : ""}`} />
                          <span>{isChavoso ? "Desativar" : "Ativar"} Modo Chavoso</span>
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}
