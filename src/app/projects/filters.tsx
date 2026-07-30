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

  function handleKeyDown(e: React.KeyboardEvent, tag: string | null) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      handleTagClick(tag)
    }
  }

  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Badge
        variant={activeTag ? "outline" : "secondary"}
        className={cn(
          "cursor-pointer transition-colors hover:bg-primary/10",
          !activeTag && "bg-primary/10"
        )}
        role="button"
        tabIndex={0}
        onClick={() => handleTagClick(null)}
        onKeyDown={(e) => handleKeyDown(e, null)}
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
          role="button"
          tabIndex={0}
          onClick={() => handleTagClick(tag)}
          onKeyDown={(e) => handleKeyDown(e, tag)}
        >
          {tag}
        </Badge>
      ))}
    </div>
  )
}
