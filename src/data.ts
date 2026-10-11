export type Product = {
  id: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  price: string;
  dimensions: string;
  features: string[];
  specs: [string, string][];
};
export const products: Product[] = [
  {
    id: "core",
    name: "Core",
    category: "Hub",
    tagline: "A quiet center. A connected home.",
    description:
      "A sculpted aluminum hub designed to bring your devices, spaces, and daily rituals together. Intelligence that belongs at home.",
    price: "12,999",
    dimensions: "180 × 180 × 42 mm",
    features: [
      "Local-first routines",
      "Matter + Thread targets",
      "AI-assisted orchestration",
    ],
    specs: [
      ["Connectivity target", "Matter, Thread, Wi-Fi, Ethernet"],
      ["Processing approach", "Local-first; optional cloud features"],
      ["Enclosure concept", "Bead-blasted aluminum"],
      ["Dimensions target", "180 × 180 × 42 mm"],
      ["Power target", "USB-C, external supply"],
      ["Availability", "Concept development"],
    ],
  },
  {
    id: "sense",
    name: "Sense",
    category: "Sensor",
    tagline: "Small presence. A deeper understanding.",
    description:
      "A compact sensor concept that notices the subtle changes in your space, so your home could respond with care.",
    price: "2,499",
    dimensions: "58 × 58 × 24 mm",
    features: [
      "Temperature + humidity",
      "Motion + presence targets",
      "Ambient light sensing",
    ],
    specs: [
      ["Sensing targets", "Temperature, humidity, light, occupancy"],
      ["Connectivity target", "Thread"],
      ["Enclosure concept", "Recycled polymer, aluminum detail"],
      ["Dimensions target", "58 × 58 × 24 mm"],
      ["Power target", "Low-power battery design"],
      ["Availability", "Concept development"],
    ],
  },
  {
    id: "light",
    name: "Light",
    category: "Lighting",
    tagline: "Set the light. Change the feeling.",
    description:
      "A lighting controller imagined for a more natural rhythm. From the first light of morning to the last quiet moment of the day.",
    price: "3,999",
    dimensions: "86 × 86 × 32 mm",
    features: [
      "Adaptive scenes",
      "Circadian mode concept",
      "Synchronized ambience",
    ],
    specs: [
      ["Control target", "Adaptive dimming and scene control"],
      ["Connectivity target", "Matter over Thread"],
      ["Interface concept", "Touch surface with ambient feedback"],
      ["Dimensions target", "86 × 86 × 32 mm"],
      ["Installation", "Electrical compatibility under evaluation"],
      ["Availability", "Concept development"],
    ],
  },
  {
    id: "control",
    name: "Control",
    category: "Controller",
    tagline: "A little less screen. A little more touch.",
    description:
      "A precision rotary controller designed to make everyday interactions tactile, intuitive, and wonderfully simple.",
    price: "4,999",
    dimensions: "76 × 76 × 38 mm",
    features: [
      "Precision rotary dial",
      "Haptic feedback target",
      "Contextual shortcuts",
    ],
    specs: [
      ["Input concept", "Rotary dial and press"],
      ["Feedback target", "Haptics and ambient ring"],
      ["Connectivity target", "Thread"],
      ["Enclosure concept", "Knurled aluminum dial"],
      ["Dimensions target", "76 × 76 × 38 mm"],
      ["Availability", "Concept development"],
    ],
  },
  {
    id: "air",
    name: "Air",
    category: "Environment",
    tagline: "Make the invisible understandable.",
    description:
      "A considered desktop air-quality monitor concept. Designed to turn environmental readings into clearer, more useful insights.",
    price: "6,999",
    dimensions: "112 × 112 × 138 mm",
    features: [
      "Air-quality sensing targets",
      "Environmental history",
      "Ventilation routine concepts",
    ],
    specs: [
      ["Sensing targets", "CO₂, particulate matter, temperature, humidity"],
      ["Display concept", "Quiet, glanceable status interface"],
      ["Connectivity target", "Wi-Fi and Matter under evaluation"],
      ["Enclosure concept", "Aluminum with vented polymer"],
      ["Dimensions target", "112 × 112 × 138 mm"],
      ["Availability", "Concept development"],
    ],
  },
];
export const articles = [
  {
    slug: "a-home-that-listens",
    title: "A home that listens, without listening in.",
    category: "Privacy",
    excerpt:
      "Why we are exploring an architecture that starts with your home, rather than the cloud.",
    body: [
      "A connected home should make life simpler without making private life more visible. That belief shapes our local-first ambition: routine decisions should happen close to the devices and people they serve.",
      "Local processing could reduce dependence on remote services, but it does not automatically guarantee privacy. Device security, update delivery, permissions, and the way data is retained all matter. These are design questions we intend to test, not solved capabilities we claim today.",
      "Our concept separates ordinary routines from optional connected services. The intended direction is clear choices, minimal collection, and useful behavior even when an internet connection is interrupted. Exact capabilities will depend on future hardware and software validation.",
    ],
  },
  {
    slug: "designing-for-the-everyday",
    title: "The best technology makes room for life.",
    category: "Design",
    excerpt:
      "On quiet objects, tactile interfaces, and the value of knowing when to disappear.",
    body: [
      "Most technology is designed to ask for attention. A home asks for something else: objects that belong comfortably among the things we already care about.",
      "The Profectus360 concepts explore softly sculpted aluminum, restrained light, and a shared family of proportions. Material choices are visual and engineering proposals; manufacturing processes, recycled content, and durability remain to be evaluated.",
      "A tactile dial can make a familiar task feel immediate. A small status light can communicate without another notification. The goal is not to remove every screen, but to choose an interface that fits the moment.",
    ],
  },
  {
    slug: "one-home-many-languages",
    title: "One home. Many devices. A shared language.",
    category: "Interoperability",
    excerpt:
      "What Matter and Thread could mean for a more considered connected home.",
    body: [
      "A useful smart home should not require every device to come from the same brand. Interoperability is therefore a central goal of the Profectus360 ecosystem.",
      "Matter defines a common application language for compatible smart-home devices. Thread is a low-power mesh networking technology. They serve different roles and do not guarantee that every device or every feature will work together.",
      "Our products target these technologies where suitable. Compatibility and certification require implementation and testing, so Profectus360 makes no certified interoperability claim at the concept stage. We will publish supported device categories only after validation.",
    ],
  },
  {
    slug: "designed-with-india-in-mind",
    title: "An Indian perspective. A universal ambition.",
    category: "Perspective",
    excerpt:
      "Designing for varied homes, daily rhythms, and the practical realities of connected living.",
    body: [
      "India is not one kind of home. Apartments, multigenerational households, changing connectivity, and varied electrical installations create a rich set of needs.",
      "We are exploring simple controls, local-first routines, and an ecosystem that could adapt to different spaces. Installation requirements, serviceability, and affordability are questions to investigate through future research.",
      "Profectus360 is an early-stage Indian product concept. There are no announced products, manufacturing operations, or customers. This journal documents a direction and the questions behind it.",
    ],
  },
];
export const routes = [
  "/",
  "/products",
  ...products.map((p) => "/products/" + p.id),
  "/intelligence",
  "/design",
  "/story",
  "/journal",
  ...articles.map((a) => "/journal/" + a.slug),
  "/early-access",
  "/contact",
  "/privacy",
  "/terms",
  "/cookies",
  "/404",
];
export function pageMeta(path: string) {
  const p = products.find((p) => path === "/products/" + p.id);
  const a = articles.find((a) => path === "/journal/" + a.slug);
  const titles: Record<string, string> = {
    "/": "Intelligence, beautifully integrated.",
    "/products": "The ecosystem",
    "/intelligence": "A home in harmony",
    "/design": "Considered in every detail",
    "/story": "An idea, taking shape",
    "/journal": "Notes from the studio",
    "/early-access": "Express interest",
    "/contact": "Start a conversation",
    "/privacy": "Privacy notice",
    "/terms": "Terms of use",
    "/cookies": "Cookies & local storage",
    "/404": "Page not found",
  };
  return {
    title: p
      ? "Profectus360 " + p.name + " — " + p.tagline
      : a
        ? a.title
        : (titles[path] ?? "Page not found"),
    description: p
      ? p.description
      : a
        ? a.excerpt
        : "Explore Profectus360, an early-stage Indian smart-home concept. Beautifully considered hardware and privacy-conscious, local-first automation. Products are in development.",
  };
}
