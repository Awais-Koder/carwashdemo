import Image from "next/image";

import { cn } from "@/lib/utils";

/**
 * Consistent photo frame — real photography, no SVG placeholders.
 * Uses `unoptimized` for local demo assets; swap to CDN URLs at launch.
 */
export function SitePhoto({
  src,
  alt,
  label,
  className,
  aspect = "16/10",
  priority = false,
}: {
  src: string;
  alt: string;
  label?: string;
  className?: string;
  aspect?: "16/10" | "4/3" | "3/4" | "1/1" | "auto";
  priority?: boolean;
}) {
  const aspectClass =
    aspect === "16/10"
      ? "aspect-[16/10]"
      : aspect === "4/3"
        ? "aspect-[4/3]"
        : aspect === "3/4"
          ? "aspect-[3/4]"
          : aspect === "1/1"
            ? "aspect-square"
            : "";

  return (
    <figure
      className={cn(
        "group relative isolate min-w-0 overflow-hidden rounded-[var(--radius-lg)] border border-border bg-muted",
        aspectClass,
        className,
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        unoptimized
        priority={priority}
        className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
      {label && (
        <figcaption className="absolute inset-x-0 bottom-0 border-t border-border bg-paper/95 px-3 py-2 text-[length:var(--text-2xs)] font-semibold uppercase tracking-[0.1em] text-ink-2 backdrop-blur-sm">
          {label}
        </figcaption>
      )}
    </figure>
  );
}
