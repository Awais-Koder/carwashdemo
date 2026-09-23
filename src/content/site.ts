/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  THE RE-SKIN HUB
 * ─────────────────────────────────────────────────────────────────────────────
 *  This is the only file you need to touch to re-brand the demo for a new
 *  car-wash client. Change the brand block, drop in their phone number and
 *  city, and every page — nav, footer, metadata, booking form, structured
 *  data — follows automatically.
 *
 *  To change the palette for a client, edit tokens.css (see README).
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const site = {
  brand: {
    /** Set to true while pitching — shows the "demo site" banner. Ship with
     *  `false` once a client signs so the site looks like the real thing. */
    isDemo: false,
    name: "John Doe Car Wash",
    shortName: "John Doe",
    /** Rendered in the wordmark; keep under ~14 characters. */
    wordmark: "JohnDoe",
    wordmarkAccent: "Wash",
    tagline: "Clean car. Clear mind.",
    /** One sentence, used for <meta name="description"> and the OG card. */
    description:
      "Express tunnel washes, hand detailing and ceramic coating — booked online in under a minute. Serving the metro area with four locations and a 30-day shine guarantee.",
    founded: 2009,
  },

  contact: {
    phone: "(555) 010-2288",
    /** Digits only, used for tel: links. */
    phoneHref: "tel:+15550102288",
    email: "hello@johndoecarwash.example",
    address: {
      line1: "1420 Riverside Drive",
      city: "Springfield",
      region: "IL",
      postal: "62704",
    },
    hours: [
      { days: "Monday – Friday", time: "7:00 – 20:00" },
      { days: "Saturday", time: "7:00 – 21:00" },
      { days: "Sunday", time: "8:00 – 18:00" },
    ],
    /** Shown under the hours table. */
    hoursNote: "Last full detail booked 90 minutes before close.",
  },

  socials: [
    { label: "Instagram", href: "https://instagram.com" },
    { label: "Facebook", href: "https://facebook.com" },
    { label: "YouTube", href: "https://youtube.com" },
  ],

  /** Painful, honest guarantees do more selling than adjectives. */
  guarantees: [
    {
      icon: "shield",
      title: "30-day shine guarantee",
      body: "Not happy with the finish? Come back and we re-wash it free, no questions and no receipt.",
    },
    {
      icon: "truck",
      title: "Touch-free option at every bay",
      body: "Every location runs at least one soft-touch and one touch-free lane, so low-clearance and wrapped vehicles are welcome.",
    },
    {
      icon: "clock",
      title: "Booked means booked",
      body: "Reserve a slot and it is yours. We cap each hour so the queue never eats your booked time.",
    },
  ],

  /** Used by the booking form's "how did you hear about us" step. */
  referralSources: [
    "Drive-by / passed the lot",
    "Google or maps search",
    "A friend or family member",
    "Social media",
    "Employer or fleet programme",
    "Somewhere else",
  ],
} as const;

export type Site = typeof site;

/** Primary navigation — kept short deliberately. */
export const navLinks = [
  { href: "/services", label: "Services" },
  { href: "/pricing", label: "Packages" },
  { href: "/gallery", label: "Gallery" },
  { href: "/locations", label: "Locations" },
  { href: "/about", label: "About" },
] as const;

/** Grouped footer navigation. */
export const footerNav = [
  {
    heading: "Wash",
    links: [
      { href: "/services", label: "All services" },
      { href: "/pricing", label: "Packages & pricing" },
      { href: "/booking", label: "Book a wash" },
      { href: "/gallery", label: "Before & after" },
    ],
  },
  {
    heading: "Company",
    links: [
      { href: "/about", label: "About us" },
      { href: "/careers", label: "Careers" },
      { href: "/blog", label: "Wash notes" },
      { href: "/locations", label: "Locations" },
    ],
  },
  {
    heading: "Help",
    links: [
      { href: "/faq", label: "FAQ" },
      { href: "/locations#contact", label: "Contact" },
      { href: "/pricing#addons", label: "Add-ons" },
      { href: "/services#fleet", label: "Fleet accounts" },
    ],
  },
] as const;

/** Single source of truth for page titles. */
export const pageMeta = {
  home: {
    title: `${site.brand.name} · Express washes & hand detailing`,
    description: site.brand.description,
  },
} as const;
