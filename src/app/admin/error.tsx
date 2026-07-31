"use client"

import Link from "next/link"
import { AlertTriangle } from "lucide-react"

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
      <AlertTriangle className="size-12 text-red-500" />
      <h1 className="mt-4 text-2xl font-bold">Algo deu errado</h1>
      <p className="mt-2 text-muted-foreground">
        {error.message || "Ocorreu um erro inesperado."}
      </p>
      {error.digest && (
        <p className="mt-2 text-sm text-muted-foreground/60">
          ID do Erro: {error.digest}
        </p>
      )}
      <div className="mt-6 flex gap-3">
        <button
          onClick={reset}
          className="inline-flex items-center justify-center rounded-lg border border-transparent bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
        >
          Tentar Novamente
        </button>
        <Link
          href="/admin/dashboard"
          className="inline-flex items-center justify-center rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
        >
          Voltar para o Painel
        </Link>
      </div>
    </section>
  )
}
