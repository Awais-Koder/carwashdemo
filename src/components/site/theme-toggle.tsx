"use client";

import { Monitor, MoonStar, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { useIsClient } from "@/hooks/use-is-client";
import { cn } from "@/lib/utils";

const OPTIONS = [
  { value: "light", label: "Light", Icon: Sun },
  { value: "dark", label: "Dark", Icon: MoonStar },
  { value: "system", label: "System", Icon: Monitor },
] as const;

/**
 * Three-way light / dark / system switch.
 *
 * Renders a fixed-size placeholder until mounted: the server has no idea
 * which theme the visitor prefers, so rendering the active pill immediately
 * would cause a hydration mismatch.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const mounted = useIsClient();

  return (
    <div
      role="radiogroup"
      aria-label="Colour theme"
      className={cn(
        "inline-flex items-center gap-0.5 rounded-[var(--radius-pill)] border border-border bg-surface/70 p-1 backdrop-blur",
        className,
      )}
    >
      {OPTIONS.map(({ value, label, Icon }) => {
        const active = mounted && theme === value;
        return (
          <button
            key={value}
            type="button"
            role="radio"
            aria-checked={mounted ? active : false}
            suppressHydrationWarning
            aria-label={`${label} theme`}
            onClick={() => setTheme(value)}
            className={cn(
              "grid size-8 cursor-pointer place-items-center rounded-[var(--radius-pill)]",
              "transition-[background-color,color,transform] duration-200 ease-out",
              "hover:text-ink active:scale-90",
              active
                ? "bg-accent text-accent-contrast"
                : "text-ink-3",
            )}
          >
            <Icon className="size-3.5" aria-hidden="true" />
          </button>
        );
      })}
    </div>
  );
}
