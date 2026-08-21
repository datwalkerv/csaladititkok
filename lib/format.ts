const TZ = "Europe/Budapest";

const DAY_FMT = new Intl.DateTimeFormat("hu-HU", {
  timeZone: TZ,
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
});

const TIME_FMT = new Intl.DateTimeFormat("hu-HU", {
  timeZone: TZ,
  hour: "2-digit",
  minute: "2-digit",
});

const DATE_KEY_FMT = new Intl.DateTimeFormat("sv-SE", {
  timeZone: TZ,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

export function formatDay(iso: string): string {
  return DAY_FMT.format(new Date(iso));
}

export function formatTime(iso: string): string {
  return TIME_FMT.format(new Date(iso));
}

export function dateKey(iso: string): string {
  return DATE_KEY_FMT.format(new Date(iso));
}
