# Portfólio — Juan Carlos Matos

Portfólio freelancer construído com Next.js 16 (App Router + Turbopack), React 19, TypeScript, Tailwind CSS v4 e Shadcn UI (base-nova, `@base-ui/react`). Conteúdo gerenciado via Supabase (PostgreSQL + Auth + Storage) e contato via EmailJS.

## Stack

- **Framework:** Next.js 16 (App Router, Turbopack)
- **UI:** React 19 + TypeScript + Tailwind CSS v4 + Shadcn UI
- **Banco:** Supabase (Auth + PostgreSQL + Storage)
- **Email:** EmailJS (formulário de contato frontend)
- **Deploy:** Vercel
- **Fontes:** Geist (sans), Geist Mono (mono)

## Rotas

| Rota | Tipo | Descrição |
|---|---|---|
| `/` | ISR (1h) | Home (Hero + Services + Featured Projects + About + Testimonials + Skills) |
| `/projects` | Dynamic | Lista de projetos com filtro por tags |
| `/projects/[slug]` | Dynamic | Detalhe do projeto (force-dynamic) |
| `/blog` | ISR (1h) | Lista de posts publicados |
| `/blog/[slug]` | Dynamic | Detalhe do post (force-dynamic) |
| `/contact` | Static | Formulário de contato (EmailJS + honeypot + cooldown) |
| `/admin` | Dynamic | Redirect → `/admin/dashboard` |
| `/admin/login` | Dynamic | Login via Supabase Auth |
| `/admin/dashboard/*` | Dynamic | CRUD de projetos e posts |

## Como Rodar

```bash
# 1. Instalar dependências
npm install

# 2. Configurar variáveis de ambiente
cp .env.example .env.local   # e preencher os valores

# 3. Rodar a migration no Supabase (supabase/schema.sql)

# 4. Criar usuário admin no Supabase → Authentication → Users

# 5. Iniciar o dev server
npm run dev
```

## Variáveis de Ambiente

| Variável | Onde encontrar |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | URL do deploy (usada no sitemap/robots) |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase → Settings → General → Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase → Settings → API Keys → Publishable key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase → Settings → API Keys → Secret key |
| `NEXT_PUBLIC_EMAILJS_SERVICE_ID` | EmailJS → Email Services → Service ID |
| `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` | EmailJS → Email Templates → Template ID |
| `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` | EmailJS → Account → Public Key |

## Segurança

- **RLS:** leitura pública; escrita/edit/delete de projects, posts e storage restrita ao UID do admin (`auth.uid()`).
- **Headers HTTP:** `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy` (next.config.ts).
- **Proxy (`src/proxy.ts`):** protege as rotas `/admin/*`, redirecionando para login quando não autenticado.
- **Anti-spam no contato:** honeypot + cooldown de 60s.

## Scripts

```bash
npm run dev      # dev server
npm run build    # build de produção
npm run start    # iniciar build
npm run lint     # ESLint
```
