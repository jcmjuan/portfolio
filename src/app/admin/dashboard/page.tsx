"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FolderKanban, FileText, Star, Send } from "lucide-react";

interface Stats {
  totalProjects: number;
  totalPosts: number;
  featuredProjects: number;
  publishedPosts: number;
}

const fallbackStats: Stats = {
  totalProjects: 12,
  totalPosts: 8,
  featuredProjects: 3,
  publishedPosts: 6,
};

function getInitialStats(): Stats {
  const hasEnv =
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return hasEnv ? { totalProjects: 0, totalPosts: 0, featuredProjects: 0, publishedPosts: 0 } : fallbackStats;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats>(getInitialStats);

  useEffect(() => {
    const hasEnv =
      process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!hasEnv) return;

    const supabase = createClient();

    async function fetchStats() {
      const [projects, posts, featured, published] = await Promise.all([
        supabase.from("projects").select("id", { count: "exact", head: true }),
        supabase.from("posts").select("id", { count: "exact", head: true }),
        supabase
          .from("projects")
          .select("id", { count: "exact", head: true })
          .eq("featured", true),
        supabase
          .from("posts")
          .select("id", { count: "exact", head: true })
          .eq("published", true),
      ]);

      setStats({
        totalProjects: projects.count ?? 0,
        totalPosts: posts.count ?? 0,
        featuredProjects: featured.count ?? 0,
        publishedPosts: published.count ?? 0,
      });
    }

    fetchStats();
  }, []);

  const cards = [
    { title: "Total Projects", value: stats.totalProjects, icon: FolderKanban },
    { title: "Total Posts", value: stats.totalPosts, icon: FileText },
    { title: "Featured Projects", value: stats.featuredProjects, icon: Star },
    { title: "Published Posts", value: stats.publishedPosts, icon: Send },
  ];

  return (
    <div className="space-y-6">
      <h1 className="font-heading text-2xl font-semibold">Dashboard</h1>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <Card key={card.title}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sm text-muted-foreground">
                <card.icon className="size-4" />
                {card.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-heading text-3xl font-semibold">
                {card.value}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex gap-3">
        <Button render={<Link href="/admin/dashboard/projects/new" />}>
          New Project
        </Button>
        <Button
          render={<Link href="/admin/dashboard/posts/new" />}
          variant="outline"
        >
          New Post
        </Button>
      </div>
    </div>
  );
}
