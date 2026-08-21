"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Airing } from "@/lib/xmltv";
import { formatDay, formatTime, dateKey } from "@/lib/format";

const PAGE_SIZE = 14;

function groupByDay(airings: Airing[]): Map<string, Airing[]> {
  const map = new Map<string, Airing[]>();
  for (const a of airings) {
    const key = dateKey(a.start);
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(a);
  }
  return map;
}

function AiringRow({ airing, index }: { airing: Airing; index: number }) {
  return (
    <motion.li
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.35, delay: index * 0.04, ease: "easeOut" }}
      className="glass rounded-xl flex items-center gap-4 px-5 py-4 transition-all duration-150 hover:shadow-md cursor-default focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2AA7D6]"
      style={{
        boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.06)",
      }}
      tabIndex={0}
    >
      <Image
        src="/Super_TV2_logo.png"
        alt={airing.channelName}
        width={80}
        height={36}
        unoptimized
        className="shrink-0 object-contain"
        style={{ width: "auto", maxHeight: "28px" }}
      />

      <span
        style={{
          fontFamily: "var(--font-display)",
          color: "var(--color-accent)",
          fontSize: "clamp(24px, 4vw, 32px)",
          letterSpacing: "0.05em",
          minWidth: "7ch",
          flexShrink: 0,
        }}
      >
        {formatTime(airing.start)}
      </span>

      <span className="truncate" style={{ fontSize: "clamp(15px, 2.5vw, 18px)" }}>
        {airing.subTitle ?? "Családi titkok"}
        {airing.episodeNum && (
          <span
            className="ml-2"
            style={{
              color: "var(--color-muted)",
              fontFamily: "var(--font-display)",
              fontSize: "clamp(13px, 2vw, 16px)",
              letterSpacing: "0.08em",
            }}
          >
            {airing.episodeNum}
          </span>
        )}
      </span>
    </motion.li>
  );
}

export default function ScheduleList({ airings }: { airings: Airing[] }) {
  const [visible, setVisible] = useState(PAGE_SIZE);
  const shown = airings.slice(0, visible);
  const groups = groupByDay(shown);
  const hasMore = visible < airings.length;

  return (
    <div className="flex flex-col gap-8">
      {[...groups.entries()].map(([key, items]) => (
        <section key={key}>
          <h3
            className="tracking-widest uppercase mb-3"
            style={{ color: "var(--color-muted)", fontFamily: "var(--font-display)", fontSize: "clamp(16px, 3vw, 22px)" }}
          >
            {formatDay(items[0].start)}
          </h3>
          <ul className="flex flex-col gap-2">
            {items.map((a, i) => (
              <AiringRow key={`${a.channelId}-${a.start}`} airing={a} index={i} />
            ))}
          </ul>
        </section>
      ))}

      {hasMore && (
        <button
          onClick={() => setVisible((v) => v + PAGE_SIZE)}
          className="self-center mt-2 px-6 py-2.5 rounded-full text-sm font-semibold tracking-wider transition-all duration-150 hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2AA7D6]"
          style={{
            background: "rgba(42,167,214,0.1)",
            color: "var(--color-accent)",
            border: "1px solid rgba(42,167,214,0.25)",
          }}
        >
          Több adás betöltése
        </button>
      )}
    </div>
  );
}
