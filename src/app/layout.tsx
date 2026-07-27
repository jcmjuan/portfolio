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
    default: "Juan Carlos Matos | Full Stack Developer",
    template: "%s | Juan Carlos Matos",
  },
  description:
    "Full Stack Developer specializing in modern web technologies. Building elegant, performant, and user-centric applications.",
  keywords: [
    "developer",
    "portfolio",
    "full stack",
    "web development",
    "react",
    "nextjs",
    "typescript",
  ],
  authors: [{ name: "Juan Carlos Matos" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Juan Carlos Matos Portfolio",
    title: "Juan Carlos Matos | Full Stack Developer",
    description:
      "Full Stack Developer specializing in modern web technologies.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Juan Carlos Matos | Full Stack Developer",
    description:
      "Full Stack Developer specializing in modern web technologies.",
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
      lang="en"
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
