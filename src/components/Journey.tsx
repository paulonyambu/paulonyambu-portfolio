"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import { commits, lanes, type Commit } from "@/lib/journey";

const laneById = Object.fromEntries(lanes.map((l) => [l.id, l]));
const MAIN = laneById.main;

type Geo = { ys: number[]; height: number; laneW: number };

function nodeCol(c: Commit) {
  return c.type === "merge" ? MAIN.col : laneById[c.lane].col;
}

function Show({ c }: { c: Commit }) {
  const lane = laneById[c.lane];
  return (
    <div className={`show a-${lane.accent}`}>
      <div key={c.hash} className="swap">
        <p className="show-cmd">$ git show {c.hash}</p>
        <dl>
          <dt>commit</dt>
          <dd>
            <span style={{ color: "var(--amber-ink)" }}>{c.hash}</span>
            {c.ref ? <span style={{ color: "var(--a-ink)" }}> ({c.ref})</span> : null}
          </dd>
          <dt>branch</dt>
          <dd>{c.type === "merge" ? `${lane.label} into main` : lane.label}</dd>
          <dt>author</dt>
          <dd>Paul Onyambu</dd>
          <dt>date</dt>
          <dd>{c.year}</dd>
        </dl>
        <h3>{c.title}</h3>
        <p>{c.body}</p>
        <ul className="diff">
          {c.added.map((a, i) => (
            <li key={a} style={{ "--i": i } as CSSProperties}>
              {a}
            </li>
          ))}
          <li className="stat" style={{ "--i": c.added.length } as CSSProperties}>
            {c.added.length} insertion{c.added.length === 1 ? "" : "s"}(+), 0 regrets(-)
          </li>
        </ul>
      </div>
    </div>
  );
}

export function Journey() {
  const [sel, setSel] = useState(0);
  const [focus, setFocus] = useState<string | null>(null);
  const [playing, setPlaying] = useState(false);
  const [geo, setGeo] = useState<Geo | null>(null);
  const log = useRef<HTMLDivElement>(null);
  const rows = useRef<(HTMLButtonElement | null)[]>([]);

  const measure = useCallback(() => {
    const el = log.current;
    if (!el) return;
    const laneW = parseFloat(getComputedStyle(el).getPropertyValue("--lane-w")) || 24;
    const ys = rows.current.map((r) => (r ? r.offsetTop + 27 : 0));
    setGeo({ ys, height: el.offsetHeight, laneW });
  }, []);

  useLayoutEffect(() => {
    measure();
    const el = log.current;
    if (!el) return;
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [measure]);

  // Replay walks HEAD from the first commit up to today.
  useEffect(() => {
    if (!playing) return;
    let i = commits.length - 1;
    const id = window.setInterval(() => {
      i -= 1;
      if (i < 0) {
        setPlaying(false);
        return;
      }
      setSel(i);
    }, 1300);
    return () => window.clearInterval(id);
  }, [playing]);

  const choose = (i: number) => {
    setPlaying(false);
    setSel(i);
  };

  const onKey = (e: React.KeyboardEvent, i: number) => {
    const next = e.key === "ArrowDown" ? i + 1 : e.key === "ArrowUp" ? i - 1 : null;
    if (next === null || next < 0 || next >= commits.length) return;
    e.preventDefault();
    choose(next);
    rows.current[next]?.focus();
  };

  const x = (col: number) => (geo ? 8 + col * geo.laneW + geo.laneW / 2 : 0);
  const dim = (laneId: string) => (focus && focus !== laneId ? "dim" : "");

  const idx = (hash: string) => commits.findIndex((c) => c.hash === hash);
  const paths: { lane: string; d: string; tail?: boolean }[] = [];
  if (geo) {
    const { ys, height } = geo;
    const y = (h: string) => ys[idx(h)];
    const last = ys[ys.length - 1];
    const x0 = x(MAIN.col);
    paths.push({ lane: "main", d: `M${x0} ${last} V${ys[0]}` });

    // study predates the first commit, so it fades in from below
    const s = laneById.study;
    const yMerge = y("e42b7aa");
    paths.push({ lane: "study", d: `M${x(s.col)} ${height} V${last}`, tail: true });
    paths.push({
      lane: "study",
      d: `M${x(s.col)} ${last} V${yMerge + 26} C${x(s.col)} ${yMerge + 10} ${x0} ${yMerge + 16} ${x0} ${yMerge}`,
    });

    for (const [id, hash] of [
      ["myganji", "3be8f17"],
      ["metacap", "5c1d9b0"],
    ] as const) {
      const yb = y(hash);
      const xl = x(laneById[id].col);
      paths.push({
        lane: id,
        d: `M${x0} ${yb + 34} C${x0} ${yb + 14} ${xl} ${yb + 20} ${xl} ${yb} V${Math.max(ys[0] - 40, 0)}`,
      });
    }
  }

  const active = commits[sel];

  return (
    <div className="jr">
      <div>
        <div className="jr-bar" data-reveal>
          <div className="lanes-legend" role="group" aria-label="Highlight a branch">
            {lanes.map((l) => (
              <button
                key={l.id}
                type="button"
                className={`lane-btn a-${l.accent}`}
                aria-pressed={focus === l.id}
                onClick={() => setFocus((f) => (f === l.id ? null : l.id))}
              >
                {l.label}
              </button>
            ))}
          </div>
          <div className="jr-actions">
            <button type="button" className="btn small" onClick={() => {
                if (!playing) setSel(commits.length - 1);
                setPlaying(!playing);
              }}>
              {playing ? "Stop replay" : "Replay history"}
            </button>
          </div>
        </div>

        <div
          ref={log}
          className="log"
          data-reveal
          data-focus={focus ?? undefined}
          role="listbox"
          aria-label="Career history, newest first"
        >
          <svg className="log-svg" aria-hidden="true" height={geo?.height ?? 0}>
            {paths.map((p, i) => (
              <path
                key={i}
                d={p.d}
                pathLength={p.tail ? undefined : 1}
                className={`lane-path a-${laneById[p.lane].accent} ${p.tail ? "faded-tail" : ""} ${dim(p.lane)}`}
                style={{ "--i": i } as CSSProperties}
              />
            ))}
            {geo
              ? commits.map((c, i) => {
                  const cx = x(nodeCol(c));
                  const cy = geo.ys[i];
                  const on = i === sel;
                  return (
                    <g
                      key={c.hash}
                      className={`dot-g a-${laneById[c.lane].accent} ${dim(c.lane)}`}
                      style={{ "--i": commits.length - i } as CSSProperties}
                    >
                      <circle className="halo" cx={cx} cy={cy} r={8} data-on={c.type === "head"} />
                      <circle className="dot" cx={cx} cy={cy} r={on ? 7.5 : 5.5} data-on={on} />
                    </g>
                  );
                })
              : null}
          </svg>

          {commits.map((c, i) => {
            const lane = laneById[c.lane];
            return (
              <div key={c.hash} style={{ display: "contents" }}>
                <button
                  ref={(el) => {
                    rows.current[i] = el;
                  }}
                  type="button"
                  role="option"
                  aria-selected={i === sel}
                  aria-current={i === sel}
                  className={`commit a-${lane.accent} ${focus && focus !== c.lane ? "dim" : ""}`}
                  onClick={() => choose(i)}
                  onKeyDown={(e) => onKey(e, i)}
                >
                  <span aria-hidden="true" />
                  <span className="commit-main">
                    <span className="commit-meta">
                      <span className="hash">{c.hash}</span>
                      {c.ref ? <span className={`ref ${c.type === "head" ? "head" : ""}`}>{c.ref}</span> : null}
                      <span className="commit-year">{c.year}</span>
                    </span>
                    <span className="commit-title" style={{ display: "block" }}>
                      {c.title}
                    </span>
                  </span>
                </button>
                <div className="inline-show" aria-hidden={i !== sel}>
                  <div>{i === sel ? <Show c={c} /> : null}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="show-side" data-reveal style={{ ["--i" as string]: 1 }}>
        <Show c={active} />
      </div>
    </div>
  );
}
