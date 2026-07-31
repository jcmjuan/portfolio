"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { PostForm } from "@/components/admin/post-form";
import { toast } from "sonner";
import type { PostFormValues } from "@/types";

export default function NewPostPage() {
  const router = useRouter();

  const handleSubmit = async (form: PostFormValues) => {
    const supabase = createClient();
    const { error } = await supabase.from("posts").insert({
      title: form.title,
      slug: form.slug,
      excerpt: form.excerpt,
      content: form.content,
      cover_image_url: form.cover_image_url || null,
      published: form.published,
    });

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Post criado");
    router.push("/admin/dashboard/posts");
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <h1 className="font-heading text-2xl font-semibold">Novo Post</h1>
      <PostForm
        submitLabel="Criar Post"
        submittingLabel="Criando..."
        cancelHref="/admin/dashboard/posts"
        onSubmit={handleSubmit}
      />
    </div>
  );
}
