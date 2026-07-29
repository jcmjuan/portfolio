import { Globe, Monitor, ShoppingCart, FileText } from "lucide-react"

const services = [
  {
    title: "Sites Institucionais",
    description:
      "Sites profissionais que transmitem credibilidade e fortalecem a presença digital da sua empresa no mercado.",
    icon: Globe,
  },
  {
    title: "Aplicações Web",
    description:
      "Sistemas sob medida para automatizar processos, gerenciar dados e impulsionar a eficiência do seu negócio.",
    icon: Monitor,
  },
  {
    title: "E-commerce",
    description:
      "Lojas online completas com payment integration, gestão de estoque e experiência de compra otimizada.",
    icon: ShoppingCart,
  },
  {
    title: "Landing Pages",
    description:
      "Páginas de conversão otimizadas para captar leads, promover produtos e gerar resultados mensuráveis.",
    icon: FileText,
  },
]

export function Services() {
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-6xl space-y-12">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            O Que Posso <span className="text-gradient">Fazer Por Você</span>
          </h2>
          <p className="mt-3 text-muted-foreground">
            Soluções completas para sua presença digital
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <div
              key={service.title}
              className="space-y-4 rounded-xl border border-border bg-card p-6 transition-colors hover:border-cyan-500/30"
            >
              <div className="flex size-12 items-center justify-center rounded-lg bg-cyan-500/10">
                <service.icon className="size-6 text-cyan-400" />
              </div>
              <h3 className="text-lg font-semibold">{service.title}</h3>
              <p className="text-sm text-muted-foreground">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
