import type { ReactNode } from "react";
import { AuthProvider } from "@/components/providers/auth-provider";
import { AdminShell } from "@/components/admin/admin-shell";

export const dynamic = "force-dynamic";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <AdminShell>{children}</AdminShell>
    </AuthProvider>
  );
}
