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
            Let&apos;s Work <span className="text-gradient">Together</span>
          </h2>
          <p className="text-muted-foreground">
            Have a project in mind or just want to chat? I&apos;m always open
            to discussing new opportunities and ideas.
          </p>
          <Button
            render={<Link href="/contact" />}
            variant="default"
            className="glow-cyan gap-2 px-6"
          >
            Get in Touch
            <ArrowRight className="size-4" />
          </Button>
        </div>
      </section>
    </>
  )
}
