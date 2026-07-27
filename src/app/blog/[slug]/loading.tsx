export default function BlogPostLoading() {
  return (
    <div className="px-6 py-20">
      <div className="mx-auto max-w-3xl space-y-8">
        <div className="h-8 w-24 animate-pulse rounded-md bg-muted" />

        <div className="h-64 animate-pulse rounded-xl bg-muted sm:h-80" />

        <div className="space-y-4">
          <div className="h-10 w-3/4 animate-pulse rounded-md bg-muted" />
          <div className="h-4 w-32 animate-pulse rounded-md bg-muted" />
        </div>

        <div className="space-y-4 border-t pt-8">
          <div className="h-4 w-full animate-pulse rounded bg-muted" />
          <div className="h-4 w-5/6 animate-pulse rounded bg-muted" />
          <div className="h-4 w-4/6 animate-pulse rounded bg-muted" />
          <div className="h-32 w-full animate-pulse rounded-lg bg-muted" />
          <div className="h-4 w-full animate-pulse rounded bg-muted" />
          <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
        </div>
      </div>
    </div>
  )
}
