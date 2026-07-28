import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Calendar } from "lucide-react"
import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { MdRenderer } from "@/components/blog/md-renderer"
import type { Post } from "@/types"

async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!url || !key) {
      return null
    }

    const supabase = await createClient()
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("slug", slug)
      .eq("published", true)
      .single()

    if (error || !data) {
      return null
    }

    return data as Post
  } catch {
    return null
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    return { title: "Post Not Found" }
  }

  return {
    title: `${post.title} | Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.created_at,
    },
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
    const { data } = await supabase
      .from("posts")
      .select("slug")
      .eq("published", true)

    if (!data) {
      return []
    }

    return data.map((post) => ({ slug: post.slug }))
  } catch {
    return []
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  return (
    <article className="px-6 py-20">
      <div className="mx-auto max-w-3xl space-y-8">
        <Button
          render={<Link href="/blog" />}
          variant="ghost"
          size="sm"
          className="gap-1.5"
        >
          <ArrowLeft className="size-4" />
          Back to Blog
        </Button>

        {post.cover_image_url && (
          <div className="relative overflow-hidden rounded-xl">
            <img
              src={post.cover_image_url}
              alt={post.title}
              className="h-64 w-full object-cover sm:h-80"
            />
          </div>
        )}

        <div className="space-y-4">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {post.title}
          </h1>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="size-4" />
            <time dateTime={post.created_at}>
              {new Date(post.created_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </div>
        </div>

        <div className="border-t pt-8">
          <MdRenderer content={post.content} />
        </div>

        <div className="border-t pt-8">
          <Button
            render={<Link href="/blog" />}
            variant="outline"
            className="gap-2"
          >
            <ArrowLeft className="size-4" />
            Back to Blog
          </Button>
        </div>
      </div>
    </article>
  )
}
