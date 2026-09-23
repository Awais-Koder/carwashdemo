"use client";

import { useReducedMotion } from "motion/react";

import { useIsClient } from "@/hooks/use-is-client";

/**
 * Motion hooks that can read browser prefs must not change the first client
 * render tree. Until mounted, behave as if motion is off / reduced.
 */
export function useMotionSafe() {
  const mounted = useIsClient();
  const reduced = useReducedMotion() ?? false;
  const motionReady = mounted && !reduced;

  return {
    mounted,
    /** True once mounted and the visitor has not asked for reduced motion. */
    motionReady,
    /** Skip entrance transforms on SSR + hydration pass. */
    instant: !mounted || reduced,
  };
}
