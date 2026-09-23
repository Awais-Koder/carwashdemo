"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

import { heroGalleryCards, type GalleryCard } from "@/content/gallery-images";
import { useIsClient } from "@/hooks/use-is-client";

export type AnimationPhase = "scatter" | "line" | "circle" | "bottom-strip";

interface FlipCardProps {
  card: GalleryCard;
  index: number;
  target: {
    x: number;
    y: number;
    rotation: number;
    scale: number;
    opacity: number;
  };
}

const IMG_WIDTH = 72;
const IMG_HEIGHT = 102;
const TOTAL_IMAGES = heroGalleryCards.length;
const MAX_SCROLL = 3000;

const lerp = (start: number, end: number, t: number) =>
  start * (1 - t) + end * t;

/** Deterministic scatter coords — same on server and client (no Math.random). */
const SCATTER_POSITIONS = heroGalleryCards.map((_, i) => {
  const angle = i * 2.399963;
  const radius = 280 + (i % 5) * 95;
  return {
    x: Math.cos(angle) * radius * 1.8,
    y: Math.sin(angle * 1.17) * radius * 1.2,
    rotation: ((i * 47) % 180) - 90,
    scale: 0.6,
    opacity: 0,
  };
});

function FlipCard({
  card,
  index,
  target,
  instant,
}: FlipCardProps & { instant: boolean }) {
  const reduced = useReducedMotion();
  const skipMotion = instant || Boolean(reduced);

  return (
    <motion.div
      initial={false}
      animate={{
        x: target.x,
        y: target.y,
        rotate: target.rotation,
        scale: target.scale,
        opacity: target.opacity,
      }}
      transition={
        skipMotion
          ? { duration: 0 }
          : { type: "spring", stiffness: 60, damping: 26 }
      }
      style={{
        position: "absolute",
        width: IMG_WIDTH,
        height: IMG_HEIGHT,
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
      className="group cursor-pointer"
    >
      <motion.div
        className="relative h-full w-full"
        style={{ transformStyle: "preserve-3d" }}
        transition={
          reduced
            ? { duration: 0.12 }
            : { type: "spring", stiffness: 260, damping: 26 }
        }
        whileHover={skipMotion ? undefined : { rotateY: 180 }}
      >
        <div
          className="absolute inset-0 h-full w-full overflow-hidden rounded-xl bg-muted shadow-lg"
          style={{ backfaceVisibility: "hidden" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={card.src}
            alt={`${card.label} — ${card.detail}`}
            width={IMG_WIDTH * 2}
            height={IMG_HEIGHT * 2}
            loading="eager"
            decoding="async"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-band/75 via-transparent to-transparent" />
          {/* The label also sits on the back face. It stays on the front too so
              touch and keyboard visitors, who cannot hover to flip, still get
              the service name. */}
          <span className="absolute inset-x-1 bottom-1 truncate px-1 text-center text-[7px] font-bold uppercase tracking-[0.12em] text-[var(--band-ink)]">
            {card.label}
          </span>
        </div>

        <div
          className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden rounded-xl border border-border bg-surface p-2 shadow-lg"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <p className="mb-0.5 text-[8px] font-bold uppercase tracking-[0.14em] text-accent">
            {card.label}
          </p>
          <p className="text-center text-[9px] font-medium leading-tight text-ink-2">
            {card.detail}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export interface ScrollMorphHeroProps {
  brand: string;
  tagline: string;
  /**
   * 0–1 progress from page scroll (sticky runway), passed as a Motion value so
   * scroll updates never trigger a React render. Drives the morph and the arc
   * shuffle. Omit it to park the arc at rest.
   */
  scrollProgress?: MotionValue<number>;
  eyebrow?: string;
  arcTitle?: string;
  arcLede?: string;
  scrollHint?: string;
  children?: ReactNode;
  className?: string;
}

export default function ScrollMorphHero({
  brand,
  tagline,
  scrollProgress,
  eyebrow,
  arcTitle = "Every service, one scroll away",
  arcLede = "Tunnel washes, full details, coatings and interiors — drag through the arc to browse what we actually do.",
  scrollHint = "Scroll to explore",
  children,
  className,
}: ScrollMorphHeroProps) {
  const mounted = useIsClient();
  const reduced = useReducedMotion();
  const instant = Boolean(reduced) || !mounted;
  const [introPhaseState, setIntroPhaseState] =
    useState<AnimationPhase>("scatter");
  /**
   * Reduced motion skips the intro choreography and parks the arc at rest.
   * Derived rather than written from an effect, so the first client render is
   * already correct and no cascading re-render is triggered.
   */
  const introPhase: AnimationPhase = reduced ? "circle" : introPhaseState;
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const handleResize = (entries: ResizeObserverEntry[]) => {
      for (const entry of entries) {
        setContainerSize({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      }
    };

    const observer = new ResizeObserver(handleResize);
    observer.observe(containerRef.current);
    setContainerSize({
      width: containerRef.current.offsetWidth,
      height: containerRef.current.offsetHeight,
    });

    return () => observer.disconnect();
  }, []);

  /* Scroll drives the arc through a Motion value, so the hero updates at frame
     rate without a single React render. Under reduced motion the arc is parked
     at its settled state rather than being scrubbed. */
  const restProgress = useMotionValue(0);
  const progress = scrollProgress ?? restProgress;
  const scrubbed = useTransform(
    progress,
    (value) => Math.min(1, Math.max(0, value)) * MAX_SCROLL,
  );
  const settled = useMotionValue(MAX_SCROLL);
  const virtualScroll = reduced ? settled : scrubbed;

  const morphProgress = useTransform(virtualScroll, [0, 600], [0, 1]);
  const smoothMorph = useSpring(morphProgress, { stiffness: 60, damping: 26 });
  const scrollRotate = useTransform(virtualScroll, [600, 3000], [0, 360]);
  const smoothScrollRotate = useSpring(scrollRotate, {
    stiffness: 48,
    damping: 26,
  });

  const [morphValue, setMorphValue] = useState(0);
  const [rotateValue, setRotateValue] = useState(0);

  useEffect(() => {
    if (!mounted || reduced) return;
    const timer1 = setTimeout(() => setIntroPhaseState("line"), 500);
    const timer2 = setTimeout(() => setIntroPhaseState("circle"), 2500);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [mounted, reduced]);

  useEffect(() => {
    const unsubscribeMorph = smoothMorph.on("change", setMorphValue);
    const unsubscribeRotate = smoothScrollRotate.on("change", setRotateValue);
    return () => {
      unsubscribeMorph();
      unsubscribeRotate();
    };
  }, [smoothMorph, smoothScrollRotate]);

  const contentOpacity = useTransform(smoothMorph, [0.8, 1], [0, 1]);
  const contentY = useTransform(smoothMorph, [0.8, 1], [20, 0]);

  return (
    <div
      ref={containerRef}
      className={`relative h-full w-full overflow-hidden bg-transparent ${className ?? ""}`}
    >
      <div className="perspective-1000 flex h-full w-full flex-col items-center justify-center">
        <div className="pointer-events-none absolute top-1/2 z-10 flex -translate-y-1/2 flex-col items-center justify-center text-center">
          {/* Paper veil. The card ring orbits behind the wordmark, so without
              this a tile lands across the type at some ring radii. Tinted with
              `--paper` and faded at the edge, it masks the tiles without
              reading as a hard disc. */}
          <span
            aria-hidden="true"
            className="absolute -z-10 block size-[clamp(20rem,46vh,27rem)] rounded-full bg-paper opacity-95"
          />
          <motion.h1
            initial={
              instant ? false : { opacity: 0, y: 20, filter: "blur(10px)" }
            }
            animate={
              introPhase === "circle" && morphValue < 0.5
                ? {
                    opacity: 1 - morphValue * 2,
                    y: 0,
                    filter: "blur(0px)",
                  }
                : { opacity: 0, filter: "blur(10px)" }
            }
            transition={{ duration: instant ? 0 : 1 }}
            className="max-w-[min(100%,20rem)] font-[family-name:var(--font-display)] text-[clamp(1.5rem,4vw,2.5rem)] font-semibold tracking-[var(--tracking-display)] text-ink md:max-w-none [overflow-wrap:anywhere] [min-width:0]"
          >
            {brand}
          </motion.h1>
          {eyebrow && (
            <motion.p
              initial={instant ? false : { opacity: 0 }}
              animate={
                introPhase === "circle" && morphValue < 0.5
                  ? { opacity: 0.7 - morphValue }
                  : { opacity: 0 }
              }
              transition={{ duration: instant ? 0 : 1, delay: instant ? 0 : 0.1 }}
              className="mt-3 text-[length:var(--text-xs)] font-semibold uppercase tracking-[var(--tracking-caps)] text-ink-3"
            >
              {eyebrow}
            </motion.p>
          )}
          <motion.p
            initial={instant ? false : { opacity: 0 }}
            animate={
              introPhase === "circle" && morphValue < 0.5
                ? { opacity: 0.55 - morphValue * 0.5 }
                : { opacity: 0 }
            }
            transition={{ duration: instant ? 0 : 1, delay: instant ? 0 : 0.15 }}
            className="mt-4 max-w-md text-[length:var(--text-sm)] leading-relaxed text-ink-3"
          >
            {tagline}
          </motion.p>
          <motion.p
            initial={instant ? false : { opacity: 0 }}
            animate={
              introPhase === "circle" && morphValue < 0.5
                ? { opacity: 0.45 - morphValue }
                : { opacity: 0 }
            }
            transition={{ duration: instant ? 0 : 1, delay: instant ? 0 : 0.25 }}
            className="mt-5 text-[length:var(--text-2xs)] font-bold uppercase tracking-[0.2em] text-ink-3"
          >
            {scrollHint}
          </motion.p>
        </div>

        <motion.div
          style={
            instant
              ? { opacity: morphValue > 0.8 ? 1 : 0, y: morphValue > 0.8 ? 0 : 20 }
              : { opacity: contentOpacity, y: contentY }
          }
          className="pointer-events-none absolute top-[8%] z-10 flex max-w-xl flex-col items-center justify-center px-4 text-center"
        >
          <h2 className="mb-3 font-[family-name:var(--font-display)] text-[clamp(1.5rem,4vw,3rem)] font-semibold tracking-[var(--tracking-display)] text-ink">
            {arcTitle}
          </h2>
          <p className="text-[length:var(--text-sm)] leading-relaxed text-ink-3 md:text-[length:var(--text-base)]">
            {arcLede}
          </p>
          {children && (
            <div className="pointer-events-auto mt-6">{children}</div>
          )}
        </motion.div>

        <div className="relative flex h-full w-full items-center justify-center">
          {heroGalleryCards.slice(0, TOTAL_IMAGES).map((card, i) => {
            let target = { x: 0, y: 0, rotation: 0, scale: 1, opacity: 1 };

            if (introPhase === "scatter") {
              target = SCATTER_POSITIONS[i];
            } else if (introPhase === "line") {
              const lineSpacing = 70;
              const lineTotalWidth = TOTAL_IMAGES * lineSpacing;
              const lineX = i * lineSpacing - lineTotalWidth / 2;
              target = { x: lineX, y: 0, rotation: 0, scale: 1, opacity: 1 };
            } else {
              const isMobile = containerSize.width < 768;
              const minDimension = Math.min(
                containerSize.width,
                containerSize.height,
              );
              const circleRadius = Math.min(minDimension * 0.4, 400);
              const circleAngle = (i / TOTAL_IMAGES) * 360;
              const circleRad = (circleAngle * Math.PI) / 180;
              const circlePos = {
                x: Math.cos(circleRad) * circleRadius,
                y: Math.sin(circleRad) * circleRadius,
                rotation: circleAngle + 90,
              };

              const baseRadius = Math.min(
                containerSize.width,
                containerSize.height * 1.5,
              );
              const arcRadius = baseRadius * (isMobile ? 1.4 : 1.1);
              const arcApexY = containerSize.height * (isMobile ? 0.35 : 0.25);
              const arcCenterY = arcApexY + arcRadius;
              const spreadAngle = isMobile ? 100 : 130;
              const startAngle = -90 - spreadAngle / 2;
              const step = spreadAngle / (TOTAL_IMAGES - 1);
              const scrollProgress = Math.min(
                Math.max(rotateValue / 360, 0),
                1,
              );
              const maxRotation = spreadAngle * 0.8;
              const boundedRotation = -scrollProgress * maxRotation;
              const currentArcAngle = startAngle + i * step + boundedRotation;
              const arcRad = (currentArcAngle * Math.PI) / 180;

              const arcPos = {
                x: Math.cos(arcRad) * arcRadius,
                y: Math.sin(arcRad) * arcRadius + arcCenterY,
                rotation: currentArcAngle + 90,
                scale: isMobile ? 1.4 : 1.8,
              };

              target = {
                x: lerp(circlePos.x, arcPos.x, morphValue),
                y: lerp(circlePos.y, arcPos.y, morphValue),
                rotation: lerp(circlePos.rotation, arcPos.rotation, morphValue),
                scale: lerp(1, arcPos.scale, morphValue),
                opacity: 1,
              };
            }

            return (
              <FlipCard
                key={card.label}
                card={card}
                index={i}
                target={target}
                instant={instant}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
