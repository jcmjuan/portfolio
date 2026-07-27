import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { ArrowLeft, ExternalLink, GitFork } from "lucide-react"
import Markdown from "react-markdown"

import { createClient } from "@/lib/supabase/server"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Project } from "@/types"

const placeholderProjects: Project[] = [
  {
    id: "1",
    title: "E-Commerce Platform",
    slug: "e-commerce-platform",
    description:
      "A full-stack e-commerce solution with real-time inventory, payment processing, and admin dashboard.",
    full_content:
      "## Overview\n\nThis project is a complete e-commerce platform built with Next.js and Supabase.\n\n## Features\n\n- Real-time inventory management\n- Stripe payment integration\n- Admin dashboard with analytics\n- Responsive design\n\n## Tech Stack\n\n- **Frontend:** Next.js, TypeScript, Tailwind CSS\n- **Backend:** Supabase, PostgreSQL\n- **Payments:** Stripe",
    tags: ["Next.js", "TypeScript", "Supabase", "Stripe"],
    repo_url: "https://github.com",
    live_url: "https://example.com",
    cover_image_url: null,
    featured: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "2",
    title: "AI Content Generator",
    slug: "ai-content-generator",
    description:
      "An AI-powered tool that generates marketing copy, blog posts, and social media content.",
    full_content:
      "## Overview\n\nAn AI-powered content generation tool using OpenAI's API.\n\n## Features\n\n- Multiple content templates\n- SEO optimization suggestions\n- Export to various formats\n- Team collaboration",
    tags: ["React", "Python", "OpenAI", "FastAPI"],
    repo_url: "https://github.com",
    live_url: "https://example.com",
    cover_image_url: null,
    featured: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "3",
    title: "Real-time Dashboard",
    slug: "realtime-dashboard",
    description:
      "A live analytics dashboard with WebSocket-powered updates and interactive data visualizations.",
    full_content:
      "## Overview\n\nA real-time analytics dashboard for monitoring key metrics.\n\n## Features\n\n- WebSocket-powered live updates\n- Interactive D3.js charts\n- Custom date range filtering\n- Export reports as PDF",
    tags: ["Next.js", "D3.js", "WebSocket", "Redis"],
    repo_url: "https://github.com",
    live_url: "https://example.com",
    cover_image_url: null,
    featured: true,
    created_at: new Date().toISOString(),
  },
]

function getGradient(index: number) {
  const gradients = [
    "from-cyan-500/20 to-violet-500/20",
    "from-violet-500/20 to-cyan-500/20",
    "from-cyan-500/10 via-violet-500/10 to-cyan-500/20",
  ]
  return gradients[index % gradients.length]
}

async function getProject(slug: string): Promise<Project | null> {
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!url || !key) {
      return placeholderProjects.find((p) => p.slug === slug) ?? null
    }

    const supabase = await createClient()
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("slug", slug)
      .single()

    if (error || !data) {
      return null
    }

    return data as Project
  } catch {
    return null
  }
}

export async function generateStaticParams() {
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!url || !key) {
      return placeholderProjects.map((p) => ({ slug: p.slug }))
    }

    const supabase = await createClient()
    const { data } = await supabase.from("projects").select("slug")

    if (!data) {
      return placeholderProjects.map((p) => ({ slug: p.slug }))
    }

    return data.map((p) => ({ slug: p.slug }))
  } catch {
    return placeholderProjects.map((p) => ({ slug: p.slug }))
  }
}

interface ProjectPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params
  const project = await getProject(slug)

  if (!project) {
    return { title: "Project Not Found" }
  }

  return {
    title: `${project.title} | Projects`,
    description: project.description,
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params
  const project = await getProject(slug)

  if (!project) {
    notFound()
  }

  return (
    <article className="px-6 py-20">
      <div className="mx-auto max-w-3xl space-y-10">
        <Button
          render={<Link href="/projects" />}
          variant="ghost"
          size="sm"
          className="gap-1.5"
        >
          <ArrowLeft className="size-4" />
          Back to Projects
        </Button>

        <div
          className={`relative flex h-64 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br ${getGradient(0)}`}
        >
          {project.cover_image_url ? (
            <Image
              src={project.cover_image_url}
              alt={project.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
              priority
            />
          ) : (
            <span className="text-6xl font-bold text-muted-foreground/20">
              {project.title.charAt(0)}
            </span>
          )}
        </div>

        <div className="space-y-4">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {project.title}
          </h1>
          <p className="text-lg text-muted-foreground">
            {project.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex gap-3">
          {project.repo_url && (
            <Button
              render={
                <a
                  href={project.repo_url}
                  target="_blank"
                  rel="noopener noreferrer"
                />
              }
              variant="outline"
              className="gap-2"
            >
              <GitFork className="size-4" />
              View Source
            </Button>
          )}
          {project.live_url && (
            <Button
              render={
                <a
                  href={project.live_url}
                  target="_blank"
                  rel="noopener noreferrer"
                />
              }
              className="gap-2"
            >
              <ExternalLink className="size-4" />
              Live Demo
            </Button>
          )}
        </div>

        {project.full_content && (
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <Markdown>{project.full_content}</Markdown>
          </div>
        )}
      </div>
    </article>
  )
}
