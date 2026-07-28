"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, ExternalLink, GitFork } from "lucide-react"
import Markdown from "react-markdown"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Project } from "@/types"

function getGradient(index: number) {
  const gradients = [
    "from-cyan-500/20 to-violet-500/20",
    "from-violet-500/20 to-cyan-500/20",
    "from-cyan-500/10 via-violet-500/10 to-cyan-500/20",
  ]
  return gradients[index % gradients.length]
}

interface ProjectDetailViewProps {
  project: Project
}

export function ProjectDetailView({ project }: ProjectDetailViewProps) {
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
