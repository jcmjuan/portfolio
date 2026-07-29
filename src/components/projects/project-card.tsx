"use client"

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
import { cn } from "@/lib/utils"
import type { Project } from "@/types"

function getGradient(index: number) {
  const gradients = [
    "from-cyan-500/20 to-violet-500/20",
    "from-violet-500/20 to-cyan-500/20",
    "from-cyan-500/10 via-violet-500/10 to-cyan-500/20",
  ]
  return gradients[index % gradients.length]
}

interface ProjectCardProps {
  project: Project
  variant?: "default" | "compact"
  index?: number
}

export function ProjectCard({
  project,
  variant = "default",
  index = 0,
}: ProjectCardProps) {
  const isCompact = variant === "compact"

  return (
    <Card
      className={cn(
        "group overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/5",
        isCompact && "size-sm"
      )}
    >
      <Link
        href={`/projects/${project.slug}`}
        className="block"
      >
        <div
          className={`relative flex items-center justify-center bg-gradient-to-br ${getGradient(index)} ${isCompact ? "h-32" : "h-44"}`}
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
            <span
              className={cn(
                "font-bold text-muted-foreground/20",
                isCompact ? "text-3xl" : "text-4xl"
              )}
            >
              {project.title.charAt(0)}
            </span>
          )}
        </div>
      </Link>
      <CardHeader>
        <CardTitle className="line-clamp-1">
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
  )
}
