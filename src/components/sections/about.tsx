import { GraduationCap, Award, BookOpen } from "lucide-react"

const education = [
  {
    title: "Ciência da Computação",
    institution: "Em andamento",
    description: "Graduação em andamento, aprofundando conhecimentos em algoritmos, estruturas de dados e engenharia de software.",
    icon: BookOpen,
    status: "Cursando",
  },
  {
    title: "Análise e Desenvolvimento de Sistemas",
    institution: "Graduação",
    description: "Formação sólida em desenvolvimento de software, banco de dados e metodologias ágeis.",
    icon: GraduationCap,
    status: "Concluído",
  },
  {
    title: "Informática para Internet",
    institution: "Técnico",
    description: "Primeira formação em desenvolvimento web, design digital e programação.",
    icon: Award,
    status: "Concluído",
  },
]

export function About() {
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-6xl space-y-12">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Sobre <span className="text-gradient">Mim</span>
          </h2>
          <p className="mt-3 text-muted-foreground">
            Minha trajetória e formação acadêmica
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="flex flex-col space-y-6">
            <h3 className="text-xl font-semibold">Quem Sou</h3>

            <div className="rounded-xl border border-border bg-card p-6">
              <p className="text-muted-foreground leading-relaxed">
                Sou um desenvolvedor web freelancer apaixonado por criar soluções
                digitais que fazem a diferença. Com formação técnica e superior
                em áreas da computação, combino conhecimento técnico com
                visão de negócio para entregar projetos que geram resultados
                reais para meus clientes.
              </p>
            </div>

            <div className="mt-auto rounded-xl border border-border bg-card p-6">
              <h3 className="text-xl font-semibold mb-4">Minha Abordagem</h3>
              <p className="text-muted-foreground leading-relaxed">
                Acredito que bom código não é apenas funcional, mas também
                limpo, maintível e escalável. Cada projeto é tratado com
                atenção aos detalhes, foco na experiência do usuário e
                compromisso com prazos e qualidade.
              </p>
            </div>
          </div>

          <div className="flex flex-col space-y-6">
            <h3 className="text-xl font-semibold">Formação Acadêmica</h3>
            {education.map((item) => (
              <div
                key={item.title}
                className="flex gap-4 rounded-xl border border-border bg-card p-4"
              >
                <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-violet-500/10">
                  <item.icon className="size-6 text-violet-400" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold">{item.title}</h4>
                    <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs text-emerald-400">
                      {item.status}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {item.institution}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
