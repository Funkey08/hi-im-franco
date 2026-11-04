/** Small, dependency-free helpers shared by the animation code. */

export const clamp = (v: number, lo = 0, hi = 1) => Math.min(hi, Math.max(lo, v));
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
export const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

/** Standard normal sample (Box–Muller). */
export function gauss(): number {
  let u = 0;
  let v = 0;
  while (!u) u = Math.random();
  while (!v) v = Math.random();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

/** Deterministic PRNG (Park–Miller), so generated art looks the same on every visit. */
export function rng(seed: number) {
  return () => (seed = (seed * 16807) % 2147483647) / 2147483647;
}

export const reducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const finePointer = () =>
  typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches;

export const getDpr = () => Math.min(2, window.devicePixelRatio || 1);

/** Fire-and-forget event used to make the tube light flare (dust + wall glow listen for it). */
export const FLARE_EVENT = "fmv:flare";
export const flare = () => window.dispatchEvent(new Event(FLARE_EVENT));
