export type Accent = "amber" | "violet" | "teal" | "rose";
export type SystemGroup = "platforms" | "clients";

export type System = {
  slug: string;
  name: string;
  org: string;
  role: string;
  group: SystemGroup;
  kind: string;
  accent: Accent;
  url: string;
  host: string;
  flow: string[];
  /** Index of the step in `flow` that this system owns. */
  core: number;
  stack: string[];
  outcome: string;
  internals: string;
  proof: string;
  seoTitle: string;
};

export const groups: { id: SystemGroup; label: string }[] = [
  { id: "platforms", label: "Platforms" },
  { id: "clients", label: "Client builds" },
];

export const systems: System[] = [
  {
    slug: "myganji-payhub",
    name: "PayHub",
    org: "MyGanji",
    role: "Founder, built it",
    group: "platforms",
    kind: "Payments infrastructure",
    accent: "amber",
    url: "https://myganji.com",
    host: "myganji.com",
    flow: ["Customer wallet", "Mobile money provider", "PayHub gateway", "Ledger and reconciliation", "Merchant webhook"],
    core: 2,
    stack: ["Node.js", "PostgreSQL", "Queues", "Webhooks", "M-PESA Daraja"],
    outcome:
      "Businesses collect from customers, pay out to staff and suppliers, and pay other businesses through one integration. Every shilling can be traced back to the callback that moved it.",
    internals:
      "Provider callbacks are handled idempotently, keyed on the receipt number, so a duplicate never double credits. Money movements post to a ledger, and a scheduled job reconciles provider statements against it. Merchant webhooks are signed and retried with backoff.",
    proof: "Live at myganji.com",
    seoTitle: "MyGanji PayHub: payments infrastructure for Kenya",
  },
  {
    slug: "metacap-ai-sales-crew",
    name: "Sales Crew",
    org: "MetaCap AI",
    role: "CTO",
    group: "platforms",
    kind: "AI voice agents",
    accent: "violet",
    url: "https://salescrew.metacap.ai",
    host: "salescrew.metacap.ai",
    flow: ["Caller", "SIP trunk", "Voice agent", "Caller memory and knowledge base", "Tools and CRM"],
    core: 2,
    stack: ["SIP", "LLM tool calls", "Retrieval", "Postgres", "pgvector"],
    outcome:
      "Answers sales calls on a company's existing phone lines, recognises returning callers, and hands the team a written summary instead of a missed call.",
    internals:
      "Calls arrive over SIP into the voice pipeline. Before the first word, the agent loads what is known about the calling number. Answers come from retrieval over the client's own documents, and actions run through typed tool calls rather than free text.",
    proof: "Live at salescrew.metacap.ai",
    seoTitle: "MetaCap AI Sales Crew: AI voice agents for sales",
  },
  {
    slug: "metacap-ai-marketing-crew",
    name: "Marketing Crew",
    org: "MetaCap AI",
    role: "CTO",
    group: "platforms",
    kind: "Multi-channel agents",
    accent: "rose",
    url: "https://marketingcrew.metacap.ai",
    host: "marketingcrew.metacap.ai",
    flow: ["Campaign brief", "Drafting agents", "Per-channel formatting", "Scheduler", "Published posts"],
    core: 1,
    stack: ["Agents", "Channel APIs", "Scheduling", "Supabase"],
    outcome:
      "A team writes one brief. Agents turn it into posts shaped for each channel and publish them on schedule.",
    internals:
      "Each channel has its own adapter for length, media and rate limits, so the drafting agents never need to know platform rules. The scheduler owns retries and posting windows.",
    proof: "Live at marketingcrew.metacap.ai",
    seoTitle: "MetaCap AI Marketing Crew: multi-channel content agents",
  },
  {
    slug: "ke-digital-starter-pack",
    name: "Digital Starter Pack",
    org: ".KE and MetaCap AI",
    role: "Engineering",
    group: "platforms",
    kind: "Site generation platform",
    accent: "teal",
    url: "https://digitalstarterpack.ke",
    host: "digitalstarterpack.ke",
    flow: ["Benchmark template", "Organisation records", "Generator", "Build and deploy", "Live .ke site"],
    core: 2,
    stack: ["Templating", "CI deploys", "DNS", "Business email"],
    outcome:
      "One benchmark template, many organisations. Schools, health centres, NGOs and businesses each get a .ke domain, a working website, hosting and business email without anyone building it by hand.",
    internals:
      "Organisation data feeds a generator that renders from a single benchmark template. Builds and deploys run as a pipeline, so a template fix reaches every site in one release.",
    proof: "Live at digitalstarterpack.ke",
    seoTitle: ".KE Digital Starter Pack: national onboarding platform",
  },
  {
    slug: "hack-a-milli",
    name: "Hack-a-Milli",
    org: "KeNIC",
    role: "Led development",
    group: "platforms",
    kind: "Hackathon platform",
    accent: "amber",
    url: "https://hack-a-milli.kenic.or.ke",
    host: "hack-a-milli.kenic.or.ke",
    flow: ["Registration", "Team formation", "Submissions", "Judging", "Results"],
    core: 2,
    stack: ["Web platform", "Auth", "Admin tools"],
    outcome:
      "The platform behind KeNIC's national student hackathon: 200+ participants from universities across Kenya competing for a KES 1.5M prize pool.",
    internals:
      "Registration, teams, submissions and judging live in one system, with admin tools so organisers could run the event without asking an engineer.",
    proof: "200+ participants, KES 1.5M prize pool",
    seoTitle: "Hack-a-Milli: KeNIC's national student hackathon platform",
  },
  {
    slug: "handas-juice",
    name: "Handas Juice",
    org: "Handas",
    role: "Design and build",
    group: "clients",
    kind: "Online store",
    accent: "rose",
    url: "https://handasjuice.com",
    host: "handasjuice.com",
    flow: ["Delivery address", "Product range", "Cart", "M-Pesa or card checkout", "Staff order desk"],
    core: 3,
    stack: ["React", "Vite", "Supabase", "Vercel"],
    outcome:
      "Nairobi customers order Jaba juice for delivery in a couple of minutes and pay with M-Pesa or card. The team runs every order from its own staff area.",
    internals:
      "The delivery address is captured on the first screen, so checkout stays short. Orders, accounts and stock sit in Supabase, and staff work from a protected area of the same app.",
    proof: "Live at handasjuice.com",
    seoTitle: "Handas Juice: online store with M-Pesa checkout",
  },
  {
    slug: "dr-noor-dental",
    name: "Dr. Noor & Associates",
    org: "Dental practice, Upper Hill",
    role: "Design and build",
    group: "clients",
    kind: "Clinic website",
    accent: "teal",
    url: "https://drnoordental.com",
    host: "drnoordental.com",
    flow: ["Search", "Treatment pages", "Trust and reviews", "Online booking", "Front desk"],
    core: 3,
    stack: ["Next.js", "Vercel", "Structured data"],
    outcome:
      "A family practice with over 40 years in Upper Hill now earns a new patient's trust in the first screen, and lets them book online or call.",
    internals:
      "Pages are prerendered for speed and carry structured data for every treatment, so the practice shows up for dental searches in Nairobi.",
    proof: "Live at drnoordental.com",
    seoTitle: "Dr. Noor & Associates: dental clinic website in Nairobi",
  },
  {
    slug: "linka",
    name: "Linka",
    org: "Events and deals, Kenya",
    role: "Design and build",
    group: "clients",
    kind: "Events and ticketing",
    accent: "violet",
    url: "https://linka.co.ke",
    host: "linka.co.ke",
    flow: ["Discover events", "Start a Chama", "Split the cost", "Mobile money or card", "Ticket per member"],
    core: 2,
    stack: ["Next.js", "Supabase", "M-PESA", "Airtel Money"],
    outcome:
      "A group can split the cost of an event or a deal through a Chama, and every member still walks in with a ticket in their own name.",
    internals:
      "A Chama holds the shared target and each member's contribution. Once the target is met, tickets are issued to every member individually, paid through M-Pesa, Airtel Money or card.",
    proof: "Live at linka.co.ke",
    seoTitle: "Linka: events, tickets and Chama payments in Kenya",
  },
  {
    slug: "vijana-na-fom",
    name: "Vijana na F.O.M",
    org: "Youth movement, 47 counties",
    role: "Design and build",
    group: "clients",
    kind: "Movement website",
    accent: "amber",
    url: "https://vijananafom.ke",
    host: "vijananafom.ke",
    flow: ["Story and priorities", "Events", "Member sign-up", "County and ward teams", "Organisers"],
    core: 2,
    stack: ["Supabase", "Vercel"],
    outcome:
      "One place to recruit young members into county and ward teams across all 47 counties, and to keep them informed with events, a gallery and a countdown to 2027.",
    internals:
      "Sign-ups are stored by county and ward so organisers can reach their own teams directly from the records.",
    proof: "Live at vijananafom.ke",
    seoTitle: "Vijana na F.O.M: youth movement website",
  },
];

export function getSystem(slug: string) {
  return systems.find((s) => s.slug === slug);
}

export function nextSystem(slug: string) {
  const i = systems.findIndex((s) => s.slug === slug);
  return systems[(i + 1) % systems.length];
}
