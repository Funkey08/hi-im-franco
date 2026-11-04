import { reducedMotion } from "../lib/util";

/** One tube's visible state. `strike` increments each time the tube lights up, to restart its strike-flicker animation. */
export interface Cell {
  ch: string;
  dp: boolean;
  on: boolean;
  rolling: boolean;
  strike: number;
}

interface Target {
  ch: string;
  dp: boolean;
  /** When the tube settles on `ch`. */
  end: number;
  /** When the tube lights up (it stays dark before this). */
  start: number;
  charset: string;
  /** Synchronised 0-9 sweep instead of random rolling. */
  sweep: boolean;
}

export const DIGITS = "0123456789";
export const ALNUM = DIGITS + "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const TICK_MS = 45;
const SWEEP_STEP_MS = 55;

/**
 * Drives a row of nixie tubes. Lives outside React (one instance for the whole app) so the
 * display keeps its state when it moves between the hero and the docked header.
 * Subscribe with useSyncExternalStore(controller.subscribe, controller.getSnapshot).
 */
export class NixieController {
  private cells: Cell[];
  private targets: (Target | null)[];
  private ticker: number | null = null;
  private listeners = new Set<() => void>();
  readonly size: number;

  constructor(size: number) {
    this.size = size;
    this.cells = Array.from({ length: size }, () => ({ ch: "", dp: false, on: false, rolling: false, strike: 0 }));
    this.targets = Array(size).fill(null);
  }

  subscribe = (fn: () => void) => {
    this.listeners.add(fn);
    return () => {
      this.listeners.delete(fn);
    };
  };

  getSnapshot = () => this.cells;

  /** Text currently settled on the tubes ('' while rolling). */
  get text() {
    return this.cells.some((c) => c.rolling) ? "" : this.cells.map((c) => c.ch).join("").trim();
  }

  /**
   * Split a string across `n` tubes. A "." lights the previous tube's decimal point.
   * Numbers align right (like a meter); words are centred.
   */
  static layout(str: string, n: number, alignRight: boolean) {
    const cells: { ch: string; dp: boolean }[] = [];
    for (const ch of str) {
      if (ch === "." && cells.length) cells[cells.length - 1].dp = true;
      else cells.push({ ch: ch.toUpperCase(), dp: false });
    }
    const pad = alignRight ? n - cells.length : Math.floor((n - cells.length) / 2);
    return Array.from({ length: n }, (_, i) => cells[i - pad] ?? { ch: "", dp: false });
  }

  /** Roll every tube to its part of `str`, left to right. Returns ms until the last tube settles. */
  show(str: string, { numeric = false, base = 340, stagger = 115 } = {}): number {
    const layout = NixieController.layout(str, this.size, numeric);
    if (reducedMotion()) {
      this.commit(this.cells.map((c, i) => this.settle(c, layout[i].ch, layout[i].dp)));
      return 0;
    }
    const now = performance.now();
    layout.forEach((t, i) => {
      this.targets[i] = {
        ch: t.ch, dp: t.dp, start: now, end: now + base + i * stagger,
        charset: numeric ? DIGITS : ALNUM, sweep: false,
      };
    });
    this.run();
    return base + (this.size - 1) * stagger + TICK_MS;
  }

  /**
   * Power-on: tubes strike one after another (`stagger` ms apart) and run a synchronised
   * 0-9 sweep (real nixie clocks do this to keep their cathodes healthy). They keep sweeping
   * until the next show() call takes over.
   */
  ignite(stagger = 90) {
    if (reducedMotion()) return;
    const now = performance.now();
    this.targets = this.targets.map((_, i) => ({
      ch: "", dp: false, start: now + i * stagger, end: Number.POSITIVE_INFINITY, charset: DIGITS, sweep: true,
    }));
    this.run();
  }

  dispose() {
    if (this.ticker !== null) window.clearInterval(this.ticker);
    this.ticker = null;
  }

  // ---------------------------------------------------------------- internals

  private settle(c: Cell, ch: string, dp: boolean): Cell {
    const on = ch !== "";
    return { ch, dp, on, rolling: false, strike: on && !c.on ? c.strike + 1 : c.strike };
  }

  private commit(next: Cell[]) {
    this.cells = next;
    this.listeners.forEach((fn) => fn());
  }

  private run() {
    if (this.ticker === null) this.ticker = window.setInterval(() => this.tick(), TICK_MS);
    this.tick();
  }

  private tick() {
    const now = performance.now();
    let active = false;
    const next = this.cells.map((c, i) => {
      const t = this.targets[i];
      if (!t) return c;
      if (now >= t.end) {
        this.targets[i] = null;
        return this.settle(c, t.ch, t.dp);
      }
      active = true;
      if (now < t.start) return c;
      const ch = t.sweep
        ? t.charset[Math.floor((now - t.start) / SWEEP_STEP_MS) % t.charset.length]
        : t.charset[(Math.random() * t.charset.length) | 0];
      return { ch, dp: false, on: true, rolling: true, strike: c.on ? c.strike : c.strike + 1 };
    });
    this.commit(next);
    if (!active && this.ticker !== null) {
      window.clearInterval(this.ticker);
      this.ticker = null;
    }
  }
}
