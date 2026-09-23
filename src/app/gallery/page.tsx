import type { Metadata } from "next";

import { BeforeAfterShowcase } from "@/components/blocks/before-after-showcase";
import { PhotoStrip } from "@/components/blocks/photo-strip";
import { CtaBand, PageHero, SectionHead } from "@/components/blocks/sections";
import { Reveal } from "@/components/motion/reveal";
import { comparisonPairs, sitePhotos } from "@/content/gallery-images";

export const metadata: Metadata = {
  title: "Before & after",
  description:
    "Drag the handle on real comparison pairs from express washes, interior deep cleans, paint correction and ceramic coating jobs.",
};

export default function GalleryPage() {
  return (
    <>
      <PageHero
        tag="Gallery"
        title="Real cars, real results"
        lede="Every photo is from our sites — tunnel lanes, detail bays and documented before-and-after pairs. Drag the handle on any comparison."
      />

      <section className="section border-b border-border bg-paper-2">
        <div className="shell">
          <Reveal>
            <SectionHead
              title="Around the wash"
              lede="Four locations, two lanes each, one detail studio. Pull in and this is what you'll see."
            />
          </Reveal>
          <div className="mt-8">
            <PhotoStrip photos={sitePhotos} />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <Reveal>
            <SectionHead
              title="Before & after"
              lede="Every full detail gets a panel set before we touch it. Drag the handle on each pair — the split follows your pointer or the arrow keys."
            />
          </Reveal>

          <div className="mt-10">
            <BeforeAfterShowcase pairs={comparisonPairs} />
          </div>
        </div>
      </section>

      <CtaBand
        title="Want to see your car here?"
        body="Book a full detail and ask for the before-and-after set. We photograph every panel anyway."
      />
    </>
  );
}
