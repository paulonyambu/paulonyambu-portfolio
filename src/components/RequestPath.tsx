import type { CSSProperties } from "react";

// The path a request takes through a system. The step the system owns is
// highlighted, and packets travel along the wires between steps.
export function RequestPath({ flow, core }: { flow: string[]; core: number }) {
  return (
    <div className="flow" role="list" aria-label="Request path">
      {flow.map((label, i) => (
        <div key={`${label}-${i}`} style={{ display: "contents" }}>
          <div
            className="node"
            role="listitem"
            data-core={i === core}
            style={{ "--i": i } as CSSProperties}
          >
            <span className="node-step">{String(i + 1).padStart(2, "0")}</span>
            <span className="node-label">{label}</span>
          </div>
          {i < flow.length - 1 ? (
            <span className="wire" aria-hidden="true">
              <span className="packet" style={{ "--i": i } as CSSProperties} />
            </span>
          ) : null}
        </div>
      ))}
    </div>
  );
}
