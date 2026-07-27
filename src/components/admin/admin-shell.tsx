"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  FolderKanban,
  FileText,
  LogOut,
} from "lucide-react";
import { useAuth } from "@/components/providers/auth-provider";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/dashboard/projects", label: "Projects", icon: FolderKanban },
  { href: "/admin/dashboard/posts", label: "Posts", icon: FileText },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading, signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
    router.push("/admin/login");
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="size-6 animate-spin rounded-full border-2 border-muted border-t-foreground" />
      </div>
    );
  }

  return (
    <>
      <aside className="fixed inset-y-0 left-0 z-40 flex w-60 flex-col border-r bg-card">
        <div className="flex h-14 items-center border-b px-4">
          <Link
            href="/admin/dashboard"
            className="font-heading text-lg font-semibold"
          >
            Admin
          </Link>
        </div>
        <nav className="flex-1 space-y-1 p-2">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/admin/dashboard"
                ? pathname === link.href
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-muted",
                  isActive
                    ? "bg-muted text-foreground"
                    : "text-muted-foreground"
                )}
              >
                <link.icon className="size-4" />
                {link.label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t p-2">
          {user && (
            <p className="truncate px-3 py-1 text-xs text-muted-foreground">
              {user.email}
            </p>
          )}
          <Button
            variant="ghost"
            className="w-full justify-start gap-2"
            onClick={handleLogout}
          >
            <LogOut className="size-4" />
            Logout
          </Button>
        </div>
      </aside>
      <div className="min-h-screen pl-60">
        <main className="p-6">{children}</main>
      </div>
    </>
  );
}
