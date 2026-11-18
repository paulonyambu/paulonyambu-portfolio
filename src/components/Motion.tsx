"use client";

import { useEffect, useRef } from "react";

// Reveals everything marked data-reveal inside the element this sits in,
// the first time each one scrolls into view. It is placed at the end of a
// page (or the footer) so it only starts once that part has hydrated.
export function Motion() {
  const anchor = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const scope = anchor.current?.parentElement;
    if (!scope) return;
    const targets = scope.querySelectorAll<HTMLElement>("[data-reveal]:not([data-in])");
    if (!("IntersectionObserver" in window)) {
      targets.forEach((el) => el.setAttribute("data-in", ""));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-in", "");
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.05 },
    );
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return <span ref={anchor} hidden />;
}
