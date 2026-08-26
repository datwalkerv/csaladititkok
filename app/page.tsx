import { fetchAirings } from "@/lib/xmltv";
import AiringCard from "@/components/AiringCard";
import ScheduleList from "@/components/ScheduleList";
import AnimatedBackground from "@/components/AnimatedBackground";
import TimezoneFlag from "@/components/TimezoneFlag";
import type { Airing } from "@/lib/xmltv";

export const dynamic = "force-dynamic";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://csaladititkok.vercel.app";

function buildJsonLd(airings: Airing[]) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TVSeries",
        "@id": `${BASE_URL}/#tvseries`,
        name: "Családi Titkok",
        alternateName: ["Családi titkok", "Family Secrets Hungary"],
        description:
          "Hétköznapi csaták, melyek harcmezején családtagok kerülnek egymással szembe. A legjobb forgatókönyveket az Élet írja – Családi Titkok a Super TV2 műsorán.",
        inLanguage: "hu",
        countryOfOrigin: { "@type": "Country", name: "Magyarország" },
        genre: ["Reality", "Dráma", "Dokumentumfilm"],
        url: BASE_URL,
        image: `${BASE_URL}/logo.png`,
        broadcastChannel: {
          "@type": "TelevisionChannel",
          name: "Super TV2",
          broadcastDisplayName: "Super TV2 HD",
        },
      },
      ...airings.slice(0, 10).map((a) => ({
        "@type": "BroadcastEvent",
        name: `Családi Titkok${a.subTitle ? ` – ${a.subTitle}` : ""}${a.episodeNum ? ` (${a.episodeNum})` : ""}`,
        startDate: a.start,
        endDate: a.stop,
        inLanguage: "hu",
        videoFormat: "HD",
        isLiveBroadcast: false,
        publishedOn: {
          "@type": "TelevisionChannel",
          name: "Super TV2",
        },
        workPresented: { "@id": `${BASE_URL}/#tvseries` },
      })),
      {
        "@type": "WebSite",
        "@id": `${BASE_URL}/#website`,
        url: BASE_URL,
        name: "Családi Titkok Adásrend",
        description: "Mikor megy a Családi Titkok a Super TV2-n? Valós idejű adásrend és visszaszámláló.",
        inLanguage: "hu",
        potentialAction: {
          "@type": "SearchAction",
          target: `${BASE_URL}/?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
    ],
  };
}

export default async function Home() {
  let airings = await fetchAirings().catch(() => null);

  const fetchFailed = airings === null;
  if (!airings) airings = [];

  const [next, ...rest] = airings;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd(airings)) }}
      />

      <AnimatedBackground />
      <TimezoneFlag />

      <main className="relative min-h-screen px-4 pb-24" style={{ paddingTop: "clamp(48px, 8vw, 80px)" }}>
        <div className="mx-auto w-full" style={{ maxWidth: "880px" }}>

          {fetchFailed && (
            <div className="glass rounded-2xl p-8 text-center" style={{ color: "var(--color-muted)" }}>
              <p className="text-lg">Az adásrend jelenleg nem érhető el. Próbáld újra később.</p>
            </div>
          )}

          {!fetchFailed && !next && (
            <div className="glass rounded-2xl p-8 text-center" style={{ color: "var(--color-muted)" }}>
              <p
                className="text-4xl mb-2"
                style={{ fontFamily: "var(--font-display)", letterSpacing: "0.04em" }}
              >
                Nincs közelgő adás
              </p>
              <p className="text-sm">A műsorban jelenleg nem szerepel a Családi titkok.</p>
            </div>
          )}

          {next && <AiringCard airing={next} />}

          {rest.length > 0 && (
            <div style={{ marginTop: "clamp(48px, 8vw, 72px)" }}>
              <div
                className="mb-6"
                style={{ borderBottom: "1px solid rgba(0,0,0,0.06)", paddingBottom: "16px" }}
              >
                <span
                  style={{ color: "var(--color-muted)", fontFamily: "var(--font-display)", fontSize: "clamp(16px, 3vw, 22px)", letterSpacing: "0.1em", textTransform: "uppercase" }}
                >
                  Teljes adásrend
                </span>
              </div>
              <ScheduleList airings={rest} />
            </div>
          )}
        </div>
      </main>
    </>
  );
}
