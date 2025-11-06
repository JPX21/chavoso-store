import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Shield, Zap, Headphones, CreditCard } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navigation />

      <section className="relative bg-gradient-to-b from-primary/20 to-background py-16 md:py-24 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance">Bem-vindo à Chavoso Store</h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 text-pretty">
              Sua loja de confiança para keys de jogos da Steam com os melhores preços e entrega instantânea
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-base">
                <Link href="/jogos">Ver Catálogo</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-base bg-transparent">
                <Link href="/contato">Fale Conosco</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Por que escolher a Chavoso Store?</h2>
            <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
              Oferecemos a melhor experiência em compra de jogos digitais
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            <Card className="text-center">
              <CardContent className="pt-8 pb-6 px-4">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-6 h-6 md:w-8 md:h-8 text-primary" />
                </div>
                <h3 className="text-lg md:text-xl font-semibold mb-2">Entrega Instantânea</h3>
                <p className="text-sm md:text-base text-muted-foreground">
                  Receba sua key por email imediatamente após a confirmação do pagamento
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-8 pb-6 px-4">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 md:w-8 md:h-8 text-primary" />
                </div>
                <h3 className="text-lg md:text-xl font-semibold mb-2">100% Seguro</h3>
                <p className="text-sm md:text-base text-muted-foreground">
                  Todas as keys são originais e adquiridas de distribuidores autorizados
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-8 pb-6 px-4">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CreditCard className="w-6 h-6 md:w-8 md:h-8 text-primary" />
                </div>
                <h3 className="text-lg md:text-xl font-semibold mb-2">Melhores Preços</h3>
                <p className="text-sm md:text-base text-muted-foreground">
                  Descontos exclusivos e promoções especiais todos os dias
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-8 pb-6 px-4">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Headphones className="w-6 h-6 md:w-8 md:h-8 text-primary" />
                </div>
                <h3 className="text-lg md:text-xl font-semibold mb-2">Suporte 24/7</h3>
                <p className="text-sm md:text-base text-muted-foreground">
                  Nossa equipe está sempre disponível para ajudar você
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">Sobre a Chavoso Store</h2>
            <div className="space-y-4 text-muted-foreground text-base md:text-lg leading-relaxed">
              <p>
                A Chavoso Store nasceu da paixão por jogos e do desejo de oferecer aos gamers brasileiros uma forma
                segura, rápida e econômica de adquirir seus jogos favoritos.
              </p>
              <p>
                Trabalhamos apenas com distribuidores autorizados, garantindo que todas as keys vendidas sejam 100%
                originais e funcionais. Nossa missão é democratizar o acesso aos melhores jogos do mercado com preços
                justos e atendimento de qualidade.
              </p>
              <p>
                Com anos de experiência no mercado de games, construímos uma reputação sólida baseada em confiança,
                transparência e compromisso com a satisfação dos nossos clientes.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-border mt-12 md:mt-20">
        <div className="container mx-auto px-4 py-8 text-center text-muted-foreground text-sm">
          <p>© 2025 Chavoso Store. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  )
}
