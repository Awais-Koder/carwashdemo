import { Check, Minus } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { BeforeAfter } from "@/components/blocks/before-after";
import { PackageCard } from "@/components/blocks/cards";
import { CtaBand, PageHero, SectionHead } from "@/components/blocks/sections";
import { Reveal } from "@/components/motion/reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/disclosure";
import {
  addons,
  comparison,
  memberships,
  packages,
  pricingNotes,
} from "@/content/pricing";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Packages & pricing",
  description:
    "Four tunnel packages from $14, monthly memberships from $34, and the add-ons worth paying for. Larger vehicles and heavy soiling quoted before work starts.",
};

export default function PricingPage() {
  return (
    <>
      <PageHero
        tag="Packages & pricing"
        title="Priced so you can decide before you queue"
        lede="Four tunnel packages, three memberships and six add-ons. Everything below is walk-in pricing for a mid-size sedan — no hidden upsell at the till."
      />

      {/* ── Packages ─────────────────────────────────────────────────── */}
      <section className="section">
        <div className="shell">
          <Reveal>
            <SectionHead
              title="Tunnel packages"
              lede="Pick the wash, drive in, and finish by hand on the way out. Most people land on Shine."
            />
          </Reveal>

          <Reveal delay={0.08}>
            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {packages.map((pkg) => (
                <PackageCard key={pkg.slug} pkg={pkg} />
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section border-y border-border bg-paper-2">
        <div className="shell grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-14">
          <Reveal>
            <SectionHead
              title="What Showroom actually looks like"
              lede="The top tunnel package adds ceramic seal and hand finishing. Drag the handle — the left is before a full detail, the right is after correction and sealing."
            />
          </Reveal>
          <Reveal delay={0.08}>
            <BeforeAfter
              beforeSrc="/gallery/hero/before1.jpeg"
              afterSrc="/gallery/hero/after1.jpeg"
            />
          </Reveal>
        </div>
      </section>

      {/* ── Comparison ───────────────────────────────────────────────── */}
      <section className="section border-y border-border bg-paper-2">
        <div className="shell">
          <Reveal>
            <SectionHead
              title="Compare line by line"
              lede="No asterisks. If a feature is not in a package, the row says so."
            />
          </Reveal>

          <Reveal delay={0.08}>
            <div className="mt-10 -mx-[var(--gutter)] overflow-x-auto px-[var(--gutter)] md:mx-0 md:px-0">
              <table className="w-full min-w-[42rem] border-collapse text-[length:var(--text-sm)]">
                <caption className="sr-only">
                  Feature comparison across the Splash, Shine, Shield and
                  Showroom packages
                </caption>
                <thead>
                  <tr className="border-b border-border-strong">
                    <th
                      scope="col"
                      className="py-4 pr-4 text-left text-[length:var(--text-xs)] font-semibold uppercase tracking-[0.12em] text-ink-3"
                    >
                      Feature
                    </th>
                    {packages.map((pkg) => (
                      <th
                        key={pkg.slug}
                        scope="col"
                        className="px-4 py-4 text-center"
                      >
                        <span className="block font-[family-name:var(--font-display)] text-[length:var(--text-base)] font-semibold">
                          {pkg.name}
                        </span>
                        <span className="mt-1 block font-[family-name:var(--font-body)] text-[length:var(--text-xs)] font-normal text-ink-3">
                          ${pkg.price}
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {comparison.map((row, index) => (
                    <tr
                      key={row.feature}
                      className={cn(
                        "border-b border-border",
                        index % 2 === 1 && "bg-surface/60",
                      )}
                    >
                      <th
                        scope="row"
                        className="py-3.5 pr-4 text-left font-medium text-ink-2"
                      >
                        {row.feature}
                      </th>
                      {row.values.map((included, cellIndex) => (
                        <td
                          key={`${row.feature}-${packages[cellIndex].slug}`}
                          className="px-4 py-3.5 text-center"
                        >
                          {included ? (
                            <>
                              <Check
                                className="mx-auto size-4 text-accent"
                                aria-hidden="true"
                              />
                              <span className="sr-only">Included</span>
                            </>
                          ) : (
                            <>
                              <Minus
                                className="mx-auto size-4 text-border-strong"
                                aria-hidden="true"
                              />
                              <span className="sr-only">Not included</span>
                            </>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Memberships ──────────────────────────────────────────────── */}
      <section className="section">
        <div className="shell">
          <Reveal>
            <SectionHead
              title="Unlimited memberships"
              lede="One monthly payment, unlimited washes at your tier, at any location. Cancel any time — no minimum term."
            />
          </Reveal>

          <Reveal delay={0.08}>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {memberships.map((plan) => (
                <div
                  key={plan.name}
                  className={cn(
                    "flex h-full flex-col gap-5 rounded-[var(--radius-lg)] border bg-surface p-6",
                    "featured" in plan && plan.featured
                      ? "border-accent shadow-[var(--glow-accent)]"
                      : "border-border",
                  )}
                >
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-[family-name:var(--font-display)] text-[length:var(--text-xl)] font-semibold tracking-[-0.02em]">
                      {plan.name}
                    </h3>
                    {"featured" in plan && plan.featured && (
                      <Badge tone="accent">Best value</Badge>
                    )}
                  </div>

                  <p className="text-[length:var(--text-sm)] leading-snug text-ink-3">
                    {plan.pitch}
                  </p>

                  <p className="flex items-baseline gap-1.5">
                    {plan.price > 0 ? (
                      <>
                        <span className="font-[family-name:var(--font-display)] text-[length:var(--text-4xl)] font-semibold tracking-[-0.04em]">
                          ${plan.price}
                        </span>
                        <span className="text-[length:var(--text-xs)] text-ink-3">
                          {plan.cadence}
                        </span>
                      </>
                    ) : (
                      <span className="font-[family-name:var(--font-display)] text-[length:var(--text-2xl)] font-semibold tracking-[-0.03em]">
                        Custom quote
                      </span>
                    )}
                  </p>

                  <ul className="flex flex-col gap-2.5 border-t border-border pt-5">
                    {plan.perks.map((perk) => (
                      <li
                        key={perk}
                        className="flex items-start gap-2.5 text-[length:var(--text-sm)] text-ink-2"
                      >
                        <Check
                          className="mt-1 size-3.5 shrink-0 text-accent"
                          aria-hidden="true"
                        />
                        <span className="min-w-0">{perk}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    asChild
                    variant={
                      "featured" in plan && plan.featured ? "primary" : "secondary"
                    }
                    className="mt-auto w-full"
                  >
                    <Link
                      href={
                        plan.price > 0
                          ? `/booking?plan=${plan.name.toLowerCase().replace(/\s+/g, "-")}`
                          : "/locations#contact"
                      }
                    >
                      {plan.price > 0 ? `Join ${plan.name}` : "Request a quote"}
                    </Link>
                  </Button>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Add-ons ──────────────────────────────────────────────────── */}
      <section id="addons" className="section scroll-mt-24 border-y border-border bg-paper-2">
        <div className="shell">
          <Reveal>
            <SectionHead
              title="Add-ons worth paying for"
              lede="Available at the lane or booked with a detail. We will tell you when an add-on is not the right fix for your problem."
            />
          </Reveal>

          <Reveal delay={0.08}>
            <Tabs defaultValue="all" className="mt-10">
              <TabsList>
                <TabsTrigger value="all">All add-ons</TabsTrigger>
                <TabsTrigger value="interior">Interior</TabsTrigger>
                <TabsTrigger value="exterior">Exterior</TabsTrigger>
              </TabsList>

              <TabsContent value="all">
                <AddonGrid />
              </TabsContent>
              <TabsContent value="interior">
                <AddonGrid
                  filter={["Pet hair removal", "Ozone odour treatment"]}
                />
              </TabsContent>
              <TabsContent value="exterior">
                <AddonGrid
                  filter={[
                    "Engine bay clean and dress",
                    "Headlight restoration",
                    "Clay bar decontamination",
                    "Rain-repellent glass",
                  ]}
                />
              </TabsContent>
            </Tabs>
          </Reveal>
        </div>
      </section>

      {/* ── Notes ────────────────────────────────────────────────────── */}
      <section className="section-tight">
        <div className="shell">
          <ul className="grid gap-4 rounded-[var(--radius-lg)] border border-dashed border-border-strong bg-surface p-6 md:grid-cols-3">
            {pricingNotes.map((note) => (
              <li
                key={note}
                className="flex gap-3 text-[length:var(--text-sm)] leading-relaxed text-ink-3"
              >
                <span
                  aria-hidden="true"
                  className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent"
                />
                {note}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand />
    </>
  );
}

function AddonGrid({ filter }: { filter?: string[] }) {
  const items = filter
    ? addons.filter((addon) => filter.includes(addon.name))
    : addons;

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((addon) => (
        <div
          key={addon.name}
          className="flex flex-col gap-2 rounded-[var(--radius-lg)] border border-border bg-surface p-5"
        >
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="min-w-0 font-[family-name:var(--font-display)] text-[length:var(--text-base)] font-semibold tracking-[-0.01em]">
              {addon.name}
            </h3>
            <span className="shrink-0 font-[family-name:var(--font-display)] text-[length:var(--text-lg)] font-semibold text-accent">
              +${addon.price}
            </span>
          </div>
          <p className="text-[length:var(--text-sm)] leading-relaxed text-ink-3">
            {addon.note}
          </p>
        </div>
      ))}
    </div>
  );
}
