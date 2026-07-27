import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function ProjectLoading() {
  return (
    <article className="px-6 py-20">
      <div className="mx-auto max-w-3xl space-y-10">
        <Button variant="ghost" size="sm" className="gap-1.5" disabled>
          <ArrowLeft className="size-4" />
          Back to Projects
        </Button>

        <div className="h-64 animate-pulse rounded-xl bg-muted" />

        <div className="space-y-4">
          <div className="h-10 w-3/4 animate-pulse rounded-lg bg-muted" />
          <div className="h-6 w-full animate-pulse rounded-lg bg-muted" />
          <div className="h-6 w-2/3 animate-pulse rounded-lg bg-muted" />
        </div>

        <div className="flex gap-2">
          <div className="h-6 w-16 animate-pulse rounded-full bg-muted" />
          <div className="h-6 w-20 animate-pulse rounded-full bg-muted" />
          <div className="h-6 w-14 animate-pulse rounded-full bg-muted" />
        </div>

        <div className="flex gap-3">
          <div className="h-9 w-32 animate-pulse rounded-lg bg-muted" />
          <div className="h-9 w-28 animate-pulse rounded-lg bg-muted" />
        </div>

        <div className="space-y-3">
          <div className="h-4 w-full animate-pulse rounded bg-muted" />
          <div className="h-4 w-5/6 animate-pulse rounded bg-muted" />
          <div className="h-4 w-4/6 animate-pulse rounded bg-muted" />
        </div>
      </div>
    </article>
  )
}
