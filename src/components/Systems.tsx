"use client";

import Link from "next/link";
import { useState } from "react";
import { groups, systems, type SystemGroup } from "@/lib/systems";
import { RequestPath } from "./RequestPath";

export function Systems() {
  const [group, setGroup] = useState<SystemGroup>("platforms");
  const [selected, setSelected] = useState(systems[0].slug);
  const [mode, setMode] = useState<"outcome" | "internals">("outcome");

  const list = systems.filter((s) => s.group === group);
  const active = list.find((s) => s.slug === selected) ?? list[0];

  const pickGroup = (g: SystemGroup) => {
    setGroup(g);
    setSelected(systems.find((s) => s.group === g)!.slug);
  };

  return (
    <>
      <div className="sec-head">
        <div>
          <p className="sec-path">~/systems</p>
          <h2 id="systems-title" className="sec-title" data-reveal>
            Most of my code is private. How it works does not have to be.
          </h2>
        </div>
        <div className="sys-controls" data-reveal style={{ ["--i" as string]: 1 }}>
          <div className="seg" role="group" aria-label="Which work">
            {groups.map((g) => (
              <button
                key={g.id}
                type="button"
                aria-pressed={group === g.id}
                onClick={() => pickGroup(g.id)}
              >
                {g.label}
              </button>
            ))}
          </div>
          <div className="seg" role="group" aria-label="Reading mode">
            <button type="button" aria-pressed={mode === "outcome"} onClick={() => setMode("outcome")}>
              For clients
            </button>
            <button
              type="button"
              aria-pressed={mode === "internals"}
              onClick={() => setMode("internals")}
            >
              For engineers
            </button>
          </div>
        </div>
      </div>

      <div className="sys" data-reveal style={{ ["--i" as string]: 2 }}>
        <div className="sys-list" role="tablist" aria-label="Systems" aria-orientation="vertical">
          {list.map((s, i) => (
            <button
              key={s.slug}
              type="button"
              role="tab"
              id={`tab-${s.slug}`}
              aria-selected={s.slug === active.slug}
              aria-controls="sys-panel"
              className={`sys-item a-${s.accent}`}
              onClick={() => setSelected(s.slug)}
              onMouseEnter={(e) => {
                if (window.matchMedia("(hover: hover)").matches && e.buttons === 0) setSelected(s.slug);
              }}
            >
              <span className="sys-num">{String(i + 1).padStart(2, "0")}</span>
              <span>
                <span className="sys-name">{s.name}</span>
                <span className="sys-org">{s.org}</span>
              </span>
              <span className="sys-role">{s.role}</span>
            </button>
          ))}
        </div>

        <div
          id="sys-panel"
          role="tabpanel"
          aria-labelledby={`tab-${active.slug}`}
          className={`panel a-${active.accent}`}
        >
          <div key={active.slug} className="swap">
            <div className="panel-head">
              <div>
                <p className="panel-kind">{active.kind}</p>
                <h3 className="panel-name">{active.name}</h3>
                <p className="panel-meta">
                  {active.org}. {active.role}.
                </p>
              </div>
              <a href={active.url} target="_blank" rel="noopener noreferrer" className="btn small">
                {active.host}
              </a>
            </div>

            <div className="panel-sec">
              <p className="label">Request path</p>
              <RequestPath flow={active.flow} core={active.core} />
            </div>

            <div className="panel-sec panel-cols">
              <div>
                <p className="label accent">
                  {mode === "outcome" ? "What it does for the business" : "How it works"}
                </p>
                <p key={mode} className="panel-body swap">
                  {mode === "outcome" ? active.outcome : active.internals}
                </p>
              </div>
              <div>
                <p className="label">Stack</p>
                <div className="tags">
                  {active.stack.map((t) => (
                    <span key={t} className="tag">
                      {t}
                    </span>
                  ))}
                </div>
                <p className="label" style={{ marginTop: 22, marginBottom: 6 }}>
                  Proof
                </p>
                <p style={{ fontSize: "0.95rem" }}>{active.proof}</p>
              </div>
            </div>

            <div className="panel-sec panel-foot">
              <span className="mono" style={{ color: "var(--text-faint)", fontSize: "0.72rem" }}>
                {list.findIndex((s) => s.slug === active.slug) + 1} of {list.length}
              </span>
              <Link href={`/work/${active.slug}`} className="tlink">
                Read the full breakdown
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
