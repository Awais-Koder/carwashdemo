import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

const fieldBase = [
  "w-full rounded-[var(--radius-md)] border bg-surface px-3.5 py-2.5",
  "text-[length:var(--text-sm)] text-ink placeholder:text-ink-3",
  "transition-[border-color,box-shadow,background-color] duration-200 ease-out",
  "border-border-strong",
  "hover:border-accent/50",
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ring)]",
  "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-muted",
  "aria-[invalid=true]:border-[var(--danger)] aria-[invalid=true]:bg-[var(--tint-danger-soft)]",
].join(" ");

export function Input({ className, ...props }: ComponentProps<"input">) {
  return <input className={cn(fieldBase, "h-11", className)} {...props} />;
}

export function Textarea({ className, ...props }: ComponentProps<"textarea">) {
  return (
    <textarea
      className={cn(fieldBase, "min-h-28 resize-y leading-relaxed", className)}
      {...props}
    />
  );
}

export function FieldError({
  id,
  children,
}: {
  id: string;
  children?: React.ReactNode;
}) {
  if (!children) return null;
  return (
    <p
      id={id}
      role="alert"
      className="mt-1.5 flex items-start gap-1.5 text-[length:var(--text-xs)] font-medium text-[var(--danger)]"
    >
      <svg viewBox="0 0 16 16" className="mt-0.5 size-3.5 shrink-0" aria-hidden="true">
        <path
          fill="currentColor"
          d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13ZM7.25 4.5h1.5v5h-1.5v-5Zm0 6.25h1.5v1.5h-1.5v-1.5Z"
        />
      </svg>
      {children}
    </p>
  );
}
