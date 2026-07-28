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

async function getAllProjects(): Promise<Project[]> {
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!url || !key) {
      return []
    }

    const supabase = await createClient()
    const { data, error } = await supabase
      .from("projects")
      .select("*")
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
              {tag
                ? "No projects found with the selected tag."
                : "No projects yet — check back soon!"}
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
