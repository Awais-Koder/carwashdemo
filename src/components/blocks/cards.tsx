import { ArrowUpRight, Star } from "lucide-react";
import Link from "next/link";

import { SitePhoto } from "@/components/blocks/site-photo";
import { Badge } from "@/components/ui/badge";
import type { Post } from "@/content/blog";
import type { Package } from "@/content/pricing";
import type { Review } from "@/content/reviews";
import type { Service } from "@/content/services";
import { formatBlogDate } from "@/lib/format-date";
import { cn } from "@/lib/utils";

/** Service tile — photo-led, the whole card is the click target. */
export function ServiceCard({ service }: { service: Service }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className={cn(
        "group relative flex h-full min-w-0 flex-col overflow-hidden rounded-[var(--radius-lg)] border border-border bg-surface",
        "transition-[border-color,box-shadow,transform] duration-300 ease-out",
        "hover:-translate-y-1 hover:border-accent/45 hover:shadow-lg",
      )}
    >
      <SitePhoto
        src={service.imageSrc}
        alt={`${service.name} at ${service.tagline}`}
        aspect="16/10"
        className="rounded-none border-0 border-b border-border"
      />

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex flex-wrap items-center gap-2 text-[length:var(--text-xs)] font-semibold text-ink-3">
          <span className="rounded-[var(--radius-pill)] bg-accent-soft px-2.5 py-1 text-accent">
            from ${service.from}
          </span>
          <span>{service.duration}</span>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="font-[family-name:var(--font-display)] text-[length:var(--text-xl)] font-semibold tracking-[-0.02em]">
            {service.name}
          </h3>
          <p className="text-[length:var(--text-sm)] leading-relaxed text-ink-3 line-clamp-3">
            {service.summary}
          </p>
        </div>

        <span className="mt-auto inline-flex items-center gap-1 pt-2 text-[length:var(--text-sm)] font-semibold text-accent">
          View service
          <ArrowUpRight
            className="size-3.5 transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden="true"
          />
        </span>
      </div>
    </Link>
  );
}

/** Pricing package card. */
export function PackageCard({
  pkg,
  ctaHref = "/booking",
}: {
  pkg: Package;
  ctaHref?: string;
}) {
  return (
    <div
      className={cn(
        "relative flex h-full flex-col gap-5 rounded-[var(--radius-lg)] border bg-surface p-6",
        "transition-[border-color,box-shadow,transform] duration-300 ease-out hover:-translate-y-1",
        pkg.featured
          ? "border-accent shadow-[var(--glow-accent)]"
          : "border-border hover:border-accent/40 hover:shadow-md",
      )}
    >
      {pkg.featured && (
        <span className="absolute -top-3 left-6">
          <Badge tone="ink">Most booked</Badge>
        </span>
      )}

      <div className="flex flex-col gap-1.5">
        <h3 className="font-[family-name:var(--font-display)] text-[length:var(--text-xl)] font-semibold tracking-[-0.02em]">
          {pkg.name}
        </h3>
        <p className="text-[length:var(--text-sm)] leading-snug text-ink-3">
          {pkg.pitch}
        </p>
      </div>

      <div className="flex items-baseline gap-1.5">
        <span className="font-[family-name:var(--font-display)] text-[length:var(--text-4xl)] font-semibold tracking-[-0.04em]">
          ${pkg.price}
        </span>
        <span className="text-[length:var(--text-xs)] text-ink-3">
          · {pkg.duration}
        </span>
      </div>

      <ul className="flex flex-col gap-2.5 border-t border-border pt-5">
        {pkg.includes.map((item) => (
          <li
            key={item}
            className="flex items-start gap-2.5 text-[length:var(--text-sm)] text-ink-2"
          >
            <span
              aria-hidden="true"
              className="mt-[0.45rem] size-1.5 shrink-0 rounded-full bg-accent"
            />
            <span className="min-w-0">{item}</span>
          </li>
        ))}
        {pkg.excludes?.map((item) => (
          <li
            key={item}
            className="flex items-start gap-2.5 text-[length:var(--text-sm)] text-ink-3 line-through decoration-ink-3/40"
          >
            <span
              aria-hidden="true"
              className="mt-[0.45rem] size-1.5 shrink-0 rounded-full bg-border-strong"
            />
            <span className="min-w-0">No {item.toLowerCase()}</span>
          </li>
        ))}
      </ul>

      <Link
        href={`${ctaHref}?package=${pkg.slug}`}
        className={cn(
          "mt-auto inline-flex h-11 items-center justify-center gap-2 rounded-[var(--radius-md)] px-5 text-[length:var(--text-sm)] font-semibold",
          "transition-[background-color,color,border-color,transform] duration-200 ease-out active:translate-y-px",
          pkg.featured
            ? "bg-accent text-accent-contrast hover:bg-accent-vivid"
            : "border border-border-strong text-ink hover:border-accent hover:text-accent",
        )}
      >
        Choose {pkg.name}
      </Link>
    </div>
  );
}

/** Wash notes / blog article tile — responsive grid-safe. */
export function BlogPostCard({
  post,
  showDate = false,
  className,
}: {
  post: Post;
  showDate?: boolean;
  className?: string;
}) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={cn(
        "group flex h-full min-w-0 flex-col gap-4 rounded-[var(--radius-lg)] border border-border bg-surface p-4",
        "transition-[border-color,box-shadow,transform] duration-300 ease-out",
        "hover:-translate-y-1 hover:border-accent/45 hover:shadow-lg",
        className,
      )}
    >
      <SitePhoto
        src={post.coverSrc}
        alt={post.title}
        aspect="16/10"
        className="w-full min-w-0 shrink-0 rounded-none border-0 border-b border-border"
      />

      <div className="flex min-w-0 flex-1 flex-col gap-2 px-1 pb-1 sm:px-2 sm:pb-2">
        <div className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1">
          <span className="text-[length:var(--text-2xs)] font-semibold uppercase tracking-[0.12em] text-accent">
            {post.category}
          </span>
          <span className="text-[length:var(--text-2xs)] text-ink-3">
            {post.readMinutes} min read
          </span>
        </div>

        <h3 className="min-w-0 font-[family-name:var(--font-display)] text-[length:var(--text-lg)] font-semibold leading-snug tracking-[-0.02em] [overflow-wrap:anywhere]">
          {post.title}
        </h3>

        <p className="min-w-0 text-[length:var(--text-sm)] leading-relaxed text-ink-3 line-clamp-3">
          {post.excerpt}
        </p>

        {showDate && (
          <span className="mt-auto pt-1 text-[length:var(--text-xs)] text-ink-3">
            {formatBlogDate(post.date)}
          </span>
        )}
      </div>
    </Link>
  );
}

/** Review card, sized for the marquee and the grid. */
export function ReviewCard({
  review,
  className,
}: {
  review: Review;
  className?: string;
}) {
  return (
    <figure
      className={cn(
        "flex h-full flex-col gap-4 rounded-[var(--radius-lg)] border border-border bg-surface p-6",
        className,
      )}
    >
      <div
        className="flex gap-0.5 text-accent"
        aria-label={`${review.rating} out of 5`}
      >
        {Array.from({ length: 5 }, (_, index) => (
          <Star
            key={index}
            className={cn(
              "size-3.5",
              index < review.rating ? "fill-current" : "text-border-strong",
            )}
            aria-hidden="true"
          />
        ))}
      </div>

      <blockquote className="text-[length:var(--text-sm)] leading-relaxed text-ink-2">
        &ldquo;{review.quote}&rdquo;
      </blockquote>

      <figcaption className="mt-auto border-t border-border pt-4">
        <p className="text-[length:var(--text-sm)] font-semibold text-ink">
          {review.name}
        </p>
        <p className="text-[length:var(--text-xs)] text-ink-3">{review.detail}</p>
      </figcaption>
    </figure>
  );
}
