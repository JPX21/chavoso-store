"use client"

import { Navigation } from "@/components/navigation"
import { useGames } from "@/lib/games-context"
import { GameCard } from "@/components/game-card"
import { Card } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { FeaturedCarousel } from "@/components/featured-carousel"

export default function JogosPage() {
  const { games } = useGames()

  const topGames = [...games]
    .sort((a, b) => {
      const avgA = a.reviews.reduce((sum, r) => sum + r.rating, 0) / (a.reviews.length || 1)
      const avgB = b.reviews.reduce((sum, r) => sum + r.rating, 0) / (b.reviews.length || 1)
      return avgB - avgA
    })
    .slice(0, 6)

  const faqs = [
    {
      question: "Como funciona a entrega das keys?",
      answer:
        "Após a confirmação do pagamento, você receberá a key do jogo instantaneamente por email e também poderá visualizá-la na sua conta. Para jogos físicos, o prazo de entrega varia de acordo com a região.",
    },
    {
      question: "As keys são originais?",
      answer:
        "Sim! Todas as keys vendidas na Chavoso Store são 100% originais e adquiridas diretamente de distribuidores autorizados. Garantimos a autenticidade de todos os produtos.",
    },
    {
      question: "Posso devolver um jogo após a compra?",
      answer:
        "Devido à natureza digital das keys, não é possível realizar devoluções após a entrega. Certifique-se de verificar os requisitos do sistema antes de comprar.",
    },
    {
      question: "Quais métodos de pagamento são aceitos?",
      answer:
        "Aceitamos PIX, Boleto Bancário e em breve cartões de crédito e débito. O pagamento via PIX é processado instantaneamente, enquanto boletos podem levar até 3 dias úteis.",
    },
    {
      question: "Como ativo a key na Steam?",
      answer:
        "Abra o cliente Steam, clique em 'Jogos' no menu superior, selecione 'Ativar um produto no Steam' e insira a key que você recebeu. O jogo será adicionado à sua biblioteca automaticamente.",
    },
    {
      question: "Posso comprar jogos de outras regiões?",
      answer:
        "Todas as keys vendidas são para a região Brasil (BR). Verifique a compatibilidade regional antes de comprar para garantir que funcionará na sua conta Steam.",
    },
    {
      question: "Quanto tempo tenho para ativar a key?",
      answer:
        "As keys não possuem prazo de validade. Você pode ativá-las na Steam a qualquer momento após a compra, sem pressa.",
    },
    {
      question: "O que fazer se a key não funcionar?",
      answer:
        "Caso tenha problemas para ativar sua key, entre em contato com nosso suporte através da página de contato. Nossa equipe está disponível 24/7 para ajudá-lo.",
    },
  ]

  return (
    <div className="min-h-screen">
      <Navigation />

      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="mb-12 md:mb-16">
          <div className="mb-6">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Jogos em Destaque</h2>
            <p className="text-muted-foreground">Os jogos mais populares e bem avaliados</p>
          </div>
          <FeaturedCarousel games={topGames} />
        </div>

        <div className="mb-12 md:mb-16">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Catálogo Completo</h1>
            <p className="text-muted-foreground text-base md:text-lg">
              Explore nossa seleção de jogos com os melhores preços
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {games.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        </div>

        <div className="mb-12">
          <Card className="p-6 md:p-8 bg-card">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Perguntas Frequentes</h2>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left text-base md:text-lg">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-sm md:text-base leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Card>
        </div>
      </div>

      <footer className="border-t border-border mt-12 md:mt-20">
        <div className="container mx-auto px-4 py-8 text-center text-muted-foreground text-sm">
          <p>© 2025 Chavoso Store. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  )
}
