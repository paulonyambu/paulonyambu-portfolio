import type { CSSProperties } from "react";
import Link from "next/link";
import { Contact } from "@/components/Contact";
import { HeroTerminal } from "@/components/HeroTerminal";
import { Journey } from "@/components/Journey";
import { Motion } from "@/components/Motion";
import { Systems } from "@/components/Systems";
import { Words } from "@/components/Words";

const shippedFor = [
  "MyGanji",
  "MetaCap AI",
  "KeNIC",
  ".KE Digital Starter Pack",
  "AIFML",
  "Handas Juice",
  "Dr. Noor & Associates",
  "Linka",
  "Vijana na F.O.M",
];

const services = [
  {
    path: "~/services/payments",
    name: "Payments",
    accent: "amber",
    detail:
      "M-PESA collections, payouts and business payments wired into your product through the Daraja API, with a ledger and reconciliation you can trust at month end.",
  },
  {
    path: "~/services/agents",
    name: "AI agents",
    accent: "violet",
    detail:
      "Voice and chat agents that answer from your own documents, qualify leads, publish content and hand over to your team at the right moment.",
  },
  {
    path: "~/services/platforms",
    name: "Platforms",
    accent: "teal",
    detail:
      "Multi-tenant platforms, dashboards and automated provisioning. The kind of system an organisation runs on every day.",
  },
  {
    path: "~/services/web",
    name: "Websites and stores",
    accent: "rose",
    detail:
      "Fast, search-friendly sites with booking, ordering and checkout built in, for businesses that need visitors to act, not only read.",
  },
];

const stack = [
  { group: "languages and frameworks", items: ["TypeScript", "React", "Next.js", "Vite", "Astro"] },
  { group: "backend and data", items: ["Supabase", "Postgres", "pgvector", "Edge Functions"] },
  { group: "payments and telephony", items: ["M-PESA Daraja", "Airtel Money", "SIP"] },
  { group: "infrastructure and ai", items: ["Vercel", "GitHub Actions", "LLM APIs", "Voice AI"] },
];

export default function Home() {
  return (
    <>
      <section className="wrap hero" aria-labelledby="hero-title">
        <div>
          <p className="hero-path load" style={{ "--d": "0.2s" } as CSSProperties}>
            <b>~/paul-onyambu</b> software engineer, Nairobi
          </p>
          <h1 id="hero-title">
            <Words text="Paul Onyambu ships payment rails and AI agents to production." />
          </h1>
          <p className="hero-sub load" style={{ "--d": "0.65s" } as CSSProperties}>
            Founder and CEO of MyGanji. CTO of MetaCap AI. Seven years of building, from small client
            sites in 2019 to systems that businesses across Kenya run on.
          </p>
          <div className="hero-cta load" style={{ "--d": "0.8s" } as CSSProperties}>
            <Link href="/#systems" className="btn primary">
              See the systems
            </Link>
            <Link href="/#contact" className="btn">
              Start a project
            </Link>
          </div>
        </div>
        <HeroTerminal />
      </section>

      <section className="strip" aria-label="Organisations I have shipped for">
        <div className="strip-track">
          {[0, 1].map((copy) => (
            <span key={copy} aria-hidden={copy === 1}>
              <span className="strip-label">shipped for</span>
              {shippedFor.map((name) => (
                <span key={name}>{name}</span>
              ))}
            </span>
          ))}
        </div>
      </section>

      <section id="systems" className="sec" aria-labelledby="systems-title">
        <div className="wrap">
          <Systems />
        </div>
      </section>

      <section id="journey" className="sec" aria-labelledby="journey-title">
        <div className="wrap">
          <div className="sec-head">
            <div>
              <p className="sec-path">~/journey</p>
              <h2 id="journey-title" className="sec-title" data-reveal="title">
                <Words text="No bootcamp. Seven years of commits to production." />
              </h2>
              <p className="sec-lede" data-reveal>
                Read it like a git log, newest first. Pick a commit to see what shipped, highlight a
                branch, or replay the whole history from the first line of code.
              </p>
            </div>
          </div>
          <Journey />
        </div>
      </section>

      <section id="services" className="sec" aria-labelledby="services-title">
        <div className="wrap">
          <div className="sec-head">
            <div>
              <p className="sec-path">~/services</p>
              <h2 id="services-title" className="sec-title" data-reveal="title">
                <Words text="What you can bring me in for." />
              </h2>
            </div>
          </div>
          <div className="svc">
            {services.map((s, i) => (
              <div
                key={s.name}
                className={`svc-item a-${s.accent}`}
                data-reveal
                style={{ "--i": i } as CSSProperties}
              >
                <p className="svc-path">{s.path}</p>
                <h3>{s.name}</h3>
                <p>{s.detail}</p>
              </div>
            ))}
          </div>
          <div className="stack-row" aria-label="Tools I work with">
            {stack.map((s, i) => (
              <div key={s.group} data-reveal style={{ "--i": i } as CSSProperties}>
                <h3>{s.group}</h3>
                <div className="tags">
                  {s.items.map((item) => (
                    <span key={item} className="tag">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Contact />
      <Motion />
    </>
  );
}
