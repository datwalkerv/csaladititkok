"use client";

import { useTimezone } from "@/contexts/TimezoneContext";
import { timezoneFlag } from "@/lib/timezone";

export default function TimezoneFlag() {
  const tz = useTimezone();
  const flag = timezoneFlag(tz);

  // Friendly label: e.g. "Europe/Budapest" → "Budapest"
  const label = tz.split("/").pop()?.replace(/_/g, " ") ?? tz;

  return (
    <div
      className="fixed top-5 right-5 z-50 flex items-center gap-2 glass rounded-full px-3 py-1.5 select-none"
      style={{
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        fontSize: "13px",
      }}
      title={tz}
    >
      <span style={{ fontSize: "20px", lineHeight: 1 }} aria-label={label}>
        {flag}
      </span>
      <span
        style={{
          color: "var(--color-muted)",
          fontFamily: "var(--font-display)",
          fontSize: "13px",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
        }}
      >
        {label}
      </span>
    </div>
  );
}
