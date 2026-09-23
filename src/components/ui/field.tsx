"use client";

import * as LabelPrimitive from "@radix-ui/react-label";
import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

export function Label({
  className,
  ...props
}: ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      className={cn(
        "block text-[length:var(--text-sm)] font-semibold text-ink",
        "peer-disabled:opacity-60",
        className,
      )}
      {...props}
    />
  );
}

/** Label + control + hint/error, with the wiring already correct. */
export function Field({
  label,
  htmlFor,
  hint,
  error,
  errorId,
  children,
  className,
}: {
  label: string;
  htmlFor: string;
  hint?: string;
  error?: string;
  errorId?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
      {hint && !error && (
        <p id={`${htmlFor}-hint`} className="text-[length:var(--text-xs)] text-ink-3">
          {hint}
        </p>
      )}
      {error && errorId && (
        <p
          id={errorId}
          role="alert"
          className="text-[length:var(--text-xs)] font-medium text-[var(--danger)]"
        >
          {error}
        </p>
      )}
    </div>
  );
}
