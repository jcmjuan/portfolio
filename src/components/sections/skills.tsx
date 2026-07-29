import { Badge } from "@/components/ui/badge"

const skillCategories = [
  {
    title: "Linguagens",
    skills: ["TypeScript", "JavaScript", "Python", "SQL", "HTML", "CSS"],
  },
  {
    title: "Frontend",
    skills: ["React", "Next.js", "Tailwind CSS", "Shadcn UI", "Framer Motion"],
  },
  {
    title: "Backend",
    skills: ["Node.js", "Express", "NestJS", "REST APIs", "GraphQL"],
  },
  {
    title: "Banco de Dados",
    skills: ["PostgreSQL", "MongoDB", "Redis", "Supabase"],
  },
  {
    title: "DevOps",
    skills: ["Docker", "AWS", "Vercel", "GitHub Actions", "CI/CD"],
  },
  {
    title: "Ferramentas",
    skills: ["Git", "VS Code", "Figma", "Linux", "Postman"],
  },
]

export function Skills() {
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-6xl space-y-12">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Tecnologias Que <span className="text-gradient">Domino</span>
          </h2>
          <p className="mt-3 text-muted-foreground">
            Ferramentas que uso para entregar resultados de qualidade
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((category) => (
            <div
              key={category.title}
              className="space-y-4 rounded-xl border border-border bg-card p-6"
            >
              <h3 className="text-lg font-semibold">{category.title}</h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
