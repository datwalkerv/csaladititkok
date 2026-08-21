import { fetchAirings } from "@/lib/xmltv";
import AiringCard from "@/components/AiringCard";
import ScheduleList from "@/components/ScheduleList";
import AnimatedBackground from "@/components/AnimatedBackground";

export const revalidate = 3600;

export default async function Home() {
  let airings = await fetchAirings().catch(() => null);

  const fetchFailed = airings === null;
  if (!airings) airings = [];

  const [next, ...rest] = airings;

  return (
    <>
      <AnimatedBackground />

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
