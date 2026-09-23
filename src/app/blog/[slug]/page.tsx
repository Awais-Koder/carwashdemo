import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { SitePhoto } from "@/components/blocks/site-photo";
import { CtaBand } from "@/components/blocks/sections";
import { ReadProgress } from "@/components/motion/read-progress";
import { Reveal } from "@/components/motion/reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getPost, posts, sortedPosts } from "@/content/blog";
import { site } from "@/content/site";
import { formatBlogDate } from "@/lib/format-date";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata(
  props: PageProps<"/blog/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const post = getPost(slug);
  if (!post) return { title: "Article not found" };

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { type: "article", title: post.title, description: post.excerpt },
  };
}

export default async function PostPage(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = sortedPosts
    .filter((item) => item.slug !== post.slug)
    .slice(0, 2);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { "@type": "Organization", name: site.brand.name },
    publisher: { "@type": "Organization", name: site.brand.name },
  };

  return (
    <>
      <ReadProgress />

      <article>
        <header className="border-b border-border bg-paper-2">
          <div className="shell-narrow flex flex-col gap-5 py-[clamp(2.5rem,6vw,4rem)]">
            <Link
              href="/blog"
              className="inline-flex w-fit items-center gap-1.5 text-[length:var(--text-sm)] font-semibold text-ink-3 transition-colors hover:text-accent"
            >
              <ArrowLeft className="size-3.5" aria-hidden="true" />
              Wash notes
            </Link>

            <div className="flex flex-wrap items-center gap-3">
              <Badge tone="accent">{post.category}</Badge>
              <span className="text-[length:var(--text-xs)] text-ink-3">
                {formatBlogDate(post.date)} · {post.readMinutes} min read
              </span>
            </div>

            <h1 className="text-[clamp(1.9rem,5vw,3.25rem)] font-semibold">
              {post.title}
            </h1>

            <p className="lede">{post.excerpt}</p>
          </div>
        </header>

        <div className="shell-narrow py-[clamp(2rem,5vw,3.5rem)]">
          <Reveal>
            <SitePhoto
              src={post.coverSrc}
              alt={post.title}
              aspect="16/10"
              className="w-full min-w-0"
            />
          </Reveal>

          <div className="mt-10 flex flex-col gap-6">
            {post.body.map((block, index) => {
              if (block.type === "h2") {
                return (
                  <h2
                    key={index}
                    className="mt-6 text-[clamp(1.35rem,2.8vw,1.75rem)] font-semibold"
                  >
                    {block.text}
                  </h2>
                );
              }

              if (block.type === "p") {
                return (
                  <p
                    key={index}
                    className="text-[length:var(--text-base)] leading-[1.75] text-ink-2"
                  >
                    {block.text}
                  </p>
                );
              }

              if (block.type === "ul") {
                return (
                  <ul key={index} className="flex flex-col gap-3">
                    {block.items.map((item) => (
                      <li
                        key={item}
                        className="flex gap-3 text-[length:var(--text-base)] leading-[1.7] text-ink-2"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent"
                        />
                        <span className="min-w-0">{item}</span>
                      </li>
                    ))}
                  </ul>
                );
              }

              if (block.type === "quote") {
                return (
                  <blockquote
                    key={index}
                    className="my-2 border-l-2 border-accent pl-5"
                  >
                    <p className="font-[family-name:var(--font-display)] text-[length:var(--text-xl)] font-medium leading-snug tracking-[-0.02em] text-ink">
                      {block.text}
                    </p>
                  </blockquote>
                );
              }

              return (
                <aside
                  key={index}
                  className="my-2 rounded-[var(--radius-lg)] border border-border bg-surface p-6"
                >
                  <p className="text-[length:var(--text-xs)] font-semibold uppercase tracking-[0.12em] text-accent">
                    {block.title}
                  </p>
                  <p className="mt-3 text-[length:var(--text-sm)] leading-relaxed text-ink-2">
                    {block.text}
                  </p>
                </aside>
              );
            })}
          </div>

          <div className="mt-12 rounded-[var(--radius-lg)] border border-border bg-paper-2 p-6">
            <p className="text-[length:var(--text-sm)] font-semibold text-ink">
              Written by the people doing the work
            </p>
            <p className="mt-2 text-[length:var(--text-sm)] leading-relaxed text-ink-3">
              Everything in Wash Notes comes from the tunnel floor and the detail
              studio, not from a content agency. If something here contradicts
              what you were told elsewhere, ask us about it.
            </p>
            <div className="mt-5">
              <Button asChild variant="secondary">
                <Link href="/locations#contact">Ask a question</Link>
              </Button>
            </div>
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="section border-t border-border bg-paper-2">
          <div className="shell-narrow">
            <h2 className="text-[clamp(1.35rem,3vw,1.75rem)] font-semibold">
              Keep reading
            </h2>
            <div className="mt-6 flex flex-col gap-4">
              {related.map((item) => (
                <Link
                  key={item.slug}
                  href={`/blog/${item.slug}`}
                  className="group flex flex-col gap-2 rounded-[var(--radius-lg)] border border-border bg-surface p-6 transition-[border-color,box-shadow] duration-300 ease-out hover:border-accent/45 hover:shadow-md"
                >
                  <span className="text-[length:var(--text-2xs)] font-semibold uppercase tracking-[0.12em] text-accent">
                    {item.category}
                  </span>
                  <span className="font-[family-name:var(--font-display)] text-[length:var(--text-lg)] font-semibold tracking-[-0.02em]">
                    {item.title}
                  </span>
                  <span className="text-[length:var(--text-sm)] text-ink-3">
                    {item.excerpt}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBand />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
    </>
  );
}
