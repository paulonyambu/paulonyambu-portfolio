"use client";

import Link from "next/link";
import { useEffect, useState, type CSSProperties } from "react";
import { nav, site } from "@/lib/site";
import { Clock } from "./Clock";
import { CommandPalette } from "./CommandPalette";

function toggleTheme() {
  const root = document.documentElement;
  const current =
    root.dataset.theme ??
    (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
  const next = current === "dark" ? "light" : "dark";
  root.dataset.theme = next;
  try {
    localStorage.setItem("theme", next);
  } catch {
    // Storage can be blocked. The choice still holds for this visit.
  }
}

export function Header() {
  const [menu, setMenu] = useState(false);
  const [palette, setPalette] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setMenu(false);
        setPalette((v) => !v);
      } else if (e.key === "Escape") {
        setMenu(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menu ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menu]);

  return (
    <>
      <header className="hdr">
        <div className="wrap">
          <Link href="/" className="brand" onClick={() => setMenu(false)} aria-label="Paul Onyambu, home">
            <span className="brand-mark" aria-hidden="true">
              PO
            </span>
            <span>{site.name}</span>
          </Link>
          <nav className="nav" aria-label="Main">
            {nav.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="hdr-tools">
            <span className="clock mono">
              <Clock />
            </span>
            <button type="button" className="btn small jump-btn" onClick={() => setPalette(true)}>
              <span>Jump to</span>
              <span className="kbd">Ctrl K</span>
            </button>
            <button
              type="button"
              className="icon-btn"
              onClick={toggleTheme}
              aria-label="Switch between light and dark"
            >
              <span className="theme-glyph" aria-hidden="true" />
            </button>
            <button
              type="button"
              className="btn small menu-btn"
              aria-expanded={menu}
              aria-controls="mmenu"
              onClick={() => setMenu((v) => !v)}
            >
              {menu ? "Close" : "Menu"}
            </button>
          </div>
        </div>
      </header>

      <div id="mmenu" className="mmenu" data-open={menu} inert={!menu}>
        <nav aria-label="Mobile">
          {nav.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              style={{ "--i": i } as CSSProperties}
              onClick={() => setMenu(false)}
            >
              {item.label}
              <span>~{item.href.replace("/#", "/")}</span>
            </Link>
          ))}
        </nav>
        <div className="mmenu-foot">
          <button
            type="button"
            className="tlink"
            style={{ cursor: "pointer" }}
            onClick={() => {
              setMenu(false);
              setPalette(true);
            }}
          >
            Search the site
          </button>
          {site.socials.map((s) => (
            <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer me">
              {s.label}
            </a>
          ))}
          <a href={site.whatsapp} target="_blank" rel="noopener noreferrer">
            WhatsApp
          </a>
        </div>
      </div>

      {palette ? <CommandPalette onClose={() => setPalette(false)} /> : null}
    </>
  );
}
