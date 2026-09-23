export type Location = {
  slug: string;
  name: string;
  address: string;
  city: string;
  phone: string;
  hours: { days: string; time: string }[];
  lanes: string[];
  amenities: string[];
  /** Approximate coordinates for the static map. */
  coords: { x: number; y: number };
  flagship?: boolean;
};

export const locations: Location[] = [
  {
    slug: "riverside",
    name: "Riverside",
    address: "1420 Riverside Drive",
    city: "Springfield, IL 62704",
    phone: "(555) 010-2288",
    flagship: true,
    hours: [
      { days: "Mon – Fri", time: "7:00 – 20:00" },
      { days: "Saturday", time: "7:00 – 21:00" },
      { days: "Sunday", time: "8:00 – 18:00" },
    ],
    lanes: ["Soft-touch", "Touch-free", "Hand wash bay", "Detail studio"],
    amenities: [
      "Detail studio on site",
      "Waiting lounge and coffee",
      "Free Wi-Fi and work desks",
      "Dog-friendly patio",
    ],
    coords: { x: 26, y: 58 },
  },
  {
    slug: "northgate",
    name: "Northgate",
    address: "88 Northgate Retail Park",
    city: "Springfield, IL 62702",
    phone: "(555) 010-2291",
    hours: [
      { days: "Mon – Fri", time: "6:30 – 20:00" },
      { days: "Saturday", time: "7:00 – 21:00" },
      { days: "Sunday", time: "8:00 – 18:00" },
    ],
    lanes: ["Soft-touch", "Touch-free", "Van and ute lane"],
    amenities: [
      "Oversize van and ute lane",
      "24-hour card-only kiosk",
      "Kids' play corner",
    ],
    coords: { x: 62, y: 22 },
  },
  {
    slug: "lakeview",
    name: "Lakeview",
    address: "3 Lakeshore Boulevard",
    city: "Springfield, IL 62711",
    phone: "(555) 010-2304",
    hours: [
      { days: "Mon – Fri", time: "7:00 – 19:00" },
      { days: "Saturday", time: "7:30 – 19:00" },
      { days: "Sunday", time: "9:00 – 17:00" },
    ],
    lanes: ["Soft-touch", "Touch-free"],
    amenities: [
      "Ceramic coating bay",
      "Bicycle wash rack",
      "Waiting lounge and coffee",
    ],
    coords: { x: 44, y: 76 },
  },
  {
    slug: "eastfield",
    name: "Eastfield",
    address: "975 Eastfield Road",
    city: "Springfield, IL 62707",
    phone: "(555) 010-2318",
    hours: [
      { days: "Mon – Fri", time: "7:00 – 19:00" },
      { days: "Saturday", time: "8:00 – 18:00" },
      { days: "Sunday", time: "Closed" },
    ],
    lanes: ["Soft-touch", "Touch-free", "Fleet priority lane"],
    amenities: [
      "Fleet priority lane",
      "Oversize vehicle clearance",
      "Truck and trailer parking",
    ],
    coords: { x: 78, y: 62 },
  },
];

export const team = [
  {
    name: "Jane Doe",
    role: "Founder",
    bio: "Started with one hand-wash bay and a borrowed pressure washer in 2009. Still checks the quality log every Monday.",
    scene: "team" as const,
  },
  {
    name: "Operations lead",
    role: "Head of Operations",
    bio: "Runs the four sites and the booking system that keeps Saturday mornings from turning into a car park.",
    scene: "shop" as const,
  },
  {
    name: "Lead detailer",
    role: "Paint & Coating",
    bio: "Trained in paint correction and IR curing. Takes the depth readings, and is the person who tells clients when the answer is no.",
    scene: "shine" as const,
  },
  {
    name: "Site lead",
    role: "Riverside",
    bio: "Ten years on the tunnel. Knows every regular by their vehicle and which lane it needs.",
    scene: "car" as const,
  },
];

export const values = [
  {
    title: "Tell people when the answer is no",
    body: "If a coating will not help, or a scratch will not come out, that is what we say. Uncomfortable honesty in the quote costs us one sale and keeps a customer for years.",
  },
  {
    title: "Chemistry over pressure",
    body: "Dirt comes off with the right shampoo and dwell time, not with more force. Every stage is metered, and nobody at the lane is paid per car.",
  },
  {
    title: "Booked means booked",
    body: "We cap each hour against lane capacity. That sometimes means turning away a walk-in to protect a slot someone reserved, which is the correct trade.",
  },
  {
    title: "Nobody works through a lunch break",
    body: "A tired attendant at the end of a tunnel is how paint gets scratched. Rotations are scheduled with breaks built in, not squeezed out.",
  },
];

export const timeline = [
  {
    year: "2009",
    title: "One bay on Riverside Drive",
    body: "A hand-wash bay, a borrowed pressure washer, and a handwritten price board.",
  },
  {
    year: "2013",
    title: "The first tunnel",
    body: "A soft-touch tunnel replaced the hand bay at Riverside. Twelve-minute washes changed the business.",
  },
  {
    year: "2017",
    title: "Northgate and Lakeview",
    body: "Two more sites, and the first touch-free lane for wrapped and matte vehicles.",
  },
  {
    year: "2021",
    title: "The detail studio",
    body: "Paint correction and ceramic coating moved in-house, on the back of a depth gauge and a promise not to sell correction blindly.",
  },
  {
    year: "2024",
    title: "Fleet accounts",
    body: "Reserved lanes and consolidated invoicing for trades and sales fleets.",
  },
  {
    year: "2026",
    title: "Online booking",
    body: "Slots you can hold in under a minute, at any of the four sites.",
  },
];

export type Role = {
  title: string;
  location: string;
  type: string;
  salary: string;
  summary: string;
  youWill: string[];
};

export const roles: Role[] = [
  {
    title: "Detailer",
    location: "Riverside",
    type: "Full time",
    salary: "$48,000 – $58,000 + bonus",
    summary:
      "Run full details and interior deep cleans, with a path into paint correction for the right person.",
    youWill: [
      "Deliver full details and interior deep cleans to a documented standard",
      "Photograph and report defects honestly before work starts",
      "Keep the detail studio and its consumables organised",
      "Train up on machine polishing if that's where you want to go",
    ],
  },
  {
    title: "Tunnel attendant",
    location: "Northgate · Eastfield",
    type: "Full time or part time",
    salary: "$19 – $23 per hour",
    summary:
      "The face of the site. Greet, route vehicles to the right lane, and finish every car by hand.",
    youWill: [
      "Route wrapped and low-clearance vehicles to the correct lane",
      "Hand-finish sills, mirrors and boot lids after the air dry",
      "Keep the queue moving without rushing anyone's vehicle",
      "Flag anything unsafe or unclear before the car enters the tunnel",
    ],
  },
  {
    title: "Site lead in training",
    location: "Metro area",
    type: "Full time",
    salary: "$62,000 – $72,000",
    summary:
      "A structured six-month programme to run your own site, from rosters to quality audits.",
    youWill: [
      "Learn the quality audit process across all four sites",
      "Cover for site leads on leave, running the floor solo",
      "Own daily rosters, breaks and lane capacity planning",
      "Handle customer conversations when a finish is disputed",
    ],
  },
];

export const perks = [
  "Free unlimited washes for you and your household",
  "Paid training, including paint correction certification",
  "Rosters posted four weeks ahead, with breaks protected",
  "Health cover contribution from day one",
  "Birthday off, guaranteed",
];
