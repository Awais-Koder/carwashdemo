import { ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { BlogPostCard } from "@/components/blocks/cards";
import { SitePhoto } from "@/components/blocks/site-photo";
import { CtaBand, PageHero, SectionHead } from "@/components/blocks/sections";
import { Reveal, Stagger } from "@/components/motion/reveal";
import { Badge } from "@/components/ui/badge";
import { sortedPosts } from "@/content/blog";
import { formatBlogDate } from "@/lib/format-date";

export const metadata: Metadata = {
  title: "Wash notes",
  description:
    "Straight answers about paint, coatings, interiors and road salt — written by the people doing the work, including the advice that costs us a sale.",
};

export default function BlogPage() {
  const [lead, ...rest] = sortedPosts;

  return (
    <>
      <PageHero
        tag="Wash notes"
        title="Advice we give at the counter"
        lede="No listicles about ten things you should never do. Just the questions we answer every week, written out properly."
      />

      <section className="section">
        <div className="shell">
          <Reveal>
            <Link
              href={`/blog/${lead.slug}`}
              className="group grid min-w-0 gap-8 overflow-hidden rounded-[var(--radius-xl)] border border-border bg-surface p-4 transition-[border-color,box-shadow] duration-300 ease-out hover:border-accent/45 hover:shadow-lg lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:p-6"
            >
              <SitePhoto
                src={lead.coverSrc}
                alt={lead.title}
                aspect="16/10"
                className="w-full min-w-0 lg:aspect-auto lg:min-h-[18rem] lg:h-full"
              />
              <div className="flex min-w-0 flex-col justify-center gap-4 lg:py-6 lg:pr-6">
                <div className="flex flex-wrap items-center gap-3">
                  <Badge tone="accent">{lead.category}</Badge>
                  <span className="text-[length:var(--text-xs)] text-ink-3">
                    {formatBlogDate(lead.date)} · {lead.readMinutes} min read
                  </span>
                </div>

                <h2 className="min-w-0 text-[clamp(1.5rem,3.4vw,2.25rem)] font-semibold leading-snug [overflow-wrap:anywhere]">
                  {lead.title}
                </h2>

                <p className="lede min-w-0">{lead.excerpt}</p>

                <span className="mt-2 inline-flex items-center gap-1.5 text-[length:var(--text-sm)] font-semibold text-accent">
                  Read it
                  <ArrowUpRight
                    className="size-3.5 transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </span>
              </div>
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="section border-t border-border bg-paper-2">
        <div className="shell">
          <Reveal>
            <SectionHead
              title="More from the tunnel"
              lede="Everything else we've written, newest first."
            />
          </Reveal>

          <Stagger className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-[repeat(3,minmax(0,1fr))]">
            {rest.map((post) => (
              <BlogPostCard key={post.slug} post={post} showDate />
            ))}
          </Stagger>
        </div>
      </section>

      <CtaBand
        title="Enough reading. Book the thing."
        body="Twelve minutes for an express wash, four hours for a full detail. Both worth it."
      />
    </>
  );
}
