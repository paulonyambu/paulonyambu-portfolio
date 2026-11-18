import { site } from "@/lib/site";
import { Clock } from "./Clock";

export function Contact({ as: Heading = "h2" }: { as?: "h1" | "h2" }) {
  return (
    <section id="contact" className="sec contact" aria-labelledby="contact-title">
      <div className="wrap">
        <p className="sec-path">~/contact</p>
        <Heading id="contact-title" data-reveal>
          Tell me what you are building.
        </Heading>
        <p data-reveal style={{ marginTop: 22, maxWidth: "46ch", fontSize: "1.1rem" }}>
          A sentence on the problem, who it is for and when it needs to be live is enough to start.
          I reply from Nairobi, UTC+3.
        </p>
        <div className="contact-grid">
          {site.emails.map((e) => (
            <a key={e.address} href={`mailto:${e.address}`} className="c-row" data-reveal>
              <span className="c-who">{e.label}</span>
              <span className="c-addr">{e.address}</span>
              <span className="c-note">{e.note}</span>
            </a>
          ))}
          <a href={site.whatsapp} target="_blank" rel="noopener noreferrer" className="c-row" data-reveal>
            <span className="c-who">Call or WhatsApp</span>
            <span className="c-addr">{site.phone}</span>
            <span className="c-note">Quickest for anything urgent.</span>
          </a>
        </div>
        <div className="c-socials" data-reveal>
          {site.socials.map((s) => (
            <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer me">
              {s.label}
            </a>
          ))}
        </div>
        <div className="foot">
          <span>Designed and built by Paul Onyambu. Set in Inter Tight and JetBrains Mono.</span>
          <Clock />
        </div>
      </div>
    </section>
  );
}
