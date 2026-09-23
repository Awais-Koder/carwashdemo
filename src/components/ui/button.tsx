import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

/**
 * Button — all eight states are styled:
 * default · hover · focus-visible · active · disabled · loading · error · success
 * (loading / error / success arrive via `data-state`.)
 */
const buttonVariants = cva(
  [
    "relative inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "font-[family-name:var(--font-body)] font-semibold leading-none",
    "cursor-pointer select-none",
    "transition-[background-color,color,border-color,box-shadow,transform] duration-200 ease-out",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ring)]",
    "active:translate-y-px active:scale-[0.985]",
    "disabled:pointer-events-none disabled:opacity-45",
    "data-[state=loading]:pointer-events-none data-[state=loading]:opacity-80",
    "data-[state=error]:bg-[var(--danger)] data-[state=error]:text-white",
    "data-[state=success]:bg-[var(--success)] data-[state=success]:text-white",
    "[&_svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        primary:
          "bg-accent text-accent-contrast hover:bg-accent-vivid shadow-sm hover:shadow-md",
        secondary:
          "bg-surface text-ink border border-border-strong hover:bg-muted hover:border-accent/40",
        ghost: "text-ink-2 hover:bg-muted hover:text-ink",
        outline:
          "border border-border-strong text-ink hover:border-accent hover:text-accent",
        danger:
          "bg-[var(--danger)] text-white hover:brightness-110 shadow-sm",
        link: "text-accent underline decoration-accent/35 decoration-2 underline-offset-4 hover:decoration-accent h-auto px-0 py-0",
      },
      size: {
        // Every variant clears the 44px touch target on its shorter axis.
        sm: "h-11 rounded-[var(--radius-sm)] px-3.5 text-[length:var(--text-sm)]",
        md: "h-11 rounded-[var(--radius-md)] px-5 text-[length:var(--text-sm)]",
        lg: "h-13 rounded-[var(--radius-pill)] px-7 text-[length:var(--text-base)]",
        icon: "size-11 rounded-[var(--radius-md)]",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export type ButtonProps = ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

export function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { buttonVariants };
