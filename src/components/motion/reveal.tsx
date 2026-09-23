"use client";

import { motion, useInView, type Variants } from "motion/react";
import { useRef, type ReactNode } from "react";

import { useMotionSafe } from "@/hooks/use-motion-safe";
import { DUR, EASE_OUT } from "@/lib/motion";

/**
 * Fades and lifts its children the first time they scroll into view.
 *
 * Visibility is decided by IntersectionObserver (`useInView`), never a scroll
 * listener (design.md § Motion). The lift is 8px, not 40 — a large travel is
 * the most common "template" tell.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 8,
  once = true,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin: "-8% 0px -12% 0px" });
  const { instant, motionReady } = useMotionSafe();

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={instant ? false : { opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{
        duration: motionReady ? DUR.long : DUR.micro,
        ease: EASE_OUT,
        delay: motionReady ? delay : 0,
      }}
    >
      {children}
    </motion.div>
  );
}

/** Total time budget for a staggered run — beyond this the page feels slow. */
const STAGGER_BUDGET = 0.5;

/**
 * Runs its direct children in sequence. The per-item step is squeezed so the
 * last child never waits longer than `STAGGER_BUDGET`, no matter how long the
 * list is.
 */
export function Stagger({
  children,
  className,
  step = 0.06,
  once = true,
}: {
  children: ReactNode;
  className?: string;
  step?: number;
  once?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin: "-6% 0px -10% 0px" });
  const { instant, motionReady } = useMotionSafe();

  const items = Array.isArray(children) ? children : [children];
  const perItem =
    items.length > 1
      ? Math.min(step, STAGGER_BUDGET / (items.length - 1))
      : step;

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: motionReady ? perItem : 0,
            delayChildren: motionReady ? 0.04 : 0,
          },
        },
      }}
    >
      {items.map((child, i) => (
        <StaggerItem key={i} instant={instant} motionReady={motionReady}>
          {child}
        </StaggerItem>
      ))}
    </motion.div>
  );
}

function StaggerItem({
  children,
  instant,
  motionReady,
}: {
  children: ReactNode;
  instant: boolean;
  motionReady: boolean;
}) {
  const variants: Variants = instant
    ? { hidden: {}, show: {} }
    : motionReady
      ? {
          hidden: { opacity: 0, y: 8 },
          show: {
            opacity: 1,
            y: 0,
            transition: { duration: DUR.long, ease: EASE_OUT },
          },
        }
      : {
          hidden: { opacity: 0 },
          show: { opacity: 1, transition: { duration: DUR.micro } },
        };

  return <motion.div variants={variants}>{children}</motion.div>;
}
