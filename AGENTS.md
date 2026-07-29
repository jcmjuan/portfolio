# Portfolio - Visão Geral do Projeto

## Stack

- **Framework:** Next.js 16 (App Router, Turbopack)
- **UI:** React 19 + TypeScript
- **Estilo:** Tailwind CSS v4 + Shadcn UI (base-nova, @base-ui/react)
- **Banco:** Supabase (Auth + PostgreSQL + Storage)
- **Email:** EmailJS (formulário de contato frontend)
- **Deploy:** Vercel
- **Fontes:** Inter (sans), Geist Mono (mono)

## Estrutura de Pastas

```
src/
├── app/
│   ├── layout.tsx              # Root layout: fonts, ThemeProvider, Header, Footer, Toaster
│   ├── page.tsx                # Home: Hero + Skills + Featured Projects + Contact CTA
│   ├── globals.css             # Dark theme (cyan/violet), prose-custom, utilitários
│   ├── not-found.tsx           # Página 404 customizada
│   ├── projects/
│   │   ├── page.tsx            # Listagem de projetos com filtro por tags
│   │   ├── filters.tsx         # Client: badges de filtro (?tag= URL params)
│   │   └── [slug]/
│   │       ├── page.tsx        # Detalhe do projeto (force-dynamic)
│   │       ├── loading.tsx     # Loading skeleton
│   │       └── error.tsx       # Error boundary
│   ├── blog/
│   │   ├── page.tsx            # Listagem de posts publicados
│   │   └── [slug]/
│   │       ├── page.tsx        # Detalhe do post (force-dynamic)
│   │       ├── loading.tsx     # Loading skeleton
│   │       └── error.tsx       # Error boundary
│   ├── contact/page.tsx        # Formulário de contato (EmailJS)
│   └── admin/
│       ├── page.tsx            # Redirect server-side → /admin/dashboard
│       ├── layout.tsx          # Server layout (force-dynamic) + AuthProvider + AdminShell
│       ├── login/page.tsx      # Login via Supabase signInWithPassword
│       └── dashboard/
│           ├── page.tsx        # Stats (Supabase counts com fallback)
│           ├── projects/       # CRUD: list, new, [id]/edit
│           └── posts/          # CRUD: list, new, [id]/edit
├── components/
│   ├── layout/                 # Header (sticky, mobile hamburger), Footer, ThemeToggle
│   ├── sections/               # Hero, Skills, FeaturedProjects (home page)
│   ├── projects/               # ProjectCard, ProjectDetailView ("use client")
│   ├── blog/                   # PostCard, PostDetailView ("use client"), MdRenderer (react-markdown)
│   ├── contact/                # ContactForm (react-hook-form + zod)
│   ├── admin/                  # AdminShell (sidebar + logout), ImageUpload
│   ├── providers/              # ThemeProvider (next-themes), AuthProvider (Supabase)
│   └── ui/                     # 11 componentes Shadcn (button, card, input, etc.)
├── lib/
│   ├── supabase/client.ts      # Browser client (createBrowserClient)
│   ├── supabase/server.ts      # Server client (async cookies)
│   ├── supabase/admin.ts       # Service role client (admin ops)
│   ├── emailjs.ts              # sendContactEmail wrapper
│   └── utils.ts                # cn, formatDate, slugify
├── hooks/use-debounce.ts       # Debounce hook
├── types/index.ts              # Project, Post, ContactFormValues, etc.
└── middleware.ts                # Proteção de rotas /admin/* (deprecated → proxy)
```

## Rotas

| Rota | Tipo | Descrição |
|---|---|---|
| `/` | Static | Home (Hero + Skills + Featured Projects) |
| `/projects` | Dynamic | Lista de projetos com filtro por tags |
| `/projects/[slug]` | Dynamic | Detalhe do projeto (force-dynamic) |
| `/blog` | Dynamic | Lista de posts publicados |
| `/blog/[slug]` | Dynamic | Detalhe do post (force-dynamic) |
| `/contact` | Static | Formulário de contato (EmailJS) |
| `/admin` | Dynamic | Redirect → /admin/dashboard |
| `/admin/login` | Dynamic | Login via Supabase Auth |
| `/admin/dashboard` | Dynamic | Painel com stats (counts) |
| `/admin/dashboard/projects` | Dynamic | CRUD projetos (list, toggle featured, delete) |
| `/admin/dashboard/projects/new` | Dynamic | Criar projeto |
| `/admin/dashboard/projects/[id]/edit` | Dynamic | Editar projeto |
| `/admin/dashboard/posts` | Dynamic | CRUD posts (list, toggle published, delete) |
| `/admin/dashboard/posts/new` | Dynamic | Criar post |
| `/admin/dashboard/posts/[id]/edit` | Dynamic | Editar post |

## Features Implementadas

- **Dark/Light mode** via next-themes (dark default)
- **Formulário de contato** com react-hook-form + zod + EmailJS
- **Blog com Markdown** (react-markdown + remark-gfm + rehype-highlight + rehype-raw)
- **Projetos com filtro** por tags via URL params
- **Área admin completa** com auth Supabase + CRUD projetos e posts
- **Middleware** protegendo rotas /admin/* (redireciona para login)
- **SEO** (generateMetadata) — todos os textos e metadata em pt-BR
- **Loading skeletons** em páginas de listing
- **Toast notifications** via sonner (mensagens em português)
- **Responsivo** com mobile hamburger menu no header
- **Supabase Storage** configurado (bucket `images` com policies de read/insert/delete)
- **Admin login redirect** — usuários logados são redirecionados para o dashboard
- **RLS completo** — posts e projetos com policies para leitura pública e escrita autenticada; posts têm policy adicional para admins lerem drafts
- **Conteúdo em português brasileiro** — toda a interface (labels, botões, validações, toasts, metadata SEO) traduzida para pt-BR
- **Slug automático** — slug sempre gerada automaticamente a partir do título (criação e edição de projetos/posts)

## Variáveis de Ambiente (.env.local)

| Variável | Onde encontrar |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase Dashboard → Settings → General → Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase Dashboard → Settings → API Keys → Publishable key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase Dashboard → Settings → API Keys → Secret key |
| `NEXT_PUBLIC_EMAILJS_SERVICE_ID` | EmailJS → Email Services → Service ID |
| `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` | EmailJS → Email Templates → Template ID |
| `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` | EmailJS → Account → Public Key |

## EmailJS Template

Variáveis usadas no template:
- `{{from_name}}` — nome do remetente
- `{{from_email}}` — email do remetente
- `{{subject}}` — assunto
- `{{message}}` — mensagem

## Supabase Schema (supabase/schema.sql)

Tabelas:
- **projects**: id, title, slug, description, full_content (MD), image_url, tags (text[]), featured, live_url, repo_url, cover_image_url, created_at
- **posts**: id, title, slug, excerpt, content (MD), cover_image_url, published, created_at

RLS: leitura pública, escrita/edit/delete restrita a usuários autenticados. Posts têm policy adicional para admins lerem drafts.

## Status Atual

- **Build:** ✅ passa sem erros (Next.js 16 Turbopack)
- **Lint:** ✅ 0 erros, 3 warnings (apenas `<img>` no blog — aceitáveis)
- **Deploy:** ✅ funcionando na Vercel
- **Admin login:** ✅ corrigido com `window.location.href` (força reload para cookie disponível ao middleware)
- **Email:** ✅ formulário funcional com EmailJS
- **Supabase Storage:** ✅ bucket `images` com policies configuradas
- **Detail pages:** ✅ corrigidas (SSG → dynamic para compatibilidade com Supabase SSR)
- **RLS posts:** ✅ admins podem ler todos os posts (incluindo drafts)
- **Admin login redirect:** ✅ usuários logados redirecionados para dashboard
- **Tradução pt-BR:** ✅ toda a interface traduzida para português brasileiro
- **Slug automático:** ✅ slug sempre gerada a partir do título (criação e edição)

## Pendências / Melhorias Futuras

- [ ] Ajustar tamanhos de fonte (usuário achou pequenas demais)
- [ ] Migrar `middleware.ts` para `proxy` (convenção do Next.js 16, middleware está deprecated)
- [ ] Substituir `<img>` por `next/image` nos componentes do blog
- [ ] Configurar Supabase Storage para imagens de projetos/posts
- [ ] Adicionar página de detalhe para `/admin` (atualmente é só redirect)
- [ ] Internacionalizar conteúdo dinâmico (títulos e descrições de projetos/posts no banco)

## Como Rodar

```bash
# 1. Instalar dependências
npm install

# 2. Copiar .env.example para .env.local e preencher as variáveis

# 3. Rodar a migration SQL no Supabase (supabase/schema.sql)

# 4. Criar usuário admin no Supabase Dashboard → Authentication → Users

# 5. Iniciar dev server
npm run dev
```

## Notas para Próxima Sessão

- O projeto está em `C:\Users\Juan.Matos\Desktop\portfolio`
- Repo GitHub já criado (fazer push com mudanças recentes)
- Deploy automático na Vercel a cada push no GitHub
- Shadcn base-nova usa `@base-ui/react` (não Radix) — componentes usam `render` prop para Links
- Páginas de detalhe (`/projects/[slug]`, `/blog/[slug]`) são dynamic (force-dynamic) — não converter para SSG
- Interface toda em pt-BR (labels, botões, toasts, metadata SEO, lang="pt-BR")
- Slug sempre auto-gerada a partir do título — editável manualmente depois de gerada
