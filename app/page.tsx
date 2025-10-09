import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Shield, Zap, CreditCard, Headphones } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const features = [
    {
      icon: Shield,
      title: "Compra Segura",
      description: "Todas as transações são protegidas e suas keys são entregues instantaneamente.",
    },
    {
      icon: Zap,
      title: "Entrega Instantânea",
      description: "Receba suas keys imediatamente após a confirmação do pagamento.",
    },
    {
      icon: CreditCard,
      title: "Melhores Preços",
      description: "Oferecemos os preços mais competitivos do mercado para jogos da Steam.",
    },
    {
      icon: Headphones,
      title: "Suporte 24/7",
      description: "Nossa equipe está sempre disponível para ajudar você.",
    },
  ]

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h1 className="text-5xl font-bold text-balance leading-tight">
            Sua Loja de Confiança para <span className="text-primary">Keys da Steam</span>
          </h1>
          <p className="text-xl text-muted-foreground text-pretty">
            Compre jogos originais da Steam com os melhores preços e entrega instantânea. Milhares de títulos
            disponíveis para você.
          </p>
          <div className="flex gap-4 justify-center pt-4">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
              <Link href="/jogos">Ver Catálogo</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/contato">Fale Conosco</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Por Que Escolher a Chavoso Store?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <Card key={feature.title} className="p-6 bg-card hover:bg-card/80 transition-colors">
              <feature.icon className="h-12 w-12 text-accent mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-card-foreground">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <Card className="p-8 bg-card">
            <h2 className="text-3xl font-bold mb-6 text-card-foreground">Sobre Nós</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                A Chavoso Store é uma loja especializada em venda de keys originais para jogos da plataforma Steam.
                Atuamos no mercado há mais de 5 anos, oferecendo aos nossos clientes as melhores ofertas e um
                atendimento de qualidade.
              </p>
              <p>
                Nossa missão é tornar os jogos mais acessíveis para todos os gamers, mantendo sempre a qualidade e
                segurança em todas as transações. Trabalhamos apenas com fornecedores autorizados e garantimos a
                autenticidade de todas as keys vendidas.
              </p>
              <p>
                Com um catálogo de milhares de títulos, desde os lançamentos mais recentes até os clássicos atemporais,
                você encontra tudo o que precisa em um só lugar. Junte-se aos milhares de clientes satisfeitos que
                confiam na Chavoso Store!
              </p>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border mt-20">
        <div className="container mx-auto px-4 py-8 text-center text-muted-foreground text-sm">
          <p>© 2025 Chavoso Store. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  )
}
