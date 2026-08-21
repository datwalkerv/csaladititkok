import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Családi Titkok – Adásrend";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function loadBebasNeue(): Promise<ArrayBuffer> {
  // Fetch the CSS to get the actual woff2 URL (stable across versions)
  const css = await fetch(
    "https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap",
    { headers: { "User-Agent": "Mozilla/5.0" } }
  ).then((r) => r.text());

  const url = css.match(/src: url\(([^)]+)\)/)?.[1];
  if (!url) throw new Error("Could not find Bebas Neue font URL");

  return fetch(url).then((r) => r.arrayBuffer());
}

export default async function OgImage() {
  const font = await loadBebasNeue();

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
            background: "rgba(42,167,214,0.12)",
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
            gap: 28,
            background: "rgba(255,255,255,0.58)",
            border: "1px solid rgba(0,0,0,0.06)",
            borderRadius: 32,
            padding: "52px 96px",
            boxShadow: "0 8px 48px rgba(0,0,0,0.10)",
          }}
        >
          {/* Title in Bebas Neue */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              lineHeight: 0.88,
              gap: 0,
              fontFamily: "Bebas Neue",
            }}
          >
            <span style={{ fontSize: 108, color: "#000000", letterSpacing: "4px" }}>
              CSALÁDI
            </span>
            <span style={{ fontSize: 108, color: "#2AA7D6", letterSpacing: "4px" }}>
              TITKOK
            </span>
          </div>

          {/* Divider */}
          <div style={{ width: 100, height: 2, background: "rgba(0,0,0,0.08)", borderRadius: 1 }} />

          {/* Subtitle */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
            <span
              style={{
                fontFamily: "Bebas Neue",
                fontSize: 34,
                color: "#9F9F9F",
                letterSpacing: "6px",
              }}
            >
              MIKOR MEGY?
            </span>
            <span
              style={{
                fontFamily: "Bebas Neue",
                fontSize: 26,
                color: "#2AA7D6",
                letterSpacing: "4px",
              }}
            >
              SUPER TV2 ADÁSREND
            </span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Bebas Neue", data: font, style: "normal", weight: 400 }],
    }
  );
}
