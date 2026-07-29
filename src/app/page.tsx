import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Hero } from "@/components/sections/hero"
import { Skills } from "@/components/sections/skills"
import { FeaturedProjects } from "@/components/sections/featured-projects"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <>
      <Hero />
      <Skills />
      <FeaturedProjects />

      <section className="px-6 py-20">
        <div className="mx-auto max-w-2xl space-y-6 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Vamos Trabalhar <span className="text-gradient">Juntos</span>
          </h2>
          <p className="text-muted-foreground">
            Tem um projeto em mente ou só quer conversar? Estou sempre aberto
            a discutir novas oportunidades e ideias.
          </p>
          <Button
            render={<Link href="/contact" />}
            variant="default"
            className="glow-cyan gap-2 px-6"
          >
            Fale Comigo
            <ArrowRight className="size-4" />
          </Button>
        </div>
      </section>
    </>
  )
}
