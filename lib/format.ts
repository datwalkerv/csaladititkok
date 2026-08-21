export function formatDay(iso: string, tz = "Europe/Budapest"): string {
  return new Intl.DateTimeFormat("hu-HU", {
    timeZone: tz,
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(iso));
}

export function formatTime(iso: string, tz = "Europe/Budapest"): string {
  return new Intl.DateTimeFormat("hu-HU", {
    timeZone: tz,
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(iso));
}

export function dateKey(iso: string, tz = "Europe/Budapest"): string {
  return new Intl.DateTimeFormat("sv-SE", {
    timeZone: tz,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(iso));
}
