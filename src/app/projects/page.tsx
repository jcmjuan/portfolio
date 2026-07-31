import { Suspense } from "react"
import type { Metadata } from "next"

import { createPublicClient } from "@/lib/supabase/public"
import { ProjectCard } from "@/components/projects/project-card"
import { ProjectFilters } from "./filters"
import type { Project } from "@/types"

export const revalidate = 3600

export const metadata: Metadata = {
  title: "Projetos | Portfólio",
  description:
    "Explore minha coleção de projetos — aplicações web, ferramentas e experimentos construídos com tecnologias modernas.",
}

async function getAllProjects(): Promise<Project[]> {
  try {
    const supabase = createPublicClient()
    const { data, error } = await supabase
      .from("projects")
      .select("id,title,slug,description,tags,cover_image_url,repo_url,live_url,featured,created_at")
      .order("created_at", { ascending: false })

    if (error || !data || data.length === 0) {
      return []
    }

    return data as Project[]
  } catch {
    return []
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
            Projetos
          </h1>
          <p className="mt-3 text-muted-foreground">
            Uma coleção de projetos que desenvolvi e lancei
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
              {tag
                ? "Nenhum projeto encontrado com a tag selecionada."
                : "Nenhum projeto ainda — volte em breve!"}
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
