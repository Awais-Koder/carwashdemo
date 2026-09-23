import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { BeforeAfterShowcase } from "@/components/blocks/before-after-showcase";
import {
  BlogPostCard,
  ReviewCard,
  ServiceCard,
  PackageCard,
} from "@/components/blocks/cards";
import { HomeHero } from "@/components/blocks/home-hero";
import { PhotoStrip } from "@/components/blocks/photo-strip";
import { QuickBook } from "@/components/blocks/quick-book";
import { SitePhoto } from "@/components/blocks/site-photo";
import { CtaBand, FactStrip, SectionHead } from "@/components/blocks/sections";
import { Reveal, Stagger } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { sortedPosts } from "@/content/blog";
import { comparisonPairs, homePhotoStrip } from "@/content/gallery-images";
import { packages } from "@/content/pricing";
import { reviews } from "@/content/reviews";
import { services } from "@/content/services";
import { site } from "@/content/site";

export default function HomePage() {
  const recentPosts = sortedPosts.slice(0, 3);
  const previewPackages = packages.slice(0, 3);
  const leadPair = comparisonPairs[0];

  return (
    <>
      <HomeHero />

      {/* ── On-site photography ──────────────────────────────────────── */}
      <section
        aria-label="Photos from our wash bays"
        className="border-b border-border bg-paper-2 py-8 md:py-10"
      >
        <div className="shell mb-5">
          <p className="eyebrow">On site</p>
          <h2 className="mt-2 max-w-[20ch] text-[clamp(1.5rem,3.5vw,2.25rem)] font-semibold">
            Tunnel lanes, detail bays, drive-out finishes
          </h2>
        </div>
        <div className="shell">
          <PhotoStrip photos={homePhotoStrip} />
        </div>
      </section>

      {/* ── Quick book ───────────────────────────────────────────────── */}
      <section
        id="quick-book-teaser"
        className="section scroll-mt-24 border-b border-border"
      >
        <div className="shell">
          <Reveal>
            <QuickBook />
          </Reveal>
        </div>
      </section>

      {/* ── Before / after — lead pair ───────────────────────────────── */}
      <section className="section border-b border-border bg-surface">
        <div className="shell grid items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14">
          <Reveal>
            <BeforeAfterShowcase
              pairs={[leadPair]}
              columns={1}
              title="Drag the handle — see the wash work"
              lede="Real before-and-after pairs from express washes, full details and interior jobs. No stock photography."
            />
          </Reveal>

          <Reveal delay={0.08}>
            <div className="flex flex-col gap-5">
              <SectionHead
                tag="Results"
                title="The work speaks louder than adjectives"
                lede="We photograph every job before we touch it. Drag across the split on any comparison — the handle follows your pointer or the arrow keys."
              />
              <ul className="flex flex-col gap-4 border-t border-border pt-6">
                {site.guarantees.map((item) => (
                  <li key={item.title} className="flex gap-4">
                    <span
                      aria-hidden="true"
                      className="mt-1 size-1.5 shrink-0 rounded-full bg-accent"
                    />
                    <div className="min-w-0">
                      <p className="text-[length:var(--text-sm)] font-semibold text-ink">
                        {item.title}
                      </p>
                      <p className="mt-1 text-[length:var(--text-sm)] leading-relaxed text-ink-3">
                        {item.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
              <Button asChild variant="outline" className="w-fit">
                <Link href="/gallery">
                  All before &amp; after pairs
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Operating facts ──────────────────────────────────────────── */}
      <section className="section-tight border-b border-border">
        <div className="shell">
          <Reveal>
            <FactStrip />
          </Reveal>
        </div>
      </section>

      {/* ── Services ─────────────────────────────────────────────────── */}
      <section id="services" className="section">
        <div className="shell">
          <Reveal>
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <SectionHead
                title="Six ways to get it clean"
                lede="From a twelve-minute tunnel wash to a two-day coating job. Every service lists what it actually covers — with photos from the bays."
              />
              <Button asChild variant="outline" className="shrink-0">
                <Link href="/services">
                  All services
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </Reveal>

          <Stagger className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </Stagger>
        </div>
      </section>

      {/* ── More comparisons ─────────────────────────────────────────── */}
      <section className="section border-y border-border bg-paper-2">
        <div className="shell">
          <Reveal>
            <SectionHead
              title="More before &amp; after"
              lede="Full details, interior deep cleans and express washes — documented the same way every time."
            />
          </Reveal>
          <div className="mt-10">
            <BeforeAfterShowcase pairs={comparisonPairs.slice(1)} columns={2} />
          </div>
        </div>
      </section>

      {/* ── Packages ─────────────────────────────────────────────────── */}
      <section className="section">
        <div className="shell">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:items-end lg:gap-12">
            <Reveal>
              <SectionHead
                title="Tunnel packages"
                lede="Walk-in pricing for a mid-size sedan. Larger vehicles and heavy soiling are quoted before any work starts."
              />
            </Reveal>
            <Reveal delay={0.06}>
              <SitePhoto
                src="/gallery/hero/car4.jpeg"
                alt="Attendant finishing a vehicle after a tunnel wash"
                label="Hand dry on every express wash"
                aspect="16/10"
                className="w-full"
              />
            </Reveal>
          </div>

          <Stagger className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {previewPackages.map((pkg) => (
              <PackageCard key={pkg.slug} pkg={pkg} />
            ))}
          </Stagger>

          <Reveal delay={0.1}>
            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
              <Link
                href="/pricing"
                className="inline-flex items-center gap-1.5 text-[length:var(--text-sm)] font-semibold text-accent underline decoration-accent/30 decoration-2 underline-offset-4 transition-colors hover:decoration-accent"
              >
                Compare all packages
                <ArrowRight className="size-3.5" aria-hidden="true" />
              </Link>
              <span className="text-[length:var(--text-xs)] text-ink-3">
                Monthly memberships from $34.
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Reviews ──────────────────────────────────────────────────── */}
      <section className="section border-y border-border bg-paper-2">
        <div className="shell">
          <Reveal>
            <SectionHead
              tag="What people say"
              title="Recent reviews"
              lede="From express washes, full details, and fleet accounts — what customers mention most after a visit."
            />
          </Reveal>
        </div>

        <div className="shell mt-10">
          <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {reviews.slice(0, 6).map((review) => (
              <ReviewCard key={review.name} review={review} />
            ))}
          </Stagger>
        </div>
      </section>

      {/* ── Wash notes ───────────────────────────────────────────────── */}
      <section className="section border-b border-border">
        <div className="shell">
          <Reveal>
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <SectionHead
                title="Wash notes"
                lede="Straight answers about paint, coatings and interiors — including the ones that cost us a sale."
              />
              <Button asChild variant="outline" className="shrink-0">
                <Link href="/blog">
                  All articles
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </Reveal>

          <Stagger className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-[repeat(3,minmax(0,1fr))]">
            {recentPosts.map((post) => (
              <BlogPostCard key={post.slug} post={post} />
            ))}
          </Stagger>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
