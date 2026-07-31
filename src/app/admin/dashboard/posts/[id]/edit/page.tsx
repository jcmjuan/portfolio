"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { PostForm } from "@/components/admin/post-form";
import { revalidateContent } from "@/lib/revalidate";
import { toast } from "sonner";
import type { PostFormValues } from "@/types";

export default function EditPostPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [fetching, setFetching] = useState(true);
  const [initialValues, setInitialValues] = useState<PostFormValues>();

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from("posts")
      .select("*")
      .eq("id", id)
      .single()
      .then(({ data, error }) => {
        if (error || !data) {
          toast.error("Post não encontrado");
          router.push("/admin/dashboard/posts");
          return;
        }
        setInitialValues({
          title: data.title,
          slug: data.slug,
          excerpt: data.excerpt,
          content: data.content ?? "",
          cover_image_url: data.cover_image_url ?? "",
          published: data.published ?? false,
        });
        setFetching(false);
      });
  }, [id, router]);

  const handleSubmit = async (form: PostFormValues) => {
    const supabase = createClient();
    const { error } = await supabase
      .from("posts")
      .update({
        title: form.title,
        slug: form.slug,
        excerpt: form.excerpt,
        content: form.content,
        cover_image_url: form.cover_image_url || null,
        published: form.published,
      })
      .eq("id", id);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Post atualizado");
    await revalidateContent();
    router.push("/admin/dashboard/posts");
  };

  if (fetching) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="size-6 animate-spin rounded-full border-2 border-muted border-t-foreground" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <h1 className="font-heading text-2xl font-semibold">Editar Post</h1>
      <PostForm
        initialValues={initialValues}
        submitLabel="Salvar Alterações"
        submittingLabel="Salvando..."
        cancelHref="/admin/dashboard/posts"
        onSubmit={handleSubmit}
      />
    </div>
  );
}
