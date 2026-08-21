import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Családi Titkok – Adásrend";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "radial-gradient(circle at 50% 35%, #D0D9E2 0%, #E7ECF1 45%, #ffffff 100%)",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Accent blob */}
        <div
          style={{
            position: "absolute",
            width: 600,
            height: 600,
            borderRadius: "50%",
            background: "rgba(42,167,214,0.1)",
            filter: "blur(80px)",
            top: -100,
            left: -100,
          }}
        />

        {/* Glass card */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 32,
            background: "rgba(255,255,255,0.6)",
            border: "1px solid rgba(0,0,0,0.06)",
            borderRadius: 32,
            padding: "56px 80px",
            boxShadow: "0 8px 48px rgba(0,0,0,0.10)",
          }}
        >
          {/* Title */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 0,
              lineHeight: 0.9,
            }}
          >
            <span style={{ fontSize: 96, fontWeight: 900, color: "#000000", letterSpacing: "-2px" }}>
              CSALÁDI
            </span>
            <span style={{ fontSize: 96, fontWeight: 900, color: "#2AA7D6", letterSpacing: "-2px" }}>
              TITKOK
            </span>
          </div>

          {/* Divider */}
          <div style={{ width: 120, height: 2, background: "rgba(0,0,0,0.08)", borderRadius: 1 }} />

          {/* Subtitle */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 8,
            }}
          >
            <span style={{ fontSize: 28, color: "#9F9F9F", letterSpacing: "4px", textTransform: "uppercase" }}>
              Mikor megy?
            </span>
            <span style={{ fontSize: 22, color: "#2AA7D6", letterSpacing: "2px", textTransform: "uppercase" }}>
              Super TV2 Adásrend
            </span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
