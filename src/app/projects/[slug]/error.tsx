"use client"

import Link from "next/link"
import { AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ProjectError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-3xl space-y-6 text-center">
        <AlertTriangle className="mx-auto size-12 text-red-500" />
        <h1 className="text-2xl font-bold">Something went wrong</h1>
        <p className="text-muted-foreground">
          {error.message || "An unexpected error occurred."}
        </p>
        {error.digest && (
          <p className="text-sm text-muted-foreground/60">
            Error ID: {error.digest}
          </p>
        )}
        <div className="flex justify-center gap-3">
          <Button onClick={reset} variant="outline">
            Try Again
          </Button>
          <Button render={<Link href="/projects" />}>
            Back to Projects
          </Button>
        </div>
      </div>
    </section>
  )
}
