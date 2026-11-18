import type { Metadata, Viewport } from "next";
import { Inter_Tight, JetBrains_Mono } from "next/font/google";
import { Header } from "@/components/Header";
import { site } from "@/lib/site";
import "./globals.css";

const sans = Inter_Tight({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  keywords: [
    "Paul Onyambu",
    "software engineer Nairobi",
    "software engineer Kenya",
    "M-PESA integration developer",
    "Daraja API developer",
    "payments infrastructure Kenya",
    "AI agents developer",
    "voice AI",
    "Next.js developer Kenya",
    "MyGanji",
    "MetaCap AI",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: site.name,
    title: site.title,
    description: site.description,
    locale: "en_KE",
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f3f4f7" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0d12" },
  ],
};

// Runs before first paint: marks JS as available (so reveal states apply)
// and restores a saved light or dark choice without a flash.
const boot = `(function(){var d=document.documentElement;d.classList.add('js');try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark')d.dataset.theme=t}catch(e){}})()`;

const person = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${site.url}/#person`,
      name: site.name,
      url: site.url,
      image: `${site.url}/paul-onyambu.jpg`,
      jobTitle: "Software Engineer",
      description: site.description,
      email: `mailto:${site.emails[0].address}`,
      telephone: site.phone.replace(/\s/g, ""),
      address: { "@type": "PostalAddress", addressLocality: "Nairobi", addressCountry: "KE" },
      worksFor: [
        { "@type": "Organization", name: "MyGanji", url: "https://myganji.com" },
        { "@type": "Organization", name: "MetaCap AI", url: "https://metacap.ai" },
      ],
      knowsAbout: [
        "Payments infrastructure",
        "M-PESA Daraja API",
        "AI agents",
        "Voice AI",
        "Payments infrastructure in Kenya",
        "TypeScript",
        "React",
        "Next.js",
        "Supabase",
        "PostgreSQL",
      ],
      sameAs: site.socials.map((s) => s.href),
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: site.name,
      description: site.description,
      inLanguage: "en",
      publisher: { "@id": `${site.url}/#person` },
    },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: boot }} />
      </head>
      <body>
        <a href="#main" className="skip">
          Skip to content
        </a>
        <Header />
        <main id="main">
          {children}
        </main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }}
        />
      </body>
    </html>
  );
}
