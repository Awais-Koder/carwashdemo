import {
  Droplets,
  Gem,
  HandPlatter,
  Sofa,
  Sparkles,
  Truck,
  type LucideIcon,
} from "lucide-react";

import type { Scene } from "@/components/blocks/photo-frame";

export type ServiceStep = { title: string; body: string };
export type ServiceFaq = { q: string; a: string };

export type Service = {
  slug: string;
  name: string;
  tagline: string;
  /** Card copy — two sentences maximum. */
  summary: string;
  /** Indicative starting price in whole dollars. Sample data. */
  from: number;
  duration: string;
  icon: LucideIcon;
  scene: Scene;
  /** Cover photo from `/public/gallery/hero`. */
  imageSrc: string;
  highlights: string[];
  includes: string[];
  goodFor: string;
  steps: ServiceStep[];
  faqs: ServiceFaq[];
  featured?: boolean;
};

export const services: Service[] = [
  {
    slug: "express-wash",
    name: "Express Wash",
    tagline: "In and out in twelve minutes",
    summary:
      "The tunnel lane that made us. Pre-soak, soft-touch wash, spot-free rinse and a hot-air dry, with a hand-finish towel pass on the way out.",
    from: 14,
    duration: "12 minutes",
    icon: Droplets,
    scene: "car",
    imageSrc: "/gallery/hero/car1.jpeg",
    featured: true,
    highlights: ["Twelve-minute tunnel", "Spot-free rinse", "Hand towel finish"],
    includes: [
      "Foam pre-soak and wheel rinse",
      "Soft-touch wash with pH-neutral shampoo",
      "Spot-free reverse-osmosis rinse",
      "Hot-air dry plus a hand towel pass",
      "Tyre shine on the way out",
    ],
    goodFor:
      "Weekly upkeep on a daily driver, or topping up between full details.",
    steps: [
      {
        title: "Pre-soak",
        body: "A foam bath loosens road film for ninety seconds before anything touches the paint, so grit comes off with water rather than a brush.",
      },
      {
        title: "Wash and rinse",
        body: "Soft-touch cloth strips in pH-neutral shampoo, then a spot-free reverse-osmosis rinse that dries without streaks.",
      },
      {
        title: "Dry and finish",
        body: "Hot air does most of the work. An attendant towels the sills, mirrors and boot lid by hand, then hits the tyres.",
      },
    ],
    faqs: [
      {
        q: "Will the tunnel scratch a wrapped or repainted car?",
        a: "Every site runs one touch-free lane for wrapped, matte and freshly-painted vehicles. Ask the greeter to put you in that lane — it cleans with pressure and chemistry alone.",
      },
      {
        q: "How dirty is too dirty?",
        a: "Heavy mud, sand or farm dust needs a pre-rinse first. Attendants will send you back through the pre-wash bay at no extra charge if the tunnel can't safely handle it.",
      },
    ],
  },
  {
    slug: "full-detail",
    name: "Full Detail",
    tagline: "Inside, outside and under the bonnet line",
    summary:
      "A four-hour, two-person job. Hand wash, clay treatment, machine polish, interior shampoo and a proper dressing on every surface that should shine.",
    from: 189,
    duration: "4 hours",
    icon: Sparkles,
    scene: "shine",
    imageSrc: "/gallery/hero/car6.jpeg",
    featured: true,
    highlights: ["Two-person crew", "Machine polish", "Interior shampoo"],
    includes: [
      "Two-bucket hand wash and decontamination",
      "Clay bar treatment across all panels",
      "Single-stage machine polish",
      "Interior vacuum, shampoo and extraction",
      "Leather clean and condition",
      "Glass polished inside and out",
      "Trim and tyre dressing",
    ],
    goodFor:
      "Seasonal resets, pre-sale preparation, or a car that has never had more than a tunnel wash.",
    steps: [
      {
        title: "Assess and document",
        body: "We photograph every panel before touching it and walk you through what will and won't come out — scratches under the clear coat, pet hair in carpet, water spots on glass.",
      },
      {
        title: "Decontaminate",
        body: "Hand wash, iron fallout remover, then a clay bar across the paint to pull out the bonded grit a wash alone leaves behind.",
      },
      {
        title: "Correct and protect",
        body: "A single-stage machine polish lifts light swirling and restores gloss, followed by a six-month sealant.",
      },
      {
        title: "Reset the interior",
        body: "Shampoo and hot extraction on carpets and cloth seats, leather fed and conditioned, every vent and seam reached with detail brushes.",
      },
    ],
    faqs: [
      {
        q: "Do I need to leave the car all day?",
        a: "Four hours is typical for a mid-size vehicle. Larger SUVs and vans can run to six. Book the first slot of the day if you need it back by a deadline.",
      },
      {
        q: "Will it remove every scratch?",
        a: "No — and anyone who promises that is selling you a repaint. A full detail removes light swirling and restores gloss. Scratches that catch a fingernail need paint correction and we'll tell you honestly at the assessment stage.",
      },
    ],
  },
  {
    slug: "interior-deep-clean",
    name: "Interior Deep Clean",
    tagline: "For cars that carry kids, dogs or tools",
    summary:
      "Everything inside the doors, taken apart and put back. Seats extracted, headlining cleaned, vents and switchgear detailed, odour treated at the source.",
    from: 129,
    duration: "3 hours",
    icon: Sofa,
    scene: "interior",
    imageSrc: "/gallery/hero/car9.png",
    highlights: ["Hot extraction", "Headlining safe", "Odour treatment"],
    includes: [
      "Full vacuum including under-seat and seat rails",
      "Hot water extraction on carpets and cloth seats",
      "Headlining cleaned with a low-moisture method",
      "Vents, switchgear and console detailed",
      "Interior glass streak-free",
      "Odour treatment with an ozone finish",
    ],
    goodFor:
      "Family cars, dog owners, tradespeople, lease returns and anything being sold.",
    steps: [
      {
        title: "Empty and vacuum",
        body: "Seats come out where the manufacturer allows it. Every rail, runner and gap gets vacuumed before any liquid goes near the carpet.",
      },
      {
        title: "Extract",
        body: "Hot water extraction lifts the dirt that a shop-vac leaves behind, then we force-dry so the interior doesn't smell damp afterwards.",
      },
      {
        title: "Detail and deodorise",
        body: "Vents, stitching and switchgear get detail brushes. An ozone cycle finishes the job at the source rather than masking it.",
      },
    ],
    faqs: [
      {
        q: "How long until the interior is dry?",
        a: "Around two hours with the windows cracked, or immediately if you take the force-dry option. Book a morning slot and it will be dry by the afternoon.",
      },
      {
        q: "Can you get rid of smoke or pet smell?",
        a: "Usually, yes — with caveats. Surface odour goes away completely. Odour that has soaked into foam padding may need a second treatment, and we'll tell you before you pay for the first one.",
      },
    ],
  },
  {
    slug: "paint-correction",
    name: "Paint Correction",
    tagline: "Measured, not guessed",
    summary:
      "Multi-stage machine polishing with paint-depth readings taken before and after every panel. Swirls, oxidation and water spots reduced to a documented level.",
    from: 349,
    duration: "1–2 days",
    icon: Gem,
    scene: "wheel",
    imageSrc: "/gallery/hero/car7.png",
    highlights: ["Depth readings", "Panel-by-panel", "Documented results"],
    includes: [
      "Paint depth gauge readings on every panel",
      "Two-stage compounding and refining",
      "Panel-by-panel defect mapping before and after",
      "Trim, badges and glass masked throughout",
      "IPA wipe-down to reveal true finish",
      "Post-correction sealant",
    ],
    goodFor:
      "Dark-coloured cars showing swirl marks, neglected paint, or a finish being prepared for ceramic coating.",
    steps: [
      {
        title: "Map the paint",
        body: "We take depth readings across every panel and photograph the defects under LED inspection lighting. You get that report whether or not you go ahead.",
      },
      {
        title: "Compound",
        body: "A cutting stage removes the bulk of the swirling and oxidation. Slow, warm and controlled — heat is what damages paint, so it's the thing we watch.",
      },
      {
        title: "Refine",
        body: "A finer polish removes the haze the cutting stage leaves behind, then an IPA wipe reveals the true finish rather than one in oil.",
      },
    ],
    faqs: [
      {
        q: "Why does it take two days?",
        a: "Because doing it in one day means rushing the refinement stage, and rushing refinement is how you trade swirls for holograms. Larger vehicles genuinely take two full days.",
      },
      {
        q: "What if my clear coat is too thin?",
        a: "Then we stop and tell you. If the depth gauge says there isn't enough clear coat to correct safely, we'll recommend protection instead of correction rather than burn through it.",
      },
    ],
  },
  {
    slug: "ceramic-coating",
    name: "Ceramic Coating",
    tagline: "Two years of easier washes",
    summary:
      "A professional-grade ceramic layer applied over corrected paint, cured under infrared, with a registered warranty and a yearly inspection included.",
    from: 749,
    duration: "2–3 days",
    icon: HandPlatter,
    scene: "foam",
    imageSrc: "/gallery/hero/car8.png",
    featured: true,
    highlights: ["Registered warranty", "Infrared cured", "Annual inspection"],
    includes: [
      "Paint correction prerequisite included",
      "Full decontamination and panel wipe",
      "Professional-grade ceramic application",
      "Infrared curing cycle",
      "Wheels and glass coated",
      "Registered warranty and annual inspection",
    ],
    goodFor:
      "New vehicles, leased cars you intend to keep, and anyone tired of washing a black car every weekend.",
    steps: [
      {
        title: "Correct first",
        body: "Coating locks in whatever is underneath it — including swirls. Correction is a prerequisite, not an upsell, so it's built into the price.",
      },
      {
        title: "Apply and level",
        body: "Applied panel by panel in a dust-controlled bay, then levelled before it flashes. A second layer goes on high-contact areas.",
      },
      {
        title: "Cure and register",
        body: "An infrared cycle accelerates the cure, then your coating is registered against the VIN with a warranty you can transfer if you sell.",
      },
    ],
    faqs: [
      {
        q: "Is ceramic coating scratch-proof?",
        a: "No. It's a chemical and UV barrier that makes washing dramatically easier and resists etching from bird droppings and tree sap. It does not stop rock chips or keys.",
      },
      {
        q: "Can I wash the car straight away?",
        a: "Not for seven days — the coating is still curing. After that, a normal express wash is fine, and it's a lot quicker than it used to be.",
      },
    ],
  },
  {
    slug: "fleet-and-commercial",
    name: "Fleet & Commercial",
    tagline: "Invoiced monthly, washed on schedule",
    summary:
      "Standing slots for vans, utes and company cars, billed on one monthly invoice with per-vehicle reporting and a dedicated account contact.",
    from: 22,
    duration: "Per vehicle",
    icon: Truck,
    scene: "suv",
    imageSrc: "/gallery/hero/car10.png",
    highlights: ["Standing slots", "Monthly invoice", "Account manager"],
    includes: [
      "Reserved slots at any location",
      "Per-vehicle wash records",
      "Consolidated monthly invoicing",
      "Signage and livery-safe process",
      "Named account contact",
      "Volume rates from five vehicles",
    ],
    goodFor:
      "Trades with vans, sales fleets, rental returns and any business where a dirty vehicle is a bad advert.",
    steps: [
      {
        title: "Agree a schedule",
        body: "We map your vehicles against quiet hours at your nearest site so nobody queues, and reserve those slots permanently.",
      },
      {
        title: "Wash and record",
        body: "Each vehicle is logged with a job number, so you can see exactly what was done, when, and by whom.",
      },
      {
        title: "One invoice",
        body: "Everything lands on a single monthly invoice with cost-centre breakdowns if you need them.",
      },
    ],
    faqs: [
      {
        q: "How many vehicles before volume pricing kicks in?",
        a: "Five. Below that you can still hold standing slots, you just pay the standard per-vehicle rate.",
      },
      {
        q: "Can you handle sign-written vans?",
        a: "Yes. Signage and wraps go through the touch-free lane with a reduced-pressure cycle so edges and vinyl aren't lifted.",
      },
    ],
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}

export function getFeaturedServices(): Service[] {
  return services.filter((service) => service.featured);
}

/** Only the lighter, higher-frequency services are sold as memberships. */
export const membershipServiceSlugs = ["express-wash", "full-detail"] as const;
