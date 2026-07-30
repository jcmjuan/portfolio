import Link from "next/link"
import Image from "next/image"
import { Calendar } from "lucide-react"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { getGradient } from "@/lib/utils"
import type { Post } from "@/types"

export function PostCard({ post, index = 0 }: { post: Post; index?: number }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <Card className="group/card overflow-hidden transition-all duration-300 hover:ring-2 hover:ring-cyan/30 hover:-translate-y-1">
        {post.cover_image_url ? (
          <div className="relative h-48 overflow-hidden">
            <Image
              src={post.cover_image_url}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-500 group-hover/card:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
          </div>
        ) : (
          <div
            className={`flex h-40 items-center justify-center bg-gradient-to-br ${getGradient(index)}`}
          >
            <span className="text-4xl font-bold text-muted-foreground/20">
              {post.title.charAt(0)}
            </span>
          </div>
        )}

        <CardHeader>
          <CardTitle className="line-clamp-1 transition-colors group-hover:text-cyan">
            {post.title}
          </CardTitle>
          <CardDescription className="line-clamp-2">
            {post.excerpt}
          </CardDescription>
        </CardHeader>

        <div className="px-(--card-spacing) pb-(--card-spacing)">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Calendar className="size-3.5" />
            <time dateTime={post.created_at}>
              {new Date(post.created_at).toLocaleDateString("pt-BR", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </div>
        </div>
      </Card>
    </Link>
  )
}
