import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { facts } from "@/content/reviews";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

/**
 * Section head.
 *
 * Gate 54 · the tag (when used at all) always stacks directly above the
 * heading in the same column. The hanging left-margin label pattern is banned —
 * it is the single most reliable templated-editorial tell.
 */
export function SectionHead({
  tag,
  title,
  lede,
  align = "start",
  className,
}: {
  tag?: string;
  title: ReactNode;
  lede?: ReactNode;
  align?: "start" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {tag && <p className="eyebrow">{tag}</p>}
      <h2 className="max-w-[22ch] text-[clamp(1.9rem,4.2vw,3rem)] font-semibold">
        {title}
      </h2>
      {lede && (
        <p
          className={cn(
            "lede",
            align === "center" && "mx-auto text-center",
          )}
        >
          {lede}
        </p>
      )}
    </div>
  );
}

/** Closing call-to-action band. */
export function CtaBand({
  title = "Your car is dirtier than you think.",
  body = "Book a slot in under a minute, or just drive in. Either way you'll be dry and finished before the coffee goes cold.",
  primary = { href: "/booking", label: "Book a wash" },
  secondary,
}: {
  title?: string;
  body?: string;
  primary?: { href: string; label: string };
  secondary?: { href: string; label: string };
}) {
  return (
    <section className="section">
      <div className="shell">
        <Reveal>
          {/* Statement band — uses the non-inverting `band` tokens so it stays
              dark in both themes instead of flipping to a light surface. */}
          <div className="rounded-[var(--radius-xl)] border border-band-border bg-band px-6 py-[clamp(2.5rem,6vw,4.5rem)] text-center md:px-14">
            <div className="mx-auto flex max-w-[46rem] flex-col items-center gap-5">
              <h2 className="text-[clamp(1.75rem,4vw,2.75rem)] font-semibold text-band-ink">
                {title}
              </h2>
              <p className="max-w-[var(--measure-tight)] text-[length:var(--text-base)] leading-relaxed text-band-muted">
                {body}
              </p>
              <div className="mt-2 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg">
                  <Link href={primary.href}>
                    {primary.label}
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-band-border text-band-ink hover:border-band-ink/60 hover:bg-band-ink/10 hover:text-band-ink"
                >
                  <Link href={secondary?.href ?? site.contact.phoneHref}>
                    {secondary?.label ?? `Call ${site.contact.phone}`}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/**
 * Fact strip.
 *
 * These are operating facts (locations, open year, wash time, guarantee
 * window), not invented performance metrics. Any entry with a null value
 * renders as a labelled "to confirm" placeholder instead of a fake number.
 */
export function FactStrip({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-px overflow-hidden rounded-[var(--radius-lg)] border border-border bg-border lg:grid-cols-4",
        className,
      )}
    >
      {facts.map((fact) => (
        <div key={fact.label} className="bg-surface px-5 py-6">
          <p className="text-[length:var(--text-2xs)] font-semibold uppercase tracking-[0.12em] text-ink-3">
            {fact.label}
          </p>
          {fact.value ? (
            <p className="mt-2 font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2rem)] font-semibold leading-none tracking-[-0.03em]">
              {fact.value}
            </p>
          ) : (
            <p className="mt-2 flex items-center gap-2 text-[length:var(--text-lg)] font-semibold text-ink-3">
              <span className="inline-block h-6 w-14 rounded-[var(--radius-xs)] bg-muted" />
              <span className="text-[length:var(--text-2xs)] font-medium uppercase tracking-wider">
                To confirm
              </span>
            </p>
          )}
          {fact.note && (
            <p className="mt-2 text-[length:var(--text-xs)] leading-snug text-ink-3">
              {fact.note}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

/** Tick list used inside service and package blocks. */
export function CheckList({
  items,
  className,
  tone = "accent",
}: {
  items: readonly string[];
  className?: string;
  tone?: "accent" | "muted";
}) {
  return (
    <ul className={cn("flex flex-col gap-2.5", className)}>
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2.5 text-[length:var(--text-sm)]">
          <span
            className={cn(
              "mt-0.5 grid size-4 shrink-0 place-items-center rounded-full",
              tone === "accent"
                ? "bg-accent-soft text-accent"
                : "bg-muted text-ink-3",
            )}
          >
            <Check className="size-2.5" strokeWidth={3} aria-hidden="true" />
          </span>
          <span className="min-w-0 text-ink-2">{item}</span>
        </li>
      ))}
    </ul>
  );
}

/** Simple page hero for interior routes. */
export function PageHero({
  tag,
  title,
  lede,
  children,
}: {
  tag?: string;
  title: ReactNode;
  lede?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="border-b border-border bg-paper-2">
      <div className="shell flex flex-col gap-5 py-[clamp(3rem,7vw,5.5rem)]">
        {tag && <p className="eyebrow">{tag}</p>}
        <h1 className="max-w-[24ch] text-[clamp(2.1rem,5.4vw,3.75rem)] font-semibold">
          {title}
        </h1>
        {lede && <p className="lede">{lede}</p>}
        {children}
      </div>
    </section>
  );
}
