import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Toaster } from "sonner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Juan Carlos Matos | Desenvolvedor Full Stack",
    template: "%s | Juan Carlos Matos",
  },
  description:
    "Desenvolvedor Full Stack especializado em tecnologias web modernas. Construindo aplicações elegantes, performáticas e centradas no usuário.",
  keywords: [
    "desenvolvedor",
    "portfólio",
    "full stack",
    "desenvolvimento web",
    "react",
    "nextjs",
    "typescript",
  ],
  authors: [{ name: "Juan Carlos Matos" }],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Portfólio de Juan Carlos Matos",
    title: "Juan Carlos Matos | Desenvolvedor Full Stack",
    description:
      "Desenvolvedor Full Stack especializado em tecnologias web modernas.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Juan Carlos Matos | Desenvolvedor Full Stack",
    description:
      "Desenvolvedor Full Stack especializado em tecnologias web modernas.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <Toaster position="bottom-right" richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
