export type Faq = { q: string; a: string };

export type FaqGroup = {
  category: string;
  blurb: string;
  items: Faq[];
};

export const faqGroups: FaqGroup[] = [
  {
    category: "Booking & visits",
    blurb: "How slots, walk-ins and timing actually work.",
    items: [
      {
        q: "Do I need to book, or can I just turn up?",
        a: "Tunnel lanes take walk-ins. Booking a slot holds your place in the queue and skips the wait, which matters most on Saturday mornings and after rain. Detailing is appointment only.",
      },
      {
        q: "What happens if I'm late for my slot?",
        a: "We hold your slot for fifteen minutes. After that we'll fit you into the next gap, and on a busy day that could be an hour. If you know you'll be late, phone the site and they'll move you.",
      },
      {
        q: "How long does a detail take?",
        a: "An interior deep clean runs about three hours, a full detail four to six, and paint correction or ceramic coating one to three days. The booking form shows the realistic window for each service before you commit.",
      },
      {
        q: "Can I wait on site?",
        a: "Every location has seating, power outlets and free Wi-Fi. Express washes finish before you'd finish a coffee. For anything over an hour we'll text you when the vehicle is ready.",
      },
    ],
  },
  {
    category: "Your vehicle",
    blurb: "Wraps, paint, low clearance and everything that gets asked at the lane.",
    items: [
      {
        q: "Is the tunnel safe for wrapped or matte paint?",
        a: "Only in a touch-free lane, and every site has one. Soft-touch brushes will dull a matte finish over time, so tell the greeter and they'll route you correctly. It costs nothing extra.",
      },
      {
        q: "Will you wash a car with a roof rack or low clearance?",
        a: "We measure clearance at the entrance to every lane. Roof racks that clear the wash height are fine; oversize racks and lowered vehicles go through touch-free or get a hand wash. Attendants will tell you before you commit.",
      },
      {
        q: "Do you clean the engine bay?",
        a: "Yes, as a booked add-on. We degrease, rinse at low pressure and dress the plastics. Modern engines tolerate it well; older vehicles with exposed electrics are assessed first.",
      },
      {
        q: "How dirty is too dirty for the tunnel?",
        a: "Heavy mud, sand and farm dust need a pre-rinse first — otherwise you're grinding grit across the paint. Attendants will send you through the pre-wash bay at no charge if it's needed.",
      },
    ],
  },
  {
    category: "Pricing & payment",
    blurb: "What things cost and what's included.",
    items: [
      {
        q: "Why is there a surcharge for larger vehicles?",
        a: "Simple maths: an SUV or ute takes more shampoo, more time and more dry. The surcharge is quoted before any work starts, never added at the till.",
      },
      {
        q: "Do prices include the interior?",
        a: "Only Showroom includes a full interior. Shield and Shine cover a vacuum and wipe-down; Splash is exterior only. Interior deep cleans are a separate, booked service.",
      },
      {
        q: "How do memberships work?",
        a: "One monthly payment, unlimited washes at your tier, at any location. Cancel any time from your account — there's no minimum term and no cancellation fee.",
      },
      {
        q: "What is the 30-day shine guarantee?",
        a: "If the finish isn't right, come back within thirty days and we re-wash it free. It covers the wash quality, not new damage — bird droppings that sat for a week will still etch.",
      },
    ],
  },
  {
    category: "Coating & correction",
    blurb: "The services where expectations need managing up front.",
    items: [
      {
        q: "Is ceramic coating worth it?",
        a: "If you plan to keep the car more than two years, generally yes — washing gets dramatically faster and the paint resists etching. If you're selling next spring, a sealant does most of the job for a fraction of the price, and we'll say so.",
      },
      {
        q: "Does coating stop scratches and chips?",
        a: "No, and be sceptical of anyone who claims otherwise. It's a chemical and UV barrier. It won't stop a rock chip, a key or a shopping trolley.",
      },
      {
        q: "How much paint correction does my car need?",
        a: "That depends on the depth gauge, not on a menu. We take readings across every panel and show you the defect map before quoting. If there isn't enough clear coat to correct safely, we recommend protection instead.",
      },
      {
        q: "Can you remove every scratch?",
        a: "No. Light swirling and oxidation come out. Scratches that catch a fingernail are into the paint or primer and need a bodyshop. We tell you which is which before you pay.",
      },
    ],
  },
  {
    category: "Fleet & commercial",
    blurb: "For businesses running vehicles.",
    items: [
      {
        q: "How many vehicles before fleet pricing applies?",
        a: "Five. Below that you can still reserve standing slots, just at the standard per-vehicle rate.",
      },
      {
        q: "Can you handle sign-written vans?",
        a: "Yes — signage and wraps go through touch-free with reduced pressure so vinyl edges and lettering aren't lifted.",
      },
      {
        q: "Do you invoice, or do drivers pay?",
        a: "Invoiced. Drivers quote a job number, the wash is logged against it, and everything lands on one monthly invoice with a per-vehicle breakdown.",
      },
    ],
  },
];
