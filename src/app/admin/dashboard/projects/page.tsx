"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Pencil, Trash2, Star } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { toast } from "sonner";
import type { Project } from "@/types";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (!error && data) setProjects(data);
        setLoading(false);
      });
  }, []);

  const toggleFeatured = async (id: string, current: boolean) => {
    const supabase = createClient();
    const { error } = await supabase
      .from("projects")
      .update({ featured: !current })
      .eq("id", id);

    if (error) {
      toast.error(error.message);
      return;
    }

    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, featured: !current } : p))
    );
    toast.success("Atualizado");
  };

  const deleteProject = async (id: string) => {
    const supabase = createClient();
    const { error } = await supabase.from("projects").delete().eq("id", id);

    if (error) {
      toast.error(error.message);
      return;
    }

    setProjects((prev) => prev.filter((p) => p.id !== id));
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
        <h1 className="font-heading text-2xl font-semibold">Projetos</h1>
        <Button render={<Link href="/admin/dashboard/projects/new" />}>
          <Plus className="size-4" />
          Novo Projeto
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b text-left text-sm text-muted-foreground">
                  <th className="p-3 font-medium">Título</th>
                  <th className="p-3 font-medium">Destaque</th>
                  <th className="p-3 font-medium">Criado em</th>
                  <th className="p-3 font-medium text-right">Ações</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project) => (
                  <tr key={project.id} className="border-b last:border-b-0">
                    <td className="p-3 font-medium">{project.title}</td>
                    <td className="p-3">
                      {project.featured ? (
                        <Badge variant="default">
                          <Star className="size-3" />
                          Destaque
                        </Badge>
                      ) : (
                        <Badge variant="secondary">Normal</Badge>
                      )}
                    </td>
                    <td className="p-3 text-muted-foreground">
                      {formatDate(project.created_at)}
                    </td>
                    <td className="p-3">
                      <div className="flex justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={() =>
                            toggleFeatured(project.id, project.featured)
                          }
                          title="Alternar destaque"
                        >
                          <Star
                            className={
                              project.featured
                                ? "size-4 fill-yellow-500 text-yellow-500"
                                : "size-4"
                            }
                          />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          render={
                            <Link
                              href={`/admin/dashboard/projects/${project.id}/edit`}
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
                              <DialogTitle>Excluir Projeto</DialogTitle>
                              <DialogDescription>
                                Tem certeza de que deseja excluir &quot;{project.title}&quot;?
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
                                onClick={() => deleteProject(project.id)}
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
                {projects.length === 0 && (
                  <tr>
                    <td
                      colSpan={4}
                      className="p-8 text-center text-muted-foreground"
                    >
                      Nenhum projeto ainda.
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
