"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

import "lenis/dist/lenis.css";

import { useIsClient } from "@/hooks/use-is-client";

/**
 * Smooth scroll.
 *
 * Mounted once in the root layout, above the page. Lenis drives the *native*
 * scroll position rather than translating a wrapper, so `position: sticky`
 * (the home hero runway), IntersectionObserver reveals, and Motion's
 * `useScroll` all keep working untouched.
 *
 * `respectReducedMotion` (Lenis' default) is left on: visitors who ask for less
 * motion get 1:1 scroll with no inertia, but anchor links still resolve.
 * It is a no-op on the server, so it never affects the static export.
 */
export function SmoothScroll() {
  const mounted = useIsClient();
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (!mounted) return;
    /* Respect a visitor who has already switched reduced-motion on: don't
       mount the smoothing layer at all, so nothing runs on their behalf. */
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      respectReducedMotion: true,
      /* Hash links land below the sticky header — which is taller while the
         announcement bar is open — instead of underneath it. */
      anchors: { offset: -104 },
      autoRaf: true,
    });

    lenisRef.current = lenis;
    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [mounted]);

  /* A client-side route change swaps the whole document height; recalculate so
     the virtual scroll length is correct for the new page. */
  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;
    const frame = window.requestAnimationFrame(() => lenis.resize());
    return () => window.cancelAnimationFrame(frame);
  }, [pathname]);

  return null;
}
