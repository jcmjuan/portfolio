import Link from "next/link"
import { ArrowRight, Mail, User } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="relative flex min-h-[80vh] flex-col items-center justify-center px-6 text-center">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-cyan/5 blur-3xl" />
        <div className="absolute -bottom-40 left-1/3 h-[400px] w-[400px] rounded-full bg-violet/5 blur-3xl" />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-8">
        <Badge
          variant="secondary"
          className="animate-pulse-glow gap-2 border border-emerald-500/20 bg-emerald-500/10 px-4 py-1.5 text-sm text-emerald-400"
        >
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
          </span>
          Disponível para novos projetos
        </Badge>

        <h1
          className="animate-[fade-in_0.6s_ease-out_both] text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
          style={{ animationDelay: "0.1s" }}
        >
          Olá, eu sou o{" "}
          <span className="text-gradient">Juan Carlos</span>
        </h1>

        <div
          className="animate-[fade-in_0.6s_ease-out_both] flex size-24 items-center justify-center rounded-full border-2 border-dashed border-border bg-muted/50 sm:size-32 lg:size-40"
          style={{ animationDelay: "0.15s" }}
        >
          <User className="size-12 text-muted-foreground/50 sm:size-16 lg:size-20" />
        </div>

        <p
          className="animate-[fade-in_0.6s_ease-out_both] text-xl text-muted-foreground sm:text-2xl"
          style={{ animationDelay: "0.2s" }}
        >
          Desenvolvedor Web Freelancer
        </p>

        <p
          className="animate-[fade-in_0.6s_ease-out_both] max-w-xl text-base text-muted-foreground sm:text-lg"
          style={{ animationDelay: "0.3s" }}
        >
          Transformo suas ideias em soluções web profissionais. Desde sites
          institucionais até aplicações complexas, desenvolvo projetos que
          geram resultados reais para seu negócio.
        </p>

        <div
          className="animate-[fade-in_0.6s_ease-out_both] flex flex-col gap-3 sm:flex-row"
          style={{ animationDelay: "0.4s" }}
        >
          <Button
            render={<Link href="/projects" />}
            variant="default"
            className="glow-cyan gap-2 px-6"
          >
            Ver Projetos
            <ArrowRight className="size-4" />
          </Button>
          <Button
            render={<Link href="/contact" />}
            variant="outline"
            className="gap-2 px-6"
          >
            Fale Comigo
            <Mail className="size-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}
