"use client";

import { ArrowRight, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { SitePhoto } from "@/components/blocks/site-photo";
import { Button } from "@/components/ui/button";
import { locations } from "@/content/company";
import { services } from "@/content/services";
import { cn } from "@/lib/utils";

/**
 * Quick-book panel: service + site, then hands off to the full booking flow
 * with both already prefilled.
 */
export function QuickBook() {
  const router = useRouter();
  const [service, setService] = useState(services[0].slug);
  const [location, setLocation] = useState(locations[0].slug);
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitting(true);
    router.push(`/booking?service=${service}&location=${location}`);
  };

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:gap-16">
      <div className="flex min-w-0 flex-col gap-6">
        <SitePhoto
          src="/gallery/hero/car1.jpeg"
          alt="Vehicle entering the express wash tunnel"
          label="Riverside flagship · open now"
          aspect="4/3"
          className="w-full"
          priority
        />

        <div className="flex flex-col gap-5">
        <h2 className="text-[clamp(1.75rem,4vw,2.6rem)] font-semibold">
          Hold a slot without the phone call
        </h2>
        <p className="lede">
          Pick a service and a site and we&apos;ll take the rest on the next
          screen. No account, no card, and booked slots are held for you.
        </p>
        <LaneStatus />
        </div>
      </div>

      <form
        id="quick-book"
        onSubmit={onSubmit}
        className="scroll-mt-28 rounded-[var(--radius-xl)] border border-border bg-surface p-6 shadow-md md:p-7"
      >
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <h3 className="font-[family-name:var(--font-display)] text-[length:var(--text-xl)] font-semibold tracking-[-0.02em]">
              Start a booking
            </h3>
            <p className="text-[length:var(--text-sm)] text-ink-3">Takes about a minute.</p>
          </div>

          <label className="flex flex-col gap-1.5">
            <span className="text-[length:var(--text-xs)] font-semibold text-ink-2">
              Service
            </span>
            <select
              value={service}
              onChange={(event) => setService(event.target.value)}
              className="h-11 cursor-pointer rounded-[var(--radius-md)] border border-border-strong bg-surface px-3.5 text-[length:var(--text-sm)] text-ink transition-colors hover:border-accent/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ring)]"
            >
              {services.map((option) => (
                <option key={option.slug} value={option.slug}>
                  {option.name} — from ${option.from}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="text-[length:var(--text-xs)] font-semibold text-ink-2">
              Location
            </span>
            <select
              value={location}
              onChange={(event) => setLocation(event.target.value)}
              className="h-11 cursor-pointer rounded-[var(--radius-md)] border border-border-strong bg-surface px-3.5 text-[length:var(--text-sm)] text-ink transition-colors hover:border-accent/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ring)]"
            >
              {locations.map((option) => (
                <option key={option.slug} value={option.slug}>
                  {option.name}
                  {option.flagship ? " (flagship)" : ""}
                </option>
              ))}
            </select>
          </label>

          <Button
            type="submit"
            size="lg"
            className="w-full"
            data-state={submitting ? "loading" : undefined}
          >
            {submitting ? "Opening…" : "Continue"}
            {!submitting && <ArrowRight className="size-4" aria-hidden="true" />}
          </Button>

          <p className="text-center text-[length:var(--text-xs)] text-ink-3">
            Cancel free up to 2 hours before.
          </p>
        </div>
      </form>
    </div>
  );
}

function LaneStatus() {
  const lanes = [
    { name: "Riverside", wait: "~8 min", state: "busy" as const },
    { name: "Northgate", wait: "~3 min", state: "quiet" as const },
    { name: "Lakeview", wait: "~6 min", state: "ok" as const },
  ];

  return (
    <div className="mt-2 flex flex-col gap-3">
      <p className="text-[length:var(--text-xs)] font-semibold uppercase tracking-[0.12em] text-ink-3">
        Queue right now
      </p>
      <ul className="flex flex-wrap gap-2">
        {lanes.map((lane) => (
          <li
            key={lane.name}
            className="inline-flex items-center gap-2 rounded-[var(--radius-pill)] border border-border bg-surface/70 px-3 py-1.5 text-[length:var(--text-xs)]"
          >
            <span
              className={cn(
                "size-1.5 rounded-full",
                lane.state === "quiet" && "bg-[var(--success)]",
                lane.state === "ok" && "bg-[var(--warning)]",
                lane.state === "busy" && "bg-[var(--danger)]",
              )}
              aria-hidden="true"
            />
            <span className="font-semibold text-ink-2">{lane.name}</span>
            <span className="text-ink-3">{lane.wait}</span>
          </li>
        ))}
      </ul>
      <p className="inline-flex items-center gap-1.5 text-[length:var(--text-xs)] text-ink-3">
        <MapPin className="size-3 shrink-0" aria-hidden="true" />
        Eastfield closed Sundays
      </p>
    </div>
  );
}
