import type { Metadata } from "next";

import { FaqExplorer } from "@/components/blocks/faq-explorer";
import { CtaBand, PageHero } from "@/components/blocks/sections";
import { faqGroups } from "@/content/faqs";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers on booking, wraps and matte paint, surcharges, memberships, ceramic coating and fleet accounts — including the ones that cost us a sale.",
};

export default function FaqPage() {
  const total = faqGroups.reduce((sum, group) => sum + group.items.length, 0);

  return (
    <>
      <PageHero
        tag="FAQ"
        title="Straight answers, including the inconvenient ones"
        lede={`${total} questions we actually get asked at the counter — from whether the tunnel is safe for a wrap to why we sometimes talk people out of a ceramic coating.`}
      />

      <section className="section">
        <div className="shell-narrow">
          <FaqExplorer groups={faqGroups} />
        </div>
      </section>

      <CtaBand
        title="Still unanswered?"
        body="Phone the site or send a message. A person reads it, usually the same working day."
        primary={{ href: "/locations#contact", label: "Contact us" }}
        secondary={{ href: "/booking", label: "Book a wash" }}
      />
    </>
  );
}
