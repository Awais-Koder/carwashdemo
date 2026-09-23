"use client";

import { Search, X } from "lucide-react";
import { useMemo, useState } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/disclosure";
import type { FaqGroup } from "@/content/faqs";
import { cn } from "@/lib/utils";

export function FaqExplorer({ groups }: { groups: FaqGroup[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("all");

  const normalised = query.trim().toLowerCase();

  const matches = useMemo(() => {
    if (!normalised) return groups;
    return groups
      .map((group) => ({
        ...group,
        items: group.items.filter(
          (item) =>
            item.q.toLowerCase().includes(normalised) ||
            item.a.toLowerCase().includes(normalised),
        ),
      }))
      .filter((group) => group.items.length > 0);
  }, [groups, normalised]);

  const total = matches.reduce((sum, group) => sum + group.items.length, 0);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <label htmlFor="faq-search" className="sr-only">
          Search frequently asked questions
        </label>
        <div className="relative">
          <Search
            className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-ink-3"
            aria-hidden="true"
          />
          <input
            id="faq-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search — wrapping, salting, coating, pet hair…"
            className="h-12 w-full rounded-[var(--radius-pill)] border border-border-strong bg-surface pl-10 pr-11 text-[length:var(--text-sm)] text-ink placeholder:text-ink-3 transition-colors hover:border-accent/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ring)]"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 grid size-7 -translate-y-1/2 cursor-pointer place-items-center rounded-full text-ink-3 transition-colors hover:bg-muted hover:text-ink"
            >
              <X className="size-3.5" aria-hidden="true" />
            </button>
          )}
        </div>

        <p className="text-[length:var(--text-xs)] text-ink-3" aria-live="polite">
          {normalised
            ? `${total} ${total === 1 ? "answer" : "answers"} matching “${query.trim()}”`
            : `${groups.reduce((sum, group) => sum + group.items.length, 0)} answers across ${groups.length} topics`}
        </p>
      </div>

      {normalised ? (
        <div className="flex flex-col gap-10">
          {matches.length === 0 ? (
            <EmptyState query={query.trim()} onClear={() => setQuery("")} />
          ) : (
            matches.map((group) => (
              <FaqSection key={group.category} group={group} />
            ))
          )}
        </div>
      ) : (
        <Tabs value={category} onValueChange={setCategory}>
          {/* Gate 53 · wraps rather than scroll-jumps. */}
          <TabsList>
            <TabsTrigger value="all">All topics</TabsTrigger>
            {groups.map((group) => (
              <TabsTrigger key={group.category} value={group.category}>
                {group.category}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="all">
            <div className="flex flex-col gap-10">
              {groups.map((group) => (
                <FaqSection key={group.category} group={group} />
              ))}
            </div>
          </TabsContent>

          {groups.map((group) => (
            <TabsContent key={group.category} value={group.category}>
              <FaqSection group={group} />
            </TabsContent>
          ))}
        </Tabs>
      )}
    </div>
  );
}

function FaqSection({ group }: { group: FaqGroup }) {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <h2 className="font-[family-name:var(--font-display)] text-[length:var(--text-xl)] font-semibold tracking-[-0.02em]">
          {group.category}
        </h2>
        <p className="text-[length:var(--text-sm)] text-ink-3">{group.blurb}</p>
      </div>

      <Accordion
        type="single"
        collapsible
        className={cn("border-t border-border")}
      >
        {group.items.map((item, index) => (
          <AccordionItem
            key={item.q}
            value={`${group.category}-${index}`}
          >
            <AccordionTrigger>{item.q}</AccordionTrigger>
            <AccordionContent>{item.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}

function EmptyState({
  query,
  onClear,
}: {
  query: string;
  onClear: () => void;
}) {
  return (
    <div className="flex flex-col items-start gap-4 rounded-[var(--radius-lg)] border border-dashed border-border-strong bg-surface p-7">
      <p className="text-[length:var(--text-base)] font-semibold">
        Nothing matched “{query}”
      </p>
      <p className="text-[length:var(--text-sm)] leading-relaxed text-ink-3">
        Try a shorter word — “wrap”, “salt”, “coating”, “pet hair” — or ask us
        directly and we&apos;ll answer properly.
      </p>
      <button
        type="button"
        onClick={onClear}
        className="cursor-pointer text-[length:var(--text-sm)] font-semibold text-accent underline decoration-accent/30 decoration-2 underline-offset-4 transition-colors hover:decoration-accent"
      >
        Clear the search
      </button>
    </div>
  );
}
