import { Suspense } from "react"
import type { Metadata } from "next"

import { createClient } from "@/lib/supabase/server"
import { ProjectCard } from "@/components/projects/project-card"
import { ProjectFilters } from "./filters"
import type { Project } from "@/types"

export const metadata: Metadata = {
  title: "Projects | Portfolio",
  description:
    "Browse my collection of projects — web apps, tools, and experiments built with modern technologies.",
}

const placeholderProjects: Project[] = [
  {
    id: "1",
    title: "E-Commerce Platform",
    slug: "e-commerce-platform",
    description:
      "A full-stack e-commerce solution with real-time inventory, payment processing, and admin dashboard.",
    full_content: "",
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
    full_content: "",
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
    full_content: "",
    tags: ["Next.js", "D3.js", "WebSocket", "Redis"],
    repo_url: "https://github.com",
    live_url: "https://example.com",
    cover_image_url: null,
    featured: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "4",
    title: "Task Management App",
    slug: "task-management-app",
    description:
      "A collaborative project management tool with real-time updates, drag-and-drop boards, and team workspaces.",
    full_content: "",
    tags: ["Next.js", "TypeScript", "Prisma", "Tailwind CSS"],
    repo_url: "https://github.com",
    live_url: "https://example.com",
    cover_image_url: null,
    featured: false,
    created_at: new Date().toISOString(),
  },
  {
    id: "5",
    title: "Weather Dashboard",
    slug: "weather-dashboard",
    description:
      "A beautiful weather app with 7-day forecasts, interactive maps, and location-based alerts.",
    full_content: "",
    tags: ["React", "OpenWeather API", "D3.js", "Tailwind CSS"],
    repo_url: "https://github.com",
    live_url: "https://example.com",
    cover_image_url: null,
    featured: false,
    created_at: new Date().toISOString(),
  },
  {
    id: "6",
    title: "Chat Application",
    slug: "chat-application",
    description:
      "A real-time chat platform with direct messages, group channels, file sharing, and emoji reactions.",
    full_content: "",
    tags: ["React", "Socket.io", "Express", "MongoDB"],
    repo_url: "https://github.com",
    live_url: "https://example.com",
    cover_image_url: null,
    featured: false,
    created_at: new Date().toISOString(),
  },
]

async function getAllProjects(): Promise<Project[]> {
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!url || !key) {
      return placeholderProjects
    }

    const supabase = await createClient()
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false })

    if (error || !data || data.length === 0) {
      return placeholderProjects
    }

    return data as Project[]
  } catch {
    return placeholderProjects
  }
}

interface ProjectsPageProps {
  searchParams: Promise<{ tag?: string }>
}

export default async function ProjectsPage({ searchParams }: ProjectsPageProps) {
  const projects = await getAllProjects()
  const { tag } = await searchParams

  const allTags = [...new Set(projects.flatMap((p) => p.tags))].sort()

  const filteredProjects = tag
    ? projects.filter((p) => p.tags.includes(tag))
    : projects

  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-6xl space-y-12">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Projects
          </h1>
          <p className="mt-3 text-muted-foreground">
            A collection of projects I&apos;ve built and shipped
          </p>
        </div>

        <Suspense>
          <ProjectFilters tags={allTags} activeTag={tag} />
        </Suspense>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-muted-foreground">
              No projects found with the selected tag.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
