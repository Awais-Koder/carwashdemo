export type Package = {
  slug: string;
  name: string;
  price: number;
  cadence?: string;
  pitch: string;
  duration: string;
  featured?: boolean;
  includes: string[];
  excludes?: string[];
};

/** Tunnel-lane packages. Sample pricing for demonstration. */
export const packages: Package[] = [
  {
    slug: "splash",
    name: "Splash",
    price: 14,
    pitch: "The quick reset. Twelve minutes, back on the road.",
    duration: "12 min",
    includes: [
      "Foam pre-soak and rinse",
      "Soft-touch wash",
      "Spot-free reverse-osmosis rinse",
      "Hot-air dry",
    ],
    excludes: ["Wheel detail", "Tyre shine", "Interior"],
  },
  {
    slug: "shine",
    name: "Shine",
    price: 26,
    pitch: "Our best seller. The wash your car actually needs weekly.",
    duration: "18 min",
    featured: true,
    includes: [
      "Everything in Splash",
      "Wheel-face and rim detail",
      "Tyre shine and dressing",
      "Triple-foam polish wax",
      "Hand towel finish on sills and mirrors",
    ],
    excludes: ["Interior"],
  },
  {
    slug: "shield",
    name: "Shield",
    price: 38,
    pitch: "Six months of protection in one visit.",
    duration: "24 min",
    includes: [
      "Everything in Shine",
      "Ceramic-infused sealant layer",
      "Rain-repellent windscreen treatment",
      "Underbody flush",
      "Interior vacuum and wipe-down",
    ],
  },
  {
    slug: "showroom",
    name: "Showroom",
    price: 62,
    pitch: "The whole car, inside and out, without booking a detail.",
    duration: "45 min",
    includes: [
      "Everything in Shield",
      "Interior shampoo on mats and carpets",
      "Leather clean and condition",
      "Interior glass polished",
      "Door jambs and boot seal wiped",
      "Odour treatment",
    ],
  },
];

/** Add-ons available at the lane or booked with a detail. */
export const addons = [
  {
    name: "Pet hair removal",
    price: 25,
    note: "Rubber-brush extraction. Heavy shedding may need a second pass.",
  },
  {
    name: "Ozone odour treatment",
    price: 35,
    note: "Twenty-minute cycle. Best after a deep clean, not instead of one.",
  },
  {
    name: "Engine bay clean and dress",
    price: 45,
    note: "Degreased, rinsed at low pressure, plastics dressed.",
  },
  {
    name: "Headlight restoration",
    price: 79,
    note: "Wet-sanded and UV-sealed. One pair.",
  },
  {
    name: "Clay bar decontamination",
    price: 69,
    note: "Pulls bonded grit out of the paint before wax or coating.",
  },
  {
    name: "Rain-repellent glass",
    price: 19,
    note: "Windscreen and front side glass. Twelve months of beading.",
  },
];

/** Feature comparison across the four tunnel packages. */
export const comparison = [
  { feature: "Foam pre-soak", values: [true, true, true, true] },
  { feature: "Soft-touch or touch-free lane", values: [true, true, true, true] },
  { feature: "Spot-free rinse and hot-air dry", values: [true, true, true, true] },
  { feature: "Wheel-face and rim detail", values: [false, true, true, true] },
  { feature: "Tyre shine", values: [false, true, true, true] },
  { feature: "Polish wax", values: [false, true, true, true] },
  { feature: "Ceramic-infused sealant", values: [false, false, true, true] },
  { feature: "Rain-repellent windscreen", values: [false, false, true, true] },
  { feature: "Underbody flush", values: [false, false, true, true] },
  { feature: "Interior vacuum", values: [false, false, true, true] },
  { feature: "Interior shampoo", values: [false, false, false, true] },
  { feature: "Leather clean and condition", values: [false, false, false, true] },
  { feature: "Door jambs and boot seals", values: [false, false, false, true] },
] as const;

/** Unlimited-wash memberships, billed monthly. */
export const memberships = [
  {
    name: "Shine Club",
    price: 34,
    cadence: "/month",
    pitch: "Unlimited Shine washes at any location.",
    perks: [
      "Unlimited Shine tunnel washes",
      "Two guest passes each month",
      "15% off add-ons",
      "Cancel any time",
    ],
  },
  {
    name: "Showroom Club",
    price: 59,
    cadence: "/month",
    pitch: "Unlimited Showroom washes, plus a quarterly interior.",
    featured: true,
    perks: [
      "Unlimited Showroom tunnel washes",
      "One interior deep clean each quarter",
      "One free clay treatment per year",
      "25% off paint correction and coating",
      "Two guest passes each month",
    ],
  },
  {
    name: "Fleet Account",
    price: 0,
    cadence: "custom",
    pitch: "Standing slots and one invoice for five or more vehicles.",
    perks: [
      "Reserved slots at any location",
      "Per-vehicle wash records",
      "Consolidated monthly invoicing",
      "Named account contact",
    ],
  },
] as const;

export const pricingNotes = [
  "Prices shown are for a mid-size sedan. Larger vehicles, heavy soiling and pet hair carry a surcharge quoted before work starts.",
  "Every site runs at least one touch-free lane for wrapped, matte and freshly-painted vehicles at no extra cost.",
  "Detailing is by appointment only. Tunnel packages are walk-in, though booking holds your slot.",
] as const;
