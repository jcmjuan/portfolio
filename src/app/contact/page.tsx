import type { Metadata } from "next"
import { Mail, MapPin } from "lucide-react"

import { ContactForm } from "@/components/contact/contact-form"

export const metadata: Metadata = {
  title: "Get in Touch",
  description:
    "Get in touch with Juan Carlos Matos — Full Stack Developer. Whether you have a question, want to collaborate, or just want to say hi, feel free to reach out.",
}

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@juancarlosmatos.dev",
    href: "mailto:hello@juancarlosmatos.dev",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Dominican Republic",
    href: null,
  },
]

const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-5">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-5">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "Twitter",
    href: "https://twitter.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-5">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
]

export default function ContactPage() {
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-6xl space-y-12">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Get in Touch
          </h1>
          <p className="mt-3 text-muted-foreground">
            Have a question or want to work together? Drop me a message.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <ContactForm />
          </div>

          <div className="space-y-8 lg:col-span-2">
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Contact Info</h2>
              <div className="space-y-3">
                {contactInfo.map((item) => (
                  <div key={item.label} className="flex items-start gap-3">
                    <item.icon className="mt-0.5 size-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {item.label}
                      </p>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="text-sm font-medium hover:underline"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-sm font-medium">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Social</h2>
              <div className="flex gap-3">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex size-10 items-center justify-center rounded-lg border bg-background transition-colors hover:bg-muted"
                    aria-label={link.label}
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
