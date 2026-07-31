"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { ProjectForm } from "@/components/admin/project-form";
import { revalidateContent } from "@/lib/revalidate";
import { toast } from "sonner";
import type { ProjectFormValues } from "@/types";

export default function EditProjectPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [fetching, setFetching] = useState(true);
  const [initialValues, setInitialValues] = useState<ProjectFormValues>();

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from("projects")
      .select("*")
      .eq("id", id)
      .single()
      .then(({ data, error }) => {
        if (error || !data) {
          toast.error("Projeto não encontrado");
          router.push("/admin/dashboard/projects");
          return;
        }
        setInitialValues({
          title: data.title,
          slug: data.slug,
          description: data.description,
          full_content: data.full_content ?? "",
          tags: Array.isArray(data.tags) ? data.tags.join(", ") : "",
          repo_url: data.repo_url ?? "",
          live_url: data.live_url ?? "",
          cover_image_url: data.cover_image_url ?? "",
          featured: data.featured ?? false,
        });
        setFetching(false);
      });
  }, [id, router]);

  const handleSubmit = async (form: ProjectFormValues) => {
    const supabase = createClient();
    const { error } = await supabase
      .from("projects")
      .update({
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
      })
      .eq("id", id);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Projeto atualizado");
    await revalidateContent();
    router.push("/admin/dashboard/projects");
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
      <h1 className="font-heading text-2xl font-semibold">Editar Projeto</h1>
      <ProjectForm
        initialValues={initialValues}
        submitLabel="Salvar Alterações"
        submittingLabel="Salvando..."
        cancelHref="/admin/dashboard/projects"
        onSubmit={handleSubmit}
      />
    </div>
  );
}
