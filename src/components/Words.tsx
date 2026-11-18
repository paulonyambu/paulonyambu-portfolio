import type { CSSProperties } from "react";

// Splits text into words that rise out of their own line. Each word keeps
// its place in the flow, so wrapping stays natural at every screen size.
export function Words({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <span className="words">
      {words.map((word, i) => (
        <span key={i}>
          <span className="w">
            <span style={{ "--i": i } as CSSProperties}>{word}</span>
          </span>
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </span>
  );
}
