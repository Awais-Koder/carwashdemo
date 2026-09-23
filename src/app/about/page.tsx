import type { Metadata } from "next";
import Link from "next/link";

import { BeforeAfter } from "@/components/blocks/before-after";
import { PhotoFrame } from "@/components/blocks/photo-frame";
import {
  CheckList,
  CtaBand,
  FactStrip,
  PageHero,
  SectionHead,
} from "@/components/blocks/sections";
import { Reveal, Stagger } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { site } from "@/content/site";
import { perks, team, timeline, values } from "@/content/company";

export const metadata: Metadata = {
  title: "About",
  description:
    "Family run since 2009. Four locations, two lanes each, one detail studio — and a habit of telling people when a service is not worth their money.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        tag="About"
        title="Started with one bay and a borrowed pressure washer"
        lede={`${site.brand.name} opened in ${site.brand.founded} with a hand-wash bay on Riverside Drive and a handwritten price board. Seventeen years later the price board is digital, but the habit of telling people when they don't need something hasn't changed.`}
      />

      <section className="section-tight">
        <div className="shell">
          <Reveal>
            <FactStrip />
          </Reveal>
        </div>
      </section>

      <section className="section border-b border-border bg-paper-2">
        <div className="shell grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-14">
          <Reveal>
            <BeforeAfter
              beforeSrc="/gallery/hero/before3.png"
              afterSrc="/gallery/hero/after3.png"
              caption="Interior deep cleans are where the before-and-after story matters most — smells and stains don't lie."
            />
          </Reveal>
          <Reveal delay={0.08}>
            <SectionHead
              title="We photograph before we touch"
              lede="Started as a one-bay hand wash with a Polaroid camera on the dash. Seventeen years later every detail still gets a full panel set — because trust is easier when the evidence is on your phone."
            />
          </Reveal>
        </div>
      </section>

      {/* ── Values ───────────────────────────────────────────────────── */}
      <section className="section">
        <div className="shell">
          <Reveal>
            <SectionHead
              title="Four rules we actually follow"
              lede="Not a mission statement. These are the operating rules that decide how the sites run day to day."
            />
          </Reveal>

          <Stagger className="mt-10 grid gap-px overflow-hidden rounded-[var(--radius-lg)] border border-border bg-border md:grid-cols-2">
            {values.map((value) => (
              <div key={value.title} className="flex flex-col gap-3 bg-surface p-7">
                <h3 className="font-[family-name:var(--font-display)] text-[length:var(--text-lg)] font-semibold tracking-[-0.02em]">
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

      {/* ── Timeline ─────────────────────────────────────────────────── */}
      <section className="section border-y border-border bg-paper-2">
        <div className="shell">
          <Reveal>
            <SectionHead
              title="How it grew"
              lede="Six moments that shaped how the business runs today."
            />
          </Reveal>

          <ol className="mt-10 grid gap-px overflow-hidden rounded-[var(--radius-lg)] border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {timeline.map((entry) => (
              <li key={entry.year} className="flex flex-col gap-3 bg-surface p-6">
                <span className="font-[family-name:var(--font-display)] text-[length:var(--text-2xl)] font-semibold tabular-nums tracking-[-0.03em] text-accent">
                  {entry.year}
                </span>
                <h3 className="font-[family-name:var(--font-display)] text-[length:var(--text-base)] font-semibold tracking-[-0.01em]">
                  {entry.title}
                </h3>
                <p className="text-[length:var(--text-sm)] leading-relaxed text-ink-3">
                  {entry.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Team ─────────────────────────────────────────────────────── */}
      <section className="section">
        <div className="shell">
          <Reveal>
            <SectionHead
              title="Who actually washes your car"
              lede="The people on the tunnel line, in the detail bay, and at the counter — who you'll actually meet when you pull in."
            />
          </Reveal>

          <Stagger className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((person) => (
              <figure key={person.name} className="flex flex-col gap-4">
                <PhotoFrame scene={person.scene} className="aspect-[4/5]" />
                <figcaption className="flex flex-col gap-1">
                  <p className="font-[family-name:var(--font-display)] text-[length:var(--text-base)] font-semibold tracking-[-0.01em]">
                    {person.name}
                  </p>
                  <p className="text-[length:var(--text-xs)] font-semibold uppercase tracking-wider text-accent">
                    {person.role}
                  </p>
                  <p className="mt-1 text-[length:var(--text-sm)] leading-relaxed text-ink-3">
                    {person.bio}
                  </p>
                </figcaption>
              </figure>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ── Careers teaser ───────────────────────────────────────────── */}
      <section className="section border-t border-border bg-paper-2">
        <div className="shell grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
          <Reveal>
            <SectionHead
              title="Hiring, and we mean it"
              lede="Tunnel attendant, detailer and a site-lead training programme. Rotations are posted four weeks ahead and breaks are protected — a tired attendant at the end of a tunnel is how paint gets scratched."
            />
            <div className="mt-6">
              <Button asChild>
                <Link href="/careers">See open roles</Link>
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="rounded-[var(--radius-lg)] border border-border bg-surface p-7">
              <h3 className="font-[family-name:var(--font-display)] text-[length:var(--text-lg)] font-semibold tracking-[-0.02em]">
                What you get
              </h3>
              <CheckList items={perks} className="mt-5" />
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
