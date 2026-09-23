"use client";

import type { ReactNode } from "react";

import { useMotionSafe } from "@/hooks/use-motion-safe";
import { cn } from "@/lib/utils";

/**
 * Seamless horizontal marquee.
 *
 * Two identical tracks sit side by side and translate -50% together, so the
 * loop point is invisible. Under `prefers-reduced-motion` the track stops and
 * becomes a normal wrapped list.
 */
export function Marquee({
  children,
  className,
  speed = 42,
  reverse = false,
  pauseOnHover = true,
  gap = "3rem",
}: {
  children: ReactNode;
  className?: string;
  /** Seconds for one full pass. Higher is slower. */
  speed?: number;
  reverse?: boolean;
  pauseOnHover?: boolean;
  gap?: string;
}) {
  const { motionReady } = useMotionSafe();

  const track = (duplicate: boolean) => (
    <div
      className="flex shrink-0 items-center"
      style={{ gap, paddingRight: gap }}
      aria-hidden={duplicate ? "true" : undefined}
    >
      {children}
    </div>
  );

  if (!motionReady) {
    return (
      <div className={cn("flex flex-wrap justify-center", className)} style={{ gap }}>
        {children}
      </div>
    );
  }

  return (
    <div
      className={cn("group/marquee relative flex overflow-hidden", className)}
      style={{ gap }}
    >
      <div
        className={cn(
          "flex shrink-0",
          "animate-[marquee_var(--marquee-dur)_linear_infinite]",
          reverse && "[animation-direction:reverse]",
          pauseOnHover && "group-hover/marquee:[animation-play-state:paused]",
        )}
        style={
          {
            "--marquee-dur": `${speed}s`,
            gap,
          } as React.CSSProperties
        }
      >
        {track(false)}
        {track(true)}
      </div>
    </div>
  );
}
