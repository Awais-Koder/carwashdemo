"use client";

import {
  ArrowLeft,
  ArrowRight,
  CalendarPlus,
  Check,
  MapPin,
  PartyPopper,
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { useIsClient } from "@/hooks/use-is-client";
import { Input, Textarea } from "@/components/ui/input";
import { locations } from "@/content/company";
import { packages } from "@/content/pricing";
import { services } from "@/content/services";
import { site } from "@/content/site";
import { EASE_OUT } from "@/lib/motion";
import { cn } from "@/lib/utils";

const EASE = EASE_OUT;

const STEPS = [
  { id: "service", label: "Service" },
  { id: "where", label: "Location" },
  { id: "when", label: "Date & time" },
  { id: "details", label: "Your details" },
  { id: "review", label: "Review" },
] as const;

type StepId = (typeof STEPS)[number]["id"];

type Draft = {
  serviceKey: string;
  locationSlug: string;
  date: string;
  time: string;
  name: string;
  email: string;
  phone: string;
  vehicle: string;
  notes: string;
  referral: string;
};

type Errors = Partial<Record<keyof Draft, string>>;

const EMPTY_DRAFT: Draft = {
  serviceKey: "",
  locationSlug: "",
  date: "",
  time: "",
  name: "",
  email: "",
  phone: "",
  vehicle: "",
  notes: "",
  referral: "",
};

/** Everything bookable, packages first so walk-in pricing reads first. */
const bookables = [
  ...packages.map((pkg) => ({
    key: `package:${pkg.slug}`,
    name: pkg.name,
    blurb: pkg.pitch,
    price: pkg.price,
    duration: pkg.duration,
    group: "Tunnel packages",
  })),
  ...services.map((service) => ({
    key: `service:${service.slug}`,
    name: service.name,
    blurb: service.tagline,
    price: service.from,
    duration: service.duration,
    group: "Detailing & other",
  })),
];

const OPEN_HOUR = 7;
const CLOSE_HOUR = 19;
const SLOT_MINUTES = 45;

function buildSlots(): string[] {
  const slots: string[] = [];
  for (let minutes = OPEN_HOUR * 60; minutes <= CLOSE_HOUR * 60; minutes += SLOT_MINUTES) {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    slots.push(`${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`);
  }
  return slots;
}

/** Deterministic pseudo-availability so the demo feels like a real diary. */
function isSlotOpen(dayIndex: number, slotIndex: number): boolean {
  const seed = (dayIndex * 31 + slotIndex * 17) % 11;
  return seed > 2;
}

type Day = { iso: string; weekday: string; dayNum: string; month: string; isToday: boolean };

function buildDays(count = 14): Day[] {
  const out: Day[] = [];
  const now = new Date();
  for (let i = 0; i < count; i += 1) {
    const date = new Date(now);
    date.setDate(now.getDate() + i);
    out.push({
      iso: date.toISOString().slice(0, 10),
      weekday: date.toLocaleDateString("en-US", { weekday: "short" }),
      dayNum: String(date.getDate()),
      month: date.toLocaleDateString("en-US", { month: "short" }),
      isToday: i === 0,
    });
  }
  return out;
}

export function BookingFlow() {
  const params = useSearchParams();
  const reduced = useReducedMotion();
  const headingRef = useRef<HTMLHeadingElement>(null);

  const isClient = useIsClient();

  const [stepIndex, setStepIndex] = useState(0);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [reference, setReference] = useState<string | null>(null);
  const [edits, setEdits] = useState<Partial<Draft>>({});

  /* Dates are timezone-dependent, so they are only built once we are on the
     client — the server has no idea what "today" is for this visitor. */
  const days = useMemo<Day[]>(() => (isClient ? buildDays() : []), [isClient]);
  const slots = useMemo<string[]>(() => (isClient ? buildSlots() : []), [isClient]);

  /* Query-string prefill is derived on every render rather than copied into
     state by an effect, so there is a single source of truth for each field. */
  const prefill = useMemo<Partial<Draft>>(() => {
    const serviceParam = params.get("service");
    const packageParam = params.get("package");
    const locationParam = params.get("location");
    const planParam = params.get("plan");
    const next: Partial<Draft> = {};

    if (serviceParam && services.some((s) => s.slug === serviceParam)) {
      next.serviceKey = `service:${serviceParam}`;
    } else if (packageParam && packages.some((p) => p.slug === packageParam)) {
      next.serviceKey = `package:${packageParam}`;
    } else if (planParam) {
      const match = packages.find((p) => planParam.includes(p.slug));
      if (match) next.serviceKey = `package:${match.slug}`;
    }

    if (locationParam && locations.some((l) => l.slug === locationParam)) {
      next.locationSlug = locationParam;
    }

    return next;
  }, [params]);

  const draft: Draft = { ...EMPTY_DRAFT, ...prefill, ...edits };

  const step: StepId = STEPS[stepIndex].id;
  const selectedBookable = useMemo(
    () => bookables.find((item) => item.key === draft.serviceKey),
    [draft.serviceKey],
  );
  const selectedLocation = useMemo(
    () => locations.find((item) => item.slug === draft.locationSlug),
    [draft.locationSlug],
  );
  const selectedDay = useMemo(
    () => days.find((day) => day.iso === draft.date),
    [days, draft.date],
  );

  const update = <K extends keyof Draft>(key: K, value: Draft[K]) => {
    setEdits((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  };

  /* Move focus to the step heading so keyboard and screen-reader users are not
     dropped at the top of the page on every transition. */
  useEffect(() => {
    headingRef.current?.focus();
  }, [stepIndex]);

  function validate(current: StepId): Errors {
    const next: Errors = {};

    if (current === "service" && !draft.serviceKey) {
      next.serviceKey = "Choose a service to continue.";
    }
    if (current === "where" && !draft.locationSlug) {
      next.locationSlug = "Choose the location you'll visit.";
    }
    if (current === "when") {
      if (!draft.date) next.date = "Pick a day.";
      if (!draft.time) next.time = "Pick a time slot.";
    }
    if (current === "details") {
      if (!draft.name.trim()) next.name = "We need a name for the booking.";
      if (!draft.email.trim()) next.email = "Add an email so we can send confirmation.";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(draft.email))
        next.email = "That email doesn't look right.";
      if (!draft.phone.trim()) next.phone = "A phone number in case we need to reach you.";
      if (!draft.vehicle.trim()) next.vehicle = "Tell us the make and model.";
      if (!draft.referral) next.referral = "Pick one so we know where to say thanks.";
    }
    return next;
  }

  function goNext() {
    const found = validate(step);
    if (Object.keys(found).length > 0) {
      setErrors(found);
      toast.error("Almost there", {
        description: "Some details on this step still need filling in.",
      });
      return;
    }
    setErrors({});
    setStepIndex((index) => Math.min(index + 1, STEPS.length - 1));
  }

  function goBack() {
    setErrors({});
    setStepIndex((index) => Math.max(index - 1, 0));
  }

  async function submit() {
    const found = validate("details");
    if (Object.keys(found).length > 0) {
      setErrors(found);
      setStepIndex(3);
      toast.error("Almost there", { description: "Some details need filling in." });
      return;
    }

    setSubmitting(true);
    /* Demo build: no backend. A real deployment posts this to a booking API
       or a form endpoint — see README. */
    await new Promise((resolve) => setTimeout(resolve, 900));
    const ref = `JDW-${draft.date.replaceAll("-", "").slice(2)}-${String(
      Math.floor(Math.random() * 9000) + 1000,
    )}`;
    setReference(ref);
    setSubmitting(false);
    toast.success("Booking held", {
      description: `Reference ${ref}. Check your email for confirmation.`,
    });
  }

  if (reference) {
    return (
      <Confirmation
        reference={reference}
        draft={draft}
        serviceName={selectedBookable?.name ?? "Wash"}
        locationName={selectedLocation?.name ?? "Selected site"}
        price={selectedBookable?.price ?? 0}
      />
    );
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.65fr)] lg:gap-14">
      <div className="min-w-0">
        <StepRail stepIndex={stepIndex} />

        <form
          onSubmit={(event) => {
            event.preventDefault();
            if (step === "review") void submit();
            else goNext();
          }}
          noValidate
          className="mt-8"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={step}
              initial={{ opacity: 0, x: reduced ? 0 : 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: reduced ? 0 : -16 }}
              transition={{ duration: reduced ? 0.01 : 0.32, ease: EASE }}
            >
              <h2
                ref={headingRef}
                tabIndex={-1}
                className="text-[clamp(1.5rem,3.2vw,2.15rem)] font-semibold outline-none"
              >
                {step === "service" && "What does it need?"}
                {step === "where" && "Where suits you?"}
                {step === "when" && "When works?"}
                {step === "details" && "Who are we washing for?"}
                {step === "review" && "Check it over"}
              </h2>

              <p className="mt-3 text-[length:var(--text-sm)] text-ink-3">
                {step === "service" &&
                  "Walk-in prices for a mid-size sedan. Bigger vehicles are quoted at the lane."}
                {step === "where" &&
                  "All four sites take online bookings. Every one runs a touch-free lane."}
                {step === "when" &&
                  "Greyed-out slots are already taken. Booked slots are held for fifteen minutes."}
                {step === "details" &&
                  "We only use this to confirm the booking and let you know when the car's ready."}
                {step === "review" &&
                  "Nothing is charged now. This just holds the slot."}
              </p>

              <div className="mt-8">
                {step === "service" && (
                  <ServiceStep
                    value={draft.serviceKey}
                    onChange={(key) => update("serviceKey", key)}
                    error={errors.serviceKey}
                  />
                )}
                {step === "where" && (
                  <LocationStep
                    value={draft.locationSlug}
                    onChange={(slug) => update("locationSlug", slug)}
                    error={errors.locationSlug}
                  />
                )}
                {step === "when" && (
                  <WhenStep
                    days={days}
                    slots={slots}
                    date={draft.date}
                    time={draft.time}
                    onDate={(iso) => update("date", iso)}
                    onTime={(time) => update("time", time)}
                    errors={errors}
                  />
                )}
                {step === "details" && (
                  <DetailsStep draft={draft} update={update} errors={errors} />
                )}
                {step === "review" && (
                  <ReviewStep
                    draft={draft}
                    serviceName={selectedBookable?.name ?? "—"}
                    servicePrice={selectedBookable?.price ?? 0}
                    serviceDuration={selectedBookable?.duration ?? "—"}
                    locationName={selectedLocation?.name ?? "—"}
                    onEdit={(index) => setStepIndex(index)}
                  />
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-10 flex flex-wrap items-center gap-3 border-t border-border pt-6">
            {stepIndex > 0 && (
              <Button type="button" variant="ghost" onClick={goBack}>
                <ArrowLeft className="size-4" aria-hidden="true" />
                Back
              </Button>
            )}
            <Button
              type="submit"
              size="lg"
              className="ml-auto"
              data-state={submitting ? "loading" : undefined}
            >
              {step === "review" ? (
                submitting ? (
                  "Holding your slot…"
                ) : (
                  <>
                    Confirm booking
                    <Check className="size-4" aria-hidden="true" />
                  </>
                )
              ) : (
                <>
                  Continue
                  <ArrowRight className="size-4" aria-hidden="true" />
                </>
              )}
            </Button>
          </div>
        </form>
      </div>

      <BookingSummary
        serviceName={selectedBookable?.name}
        price={selectedBookable?.price}
        duration={selectedBookable?.duration}
        locationName={selectedLocation?.name}
        locationAddress={
          selectedLocation
            ? `${selectedLocation.address}, ${selectedLocation.city}`
            : undefined
        }
        day={selectedDay}
        time={draft.time}
      />
    </div>
  );
}

/* ── Step rail ───────────────────────────────────────────────────────────── */

function StepRail({ stepIndex }: { stepIndex: number }) {
  return (
    <ol className="flex flex-wrap items-center gap-x-2 gap-y-3" aria-label="Booking progress">
      {STEPS.map((item, index) => {
        const done = index < stepIndex;
        const active = index === stepIndex;
        return (
          <li key={item.id} className="flex items-center gap-2">
            <span
              aria-current={active ? "step" : undefined}
              className={cn(
                "inline-flex items-center gap-2 rounded-[var(--radius-pill)] border px-3 py-1.5 text-[length:var(--text-xs)] font-semibold whitespace-nowrap transition-colors duration-200 ease-out",
                active && "border-accent bg-accent text-accent-contrast",
                done && "border-accent/40 bg-accent-soft text-accent",
                !active && !done && "border-border text-ink-3",
              )}
            >
              <span
                className={cn(
                  "grid size-4 place-items-center rounded-full text-[10px] tabular-nums",
                  active
                    ? "bg-[var(--tint-on-accent)] text-accent-contrast"
                    : done
                      ? "bg-accent text-accent-contrast"
                      : "bg-muted",
                )}
              >
                {done ? (
                  <Check className="size-2.5" strokeWidth={3} aria-hidden="true" />
                ) : (
                  index + 1
                )}
              </span>
              {item.label}
            </span>
            {index < STEPS.length - 1 && (
              <span className="hidden h-px w-4 bg-border sm:block" aria-hidden="true" />
            )}
          </li>
        );
      })}
    </ol>
  );
}

/* ── Step 1 · service ────────────────────────────────────────────────────── */

function ServiceStep({
  value,
  onChange,
  error,
}: {
  value: string;
  onChange: (key: string) => void;
  error?: string;
}) {
  const groups = Array.from(new Set(bookables.map((item) => item.group)));

  return (
    <fieldset>
      <legend className="sr-only">Choose a service</legend>
      <div className="flex flex-col gap-8">
        {groups.map((group) => (
          <div key={group} className="flex flex-col gap-3">
            <p className="text-[length:var(--text-xs)] font-semibold uppercase tracking-[0.12em] text-ink-3">
              {group}
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {bookables
                .filter((item) => item.group === group)
                .map((item) => {
                  const active = value === item.key;
                  return (
                    <label
                      key={item.key}
                      className={cn(
                        "flex cursor-pointer items-start gap-3 rounded-[var(--radius-md)] border p-4",
                        "transition-[border-color,background-color,box-shadow] duration-200 ease-out",
                        active
                          ? "border-accent bg-accent-soft shadow-sm"
                          : "border-border bg-surface hover:border-accent/45",
                      )}
                    >
                      <input
                        type="radio"
                        name="service"
                        value={item.key}
                        checked={active}
                        onChange={() => onChange(item.key)}
                        className="sr-only"
                      />
                      <span
                        aria-hidden="true"
                        className={cn(
                          "mt-0.5 grid size-4 shrink-0 place-items-center rounded-full border-2",
                          active ? "border-accent bg-accent" : "border-border-strong",
                        )}
                      >
                        {active && (
                          <span className="size-1.5 rounded-full bg-accent-contrast" />
                        )}
                      </span>
                      <span className="min-w-0">
                        <span className="flex flex-wrap items-baseline gap-x-2">
                          <span className="font-[family-name:var(--font-display)] text-[length:var(--text-base)] font-semibold">
                            {item.name}
                          </span>
                          <span className="text-[length:var(--text-xs)] font-semibold text-accent">
                            from ${item.price}
                          </span>
                        </span>
                        <span className="mt-1 block text-[length:var(--text-xs)] leading-snug text-ink-3">
                          {item.blurb} · {item.duration}
                        </span>
                      </span>
                    </label>
                  );
                })}
            </div>
          </div>
        ))}
      </div>
      {error && (
        <p role="alert" className="mt-3 text-[length:var(--text-xs)] font-medium text-[var(--danger)]">
          {error}
        </p>
      )}
    </fieldset>
  );
}

/* ── Step 2 · location ───────────────────────────────────────────────────── */

function LocationStep({
  value,
  onChange,
  error,
}: {
  value: string;
  onChange: (slug: string) => void;
  error?: string;
}) {
  return (
    <fieldset>
      <legend className="sr-only">Choose a location</legend>
      <div className="grid gap-3 sm:grid-cols-2">
        {locations.map((location) => {
          const active = value === location.slug;
          return (
            <label
              key={location.slug}
              className={cn(
                "flex cursor-pointer flex-col gap-2 rounded-[var(--radius-md)] border p-4",
                "transition-[border-color,background-color,box-shadow] duration-200 ease-out",
                active
                  ? "border-accent bg-accent-soft shadow-sm"
                  : "border-border bg-surface hover:border-accent/45",
              )}
            >
              <span className="flex items-center gap-2">
                <input
                  type="radio"
                  name="location"
                  value={location.slug}
                  checked={active}
                  onChange={() => onChange(location.slug)}
                  className="sr-only"
                />
                <span
                  aria-hidden="true"
                  className={cn(
                    "grid size-4 shrink-0 place-items-center rounded-full border-2",
                    active ? "border-accent bg-accent" : "border-border-strong",
                  )}
                >
                  {active && <span className="size-1.5 rounded-full bg-accent-contrast" />}
                </span>
                <span className="font-[family-name:var(--font-display)] text-[length:var(--text-base)] font-semibold">
                  {location.name}
                </span>
                {location.flagship && (
                  <span className="rounded-[var(--radius-pill)] bg-muted px-2 py-0.5 text-[length:var(--text-2xs)] font-semibold uppercase tracking-wider text-ink-3">
                    Flagship
                  </span>
                )}
              </span>
              <span className="flex items-start gap-1.5 text-[length:var(--text-xs)] leading-snug text-ink-3">
                <MapPin className="mt-0.5 size-3 shrink-0" aria-hidden="true" />
                {location.address}, {location.city}
              </span>
              <span className="text-[length:var(--text-xs)] text-ink-3">
                {location.lanes.join(" · ")}
              </span>
            </label>
          );
        })}
      </div>
      {error && (
        <p role="alert" className="mt-3 text-[length:var(--text-xs)] font-medium text-[var(--danger)]">
          {error}
        </p>
      )}
    </fieldset>
  );
}

/* ── Step 3 · date & time ────────────────────────────────────────────────── */

function WhenStep({
  days,
  slots,
  date,
  time,
  onDate,
  onTime,
  errors,
}: {
  days: Day[];
  slots: string[];
  date: string;
  time: string;
  onDate: (iso: string) => void;
  onTime: (t: string) => void;
  errors: Errors;
}) {
  const dayIndex = Math.max(0, days.findIndex((day) => day.iso === date));

  return (
    <div className="flex flex-col gap-8">
      <fieldset>
        <legend className="text-[length:var(--text-sm)] font-semibold text-ink">Pick a day</legend>
        {days.length === 0 ? (
          <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-5 md:grid-cols-7">
            {Array.from({ length: 7 }, (_, i) => (
              <span key={i} className="h-[4.25rem] rounded-[var(--radius-md)] bg-muted" />
            ))}
          </div>
        ) : (
          <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-7">
            {days.map((day) => {
              const active = date === day.iso;
              return (
                <button
                  key={day.iso}
                  type="button"
                  aria-pressed={active}
                  onClick={() => {
                    onDate(day.iso);
                    onTime("");
                  }}
                  className={cn(
                    "flex cursor-pointer flex-col items-center gap-0.5 rounded-[var(--radius-md)] border px-2 py-3",
                    "transition-[border-color,background-color,color] duration-200 ease-out",
                    active
                      ? "border-accent bg-accent text-accent-contrast"
                      : "border-border bg-surface text-ink hover:border-accent/45",
                  )}
                >
                  <span className="text-[length:var(--text-2xs)] font-semibold uppercase tracking-wider opacity-70">
                    {day.isToday ? "Today" : day.weekday}
                  </span>
                  <span className="font-[family-name:var(--font-display)] text-[length:var(--text-xl)] font-semibold leading-none tabular-nums">
                    {day.dayNum}
                  </span>
                  <span className="text-[length:var(--text-2xs)] opacity-70">{day.month}</span>
                </button>
              );
            })}
          </div>
        )}
        {errors.date && (
          <p role="alert" className="mt-3 text-[length:var(--text-xs)] font-medium text-[var(--danger)]">
            {errors.date}
          </p>
        )}
      </fieldset>

      {date && (
        <fieldset>
          <legend className="text-[length:var(--text-sm)] font-semibold text-ink">Pick a time</legend>
          <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-5 md:grid-cols-6">
            {slots.map((slot, index) => {
              const open = isSlotOpen(dayIndex, index);
              const active = time === slot;
              return (
                <button
                  key={slot}
                  type="button"
                  disabled={!open}
                  aria-pressed={active}
                  onClick={() => onTime(slot)}
                  className={cn(
                    "rounded-[var(--radius-sm)] border px-2 py-2.5 text-[length:var(--text-sm)] font-semibold tabular-nums",
                    "transition-[border-color,background-color,color] duration-200 ease-out",
                    !open &&
                      "cursor-not-allowed border-transparent bg-muted text-ink-3/40 line-through",
                    open &&
                      !active &&
                      "cursor-pointer border-border bg-surface text-ink hover:border-accent/50",
                    active && "cursor-pointer border-accent bg-accent text-accent-contrast",
                  )}
                >
                  {slot}
                </button>
              );
            })}
          </div>
          {errors.time && (
            <p role="alert" className="mt-3 text-[length:var(--text-xs)] font-medium text-[var(--danger)]">
              {errors.time}
            </p>
          )}
        </fieldset>
      )}
    </div>
  );
}

/* ── Step 4 · details ────────────────────────────────────────────────────── */

function DetailsStep({
  draft,
  update,
  errors,
}: {
  draft: Draft;
  update: <K extends keyof Draft>(key: K, value: Draft[K]) => void;
  errors: Errors;
}) {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      <Field label="Full name" htmlFor="bk-name" error={errors.name} errorId="bk-name-error">
        <Input
          id="bk-name"
          name="name"
          autoComplete="name"
          value={draft.name}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "bk-name-error" : undefined}
          onChange={(event) => update("name", event.target.value)}
          placeholder="Alex Morgan"
        />
      </Field>

      <Field label="Phone" htmlFor="bk-phone" error={errors.phone} errorId="bk-phone-error">
        <Input
          id="bk-phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          value={draft.phone}
          aria-invalid={Boolean(errors.phone)}
          aria-describedby={errors.phone ? "bk-phone-error" : undefined}
          onChange={(event) => update("phone", event.target.value)}
          placeholder="(555) 000-0000"
        />
      </Field>

      <Field
        label="Email"
        htmlFor="bk-email"
        hint="Confirmation and a nudge when the car's ready."
        error={errors.email}
        errorId="bk-email-error"
        className="sm:col-span-2"
      >
        <Input
          id="bk-email"
          name="email"
          type="email"
          autoComplete="email"
          value={draft.email}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "bk-email-error" : "bk-email-hint"}
          onChange={(event) => update("email", event.target.value)}
          placeholder="you@example.com"
        />
      </Field>

      <Field
        label="Vehicle"
        htmlFor="bk-vehicle"
        hint="Make, model and anything we should know — a wrap, matte paint, a roof rack."
        error={errors.vehicle}
        errorId="bk-vehicle-error"
        className="sm:col-span-2"
      >
        <Input
          id="bk-vehicle"
          name="vehicle"
          value={draft.vehicle}
          aria-invalid={Boolean(errors.vehicle)}
          aria-describedby={errors.vehicle ? "bk-vehicle-error" : "bk-vehicle-hint"}
          onChange={(event) => update("vehicle", event.target.value)}
          placeholder="2022 Toyota RAV4, matte wrap"
        />
      </Field>

      <Field
        label="How did you hear about us?"
        htmlFor="bk-referral"
        error={errors.referral}
        errorId="bk-referral-error"
      >
        <select
          id="bk-referral"
          name="referral"
          value={draft.referral}
          aria-invalid={Boolean(errors.referral)}
          aria-describedby={errors.referral ? "bk-referral-error" : undefined}
          onChange={(event) => update("referral", event.target.value)}
          className="h-11 w-full cursor-pointer rounded-[var(--radius-md)] border border-border-strong bg-surface px-3.5 text-[length:var(--text-sm)] text-ink transition-colors hover:border-accent/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ring)]"
        >
          <option value="">Choose one…</option>
          {site.referralSources.map((source) => (
            <option key={source} value={source}>
              {source}
            </option>
          ))}
        </select>
      </Field>

      <Field
        label="Anything else?"
        htmlFor="bk-notes"
        hint="Optional. Pet hair, smoke smell, a scratch you want looked at."
        className="sm:col-span-2"
      >
        <Textarea
          id="bk-notes"
          name="notes"
          value={draft.notes}
          onChange={(event) => update("notes", event.target.value)}
          placeholder="Back seats have a lot of dog hair."
        />
      </Field>
    </div>
  );
}

/* ── Step 5 · review ─────────────────────────────────────────────────────── */

function ReviewStep({
  draft,
  serviceName,
  servicePrice,
  serviceDuration,
  locationName,
  onEdit,
}: {
  draft: Draft;
  serviceName: string;
  servicePrice: number;
  serviceDuration: string;
  locationName: string;
  onEdit: (index: number) => void;
}) {
  const rows: { label: string; value: string; step: number }[] = [
    { label: "Service", value: `${serviceName} · from $${servicePrice}`, step: 0 },
    { label: "Location", value: locationName, step: 1 },
    {
      label: "When",
      value: draft.date
        ? `${new Date(`${draft.date}T00:00:00`).toLocaleDateString("en-US", {
            weekday: "long",
            day: "numeric",
            month: "long",
          })} at ${draft.time} · ${serviceDuration}`
        : "—",
      step: 2,
    },
    { label: "Name", value: draft.name, step: 3 },
    { label: "Contact", value: `${draft.email} · ${draft.phone}`, step: 3 },
    { label: "Vehicle", value: draft.vehicle, step: 3 },
  ];

  return (
    <div className="flex flex-col gap-6">
      <dl className="divide-y divide-border overflow-hidden rounded-[var(--radius-lg)] border border-border bg-surface">
        {rows.map((row) => (
          <div
            key={row.label}
            className="flex flex-wrap items-start gap-x-4 gap-y-1 px-5 py-4"
          >
            <dt className="w-24 shrink-0 text-[length:var(--text-xs)] font-semibold uppercase tracking-wider text-ink-3">
              {row.label}
            </dt>
            <dd className="min-w-0 flex-1 text-[length:var(--text-sm)] text-ink-2">
              {row.value}
            </dd>
            <button
              type="button"
              onClick={() => onEdit(row.step)}
              className="shrink-0 cursor-pointer text-[length:var(--text-xs)] font-semibold text-accent underline decoration-accent/30 underline-offset-4 transition-colors hover:decoration-accent"
            >
              Edit
            </button>
          </div>
        ))}
      </dl>

      {draft.notes && (
        <div className="rounded-[var(--radius-md)] border border-border bg-surface p-5">
          <p className="text-[length:var(--text-xs)] font-semibold uppercase tracking-wider text-ink-3">
            Your notes
          </p>
          <p className="mt-2 text-[length:var(--text-sm)] leading-relaxed text-ink-2">
            {draft.notes}
          </p>
        </div>
      )}

      <p className="text-[length:var(--text-xs)] leading-relaxed text-ink-3">
        Prices shown are for a mid-size sedan. Larger vehicles and heavy soiling
        are quoted before work starts — never added afterwards. Cancel free up to
        two hours before your slot.
      </p>
    </div>
  );
}

/* ── Sticky summary ──────────────────────────────────────────────────────── */

function BookingSummary({
  serviceName,
  price,
  duration,
  locationName,
  locationAddress,
  day,
  time,
}: {
  serviceName?: string;
  price?: number;
  duration?: string;
  locationName?: string;
  locationAddress?: string;
  day?: Day;
  time?: string;
}) {
  return (
    <aside className="lg:sticky lg:top-28 lg:self-start">
      <div className="flex flex-col gap-5 rounded-[var(--radius-lg)] border border-border bg-surface p-6">
        <p className="text-[length:var(--text-xs)] font-semibold uppercase tracking-[0.12em] text-ink-3">
          Your booking
        </p>

        <div className="flex flex-col gap-4">
          <SummaryRow
            label="Service"
            value={serviceName}
            meta={price !== undefined ? `from $${price} · ${duration}` : undefined}
          />
          <SummaryRow
            label="Location"
            value={locationName}
            meta={locationAddress}
          />
          <SummaryRow
            label="When"
            value={
              day
                ? `${day.weekday} ${day.dayNum} ${day.month}`
                : undefined
            }
            meta={time || undefined}
          />
        </div>

        <p className="border-t border-border pt-5 text-[length:var(--text-xs)] leading-relaxed text-ink-3">
          Nothing is charged now. This holds the slot and an attendant confirms
          it by email.
        </p>
      </div>
    </aside>
  );
}

function SummaryRow({
  label,
  value,
  meta,
}: {
  label: string;
  value?: string;
  meta?: string;
}) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-[length:var(--text-2xs)] font-semibold uppercase tracking-wider text-ink-3">
        {label}
      </span>
      <span className="text-[length:var(--text-sm)] font-semibold text-ink">
        {value ?? <span className="text-ink-3">Not chosen yet</span>}
      </span>
      {meta && <span className="text-[length:var(--text-xs)] text-ink-3">{meta}</span>}
    </div>
  );
}

/* ── Confirmation ────────────────────────────────────────────────────────── */

function Confirmation({
  reference,
  draft,
  serviceName,
  locationName,
  price,
}: {
  reference: string;
  draft: Draft;
  serviceName: string;
  locationName: string;
  price: number;
}) {
  const dateLabel = draft.date
    ? new Date(`${draft.date}T00:00:00`).toLocaleDateString("en-US", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "";

  function downloadIcs() {
    const start = new Date(`${draft.date}T${draft.time}:00`);
    const end = new Date(start.getTime() + 60 * 60 * 1000);
    const stamp = (d: Date) =>
      `${d.toISOString().replace(/[-:]|\.\d{3}/g, "")}`;

    const ics = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//John Doe Car Wash//Booking//EN",
      "BEGIN:VEVENT",
      `UID:${reference}@johndoecarwash.example`,
      `DTSTAMP:${stamp(new Date())}`,
      `DTSTART:${stamp(start)}`,
      `DTEND:${stamp(end)}`,
      `SUMMARY:${serviceName} at ${site.brand.name}`,
      `LOCATION:${locationName}`,
      `DESCRIPTION:Booking reference ${reference}. From $${price}.`,
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    const url = URL.createObjectURL(
      new Blob([ics], { type: "text/calendar;charset=utf-8" }),
    );
    const link = document.createElement("a");
    link.href = url;
    link.download = `${reference}.ics`;
    link.click();
    URL.revokeObjectURL(url);
    toast.success("Calendar file downloaded", {
      description: "Open it to add the slot to your calendar.",
    });
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE }}
      className="mx-auto flex max-w-[42rem] flex-col items-center gap-6 text-center"
    >
      <span className="grid size-14 place-items-center rounded-full bg-accent-soft text-accent">
        <PartyPopper className="size-6" aria-hidden="true" />
      </span>

      <div className="flex flex-col gap-3">
        <h2 className="text-[clamp(1.75rem,4vw,2.5rem)] font-semibold">
          Slot held. You&apos;re booked in.
        </h2>
        <p className="text-[length:var(--text-sm)] leading-relaxed text-ink-3">
          We&apos;ve emailed {draft.email} with the details. Reference{" "}
          <strong className="font-semibold text-ink">{reference}</strong>.
        </p>
      </div>

      <dl className="w-full divide-y divide-border overflow-hidden rounded-[var(--radius-lg)] border border-border bg-surface text-left">
        {[
          ["Service", `${serviceName} · from $${price}`],
          ["Location", locationName],
          ["When", `${dateLabel} at ${draft.time}`],
          ["Vehicle", draft.vehicle],
        ].map(([label, value]) => (
          <div key={label} className="flex flex-wrap gap-x-4 gap-y-1 px-5 py-4">
            <dt className="w-24 shrink-0 text-[length:var(--text-xs)] font-semibold uppercase tracking-wider text-ink-3">
              {label}
            </dt>
            <dd className="min-w-0 flex-1 text-[length:var(--text-sm)] text-ink-2">
              {value}
            </dd>
          </div>
        ))}
      </dl>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button type="button" onClick={downloadIcs}>
          <CalendarPlus className="size-4" aria-hidden="true" />
          Add to calendar
        </Button>
        <Button type="button" variant="secondary" onClick={() => window.print()}>
          Print this
        </Button>
      </div>

      <p className="text-[length:var(--text-xs)] leading-relaxed text-ink-3">
        Save your confirmation — show it at the lane or detail bay when you
        arrive.
      </p>
    </motion.div>
  );
}
