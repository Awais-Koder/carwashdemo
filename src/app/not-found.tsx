import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { navLinks } from "@/content/site";

export default function NotFound() {
  return (
    <section className="shell flex flex-col items-center gap-6 py-[clamp(4rem,12vw,9rem)] text-center">
      <p className="font-[family-name:var(--font-display)] text-[length:var(--text-sm)] font-semibold uppercase tracking-[0.14em] text-accent">
        404
      </p>

      <h1 className="max-w-[20ch] text-[clamp(2rem,5vw,3.25rem)] font-semibold">
        That page went through the wash
      </h1>

      <p className="lede mx-auto text-center">
        The link is broken or the page moved. Nothing is missing from the site
        itself — here is where people usually want to go.
      </p>

      <div className="mt-2 flex flex-wrap justify-center gap-3">
        <Button asChild size="lg">
          <Link href="/booking">
            Book a wash
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </Button>
        <Button asChild size="lg" variant="secondary">
          <Link href="/">Back to home</Link>
        </Button>
      </div>

      <ul className="mt-6 flex flex-wrap justify-center gap-x-5 gap-y-3">
        {navLinks.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-[length:var(--text-sm)] font-semibold text-ink-3 underline decoration-border-strong decoration-2 underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
