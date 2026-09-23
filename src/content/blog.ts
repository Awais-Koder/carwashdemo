export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "quote"; text: string; attribution?: string }
  | { type: "callout"; title: string; text: string };

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readMinutes: number;
  category: "Care guide" | "Behind the wash" | "Buying advice";
  scene: "car" | "foam" | "shine" | "wheel" | "interior" | "shop";
  coverSrc: string;
  body: Block[];
};

export const posts: Post[] = [
  {
    slug: "how-often-should-you-wash-your-car",
    title: "How often should you actually wash your car?",
    excerpt:
      "Once a fortnight is the honest answer for most people — but it depends far more on where you park than on how often you drive.",
    date: "2026-08-18",
    readMinutes: 5,
    category: "Care guide",
    scene: "car",
    coverSrc: "/gallery/hero/car2.jpeg",
    body: [
      {
        type: "p",
        text: "There is no single correct interval, and anyone quoting one is guessing about your situation. The useful question is not how often you drive, but what lands on the paint and how long it sits there.",
      },
      {
        type: "h2",
        text: "What actually damages paint",
      },
      {
        type: "p",
        text: "Three things do almost all the harm: bird droppings, tree sap and industrial fallout. All three are acidic or bonded, and all three get worse with time rather than better. Road film is comparatively harmless — it is ugly, but it is not actively eating the clear coat.",
      },
      {
        type: "ul",
        items: [
          "Parked under trees: wash every week, and rinse droppings off the day they land.",
          "Parked in a driveway near a road: every two to three weeks.",
          "Garaged and driven weekends: monthly is genuinely fine.",
          "After any coastal trip: within a few days, salt is relentless.",
        ],
      },
      {
        type: "h2",
        text: "The rainfall trap",
      },
      {
        type: "p",
        text: "Rain does not clean a car. It deposits whatever it picked up on the way down, and then the sun bakes it. A car that has been rained on and left to dry is dirtier than one that was never wet.",
      },
      {
        type: "callout",
        title: "The two-minute rule",
        text: "If you can remove a dropping, a sap spot or a bug splat within two minutes using a wet cloth, it costs nothing. Left for two weeks in summer sun, the same spot can etch permanently and need machine polishing.",
      },
      {
        type: "h2",
        text: "Where a coating changes the maths",
      },
      {
        type: "p",
        text: "A sealed or coated car does not get less dirty — it gets far easier to clean, because contaminants sit on the coating instead of bonding to the paint. In practice that means more of your washes are quick ones and fewer become correction jobs.",
      },
      {
        type: "quote",
        text: "Wash frequency is really a question about exposure, not mileage.",
      },
    ],
  },
  {
    slug: "touch-free-vs-soft-touch",
    title: "Touch-free or soft-touch? An honest comparison",
    excerpt:
      "We run both lanes at every site, so we have no reason to sell you one. Here is what each is genuinely better at.",
    date: "2026-07-29",
    readMinutes: 6,
    category: "Buying advice",
    scene: "foam",
    coverSrc: "/gallery/hero/car3.jpeg",
    body: [
      {
        type: "p",
        text: "Most operators pick a side and defend it. We run both because the honest answer is that neither wins — it depends on your paint, your wrap and how much time you have.",
      },
      {
        type: "h2",
        text: "Soft-touch",
      },
      {
        type: "p",
        text: "Cloth strips in a pH-neutral shampoo do a measurably better job on film, traffic grime and the sheen of a genuinely dirty car. Modern closed-cell foam is far gentler than the bristle brushes of twenty years ago, and a well-maintained machine will not scratch sound paint.",
      },
      {
        type: "ul",
        items: [
          "Better on: road film, bug residue, general grime.",
          "Safe on: factory paint in good condition.",
          "Avoid if: matte or satin finish, fresh repaint under 30 days, vinyl wrap.",
        ],
      },
      {
        type: "h2",
        text: "Touch-free",
      },
      {
        type: "p",
        text: "Touch-free cleans with chemistry and pressure alone. Nothing contacts the surface, which makes it the only responsible option for wraps, matte paint and fresh resprays. The trade-off is real: it leaves a thin film that only a hand towel pass removes.",
      },
      {
        type: "ul",
        items: [
          "Better on: wrapped, matte, satin and freshly-painted vehicles.",
          "Never risks: swirl marks from a contaminated brush.",
          "Accept: a slightly duller finish without the towel pass.",
        ],
      },
      {
        type: "callout",
        title: "What we recommend",
        text: "Factory paint in good condition: soft-touch, every time. Wrapped or matte: touch-free, always. Fresh repaint inside 30 days: touch-free, or better still, hand wash only.",
      },
    ],
  },
  {
    slug: "is-ceramic-coating-worth-it",
    title: "Is ceramic coating worth the money?",
    excerpt:
      "It depends entirely on one question: are you keeping the car for more than two years?",
    date: "2026-07-04",
    readMinutes: 7,
    category: "Buying advice",
    scene: "shine",
    coverSrc: "/gallery/hero/car8.png",
    body: [
      {
        type: "p",
        text: "Coating is the most oversold product in this industry, largely because it is the most profitable one to oversell. So let us be specific about what it does and what it does not.",
      },
      {
        type: "h2",
        text: "What it genuinely does",
      },
      {
        type: "ul",
        items: [
          "Makes washing dramatically faster — contaminants sit on the coating, not in the paint.",
          "Resists etching from bird droppings and tree sap, which gives you a longer window to react.",
          "Blocks UV, which slows oxidation and colour fade on older paint.",
          "Keeps a resale-grade gloss with very little effort.",
        ],
      },
      {
        type: "h2",
        text: "What it does not do",
      },
      {
        type: "ul",
        items: [
          "It does not stop rock chips, scratches or trolley dents.",
          "It does not let you skip washing entirely.",
          "It does not fix existing swirls — it locks them in. Correction first is not an upsell, it is the whole point.",
        ],
      },
      {
        type: "quote",
        text: "If you are selling in twelve months, buy a sealant. It does eighty percent of the job for a fifth of the price, and we will tell you so.",
      },
      {
        type: "h2",
        text: "So when is it worth it?",
      },
      {
        type: "p",
        text: "Keep the car more than two years, park it outside, and plan to sell it privately: coating pays for itself in retained gloss and easier maintenance. Lease it, garage it, or flip it annually: buy a sealant and put the difference toward a full detail instead.",
      },
    ],
  },
  {
    slug: "five-things-that-ruin-interiors",
    title: "Five things that ruin an interior (and how to stop them)",
    excerpt:
      "Most interior damage is not wear. It is chemistry, moisture and a two-year delay.",
    date: "2026-06-21",
    readMinutes: 5,
    category: "Care guide",
    scene: "interior",
    coverSrc: "/gallery/hero/before3.png",
    body: [
      {
        type: "p",
        text: "We clean a lot of interiors, and the pattern is remarkably consistent. Almost none of the damage is from use. It is from things sitting where they should not sit, for longer than they should.",
      },
      {
        type: "h2",
        text: "1. Spilled coffee that was wiped, not extracted",
      },
      {
        type: "p",
        text: "Wiping the surface moves the sugar and milk into the foam underneath. From there it feeds bacteria and produces a smell you cannot clean off — only out.",
      },
      {
        type: "h2",
        text: "2. Wet dog, wet towels, wet sports kit",
      },
      {
        type: "p",
        text: "Moisture trapped in seat foam is the single biggest cause of persistent interior odour. If something wet rides in the car, dry the car afterwards, not just the thing.",
      },
      {
        type: "h2",
        text: "3. Hand sanitiser and sunscreen on plastics",
      },
      {
        type: "p",
        text: "Both attack the soft-touch coating on door cards and steering wheels. The shiny patch you notice after a year is dissolved coating, and it cannot be restored — only recoloured.",
      },
      {
        type: "h2",
        text: "4. Cheap air fresheners",
      },
      {
        type: "p",
        text: "They mask rather than remove, and the oil carriers in some of them stain trim permanently. Fix odour at the source with extraction and ozone; then you do not need to mask it.",
      },
      {
        type: "h2",
        text: "5. Waiting two years",
      },
      {
        type: "p",
        text: "Every item above is trivial to fix within a month and expensive to fix after two. An annual deep clean costs a fraction of replacing seat foam or recolouring a door card.",
      },
    ],
  },
  {
    slug: "what-happens-in-a-tunnel-wash",
    title: "What actually happens inside a tunnel wash",
    excerpt:
      "Ninety seconds, six stages. Here is the machinery doing the work while you sit in the queue.",
    date: "2026-05-30",
    readMinutes: 4,
    category: "Behind the wash",
    scene: "shop",
    coverSrc: "/gallery/hero/car1.jpeg",
    body: [
      {
        type: "p",
        text: "People are oddly suspicious of tunnel washes, largely because you cannot see what is happening. So here is the sequence, stage by stage.",
      },
      {
        type: "h2",
        text: "Stage one · pre-soak",
      },
      {
        type: "p",
        text: "A foam bath of pH-neutral shampoo sits on the car for about ninety seconds. This is the most important stage and the one operators most often skimp on: loosening film before anything touches the paint is what separates a safe wash from a scratched one.",
      },
      {
        type: "h2",
        text: "Stage two · wheel and lower-panel prep",
      },
      {
        type: "p",
        text: "Wheels, arches and sills carry the heaviest contamination, so they get pre-treated before the wash rather than after. If they are not, that grit gets dragged upward.",
      },
      {
        type: "h2",
        text: "Stage three · the wash",
      },
      {
        type: "p",
        text: "Soft-touch closed-cell foam strips or touch-free jets, depending on the lane. Both use shampoo metered by a controller rather than eyeballed.",
      },
      {
        type: "h2",
        text: "Stage four · the rinse",
      },
      {
        type: "p",
        text: "Reverse-osmosis water, which is the trick that stops spots. Mineral-free water dries without leaving calcium behind, so the car can air-dry without streaking.",
      },
      {
        type: "h2",
        text: "Stage five · the dry",
      },
      {
        type: "p",
        text: "A high-volume air curtain does most of the work — no contact, no lint. Attendants then hand-towel the sills, mirrors, badges and boot lid, which is where air always misses.",
      },
      {
        type: "h2",
        text: "Stage six · the finish",
      },
      {
        type: "p",
        text: "Tyre dressing, and on higher tiers, a wax or sealant pass. This is the stage that decides whether the car looks washed or looks maintained.",
      },
    ],
  },
  {
    slug: "winter-salt-and-your-paint",
    title: "Winter salt is doing more damage than you think",
    excerpt:
      "Road salt does not just corrode metal. Left on paint and glass, it etches and abrades.",
    date: "2026-05-02",
    readMinutes: 4,
    category: "Care guide",
    scene: "wheel",
    coverSrc: "/gallery/hero/car5.jpeg",
    body: [
      {
        type: "p",
        text: "Most people know salt rusts a chassis. Fewer realise what it does to paint, wheels and glass — and those repairs are far more expensive than the corrosion you were worried about.",
      },
      {
        type: "h2",
        text: "What it does to paint",
      },
      {
        type: "p",
        text: "Salt crystals are abrasive. Every time something brushes against a salted panel, it acts like a very fine sandpaper. Combine that with the winter habit of dry-wiping a dirty car and you get a season's worth of swirling in a few months.",
      },
      {
        type: "h2",
        text: "What it does to wheels",
      },
      {
        type: "p",
        text: "Brake dust plus salt plus moisture is a chemical cocktail that etches clear-coated alloys. Once the clear coat is compromised, the corrosion underneath is not reversible — only refinishable.",
      },
      {
        type: "h2",
        text: "The underbody is the part you cannot see",
      },
      {
        type: "p",
        text: "An underbody flush is the cheapest line item on any wash menu and the one with the highest return. Salt sits in seams and subframe cavities where you will never notice it until the metal is gone.",
      },
      {
        type: "callout",
        title: "Winter routine that actually works",
        text: "Flush the underbody every two weeks through the salty months, never dry-wipe a salted car, and take the underbody add-on even when the paint still looks clean.",
      },
    ],
  },
];

export function getPost(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug);
}

export const sortedPosts = [...posts].sort((a, b) =>
  a.date < b.date ? 1 : -1,
);
