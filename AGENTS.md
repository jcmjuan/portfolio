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
│   ├── page.tsx                # Home: Hero + Services + Featured Projects + About + Testimonials + Skills + CTA
│   ├── globals.css             # Dark theme (cyan/violet), prose-custom, utilitários
│   ├── not-found.tsx           # Página 404 customizada
│   ├── robots.ts               # Robots.txt dinâmico (allow /, disallow /admin/)
│   ├── sitemap.ts              # Sitemap dinâmico com projetos e posts do Supabase
│   ├── projects/
│   │   ├── page.tsx            # Listagem de projetos com filtro por tags
│   │   ├── filters.tsx         # Client: badges de filtro (?tag= URL params, acessível com role/tabIndex/onKeyDown)
│   │   └── [slug]/
│   │       ├── page.tsx        # Detalhe do projeto (force-dynamic)
│   │       ├── loading.tsx     # Loading skeleton
│   │       └── error.tsx       # Error boundary (pt-BR)
│   ├── blog/
│   │   ├── page.tsx            # Listagem de posts publicados
│   │   └── [slug]/
│   │       ├── page.tsx        # Detalhe do post (force-dynamic)
│   │       ├── loading.tsx     # Loading skeleton
│   │       └── error.tsx       # Error boundary (pt-BR)
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
│   ├── layout/                 # Header (sticky, mobile hamburger + aria-expanded), Footer, ThemeToggle
│   ├── sections/               # Hero (server component), Services, Skills, FeaturedProjects, About, Testimonials
│   ├── projects/               # ProjectCard (server component), ProjectDetailView ("use client")
│   ├── blog/                   # PostCard (server component), PostDetailView ("use client" + next/image), MdRenderer (react-markdown)
│   ├── contact/                # ContactForm (react-hook-form + zod)
│   ├── admin/                  # AdminShell (sidebar + logout), ImageUpload
│   ├── providers/              # ThemeProvider (next-themes), AuthProvider (Supabase)
│   └── ui/                     # 11 componentes Shadcn (button, card, input, etc.)
├── lib/
│   ├── env.ts                  # Server-side env validation (Proxy + zod, SOMENTE server-side)
│   ├── supabase/client.ts      # Browser client (createBrowserClient, process.env direto)
│   ├── supabase/server.ts      # Server client (async cookies, usa env.ts)
│   ├── supabase/admin.ts       # Service role client (server-only, usa env.ts)
│   ├── emailjs.ts              # sendContactEmail wrapper (process.env direto)
│   └── utils.ts                # cn, formatDate (pt-BR), slugify, getGradient
├── types/index.ts              # Project, Post, ContactFormValues, etc.
└── middleware.ts                # Proteção de rotas /admin/* (deprecated → proxy, usa env.ts)
```

## Rotas

| Rota | Tipo | Descrição |
|---|---|---|
| `/` | Static | Home (Hero + Services + Featured Projects + About + Testimonials + Skills) |
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

- **Foco freelancer** — site voltado para clientes, não recrutadores
- **Hero com foto** — placeholder de foto com ícone User (tamanhos responsivos: 96px mobile, 128px tablet, 160px desktop)
- **Seção de Serviços** — 4 cards: Sites Institucionais, Aplicações Web, E-commerce, Landing Pages
- **Seção Sobre Mim** — formação acadêmica (Técnico, Graduação, Ciência da Computação) com layout em 2 colunas alinhadas
- **Seção de Depoimentos** — 3 cards placeholder para depoimentos de clientes
- **Dark/Light mode** via next-themes (dark default)
- **Formulário de contato** com react-hook-form + zod + EmailJS
- **Blog com Markdown** (react-markdown + remark-gfm + rehype-highlight + rehype-raw)
- **Projetos com filtro** por tags via URL params (acessível: role="button", tabIndex, onKeyDown)
- **Área admin completa** com auth Supabase + CRUD projetos e posts
- **Middleware** protegendo rotas /admin/* (redireciona para login)
- **SEO** (generateMetadata) — todos os textos e metadata em pt-BR
- **Loading skeletons** em páginas de listing
- **Toast notifications** via sonner (mensagens em português)
- **Responsivo** com mobile hamburger menu no header (com aria-expanded)
- **Supabase Storage** configurado (bucket `images` com policies de read/insert/delete)
- **Admin login redirect** — usuários logados são redirecionados para o dashboard
- **RLS completo** — usa `auth.uid() IS NOT NULL` (moderno, não deprecated); posts têm policy adicional para admins lerem drafts
- **Conteúdo em português brasileiro** — toda a interface traduzida para pt-BR
- **Slug automático** — slug sempre gerada automaticamente a partir do título
- **Segurança** — headers HTTP (X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy)
- **SEO avançado** — robots.txt dinâmico + sitemap.xml dinâmico com projetos e posts
- **Server Components** — Hero, ProjectCard e PostCard são Server Components (sem "use client" desnecessário)
- **next/image** — blog post-card e post-detail usam next/image com lazy loading
- **Server-side env validation** — env.ts com Proxy + zod para validação de variáveis no server-side

## Variáveis de Ambiente (.env.local)

| Variável | Onde encontrar |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase Dashboard → Settings → General → Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase Dashboard → Settings → API Keys → Publishable key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase Dashboard → Settings → API Keys → Secret key |
| `NEXT_PUBLIC_EMAILJS_SERVICE_ID` | EmailJS → Email Services → Service ID |
| `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` | EmailJS → Email Templates → Template ID |
| `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` | EmailJS → Account → Public Key |

**Nota sobre env.ts:** O validador com Proxy (`src/lib/env.ts`) é SOMENTE para código server-side (middleware, server.ts, admin.ts). Código client-side (supabase/client.ts, emailjs.ts) usa `process.env.X!` diretamente porque o Proxy quebra no bundle do Next.js no browser (intercepta Symbols internos do React).

## EmailJS Template

Variáveis usadas no template:
- `{{from_name}}` — nome do remetente
- `{{from_email}}` — email do remetente
- `{{subject}}` — assunto
- `{{message}}` — mensagem

## Supabase Schema (supabase/schema.sql)

Tabelas:
- **projects**: id (uuid), title, slug (unique), description, full_content (MD), tags (text[]), featured (bool), live_url, repo_url, cover_image_url, created_at
- **posts**: id (uuid), title, slug (unique), excerpt, content (MD), cover_image_url, published (bool), created_at

Índices:
- `idx_projects_slug`, `idx_projects_featured`, `idx_projects_created_at` (DESC)
- `idx_posts_slug`, `idx_posts_published`, `idx_posts_published_created` (published + created_at DESC)

RLS: leitura pública, escrita/edit/delete restrita a usuários autenticados (`auth.uid() IS NOT NULL`). Posts têm policy adicional para admins lerem drafts. Policies usam `DROP POLICY IF EXISTS` para idempotência.

## Status Atual

- **Build:** ✅ passa sem erros (Next.js 16 Turbopack)
- **Lint:** ✅ 0 erros, 1 warning (apenas `<img>` no md-renderer para markdown dinâmico — aceitável)
- **Deploy:** ✅ funcionando na Vercel
- **Admin login:** ✅ corrigido com `window.location.href` (força reload para cookie disponível ao middleware)
- **Email:** ✅ formulário funcional com EmailJS
- **Supabase Storage:** ✅ bucket `images` com policies configuradas
- **Detail pages:** ✅ corrigidas (SSG → dynamic para compatibilidade com Supabase SSR)
- **RLS posts:** ✅ admins podem ler todos os posts (incluindo drafts)
- **RLS modernizado:** ✅ `auth.role()` deprecated → `auth.uid() IS NOT NULL`
- **Admin login redirect:** ✅ usuários logados redirecionados para dashboard
- **Tradução pt-BR:** ✅ toda a interface traduzida para português brasileiro
- **Slug automático:** ✅ slug sempre gerada a partir do título
- **Home page freelancer:** ✅ reestruturada com foco em clientes
- **Segurança:** ✅ headers HTTP configurados no next.config.ts
- **SEO:** ✅ robots.txt + sitemap.xml dinâmicos
- **Acessibilidade:** ✅ filtros com role/tabIndex/onKeyDown, header com aria-expanded
- **Server Components:** ✅ Hero, ProjectCard, PostCard como server components
- **Imagens:** ✅ post-card e post-detail usando next/image
- **Índices DB:** ✅ created_at e published+created_at para performance

## Pendências / Melhorias Futuras

- [ ] Ajustar tamanhos de fonte (usuário achou pequenas demais)
- [ ] Migrar `middleware.ts` para `proxy` (convenção do Next.js 16, middleware está deprecated)
- [ ] Substituir `<img>` por `next/image` no MdRenderer (markdown dinâmico — requer custom component)
- [ ] Configurar Supabase Storage para imagens de projetos/posts
- [ ] Adicionar página de detalhe para `/admin` (atualmente é só redirect)
- [ ] Internacionalizar conteúdo dinâmico (títulos e descrições de projetos/posts no banco)
- [ ] Substituir placeholder de foto no Hero por next/image com foto real
- [ ] Adicionar depoimentos reais na seção de Testimonials
- [ ] Adicionar `error.tsx` para home, contact, blog listing e rotas admin
- [ ] Adicionar JSON-LD structured data para SEO rich results
- [ ] Adicionar OpenGraph images para projetos e posts
- [ ] Migrar admin pages para Server Components (dashboard stats, list pages)
- [ ] Refatorar admin CRUD forms em componentes reutilizáveis (~750 linhas duplicadas)
- [ ] Tornar sidebar admin responsiva para mobile
- [ ] Gerar tipos Supabase database (`supabase gen types typescript`)
- [ ] Adicionar `NEXT_PUBLIC_SITE_URL` ao .env.example para sitemap/robots
- [ ] Remover hardcoded fallback stats no admin dashboard
- [ ] Atualizar social links para URLs reais de perfil

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
- Home page reestruturada para foco freelancer (clientes > recrutadores)
- Componentes sections: Hero (com foto placeholder), Services, FeaturedProjects, About, Testimonials, Skills
- Foto do Hero: placeholder circular com ícone User, futuramente substituir por next/image
- Depoimentos: 3 cards placeholder, aguardando seleção de depoimentos reais
- **env.ts é server-only** — NÃO usar em componentes client-side (use `process.env.X!` diretamente)
- **admin.ts usa server-only** — importado com `import "server-only"` para impedir uso em client components
