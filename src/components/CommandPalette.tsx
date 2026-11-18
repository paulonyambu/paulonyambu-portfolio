"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { site } from "@/lib/site";
import { systems } from "@/lib/systems";

type Command = { label: string; hint: string; href: string; external?: boolean };

const commands: Command[] = [
  { label: "Systems in production", hint: "section", href: "/#systems" },
  { label: "Journey since 2019", hint: "section", href: "/#journey" },
  { label: "Services", hint: "section", href: "/#services" },
  { label: "Contact", hint: "section", href: "/#contact" },
  ...systems.map((s) => ({ label: s.name, hint: s.kind.toLowerCase(), href: `/work/${s.slug}` })),
  ...site.socials.map((s) => ({ label: s.label, hint: "link", href: s.href, external: true })),
  { label: "WhatsApp", hint: "link", href: site.whatsapp, external: true },
  { label: `Email ${site.emails[0].address}`, hint: "email", href: `mailto:${site.emails[0].address}`, external: true },
];

export function CommandPalette({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const input = useRef<HTMLInputElement>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((c) => `${c.label} ${c.hint}`.toLowerCase().includes(q));
  }, [query]);

  useEffect(() => {
    input.current?.focus();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  const go = (c: Command) => {
    onClose();
    if (c.external) window.open(c.href, c.href.startsWith("mailto:") ? "_self" : "_blank", "noopener");
    else router.push(c.href);
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") onClose();
    else if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && results[active]) {
      e.preventDefault();
      go(results[active]);
    }
  };

  return (
    <div className="palette-back" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="palette" role="dialog" aria-modal="true" aria-label="Jump to" onKeyDown={onKey}>
        <div className="palette-in">
          <span className="mono" aria-hidden="true" style={{ color: "var(--amber-ink)" }}>
            &gt;
          </span>
          <input
            ref={input}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActive(0);
            }}
            placeholder="Type a section, a system or a link"
            aria-label="Search sections, systems and links"
            role="combobox"
            aria-expanded="true"
            aria-controls="palette-list"
          />
          <button type="button" className="btn small" onClick={onClose}>
            Esc
          </button>
        </div>
        <ul id="palette-list" role="listbox">
          {results.map((c, i) => (
            <li key={c.label} data-on={i === active} role="option" aria-selected={i === active}>
              <a
                href={c.href}
                onMouseEnter={() => setActive(i)}
                onClick={(e) => {
                  e.preventDefault();
                  go(c);
                }}
              >
                <span>{c.label}</span>
                <small>{c.hint}</small>
              </a>
            </li>
          ))}
        </ul>
        {results.length === 0 ? (
          <p className="palette-empty mono">Nothing matches. Try &quot;payments&quot; or &quot;github&quot;.</p>
        ) : null}
      </div>
    </div>
  );
}
