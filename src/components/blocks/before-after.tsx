"use client";

import { MoveHorizontal } from "lucide-react";
import Image from "next/image";
import { useCallback, useRef, useState } from "react";

import { PhotoFrame, type Scene } from "@/components/blocks/photo-frame";
import { cn } from "@/lib/utils";

function ComparisonImage({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      unoptimized
      className={cn("object-cover", className)}
      sizes="(max-width: 768px) 100vw, 50vw"
    />
  );
}

/**
 * Before / after comparison.
 *
 * Pass `beforeSrc` + `afterSrc` for real photography, or omit them to fall back
 * to the hand-built SVG scene treatment. Fully keyboard operable.
 */
export function BeforeAfter({
  scene = "car",
  beforeSrc,
  afterSrc,
  caption,
  className,
  initial = 52,
}: {
  scene?: Scene;
  beforeSrc?: string;
  afterSrc?: string;
  caption?: string;
  className?: string;
  initial?: number;
}) {
  const [value, setValue] = useState(initial);
  const rootRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const usePhotos = Boolean(beforeSrc && afterSrc);

  const setFromClientX = useCallback((clientX: number) => {
    const el = rootRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const next = ((clientX - rect.left) / rect.width) * 100;
    setValue(Math.min(100, Math.max(0, next)));
  }, []);

  const onPointerDown = (event: React.PointerEvent) => {
    dragging.current = true;
    event.currentTarget.setPointerCapture(event.pointerId);
    setFromClientX(event.clientX);
  };

  const onPointerMove = (event: React.PointerEvent) => {
    if (!dragging.current) return;
    setFromClientX(event.clientX);
  };

  const onPointerUp = (event: React.PointerEvent) => {
    dragging.current = false;
    event.currentTarget.releasePointerCapture(event.pointerId);
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    const step = event.shiftKey ? 10 : 2;
    if (event.key === "ArrowLeft") setValue((v) => Math.max(0, v - step));
    else if (event.key === "ArrowRight") setValue((v) => Math.min(100, v + step));
    else if (event.key === "Home") setValue(0);
    else if (event.key === "End") setValue(100);
    else return;
    event.preventDefault();
  };

  return (
    <figure className={cn("flex flex-col gap-3", className)}>
      <div
        ref={rootRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        className="relative aspect-[16/10] w-full touch-none select-none overflow-hidden rounded-[var(--radius-lg)] border border-border"
      >
        <div className="absolute inset-0">
          {usePhotos ? (
            <ComparisonImage src={afterSrc!} alt="After wash" />
          ) : (
            <PhotoFrame
              scene={scene}
              className="h-full w-full rounded-none border-0"
            />
          )}
        </div>

        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - value}% 0 0)` }}
        >
          {usePhotos ? (
            <ComparisonImage src={beforeSrc!} alt="Before wash" />
          ) : (
            <>
              <div className="absolute inset-0 [filter:saturate(0.25)_contrast(0.86)]">
                <PhotoFrame
                  scene={scene}
                  className="h-full w-full rounded-none border-0"
                />
              </div>
              <div className="absolute inset-0 [background:var(--dirt)] mix-blend-multiply" />
            </>
          )}
        </div>

        <span className="pointer-events-none absolute left-3 top-3 rounded-[var(--radius-pill)] bg-band/85 px-2.5 py-1 text-[length:var(--text-2xs)] font-semibold uppercase tracking-[0.1em] text-band-ink backdrop-blur">
          Before
        </span>
        <span className="pointer-events-none absolute right-3 top-3 rounded-[var(--radius-pill)] bg-accent px-2.5 py-1 text-[length:var(--text-2xs)] font-semibold uppercase tracking-[0.1em] text-accent-contrast backdrop-blur">
          After
        </span>

        <div
          role="slider"
          tabIndex={0}
          aria-label="Drag to compare before and after"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(value)}
          aria-valuetext={`${Math.round(value)} percent before`}
          onKeyDown={onKeyDown}
          className="group absolute inset-y-0 w-11 -translate-x-1/2 cursor-ew-resize focus-visible:outline-none"
          style={{ left: `${value}%` }}
        >
          <span className="absolute inset-y-0 left-1/2 w-0.5 -translate-x-1/2 bg-surface shadow-[0_0_0_1px_var(--border)]" />
          {/* The ring lives on the round handle, not the full-height strip, so
              the focus indicator is a circle around the grip rather than an
              outline framing the whole image. It keys off the parent's
              `:focus-visible` via `group-focus-visible`. */}
          <span
            className={cn(
              "pointer-events-none absolute top-1/2 left-1/2 grid size-11 -translate-x-1/2 -translate-y-1/2 place-items-center",
              "rounded-full border border-border bg-surface text-accent shadow-md",
              "transition-transform duration-200 ease-out",
              "group-hover:scale-105",
              "group-focus-visible:ring-2 group-focus-visible:ring-[var(--ring)]",
            )}
          >
            <MoveHorizontal className="size-4" aria-hidden="true" />
          </span>
        </div>
      </div>

      {caption && (
        <figcaption className="text-[length:var(--text-xs)] text-ink-3">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
