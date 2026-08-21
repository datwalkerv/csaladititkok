"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Airing } from "@/lib/xmltv";
import { formatDay, formatTime } from "@/lib/format";
import BigCountdown from "./BigCountdown";

export default function AiringCard({ airing }: { airing: Airing }) {
  return (
    <motion.article
      className="glass rounded-3xl overflow-hidden"
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{
        boxShadow:
          "0 2px 4px rgba(0,0,0,0.04), 0 12px 32px rgba(0,0,0,0.08), 0 32px 72px rgba(0,0,0,0.06)",
      }}
    >
      {/* Hero: show title */}
      <div
        className="relative w-full flex items-center justify-center overflow-hidden"
        style={{
          minHeight: 240,
          background: "linear-gradient(160deg, #D0D9E2 0%, #E7ECF1 60%, #ffffff 100%)",
        }}
      >
        <Image
          src="/logo.png"
          alt="Családi titkok"
          width={420}
          height={200}
          priority
          unoptimized
          className="relative z-10 w-auto"
          style={{ maxHeight: "160px", objectFit: "contain", padding: "32px 40px" }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-16"
          style={{ background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.55))" }}
        />
      </div>

      <div className="px-8 py-10 md:px-12 md:py-12 flex flex-col gap-8">
        {/* Countdown */}
        <BigCountdown start={airing.start} stop={airing.stop} />

        {/* Episode info */}
        {(airing.subTitle || airing.episodeNum) && (
          <div className="flex flex-col items-center gap-2 text-center">
            {airing.subTitle && (
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(40px, 8vw, 64px)",
                  letterSpacing: "0.05em",
                  lineHeight: 1,
                }}
              >
                {airing.subTitle}
              </h2>
            )}
            {airing.episodeNum && (
              <span
                style={{
                  color: "var(--color-muted)",
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(16px, 3vw, 22px)",
                  letterSpacing: "0.12em",
                }}
              >
                {airing.episodeNum}
              </span>
            )}
          </div>
        )}

        {/* Description */}
        {airing.description && (
          <p
            className="text-sm leading-relaxed text-center max-w-prose mx-auto"
            style={{ color: "var(--color-muted)" }}
          >
            {airing.description}
          </p>
        )}

        {/* Channel + time */}
        <div
          className="flex flex-col items-center gap-2 pt-6"
          style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}
        >
          <div className="flex flex-col items-center sm:items-center">
            <span
              style={{
                color: "var(--color-muted)",
                fontFamily: "var(--font-display)",
                fontSize: "clamp(14px, 2.5vw, 18px)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              {formatDay(airing.start)}
            </span>
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(32px, 6vw, 52px)",
                color: "var(--color-accent)",
                letterSpacing: "0.06em",
                lineHeight: 1.05,
              }}
            >
              {formatTime(airing.start)} – {formatTime(airing.stop)}
            </span>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
