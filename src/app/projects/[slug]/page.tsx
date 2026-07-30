import { notFound } from "next/navigation"
import type { Metadata } from "next"

import { createClient } from "@/lib/supabase/server"
import { ProjectDetailView } from "@/components/projects/project-detail"
import type { Project } from "@/types"

export const dynamic = "force-dynamic"

async function getProject(slug: string): Promise<Project | null> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("slug", slug)
      .single()

    if (error) {
      console.error("[getProject] Supabase error:", error.message)
      return null
    }

    if (!data) {
      return null
    }

    return data as Project
  } catch (err) {
    console.error("[getProject] Unexpected error:", err)
    return null
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
    return { title: "Projeto Não Encontrado" }
  }

  return {
    title: `${project.title} | Projetos`,
    description: project.description,
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params
  const project = await getProject(slug)

  if (!project) {
    notFound()
  }

  return <ProjectDetailView project={project} />
}
