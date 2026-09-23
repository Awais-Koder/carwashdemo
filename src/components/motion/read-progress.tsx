"use client";

import { motion, useScroll, useSpring } from "motion/react";

/** Hairline reading-progress bar for long-form pages. */
export function ReadProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 26,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[80] h-0.5 origin-left bg-accent"
    />
  );
}
