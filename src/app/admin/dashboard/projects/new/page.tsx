"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { ProjectForm } from "@/components/admin/project-form";
import { revalidateContent } from "@/lib/revalidate";
import { toast } from "sonner";
import type { ProjectFormValues } from "@/types";

export default function NewProjectPage() {
  const router = useRouter();

  const handleSubmit = async (form: ProjectFormValues) => {
    const supabase = createClient();
    const { error } = await supabase.from("projects").insert({
      title: form.title,
      slug: form.slug,
      description: form.description,
      full_content: form.full_content,
      tags: form.tags
        ? form.tags.split(",").map((t) => t.trim()).filter(Boolean)
        : [],
      repo_url: form.repo_url || null,
      live_url: form.live_url || null,
      cover_image_url: form.cover_image_url || null,
      featured: form.featured,
    });

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Projeto criado");
    await revalidateContent();
    router.push("/admin/dashboard/projects");
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <h1 className="font-heading text-2xl font-semibold">Novo Projeto</h1>
      <ProjectForm
        submitLabel="Criar Projeto"
        submittingLabel="Criando..."
        cancelHref="/admin/dashboard/projects"
        onSubmit={handleSubmit}
      />
    </div>
  );
}
