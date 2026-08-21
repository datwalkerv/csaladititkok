"use client";

import { useEffect, useReducer, useRef } from "react";

function formatCountdown(ms: number): string {
  if (ms <= 0) return "most";
  const totalSec = Math.floor(ms / 1000);
  const days = Math.floor(totalSec / 86400);
  const hours = Math.floor((totalSec % 86400) / 3600);
  const mins = Math.floor((totalSec % 3600) / 60);

  if (days > 0) return `${days}n ${hours}ó`;
  if (hours > 0) return `${hours}ó ${mins}p`;
  return `${mins}p`;
}

export default function CountdownBadge({ start }: { start: string }) {
  const [, tick] = useReducer((n: number) => n + 1, 0);
  const reducedMotion = useRef(
    typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    tick();
    const interval = reducedMotion.current ? 60_000 : 30_000;
    const id = setInterval(tick, interval);
    return () => clearInterval(id);
  }, []);

  const diff = new Date(start).getTime() - Date.now();
  const label = diff > 0 ? `${formatCountdown(diff)} múlva` : "Most megy!";

  return (
    <span
      className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold tracking-widest uppercase"
      style={{ background: "rgba(42,167,214,0.12)", color: "var(--color-accent)" }}
      aria-live="polite"
      aria-atomic="true"
    >
      <span
        className="inline-block w-1.5 h-1.5 rounded-full"
        style={{ background: "var(--color-accent)" }}
        aria-hidden="true"
      />
      {label}
    </span>
  );
}
