import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
      <h1 className="text-6xl font-bold tracking-tight">
        <span className="text-gradient">404</span>
      </h1>
      <p className="mt-4 text-lg text-muted-foreground">
        This page could not be found.
      </p>
      <Button render={<Link href="/" />} variant="outline" className="mt-8 gap-2">
        Go Home
      </Button>
    </section>
  );
}
