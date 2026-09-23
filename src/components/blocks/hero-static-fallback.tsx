import { ArrowRight, Phone } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { site } from "@/content/site";

/** SSR / loading shell — matches hero layout without motion (hydration-safe). */
export function HeroStaticFallback() {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center px-4 text-center">
      <p className="text-[length:var(--text-xs)] font-semibold uppercase tracking-[var(--tracking-caps)] text-ink-3">
        Since {site.brand.founded} · Four locations · Open seven days
      </p>
      <h1 className="mt-3 font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.75rem)] font-semibold tracking-[var(--tracking-display)] text-ink">
        {site.brand.wordmark}
        <span className="text-accent">{site.brand.wordmarkAccent}</span>
      </h1>
      <p className="mt-4 max-w-md text-[length:var(--text-sm)] leading-relaxed text-ink-3">
        Twelve-minute express washes and hand detailing that tells you honestly
        what will and won&apos;t come out.
      </p>
      <div className="mt-8 flex w-full flex-wrap items-center justify-center gap-3">
        <Button asChild size="lg">
          <Link href="/booking">
            Book a wash
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <a href={site.contact.phoneHref}>
            <Phone className="size-4" aria-hidden="true" />
            {site.contact.phone}
          </a>
        </Button>
      </div>
      <p className="mt-5 text-[length:var(--text-xs)] text-ink-3">
        No account needed · Cancel free up to 2 hours before
      </p>
    </div>
  );
}
