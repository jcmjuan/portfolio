import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Calendar } from "lucide-react"
import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { MdRenderer } from "@/components/blog/md-renderer"
import type { Post } from "@/types"

const placeholderPosts: Post[] = [
  {
    id: "1",
    title: "Building a Modern Portfolio with Next.js",
    slug: "building-modern-portfolio-nextjs",
    excerpt:
      "A deep dive into creating a fast, beautiful portfolio site using Next.js 14, Tailwind CSS, and Supabase.",
    content:
      "## Introduction\n\nBuilding a portfolio is one of the best ways to showcase your work and attract new opportunities. In this post, we'll explore how to build a modern portfolio using Next.js.\n\n## Why Next.js?\n\nNext.js provides an excellent developer experience with features like:\n\n- **Server Components** for faster page loads\n- **API Routes** for backend logic\n- **Image Optimization** out of the box\n- **File-based Routing** that just works\n\n## Getting Started\n\n```bash\nnpx create-next-app@latest portfolio\n```\n\nThis sets up everything you need to start building.\n\n## Conclusion\n\nNext.js makes it incredibly easy to build performant web applications. Give it a try!",
    cover_image_url: null,
    published: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Mastering Tailwind CSS: Tips and Tricks",
    slug: "mastering-tailwind-css-tips-tricks",
    excerpt:
      "Level up your Tailwind CSS skills with these advanced techniques and best practices.",
    content:
      "## Why Tailwind CSS?\n\nTailwind CSS has revolutionized how we write CSS. Instead of writing custom CSS classes, we compose utility classes directly in our HTML.\n\n## Advanced Techniques\n\n### Custom Animations\n\n```css\n@keyframes float {\n  0%, 100% { transform: translateY(0); }\n  50% { transform: translateY(-10px); }\n}\n```\n\n### Dark Mode\n\nTailwind makes dark mode trivial with the `dark:` variant.\n\n## Best Practices\n\n1. Use `@apply` sparingly\n2. Create a consistent design system\n3. Leverage the JIT compiler\n\n## Conclusion\n\nTailwind CSS is a powerful tool when used correctly. Keep experimenting!",
    cover_image_url: null,
    published: true,
    created_at: new Date(Date.now() - 86400000).toISOString(),
  },
]

async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!url || !key) {
      return placeholderPosts.find((p) => p.slug === slug) || null
    }

    const supabase = await createClient()
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("slug", slug)
      .eq("published", true)
      .single()

    if (error || !data) {
      return placeholderPosts.find((p) => p.slug === slug) || null
    }

    return data as Post
  } catch {
    return placeholderPosts.find((p) => p.slug === slug) || null
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
  return placeholderPosts.map((post) => ({
    slug: post.slug,
  }))
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
