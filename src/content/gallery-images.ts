/**
 * Local photography under `/public/gallery/hero`.
 * One graded set — no remote stock. Hero arc, cards, and before/after
 * comparisons all pull from here.
 */

export type GalleryCard = {
  src: string;
  label: string;
  detail: string;
};

/** Scroll-morph hero flip cards — portrait crops from the same shoot. */
export const heroGalleryCards: GalleryCard[] = [
  {
    src: "/gallery/hero/car1.jpeg",
    label: "Express lane",
    detail: "Soft-touch tunnel · 12 min",
  },
  {
    src: "/gallery/hero/car2.jpeg",
    label: "Pre-soak",
    detail: "Foam bath before brushes touch paint",
  },
  {
    src: "/gallery/hero/car3.jpeg",
    label: "Spot-free rinse",
    detail: "Reverse-osmosis water · no streaks",
  },
  {
    src: "/gallery/hero/car4.jpeg",
    label: "Hand dry",
    detail: "Towel pass on sills and mirrors",
  },
  {
    src: "/gallery/hero/car5.jpeg",
    label: "Wheel detail",
    detail: "Iron fallout lifted, tyres dressed",
  },
  {
    src: "/gallery/hero/car6.jpeg",
    label: "Full detail bay",
    detail: "Clay, polish, seal — by hand",
  },
  {
    src: "/gallery/hero/car7.png",
    label: "Correction studio",
    detail: "Paint-depth readings every panel",
  },
  {
    src: "/gallery/hero/car8.png",
    label: "Ceramic cure",
    detail: "Infrared booth · registered warranty",
  },
  {
    src: "/gallery/hero/car9.png",
    label: "Interior studio",
    detail: "Extraction, vents, odour treatment",
  },
  {
    src: "/gallery/hero/car10.png",
    label: "Fleet lane",
    detail: "Vans and utes · touch-free option",
  },
  {
    src: "/gallery/hero/car11.png",
    label: "Drive-out finish",
    detail: "Dry, dressed, ready to roll",
  },
];

export type ComparisonPair = {
  id: string;
  title: string;
  caption: string;
  beforeSrc: string;
  afterSrc: string;
};

/** Before/after pairs — before1 ↔ after1, before2 ↔ after2, etc. */
export const comparisonPairs: ComparisonPair[] = [
  {
    id: "exterior-wash",
    title: "Express wash · white sedan",
    caption:
      "Road film and brake dust lifted in one tunnel pass. Tyres dressed on the way out — twelve minutes, door to door.",
    beforeSrc: "/gallery/hero/before1.jpeg",
    afterSrc: "/gallery/hero/after1.jpeg",
  },
  {
    id: "full-detail",
    title: "Full detail · dark SUV",
    caption:
      "Clay bar, single-stage polish and ceramic seal. Swirls reduced; two deeper scratches documented and left because they were through the clear coat.",
    beforeSrc: "/gallery/hero/before2.png",
    afterSrc: "/gallery/hero/after2.png",
  },
  {
    id: "interior-deep",
    title: "Interior deep clean · family wagon",
    caption:
      "Hot water extraction on cloth seats, headlining cleaned with a low-moisture method, then an ozone cycle for the smell underneath.",
    beforeSrc: "/gallery/hero/before3.png",
    afterSrc: "/gallery/hero/after3.png",
  },
];

export type SitePhoto = {
  src: string;
  alt: string;
  label: string;
};

/** Grid / strip photography for gallery and marketing bands. */
export const sitePhotos: SitePhoto[] = [
  { src: "/gallery/hero/car1.jpeg", alt: "Car entering the express wash tunnel", label: "Tunnel lane" },
  { src: "/gallery/hero/car2.jpeg", alt: "Foam pre-soak covering a vehicle", label: "Pre-soak" },
  { src: "/gallery/hero/car3.jpeg", alt: "Spot-free rinse on a clean car", label: "Rinse bay" },
  { src: "/gallery/hero/car4.jpeg", alt: "Attendant hand-drying a vehicle", label: "Hand dry" },
  { src: "/gallery/hero/car5.jpeg", alt: "Wheel and tyre detail close-up", label: "Wheel detail" },
  { src: "/gallery/hero/car6.jpeg", alt: "Full detail bay with a sedan", label: "Detail studio" },
  { src: "/gallery/hero/car7.png", alt: "Paint correction under workshop lights", label: "Correction bay" },
  { src: "/gallery/hero/car8.png", alt: "Ceramic coating cure under infrared", label: "Ceramic booth" },
  { src: "/gallery/hero/car9.png", alt: "Interior vacuum and wipe-down", label: "Interior studio" },
  { src: "/gallery/hero/car10.png", alt: "Commercial van in the wash lane", label: "Fleet lane" },
  { src: "/gallery/hero/car11.png", alt: "Finished vehicle leaving the site", label: "Drive-out" },
];

/** Hero strip — subset for the home photo band (action shots). */
export const homePhotoStrip = sitePhotos.slice(0, 8);
