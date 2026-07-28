import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
      <h1 className="text-6xl font-bold tracking-tight">
        <span className="text-gradient">404</span>
      </h1>
      <p className="mt-4 text-lg text-muted-foreground">
        This page could not be found.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center justify-center rounded-lg border border-transparent bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
      >
        Go Home
      </Link>
    </section>
  );
}
