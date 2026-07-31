"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { ImageUpload } from "@/components/admin/image-upload";
import { slugify } from "@/lib/utils";
import type { PostFormValues } from "@/types";

const emptyValues: PostFormValues = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  cover_image_url: "",
  published: false,
};

interface PostFormProps {
  initialValues?: PostFormValues;
  submitLabel: string;
  submittingLabel: string;
  cancelHref: string;
  onSubmit: (values: PostFormValues) => Promise<void>;
}

export function PostForm({
  initialValues,
  submitLabel,
  submittingLabel,
  cancelHref,
  onSubmit,
}: PostFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<PostFormValues>(
    initialValues ?? emptyValues
  );

  const updateField = (field: keyof PostFormValues, value: string | boolean) => {
    setForm((prev) => {
      const next = { ...prev, [field]: value };
      if (field === "title") {
        next.slug = slugify(value as string);
      }
      return next;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit(form);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Título</Label>
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
            <Label htmlFor="excerpt">Resumo</Label>
            <Textarea
              id="excerpt"
              rows={3}
              value={form.excerpt}
              onChange={(e) => updateField("excerpt", e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Conteúdo (Markdown)</Label>
            <Textarea
              id="content"
              rows={12}
              value={form.content}
              onChange={(e) => updateField("content", e.target.value)}
              required
            />
          </div>

          <ImageUpload
            value={form.cover_image_url}
            onChange={(url) => updateField("cover_image_url", url)}
            folder="posts"
            label="Cover Image"
          />

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="published"
              checked={form.published}
              onChange={(e) => updateField("published", e.target.checked)}
              className="size-4 rounded border-input"
            />
            <Label htmlFor="published">Publicado</Label>
          </div>

          <div className="flex gap-2 pt-2">
            <Button type="submit" disabled={loading}>
              {loading ? submittingLabel : submitLabel}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push(cancelHref)}
            >
              Cancelar
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
