import { ArrowLeft, ArrowRight, Clock, Tag } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { BeforeAfter } from "@/components/blocks/before-after";
import { ServiceCard } from "@/components/blocks/cards";
import { SitePhoto } from "@/components/blocks/site-photo";
import { CtaBand, CheckList } from "@/components/blocks/sections";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/disclosure";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getService, services } from "@/content/services";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata(
  props: PageProps<"/services/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const service = getService(slug);
  if (!service) return { title: "Service not found" };

  return {
    title: service.name,
    description: service.summary,
  };
}

export default async function ServiceDetailPage(
  props: PageProps<"/services/[slug]">,
) {
  const { slug } = await props.params;
  const service = getService(slug);
  if (!service) notFound();

  const Icon = service.icon;
  const related = services
    .filter((item) => item.slug !== service.slug)
    .slice(0, 3);

  const comparison =
    service.slug === "express-wash"
      ? {
          beforeSrc: "/gallery/hero/before1.jpeg",
          afterSrc: "/gallery/hero/after1.jpeg",
          caption:
            "Twelve-minute tunnel wash on a white sedan — road film and brake dust lifted, tyres dressed on the way out.",
        }
      : service.slug === "interior-deep-clean"
        ? {
            beforeSrc: "/gallery/hero/before3.png",
            afterSrc: "/gallery/hero/after3.png",
            caption:
              "Hot water extraction and ozone on a family wagon — carpets, cloth seats and headlining.",
          }
        : service.slug === "full-detail" ||
            service.slug === "paint-correction" ||
            service.slug === "ceramic-coating"
          ? {
              beforeSrc: "/gallery/hero/before2.png",
              afterSrc: "/gallery/hero/after2.png",
              caption:
                "Two-stage correction and ceramic seal on a dark SUV — swirling removed, deeper scratches documented.",
            }
          : null;

  return (
    <>
      <section className="border-b border-border bg-paper-2">
        <div className="shell flex flex-col gap-8 py-[clamp(2.5rem,6vw,4.5rem)]">
          <Link
            href="/services"
            className="inline-flex w-fit items-center gap-1.5 text-[length:var(--text-sm)] font-semibold text-ink-3 transition-colors hover:text-accent"
          >
            <ArrowLeft className="size-3.5" aria-hidden="true" />
            All services
          </Link>

          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14">
            <div className="flex min-w-0 flex-col gap-5">
              <span className="grid size-12 place-items-center rounded-[var(--radius-md)] bg-accent-soft text-accent">
                <Icon className="size-6" aria-hidden="true" />
              </span>

              <h1 className="text-[clamp(2rem,5vw,3.25rem)] font-semibold">
                {service.name}
              </h1>

              <p className="font-[family-name:var(--font-display)] text-[length:var(--text-lg)] font-medium text-accent">
                {service.tagline}
              </p>

              <p className="lede">{service.summary}</p>

              <div className="flex flex-wrap gap-2 pt-1">
                <Badge tone="neutral">
                  <Tag className="size-3" aria-hidden="true" />
                  from ${service.from}
                </Badge>
                <Badge tone="outline">
                  <Clock className="size-3" aria-hidden="true" />
                  {service.duration}
                </Badge>
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <Button asChild size="lg">
                  <Link href={`/booking?service=${service.slug}`}>
                    Book {service.name}
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </Link>
                </Button>
              </div>
            </div>

            <div className="min-w-0">
              <SitePhoto
                src={service.imageSrc}
                alt={`${service.name} — ${service.tagline}`}
                label={service.duration}
                aspect="4/3"
                className="w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {comparison && (
        <section className="section border-b border-border bg-paper-2">
          <div className="shell grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-14">
            <div className="min-w-0">
              <BeforeAfter
                beforeSrc={comparison.beforeSrc}
                afterSrc={comparison.afterSrc}
                caption={comparison.caption}
              />
            </div>
            <div className="flex min-w-0 flex-col gap-4">
              <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-semibold">
                Before we touch it
              </h2>
              <p className="lede">
                Every {service.name.toLowerCase()} job starts with panel
                photography and paint-depth readings. Drag the handle to see what
                honest prep and finishing actually look like.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* ── What's included + good for ───────────────────────────────── */}
      <section className="section">
        <div className="shell grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
          <div className="flex flex-col gap-6">
            <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-semibold">
              What&apos;s included
            </h2>
            <CheckList items={service.includes} />
          </div>

          <div className="flex flex-col gap-6">
            <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-semibold">
              Good for
            </h2>
            <p className="lede">{service.goodFor}</p>

            <div className="rounded-[var(--radius-lg)] border border-border bg-surface p-6">
              <p className="text-[length:var(--text-xs)] font-semibold uppercase tracking-[0.12em] text-ink-3">
                Highlights
              </p>
              <ul className="mt-4 flex flex-col gap-3">
                {service.highlights.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 text-[length:var(--text-sm)] font-medium text-ink-2"
                  >
                    <span
                      aria-hidden="true"
                      className="size-1.5 shrink-0 rounded-full bg-accent"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Process ──────────────────────────────────────────────────── */}
      <section className="section border-y border-border bg-paper-2">
        <div className="shell">
          <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-semibold">
            How it runs
          </h2>

          <ol className="mt-10 grid gap-px overflow-hidden rounded-[var(--radius-lg)] border border-border bg-border md:grid-cols-3">
            {service.steps.map((step, index) => (
              <li key={step.title} className="flex flex-col gap-3 bg-surface p-6">
                <span className="font-[family-name:var(--font-display)] text-[length:var(--text-sm)] font-semibold tabular-nums text-accent">
                  Step {index + 1}
                </span>
                <h3 className="font-[family-name:var(--font-display)] text-[length:var(--text-lg)] font-semibold tracking-[-0.02em]">
                  {step.title}
                </h3>
                <p className="text-[length:var(--text-sm)] leading-relaxed text-ink-3">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── FAQs ─────────────────────────────────────────────────────── */}
      <section className="section">
        <div className="shell grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
          <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-semibold">
            {service.name} questions
          </h2>

          <Accordion type="single" collapsible className="border-t border-border">
            {service.faqs.map((faq, index) => (
              <AccordionItem key={faq.q} value={`faq-${index}`}>
                <AccordionTrigger>{faq.q}</AccordionTrigger>
                <AccordionContent>{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ── Related ──────────────────────────────────────────────────── */}
      <section className="section border-t border-border bg-paper-2">
        <div className="shell">
          <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-semibold">
            Often booked together
          </h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <ServiceCard key={item.slug} service={item} />
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title={`Book ${service.name}`}
        body="Reserve a slot and it's yours. We cap each hour against lane capacity so the queue never eats your booked time."
      />
    </>
  );
}
