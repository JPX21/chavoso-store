# 🎮 Chavoso Store

E-commerce moderno de keys digitais de jogos Steam, desenvolvido com Next.js 15 e React 19.

O Chavoso Store é uma plataforma completa de venda de chaves digitais de jogos, oferecendo uma experiência de compra fluida e intuitiva. O sistema permite navegação por catálogo, gerenciamento de carrinho, múltiplos métodos de pagamento e sistema completo de avaliações de jogos.

## 📚 Documentação Técnica

Este projeto foi desenvolvido utilizando as tecnologias mais modernas do ecossistema React/Next.js, seguindo as melhores práticas de desenvolvimento web.

## 🎯 Objetivo e Funcionalidades

O objetivo central do Chavoso Store é proporcionar uma experiência completa de e-commerce para compra de keys digitais de jogos, com interface intuitiva, sistema de pagamentos integrado e gerenciamento administrativo robusto.

### 🛒 Funcionalidades do Cliente

- **Catálogo de Jogos**: Visualização completa de jogos disponíveis com imagens, preços, descontos e avaliações
- **Carrossel em Destaque**: Exibição automática dos jogos mais bem avaliados em formato widescreen estilo Steam
- **Páginas Individuais**: Detalhes completos de cada jogo incluindo sinopse, jogabilidade, recursos e sistema de reviews
- **Sistema de Carrinho**: Adicionar/remover jogos, aplicar cupons de desconto e gerenciar compras
- **Cupons de Desconto**: Sistema de códigos promocionais (CHAVOSO10, CHAVOSO20, PRIMEIRACOMPRA)
- **Sistema de Reviews**: Avaliação por estrelas (1-5) e comentários escritos pelos usuários
- **Gerenciamento de Reviews**: Usuários podem editar e excluir suas próprias avaliações

### 💳 Sistema de Pagamentos

- **PIX**: Geração de QR Code fictício com chave PIX para pagamento instantâneo
- **Boleto Bancário**: Geração de boleto com código de barras e linha digitável
- **Cartões**: Opções de crédito e débito (em desenvolvimento)

### 🔐 Sistema de Autenticação

- **Cadastro de Usuários**: Registro com nome completo, email, telefone e CPF
- **Login Seguro**: Autenticação com email e senha
- **Área do Cliente**: Visualização de informações pessoais e histórico de reviews
- **Perfil Administrativo**: Acesso exclusivo para gerenciamento completo da loja

### 👨‍💼 Painel Administrativo

- **Gerenciamento de Jogos**: Criar, editar e excluir jogos do catálogo
- **Edição de Preços**: Alterar valores e descontos em tempo real
- **Moderação de Reviews**: Visualizar e deletar avaliações inadequadas
- **Controle Total**: Interface intuitiva para administração completa da plataforma

### 🎨 Experiências Visuais

- **Modo Chavoso**: Tema alternativo inspirado em Matrix com cores verde e preto
- **Design Responsivo**: Interface adaptável para desktop, tablet e mobile
- **Navegação Intuitiva**: Menu hambúrguer mobile e navegação fluida entre seções

### 📧 Sistema de Contato

- **Formulário de Contato**: Envio de mensagens via email usando Resend API
- **Múltiplos Canais**: Display de email, telefone e redes sociais

### ❓ Suporte ao Cliente

- **FAQ Completo**: Seção de perguntas frequentes com accordion interativo
- **Informações da Loja**: Página "Sobre" com detalhes da empresa e diferenciais

## 💻 Arquitetura e Tecnologias

O projeto utiliza uma stack moderna e profissional, seguindo as melhores práticas de desenvolvimento.

| Componente | Tecnologia | Detalhes |
|------------|-----------|----------|
| **Framework** | Next.js 15 (App Router) | Framework React com SSR, SSG e API Routes |
| **Frontend** | React 19 | Biblioteca para construção de interfaces |
| **Linguagem** | TypeScript | Tipagem estática para maior segurança |
| **Estilização** | Tailwind CSS v4 | Framework CSS utility-first |
| **Componentes UI** | shadcn/ui + Radix UI | Componentes acessíveis e customizáveis |
| **Gerenciamento de Estado** | React Context API | Carrinho, autenticação, jogos e tema |
| **Persistência** | localStorage | Armazenamento local de dados |
| **Email** | Resend API | Envio de emails do formulário de contato |
| **APIs Externas** | ViaCEP, QR Code Generator | Busca de endereços e geração de QR codes |
| **Hospedagem** | Vercel | Deploy otimizado com Next.js |

## 🚀 Começando

### Pré-requisitos

- Node.js 18+ instalado
- npm, yarn ou pnpm

### Instalação

1. **Clone o repositório ou instale o Zip do GitHub**

\`\`\`bash
git clone [URL-DO-REPOSITORIO]
cd chavoso-store
\`\`\`

2. **Instale as dependências**

\`\`\`bash
# Usando o comando shadcn (recomendado)
npx shadcn@latest init

# Ou manualmente
npm install
\`\`\`

3. **Configure as variáveis de ambiente**

Crie um arquivo `.env.local` na raiz do projeto:

\`\`\`env
RESEND_API_KEY=sua_chave_resend
CONTACT_EMAIL=seu-email@exemplo.com
\`\`\`

4. **Execute o projeto**

\`\`\`bash
npm run dev
\`\`\`

5. **Acesse no navegador**

Abra [http://localhost:3000](http://localhost:3000)

### 🔑 Credenciais de Acesso

**Conta Administrador:**
- Email: `admin@admin.com`
- Senha: `admin`

**Cupons de Desconto Disponíveis:**
- `CHAVOSO10` - 10% de desconto
- `CHAVOSO20` - 20% de desconto
- `PRIMEIRACOMPRA` - 15% de desconto

## 📁 Estrutura do Projeto

\`\`\`
chavoso-store/
├── app/
│   ├── admin/              # Painel administrativo
│   ├── carrinho/           # Página do carrinho
│   ├── conta/              # Página de perfil do usuário
│   ├── contato/            # Página de contato
│   ├── jogos/              # Catálogo e detalhes dos jogos
│   │   └── [slug]/         # Página individual de cada jogo
│   ├── login/              # Página de login/cadastro
│   ├── api/                # API Routes do Next.js
│   │   ├── auth/           # Endpoints de autenticação
│   │   ├── buscar-cep/     # API de consulta de CEP
│   │   ├── contact/        # Envio de emails
│   │   ├── gerar-boleto/   # Geração de boletos
│   │   └── gerar-pix/      # Geração de QR codes PIX
│   ├── layout.tsx          # Layout global
│   ├── page.tsx            # Página "Sobre"
│   └── globals.css         # Estilos globais e temas
├── components/
│   ├── ui/                 # Componentes shadcn/ui
│   ├── navigation.tsx      # Barra de navegação
│   ├── game-card.tsx       # Card de jogo no catálogo
│   ├── featured-carousel.tsx # Carrossel de destaques
│   ├── add-to-cart-button.tsx # Botão adicionar ao carrinho
│   ├── boleto-modal.tsx    # Modal de boleto
│   └── pix-modal.tsx       # Modal de PIX
├── lib/
│   ├── auth-context.tsx    # Context de autenticação
│   ├── cart-context.tsx    # Context do carrinho
│   ├── games-context.tsx   # Context de jogos
│   ├── theme-context.tsx   # Context do tema (Modo Chavoso)
│   └── games-data.ts       # Dados dos jogos
├── public/
│   ├── logo.png            # Logo da loja
│   └── [imagens-jogos]     # Imagens dos jogos
├── inicio.txt              # Guia de instalação
└── README.md               # Este arquivo
\`\`\`

## 🎮 Funcionalidades Detalhadas

### Sistema de Carrinho

O carrinho utiliza React Context para gerenciar estado global com persistência em localStorage:
- Adição/remoção de itens
- Aplicação de cupons de desconto
- Cálculo automático de totais
- Badge com contador na navegação

### Sistema de Reviews

Cada jogo possui um sistema completo de avaliações:
- Avaliação por estrelas (1-5)
- Comentários escritos
- Exibição da média de avaliações
- Reviews fictícias pré-cadastradas
- Usuários podem editar/deletar suas próprias reviews
- Administradores podem deletar qualquer review

### Painel Admin

Acessível apenas para a conta `admin@admin.com`:
- Interface com abas para criar e editar jogos
- Formulários completos para todos os campos
- Alterações refletidas em tempo real no catálogo
- Moderação de reviews com botão de exclusão

### Sistema de Pagamento

**PIX:**
- Geração de QR Code via API externa
- Chave PIX aleatória copiável
- Timer de expiração (30 minutos)
- Modal com informações completas

**Boleto:**
- Código de barras e linha digitável
- Data de vencimento (3 dias)
- Dados bancários fictícios
- Opção de download em PDF

### Modo Chavoso

Tema alternativo inspirado em Matrix:
- Paleta de cores verde neon sobre preto
- Transições suaves entre temas
- Persistência da preferência no localStorage
- Toggle disponível em todas as páginas

## 📊 Tecnologias Avançadas Utilizadas

- **Server Components**: Componentes renderizados no servidor para melhor performance
- **Client Components**: Componentes interativos com estado do cliente
- **API Routes**: Endpoints serverless do Next.js
- **React Context API**: Gerenciamento de estado global
- **TypeScript**: Tipagem estática em todo o projeto
- **Tailwind CSS v4**: Sistema de design responsivo
- **React Hooks**: useState, useEffect, useContext, use (para Promises)
- **LocalStorage**: Persistência de dados no navegador

## 🔒 Segurança

- Validação de formulários no cliente e servidor
- Autenticação baseada em sessão (localStorage)
- Proteção de rotas administrativas
- Sanitização de inputs do usuário
- Variáveis de ambiente para dados sensíveis

## 🎨 Design System

O projeto utiliza um sistema de design tokens customizado:
- Paleta de cores azul/roxo para tema padrão
- Paleta verde neon para Modo Chavoso
- Tipografia com fontes Geist Sans e Geist Mono
- Componentes reutilizáveis e acessíveis
- Design responsivo mobile-first

## 🚧 Funcionalidades em Desenvolvimento

- Integração com gateway de pagamento real
- Cartão de crédito e débito
- Sistema de entrega de keys por email
- Histórico completo de compras
- Sistema de favoritos
- Comparação de jogos
- Filtros avançados no catálogo

## 📝 Licença

Este projeto foi desenvolvido para fins educacionais.

## 👥 Desenvolvedores

Felipe Moraes Toledo \\
Ian Felipe Pedroso da Silva \\
João Victor Costa Machado \\
Wendell Fossen Silva \\


---

**Chavoso Store** - A melhor loja de keys digitais de jogos! 🎮🔑
\`\`\`

```txt file="" isHidden
