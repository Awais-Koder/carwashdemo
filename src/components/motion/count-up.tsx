"use client";

import { animate, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";

import { useMotionSafe } from "@/hooks/use-motion-safe";

/**
 * Counts from 0 to `value` once, when scrolled into view.
 *
 * Only ever drive this with a real, supplied number — an invented figure is
 * worse than no figure at all.
 */
export function CountUp({
  value,
  suffix = "",
  prefix = "",
  decimals = 0,
  duration = 1.6,
  className,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const { mounted, motionReady } = useMotionSafe();
  const [counted, setCounted] = useState(0);

  /* Defer reduced-motion branching until after hydration. */
  const display = mounted && !motionReady ? value : counted;

  useEffect(() => {
    if (!mounted || !inView || !motionReady) return;

    const controls = animate(0, value, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: setCounted,
    });
    return () => controls.stop();
  }, [mounted, inView, motionReady, value, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display.toFixed(decimals)}
      {suffix}
    </span>
  );
}
