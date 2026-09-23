"use client";

import * as AccordionPrimitive from "@radix-ui/react-accordion";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { Plus } from "lucide-react";
import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

/* ── Accordion ─────────────────────────────────────────────────────────── */

export const Accordion = AccordionPrimitive.Root;

export function AccordionItem({
  className,
  ...props
}: ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      className={cn("border-b border-border", className)}
      {...props}
    />
  );
}

export function AccordionTrigger({
  className,
  children,
  ...props
}: ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        className={cn(
          "group flex w-full cursor-pointer items-start justify-between gap-4 py-5 text-left",
          "font-[family-name:var(--font-display)] text-[length:var(--text-lg)] font-semibold tracking-[-0.02em] text-ink",
          "transition-colors duration-200 ease-out hover:text-accent",
          className,
        )}
        {...props}
      >
        <span className="min-w-0 [overflow-wrap:anywhere]">{children}</span>
        <span
          aria-hidden="true"
          className={cn(
            "mt-0.5 grid size-6 shrink-0 place-items-center rounded-full border border-border-strong",
            "transition-[transform,background-color,border-color] duration-300 ease-out",
            "group-hover:border-accent group-data-[state=open]:border-accent group-data-[state=open]:bg-accent",
          )}
        >
          <Plus className="size-3.5 text-ink-3 transition-transform duration-300 ease-out group-hover:text-accent group-data-[state=open]:rotate-45 group-data-[state=open]:text-accent-contrast" />
        </span>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

export function AccordionContent({
  className,
  children,
  ...props
}: ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      className={cn("accordion-content", className)}
      {...props}
    >
      <div className="max-w-[var(--measure)] pb-6 pr-8 text-[length:var(--text-sm)] leading-relaxed text-ink-2">
        {children}
      </div>
    </AccordionPrimitive.Content>
  );
}

/* ── Tabs ──────────────────────────────────────────────────────────────── */

export const Tabs = TabsPrimitive.Root;

export function TabsList({
  className,
  ...props
}: ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      className={cn(
        // Gate 53 · wraps instead of scrolling, so no scroll-jump on mobile.
        "flex flex-wrap gap-1 rounded-[var(--radius-pill)] border border-border bg-surface p-1",
        className,
      )}
      {...props}
    />
  );
}

export function TabsTrigger({
  className,
  ...props
}: ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      className={cn(
        "cursor-pointer rounded-[var(--radius-pill)] px-4 py-2 text-[length:var(--text-sm)] font-semibold whitespace-nowrap",
        "text-ink-3 transition-[background-color,color] duration-200 ease-out",
        "hover:text-ink",
        "data-[state=active]:bg-accent data-[state=active]:text-accent-contrast",
        className,
      )}
      {...props}
    />
  );
}

export function TabsContent({
  className,
  ...props
}: ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content className={cn("mt-6", className)} {...props} />
  );
}
