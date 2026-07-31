import type { MetadataRoute } from "next";
import { createPublicClient } from "@/lib/supabase/public";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://juanmatos.dev.br";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/projects`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  try {
    const supabase = createPublicClient();

    const { data: projects } = await supabase
      .from("projects")
      .select("slug, created_at")
      .order("created_at", { ascending: false });

    const { data: posts } = await supabase
      .from("posts")
      .select("slug, created_at")
      .eq("published", true)
      .order("created_at", { ascending: false });

    const projectPages: MetadataRoute.Sitemap =
      projects?.map((project) => ({
        url: `${BASE_URL}/projects/${project.slug}`,
        lastModified: new Date(project.created_at),
        changeFrequency: "monthly" as const,
        priority: 0.7,
      })) || [];

    const postPages: MetadataRoute.Sitemap =
      posts?.map((post) => ({
        url: `${BASE_URL}/blog/${post.slug}`,
        lastModified: new Date(post.created_at),
        changeFrequency: "monthly" as const,
        priority: 0.7,
      })) || [];

    return [...staticPages, ...projectPages, ...postPages];
  } catch {
    return staticPages;
  }
}
