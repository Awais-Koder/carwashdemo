"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { ArrowRight, Menu, Phone, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";

import { ThemeToggle } from "@/components/site/theme-toggle";
import { navLinks, site } from "@/content/site";
import { useMotionSafe } from "@/hooks/use-motion-safe";
import { cn } from "@/lib/utils";

const PROMO_KEY = "jdw:promo-dismissed";

const noopSubscribe = () => () => {};

/** Reads the session flag set when the visitor closes the announcement bar. */
function getPromoStored() {
  try {
    return sessionStorage.getItem(PROMO_KEY) === "1";
  } catch {
    return false;
  }
}

export function SiteHeader() {
  const pathname = usePathname();
  const { mounted, motionReady } = useMotionSafe();
  const headerRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [promoDismissed, setPromoDismissed] = useState(false);

  /* Session storage is an external store — read it through the proper hook so
     a returning visitor's dismissal applies without an extra render pass. */
  const promoStored = useSyncExternalStore(
    noopSubscribe,
    getPromoStored,
    () => false,
  );
  const promoOpen = !promoStored && !promoDismissed;

  /* Keep the nav pinned — no auto-hide (it fought the sticky hero scroll runway). */
  useEffect(() => {
    let frame = 0;

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        setScrolled(window.scrollY > 16);
        frame = 0;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  /* Publish live header height so sticky sections (home hero) sit below it. */
  useEffect(() => {
    const root = document.documentElement;
    const sync = () => {
      const height = headerRef.current?.offsetHeight ?? 64;
      root.style.setProperty("--site-header-offset", `${height}px`);
    };
    sync();
    const observer = new ResizeObserver(sync);
    if (headerRef.current) observer.observe(headerRef.current);
    window.addEventListener("resize", sync);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", sync);
    };
  }, [promoOpen]);

  /* Lock scroll while the sheet is open. */
  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [menuOpen]);

  const dismissPromo = () => {
    setPromoDismissed(true);
    try {
      sessionStorage.setItem(PROMO_KEY, "1");
    } catch {
      /* private mode — the bar just reappears next session */
    }
  };

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50"
    >
      <AnimatePresence initial={false}>
        {promoOpen && (
          <motion.div
            key="promo"
            initial={false}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: motionReady ? 0.3 : 0.01, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden bg-band text-band-ink"
          >
            <div className="shell flex items-center gap-3 py-2.5 text-[length:var(--text-xs)]">
              <p className="min-w-0 flex-1 leading-snug">
                <span className="font-semibold">New here?</span>{" "}
                <span className="text-band-muted">
                  First express wash is on the house at every location this month.
                </span>
              </p>
              <Link
                href="/pricing"
                className="hidden shrink-0 items-center gap-1 font-semibold underline decoration-band-faint decoration-1 underline-offset-4 transition-colors hover:decoration-band-ink sm:inline-flex"
              >
                See packages
                <ArrowRight className="size-3" aria-hidden="true" />
              </Link>
              <button
                type="button"
                onClick={dismissPromo}
                aria-label="Dismiss announcement"
                className="grid size-8 shrink-0 cursor-pointer place-items-center rounded-[var(--radius-xs)] text-band-muted transition-colors hover:bg-band-ink/10 hover:text-band-ink"
              >
                <X className="size-3.5" aria-hidden="true" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div
        className={cn(
          "border-b transition-[background-color,border-color,box-shadow] duration-300 ease-out",
          scrolled
            ? "border-border bg-paper/85 shadow-sm backdrop-blur-xl"
            : "border-transparent bg-paper",
        )}
      >
        <div className="shell flex h-16 items-center gap-6 md:h-[4.5rem]">
          <Link
            href="/"
            aria-label={`${site.brand.name} home`}
            className="group flex shrink-0 items-center gap-2.5"
          >
            <DropletGlyph />
            <span className="font-[family-name:var(--font-display)] text-lg font-semibold tracking-[-0.03em]">
              {site.brand.wordmark}
              <span className="text-accent">{site.brand.wordmarkAccent}</span>
            </span>
          </Link>

          <nav aria-label="Main" className="ml-auto hidden lg:block">
            <ul className="flex items-center gap-1">
              {navLinks.map((link) => {
                const active =
                  pathname === link.href || pathname.startsWith(`${link.href}/`);
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "relative rounded-[var(--radius-sm)] px-3 py-2 text-[length:var(--text-sm)] font-medium transition-colors duration-200 ease-out",
                        active ? "text-ink" : "text-ink-3 hover:text-ink",
                      )}
                    >
                      {link.label}
                      {active &&
                        (mounted ? (
                          <motion.span
                            layoutId="nav-underline"
                            className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-accent"
                            transition={{
                              duration: motionReady ? 0.28 : 0,
                              ease: [0.22, 1, 0.36, 1],
                            }}
                          />
                        ) : (
                          <span className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-accent" />
                        ))}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="ml-auto flex items-center gap-2 lg:ml-0">
            <a
              href={site.contact.phoneHref}
              className="hidden items-center gap-2 rounded-[var(--radius-pill)] px-3 py-2 text-[length:var(--text-sm)] font-medium text-ink-3 transition-colors hover:text-ink xl:inline-flex"
            >
              <Phone className="size-3.5" aria-hidden="true" />
              {site.contact.phone}
            </a>

            <ThemeToggle className="hidden sm:inline-flex" />

            <Link
              href="/booking"
              className="hidden cursor-pointer items-center gap-1.5 rounded-[var(--radius-pill)] bg-accent px-4 py-2 text-[length:var(--text-sm)] font-semibold text-accent-contrast transition-[background-color,transform] duration-200 ease-out hover:bg-accent-vivid active:scale-[0.97] sm:inline-flex"
            >
              Book a wash
            </Link>

            <Dialog.Root open={menuOpen} onOpenChange={setMenuOpen}>
              <Dialog.Trigger asChild>
                <button
                  type="button"
                  aria-label="Open menu"
                  className="grid size-11 cursor-pointer place-items-center rounded-[var(--radius-sm)] border border-border text-ink transition-colors hover:bg-muted lg:hidden"
                >
                  <Menu className="size-4" aria-hidden="true" />
                </button>
              </Dialog.Trigger>

              <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 z-[60] bg-[var(--overlay)] backdrop-blur-sm lg:hidden" />
                <Dialog.Content className="fixed inset-0 z-[70] flex flex-col bg-paper lg:hidden">
                  <div className="flex items-center justify-between px-[var(--gutter)] py-4">
                    <Dialog.Title className="font-[family-name:var(--font-display)] text-lg font-semibold tracking-[-0.03em]">
                      Menu
                    </Dialog.Title>
                    <Dialog.Close asChild>
                      <button
                        type="button"
                        aria-label="Close menu"
                        className="grid size-9 cursor-pointer place-items-center rounded-[var(--radius-sm)] border border-border text-ink transition-colors hover:bg-muted"
                      >
                        <X className="size-4" aria-hidden="true" />
                      </button>
                    </Dialog.Close>
                  </div>

                  <nav
                    aria-label="Mobile"
                    className="shell flex-1 overflow-y-auto pb-8"
                  >
                    <ul className="flex flex-col">
                      {navLinks.map((link, index) => (
                        <motion.li
                          key={link.href}
                          initial={motionReady ? { opacity: 0, y: 12 } : false}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            duration: 0.34,
                            ease: [0.22, 1, 0.36, 1],
                            delay: motionReady ? 0.05 + index * 0.045 : 0,
                          }}
                          className="border-b border-border"
                        >
                          <Link
                            href={link.href}
                            onClick={() => setMenuOpen(false)}
                            className="flex items-center justify-between py-4 font-[family-name:var(--font-display)] text-2xl font-semibold tracking-[-0.03em] text-ink"
                          >
                            {link.label}
                            <ArrowRight
                              className="size-5 text-ink-3"
                              aria-hidden="true"
                            />
                          </Link>
                        </motion.li>
                      ))}
                    </ul>

                    <div className="mt-8 flex flex-col gap-3">
                      <Link
                        href="/booking"
                        onClick={() => setMenuOpen(false)}
                        className="inline-flex items-center justify-center gap-2 rounded-[var(--radius-pill)] bg-accent px-5 py-3.5 font-semibold text-accent-contrast"
                      >
                        Book a wash
                      </Link>
                      <a
                        href={site.contact.phoneHref}
                        className="inline-flex items-center justify-center gap-2 rounded-[var(--radius-pill)] border border-border px-5 py-3.5 font-semibold text-ink"
                      >
                        <Phone className="size-4" aria-hidden="true" />
                        {site.contact.phone}
                      </a>
                      <ThemeToggle className="mt-2 self-start" />
                    </div>
                  </nav>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
          </div>
        </div>
      </div>
    </header>
  );
}

function DropletGlyph() {
  return (
    <span className="grid size-9 place-items-center rounded-[var(--radius-sm)] bg-accent text-accent-contrast transition-transform duration-300 ease-out group-hover:-rotate-6">
      <svg viewBox="0 0 24 30" className="size-4" role="presentation">
        <path
          d="M12 1C12 1 2.5 12 2.5 19a9.5 9.5 0 0 0 19 0C21.5 12 12 1 12 1Z"
          fill="currentColor"
        />
      </svg>
    </span>
  );
}
