import { BeforeAfter } from "@/components/blocks/before-after";
import { SectionHead } from "@/components/blocks/sections";
import { Reveal } from "@/components/motion/reveal";
import {
  comparisonPairs,
  type ComparisonPair,
} from "@/content/gallery-images";

/**
 * Reusable before/after grid — used on gallery, services, pricing and about.
 */
export function BeforeAfterShowcase({
  title = "Drag the handle and see the difference",
  lede = "Real comparisons beat adjectives. Every pair is documented before we touch the vehicle.",
  pairs = comparisonPairs,
  columns = 2,
}: {
  title?: string;
  lede?: string;
  pairs?: ComparisonPair[];
  columns?: 1 | 2;
}) {
  return (
    <div
      className={
        columns === 1
          ? "grid gap-10"
          : "grid gap-10 lg:grid-cols-2 lg:gap-8"
      }
    >
      {pairs.map((item, index) => (
        <Reveal key={item.id} delay={index * 0.06}>
          <div className="flex flex-col gap-5">
            <BeforeAfter
              beforeSrc={item.beforeSrc}
              afterSrc={item.afterSrc}
              initial={index % 2 === 0 ? 52 : 44}
            />
            <div className="flex flex-col gap-2">
              <h3 className="font-[family-name:var(--font-display)] text-[length:var(--text-lg)] font-semibold tracking-[-0.02em]">
                {item.title}
              </h3>
              <p className="text-[length:var(--text-sm)] leading-relaxed text-ink-3">
                {item.caption}
              </p>
            </div>
          </div>
        </Reveal>
      ))}

      {pairs.length === 0 && (
        <Reveal>
          <SectionHead title={title} lede={lede} />
        </Reveal>
      )}
    </div>
  );
}
