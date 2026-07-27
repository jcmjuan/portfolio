import type { Metadata } from "next"
import { BookOpen } from "lucide-react"
import { createClient } from "@/lib/supabase/server"
import { PostCard } from "@/components/blog/post-card"
import type { Post } from "@/types"

export const metadata: Metadata = {
  title: "Blog | Portfolio",
  description:
    "Thoughts on web development, design, and building things for the web.",
}

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

async function getAllPosts(): Promise<Post[]> {
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!url || !key) {
      return placeholderPosts
    }

    const supabase = await createClient()
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("published", true)
      .order("created_at", { ascending: false })

    if (error || !data || data.length === 0) {
      return placeholderPosts
    }

    return data as Post[]
  } catch {
    return placeholderPosts
  }
}

export default async function BlogPage() {
  const posts = await getAllPosts()

  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-4xl space-y-12">
        <div className="text-center">
          <div className="mb-4 flex justify-center">
            <div className="rounded-xl bg-muted p-3">
              <BookOpen className="size-6 text-cyan" />
            </div>
          </div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            <span className="text-gradient">Blog</span>
          </h1>
          <p className="mt-3 text-muted-foreground">
            Thoughts on web development, design, and building things for the
            web.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {posts.map((post, index) => (
            <PostCard key={post.id} post={post} index={index} />
          ))}
        </div>

        {posts.length === 0 && (
          <div className="py-12 text-center text-muted-foreground">
            No posts yet. Check back soon!
          </div>
        )}
      </div>
    </section>
  )
}
