import { cn } from "@/lib/utils";

export type Scene =
  | "car"
  | "suv"
  | "foam"
  | "wheel"
  | "interior"
  | "shine"
  | "team"
  | "shop";

/** Hand-built SVG scene art in the brand palette. */
export function PhotoFrame({
  scene = "car",
  label,
  className,
  tone = "light",
}: {
  scene?: Scene;
  label?: string;
  className?: string;
  tone?: "light" | "deep";
}) {
  const deep = tone === "deep";

  return (
    <div
      className={cn(
        "relative isolate overflow-hidden rounded-[var(--radius-lg)] border border-border",
        className,
      )}
      style={{
        background: deep
          ? "linear-gradient(150deg, var(--scene-deep-1) 0%, var(--scene-deep-2) 55%, var(--scene-deep-3) 100%)"
          : "linear-gradient(150deg, var(--accent-soft) 0%, var(--paper) 52%, var(--paper-2) 100%)",
      }}
    >
      {/* Faint grid gives the frame structure without an image. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage: deep
            ? "linear-gradient(to right, var(--scene-grid-deep) 1px, transparent 1px), linear-gradient(to bottom, var(--scene-grid-deep) 1px, transparent 1px)"
            : "linear-gradient(to right, var(--scene-grid) 1px, transparent 1px), linear-gradient(to bottom, var(--scene-grid) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative grid h-full w-full place-items-center p-6">
        <SceneArt scene={scene} deep={deep} />
      </div>

      {label && (
        <span
          style={deep ? { backgroundColor: "var(--scene-chip)" } : undefined}
          className={cn(
            "absolute bottom-3 left-3 rounded-[var(--radius-pill)] px-2.5 py-1 text-[length:var(--text-2xs)] font-semibold uppercase tracking-[0.1em] backdrop-blur",
            deep ? "text-white/90" : "bg-surface/80 text-ink-2",
          )}
        >
          {label}
        </span>
      )}

    </div>
  );
}

function SceneArt({ scene, deep }: { scene: Scene; deep: boolean }) {
  const stroke = deep ? "var(--scene-stroke-deep)" : "var(--scene-stroke)";
  const fill = deep ? "var(--scene-fill-deep)" : "var(--scene-fill)";

  const common = {
    fill: "none",
    stroke,
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  return (
    <svg
      viewBox="0 0 200 120"
      className="h-auto w-full max-w-[15rem]"
      role="presentation"
      aria-hidden="true"
    >
      {scene === "car" && (
        <g {...common}>
          <path d="M22 78h156" strokeWidth={2} />
          <path d="M38 78c0-8 3-15 9-21l10-9c3-3 8-5 12-5h44c5 0 9 2 12 5l10 9c6 6 9 13 9 21" />
          <path d="M62 48h76" />
          <circle cx="66" cy="78" r="11" fill={fill} />
          <circle cx="134" cy="78" r="11" fill={fill} />
          <circle cx="66" cy="78" r="4.5" />
          <circle cx="134" cy="78" r="4.5" />
          <path d="M52 43c4-7 10-11 18-11M148 43c-4-7-10-11-18-11" />
        </g>
      )}

      {scene === "suv" && (
        <g {...common}>
          <path d="M18 82h164" strokeWidth={2} />
          <path d="M32 82V64c0-4 2-7 6-8l18-5 12-14c2-3 6-4 10-4h30c4 0 8 1 10 4l12 14 18 5c4 1 6 4 6 8v18" />
          <path d="M74 33v26M74 59h50M124 33v26" />
          <circle cx="62" cy="82" r="12" fill={fill} />
          <circle cx="138" cy="82" r="12" fill={fill} />
          <circle cx="62" cy="82" r="5" />
          <circle cx="138" cy="82" r="5" />
        </g>
      )}

      {scene === "foam" && (
        <g {...common}>
          <circle cx="64" cy="52" r="20" fill={fill} />
          <circle cx="102" cy="42" r="26" fill={fill} />
          <circle cx="142" cy="56" r="18" fill={fill} />
          <circle cx="86" cy="80" r="16" fill={fill} />
          <circle cx="124" cy="84" r="13" fill={fill} />
          <path d="M92 30a8 8 0 0 1 6-6M54 42a7 7 0 0 1 5-5M134 46a6 6 0 0 1 5-4" />
        </g>
      )}

      {scene === "wheel" && (
        <g {...common}>
          <circle cx="100" cy="60" r="42" fill={fill} />
          <circle cx="100" cy="60" r="42" />
          <circle cx="100" cy="60" r="18" />
          <path d="M100 18v12M100 90v12M58 60h12M130 60h12M70 30l9 9M130 90l-9-9M130 30l-9 9M70 90l9-9" />
        </g>
      )}

      {scene === "interior" && (
        <g {...common}>
          <rect x="26" y="34" width="148" height="56" rx="10" fill={fill} />
          <path d="M40 90v-6M160 90v-6" />
          <path d="M60 62c0-6 5-11 11-11h58c6 0 11 5 11 11v10H60V62Z" />
          <path d="M100 34v14" />
          <circle cx="56" cy="48" r="7" />
          <circle cx="144" cy="48" r="7" />
        </g>
      )}

      {scene === "shine" && (
        <g {...common}>
          <path d="M100 18v30M100 72v30M58 60h30M112 60h30" strokeWidth={2} />
          <path d="M70 30l14 14M130 30l-14 14M70 90l14-14M130 90l-14-14" />
          <circle cx="100" cy="60" r="16" fill={fill} />
          <circle cx="100" cy="60" r="5" />
          <path d="M158 26v8M154 30h8M44 92v6M41 95h6" />
        </g>
      )}

      {scene === "team" && (
        <g {...common}>
          <circle cx="60" cy="48" r="14" fill={fill} />
          <circle cx="100" cy="40" r="16" fill={fill} />
          <circle cx="140" cy="48" r="14" fill={fill} />
          <path d="M34 92c2-16 12-26 26-26M166 92c-2-16-12-26-26-26M72 92c2-18 13-30 28-30s26 12 28 30" />
        </g>
      )}

      {scene === "shop" && (
        <g {...common}>
          <path d="M30 96V54l70-32 70 32v42" />
          <path d="M22 54h156" strokeWidth={2} />
          <path d="M18 54l10-16h144l10 16" />
          <rect x="76" y="66" width="48" height="30" rx="4" fill={fill} />
          <path d="M100 66v30M76 81h48" />
        </g>
      )}
    </svg>
  );
}
