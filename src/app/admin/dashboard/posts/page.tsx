"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Pencil, Trash2, Send } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { toast } from "sonner";
import type { Post } from "@/types";

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (!error && data) setPosts(data);
        setLoading(false);
      });
  }, []);

  const togglePublished = async (id: string, current: boolean) => {
    const supabase = createClient();
    const { error } = await supabase
      .from("posts")
      .update({ published: !current })
      .eq("id", id);

    if (error) {
      toast.error(error.message);
      return;
    }

    setPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, published: !current } : p))
    );
    toast.success("Atualizado");
  };

  const deletePost = async (id: string) => {
    const supabase = createClient();
    const { error } = await supabase.from("posts").delete().eq("id", id);

    if (error) {
      toast.error(error.message);
      return;
    }

    setPosts((prev) => prev.filter((p) => p.id !== id));
    toast.success("Excluído");
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="size-6 animate-spin rounded-full border-2 border-muted border-t-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl font-semibold">Posts</h1>
        <Button render={<Link href="/admin/dashboard/posts/new" />}>
          <Plus className="size-4" />
          Novo Post
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b text-left text-sm text-muted-foreground">
                  <th className="p-3 font-medium">Título</th>
                  <th className="p-3 font-medium">Status</th>
                  <th className="p-3 font-medium">Criado em</th>
                  <th className="p-3 font-medium text-right">Ações</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => (
                  <tr key={post.id} className="border-b last:border-b-0">
                    <td className="p-3 font-medium">{post.title}</td>
                    <td className="p-3">
                      {post.published ? (
                        <Badge variant="default">
                          <Send className="size-3" />
                          Publicado
                        </Badge>
                      ) : (
                        <Badge variant="secondary">Rascunho</Badge>
                      )}
                    </td>
                    <td className="p-3 text-muted-foreground">
                      {formatDate(post.created_at)}
                    </td>
                    <td className="p-3">
                      <div className="flex justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={() =>
                            togglePublished(post.id, post.published)
                          }
                          title="Alternar publicação"
                        >
                          <Send
                            className={
                              post.published
                                ? "size-4 fill-green-500 text-green-500"
                                : "size-4"
                            }
                          />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          render={
                            <Link
                              href={`/admin/dashboard/posts/${post.id}/edit`}
                            />
                          }
                        >
                          <Pencil className="size-4" />
                        </Button>
                        <Dialog>
                          <DialogTrigger
                            render={
                              <Button variant="ghost" size="icon-sm" />
                            }
                          >
                            <Trash2 className="size-4 text-destructive" />
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Excluir Post</DialogTitle>
                              <DialogDescription>
                                Tem certeza de que deseja excluir &quot;{post.title}&quot;?
                                Esta ação não pode ser desfeita.
                              </DialogDescription>
                            </DialogHeader>
                            <DialogFooter>
                              <DialogClose
                                render={<Button variant="outline" />}
                              >
                                Cancelar
                              </DialogClose>
                              <Button
                                variant="destructive"
                                onClick={() => deletePost(post.id)}
                              >
                                Excluir
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </td>
                  </tr>
                ))}
                {posts.length === 0 && (
                  <tr>
                    <td
                      colSpan={4}
                      className="p-8 text-center text-muted-foreground"
                    >
                      Nenhum post ainda.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
