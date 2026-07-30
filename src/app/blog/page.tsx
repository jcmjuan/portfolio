import type { Metadata } from "next"
import { BookOpen } from "lucide-react"
import { createClient } from "@/lib/supabase/server"
import { PostCard } from "@/components/blog/post-card"
import type { Post } from "@/types"

export const metadata: Metadata = {
  title: "Blog | Portfólio",
  description:
    "Reflexões sobre desenvolvimento web, design e construção de coisas para a web.",
}

async function getAllPosts(): Promise<Post[]> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("published", true)
      .order("created_at", { ascending: false })

    if (error || !data || data.length === 0) {
      return []
    }

    return data as Post[]
  } catch {
    return []
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
            Reflexões sobre desenvolvimento web, design e construção de coisas
            para a web.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {posts.map((post, index) => (
            <PostCard key={post.id} post={post} index={index} />
          ))}
        </div>

        {posts.length === 0 && (
          <div className="py-12 text-center text-muted-foreground">
            Nenhum post ainda. Volte em breve!
          </div>
        )}
      </div>
    </section>
  )
}
