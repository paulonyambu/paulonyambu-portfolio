"use client";

import { useEffect, useState } from "react";

// Local time in Nairobi, so a visitor knows whether Paul is likely awake.
export function Clock({ prefix = "NBO" }: { prefix?: string }) {
  const [time, setTime] = useState("");

  useEffect(() => {
    const format = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Africa/Nairobi",
      hour: "2-digit",
      minute: "2-digit",
    });
    const update = () => setTime(format.format(new Date()));
    update();
    const id = setInterval(update, 15_000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="figures">
      {prefix} {time || "--:--"} EAT
    </span>
  );
}
