// Single source of truth for site identity. Change `url` (or set
// NEXT_PUBLIC_SITE_URL) once the domain is purchased and every canonical
// link, sitemap entry and social preview follows.
export const site = {
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://paulonyambu.com").replace(/\/$/, ""),
  name: "Paul Onyambu",
  title: "Paul Onyambu | Software engineer in Nairobi building payments and AI systems",
  description:
    "Paul Onyambu is a software engineer in Nairobi, Kenya. He builds payments infrastructure, AI voice and messaging agents and web platforms, and leads MyGanji and MetaCap AI.",
  location: "Nairobi, Kenya",
  phone: "+254 724 213 381",
  whatsapp: "https://wa.me/254724213381",
  emails: [
    {
      label: "New projects and roles",
      address: "tech.pauloh@gmail.com",
      note: "Start here for a build or a position.",
    },
    {
      label: "MyGanji and payments",
      address: "paul@myganji.com",
      note: "Collections, payouts and PayHub.",
    },
    {
      label: "MetaCap AI",
      address: "pauloh@metacap.ai",
      note: "Agents for sales, marketing and operations.",
    },
  ],
  socials: [
    { label: "GitHub", href: "https://github.com/paulonyambu" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/paul-onyambu/" },
    { label: "Instagram", href: "https://www.instagram.com/paul.onyambu/" },
  ],
} as const;

export const nav = [
  { label: "Systems", href: "/#systems" },
  { label: "Journey", href: "/#journey" },
  { label: "Services", href: "/#services" },
  { label: "Contact", href: "/#contact" },
] as const;
