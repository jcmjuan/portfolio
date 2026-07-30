import Link from "next/link"
import Image from "next/image"
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
import { getGradient } from "@/lib/utils"
import type { Project } from "@/types"

async function getFeaturedProjects(): Promise<Project[]> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("featured", true)
      .order("created_at", { ascending: false })
      .limit(3)

    if (error || !data || data.length === 0) {
      return []
    }

    return data as Project[]
  } catch {
    return []
  }
}

export async function FeaturedProjects() {
  const projects = await getFeaturedProjects()

  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-6xl space-y-12">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            <span className="text-gradient">Projetos</span> em Destaque
          </h2>
          <p className="mt-3 text-muted-foreground">
            Uma seleção de projetos que desenvolvi e lancei
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.length === 0 && (
            <p className="col-span-full py-12 text-center text-muted-foreground">
              Em breve — os projetos aparecerão aqui.
            </p>
          )}
          {projects.map((project, index) => (
            <Card key={project.id} className="group overflow-hidden">
              <Link
                href={`/projects/${project.slug}`}
                className="block"
              >
                <div
                  className={`relative flex h-40 items-center justify-center bg-gradient-to-br ${getGradient(index)}`}
                >
                  {project.cover_image_url ? (
                    <Image
                      src={project.cover_image_url}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <span className="text-4xl font-bold text-muted-foreground/20">
                      {project.title.charAt(0)}
                    </span>
                  )}
                </div>
              </Link>
              <CardHeader>
                <CardTitle>
                  <Link
                    href={`/projects/${project.slug}`}
                    className="hover:underline underline-offset-4"
                  >
                    {project.title}
                  </Link>
                </CardTitle>
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
                    Código
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
                    Demo Ao Vivo
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button render={<Link href="/projects" />} variant="outline" className="gap-2 px-6">
            Ver Todos os Projetos
            <ExternalLink className="size-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}
