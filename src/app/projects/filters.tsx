"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface ProjectFiltersProps {
  tags: string[]
  activeTag?: string
}

export function ProjectFilters({ tags, activeTag }: ProjectFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  function handleTagClick(tag: string | null) {
    const params = new URLSearchParams(searchParams.toString())
    if (tag) {
      params.set("tag", tag)
    } else {
      params.delete("tag")
    }
    router.push(`/projects${params.toString() ? `?${params.toString()}` : ""}`, { scroll: false })
  }

  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Badge
        variant={activeTag ? "outline" : "secondary"}
        className={cn(
          "cursor-pointer transition-colors hover:bg-primary/10",
          !activeTag && "bg-primary/10"
        )}
        onClick={() => handleTagClick(null)}
      >
        Todos
      </Badge>
      {tags.map((tag) => (
        <Badge
          key={tag}
          variant={activeTag === tag ? "secondary" : "outline"}
          className={cn(
            "cursor-pointer transition-colors hover:bg-primary/10",
            activeTag === tag && "bg-primary/10"
          )}
          onClick={() => handleTagClick(tag)}
        >
          {tag}
        </Badge>
      ))}
    </div>
  )
}
