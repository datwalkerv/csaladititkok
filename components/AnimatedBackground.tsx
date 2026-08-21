"use client";

import { motion } from "framer-motion";

const blobs = [
  {
    size: 700,
    color: "rgba(42, 167, 214, 0.13)",
    initial: { x: -200, y: -100 },
    animate: { x: [-200, 60, -100, -200], y: [-100, 80, 200, -100] },
    duration: 22,
  },
  {
    size: 500,
    color: "rgba(42, 167, 214, 0.08)",
    initial: { x: 400, y: 300 },
    animate: { x: [400, 200, 500, 400], y: [300, 100, 400, 300] },
    duration: 28,
  },
  {
    size: 400,
    color: "rgba(208, 217, 226, 0.5)",
    initial: { x: 100, y: 400 },
    animate: { x: [100, 300, 50, 100], y: [400, 200, 500, 400] },
    duration: 18,
  },
];

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {blobs.map((blob, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: blob.size,
            height: blob.size,
            background: blob.color,
            filter: "blur(80px)",
            left: 0,
            top: 0,
          }}
          initial={blob.initial}
          animate={blob.animate}
          transition={{
            duration: blob.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
