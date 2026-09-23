import { ArrowUpRight, MapPin, Phone } from "lucide-react";
import Link from "next/link";

import { footerNav, site } from "@/content/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border bg-paper-2">
      {/* ── Statement band ─────────────────────────────────────────────── */}
      <div className="shell grid gap-10 py-[clamp(3rem,7vw,5.5rem)] lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:gap-16">
        <div className="min-w-0">
          <p className="eyebrow">Ready when you are</p>
          <p className="mt-4 font-[family-name:var(--font-display)] text-[clamp(2rem,5.2vw,3.5rem)] font-semibold leading-[1.04] tracking-[-0.03em] [overflow-wrap:anywhere]">
            Pull in dirty.
            <br />
            Drive out <span className="text-accent">spotless.</span>
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/booking"
              className="inline-flex items-center gap-2 rounded-[var(--radius-pill)] bg-accent px-5 py-3 font-semibold text-accent-contrast transition-[background-color,transform] duration-200 ease-out hover:bg-accent-vivid active:scale-[0.98]"
            >
              Book a wash
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </Link>
            <a
              href={site.contact.phoneHref}
              className="inline-flex items-center gap-2 rounded-[var(--radius-pill)] border border-border-strong px-5 py-3 font-semibold text-ink transition-colors duration-200 ease-out hover:bg-surface"
            >
              <Phone className="size-4" aria-hidden="true" />
              {site.contact.phone}
            </a>
          </div>
        </div>

        <div className="grid gap-8 sm:grid-cols-3 lg:gap-6">
          {footerNav.map((group) => (
            <nav key={group.heading} aria-label={group.heading} className="min-w-0">
              <h2 className="font-[family-name:var(--font-body)] text-[length:var(--text-xs)] font-semibold uppercase tracking-[0.14em] text-ink-3">
                {group.heading}
              </h2>
              <ul className="mt-4 flex flex-col gap-2.5">
                {group.links.map((link) => (
                  <li key={`${group.heading}-${link.href}`}>
                    <Link
                      href={link.href}
                      className="text-[length:var(--text-sm)] text-ink-2 transition-colors duration-200 ease-out hover:text-accent"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>

      {/* ── Bottom bar ─────────────────────────────────────────────────── */}
      <div className="border-t border-border">
        <div className="shell flex flex-col gap-4 py-6 text-[length:var(--text-xs)] text-ink-3 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="size-3.5 shrink-0" aria-hidden="true" />
              {site.contact.address.line1}, {site.contact.address.city}{" "}
              {site.contact.address.region} {site.contact.address.postal}
            </span>
            <span className="hidden md:inline" aria-hidden="true">
              ·
            </span>
            <span>
              &copy; {year} {site.brand.name}
            </span>
          </div>

          <ul className="flex flex-wrap items-center gap-x-4 gap-y-2">
            {site.socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors duration-200 ease-out hover:text-ink"
                >
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </footer>
  );
}
