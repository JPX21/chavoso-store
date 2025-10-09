export interface Game {
  id: number
  title: string
  price: number
  originalPrice: number
  discount: string
  image: string
  genre: string
  slug: string
  description: string
  gameplay: string
  features: string[]
}

export const games: Game[] = [
  {
    id: 1,
    title: "Cyberpunk 2077",
    price: 149.9,
    originalPrice: 249.9,
    discount: "-40%",
    image: "/cyberpunk-cityscape.png",
    genre: "RPG",
    slug: "cyberpunk-2077",
    description:
      "Cyberpunk 2077 é um RPG de ação e aventura em mundo aberto que se passa em Night City, uma megalópole obcecada por poder, glamour e biomodificações. Você joga como V, um mercenário fora da lei em busca de um implante único que é a chave para a imortalidade.",
    gameplay:
      "Explore uma vasta cidade com seis regiões distintas, personalize seu personagem com cyberware e habilidades, e faça escolhas que moldam a história. O combate combina armas de fogo, hacking e melhorias cibernéticas em um sistema de progressão profundo.",
    features: [
      "Mundo aberto massivo e imersivo",
      "Sistema de escolhas que afeta a narrativa",
      "Customização profunda de personagem",
      "Combate dinâmico com múltiplas abordagens",
    ],
  },
  {
    id: 2,
    title: "Elden Ring",
    price: 179.9,
    originalPrice: 249.9,
    discount: "-28%",
    image: "/elden-ring-inspired-landscape.png",
    genre: "Action RPG",
    slug: "elden-ring",
    description:
      "Elden Ring é um RPG de ação e fantasia desenvolvido pela FromSoftware e publicado pela Bandai Namco. O jogo apresenta um vasto mundo aberto criado em colaboração com George R.R. Martin, autor de Game of Thrones.",
    gameplay:
      "Explore as Terras Intermédias a cavalo ou a pé, descubra masmorras complexas e enfrente chefes desafiadores. O combate exige precisão e timing, com uma variedade de armas, magias e habilidades para dominar.",
    features: [
      "Mundo aberto expansivo para explorar",
      "Combate desafiador e recompensador",
      "Criação de personagem flexível",
      "Multiplayer cooperativo e PvP",
    ],
  },
  {
    id: 3,
    title: "Red Dead Redemption 2",
    price: 129.9,
    originalPrice: 199.9,
    discount: "-35%",
    image: "/red-dead-redemption-2.jpg",
    genre: "Adventure",
    slug: "red-dead-redemption-2",
    description:
      "Red Dead Redemption 2 é um épico de ação e aventura ambientado no coração da América no alvorecer da era moderna. O jogo conta a história de Arthur Morgan e da gangue Van der Linde em fuga pela América selvagem.",
    gameplay:
      "Viva como um fora da lei no Velho Oeste, caçando recompensas, assaltando trens e explorando uma vasta fronteira americana. Cada decisão afeta a honra de Arthur e como o mundo reage a você.",
    features: [
      "Narrativa cinematográfica envolvente",
      "Mundo vivo e reativo",
      "Sistema de honra que afeta a história",
      "Atividades variadas: caça, pesca, poker",
    ],
  },
  {
    id: 4,
    title: "The Witcher 3",
    price: 59.9,
    originalPrice: 119.9,
    discount: "-50%",
    image: "/the-witcher-3-game.jpg",
    genre: "RPG",
    slug: "the-witcher-3",
    description:
      "The Witcher 3: Wild Hunt é um RPG de ação em mundo aberto baseado na série de livros de Andrzej Sapkowski. Você joga como Geralt de Rivia, um caçador de monstros profissional em busca de sua filha adotiva.",
    gameplay:
      "Explore um mundo aberto rico em detalhes, aceite contratos para caçar monstros, tome decisões moralmente complexas e domine um sistema de combate baseado em espadas e magia. Prepare poções e óleos para enfrentar criaturas perigosas.",
    features: [
      "Mais de 100 horas de conteúdo",
      "Escolhas com consequências reais",
      "Sistema de combate tático",
      "Mundo aberto visualmente deslumbrante",
    ],
  },
  {
    id: 5,
    title: "Grand Theft Auto V",
    price: 89.9,
    originalPrice: 149.9,
    discount: "-40%",
    image: "/gta-5-game.jpg",
    genre: "Action",
    slug: "grand-theft-auto-v",
    description:
      "Grand Theft Auto V é um jogo de ação e aventura em mundo aberto ambientado na cidade fictícia de Los Santos. A história segue três criminosos e seus esforços para cometer assaltos enquanto estão sob pressão de uma agência governamental.",
    gameplay:
      "Alterne entre três protagonistas únicos, cada um com habilidades e personalidades distintas. Participe de missões elaboradas, explore a cidade massiva, ou cause caos no modo livre. O GTA Online oferece experiências multiplayer contínuas.",
    features: [
      "Três protagonistas jogáveis",
      "Mundo aberto detalhado e vivo",
      "Missões de assalto elaboradas",
      "GTA Online com atualizações constantes",
    ],
  },
  {
    id: 6,
    title: "Baldurs Gate 3",
    price: 199.9,
    originalPrice: 249.9,
    discount: "-20%",
    image: "/baldurs-gate-3-scene.png",
    genre: "RPG",
    slug: "baldurs-gate-3",
    description:
      "Baldur's Gate 3 é um RPG baseado nas regras de Dungeons & Dragons 5ª edição. Reúna seu grupo e retorne aos Reinos Esquecidos em uma história de companheirismo, traição, sacrifício, sobrevivência e a tentação do poder absoluto.",
    gameplay:
      "Crie seu personagem escolhendo entre 12 classes e 11 raças, ou jogue como um dos 7 personagens de origem. O combate tático por turnos exige estratégia e uso inteligente do ambiente. Suas escolhas moldam a história e os relacionamentos.",
    features: [
      "Sistema D&D 5e autêntico",
      "Combate tático por turnos",
      "Narrativa ramificada complexa",
      "Multiplayer cooperativo para 4 jogadores",
    ],
  },
  {
    id: 7,
    title: "Hogwarts Legacy",
    price: 169.9,
    originalPrice: 249.9,
    discount: "-32%",
    image: "/hogwarts-legacy-game.jpg",
    genre: "Adventure",
    slug: "hogwarts-legacy",
    description:
      "Hogwarts Legacy é um RPG de ação em mundo aberto ambientado no universo de Harry Potter dos anos 1800. Viva a vida de um estudante em Hogwarts e descubra um mundo mágico cheio de criaturas fantásticas, poções e feitiços.",
    gameplay:
      "Aprenda feitiços, prepare poções, domestique criaturas mágicas e aprimore seus talentos para se tornar o bruxo que deseja ser. Explore Hogwarts, Hogsmeade e as Terras Altas Escocesas enquanto desvenda uma conspiração que ameaça o mundo bruxo.",
    features: [
      "Explore Hogwarts e arredores",
      "Sistema de magia profundo",
      "Criação e customização de personagem",
      "História original no universo Harry Potter",
    ],
  },
  {
    id: 8,
    title: "Starfield",
    price: 189.9,
    originalPrice: 299.9,
    discount: "-37%",
    image: "/starfield-game.png",
    genre: "RPG",
    slug: "starfield",
    description:
      "Starfield é o primeiro novo universo da Bethesda em 25 anos. Neste RPG de próxima geração ambientado entre as estrelas, crie qualquer personagem que desejar e explore com liberdade sem precedentes enquanto embarca em uma jornada épica para responder o maior mistério da humanidade.",
    gameplay:
      "Explore mais de 1000 planetas, personalize sua nave espacial, junte-se a facções e faça escolhas que moldam sua jornada. O combate combina armas futuristas com poderes especiais, e você pode construir bases em diferentes planetas.",
    features: [
      "Mais de 1000 planetas para explorar",
      "Customização profunda de naves",
      "Sistema de construção de bases",
      "Combate espacial e terrestre",
    ],
  },
]

export function getGameBySlug(slug: string): Game | undefined {
  return games.find((game) => game.slug === slug)
}
