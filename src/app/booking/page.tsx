import type { Metadata } from "next";
import { Suspense } from "react";

import { BookingFlow } from "@/components/booking/booking-flow";
import { PageHero } from "@/components/blocks/sections";

export const metadata: Metadata = {
  title: "Book a wash",
  description:
    "Reserve a wash or detail slot at any of our four locations. Booked slots are held for you — we cap each hour against lane capacity.",
};

export default function BookingPage() {
  return (
    <>
      <PageHero
        tag="Book a wash"
        title="Hold your slot in under a minute"
        lede="Pick a service, a site and a time. No account, no card, and you can cancel free up to two hours beforehand."
      />

      <section className="section">
        <div className="shell">
          <Suspense fallback={<BookingSkeleton />}>
            <BookingFlow />
          </Suspense>
        </div>
      </section>
    </>
  );
}

/** Matches the shape of the real flow so the swap-in is not a jump. */
function BookingSkeleton() {
  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.65fr)] lg:gap-14">
      <div className="flex flex-col gap-8">
        <div className="flex gap-2">
          {Array.from({ length: 5 }, (_, i) => (
            <span key={i} className="h-8 w-24 rounded-[var(--radius-pill)] bg-muted" />
          ))}
        </div>
        <span className="h-9 w-64 rounded-[var(--radius-sm)] bg-muted" />
        <div className="grid gap-3 sm:grid-cols-2">
          {Array.from({ length: 4 }, (_, i) => (
            <span key={i} className="h-24 rounded-[var(--radius-md)] bg-muted" />
          ))}
        </div>
      </div>
      <div className="h-72 rounded-[var(--radius-lg)] border border-border bg-surface" />
    </div>
  );
}
