import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Contact } from "@/components/Contact";
import { Motion } from "@/components/Motion";
import { RequestPath } from "@/components/RequestPath";
import { Words } from "@/components/Words";
import { getSystem, nextSystem, systems } from "@/lib/systems";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return systems.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const s = getSystem(slug);
  if (!s) return {};
  return {
    title: s.seoTitle,
    description: s.outcome,
    alternates: { canonical: `/work/${s.slug}` },
    openGraph: {
      type: "article",
      url: `/work/${s.slug}`,
      title: `${s.seoTitle} | ${site.name}`,
      description: s.outcome,
    },
  };
}

export default async function WorkPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const s = getSystem(slug);
  if (!s) notFound();
  const next = nextSystem(s.slug);

  const facts = [
    { term: "kind", detail: s.kind },
    { term: "organisation", detail: s.org },
    { term: "my part", detail: s.role },
    { term: "proof", detail: s.proof },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CreativeWork",
        name: s.name,
        description: s.outcome,
        url: `${site.url}/work/${s.slug}`,
        sameAs: s.url,
        keywords: s.stack.join(", "),
        creator: { "@id": `${site.url}/#person` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: site.url },
          { "@type": "ListItem", position: 2, name: "Systems", item: `${site.url}/#systems` },
          { "@type": "ListItem", position: 3, name: s.name, item: `${site.url}/work/${s.slug}` },
        ],
      },
    ],
  };

  return (
    <>
      <article className={`a-${s.accent}`}>
        <header className="wrap case">
          <p className="hero-path load" style={{ "--d": "0.2s" } as CSSProperties}>
            <Link href="/#systems" className="tlink">
              ~/systems
            </Link>
            <span>/{s.slug}</span>
          </p>
          <h1>
            <Words text={s.name} />
          </h1>
          <p className="hero-sub load" style={{ "--d": "0.5s" } as CSSProperties}>
            {s.outcome}
          </p>
          <div className="hero-cta load" style={{ "--d": "0.65s" } as CSSProperties}>
            <a href={s.url} target="_blank" rel="noopener noreferrer" className="btn primary">
              Visit {s.host}
            </a>
            <Link href="/#contact" className="btn">
              Build something like this
            </Link>
          </div>
          <dl className="case-facts load" style={{ "--d": "0.8s" } as CSSProperties}>
            {facts.map((f) => (
              <div key={f.term}>
                <dt>{f.term}</dt>
                <dd>{f.detail}</dd>
              </div>
            ))}
          </dl>
        </header>

        <section className="sec" aria-label="How it is built" style={{ marginTop: 72 }}>
          <div className="wrap">
            <div className="panel" data-reveal>
              <div className="panel-sec">
                <p className="label">Request path</p>
                <RequestPath flow={s.flow} core={s.core} />
              </div>
              <div className="panel-sec panel-cols">
                <div>
                  <p className="label accent">What it does for the business</p>
                  <p className="panel-body">{s.outcome}</p>
                  <p className="label accent" style={{ marginTop: 28 }}>
                    How it works
                  </p>
                  <p className="panel-body">{s.internals}</p>
                </div>
                <div>
                  <p className="label">Stack</p>
                  <div className="tags">
                    {s.stack.map((t) => (
                      <span key={t} className="tag">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="wrap">
          <Link href={`/work/${next.slug}`} className="case-next">
            <small>next system</small>
            <strong>{next.name}</strong>
          </Link>
        </div>

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </article>
      <Contact />
      <Motion />
    </>
  );
}
