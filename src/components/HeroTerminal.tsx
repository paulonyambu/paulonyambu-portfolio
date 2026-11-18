"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Line = { kind: "cmd" | "out"; parts: { text: string; tone?: "key" | "val" | "ok" }[] };

const kv = (key: string, val: string): Line => ({
  kind: "out",
  parts: [
    { text: key.padEnd(11, " "), tone: "key" },
    { text: val, tone: "val" },
  ],
});
const out = (text: string, tone?: "ok"): Line => ({ kind: "out", parts: [{ text, tone }] });

const programs: Record<string, Line[]> = {
  whoami: [
    kv("name", "Paul Onyambu"),
    kv("based", "Nairobi, Kenya (UTC+3)"),
    kv("runs", "MyGanji, founder and CEO"),
    kv("leads", "MetaCap AI engineering, CTO"),
    kv("since", "2019, self-taught"),
  ],
  stack: [
    kv("languages", "TypeScript, SQL"),
    kv("frontend", "React, Next.js, Vite, Astro"),
    kv("backend", "Supabase, Postgres, pgvector, Edge Functions"),
    kv("payments", "M-PESA Daraja, Airtel Money, cards"),
    kv("voice", "SIP, LLM tool calls, retrieval"),
  ],
  "ls systems": [
    out("payhub/            payments infrastructure"),
    out("sales-crew/        ai voice agents"),
    out("marketing-crew/    multi-channel agents"),
    out("starter-pack/      .ke site generation"),
    out("hack-a-milli/      national hackathon"),
    out("+ 4 client builds", "ok"),
  ],
  status: [
    kv("building", "PayHub and MetaCap AI agents"),
    kv("open to", "client projects, senior roles"),
    kv("replies", "within a working day"),
    out("ok: accepting new briefs", "ok"),
  ],
  contact: [
    kv("email", "tech.pauloh@gmail.com"),
    kv("whatsapp", "+254 724 213 381"),
    kv("github", "github.com/paulonyambu"),
    out("hint: scroll to the end, or press Ctrl K", "ok"),
  ],
};

const order = ["whoami", "ls systems", "stack", "status", "contact"];

export function HeroTerminal() {
  const [lines, setLines] = useState<Line[]>([]);
  const [typing, setTyping] = useState("");
  const [current, setCurrent] = useState<string | null>(null);
  const busy = useRef(false);
  const screen = useRef<HTMLDivElement>(null);
  const timers = useRef<number[]>([]);

  const run = useCallback((cmd: string, instant = false) => {
    if (busy.current) return;
    busy.current = true;
    setCurrent(cmd);
    const reduce =
      instant || window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finish = () => {
      setTyping("");
      setLines((prev) => [
        ...prev.slice(-24),
        { kind: "cmd", parts: [{ text: cmd }] },
        ...programs[cmd],
      ]);
      busy.current = false;
    };
    if (reduce) {
      finish();
      return;
    }
    let i = 0;
    const step = () => {
      i += 1;
      setTyping(cmd.slice(0, i));
      if (i < cmd.length) timers.current.push(window.setTimeout(step, 45 + Math.random() * 45));
      else timers.current.push(window.setTimeout(finish, 220));
    };
    timers.current.push(window.setTimeout(step, 120));
  }, []);

  useEffect(() => {
    const t = window.setTimeout(() => run("whoami"), 900);
    const pending = timers.current;
    return () => {
      window.clearTimeout(t);
      pending.forEach((id) => window.clearTimeout(id));
    };
  }, [run]);

  useEffect(() => {
    const el = screen.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines, typing]);

  return (
    <div className="term load" style={{ ["--d" as string]: "0.5s" }}>
      <div className="term-bar">
        <i aria-hidden="true">
          <span />
          <span />
          <span />
        </i>
        <span>paul@nairobi: ~</span>
        <span>zsh</span>
      </div>
      <div className="term-screen" ref={screen} aria-live="polite">
        {lines.map((line, i) =>
          line.kind === "cmd" ? (
            <div key={i} className="term-line" style={{ marginTop: i ? 12 : 0 }}>
              <span className="term-prompt">~ $ </span>
              <span className="term-cmd">{line.parts[0].text}</span>
            </div>
          ) : (
            <div key={i} className="term-line term-out">
              {line.parts.map((p, j) => (
                <span key={j} className={p.tone ? `term-${p.tone}` : undefined}>
                  {p.text}
                </span>
              ))}
            </div>
          ),
        )}
        <div className="term-line" style={{ marginTop: lines.length ? 12 : 0 }}>
          <span className="term-prompt">~ $ </span>
          <span className="term-cmd">{typing}</span>
          <span className="caret" aria-hidden="true" />
        </div>
      </div>
      <div className="term-chips" role="group" aria-label="Run a command">
        {order.map((cmd) => (
          <button
            key={cmd}
            type="button"
            className="chip"
            aria-pressed={current === cmd}
            onClick={() => run(cmd)}
          >
            {cmd}
          </button>
        ))}
      </div>
    </div>
  );
}
