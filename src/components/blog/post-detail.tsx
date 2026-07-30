"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Calendar } from "lucide-react"

import { Button } from "@/components/ui/button"
import { MdRenderer } from "@/components/blog/md-renderer"
import type { Post } from "@/types"

interface PostDetailViewProps {
  post: Post
}

export function PostDetailView({ post }: PostDetailViewProps) {
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
            Voltar para o Blog
        </Button>

        {post.cover_image_url && (
          <div className="relative overflow-hidden rounded-xl">
            <Image
              src={post.cover_image_url}
              alt={post.title}
              width={1200}
              height={320}
              className="h-64 w-full object-cover sm:h-80"
              priority
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
              {new Date(post.created_at).toLocaleDateString("pt-BR", {
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
          Voltar para o Blog
          </Button>
        </div>
      </div>
    </article>
  )
}
