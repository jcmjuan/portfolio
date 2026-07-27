import Link from "next/link"
import { ExternalLink, GitFork } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/server"
import type { Project } from "@/types"

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
]

function getGradients(index: number) {
  const gradients = [
    "from-cyan-500/20 to-violet-500/20",
    "from-violet-500/20 to-cyan-500/20",
    "from-cyan-500/10 via-violet-500/10 to-cyan-500/20",
  ]
  return gradients[index % gradients.length]
}

async function getFeaturedProjects(): Promise<Project[]> {
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
      .eq("featured", true)
      .order("created_at", { ascending: false })
      .limit(3)

    if (error || !data || data.length === 0) {
      return placeholderProjects
    }

    return data as Project[]
  } catch {
    return placeholderProjects
  }
}

export async function FeaturedProjects() {
  const projects = await getFeaturedProjects()

  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-6xl space-y-12">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="mt-3 text-muted-foreground">
            A selection of projects I&apos;ve built and shipped
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <Card key={project.id} className="group overflow-hidden">
              <div
                className={`flex h-40 items-center justify-center bg-gradient-to-br ${getGradients(index)}`}
              >
                <span className="text-4xl font-bold text-muted-foreground/20">
                  {project.title.charAt(0)}
                </span>
              </div>
              <CardHeader>
                <CardTitle>{project.title}</CardTitle>
                <CardDescription className="line-clamp-2">
                  {project.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-[0.65rem]">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="gap-2">
                {project.repo_url && (
                  <Button
                    render={
                      <a
                        href={project.repo_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      />
                    }
                    variant="ghost"
                    size="sm"
                    className="gap-1.5"
                  >
                    <GitFork className="size-3.5" />
                    Code
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
                    variant="ghost"
                    size="sm"
                    className="gap-1.5"
                  >
                    <ExternalLink className="size-3.5" />
                    Live Demo
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button render={<Link href="/projects" />} variant="outline" className="gap-2 px-6">
            View All Projects
            <ExternalLink className="size-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}
