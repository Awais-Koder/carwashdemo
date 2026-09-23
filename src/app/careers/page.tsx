import { ArrowRight, MapPin } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { PhotoFrame } from "@/components/blocks/photo-frame";
import { CheckList, CtaBand, PageHero, SectionHead } from "@/components/blocks/sections";
import { Reveal, Stagger } from "@/components/motion/reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { perks, roles, values } from "@/content/company";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Tunnel attendants, detailers and a site-lead training programme. Rosters posted four weeks ahead, breaks protected, and paid paint-correction certification.",
};

export default function CareersPage() {
  return (
    <>
      <PageHero
        tag="Careers"
        title="A car wash is a team sport, not a conveyor belt"
        lede="A tired attendant at the end of a tunnel is how paint gets scratched. So rosters go up four weeks ahead, breaks are protected, and nobody is paid per car."
      />

      {/* ── Why work here ────────────────────────────────────────────── */}
      <section className="section">
        <div className="shell grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
          <Reveal>
            <SectionHead
              title="What the job is actually like"
              lede="Fast, physical, and outdoors in every season. The good part is that the work is finished when the car drives off — nobody takes a half-washed car home with them."
            />
          </Reveal>

          <Reveal delay={0.08}>
            <div className="rounded-[var(--radius-lg)] border border-border bg-surface p-7">
              <h2 className="font-[family-name:var(--font-display)] text-[length:var(--text-lg)] font-semibold tracking-[-0.02em]">
                What you get
              </h2>
              <CheckList items={perks} className="mt-5" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Open roles ───────────────────────────────────────────────── */}
      <section className="section border-y border-border bg-paper-2">
        <div className="shell">
          <Reveal>
            <SectionHead
              title="Open roles"
              lede="Three roles across the four sites. No experience needed for the attendant role — we train on site."
            />
          </Reveal>

          <Stagger className="mt-10 flex flex-col gap-5">
            {roles.map((role) => (
              <article
                key={role.title}
                className="grid gap-6 rounded-[var(--radius-lg)] border border-border bg-surface p-6 transition-[border-color,box-shadow] duration-300 ease-out hover:border-accent/45 hover:shadow-md lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:p-8"
              >
                <div className="flex flex-col gap-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="font-[family-name:var(--font-display)] text-[length:var(--text-xl)] font-semibold tracking-[-0.02em]">
                      {role.title}
                    </h3>
                    <Badge tone="neutral">{role.type}</Badge>
                  </div>

                  <p className="text-[length:var(--text-sm)] leading-relaxed text-ink-3">
                    {role.summary}
                  </p>

                  <dl className="flex flex-col gap-2 text-[length:var(--text-sm)]">
                    <div className="flex items-center gap-2 text-ink-2">
                      <MapPin className="size-3.5 shrink-0 text-accent" aria-hidden="true" />
                      <dt className="sr-only">Location</dt>
                      <dd>{role.location}</dd>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <dt className="text-[length:var(--text-2xs)] font-semibold uppercase tracking-wider text-ink-3">
                        Pay
                      </dt>
                      <dd className="font-medium text-ink-2">{role.salary}</dd>
                    </div>
                  </dl>
                </div>

                <div className="flex flex-col gap-4">
                  <h4 className="text-[length:var(--text-xs)] font-semibold uppercase tracking-[0.12em] text-ink-3">
                    You&apos;ll be doing
                  </h4>
                  <ul className="flex flex-col gap-3">
                    {role.youWill.map((item) => (
                      <li
                        key={item}
                        className="flex gap-3 text-[length:var(--text-sm)] leading-relaxed text-ink-2"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-2 size-1.5 shrink-0 rounded-full bg-accent"
                        />
                        <span className="min-w-0">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ── Culture ──────────────────────────────────────────────────── */}
      <section className="section">
        <div className="shell">
          <Reveal>
            <SectionHead
              title="The rules that make it a decent place to work"
              lede="Same four rules the business runs on. They apply to staff exactly as much as customers."
            />
          </Reveal>

          <Stagger className="mt-10 grid gap-6 sm:grid-cols-2">
            {values.map((value) => (
              <div
                key={value.title}
                className="flex flex-col gap-3 rounded-[var(--radius-lg)] border border-border bg-surface p-6"
              >
                <h3 className="font-[family-name:var(--font-display)] text-[length:var(--text-base)] font-semibold tracking-[-0.01em]">
                  {value.title}
                </h3>
                <p className="text-[length:var(--text-sm)] leading-relaxed text-ink-3">
                  {value.body}
                </p>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ── Apply ────────────────────────────────────────────────────── */}
      <section className="section border-t border-border bg-paper-2">
        <div className="shell grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)] lg:gap-16">
          <Reveal>
            <SectionHead
              title="How to apply"
              lede="No portal, no personality quiz. Tell us which site suits you and roughly when you can start, and a real person will reply."
            />
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href="/locations#contact">
                  Send an application
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <PhotoFrame scene="team" className="aspect-[4/3]" />
          </Reveal>
        </div>
      </section>

      <CtaBand
        title="Not looking for a job?"
        body="Then this is your reminder that the car outside is probably dirtier than you think."
      />
    </>
  );
}
