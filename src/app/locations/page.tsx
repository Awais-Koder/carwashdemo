import { Clock, MapPin, Phone } from "lucide-react";
import type { Metadata } from "next";

import { ContactForm } from "@/components/blocks/contact-form";
import { CtaBand, PageHero, SectionHead } from "@/components/blocks/sections";
import { Reveal, Stagger } from "@/components/motion/reveal";
import { Badge } from "@/components/ui/badge";
import { locations } from "@/content/company";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Locations & contact",
  description:
    "Four sites across the metro area — Riverside, Northgate, Lakeview and Eastfield. Opening hours, lane types, amenities and how to reach us.",
};

export default function LocationsPage() {
  return (
    <>
      <PageHero
        tag="Locations & contact"
        title="Four sites, seven days, one booking system"
        lede="Every location has at least one soft-touch and one touch-free lane, so wrapped, matte and low-clearance vehicles are welcome everywhere."
      />

      {/* ── Stylised map ─────────────────────────────────────────────── */}
      <section className="section-tight">
        <div className="shell">
          <Reveal>
            <div className="relative overflow-hidden rounded-[var(--radius-xl)] border border-border bg-surface">
              <div className="grid-paper absolute inset-0 opacity-60" aria-hidden="true" />

              <div className="relative aspect-[16/9] min-h-[19rem] w-full">
                {/* Abstract roads — a diagram, not a real map. */}
                <svg
                  viewBox="0 0 100 60"
                  className="absolute inset-0 h-full w-full"
                  aria-hidden="true"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0 34 H100"
                    stroke="var(--border-strong)"
                    strokeWidth="0.5"
                  />
                  <path
                    d="M46 0 V60"
                    stroke="var(--border-strong)"
                    strokeWidth="0.5"
                  />
                  <path
                    d="M0 12 Q28 18 46 34 T100 50"
                    stroke="var(--border)"
                    strokeWidth="0.35"
                    fill="none"
                  />
                  <path
                    d="M12 60 Q20 40 34 22 T70 0"
                    stroke="var(--border)"
                    strokeWidth="0.35"
                    fill="none"
                  />
                </svg>

                {locations.map((location) => (
                  <div
                    key={location.slug}
                    className="absolute -translate-x-1/2 -translate-y-1/2"
                    style={{ left: `${location.coords.x}%`, top: `${location.coords.y}%` }}
                  >
                    <span className="flex flex-col items-center gap-1.5">
                      <span className="grid size-9 place-items-center rounded-full border border-accent/30 bg-accent text-accent-contrast shadow-md">
                        <MapPin className="size-4" aria-hidden="true" />
                      </span>
                      <span className="whitespace-nowrap rounded-[var(--radius-pill)] border border-border bg-surface/90 px-2.5 py-1 text-[length:var(--text-2xs)] font-semibold backdrop-blur">
                        {location.name}
                      </span>
                    </span>
                  </div>
                ))}
              </div>

              <p className="relative border-t border-border bg-surface px-5 py-3 text-[length:var(--text-xs)] text-ink-3">
                Stylised site diagram, not a geographic map. Drop a real map
                embed or the client&apos;s own directions graphic in this slot.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Site cards ───────────────────────────────────────────────── */}
      <section className="section">
        <div className="shell">
          <Reveal>
            <SectionHead
              title="Pick your nearest site"
              lede="Hours differ slightly by location, and Eastfield is closed on Sundays."
            />
          </Reveal>

          <Stagger className="mt-10 grid gap-5 lg:grid-cols-2">
            {locations.map((location) => (
              <article
                key={location.slug}
                className="flex flex-col gap-5 rounded-[var(--radius-lg)] border border-border bg-surface p-6"
              >
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="font-[family-name:var(--font-display)] text-[length:var(--text-xl)] font-semibold tracking-[-0.02em]">
                    {location.name}
                  </h3>
                  {location.flagship && <Badge tone="accent">Flagship</Badge>}
                </div>

                <div className="flex flex-col gap-2.5 text-[length:var(--text-sm)] text-ink-2">
                  <span className="flex items-start gap-2">
                    <MapPin className="mt-1 size-3.5 shrink-0 text-accent" aria-hidden="true" />
                    <span>
                      {location.address}
                      <br />
                      {location.city}
                    </span>
                  </span>
                  <span className="flex items-center gap-2">
                    <Phone className="size-3.5 shrink-0 text-accent" aria-hidden="true" />
                    <a
                      href={`tel:${location.phone.replace(/[^\d+]/g, "")}`}
                      className="transition-colors hover:text-accent"
                    >
                      {location.phone}
                    </a>
                  </span>
                </div>

                <dl className="grid gap-4 border-t border-border pt-5 sm:grid-cols-2">
                  <div>
                    <dt className="flex items-center gap-1.5 text-[length:var(--text-2xs)] font-semibold uppercase tracking-wider text-ink-3">
                      <Clock className="size-3" aria-hidden="true" />
                      Hours
                    </dt>
                    <dd className="mt-2">
                      <ul className="flex flex-col gap-1">
                        {location.hours.map((entry) => (
                          <li
                            key={entry.days}
                            className="flex justify-between gap-3 text-[length:var(--text-xs)]"
                          >
                            <span className="text-ink-3">{entry.days}</span>
                            <span className="font-medium tabular-nums text-ink-2">
                              {entry.time}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </dd>
                  </div>

                  <div>
                    <dt className="text-[length:var(--text-2xs)] font-semibold uppercase tracking-wider text-ink-3">
                      Lanes
                    </dt>
                    <dd className="mt-2 flex flex-wrap gap-1.5">
                      {location.lanes.map((lane) => (
                        <span
                          key={lane}
                          className="rounded-[var(--radius-pill)] bg-muted px-2.5 py-1 text-[length:var(--text-2xs)] font-medium text-ink-2"
                        >
                          {lane}
                        </span>
                      ))}
                    </dd>
                  </div>
                </dl>

                <div className="border-t border-border pt-5">
                  <p className="text-[length:var(--text-2xs)] font-semibold uppercase tracking-wider text-ink-3">
                    On site
                  </p>
                  <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1.5">
                    {location.amenities.map((amenity) => (
                      <li
                        key={amenity}
                        className="flex items-center gap-2 text-[length:var(--text-xs)] text-ink-2"
                      >
                        <span
                          aria-hidden="true"
                          className="size-1 rounded-full bg-accent"
                        />
                        {amenity}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ── Contact ──────────────────────────────────────────────────── */}
      <section id="contact" className="section scroll-mt-24 border-y border-border bg-paper-2">
        <div className="shell grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-16">
          <Reveal>
            <SectionHead
              title="Get in touch"
              lede="Fleet quotes, a question about a booking, or something that went wrong — it all reaches a person, usually the same working day."
            />

            <dl className="mt-8 flex flex-col gap-5">
              <div>
                <dt className="text-[length:var(--text-2xs)] font-semibold uppercase tracking-wider text-ink-3">
                  Phone
                </dt>
                <dd className="mt-1">
                  <a
                    href={site.contact.phoneHref}
                    className="font-[family-name:var(--font-display)] text-[length:var(--text-xl)] font-semibold tracking-[-0.02em] transition-colors hover:text-accent"
                  >
                    {site.contact.phone}
                  </a>
                </dd>
              </div>

              <div>
                <dt className="text-[length:var(--text-2xs)] font-semibold uppercase tracking-wider text-ink-3">
                  Email
                </dt>
                <dd className="mt-1">
                  <a
                    href={`mailto:${site.contact.email}`}
                    className="text-[length:var(--text-sm)] font-medium text-ink-2 transition-colors hover:text-accent"
                  >
                    {site.contact.email}
                  </a>
                </dd>
              </div>

              <div>
                <dt className="text-[length:var(--text-2xs)] font-semibold uppercase tracking-wider text-ink-3">
                  Head office
                </dt>
                <dd className="mt-1 text-[length:var(--text-sm)] leading-relaxed text-ink-2">
                  {site.contact.address.line1}
                  <br />
                  {site.contact.address.city}, {site.contact.address.region}{" "}
                  {site.contact.address.postal}
                </dd>
              </div>

              <div>
                <dt className="text-[length:var(--text-2xs)] font-semibold uppercase tracking-wider text-ink-3">
                  Hours
                </dt>
                <dd className="mt-2">
                  <ul className="flex flex-col gap-1.5">
                    {site.contact.hours.map((entry) => (
                      <li
                        key={entry.days}
                        className="flex justify-between gap-4 text-[length:var(--text-sm)]"
                      >
                        <span className="text-ink-3">{entry.days}</span>
                        <span className="font-medium tabular-nums text-ink-2">
                          {entry.time}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-2 text-[length:var(--text-xs)] text-ink-3">
                    {site.contact.hoursNote}
                  </p>
                </dd>
              </div>
            </dl>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="rounded-[var(--radius-lg)] border border-border bg-surface p-6 md:p-8">
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand
        title="Rather just book it?"
        body="Booking takes under a minute and holds the slot. No account, no card."
      />
    </>
  );
}
