"use client";

import { useEffect, useReducer } from "react";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

type Unit = { label: string; value: number };

function getUnits(start: string, stop: string): { units: Unit[]; live: boolean } {
  const now = Date.now();
  const startMs = new Date(start).getTime();
  const stopMs = new Date(stop).getTime();

  if (now >= stopMs) return { units: [], live: false };
  if (now >= startMs) return { units: [], live: true };

  const diff = Math.max(0, startMs - now);
  const totalSec = Math.floor(diff / 1000);
  const days = Math.floor(totalSec / 86400);
  const hours = Math.floor((totalSec % 86400) / 3600);
  const mins = Math.floor((totalSec % 3600) / 60);
  const secs = totalSec % 60;

  const units: Unit[] = [];
  if (days > 0) units.push({ label: "nap", value: days });
  units.push({ label: "óra", value: hours });
  units.push({ label: "perc", value: mins });
  units.push({ label: "mp", value: secs });

  return { units, live: false };
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export default function BigCountdown({ start, stop }: { start: string; stop: string }) {
  const [, tick] = useReducer((n: number) => n + 1, 0);

  useEffect(() => {
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const { units, live } = getUnits(start, stop);

  if (live) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex items-center justify-center"
      >
        <span
          className="inline-flex items-center gap-2 rounded-full px-6 py-2 text-lg tracking-widest uppercase"
          style={{
            background: "rgba(42,167,214,0.15)",
            color: "var(--color-accent)",
            fontFamily: "var(--font-display)",
          }}
        >
          <motion.span
            className="inline-block w-2.5 h-2.5 rounded-full"
            style={{ background: "var(--color-accent)" }}
            animate={{ opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.2, repeat: Infinity }}
          />
          Most megy!
        </span>
      </motion.div>
    );
  }

  if (units.length === 0) return null;

  return (
    <div
      className="flex items-start justify-center gap-3 sm:gap-4"
      aria-live="polite"
      aria-atomic="true"
      aria-label={`Visszaszámlálás: ${units.map((u) => `${u.value} ${u.label}`).join(" ")}`}
    >
      {units.map((unit, i) => (
        <React.Fragment key={unit.label}>
          {i > 0 && (
            <div className="self-center flex flex-col gap-1.5 mb-6" aria-hidden="true">
              {[0, 1].map((j) => (
                <motion.div
                  key={j}
                  className="rounded-full"
                  style={{ width: 5, height: 5, background: "var(--color-muted)", opacity: 0.4 }}
                  animate={{ opacity: [0.4, 0.1, 0.4] }}
                  transition={{ duration: 1, repeat: Infinity, delay: j * 0.5 }}
                />
              ))}
            </div>
          )}
          <motion.div
            key={unit.label}
            className="flex flex-col items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.07, duration: 0.4, ease: "easeOut" }}
        >
          <div
            className="glass rounded-2xl flex items-center justify-center"
            style={{
              width: "clamp(64px, 14vw, 96px)",
              height: "clamp(64px, 14vw, 96px)",
              boxShadow: "0 2px 8px rgba(0,0,0,0.07), 0 8px 24px rgba(0,0,0,0.06)",
            }}
          >
            <AnimatePresence mode="popLayout">
              <motion.span
                key={unit.value}
                initial={{ y: -16, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 16, opacity: 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="select-none"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(28px, 7vw, 48px)",
                  color: "var(--color-accent)",
                  letterSpacing: "0.04em",
                  lineHeight: 1,
                }}
              >
                {pad(unit.value)}
              </motion.span>
            </AnimatePresence>
          </div>
          <span
            className="mt-2 text-xs tracking-widest uppercase"
            style={{ color: "var(--color-muted)", fontFamily: "var(--font-display)", fontSize: "clamp(12px, 2vw, 15px)", letterSpacing: "0.12em" }}
          >
            {unit.label}
          </span>
        </motion.div>
        </React.Fragment>
      ))}

    </div>
  );
}
