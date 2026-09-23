"use client";

import { AnimatePresence, motion } from "motion/react";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";

import { site } from "@/content/site";
import { useMotionSafe } from "@/hooks/use-motion-safe";

const BOOT_KEY = "jdw:booted";

const noopSubscribe = () => () => {};
const HOLD_MS = 700;
const CURTAIN_MS = 460;

/**
 * First-visit splash.
 *
 * Only runs when a blocking script in <head> set `html.is-booting`, which
 * happens once per browser session. Repeat visits and every client-side route
 * change skip it entirely — a loader you see more than once is a tax, not a
 * flourish.
 */
export function BootSplash() {
  const { mounted, motionReady } = useMotionSafe();
  const [leaving, setLeaving] = useState(false);
  const [finished, setFinished] = useState(false);

  /* The <html> class is the source of truth, written by the blocking script
     before first paint. Defer reading it until after hydration so React state
     matches the server HTML on the first client pass. CSS still shows the
     overlay via `html.is-booting` before React catches up. */
  const bootingFromDom = useSyncExternalStore(
    noopSubscribe,
    () => document.documentElement.classList.contains("is-booting"),
    () => false,
  );
  const booting = mounted && bootingFromDom;
  const active = booting && !finished;

  useEffect(() => {
    if (!mounted || !active || leaving) return;
    const hold = window.setTimeout(
      () => setLeaving(true),
      motionReady ? HOLD_MS : 220,
    );
    return () => window.clearTimeout(hold);
  }, [mounted, active, leaving, motionReady]);

  /* A splash you cannot skip is a tax. Any key or pointer press dismisses it
     immediately — the visitor already told us they are ready to look. */
  useEffect(() => {
    if (!mounted || !active || leaving) return;
    const dismiss = () => setLeaving(true);
    window.addEventListener("keydown", dismiss);
    window.addEventListener("pointerdown", dismiss);
    window.addEventListener("wheel", dismiss, { passive: true });
    return () => {
      window.removeEventListener("keydown", dismiss);
      window.removeEventListener("pointerdown", dismiss);
      window.removeEventListener("wheel", dismiss);
    };
  }, [mounted, active, leaving]);

  useEffect(() => {
    if (!mounted || !leaving || finished) return;
    const finish = window.setTimeout(
      () => {
        try {
          sessionStorage.setItem(BOOT_KEY, "1");
        } catch {
          /* private mode — splash just replays next load */
        }
        document.documentElement.classList.remove("is-booting");
        setFinished(true);
      },
      motionReady ? CURTAIN_MS : 60,
    );
    return () => window.clearTimeout(finish);
  }, [mounted, leaving, finished, motionReady]);

  const phase: "idle" | "hold" | "leave" = !active
    ? "idle"
    : leaving
      ? "leave"
      : "hold";

  const skipMotion = !mounted || !motionReady;

  /*
   * The overlay is always in the DOM. Its visibility is driven by the
   * `is-booting` class on <html>, set by a blocking script before first paint.
   * That means repeat visitors never see it, and first-time visitors see it
   * immediately rather than one hydration frame later.
   */
  return (
    <div
      aria-hidden="true"
      className="boot-overlay pointer-events-none fixed inset-0 z-[100] place-items-center"
    >
      {/* Two curtains part to reveal the page underneath. */}
      <motion.span
        className="absolute inset-y-0 left-0 w-1/2 bg-paper"
        initial={false}
        animate={{ x: phase === "leave" ? "-101%" : 0 }}
        transition={{
          duration: skipMotion ? 0 : CURTAIN_MS / 1000,
          ease: [0.65, 0, 0.35, 1],
        }}
      />
      <motion.span
        className="absolute inset-y-0 right-0 w-1/2 bg-paper"
        initial={false}
        animate={{ x: phase === "leave" ? "101%" : 0 }}
        transition={{
          duration: skipMotion ? 0 : CURTAIN_MS / 1000,
          ease: [0.65, 0, 0.35, 1],
        }}
      />

      <motion.div
        className="relative flex flex-col items-center gap-6"
        initial={false}
        animate={{
          opacity: phase === "idle" || phase === "leave" ? 0 : 1,
          y: phase === "leave" ? -12 : 0,
        }}
        transition={{ duration: skipMotion ? 0 : 0.34, ease: [0.22, 1, 0.36, 1] }}
      >
        <DropletMark skipMotion={skipMotion} />

        <WordmarkBoot skipMotion={skipMotion} />

        <span className="block h-px w-40 overflow-hidden bg-border">
          <motion.span
            className="block h-full w-full origin-left bg-accent"
            initial={false}
            animate={{ scaleX: phase === "idle" ? 0 : 1 }}
            transition={{
              duration: skipMotion ? 0 : motionReady ? 0.95 : 0.2,
              ease: [0.22, 1, 0.36, 1],
            }}
          />
        </span>
      </motion.div>
    </div>
  );
}

function DropletMark({ skipMotion }: { skipMotion: boolean }) {
  return (
    <motion.svg
      viewBox="0 0 32 40"
      className="size-9"
      role="presentation"
      initial={false}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: skipMotion ? 0 : 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.path
        d="M16 1C16 1 3 15.5 3 25a13 13 0 0 0 26 0C29 15.5 16 1 16 1Z"
        fill="var(--accent)"
        initial={false}
        animate={{ clipPath: "inset(0% 0 0 0)" }}
        transition={{
          duration: skipMotion ? 0 : 0.85,
          ease: [0.22, 1, 0.36, 1],
          delay: skipMotion ? 0 : 0.12,
        }}
      />
    </motion.svg>
  );
}

function WordmarkBoot({ skipMotion }: { skipMotion: boolean }) {
  const letters = `${site.brand.wordmark}${site.brand.wordmarkAccent}`.split("");

  return (
    <p className="font-[family-name:var(--font-display)] text-2xl font-semibold tracking-[-0.03em]">
      {letters.map((letter, index) => (
        <motion.span
          key={`${letter}-${index}`}
          className="inline-block"
          initial={false}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: skipMotion ? 0 : 0.45,
            ease: [0.22, 1, 0.36, 1],
            delay: skipMotion ? 0 : 0.2 + index * 0.035,
          }}
        >
          <span
            className={
              index >= site.brand.wordmark.length ? "text-accent" : "text-ink"
            }
          >
            {letter}
          </span>
        </motion.span>
      ))}
    </p>
  );
}

/**
 * Hairline progress bar that runs across the top on every client-side
 * route change. Cheap, honest feedback that the next page is coming.
 */
export function RouteProgress() {
  const pathname = usePathname();
  const [navigating, setNavigating] = useState(false);
  const previous = useRef(pathname);

  useEffect(() => {
    if (previous.current === pathname) return;
    previous.current = pathname;
    setNavigating(true);
    const timer = window.setTimeout(() => setNavigating(false), 520);
    return () => window.clearTimeout(timer);
  }, [pathname]);

  return (
    <AnimatePresence>
      {navigating && (
        <motion.div
          key="progress"
          aria-hidden="true"
          className="fixed inset-x-0 top-0 z-[90] h-0.5 origin-left bg-accent"
          initial={{ scaleX: 0, opacity: 1 }}
          animate={{ scaleX: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            scaleX: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
            opacity: { duration: 0.2, ease: "linear" },
          }}
        />
      )}
    </AnimatePresence>
  );
}
