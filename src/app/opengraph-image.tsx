import { ImageResponse } from "next/og";

export const alt = "Paul Onyambu ships payment rails and AI agents to production. Software engineer in Nairobi.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const lanes = [
  { color: "#8c7bff", x: 0 },
  { color: "#2dd4bf", x: 1 },
  { color: "#ffb547", x: 2 },
  { color: "#ff6b8b", x: 3 },
];

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#0b0d12",
          color: "#e9ecf2",
          padding: "64px 72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", gap: 22, marginRight: 64 }}>
          {lanes.map((l) => (
            <div key={l.x} style={{ width: 6, height: "100%", background: l.color, borderRadius: 3, display: "flex" }} />
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", flex: 1 }}>
          <div style={{ display: "flex", fontSize: 26, color: "#2dd4bf", fontFamily: "monospace" }}>
            ~/paul-onyambu
          </div>
          <div style={{ display: "flex", fontSize: 82, fontWeight: 800, lineHeight: 1, letterSpacing: -3 }}>
            Paul Onyambu ships payment rails and AI agents to production.
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: "#a3abbc" }}>
            <span>Founder and CEO, MyGanji</span>
            <span style={{ color: "#ffb547" }}>CTO, MetaCap AI</span>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
