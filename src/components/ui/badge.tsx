import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-[var(--radius-pill)] px-2.5 py-1 text-[length:var(--text-2xs)] font-semibold uppercase tracking-[0.1em] leading-none whitespace-nowrap",
  {
    variants: {
      tone: {
        accent: "bg-accent-soft text-accent",
        neutral: "bg-muted text-ink-2",
        outline: "border border-border-strong text-ink-3",
        success: "bg-[var(--tint-success)] text-[var(--success)]",
        danger: "bg-[var(--tint-danger)] text-[var(--danger)]",
        ink: "bg-band text-band-ink",
      },
    },
    defaultVariants: { tone: "accent" },
  },
);

export type BadgeProps = ComponentProps<"span"> &
  VariantProps<typeof badgeVariants>;

export function Badge({ className, tone, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ tone }), className)} {...props} />;
}

export { badgeVariants };
