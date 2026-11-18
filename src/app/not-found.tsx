import Link from "next/link";

export default function NotFound() {
  return (
    <section className="wrap hero" style={{ minHeight: "70svh" }}>
      <div>
        <p className="hero-path">
          <b>~/404</b> fatal: path not found
        </p>
        <h1>That page is not in the history.</h1>
        <p className="hero-sub">
          The address may have changed, or it never existed. The systems and the contact details are
          one step away.
        </p>
        <div className="hero-cta">
          <Link href="/" className="btn primary">
            Go to the home page
          </Link>
          <Link href="/#systems" className="btn">
            See the systems
          </Link>
        </div>
      </div>
    </section>
  );
}
