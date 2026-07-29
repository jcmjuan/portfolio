import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    name: "Cliente 1",
    role: "CEO, Empresa X",
    content: "Depoimento será adicionado em breve.",
    rating: 5,
  },
  {
    name: "Cliente 2",
    role: "Diretor, Empresa Y",
    content: "Depoimento será adicionado em breve.",
    rating: 5,
  },
  {
    name: "Cliente 3",
    role: "Fundador, Startup Z",
    content: "Depoimento será adicionado em breve.",
    rating: 5,
  },
]

export function Testimonials() {
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-6xl space-y-12">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            O Que Meus{" "}
            <span className="text-gradient">Clientes Dizem</span>
          </h2>
          <p className="mt-3 text-muted-foreground">
            Depoimentos de quem já trabalhou comigo
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="relative space-y-4 rounded-xl border border-border bg-card p-6"
            >
              <Quote className="absolute right-4 top-4 size-8 text-muted-foreground/10" />

              <div className="flex gap-1">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="size-4 fill-yellow-500 text-yellow-500"
                  />
                ))}
              </div>

              <p className="text-muted-foreground italic">
                &ldquo;{testimonial.content}&rdquo;
              </p>

              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500/20 to-violet-500/20">
                  <span className="text-sm font-semibold text-muted-foreground">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
