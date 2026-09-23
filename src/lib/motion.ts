/**
 * Shared motion vocabulary.
 *
 * Mirrors the easing + duration tokens declared in `tokens.css` (see design.md
 * § Motion). JS-driven transitions can't read CSS custom properties, so the
 * canon lives here too — keep the two in step. Never inline a bezier or a
 * duration in a component.
 */

export const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];
export const EASE_IN: [number, number, number, number] = [0.7, 0, 0.84, 0];
export const EASE_IN_OUT: [number, number, number, number] = [0.65, 0, 0.35, 1];

/** Three duration buckets, in seconds (Motion's unit). */
export const DUR = {
  /** Button press, colour shift, toggle tick. */
  micro: 0.12,
  /** Hover lift, tooltip, menu open. */
  short: 0.22,
  /** Modal, drawer, accordion, page reveal. */
  long: 0.42,
} as const;

/** Exits run at ~75% of the enter, so leaving feels decisive. */
export const exit = (seconds: number) => seconds * 0.75;

/**
 * The one spring UI controls may use. Critically damped — no overshoot, which
 * design.md bans on UI state.
 */
export const SPRING = {
  type: "spring",
  stiffness: 210,
  damping: 28,
} as const;
