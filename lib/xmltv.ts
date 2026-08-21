import { XMLParser } from "fast-xml-parser";
import { unstable_cache } from "next/cache";

const FEED_URL =
  "https://raw.githubusercontent.com/dobrosi/xmltv/refs/heads/main/channels.xml";

const SHOW_TITLE = "családi titkok";

export type Airing = {
  channelId: string;
  channelName: string;
  channelLogo: string | null;
  start: string; // ISO 8601
  stop: string; // ISO 8601
  subTitle?: string;
  episodeNum?: string;
  episodeImage?: string;
  description?: string;
};

type RawChannel = {
  "@_id": string;
  "display-name": string | { "#text": string };
  icon?: { "@_src": string };
};

type RawProgramme = {
  "@_start": string;
  "@_stop": string;
  "@_channel": string;
  title: string | { "#text": string } | Array<{ "#text": string; "@_lang": string }>;
  "sub-title"?: string | { "#text": string };
  desc?: string | { "#text": string };
  icon?: { "@_src": string };
  "episode-num"?: string | { "#text": string };
};

function parseXmltvDate(raw: string): string {
  // Format: yyyyMMddHHmmss +0000 or yyyyMMddHHmmss +HHMM
  const match = raw.match(/^(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})\s*([+-]\d{2})(\d{2})/);
  if (!match) throw new Error(`Unparseable date: ${raw}`);
  const [, yyyy, MM, dd, HH, mm, ss, tzH, tzM] = match;
  return `${yyyy}-${MM}-${dd}T${HH}:${mm}:${ss}${tzH}:${tzM}`;
}

function getText(v: unknown): string {
  if (!v) return "";
  if (typeof v === "string") return v;
  if (Array.isArray(v)) {
    const hu = (v as Array<{ "#text": string; "@_lang"?: string }>).find(
      (x) => x["@_lang"] === "hu"
    );
    return hu?.["#text"] ?? (v[0] as { "#text": string })?.["#text"] ?? "";
  }
  if (typeof v === "object" && "#text" in (v as object)) {
    return (v as { "#text": string })["#text"];
  }
  return String(v);
}

async function _fetchAirings(): Promise<Airing[]> {
  const res = await fetch(FEED_URL, { cache: "no-store" });
  if (!res.ok) throw new Error(`Feed fetch failed: ${res.status}`);
  const xml = await res.text();

  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: "@_",
    isArray: (name) => name === "programme" || name === "channel",
    allowBooleanAttributes: true,
  });

  const parsed = parser.parse(xml);
  const tv = parsed?.tv ?? parsed;

  const channels: RawChannel[] = tv?.channel ?? [];
  const programmes: RawProgramme[] = tv?.programme ?? [];

  // Build channel map
  const channelMap = new Map<string, { name: string; logo: string | null }>();
  for (const ch of channels) {
    channelMap.set(ch["@_id"], {
      name: getText(ch["display-name"]),
      logo: ch.icon?.["@_src"] ?? null,
    });
  }

  const now = new Date();

  const airings: Airing[] = [];
  for (const prog of programmes) {
    const title = getText(prog.title);
    if (title.toLowerCase().normalize("NFC") !== SHOW_TITLE) continue;

    let start: string;
    let stop: string;
    try {
      start = parseXmltvDate(prog["@_start"]);
      stop = parseXmltvDate(prog["@_stop"]);
    } catch {
      continue;
    }

    if (new Date(stop) < now) continue;

    // Only show Super TV2 airings
    const chInfo = channelMap.get(prog["@_channel"]);
    if (!chInfo?.name.toLowerCase().includes("super tv2")) continue;

    const ch = chInfo ?? {
      name: prog["@_channel"],
      logo: null,
    };

    const episodeNumRaw = getText(prog["episode-num"]);

    airings.push({
      channelId: prog["@_channel"],
      channelName: ch.name,
      channelLogo: ch.logo,
      start,
      stop,
      subTitle: getText(prog["sub-title"]) || undefined,
      episodeNum: episodeNumRaw || undefined,
      episodeImage: prog.icon?.["@_src"] ?? undefined,
      description: getText(prog.desc) || undefined,
    });
  }

  airings.sort((a, b) => a.start.localeCompare(b.start));
  return airings;
}

export const fetchAirings = unstable_cache(_fetchAirings, ["xmltv-airings"], {
  revalidate: 3600,
  tags: ["xmltv"],
});
