export type Review = {
  quote: string;
  name: string;
  detail: string;
  rating: 4 | 5;
};

export const reviews: Review[] = [
  {
    quote:
      "Booked at 8:40, drove out at 9:05 with a car that looked new. The booked slot actually meant something — no queue at all.",
    name: "Marcus T.",
    detail: "Express Wash · mid-size SUV",
    rating: 5,
  },
  {
    quote:
      "They talked me out of the full correction and into a single stage, because the depth readings said it wasn't worth the money yet. That bought my loyalty.",
    name: "Elena R.",
    detail: "Paint Correction · dark blue sedan",
    rating: 5,
  },
  {
    quote:
      "Two dogs and a toddler. I genuinely thought the back seats were finished. They came back looking like a lease return.",
    name: "James K.",
    detail: "Interior Deep Clean · wagon",
    rating: 5,
  },
  {
    quote:
      "The ceramic coating was the best money I've spent on the car. Washing it is a ten-minute job now instead of an afternoon.",
    name: "Priya N.",
    detail: "Ceramic Coating · new hatchback",
    rating: 5,
  },
  {
    quote:
      "We run eleven vans through them. One invoice, no chasing, and the drivers actually use the booking system because it takes twenty seconds.",
    name: "Tom H.",
    detail: "Fleet Account · trades fleet",
    rating: 5,
  },
  {
    quote:
      "Wrapped matt-black roof and they put me straight in the touch-free lane without me having to explain. Knew their stuff.",
    name: "Sofia L.",
    detail: "Express Wash · wrapped coupe",
    rating: 4,
  },
  {
    quote:
      "They photographed the scratches before and after and showed me exactly which ones would not come out. No surprises on the invoice.",
    name: "Daniel W.",
    detail: "Full Detail · pre-sale prep",
    rating: 5,
  },
  {
    quote:
      "Coffee while you wait, kids' area, and the app tells you when the car's done. Small things, but they add up.",
    name: "Amy C.",
    detail: "Showroom Club member",
    rating: 5,
  },
];

export type Fact = {
  label: string;
  value: string | null;
  note?: string;
  placeholder?: boolean;
};

export const facts: Fact[] = [
  {
    label: "Locations",
    value: "4",
    note: "Riverside, Northgate, Lakeview, Eastfield",
  },
  { label: "Open since", value: "2009", note: "Family run since day one" },
  {
    label: "Express wash time",
    value: "12 min",
    note: "In and out, dry and finished",
  },
  {
    label: "Guarantee window",
    value: "30 days",
    note: "Re-wash free if you're not happy",
  },
];
