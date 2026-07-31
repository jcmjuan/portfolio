"use client"

import Link from "next/link"
import { AlertTriangle } from "lucide-react"

export default function ContactError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-3xl space-y-6 text-center">
        <AlertTriangle className="mx-auto size-12 text-red-500" />
        <h1 className="text-2xl font-bold">Algo deu errado</h1>
        <p className="text-muted-foreground">
          {error.message || "Ocorreu um erro inesperado."}
        </p>
        {error.digest && (
          <p className="text-sm text-muted-foreground/60">
            ID do Erro: {error.digest}
          </p>
        )}
        <div className="flex justify-center gap-3">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center rounded-lg border border-transparent bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
          >
            Tentar Novamente
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
          >
            Voltar para o Início
          </Link>
        </div>
      </div>
    </section>
  )
}
