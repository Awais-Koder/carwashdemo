"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight, Phone } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRef } from "react";

import { HeroStaticFallback } from "@/components/blocks/hero-static-fallback";
import { Button } from "@/components/ui/button";
import { site } from "@/content/site";
import { useMotionSafe } from "@/hooks/use-motion-safe";

const ScrollMorphHero = dynamic(
  () => import("@/components/ui/scroll-morph-hero"),
  {
    ssr: false,
    loading: () => <HeroStaticFallback />,
  },
);

/** Scroll runway — taller = more page scroll to complete the arc morph. */
const SCROLL_RUNWAY_VH = 180;

/**
 * Home hero — sticky scroll-morph gallery below the site header.
 * Solid paper backdrop only — photography carries the wash identity.
 */
export function HomeHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { mounted } = useMotionSafe();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const hintOpacity = useTransform(scrollYProgress, [0, 0.06], [1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative isolate border-b-4 border-accent bg-paper"
      style={{ height: `${SCROLL_RUNWAY_VH}vh` }}
    >
      <div className="sticky top-[var(--site-header-offset,4rem)] h-[min(calc(100svh-var(--site-header-offset,4rem)),48rem)] min-h-[28rem] overflow-hidden bg-paper">
        <ScrollMorphHero
          scrollProgress={scrollYProgress}
          brand={`${site.brand.wordmark}${site.brand.wordmarkAccent}`}
          eyebrow={`Since ${site.brand.founded} · Four locations · Open seven days`}
          tagline="Express tunnel washes and hand detailing — pull in dirty, drive out clean."
          arcTitle="See the bays before you book"
          arcLede="Scroll through tunnel lanes, detail bays and interiors from our sites — then hold a slot in under a minute."
          scrollHint="Scroll to browse"
        >
          <div className="flex w-full flex-wrap items-center justify-center gap-3">
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

          <motion.p
            className="mt-5 text-[length:var(--text-xs)] text-ink-3"
            style={mounted ? { opacity: hintOpacity } : undefined}
          >
            No account needed · Cancel free up to 2 hours before
          </motion.p>
        </ScrollMorphHero>
      </div>
    </section>
  );
}
