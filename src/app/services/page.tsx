import type { Metadata } from "next";
import Link from "next/link";

import { BeforeAfterShowcase } from "@/components/blocks/before-after-showcase";
import { ServiceCard } from "@/components/blocks/cards";
import { CtaBand, PageHero, SectionHead } from "@/components/blocks/sections";
import { Reveal, Stagger } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { services } from "@/content/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Express tunnel washes, full details, interior deep cleans, paint correction, ceramic coating and fleet accounts — with what each one actually covers.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        tag="Services"
        title="Everything we do, and what it honestly covers"
        lede="Two tunnel lanes and a detail studio. The quick services are walk-in; everything else is booked, because a four-hour job deserves a real slot rather than a queue."
      >
        <div className="flex flex-wrap gap-3 pt-2">
          <Button asChild>
            <Link href="/booking">Book a service</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/pricing">See pricing</Link>
          </Button>
        </div>
      </PageHero>

      <section className="section">
        <div className="shell">
          <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </Stagger>
        </div>
      </section>

      <section className="section border-y border-border bg-paper-2">
        <div className="shell">
          <Reveal>
            <SectionHead
              title="Results you can drag across"
              lede="We document every panel before we touch it. Drag the handle on each pair — the split follows your pointer or the arrow keys."
            />
          </Reveal>
          <div className="mt-10">
            <BeforeAfterShowcase />
          </div>
        </div>
      </section>

      {/* Fleet gets its own call-out because it is sold differently. */}
      <section id="fleet" className="section scroll-mt-24 border-y border-border bg-paper-2">
        <div className="shell grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-14">
          <Reveal>
            <SectionHead
              tag="Fleet & commercial"
              title="Standing slots, one invoice, five vehicles minimum"
              lede="If your vehicles are your advert, they should not be dirty. We reserve quiet-hour slots at your nearest site and bill it all monthly."
            />
            <div className="mt-6">
              <Button asChild>
                <Link href="/locations#contact">Talk to us about a fleet</Link>
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <ul className="grid gap-px overflow-hidden rounded-[var(--radius-lg)] border border-border bg-border sm:grid-cols-2">
              {[
                ["Reserved slots", "Yours permanently — no queueing on a Monday morning."],
                ["Per-vehicle records", "Every wash logged with a job number you can audit."],
                ["Consolidated invoicing", "One monthly invoice, optional cost-centre breakdown."],
                ["Named contact", "A person who answers, not a ticket queue."],
                ["Volume rates", "From five vehicles, priced per vehicle per wash."],
                ["Livery-safe", "Signage and wraps run through reduced-pressure touch-free."],
              ].map(([title, body]) => (
                <li key={title} className="bg-surface p-6">
                  <p className="font-[family-name:var(--font-display)] text-[length:var(--text-base)] font-semibold tracking-[-0.01em]">
                    {title}
                  </p>
                  <p className="mt-2 text-[length:var(--text-sm)] leading-relaxed text-ink-3">
                    {body}
                  </p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <CtaBand
        title="Not sure which service you need?"
        body="Book the smallest one and ask at the counter. Attendants will tell you if a car needs more — and if it doesn't, they'll say that too."
      />
    </>
  );
}
