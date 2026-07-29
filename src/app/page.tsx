import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Hero } from "@/components/sections/hero"
import { Services } from "@/components/sections/services"
import { FeaturedProjects } from "@/components/sections/featured-projects"
import { About } from "@/components/sections/about"
import { Testimonials } from "@/components/sections/testimonials"
import { Skills } from "@/components/sections/skills"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <FeaturedProjects />
      <About />
      <Testimonials />
      <Skills />

      <section className="px-6 py-20">
        <div className="mx-auto max-w-2xl space-y-6 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Pronto Para Transformar Sua Ideia{" "}
            <span className="text-gradient">Em Realidade?</span>
          </h2>
          <p className="text-muted-foreground">
            Entre em contato para discutir seu projeto. Vamos converter suas
            necessidades em uma solução digital que gera resultados.
          </p>
          <Button
            render={<Link href="/contact" />}
            variant="default"
            className="glow-cyan gap-2 px-6"
          >
            Inicie Seu Projeto
            <ArrowRight className="size-4" />
          </Button>
        </div>
      </section>
    </>
  )
}
