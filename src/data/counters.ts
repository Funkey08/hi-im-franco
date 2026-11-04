/**
 * Live counters: values that change by themselves over time.
 * Kept separate from the copy in readings.ts so the date maths is testable and easy to update.
 */

/** Calendar date (YYYY-MM-DD) right now in a given IANA time zone. */
export function dateIn(timeZone: string, now = new Date()): string {
  // en-CA formats as YYYY-MM-DD
  return new Intl.DateTimeFormat("en-CA", { timeZone, year: "numeric", month: "2-digit", day: "2-digit" }).format(now);
}

/** Whole days from `from` to `to` (both YYYY-MM-DD). */
export function daysBetween(from: string, to: string): number {
  return Math.round((Date.parse(`${to}T00:00:00Z`) - Date.parse(`${from}T00:00:00Z`)) / 86_400_000);
}

/**
 * Duolingo streak: STREAK_ANCHOR.days on STREAK_ANCHOR.date, +1 every midnight in Franco's
 * time zone (so every visitor sees the same number). If the streak ever breaks, reset the anchor.
 */
export const STREAK_ANCHOR = { date: "2026-11-03", days: 2128, timeZone: "America/New_York" };

export function duolingoStreak(now = new Date()): number {
  const { date, days, timeZone } = STREAK_ANCHOR;
  return days + Math.max(0, daysBetween(date, dateIn(timeZone, now)));
}
