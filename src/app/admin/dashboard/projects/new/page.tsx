"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { slugify } from "@/lib/utils";
import { toast } from "sonner";
import type { ProjectFormValues } from "@/types";

export default function NewProjectPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<ProjectFormValues>({
    title: "",
    slug: "",
    description: "",
    full_content: "",
    tags: "",
    repo_url: "",
    live_url: "",
    cover_image_url: "",
    featured: false,
  });

  const updateField = (field: keyof ProjectFormValues, value: string | boolean) => {
    setForm((prev) => {
      const next = { ...prev, [field]: value };
      if (field === "title" && !prev.slug) {
        next.slug = slugify(value as string);
      }
      return next;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const supabase = createClient();
    const tagsArray = form.tags
      ? form.tags.split(",").map((t) => t.trim()).filter(Boolean)
      : [];

    const { error } = await supabase.from("projects").insert({
      title: form.title,
      slug: form.slug,
      description: form.description,
      full_content: form.full_content,
      tags: tagsArray,
      repo_url: form.repo_url || null,
      live_url: form.live_url || null,
      cover_image_url: form.cover_image_url || null,
      featured: form.featured,
    });

    if (error) {
      toast.error(error.message);
      setLoading(false);
      return;
    }

    toast.success("Project created");
    router.push("/admin/dashboard/projects");
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <h1 className="font-heading text-2xl font-semibold">New Project</h1>

      <Card>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={form.title}
                onChange={(e) => updateField("title", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">Slug</Label>
              <Input
                id="slug"
                value={form.slug}
                onChange={(e) => updateField("slug", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={form.description}
                onChange={(e) => updateField("description", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="full_content">Full Content (Markdown)</Label>
              <Textarea
                id="full_content"
                rows={10}
                value={form.full_content}
                onChange={(e) => updateField("full_content", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tags">Tags (comma-separated)</Label>
              <Input
                id="tags"
                value={form.tags}
                onChange={(e) => updateField("tags", e.target.value)}
                placeholder="nextjs, react, typescript"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="repo_url">Repo URL</Label>
              <Input
                id="repo_url"
                value={form.repo_url}
                onChange={(e) => updateField("repo_url", e.target.value)}
                placeholder="https://github.com/..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="live_url">Live URL</Label>
              <Input
                id="live_url"
                value={form.live_url}
                onChange={(e) => updateField("live_url", e.target.value)}
                placeholder="https://..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cover_image_url">Cover Image URL</Label>
              <Input
                id="cover_image_url"
                value={form.cover_image_url}
                onChange={(e) => updateField("cover_image_url", e.target.value)}
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="featured"
                checked={form.featured}
                onChange={(e) => updateField("featured", e.target.checked)}
                className="size-4 rounded border-input"
              />
              <Label htmlFor="featured">Featured</Label>
            </div>

            <div className="flex gap-2 pt-2">
              <Button type="submit" disabled={loading}>
                {loading ? "Creating..." : "Create Project"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/admin/dashboard/projects")}
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
