import { notFound } from "next/navigation"
import type { Metadata } from "next"

import { createClient } from "@/lib/supabase/server"
import { ProjectDetailView } from "@/components/projects/project-detail"
import type { Project } from "@/types"

async function getProject(slug: string): Promise<Project | null> {
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!url || !key) {
      console.error("[getProject] Missing Supabase env vars")
      return null
    }

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

export async function generateStaticParams() {
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!url || !key) {
      return []
    }

    const supabase = await createClient()
    const { data } = await supabase.from("projects").select("slug")

    if (!data) {
      return []
    }

    return data.map((p) => ({ slug: p.slug }))
  } catch {
    return []
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

  return <ProjectDetailView project={project} />
}
